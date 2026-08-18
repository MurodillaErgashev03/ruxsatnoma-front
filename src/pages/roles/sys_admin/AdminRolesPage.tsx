import React, { useMemo, useState } from 'react';
import {
  Shield,
  ShieldCheck,
  Plus,
  Copy,
  Edit,
  Trash2,
  Search,
  AlertTriangle,
  CheckCircle2,
  Users,
  ClipboardList,
  CalendarClock,
  Layers,
} from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/FormControls';
import { Tabs } from '../../../components/ui/Navigation';
import { Modal } from '../../../components/ui/Overlay';
import { SYSTEM_FUNCTIONS, groupSystemFunctions } from '../../../lib/systemFunctions';

export interface AdminRolesPageProps {
  onNavigate?: (page: string, params?: any) => void;
}

interface RoleRecord {
  id: string;
  code: string;
  name: string;
  criteria: string;
  usersCount: number;
  isSystem: boolean;
  functions: string[];
}

/** Right codes per TZ appendix 4: K — view, Y — create, O — change, T — approve/sign, CH — delete, E — export. */
type RightCode = 'K' | 'Y' | 'O' | 'T' | 'CH' | 'E';

const RIGHT_LABELS: Record<RightCode, string> = {
  K: 'Koʻrish',
  Y: 'Yaratish',
  O: 'Oʻzgartirish',
  T: 'Tasdiqlash / imzolash',
  CH: 'Oʻchirish',
  E: 'Eksport',
};

const ROLE_ORDER = [
  'sys_admin',
  'central_admin',
  'management',
  'executor_staff',
  'gis_specialist',
  'executor_head',
  'inspector',
  'accountant',
  'applicant',
  'prosecutor',
] as const;

const ROLE_SHORT: Record<string, string> = {
  sys_admin: 'Admin',
  central_admin: 'Markaziy',
  management: 'Rahbariyat',
  executor_staff: 'Ijrochi xodim',
  gis_specialist: 'GIS / meʼyor',
  executor_head: 'Tashkilot rahbari',
  inspector: 'Inspektor',
  accountant: 'Buxgalter',
  applicant: 'Ariza beruvchi',
  prosecutor: 'Prokuror',
};

/** Permission matrix — TZ 08-roles-permissions.md, appendix 4. */
const PERMISSION_MATRIX: { object: string; note?: string; rights: Record<string, RightCode[]> }[] = [
  {
    object: 'Ariza',
    rights: {
      sys_admin: ['K'], central_admin: ['K', 'E'], management: ['K', 'E'], executor_staff: ['K', 'Y', 'O'],
      gis_specialist: ['K'], executor_head: ['K', 'T'], inspector: ['K'], accountant: ['K'],
      applicant: ['K', 'Y', 'O'], prosecutor: ['K', 'E'],
    },
  },
  {
    object: 'Hisob-kitob (meʼyor, tarif)',
    rights: {
      sys_admin: ['K'], central_admin: ['K', 'E'], management: ['K', 'E'], executor_staff: ['K'],
      gis_specialist: ['K', 'Y', 'O'], executor_head: ['K', 'T'], inspector: ['K'], accountant: ['K'],
      applicant: ['K'], prosecutor: ['K', 'E'],
    },
  },
  {
    object: 'GIS kontur',
    rights: {
      sys_admin: ['K'], central_admin: ['K'], management: ['K'], executor_staff: ['K'],
      gis_specialist: ['K', 'Y', 'O'], executor_head: ['K', 'T'], inspector: ['K'], accountant: [],
      applicant: ['K'], prosecutor: ['K', 'E'],
    },
  },
  {
    object: 'Foydalanish meʼyori',
    rights: {
      sys_admin: ['K'], central_admin: ['K'], management: ['K'], executor_staff: ['K'],
      gis_specialist: ['K', 'Y', 'O'], executor_head: ['K', 'T'], inspector: ['K'], accountant: [],
      applicant: ['K'], prosecutor: ['K', 'E'],
    },
  },
  {
    object: 'Ruxsatnoma',
    rights: {
      sys_admin: ['K'], central_admin: ['K', 'E'], management: ['K', 'E'], executor_staff: ['K', 'Y'],
      gis_specialist: [], executor_head: ['K', 'T'], inspector: ['K'], accountant: ['K'],
      applicant: ['K', 'E'], prosecutor: ['K', 'E'],
    },
  },
  {
    object: 'Toʻlov va taqsimot',
    rights: {
      sys_admin: ['K'], central_admin: ['K', 'E'], management: ['K', 'E'], executor_staff: ['K'],
      gis_specialist: [], executor_head: ['K', 'T'], inspector: [], accountant: ['K', 'Y', 'O'],
      applicant: ['K'], prosecutor: ['K', 'E'],
    },
  },
  {
    object: 'Refund (toʻlovni qaytarish)',
    rights: {
      sys_admin: ['K'], central_admin: ['K', 'E'], management: ['K', 'E'], executor_staff: ['K'],
      gis_specialist: [], executor_head: ['K', 'T'], inspector: [], accountant: ['K', 'Y', 'O'],
      applicant: ['K', 'Y'], prosecutor: ['K', 'E'],
    },
  },
  {
    object: 'Inspeksiya dalolatnomasi',
    rights: {
      sys_admin: ['K'], central_admin: ['K', 'E'], management: ['K', 'E'], executor_staff: ['K'],
      gis_specialist: [], executor_head: ['K', 'T'], inspector: ['K', 'Y', 'T'], accountant: [],
      applicant: ['K'], prosecutor: ['K', 'E'],
    },
  },
  {
    object: 'Huquqbuzarlik ishi',
    rights: {
      sys_admin: ['K'], central_admin: ['K', 'E'], management: ['K', 'E'], executor_staff: ['K'],
      gis_specialist: [], executor_head: ['K', 'T'], inspector: ['K', 'Y'], accountant: [],
      applicant: ['K'], prosecutor: ['K', 'E'],
    },
  },
  {
    object: 'Hisobotlar',
    rights: {
      sys_admin: ['K'], central_admin: ['K', 'Y', 'O', 'T', 'E'], management: ['K', 'E'], executor_staff: ['K', 'Y', 'O'],
      gis_specialist: ['K'], executor_head: ['K', 'T'], inspector: [], accountant: ['K', 'Y'],
      applicant: [], prosecutor: ['K', 'E'],
    },
  },
  {
    object: 'Dashboard',
    rights: {
      sys_admin: ['K'], central_admin: ['K', 'E'], management: ['K', 'E'], executor_staff: ['K'],
      gis_specialist: ['K'], executor_head: ['K'], inspector: ['K'], accountant: ['K'],
      applicant: [], prosecutor: ['K', 'E'],
    },
  },
  {
    object: 'Foydalanuvchilar va rollar',
    rights: {
      sys_admin: ['K', 'Y', 'O', 'CH'], central_admin: ['K'], management: ['K'], executor_staff: [],
      gis_specialist: [], executor_head: ['K'], inspector: [], accountant: [],
      applicant: [], prosecutor: ['K'],
    },
  },
  {
    object: 'Klassifikatorlar',
    rights: {
      sys_admin: ['K', 'Y', 'O'], central_admin: ['K'], management: ['K'], executor_staff: ['K'],
      gis_specialist: ['K'], executor_head: ['K'], inspector: ['K'], accountant: ['K'],
      applicant: [], prosecutor: ['K'],
    },
  },
  {
    object: 'Audit jurnali',
    note: 'Hech bir rol audit yozuvini oʻchira olmaydi (WORM)',
    rights: {
      sys_admin: ['K'], central_admin: ['K'], management: ['K'], executor_staff: [],
      gis_specialist: [], executor_head: ['K'], inspector: [], accountant: [],
      applicant: [], prosecutor: ['K', 'E'],
    },
  },
  {
    object: 'Tizim sozlamalari',
    rights: {
      sys_admin: ['K', 'Y', 'O'], central_admin: [], management: [], executor_staff: [],
      gis_specialist: [], executor_head: [], inspector: [], accountant: [],
      applicant: [], prosecutor: [],
    },
  },
  {
    object: 'Zahiraviy nusxalar',
    rights: {
      sys_admin: ['K', 'Y', 'O', 'CH'], central_admin: [], management: [], executor_staff: [],
      gis_specialist: [], executor_head: [], inspector: [], accountant: [],
      applicant: [], prosecutor: [],
    },
  },
  {
    object: 'Arxiv',
    rights: {
      sys_admin: ['K'], central_admin: ['K', 'E'], management: ['K', 'E'], executor_staff: ['K'],
      gis_specialist: ['K'], executor_head: ['K'], inspector: ['K'], accountant: ['K'],
      applicant: ['K'], prosecutor: ['K', 'E'],
    },
  },
];

const INITIAL_ROLES: RoleRecord[] = [
  {
    id: 'r1', code: 'sys_admin', name: 'Tizim administratori', criteria: 'Lavozim: administrator | Tashkilot: "Oʻzmon texno" DUK',
    usersCount: 7, isSystem: true,
    functions: ['admin.users', 'admin.roles', 'admin.orgs', 'admin.classifiers', 'admin.settings', 'admin.backup', 'admin.audit', 'admin.announcements', 'application.view', 'norm.view', 'gis.view', 'permit.view', 'payment.view', 'report.view', 'dashboard.view', 'archive.view'],
  },
  {
    id: 'r2', code: 'central_admin', name: 'Markaziy apparat xodimi', criteria: 'Tashkilot: Oʻrmon xoʻjaligi agentligi markaziy apparati',
    usersCount: 32, isSystem: true,
    functions: ['application.view', 'norm.view', 'gis.view', 'permit.view', 'payment.view', 'report.view', 'report.manage', 'report.accept', 'dashboard.view', 'export.data', 'archive.view'],
  },
  {
    id: 'r3', code: 'management', name: 'Rahbariyat', criteria: 'Lavozim: direktor, direktor oʻrinbosari',
    usersCount: 11, isSystem: true,
    functions: ['application.view', 'norm.view', 'gis.view', 'permit.view', 'payment.view', 'report.view', 'dashboard.view', 'export.data', 'archive.view'],
  },
  {
    id: 'r4', code: 'executor_staff', name: 'Ijrochi tashkilot xodimi', criteria: 'Tashkilot: DЎX | Lavozim: mutaxassis, katta mutaxassis',
    usersCount: 186, isSystem: true,
    functions: ['application.view', 'application.edit', 'application.assign', 'application.extend', 'norm.view', 'gis.view', 'permit.view', 'permit.issue', 'report.view', 'report.fill', 'dashboard.view', 'archive.view'],
  },
  {
    id: 'r5', code: 'gis_specialist', name: 'GIS / meʼyoriy mutaxassis', criteria: 'Tashkilot: Oʻrmon loyiha instituti | Lavozim: GIS mutaxassisi',
    usersCount: 24, isSystem: true,
    functions: ['application.view', 'gis.view', 'gis.edit', 'gis.import', 'norm.view', 'norm.edit', 'report.view', 'dashboard.view', 'archive.view'],
  },
  {
    id: 'r6', code: 'executor_head', name: 'Ijrochi tashkilot rahbari', criteria: 'Tashkilot: DЎX | Lavozim: direktor (vakolatli shaxs)',
    usersCount: 58, isSystem: true,
    functions: ['application.view', 'application.decide', 'norm.view', 'norm.approve', 'gis.view', 'permit.view', 'permit.sign', 'permit.suspend', 'permit.duplicate', 'payment.view', 'report.view', 'dashboard.view', 'admin.audit', 'archive.view'],
  },
  {
    id: 'r7', code: 'inspector', name: 'Inspektor', criteria: 'Lavozim: tuman inspektori | Hudud biriktirilgan boʻlishi shart',
    usersCount: 32, isSystem: true,
    functions: ['application.view', 'permit.view', 'gis.view', 'norm.view', 'inspection.task', 'inspection.act', 'inspection.violation', 'dashboard.view', 'archive.view'],
  },
  {
    id: 'r8', code: 'accountant', name: 'Buxgalter', criteria: 'Boʻlim: moliya-hisob | Lavozim: buxgalter, bosh buxgalter',
    usersCount: 21, isSystem: true,
    functions: ['application.view', 'permit.view', 'payment.view', 'payment.reconcile', 'payment.refund', 'report.view', 'report.fill', 'dashboard.view', 'archive.view'],
  },
  {
    id: 'r9', code: 'applicant', name: 'Jismoniy va yuridik shaxs (ariza beruvchi)', criteria: 'OneID orqali oʻzini-oʻzi roʻyxatdan oʻtkazish',
    usersCount: 9840, isSystem: true,
    functions: ['application.view', 'application.create', 'application.edit', 'application.extend', 'permit.view', 'gis.view', 'norm.view', 'payment.view', 'payment.refund', 'archive.view'],
  },
  {
    id: 'r10', code: 'prosecutor', name: 'Prokuror (faqat oʻqish)', criteria: '«Raqamli nazorat» tizimida JSHSHIR boʻyicha verifikatsiyadan soʻng',
    usersCount: 46, isSystem: true,
    functions: ['application.view', 'norm.view', 'gis.view', 'permit.view', 'payment.view', 'inspection.task', 'report.view', 'dashboard.view', 'admin.audit', 'export.data', 'archive.view'],
  },
];

const REVIEW_LOG = [
  { id: 'REV-2026-08', period: '2026-avgust', date: '01.08.2026', reviewer: 'Ergashov Sardor Anvarovich', checked: 10, changed: 2, note: 'Ikki xodimning roli lavozim oʻzgarishi sababli qayta biriktirildi' },
  { id: 'REV-2026-07', period: '2026-iyul', date: '01.07.2026', reviewer: 'Ergashov Sardor Anvarovich', checked: 10, changed: 0, note: 'Oʻzgarishsiz' },
  { id: 'REV-2026-06', period: '2026-iyun', date: '02.06.2026', reviewer: 'Ergashov Sardor Anvarovich', checked: 10, changed: 4, note: 'Ishdan boʻshagan 4 xodimning huquqi bekor qilindi' },
];

export const AdminRolesPage: React.FC<AdminRolesPageProps> = () => {
  const [rolesList, setRolesList] = useState<RoleRecord[]>(INITIAL_ROLES);
  const [activeTab, setActiveTab] = useState('roles');
  const [searchQuery, setSearchQuery] = useState('');

  const [editedRole, setEditedRole] = useState<RoleRecord | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formName, setFormName] = useState('');
  const [formCriteria, setFormCriteria] = useState('');
  const [formFunctions, setFormFunctions] = useState<string[]>([]);
  const [formError, setFormError] = useState<string | null>(null);
  const [duplicateWarning, setDuplicateWarning] = useState<RoleRecord | null>(null);

  const [roleToDelete, setRoleToDelete] = useState<RoleRecord | null>(null);

  /** TZ 4.2.1.2: an indicator of how completely the roles cover every system function. */
  const assignedFunctions = useMemo(
    () => new Set(rolesList.flatMap((r) => r.functions)),
    [rolesList]
  );
  const unassignedFunctions = SYSTEM_FUNCTIONS.filter((f) => !assignedFunctions.has(f.code));
  const coveragePercent = Math.round((assignedFunctions.size / SYSTEM_FUNCTIONS.length) * 100);

  const functionGroups = useMemo(() => groupSystemFunctions(), []);

  const filteredRoles = rolesList.filter(
    (r) =>
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.criteria.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openCreateForm = () => {
    setEditedRole(null);
    setFormName('');
    setFormCriteria('');
    setFormFunctions([]);
    setFormError(null);
    setDuplicateWarning(null);
    setIsFormOpen(true);
  };

  const openEditForm = (role: RoleRecord) => {
    setEditedRole(role);
    setFormName(role.name);
    setFormCriteria(role.criteria);
    setFormFunctions([...role.functions]);
    setFormError(null);
    setDuplicateWarning(null);
    setIsFormOpen(true);
  };

  /** TZ 4.2.1.2: copying a role keeps names unique. */
  const handleCopyRole = (role: RoleRecord) => {
    setEditedRole(null);
    let copyName = `${role.name} (nusxa)`;
    let counter = 2;
    while (rolesList.some((r) => r.name === copyName)) {
      copyName = `${role.name} (nusxa ${counter})`;
      counter += 1;
    }
    setFormName(copyName);
    setFormCriteria(role.criteria);
    setFormFunctions([...role.functions]);
    setFormError(null);
    setDuplicateWarning(null);
    setIsFormOpen(true);
  };

  const toggleFormFunction = (code: string) => {
    setDuplicateWarning(null);
    setFormFunctions((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  const toggleFormGroup = (group: string) => {
    const codes = functionGroups[group].map((f) => f.code);
    const allSelected = codes.every((c) => formFunctions.includes(c));
    setDuplicateWarning(null);
    setFormFunctions((prev) =>
      allSelected ? prev.filter((c) => !codes.includes(c)) : Array.from(new Set([...prev, ...codes]))
    );
  };

  /** TZ 4.2.1.2: warn when another role already has exactly the same set of functions. */
  const findSameFunctionRole = (functions: string[], ignoreId?: string) => {
    const key = [...functions].sort().join('|');
    return rolesList.find((r) => r.id !== ignoreId && [...r.functions].sort().join('|') === key) || null;
  };

  const handleSubmitRole = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = formName.trim();

    if (!trimmedName) {
      setFormError('Rol nomi kiritilishi shart.');
      return;
    }
    if (rolesList.some((r) => r.name.toLowerCase() === trimmedName.toLowerCase() && r.id !== editedRole?.id)) {
      setFormError('Bunday nomli rol allaqachon mavjud. Rol nomi takrorlanmas boʻlishi shart.');
      return;
    }
    if (formFunctions.length === 0) {
      setFormError('Rolga kamida bitta funksiya biriktirilishi kerak.');
      return;
    }

    const sameFunctionRole = findSameFunctionRole(formFunctions, editedRole?.id);
    if (sameFunctionRole && !duplicateWarning) {
      setFormError(null);
      setDuplicateWarning(sameFunctionRole);
      return;
    }

    if (editedRole) {
      setRolesList((prev) =>
        prev.map((r) =>
          r.id === editedRole.id ? { ...r, name: trimmedName, criteria: formCriteria, functions: formFunctions } : r
        )
      );
    } else {
      setRolesList((prev) => [
        {
          id: `r${prev.length + 1}-${trimmedName.length}`,
          code: trimmedName.toLowerCase().replace(/[^a-z0-9]+/g, '_').slice(0, 24),
          name: trimmedName,
          criteria: formCriteria || 'Biriktirish mezoni belgilanmagan',
          usersCount: 0,
          isSystem: false,
          functions: formFunctions,
        },
        ...prev,
      ]);
    }

    setIsFormOpen(false);
    setDuplicateWarning(null);
  };

  /** TZ 4.2.1.2: a role may be deleted only when no user holds it. */
  const handleConfirmDelete = () => {
    if (!roleToDelete || roleToDelete.usersCount > 0) return;
    setRolesList((prev) => prev.filter((r) => r.id !== roleToDelete.id));
    setRoleToDelete(null);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E4E7EA] p-5 rounded-2xl shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#5A646D] uppercase tracking-wider block">Tizim rollari</span>
            <div className="text-xl font-bold text-[#1A1F24]">{rolesList.length} ta rol</div>
            <span className="text-xs text-[#15803D] font-medium flex items-center gap-1 mt-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> RBAC + ABAC modeli
            </span>
          </div>
          <div className="p-3 bg-[#F0F7F1] rounded-xl text-[#2E7D4F]"><Shield className="w-6 h-6" /></div>
        </div>

        <div className="bg-white border border-[#E4E7EA] p-5 rounded-2xl shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#5A646D] uppercase tracking-wider block">Funksiyalar qamrovi</span>
            <div className="text-xl font-bold text-[#1A1F24]">{coveragePercent}%</div>
            <span className="text-xs text-[#5A646D] font-medium block mt-1">
              {assignedFunctions.size} / {SYSTEM_FUNCTIONS.length} ta funksiya biriktirilgan
            </span>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Layers className="w-6 h-6" /></div>
        </div>

        <div className="bg-white border border-[#E4E7EA] p-5 rounded-2xl shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#5A646D] uppercase tracking-wider block">Taqsimlanmagan funksiya</span>
            <div className={`text-xl font-bold ${unassignedFunctions.length > 0 ? 'text-[#B45309]' : 'text-[#15803D]'}`}>
              {unassignedFunctions.length} ta
            </div>
            <span className="text-xs text-[#5A646D] font-medium block mt-1">Hech bir rolga kirmagan</span>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><ClipboardList className="w-6 h-6" /></div>
        </div>

        <div className="bg-white border border-[#E4E7EA] p-5 rounded-2xl shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#5A646D] uppercase tracking-wider block">Huquqlarni qayta koʻrish</span>
            <div className="text-xl font-bold text-[#1A1F24]">{REVIEW_LOG[0].date}</div>
            <span className="text-xs text-[#15803D] font-medium block mt-1">Oyda bir marta (TZ 4.2.14)</span>
          </div>
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl"><CalendarClock className="w-6 h-6" /></div>
        </div>
      </div>

      {/* Header bar */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#2E7D4F] bg-[#F0F7F1] px-3 py-1 rounded-full border border-[#D9EBDC]">
            Rollarni boshqarish moduli (4.2.1.2)
          </span>
          <h1 className="text-lg font-bold text-[#1A1F24] mt-1.5">Rollar va Huquqlar Matritsasi</h1>
          <p className="text-xs text-[#5A646D] mt-0.5">
            Rol yaratish, nusxalash, tahrirlash va oʻchirish; funksiyalar toʻplamini belgilash va huquqlarni oylik qayta koʻrib chiqish
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={openCreateForm}
          className="bg-[#2E7D4F] hover:bg-[#23653F] font-bold shadow-sm"
        >
          Yangi rol yaratish
        </Button>
      </div>

      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-4 shadow-xs">
        <Tabs
          tabs={[
            { id: 'roles', label: 'Rollar roʻyxati', count: rolesList.length },
            { id: 'matrix', label: 'Huquqlar matritsasi', count: PERMISSION_MATRIX.length },
            { id: 'unassigned', label: 'Taqsimlanmagan funksiyalar', count: unassignedFunctions.length },
            { id: 'review', label: 'Qayta koʻrib chiqish jurnali', count: REVIEW_LOG.length },
          ]}
          activeTabId={activeTab}
          onChange={setActiveTab}
        />
      </div>

      {/* Tab: roles list */}
      {activeTab === 'roles' && (
        <>
          <div className="bg-white border border-[#E4E7EA] rounded-2xl p-4 shadow-xs">
            <div className="w-full md:w-96">
              <Input
                placeholder="Rol nomi, kodi yoki biriktirish mezoni..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search className="w-4 h-4" />}
                touchSize
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredRoles.map((role) => (
              <div key={role.id} className="bg-white border border-[#E4E7EA] p-5 rounded-2xl shadow-xs space-y-3 hover:border-[#7FB98A] transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-[#2E7D4F] shrink-0" />
                      <span className="font-bold text-sm text-[#1A1F24]">{role.name}</span>
                    </div>
                    <span className="text-[11px] font-mono text-[#767F87]">code: {role.code}</span>
                  </div>
                  {role.isSystem && (
                    <span className="text-[10px] font-bold text-[#2E7D4F] bg-[#F0F7F1] px-2.5 py-1 rounded-full border border-[#D9EBDC] shrink-0">
                      TZ roli
                    </span>
                  )}
                </div>

                <div className="p-3 bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-xs text-[#5A646D] space-y-1">
                  <div><span className="font-semibold text-[#1A1F24]">Biriktirish mezoni:</span> {role.criteria}</div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#5A646D]" />
                    Foydalanuvchilar: <b className="text-[#1A1F24] font-mono">{role.usersCount.toLocaleString('ru-RU')}</b>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-[#767F87] block">
                    Biriktirilgan funksiyalar ({role.functions.length} ta):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {role.functions.slice(0, 6).map((code) => (
                      <span key={code} className="text-[11px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md font-mono">
                        {code}
                      </span>
                    ))}
                    {role.functions.length > 6 && (
                      <span className="text-[11px] text-[#2E7D4F] font-bold px-1 py-0.5">
                        +{role.functions.length - 6} ta
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E4E7EA] flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleCopyRole(role)}
                    className="px-2.5 py-1 rounded-lg font-semibold text-xs border border-[#E4E7EA] text-[#5A646D] hover:bg-[#F8F9FA] transition-colors inline-flex items-center gap-1"
                  >
                    <Copy className="w-3.5 h-3.5" /> Nusxalash
                  </button>
                  <button
                    onClick={() => openEditForm(role)}
                    className="px-2.5 py-1 rounded-lg font-semibold text-xs border border-[#D9EBDC] bg-[#F0F7F1] text-[#2E7D4F] hover:bg-[#D9EBDC] transition-colors inline-flex items-center gap-1"
                  >
                    <Edit className="w-3.5 h-3.5" /> Tahrirlash
                  </button>
                  {/* TZ 4.2.1.2: deletion is only offered when the role has no users */}
                  {role.usersCount === 0 && !role.isSystem && (
                    <button
                      onClick={() => setRoleToDelete(role)}
                      className="px-2.5 py-1 rounded-lg font-semibold text-xs border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors inline-flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Oʻchirish
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Tab: permission matrix */}
      {activeTab === 'matrix' && (
        <div className="space-y-4">
          <div className="bg-white border border-[#E4E7EA] rounded-2xl p-4 shadow-xs flex flex-wrap items-center gap-3 text-xs">
            <span className="font-bold text-[#1A1F24]">Belgilar:</span>
            {(Object.keys(RIGHT_LABELS) as RightCode[]).map((code) => (
              <span key={code} className="inline-flex items-center gap-1.5">
                <span className="font-mono font-bold text-[#2E7D4F] bg-[#F0F7F1] px-2 py-0.5 rounded border border-[#D9EBDC]">
                  {code}
                </span>
                <span className="text-[#5A646D]">{RIGHT_LABELS[code]}</span>
              </span>
            ))}
            <span className="text-[#767F87]">«—» — huquq yoʻq</span>
          </div>

          <div className="bg-white border border-[#E4E7EA] rounded-2xl shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#F8F9FA] border-b border-[#E4E7EA] text-[11px] font-bold uppercase tracking-wider text-[#5A646D]">
                    <th className="py-3.5 px-4 sticky left-0 bg-[#F8F9FA]">Obyekt</th>
                    {ROLE_ORDER.map((code) => (
                      <th key={code} className="py-3.5 px-3 text-center whitespace-nowrap">{ROLE_SHORT[code]}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E4E7EA]">
                  {PERMISSION_MATRIX.map((row) => (
                    <tr key={row.object} className="hover:bg-[#F8F9FA] transition-colors">
                      <td className="py-3 px-4 sticky left-0 bg-white">
                        <div className="font-bold text-[#1A1F24]">{row.object}</div>
                        {row.note && <div className="text-[10px] text-[#B45309] mt-0.5">{row.note}</div>}
                      </td>
                      {ROLE_ORDER.map((roleCode) => {
                        const rights = row.rights[roleCode] || [];
                        return (
                          <td key={roleCode} className="py-3 px-3 text-center">
                            {rights.length === 0 ? (
                              <span className="text-[#9AA3AB]">—</span>
                            ) : (
                              <span className="font-mono font-bold text-[11px] text-[#2E7D4F] bg-[#F0F7F1] px-2 py-0.5 rounded border border-[#D9EBDC] whitespace-nowrap">
                                {rights.join(', ')}
                              </span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-[#F8F9FA] border border-[#E4E7EA] rounded-2xl p-4 text-xs text-[#5A646D] flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-[#2E7D4F] shrink-0 mt-0.5" />
            <span>
              Barcha huquqlar ABAC qoidasi boʻyicha foydalanuvchining <b className="text-[#1A1F24]">hududi va tashkiloti</b> doirasida amal qiladi.
              Prokuror roli uchun faqat <b className="text-[#1A1F24]">K</b> va <b className="text-[#1A1F24]">E</b> belgilari mumkin.
            </span>
          </div>
        </div>
      )}

      {/* Tab: unassigned functions */}
      {activeTab === 'unassigned' && (
        <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs space-y-4">
          <div className="border-b border-[#E4E7EA] pb-3">
            <h3 className="font-bold text-base text-[#1A1F24]">Hech bir rolga biriktirilmagan funksiyalar</h3>
            <p className="text-xs text-[#5A646D] mt-0.5">
              Bu roʻyxat rollar tizim funksiyalarini qanchalik toʻliq qamrab olganini koʻrsatadi (TZ 4.2.1.2)
            </p>
          </div>

          {unassignedFunctions.length === 0 ? (
            <div className="p-5 bg-[#F0F7F1] border border-[#D9EBDC] rounded-xl text-sm text-[#2E7D4F] font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              Barcha {SYSTEM_FUNCTIONS.length} ta tizim funksiyasi kamida bitta rolga biriktirilgan.
            </div>
          ) : (
            <div className="space-y-2">
              {unassignedFunctions.map((f) => (
                <div key={f.code} className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between gap-4">
                  <div>
                    <div className="font-semibold text-sm text-[#1A1F24]">{f.label}</div>
                    <div className="text-[11px] font-mono text-[#767F87]">{f.group} · {f.code}</div>
                  </div>
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab: monthly review log */}
      {activeTab === 'review' && (
        <div className="bg-white border border-[#E4E7EA] rounded-2xl shadow-xs overflow-hidden">
          <div className="p-5 border-b border-[#E4E7EA] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-base text-[#1A1F24]">Huquqlarni oylik qayta koʻrib chiqish jurnali</h3>
              <p className="text-xs text-[#5A646D] mt-0.5">
                TZ 4.2.2 va 4.2.14: foydalanuvchi huquqlari oyda bir marta qayta koʻrib chiqiladi, natija jurnalga yoziladi
              </p>
            </div>
            <Button variant="outline" size="sm" leftIcon={<CalendarClock className="w-4 h-4" />}>
              Qayta koʻrib chiqishni boshlash
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#F8F9FA] border-b border-[#E4E7EA] text-[11px] font-bold uppercase tracking-wider text-[#5A646D]">
                  <th className="py-3.5 px-4">Jurnal ID</th>
                  <th className="py-3.5 px-4">Davr</th>
                  <th className="py-3.5 px-4">Sana</th>
                  <th className="py-3.5 px-4">Masʼul</th>
                  <th className="py-3.5 px-4">Tekshirilgan rol</th>
                  <th className="py-3.5 px-4">Oʻzgartirilgan</th>
                  <th className="py-3.5 px-4">Izoh</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4E7EA]">
                {REVIEW_LOG.map((rev) => (
                  <tr key={rev.id} className="hover:bg-[#F8F9FA] transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#2E7D4F]">{rev.id}</td>
                    <td className="py-3.5 px-4 font-semibold text-[#1A1F24]">{rev.period}</td>
                    <td className="py-3.5 px-4 font-mono text-[#5A646D]">{rev.date}</td>
                    <td className="py-3.5 px-4 text-[#1A1F24]">{rev.reviewer}</td>
                    <td className="py-3.5 px-4 font-mono text-[#1A1F24]">{rev.checked} ta</td>
                    <td className="py-3.5 px-4 font-mono text-[#B45309] font-bold">{rev.changed} ta</td>
                    <td className="py-3.5 px-4 text-[#5A646D] max-w-xs">{rev.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create / edit role modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editedRole ? `Rolni tahrirlash — ${editedRole.name}` : 'Yangi rol yaratish'}
        subtitle="Rol nomi takrorlanmas boʻlishi, funksiyalar toʻplami va biriktirish mezoni belgilanishi shart"
        maxWidth="2xl"
        footer={
          <div className="flex items-center justify-between gap-3 w-full">
            <span className="text-xs text-[#5A646D]">
              Tanlangan: <b className="text-[#1A1F24] font-mono">{formFunctions.length}</b> / {SYSTEM_FUNCTIONS.length} ta funksiya
            </span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsFormOpen(false)}>
                Bekor qilish
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleSubmitRole}
                className="bg-[#2E7D4F] hover:bg-[#23653F] font-bold"
              >
                {duplicateWarning ? 'Baribir saqlash' : editedRole ? 'Oʻzgarishni saqlash' : 'Rolni yaratish'}
              </Button>
            </div>
          </div>
        }
      >
        <form onSubmit={handleSubmitRole} className="space-y-4 py-1">
          {formError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 font-semibold flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" /> {formError}
            </div>
          )}

          {/* TZ 4.2.1.2: same-function roles are flagged and copying is suggested */}
          {duplicateWarning && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-2">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                <span>
                  Tizimda ayni shu funksiyalar toʻplamiga ega rol allaqachon bor:{' '}
                  <b>{duplicateWarning.name}</b>. Yangi rol oʻrniga mavjud rolning nusxasini yaratish tavsiya etiladi.
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsFormOpen(false);
                  handleCopyRole(duplicateWarning);
                }}
                className="text-xs font-bold text-[#2E7D4F] hover:underline inline-flex items-center gap-1"
              >
                <Copy className="w-3.5 h-3.5" /> Mavjud rolning nusxasini yaratish
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1A1F24]">Rol nomi (takrorlanmas):</label>
              <Input
                placeholder="Masalan: Hududiy boshqarma monitoring xodimi"
                value={formName}
                onChange={(e) => { setFormName(e.target.value); setFormError(null); }}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1A1F24]">Biriktirish mezoni (boʻlim, lavozim):</label>
              <Input
                placeholder="Masalan: Lavozim: bosh mutaxassis | Tashkilot: viloyat boshqarmasi"
                value={formCriteria}
                onChange={(e) => setFormCriteria(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-[#1A1F24]">Rolga kiruvchi tizim funksiyalari:</label>
            <div className="max-h-72 overflow-y-auto border border-[#E4E7EA] rounded-xl divide-y divide-[#E4E7EA]">
              {Object.entries(functionGroups).map(([group, functions]) => {
                const allSelected = functions.every((f) => formFunctions.includes(f.code));
                return (
                  <div key={group} className="p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#5A646D]">{group}</span>
                      <button
                        type="button"
                        onClick={() => toggleFormGroup(group)}
                        className="text-[11px] font-bold text-[#2E7D4F] hover:underline"
                      >
                        {allSelected ? 'Bekor qilish' : 'Barchasini tanlash'}
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                      {functions.map((f) => (
                        <label
                          key={f.code}
                          className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#F8F9FA] cursor-pointer text-xs"
                        >
                          <input
                            type="checkbox"
                            checked={formFunctions.includes(f.code)}
                            onChange={() => toggleFormFunction(f.code)}
                            className="w-4 h-4 accent-[#2E7D4F] shrink-0"
                          />
                          <span className="text-[#1A1F24]">{f.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </form>
      </Modal>

      {/* Delete role confirmation */}
      <Modal
        isOpen={!!roleToDelete}
        onClose={() => setRoleToDelete(null)}
        title="Rolni oʻchirishni tasdiqlang"
        subtitle={roleToDelete?.name}
        footer={
          <div className="flex items-center justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setRoleToDelete(null)}>
              Bekor qilish
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleConfirmDelete}
              className="bg-rose-700 hover:bg-rose-800 text-white font-bold"
            >
              Ha, oʻchirish
            </Button>
          </div>
        }
      >
        <div className="py-2 space-y-3 text-xs">
          <div className="p-3 bg-[#F0F7F1] border border-[#D9EBDC] rounded-xl text-[#2E7D4F]">
            <b>TZ qoidasi (4.2.1.2):</b> rol faqat unga biriktirilgan foydalanuvchi qolmaganda oʻchiriladi.
            Ushbu rolda hozir <b>{roleToDelete?.usersCount ?? 0} ta</b> foydalanuvchi bor.
          </div>
          <p className="text-[#5A646D]">Oʻchirish amali audit jurnaliga yoziladi va qaytarib boʻlmaydi.</p>
        </div>
      </Modal>
    </div>
  );
};
