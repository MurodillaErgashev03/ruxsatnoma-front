import React, { useMemo, useState } from 'react';
import {
  Users,
  UserPlus,
  Search,
  Shield,
  CheckCircle2,
  XCircle,
  Edit,
  Lock,
  Download,
  Building2,
  KeyRound,
  SlidersHorizontal,
  Trash2,
  AlertTriangle,
  Info,
  Copy,
  Check,
  UserCheck,
  Puzzle,
} from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { hasRight } from '../../../lib/permissions';
import { Input } from '../../../components/ui/FormControls';
import { Modal } from '../../../components/ui/Overlay';
import { SYSTEM_FUNCTIONS, groupSystemFunctions } from './systemFunctions';

export interface AdminUsersPageProps {
  onNavigate?: (page: string, params?: any) => void;
  userRole?: string;
}

interface UserRecord {
  id: string;
  code: string;
  roleName: string;
  pinfl: string;
  fio: string;
  position: string;
  organization: string;
  orgType: string;
  region: string;
  defaultPage: string;
  status: 'active' | 'blocked' | 'suspended';
  badgeColor: string;
  lastActive: string;
  lastActiveDays: number;
  /** Unfinished applications or report forms — TZ 4.2.1.1 blocks deletion while these exist. */
  pendingItems: number;
  mustChangePassword: boolean;
  /** Consecutive failed logins; reaching the configured limit suspends the account automatically. */
  failedLogins: number;
  /** Reason shown when the account was suspended by the system rather than by an administrator. */
  suspendReason?: string;
  /**
   * Individual functions granted on top of the role — TZ 4.2.1.1
   * ("распределение функций, не закреплённых за ролью").
   */
  extraFunctions: string[];
}

/** Failed-login limit after which the system suspends the account (TZ 4.2.1.1). */
const FAILED_LOGIN_LIMIT = 5;

/** Organisation types drive which roles may be offered — TZ 4.2.1.1 role eligibility check. */
const ORG_TYPES = [
  { id: 'it_operator', label: 'Tizim operatori ("Oʻzmon texno" DUK)' },
  { id: 'agency_central', label: 'Agentlik markaziy apparati' },
  { id: 'regional_dept', label: 'Viloyat oʻrmon xoʻjaligi boshqarmasi' },
  { id: 'leskhoz', label: 'Davlat oʻrmon xoʻjaligi (DЎX)' },
  { id: 'project_institute', label: 'Oʻrmon loyiha instituti' },
  { id: 'finance_dept', label: 'Moliya-hisob boʻlimi' },
  { id: 'inspection', label: 'Tuman oʻrmon inspeksiyasi' },
];

/**
 * TZ 4.2.1.1: when the list of roles is shown the system checks that the user meets the
 * role requirements; a role the user does not qualify for is not shown at all.
 * The prosecutor role is intentionally absent — it is granted only after live verification
 * in "Raqamli nazorat" (TZ 4.1.6), never created by hand.
 */
const ROLE_ELIGIBILITY: { code: string; label: string; orgTypes: string[]; requiresPosition?: string }[] = [
  { code: 'sys_admin', label: 'Tizim administratori', orgTypes: ['it_operator'] },
  { code: 'central_admin', label: 'Markaziy apparat xodimi', orgTypes: ['agency_central'] },
  { code: 'management', label: 'Rahbariyat', orgTypes: ['agency_central'], requiresPosition: 'rahbar' },
  { code: 'executor_staff', label: 'Ijrochi tashkilot xodimi', orgTypes: ['leskhoz', 'regional_dept'] },
  { code: 'gis_specialist', label: 'GIS / meʼyoriy mutaxassis', orgTypes: ['project_institute', 'regional_dept'] },
  { code: 'executor_head', label: 'Ijrochi tashkilot rahbari', orgTypes: ['leskhoz'], requiresPosition: 'rahbar' },
  { code: 'inspector', label: 'Inspektor', orgTypes: ['inspection', 'leskhoz'] },
  { code: 'accountant', label: 'Buxgalter', orgTypes: ['finance_dept', 'leskhoz', 'agency_central'] },
];

const REGIONS = [
  { id: 'tashkent', label: 'Toshkent viloyati' },
  { id: 'samarkand', label: 'Samarqand viloyati' },
  { id: 'kashkadarya', label: 'Qashqadaryo viloyati' },
  { id: 'namangan', label: 'Namangan viloyati' },
  { id: 'republic', label: 'Respublika (markaziy)' },
];

const generateOneTimePassword = (seed: number) => {
  const upper = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const lower = 'abcdefghijkmnpqrstuvwxyz';
  const digits = '23456789';
  const special = '!@#$%&*';
  let result = '';
  for (let i = 0; i < 4; i += 1) {
    const step = seed + i * 7;
    result += upper[step % upper.length];
    result += lower[(step * 3) % lower.length];
    result += digits[(step * 5) % digits.length];
  }
  return `${result.slice(0, 10)}${special[seed % special.length]}`;
};

export const AdminUsersPage: React.FC<AdminUsersPageProps> = ({ userRole = '' }) => {
  /**
   * TZ appendix 4: "Пользователи и роли" is К for the central apparatus and
   * management — the registry is visible, but creating, editing, blocking and
   * deleting accounts stay with the system administrator.
   */
  const canManage = hasRight(userRole, 'users_roles', 'edit');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');
  const [selectedRegionFilter, setSelectedRegionFilter] = useState('all');
  const [selectedOrgFilter, setSelectedOrgFilter] = useState('all');
  const [selectedActivityFilter, setSelectedActivityFilter] = useState('all');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<UserRecord | null>(null);
  const [userToDelete, setUserToDelete] = useState<UserRecord | null>(null);
  const [userToReset, setUserToReset] = useState<UserRecord | null>(null);
  const [userForFunctions, setUserForFunctions] = useState<UserRecord | null>(null);
  const [grantedFunctions, setGrantedFunctions] = useState<string[]>([]);
  const [issuedPassword, setIssuedPassword] = useState<string | null>(null);
  const [copiedPassword, setCopiedPassword] = useState(false);

  const functionGroups = useMemo(() => groupSystemFunctions(), []);

  // 10 role accounts from tz/21-mock-users.md — passwords are never surfaced in the UI.
  const [usersList, setUsersList] = useState<UserRecord[]>([
    {
      id: '1', code: 'sys_admin', roleName: 'Tizim administratori', pinfl: '11111111111111',
      fio: 'Ergashov Sardor Anvarovich', position: 'Bosh administrator',
      organization: '"Oʻzmon texno" DUK', orgType: 'it_operator', region: 'republic',
      defaultPage: 'admin_settings', status: 'active',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
      lastActive: 'Bugun 13:08 (IP 172.16.4.12)', lastActiveDays: 0, pendingItems: 0, mustChangePassword: false,
      failedLogins: 0, extraFunctions: [],
    },
    {
      id: '2', code: 'central_admin', roleName: 'Markaziy apparat xodimi', pinfl: '22222222222222',
      fio: 'Karimov Jamshid Botirovich', position: 'Boʻlim boshligʻi',
      organization: 'Oʻrmon xoʻjaligi agentligi', orgType: 'agency_central', region: 'republic',
      defaultPage: 'leskhoz_inbox', status: 'active',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
      lastActive: 'Bugun 12:40 (IP 172.16.4.25)', lastActiveDays: 0, pendingItems: 3, mustChangePassword: false,
      failedLogins: 0, extraFunctions: ['report.accept'],
    },
    {
      id: '3', code: 'management', roleName: 'Rahbariyat', pinfl: '33333333333333',
      fio: 'Tashpulatova Nodira Rustamovna', position: 'Direktor oʻrinbosari',
      organization: 'Oʻrmon xoʻjaligi agentligi', orgType: 'agency_central', region: 'republic',
      defaultPage: 'manager_decision', status: 'active',
      badgeColor: 'bg-[#F0F7F1] text-[#2E7D4F] border-[#D9EBDC]',
      lastActive: 'Kecha 18:15', lastActiveDays: 1, pendingItems: 0, mustChangePassword: false,
      failedLogins: 0, extraFunctions: [],
    },
    {
      id: '4', code: 'executor_staff', roleName: 'Ijrochi tashkilot xodimi', pinfl: '44444444444444',
      fio: 'Rahimov Jasur Umidovich', position: 'Katta mutaxassis',
      organization: 'Boʻstonliq DЎX', orgType: 'leskhoz', region: 'tashkent',
      defaultPage: 'leskhoz_inbox', status: 'active',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      lastActive: 'Bugun 11:05', lastActiveDays: 0, pendingItems: 7, mustChangePassword: false,
      failedLogins: 2, extraFunctions: [],
    },
    {
      id: '5', code: 'gis_specialist', roleName: 'GIS / meʼyoriy mutaxassis', pinfl: '55555555555555',
      fio: 'Yusupov Bobur Maratovich', position: 'GIS mutaxassisi',
      organization: 'Oʻrmon loyiha instituti', orgType: 'project_institute', region: 'republic',
      defaultPage: 'gis_editor', status: 'active',
      badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-200',
      lastActive: 'Bugun 12:45', lastActiveDays: 0, pendingItems: 2, mustChangePassword: false,
      failedLogins: 0, extraFunctions: ['gis.import'],
    },
    {
      id: '6', code: 'executor_head', roleName: 'Ijrochi tashkilot rahbari', pinfl: '66666666666666',
      fio: 'Mirzayev Dilshod Akramovich', position: 'Direktor',
      organization: 'Boʻstonliq DЎX', orgType: 'leskhoz', region: 'tashkent',
      defaultPage: 'manager_decision', status: 'suspended',
      suspendReason: 'Ketma-ket 5 marta notoʻgʻri parol kiritilgani uchun tizim tomonidan toʻxtatilgan',
      badgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
      lastActive: 'Kecha 16:30', lastActiveDays: 1, pendingItems: 4, mustChangePassword: false,
      failedLogins: 5, extraFunctions: [],
    },
    {
      id: '7', code: 'inspector', roleName: 'Inspektor', pinfl: '77777777777777',
      fio: 'Abdullayev Alisher Nabiyevich', position: 'Tuman inspektori',
      organization: 'Boʻstonliq tumani oʻrmon inspeksiyasi', orgType: 'inspection', region: 'tashkent',
      defaultPage: 'field_tasks', status: 'active',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      lastActive: 'Bugun 10:15 (mobil PWA)', lastActiveDays: 0, pendingItems: 1, mustChangePassword: false,
      failedLogins: 0, extraFunctions: [],
    },
    {
      id: '8', code: 'accountant', roleName: 'Buxgalter', pinfl: '88888888888888',
      fio: 'Umarova Malika Saidovna', position: 'Bosh buxgalter',
      organization: 'Moliya-hisob boʻlimi', orgType: 'finance_dept', region: 'republic',
      defaultPage: 'accountant_reconciliation', status: 'active',
      badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      lastActive: 'Kecha 17:45', lastActiveDays: 1, pendingItems: 0, mustChangePassword: false,
      failedLogins: 0, extraFunctions: ['export.data'],
    },
    {
      id: '9', code: 'applicant', roleName: 'Jismoniy va yuridik shaxs (ariza beruvchi)', pinfl: '30491823410019',
      fio: 'Saidov Otabek Shavkatovich', position: 'Ariza beruvchi',
      organization: '"Burchmulla Agro" MCHJ', orgType: 'external', region: 'tashkent',
      defaultPage: 'applicant_dashboard', status: 'active',
      badgeColor: 'bg-[#F0F7F1] text-[#15803D] border-[#D9EBDC]',
      lastActive: 'Bugun 13:00 (OneID)', lastActiveDays: 0, pendingItems: 2, mustChangePassword: false,
      failedLogins: 0, extraFunctions: [],
    },
    {
      id: '10', code: 'prosecutor', roleName: 'Prokuror (faqat oʻqish)', pinfl: '99999999999999',
      fio: 'Xalilov Utkir Xasanovich', position: '11-tarmoq prokurori',
      organization: 'Bosh prokuratura', orgType: 'prosecutor_office', region: 'republic',
      defaultPage: 'prosecutor_portal', status: 'active',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
      lastActive: 'Bugun 09:30 («Raqamli nazorat» verifikatsiyasi)', lastActiveDays: 0, pendingItems: 0, mustChangePassword: false,
      failedLogins: 0, extraFunctions: [],
    },
  ]);

  // New user form
  const [newUserFio, setNewUserFio] = useState('');
  const [newUserPinfl, setNewUserPinfl] = useState('');
  const [newUserPosition, setNewUserPosition] = useState('');
  const [newUserOrgType, setNewUserOrgType] = useState('leskhoz');
  const [newUserOrg, setNewUserOrg] = useState('');
  const [newUserRegion, setNewUserRegion] = useState('tashkent');
  const [newUserRole, setNewUserRole] = useState('executor_staff');
  const [newUserError, setNewUserError] = useState<string | null>(null);

  // Edit form
  const [editFio, setEditFio] = useState('');
  const [editPosition, setEditPosition] = useState('');
  const [editRole, setEditRole] = useState('');

  /** Roles the chosen organisation type actually qualifies for. */
  const eligibleRoles = useMemo(
    () => ROLE_ELIGIBILITY.filter((r) => r.orgTypes.includes(newUserOrgType)),
    [newUserOrgType]
  );

  const handleOrgTypeChange = (value: string) => {
    setNewUserOrgType(value);
    const nextEligible = ROLE_ELIGIBILITY.filter((r) => r.orgTypes.includes(value));
    setNewUserRole(nextEligible[0]?.code ?? '');
    setNewUserError(null);
  };

  const openAddModal = () => {
    setNewUserFio('');
    setNewUserPinfl('');
    setNewUserPosition('');
    setNewUserOrg('');
    setNewUserError(null);
    handleOrgTypeChange('leskhoz');
    setIsAddModalOpen(true);
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserFio.trim()) {
      setNewUserError('F.I.SH kiritilishi shart.');
      return;
    }
    if (!/^\d{14}$/.test(newUserPinfl) && !/^\d{9}$/.test(newUserPinfl)) {
      setNewUserError('JSHSHIR 14 xonali, STIR esa 9 xonali son boʻlishi kerak.');
      return;
    }
    if (usersList.some((u) => u.pinfl === newUserPinfl)) {
      setNewUserError('Bunday JSHSHIR/STIR bilan foydalanuvchi allaqachon roʻyxatdan oʻtgan.');
      return;
    }
    if (!newUserRole) {
      setNewUserError('Tanlangan tashkilot turi uchun mos rol topilmadi.');
      return;
    }

    const roleMeta = ROLE_ELIGIBILITY.find((r) => r.code === newUserRole);
    const orgTypeLabel = ORG_TYPES.find((o) => o.id === newUserOrgType)?.label ?? '';

    setUsersList((prev) => [
      {
        id: `u-${prev.length + 1}-${newUserPinfl.slice(-4)}`,
        code: newUserRole,
        roleName: roleMeta?.label ?? 'Ijrochi xodim',
        pinfl: newUserPinfl,
        fio: newUserFio.trim(),
        position: newUserPosition.trim() || 'Mutaxassis',
        organization: newUserOrg.trim() || orgTypeLabel,
        orgType: newUserOrgType,
        region: newUserRegion,
        defaultPage: 'leskhoz_inbox',
        status: 'active',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        lastActive: 'Hali kirmagan',
        lastActiveDays: 999,
        pendingItems: 0,
        // TZ 4.2.1.1: a new account gets a one-time password that must be changed on first login.
        mustChangePassword: true,
        failedLogins: 0,
        extraFunctions: [],
      },
      ...prev,
    ]);
    setIsAddModalOpen(false);
  };

  const openEditModal = (user: UserRecord) => {
    setUserToEdit(user);
    setEditFio(user.fio);
    setEditPosition(user.position);
    setEditRole(user.code);
  };

  const handleSaveEdit = () => {
    if (!userToEdit) return;
    const roleMeta = ROLE_ELIGIBILITY.find((r) => r.code === editRole);
    setUsersList((prev) =>
      prev.map((u) =>
        u.id === userToEdit.id
          ? { ...u, fio: editFio, position: editPosition, code: editRole, roleName: roleMeta?.label ?? u.roleName }
          : u
      )
    );
    setUserToEdit(null);
  };

  /** Blocking is manual; restoring also clears an automatic suspension and its counter. */
  const toggleUserStatus = (id: string) => {
    setUsersList((prev) =>
      prev.map((u) =>
        u.id === id
          ? u.status === 'active'
            ? { ...u, status: 'blocked' as const, suspendReason: undefined }
            : { ...u, status: 'active' as const, suspendReason: undefined, failedLogins: 0 }
          : u
      )
    );
  };

  const openFunctionsModal = (user: UserRecord) => {
    setUserForFunctions(user);
    setGrantedFunctions([...user.extraFunctions]);
  };

  const toggleGrantedFunction = (code: string) => {
    setGrantedFunctions((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  const handleSaveFunctions = () => {
    if (!userForFunctions) return;
    setUsersList((prev) =>
      prev.map((u) => (u.id === userForFunctions.id ? { ...u, extraFunctions: grantedFunctions } : u))
    );
    setUserForFunctions(null);
  };

  const handleResetPassword = (user: UserRecord) => {
    setUserToReset(user);
    setIssuedPassword(generateOneTimePassword(Number(user.pinfl.slice(-4)) || 42));
    setCopiedPassword(false);
  };

  const handleConfirmReset = () => {
    if (!userToReset) return;
    setUsersList((prev) =>
      prev.map((u) => (u.id === userToReset.id ? { ...u, mustChangePassword: true } : u))
    );
    setUserToReset(null);
    setIssuedPassword(null);
  };

  /** TZ 4.2.1.1: deletion is refused while the user still has unfinished work. */
  const handleConfirmDelete = () => {
    if (!userToDelete || userToDelete.pendingItems > 0) return;
    setUsersList((prev) => prev.filter((u) => u.id !== userToDelete.id));
    setUserToDelete(null);
  };

  const filteredUsers = usersList.filter((u) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      u.fio.toLowerCase().includes(query) ||
      u.pinfl.includes(searchQuery) ||
      u.organization.toLowerCase().includes(query) ||
      u.position.toLowerCase().includes(query) ||
      u.roleName.toLowerCase().includes(query);

    const matchesRole = selectedRoleFilter === 'all' || u.code === selectedRoleFilter;
    const matchesStatus = selectedStatusFilter === 'all' || u.status === selectedStatusFilter;
    const matchesRegion = selectedRegionFilter === 'all' || u.region === selectedRegionFilter;
    const matchesOrg = selectedOrgFilter === 'all' || u.orgType === selectedOrgFilter;
    const matchesActivity =
      selectedActivityFilter === 'all' ||
      (selectedActivityFilter === 'today' && u.lastActiveDays === 0) ||
      (selectedActivityFilter === 'week' && u.lastActiveDays <= 7) ||
      (selectedActivityFilter === 'month' && u.lastActiveDays <= 30) ||
      (selectedActivityFilter === 'never' && u.lastActiveDays === 999);

    return matchesSearch && matchesRole && matchesStatus && matchesRegion && matchesOrg && matchesActivity;
  });

  // Head-count figures follow TZ 4.1.3: ~10 000 portal users, up to 300 field executors,
  // up to 50 central staff, 5-10 administrators, 1-100 prosecutors.
  const registeredTotal = 10457;
  const activeNow = 268;

  return (
    <div className="space-y-6 font-sans">
      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E4E7EA] p-5 rounded-2xl shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#5A646D] uppercase tracking-wider block">Roʻyxatdan oʻtgan</span>
            <div className="text-xl font-bold text-[#1A1F24]">{registeredTotal.toLocaleString('ru-RU')} ta</div>
            <span className="text-xs text-[#15803D] font-medium flex items-center gap-1 mt-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 10 ta tizim roli boʻyicha
            </span>
          </div>
          <div className="p-3 bg-[#F0F7F1] rounded-xl text-[#2E7D4F]"><Users className="w-6 h-6" /></div>
        </div>

        <div className="bg-white border border-[#E4E7EA] p-5 rounded-2xl shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#5A646D] uppercase tracking-wider block">Hozir faol seans</span>
            <div className="text-xl font-bold text-[#1A1F24]">{activeNow} nafar</div>
            <span className="text-xs text-[#15803D] font-medium flex items-center gap-1 mt-1">
              <span className="w-2 h-2 rounded-full bg-[#15803D] animate-pulse" /> Real vaqt
            </span>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><UserCheck className="w-6 h-6" /></div>
        </div>

        <div className="bg-white border border-[#E4E7EA] p-5 rounded-2xl shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#5A646D] uppercase tracking-wider block">Joylardagi ijrochilar</span>
            <div className="text-xl font-bold text-[#1A1F24]">287 / 300</div>
            <span className="text-xs text-[#5A646D] font-medium block mt-1">84 ta DЎX va boshqarmalar</span>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><Building2 className="w-6 h-6" /></div>
        </div>

        <div className="bg-white border border-[#E4E7EA] p-5 rounded-2xl shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#5A646D] uppercase tracking-wider block">Bloklangan akkauntlar</span>
            <div className="text-xl font-bold text-[#1A1F24]">
              {usersList.filter((u) => u.status !== 'active').length} ta
            </div>
            <span className="text-xs text-[#5A646D] font-medium flex items-center gap-1 mt-1">
              <Lock className="w-3.5 h-3.5" /> Vaqtincha toʻxtatilgan
            </span>
          </div>
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl"><KeyRound className="w-6 h-6" /></div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#2E7D4F] bg-[#F0F7F1] px-3 py-1 rounded-full border border-[#D9EBDC]">
            Foydalanuvchilar moduli (4.2.1.1)
          </span>
          <h1 className="text-lg font-bold text-[#1A1F24] mt-1.5">Foydalanuvchilarni Boshqarish</h1>
          <p className="text-xs text-[#5A646D] mt-0.5">
            Akkaunt yaratish, rol biriktirish, parolni tiklash, kirishni vaqtincha toʻxtatish va oʻchirish
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Download className="w-4 h-4" />}
            onClick={() => alert('Foydalanuvchilar roʻyxati Excel formatida tayyorlanmoqda.')}
          >
            Excelga eksport
          </Button>
          {canManage && (
            <Button
              variant="primary"
              size="sm"
              leftIcon={<UserPlus className="w-4 h-4" />}
              onClick={openAddModal}
              className="bg-[#2E7D4F] hover:bg-[#23653F] font-bold shadow-sm"
            >
              Yangi foydalanuvchi
            </Button>
          )}
        </div>
      </div>

      {/* Filters — TZ 4.2.1.1: by activity, role, organisation, territory, last login period */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-4 shadow-xs space-y-3">
        <div className="w-full md:w-96">
          <Input
            placeholder="F.I.SH, JSHSHIR/STIR, tashkilot yoki lavozim..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
            touchSize
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-1 border-t border-[#E4E7EA]">
          <SlidersHorizontal className="w-4 h-4 text-[#5A646D]" />

          <select
            value={selectedRoleFilter}
            onChange={(e) => setSelectedRoleFilter(e.target.value)}
            className="bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-xs font-semibold px-3 py-2 text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
          >
            <option value="all">Barcha rollar (10 ta)</option>
            <option value="sys_admin">Tizim administratori</option>
            <option value="central_admin">Markaziy apparat xodimi</option>
            <option value="management">Rahbariyat</option>
            <option value="executor_staff">Ijrochi tashkilot xodimi</option>
            <option value="gis_specialist">GIS / meʼyoriy mutaxassis</option>
            <option value="executor_head">Ijrochi tashkilot rahbari</option>
            <option value="inspector">Inspektor</option>
            <option value="accountant">Buxgalter</option>
            <option value="applicant">Ariza beruvchi</option>
            <option value="prosecutor">Prokuror</option>
          </select>

          <select
            value={selectedRegionFilter}
            onChange={(e) => setSelectedRegionFilter(e.target.value)}
            className="bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-xs font-semibold px-3 py-2 text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
          >
            <option value="all">Barcha hududlar</option>
            {REGIONS.map((r) => (
              <option key={r.id} value={r.id}>{r.label}</option>
            ))}
          </select>

          <select
            value={selectedOrgFilter}
            onChange={(e) => setSelectedOrgFilter(e.target.value)}
            className="bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-xs font-semibold px-3 py-2 text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F] max-w-[15rem]"
          >
            <option value="all">Barcha tashkilotlar</option>
            {ORG_TYPES.map((o) => (
              <option key={o.id} value={o.id}>{o.label}</option>
            ))}
          </select>

          <select
            value={selectedActivityFilter}
            onChange={(e) => setSelectedActivityFilter(e.target.value)}
            className="bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-xs font-semibold px-3 py-2 text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
          >
            <option value="all">Oxirgi kirish: hammasi</option>
            <option value="today">Bugun kirgan</option>
            <option value="week">Oxirgi 7 kun</option>
            <option value="month">Oxirgi 30 kun</option>
            <option value="never">Hali kirmagan</option>
          </select>

          <select
            value={selectedStatusFilter}
            onChange={(e) => setSelectedStatusFilter(e.target.value)}
            className="bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-xs font-semibold px-3 py-2 text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
          >
            <option value="all">Barcha statuslar</option>
            <option value="active">Faol</option>
            <option value="blocked">Bloklangan</option>
            <option value="suspended">Vaqtincha toʻxtatilgan</option>
          </select>

          <span className="text-xs text-[#767F87] ml-auto">
            Topildi: <b className="text-[#1A1F24] font-mono">{filteredUsers.length}</b> ta
          </span>
        </div>
      </div>

      {/* Users table */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8F9FA] border-b border-[#E4E7EA] text-[11px] font-bold uppercase tracking-wider text-[#5A646D]">
                <th className="py-3.5 px-4">№</th>
                <th className="py-3.5 px-4">F.I.SH va login (JSHSHIR/STIR)</th>
                <th className="py-3.5 px-4">Rol</th>
                <th className="py-3.5 px-4">Tashkilot va lavozim</th>
                <th className="py-3.5 px-4">Oxirgi faollik</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E7EA] text-xs">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-[#767F87]">
                    Filtr boʻyicha foydalanuvchilar topilmadi.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u, idx) => (
                  <tr key={u.id} className="hover:bg-[#F8F9FA] transition-colors">
                    <td className="py-4 px-4 font-mono font-semibold text-[#767F87]">{idx + 1}</td>
                    <td className="py-4 px-4">
                      <div className="font-bold text-[#1A1F24] text-sm">{u.fio}</div>
                      <div className="text-[11px] font-mono text-[#5A646D] mt-0.5">
                        Login: <b className="text-[#1A1F24]">{u.pinfl}</b>
                      </div>
                      {u.mustChangePassword && (
                        <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-bold text-[#B45309] bg-[#FFFBEB] px-2 py-0.5 rounded border border-[#FDE68A]">
                          <KeyRound className="w-3 h-3" /> Birinchi kirishda parol almashtiriladi
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold border ${u.badgeColor}`}>
                        <Shield className="w-3.5 h-3.5" />
                        {u.roleName}
                      </span>
                      <div className="text-[11px] font-mono text-[#767F87] mt-1">code: {u.code}</div>
                    </td>
                    <td className="py-4 px-4 text-[#5A646D] max-w-xs leading-relaxed">
                      <div className="font-semibold text-[#1A1F24]">{u.organization}</div>
                      <div className="text-[11px] text-[#767F87]">{u.position}</div>
                      {u.pendingItems > 0 && (
                        <div className="text-[11px] text-[#B45309] font-semibold mt-0.5">
                          Tugallanmagan ish: {u.pendingItems} ta
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4 font-mono text-[11px] text-[#5A646D]">{u.lastActive}</td>
                    <td className="py-4 px-4">
                      {u.status === 'active' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#F0F7F1] text-[#15803D] border border-[#D9EBDC]">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Faol
                        </span>
                      )}
                      {u.status === 'blocked' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                          <XCircle className="w-3.5 h-3.5" /> Bloklangan
                        </span>
                      )}
                      {/* Automatic suspension after the failed-login limit — TZ 4.2.1.1 */}
                      {u.status === 'suspended' && (
                        <>
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A]">
                            <Lock className="w-3.5 h-3.5" /> Toʻxtatilgan
                          </span>
                          <div className="text-[10px] text-[#B45309] mt-1 max-w-[10rem] leading-snug">
                            Avtomatik: {u.failedLogins}/{FAILED_LOGIN_LIMIT} xato parol
                          </div>
                        </>
                      )}
                      {u.status === 'active' && u.failedLogins > 0 && (
                        <div className="text-[10px] text-[#767F87] mt-1">
                          Xato urinish: {u.failedLogins}/{FAILED_LOGIN_LIMIT}
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4 text-right">
                      {!canManage ? (
                        <span className="text-[11px] text-[#767F87]">Faqat koʻrish</span>
                      ) : (
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => toggleUserStatus(u.id)}
                          title={u.status === 'active' ? 'Kirishni vaqtincha toʻxtatish' : 'Kirishni tiklash'}
                          className={`px-2.5 py-1 rounded-lg font-semibold text-xs transition-colors border ${
                            u.status === 'active'
                              ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                          }`}
                        >
                          {u.status === 'active' ? 'Bloklash' : 'Faollashtirish'}
                        </button>
                        <button
                          onClick={() => openFunctionsModal(u)}
                          title="Rolga kirmagan alohida funksiya biriktirish"
                          className={`p-1.5 rounded-lg transition-colors relative ${
                            u.extraFunctions.length > 0
                              ? 'text-[#2E7D4F] bg-[#F0F7F1]'
                              : 'text-[#5A646D] hover:text-[#2E7D4F] hover:bg-[#F0F7F1]'
                          }`}
                        >
                          <Puzzle className="w-4 h-4" />
                          {u.extraFunctions.length > 0 && (
                            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#2E7D4F] text-white text-[9px] font-bold flex items-center justify-center">
                              {u.extraFunctions.length}
                            </span>
                          )}
                        </button>
                        <button
                          onClick={() => handleResetPassword(u)}
                          title="Parolni tiklash (bir martalik parol)"
                          className="p-1.5 text-[#5A646D] hover:text-[#2E7D4F] hover:bg-[#F0F7F1] rounded-lg transition-colors"
                        >
                          <KeyRound className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openEditModal(u)}
                          title="Tahrirlash"
                          className="p-1.5 text-[#5A646D] hover:text-[#2E7D4F] hover:bg-[#F0F7F1] rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setUserToDelete(u)}
                          title="Oʻchirish"
                          className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add user modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Yangi foydalanuvchi yaratish"
        subtitle="Majburiy rekvizitlar: F.I.SH, JSHSHIR, lavozim, tashkilot, hudud va rol"
        maxWidth="lg"
        footer={
          <div className="flex items-center justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)}>
              Bekor qilish
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleAddUser}
              className="bg-[#2E7D4F] hover:bg-[#23653F] font-bold"
            >
              Saqlash va yaratish
            </Button>
          </div>
        }
      >
        <form onSubmit={handleAddUser} className="space-y-4 py-1">
          {newUserError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 font-semibold flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" /> {newUserError}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1A1F24]">F.I.SH (toʻliq):</label>
              <Input
                placeholder="Masalan: Axmedov Alisher Karimovich"
                value={newUserFio}
                onChange={(e) => { setNewUserFio(e.target.value); setNewUserError(null); }}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1A1F24]">JSHSHIR (14) yoki STIR (9):</label>
              <Input
                placeholder="31234567890123"
                value={newUserPinfl}
                onChange={(e) => { setNewUserPinfl(e.target.value.replace(/\D/g, '')); setNewUserError(null); }}
                maxLength={14}
                className="font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1A1F24]">Tashkilot turi:</label>
              <select
                value={newUserOrgType}
                onChange={(e) => handleOrgTypeChange(e.target.value)}
                className="w-full bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-sm p-3 text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
              >
                {ORG_TYPES.map((o) => (
                  <option key={o.id} value={o.id}>{o.label}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1A1F24]">Hudud:</label>
              <select
                value={newUserRegion}
                onChange={(e) => setNewUserRegion(e.target.value)}
                className="w-full bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-sm p-3 text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
              >
                {REGIONS.map((r) => (
                  <option key={r.id} value={r.id}>{r.label}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1A1F24]">Tashkilot va boʻlim nomi:</label>
              <Input
                placeholder="Masalan: Boʻstonliq DЎX / Meʼyor boʻlimi"
                value={newUserOrg}
                onChange={(e) => setNewUserOrg(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1A1F24]">Lavozim:</label>
              <Input
                placeholder="Masalan: Yetakchi muhandis"
                value={newUserPosition}
                onChange={(e) => setNewUserPosition(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#1A1F24]">Tizimdagi roli:</label>
            <select
              value={newUserRole}
              onChange={(e) => setNewUserRole(e.target.value)}
              disabled={eligibleRoles.length === 0}
              className="w-full bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-sm p-3 text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F] disabled:opacity-60"
            >
              {eligibleRoles.length === 0 ? (
                <option value="">Mos rol yoʻq</option>
              ) : (
                eligibleRoles.map((r) => (
                  <option key={r.code} value={r.code}>{r.label}</option>
                ))
              )}
            </select>
            <div className="p-3 bg-[#F0F7F1] border border-[#D9EBDC] rounded-xl text-[11px] text-[#2E7D4F] flex items-start gap-2 mt-1.5">
              <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span>
                Roʻyxatda faqat tanlangan tashkilot turiga <b>mos keladigan</b> rollar koʻrsatiladi.
                «Prokuror» roli qoʻlda berilmaydi — u «Raqamli nazorat» tizimidagi verifikatsiyadan soʻng avtomatik biriktiriladi.
                «Ariza beruvchi» roli esa OneID orqali oʻzini-oʻzi roʻyxatdan oʻtkazishda beriladi.
              </span>
            </div>
          </div>

          <div className="p-3 bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-[11px] text-[#5A646D] flex items-start gap-2">
            <KeyRound className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#2E7D4F]" />
            <span>
              Foydalanuvchiga <b className="text-[#1A1F24]">bir martalik parol</b> yaratiladi, birinchi kirishda uni almashtirish talab qilinadi.
              Parol SMS orqali yuborilmaydi.
            </span>
          </div>
        </form>
      </Modal>

      {/* Edit user modal */}
      <Modal
        isOpen={!!userToEdit}
        onClose={() => setUserToEdit(null)}
        title={`Foydalanuvchini tahrirlash — ${userToEdit?.fio ?? ''}`}
        subtitle="Shaxsiy maʼlumot, lavozim va rolni oʻzgartirish"
        footer={
          <div className="flex items-center justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setUserToEdit(null)}>
              Bekor qilish
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSaveEdit}
              className="bg-[#2E7D4F] hover:bg-[#23653F] font-bold"
            >
              Saqlash
            </Button>
          </div>
        }
      >
        <div className="space-y-4 py-1">
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#1A1F24]">F.I.SH:</label>
            <Input value={editFio} onChange={(e) => setEditFio(e.target.value)} />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#1A1F24]">Lavozim:</label>
            <Input value={editPosition} onChange={(e) => setEditPosition(e.target.value)} />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#1A1F24]">Rol:</label>
            <select
              value={editRole}
              onChange={(e) => setEditRole(e.target.value)}
              className="w-full bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-sm p-3 text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
            >
              {ROLE_ELIGIBILITY.filter((r) => r.orgTypes.includes(userToEdit?.orgType ?? '')).map((r) => (
                <option key={r.code} value={r.code}>{r.label}</option>
              ))}
              {!ROLE_ELIGIBILITY.some((r) => r.code === userToEdit?.code) && userToEdit && (
                <option value={userToEdit.code}>{userToEdit.roleName} (joriy)</option>
              )}
            </select>
          </div>

          {(userToEdit?.pendingItems ?? 0) > 0 && (
            <div className="p-3 bg-[#FFFBEB] border border-[#FDE68A] rounded-xl text-xs text-[#B45309] flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                Foydalanuvchida <b>{userToEdit?.pendingItems} ta</b> tugallanmagan ish bor.
                Rol oʻzgartirilsa, ular boshqa masʼulga topshirilishi kerak.
              </span>
            </div>
          )}

          <div className="p-3 bg-[#F0F7F1] border border-[#D9EBDC] rounded-xl text-[11px] text-[#2E7D4F] flex items-start gap-2">
            <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            <span>
              Shaxsiy maʼlumot oʻzgarganda <b>ilgari imzolangan hujjatlardagi maʼlumot oʻzgarmaydi</b> —
              ular imzolangan paytdagi snapshot bilan saqlanadi.
            </span>
          </div>
        </div>
      </Modal>

      {/* Password reset modal */}
      <Modal
        isOpen={!!userToReset}
        onClose={() => { setUserToReset(null); setIssuedPassword(null); }}
        title="Parolni tiklash"
        subtitle={userToReset?.fio}
        footer={
          <div className="flex items-center justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => { setUserToReset(null); setIssuedPassword(null); }}>
              Bekor qilish
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleConfirmReset}
              className="bg-[#2E7D4F] hover:bg-[#23653F] font-bold"
            >
              Tasdiqlash
            </Button>
          </div>
        }
      >
        <div className="space-y-4 py-1 text-xs">
          <div className="p-3 bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#5A646D] block">
              Bir martalik parol
            </span>
            <div className="flex items-center gap-2">
              <code className="flex-1 bg-white border border-[#E4E7EA] rounded-lg px-3 py-2 font-mono font-bold text-sm text-[#1A1F24] tracking-wider">
                {issuedPassword}
              </code>
              <button
                onClick={() => {
                  if (issuedPassword) navigator.clipboard.writeText(issuedPassword);
                  setCopiedPassword(true);
                  setTimeout(() => setCopiedPassword(false), 2000);
                }}
                className="p-2 rounded-lg border border-[#E4E7EA] text-[#5A646D] hover:text-[#2E7D4F] hover:bg-[#F0F7F1] transition-colors"
                title="Nusxalash"
              >
                {copiedPassword ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="p-3 bg-[#F0F7F1] border border-[#D9EBDC] rounded-xl text-[#2E7D4F] space-y-1">
            <span className="font-bold flex items-center gap-1">
              <Info className="w-4 h-4" /> Qoida (TZ 4.2.1.1 va 4.1.9)
            </span>
            <ul className="text-[11px] text-[#5A646D] space-y-0.5 list-disc pl-4">
              <li>Parol foydalanuvchiga <b>SMS orqali yuborilmaydi</b> — shaxsan topshiriladi.</li>
              <li>Birinchi kirishda parolni almashtirish majburiy.</li>
              <li>Parol xesh koʻrinishida saqlanadi, tizimda hech qayerda ochiq koʻrsatilmaydi.</li>
              <li>Amal audit jurnaliga yoziladi.</li>
            </ul>
          </div>
        </div>
      </Modal>

      {/* Individual function grant — TZ 4.2.1.1 */}
      <Modal
        isOpen={!!userForFunctions}
        onClose={() => setUserForFunctions(null)}
        title="Rolga kirmagan alohida funksiya biriktirish"
        subtitle={userForFunctions ? `${userForFunctions.fio} · ${userForFunctions.roleName}` : ''}
        maxWidth="2xl"
        footer={
          <div className="flex items-center justify-between gap-3 w-full">
            <span className="text-xs text-[#5A646D]">
              Qoʻshimcha berilgan: <b className="text-[#1A1F24] font-mono">{grantedFunctions.length}</b> ta funksiya
            </span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setUserForFunctions(null)}>
                Bekor qilish
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleSaveFunctions}
                className="bg-[#2E7D4F] hover:bg-[#23653F] font-bold"
              >
                Saqlash
              </Button>
            </div>
          </div>
        }
      >
        <div className="space-y-4 py-1">
          <div className="p-3 bg-[#F0F7F1] border border-[#D9EBDC] rounded-xl text-[11px] text-[#2E7D4F] flex items-start gap-2">
            <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            <span>
              Bu yerda foydalanuvchiga <b>yangi rol yaratmasdan</b> alohida funksiya beriladi —
              masalan yangi funksiyani sinovdan oʻtkazish uchun. Funksiya foydalanuvchining
              joriy roli huquqlari <b>ustiga</b> qoʻshiladi va audit jurnaliga yoziladi.
            </span>
          </div>

          <div className="p-3 bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-xs text-[#5A646D]">
            <span className="font-bold text-[#1A1F24] block mb-1">Rol boʻyicha allaqachon mavjud huquqlar:</span>
            <span>
              «{userForFunctions?.roleName}» roli funksiyalari bu roʻyxatda takrorlanmaydi —
              bu yerda faqat rolga <b>kirmagan</b> qoʻshimcha funksiyalar belgilanadi.
            </span>
          </div>

          <div className="max-h-72 overflow-y-auto border border-[#E4E7EA] rounded-xl divide-y divide-[#E4E7EA]">
            {Object.entries(functionGroups).map(([group, functions]) => (
              <div key={group} className="p-3 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#5A646D]">{group}</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                  {functions.map((fn) => (
                    <label
                      key={fn.code}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#F8F9FA] cursor-pointer text-xs"
                    >
                      <input
                        type="checkbox"
                        checked={grantedFunctions.includes(fn.code)}
                        onChange={() => toggleGrantedFunction(fn.code)}
                        className="w-4 h-4 accent-[#2E7D4F] shrink-0"
                      />
                      <span className="text-[#1A1F24]">{fn.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {grantedFunctions.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-[#1A1F24]">Tanlangan funksiyalar:</span>
              <div className="flex flex-wrap gap-1.5">
                {grantedFunctions.map((code) => (
                  <span
                    key={code}
                    className="text-[11px] font-mono bg-[#F0F7F1] text-[#2E7D4F] border border-[#D9EBDC] px-2 py-0.5 rounded-md"
                  >
                    {SYSTEM_FUNCTIONS.find((f) => f.code === code)?.label ?? code}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </Modal>

      {/* Delete user modal */}
      <Modal
        isOpen={!!userToDelete}
        onClose={() => setUserToDelete(null)}
        title="Foydalanuvchini oʻchirishni tasdiqlang"
        subtitle={userToDelete?.fio}
        footer={
          <div className="flex items-center justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setUserToDelete(null)}>
              Bekor qilish
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleConfirmDelete}
              disabled={(userToDelete?.pendingItems ?? 0) > 0}
              className="bg-rose-700 hover:bg-rose-800 text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Ha, oʻchirish
            </Button>
          </div>
        }
      >
        <div className="space-y-3 py-1 text-xs">
          {(userToDelete?.pendingItems ?? 0) > 0 ? (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 space-y-1">
              <span className="font-bold flex items-center gap-1">
                <AlertTriangle className="w-4 h-4" /> Oʻchirish mumkin emas
              </span>
              <p className="leading-relaxed">
                Foydalanuvchida <b>{userToDelete?.pendingItems} ta</b> tugallanmagan ariza yoki toʻldirilmagan hisobot formasi bor.
                TZ 4.2.1.1 talabi boʻyicha avval bu ishlar boshqa masʼul xodimga topshirilishi kerak.
              </p>
            </div>
          ) : (
            <div className="p-3 bg-[#F0F7F1] border border-[#D9EBDC] rounded-xl text-[#2E7D4F]">
              Tugallanmagan ish topilmadi — akkauntni oʻchirish mumkin.
              Oʻchirish amali audit jurnaliga yoziladi, imzolangan hujjatlardagi maʼlumot oʻzgarmaydi.
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};
