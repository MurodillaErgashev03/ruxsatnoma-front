import React, { useState } from 'react';
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
  X,
  SlidersHorizontal,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/FormControls';

export interface AdminUsersPageProps {
  onNavigate?: (page: string, params?: any) => void;
}

export const AdminUsersPage: React.FC<AdminUsersPageProps> = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // 10 Mock Users from TZ tz/21-mock-users.md
  const [usersList, setUsersList] = useState([
    {
      id: '1',
      code: 'sys_admin',
      roleName: 'Tizim administrator',
      pinfl: '11111111111111',
      password: 'Admin123!',
      fio: 'Ergashov Sardor Anvarovich',
      organization: '"Oʻzmon texno" DUK / Bosh administrator',
      defaultPage: 'admin_settings',
      status: 'active',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
      lastActive: 'Bugun 13:08 (IP: 172.16.4.12)',
    },
    {
      id: '2',
      code: 'central_admin',
      roleName: 'Markaziy apparat xodimi',
      pinfl: '22222222222222',
      password: 'Central123!',
      fio: 'Karimov Jamshid Botirovich',
      organization: 'Oʻrmon xoʻjaligi agentligi / Boʻlim boshligʻi',
      defaultPage: 'leskhoz_inbox',
      status: 'active',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
      lastActive: 'Bugun 12:40 (IP: 172.16.4.25)',
    },
    {
      id: '3',
      code: 'management',
      roleName: 'Rahbariyat',
      pinfl: '33333333333333',
      password: 'Director123!',
      fio: 'Tashpulatova Nodira Rustamovna',
      organization: 'Agentlik Direktori oʻrinbosari',
      defaultPage: 'manager_decision',
      status: 'active',
      badgeColor: 'bg-[#F0F7F1] text-[#2E7D4F] border-[#D9EBDC]',
      lastActive: 'Kechagi 18:15',
    },
    {
      id: '4',
      code: 'executor_staff',
      roleName: 'Ijrochi tashkilot xodimi',
      pinfl: '44444444444444',
      password: 'Staff123!',
      fio: 'Rahimov Jasur Umidovich',
      organization: 'Boʻstonliq DЎX / Katta mutaxassis',
      defaultPage: 'leskhoz_inbox',
      status: 'active',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      lastActive: 'Bugun 11:05',
    },
    {
      id: '5',
      code: 'gis_specialist',
      roleName: 'GIS / meʼyoriy mutaxassis',
      pinfl: '55555555555555',
      password: 'Gis123!',
      fio: 'Yusupov Bobur Maratovich',
      organization: 'Oʻrmon loyiha instituti / GIS mutaxassisi',
      defaultPage: 'gis_editor',
      status: 'active',
      badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-200',
      lastActive: 'Bugun 12:45',
    },
    {
      id: '6',
      code: 'executor_head',
      roleName: 'Ijrochi tashkilot rahbari',
      pinfl: '66666666666666',
      password: 'Head123!',
      fio: 'Mirzayev Dilshod Akramovich',
      organization: 'Boʻstonliq DЎX / Direktor',
      defaultPage: 'manager_decision',
      status: 'active',
      badgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
      lastActive: 'Kechagi 16:30',
    },
    {
      id: '7',
      code: 'inspector',
      roleName: 'Inspektor',
      pinfl: '77777777777777',
      password: 'Inspect123!',
      fio: 'Abdullayev Alisher Nabiyevich',
      organization: 'Toshkent v. Boʻstonliq tumani / Tuman inspektori',
      defaultPage: 'field_tasks',
      status: 'active',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      lastActive: 'Bugun 10:15 (Mobile PWA)',
    },
    {
      id: '8',
      code: 'accountant',
      roleName: 'Buxgalter',
      pinfl: '88888888888888',
      password: 'Buhg123!',
      fio: 'Umarova Malika Saidovna',
      organization: 'Moliya-hisob boʻlimi / Bosh buxgalter',
      defaultPage: 'accountant_reconciliation',
      status: 'active',
      badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      lastActive: 'Kechagi 17:45',
    },
    {
      id: '9',
      code: 'applicant',
      roleName: 'Jismoniy va yuridik shaxs (Ariza beruvchi)',
      pinfl: '30491823410019',
      password: 'User123!',
      fio: 'Saidov Otabek Shavkatovich',
      organization: '"Burchmulla Agro" MCHJ / Ariza beruvchi',
      defaultPage: 'applicant_dashboard',
      status: 'active',
      badgeColor: 'bg-[#F0F7F1] text-[#15803D] border-[#D9EBDC]',
      lastActive: 'Bugun 13:00 (OneID)',
    },
    {
      id: '10',
      code: 'prosecutor',
      roleName: 'Prokuror (Faqat oʻqish / Read-Only)',
      pinfl: '99999999999999',
      password: 'Prokuror123!',
      fio: 'Xalilov Utkir Xasanovich',
      organization: 'Bosh Prokuratura / 11-tarmoq prokurori',
      defaultPage: 'prosecutor_portal',
      status: 'active',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
      lastActive: 'Bugun 09:30 (Raqamli Nazorat)',
    },
  ]);

  // New User Form State
  const [newUserFio, setNewUserFio] = useState('');
  const [newUserPinfl, setNewUserPinfl] = useState('');
  const [newUserRole, setNewUserRole] = useState('executor_staff');
  const [newUserOrg, setNewUserOrg] = useState('');

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserFio || !newUserPinfl) return;

    const roleObj = usersList.find((u) => u.code === newUserRole) || {
      roleName: 'Ijrochi xodim',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      defaultPage: 'leskhoz_inbox',
    };

    const newUser = {
      id: String(Date.now()),
      code: newUserRole,
      roleName: roleObj.roleName,
      pinfl: newUserPinfl,
      password: 'Password123!',
      fio: newUserFio,
      organization: newUserOrg || 'Tuman oʻrmon xoʻjaligi',
      defaultPage: roleObj.defaultPage,
      status: 'active',
      badgeColor: roleObj.badgeColor,
      lastActive: 'Yangi yaratildi',
    };

    setUsersList([newUser, ...usersList]);
    setIsAddModalOpen(false);
    setNewUserFio('');
    setNewUserPinfl('');
    setNewUserOrg('');
  };

  const toggleUserStatus = (id: string) => {
    setUsersList(
      usersList.map((u) =>
        u.id === id ? { ...u, status: u.status === 'active' ? 'blocked' : 'active' } : u
      )
    );
  };

  // Filtered Users
  const filteredUsers = usersList.filter((u) => {
    const matchesSearch =
      u.fio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.pinfl.includes(searchQuery) ||
      u.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.roleName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = selectedRoleFilter === 'all' || u.code === selectedRoleFilter;
    const matchesStatus = selectedStatusFilter === 'all' || u.status === selectedStatusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Top Header & Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E4E7EA] p-5 rounded-2xl shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#5A646D] uppercase tracking-wider block">Jami Foydalanuvchilar</span>
            <div className="text-xl font-bold text-[#1A1F24]">43,947 ta</div>
            <span className="text-xs text-[#15803D] font-medium flex items-center gap-1 mt-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 10 ta Tizim Roli
            </span>
          </div>
          <div className="p-3 bg-[#F0F7F1] rounded-xl text-[#2E7D4F]">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white border border-[#E4E7EA] p-5 rounded-2xl shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#5A646D] uppercase tracking-wider block">Hozir Onlayn</span>
            <div className="text-xl font-bold text-[#1A1F24]">384 nafar</div>
            <span className="text-xs text-[#15803D] font-medium flex items-center gap-1 mt-1">
              <span className="w-2 h-2 rounded-full bg-[#15803D] animate-pulse" /> Real-vaqt seanslari
            </span>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Shield className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white border border-[#E4E7EA] p-5 rounded-2xl shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#5A646D] uppercase tracking-wider block">Boshqaruv Organlari</span>
            <div className="text-xl font-bold text-[#1A1F24]">84 ta Xoʻjalik</div>
            <span className="text-xs text-[#5A646D] font-medium block mt-1">Agentlik va Tumanlar</span>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <Building2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white border border-[#E4E7EA] p-5 rounded-2xl shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#5A646D] uppercase tracking-wider block">Xavfsizlik Loglari</span>
            <div className="text-xl font-bold text-[#1A1F24]">Append-only</div>
            <span className="text-xs text-[#15803D] font-medium flex items-center gap-1 mt-1">
              <Lock className="w-3.5 h-3.5" /> WORM Xavfsiz
            </span>
          </div>
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <KeyRound className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Title & Action Bar */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#2E7D4F] bg-[#F0F7F1] px-3 py-1 rounded-full border border-[#D9EBDC]">
            RBAC / ABAC Maʻmurlash
          </span>
          <h1 className="text-lg font-bold text-[#1A1F24] mt-1.5">Foydalanuvchilar va Rollar Boshqaruvi</h1>
          <p className="text-xs text-[#5A646D] mt-0.5">
            Tizimning 10 ta rolining har biri uchun foydalanuvchilar akkauntlari, JSHSHIR, kirish huquqlari va statuslari
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" size="sm" leftIcon={<Download className="w-4 h-4" />}>
            Eksport (Excel)
          </Button>
          <Button
            variant="primary"
            size="sm"
            leftIcon={<UserPlus className="w-4 h-4" />}
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#2E7D4F] hover:bg-[#23653F] font-bold shadow-sm"
          >
            Yangi Foydalanuvchi
          </Button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-4 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="w-full md:w-96 relative">
            <Input
              placeholder="F.I.SH, JSHSHIR, Login yoki Tashkilot..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
              touchSize
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#5A646D]" />
              <span className="text-xs font-semibold text-[#5A646D]">Rol:</span>
              <select
                value={selectedRoleFilter}
                onChange={(e) => setSelectedRoleFilter(e.target.value)}
                className="bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-xs font-semibold px-3 py-2 text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
              >
                <option value="all">Barcha rollar (10 ta)</option>
                <option value="sys_admin">Tizim administrator</option>
                <option value="central_admin">Markaziy apparat xodimi</option>
                <option value="management">Rahbariyat</option>
                <option value="executor_staff">Ijrochi tashkilot xodimi</option>
                <option value="gis_specialist">GIS / meʼyoriy mutaxassis</option>
                <option value="executor_head">Ijrochi tashkilot rahbari</option>
                <option value="inspector">Inspektor</option>
                <option value="accountant">Buxgalter</option>
                <option value="applicant">Ariza beruvchi</option>
                <option value="prosecutor">Prokuror (Read-Only)</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#5A646D]">Status:</span>
              <select
                value={selectedStatusFilter}
                onChange={(e) => setSelectedStatusFilter(e.target.value)}
                className="bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-xs font-semibold px-3 py-2 text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
              >
                <option value="all">Barcha statuslar</option>
                <option value="active">Faol</option>
                <option value="blocked">Bloklangan</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Users Data Table */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8F9FA] border-b border-[#E4E7EA] text-[11px] font-bold uppercase tracking-wider text-[#5A646D]">
                <th className="py-3.5 px-4">№</th>
                <th className="py-3.5 px-4">Foydalanuvchi F.I.SH & Login (JSHSHIR)</th>
                <th className="py-3.5 px-4">Rol Kodi & Nomi</th>
                <th className="py-3.5 px-4">Tashkilot va Lavozimi</th>
                <th className="py-3.5 px-4">Oxirgi Faollik</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E7EA] text-xs">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-[#767F87]">
                    Qidiruv boʻyicha foydalanuvchilar topilmadi.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u, idx) => (
                  <tr key={u.id} className="hover:bg-[#F8F9FA] transition-colors">
                    <td className="py-4 px-4 font-mono font-semibold text-[#767F87]">{idx + 1}</td>
                    <td className="py-4 px-4">
                      <div className="font-bold text-[#1A1F24] text-sm">{u.fio}</div>
                      <div className="text-[11px] font-mono text-[#5A646D] flex items-center gap-1.5 mt-0.5">
                        <span>JSHSHIR: <b className="text-[#1A1F24]">{u.pinfl}</b></span>
                        <span className="text-gray-300">•</span>
                        <span>Parol: <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-700">{u.password}</code></span>
                      </div>
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
                      <div className="text-[11px] text-[#767F87]">Bosh sahifa: {u.defaultPage}</div>
                    </td>
                    <td className="py-4 px-4 font-mono text-[11px] text-[#5A646D]">
                      {u.lastActive}
                    </td>
                    <td className="py-4 px-4">
                      {u.status === 'active' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#F0F7F1] text-[#15803D] border border-[#D9EBDC]">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Faol
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                          <XCircle className="w-3.5 h-3.5" /> Bloklangan
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => toggleUserStatus(u.id)}
                          className={`px-2.5 py-1 rounded-lg font-semibold text-xs transition-colors border ${
                            u.status === 'active'
                              ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                          }`}
                        >
                          {u.status === 'active' ? 'Bloklash' : 'Aktivlashtirish'}
                        </button>
                        <button
                          title="Tahrirlash"
                          className="p-1.5 text-[#5A646D] hover:text-[#2E7D4F] hover:bg-[#F0F7F1] rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-[#E4E7EA]">
            <div className="flex items-center justify-between border-b border-[#E4E7EA] pb-3">
              <h3 className="text-lg font-bold text-[#1A1F24] flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-[#2E7D4F]" /> Yangi Foydalanuvchi Yaratish
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddUser} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1A1F24]">F.I.SH (Toʻliq ism-sharifi):</label>
                <Input
                  placeholder="Masalan: Axmedov Alisher Karimovich"
                  value={newUserFio}
                  onChange={(e) => setNewUserFio(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1A1F24]">JSHSHIR / STIR (14 xonali login):</label>
                <Input
                  placeholder="11111111111111"
                  value={newUserPinfl}
                  onChange={(e) => setNewUserPinfl(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1A1F24]">Tizimdagi Roli (10 ta roldan biri):</label>
                <select
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value)}
                  className="w-full bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-sm p-3 text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
                >
                  <option value="sys_admin">1. sys_admin - Tizim administrator</option>
                  <option value="central_admin">2. central_admin - Markaziy apparat xodimi</option>
                  <option value="management">3. management - Rahbariyat</option>
                  <option value="executor_staff">4. executor_staff - Ijrochi tashkilot xodimi</option>
                  <option value="gis_specialist">5. gis_specialist - GIS / meʼyoriy mutaxassis</option>
                  <option value="executor_head">6. executor_head - Ijrochi tashkilot rahbari</option>
                  <option value="inspector">7. inspector - Inspektor</option>
                  <option value="accountant">8. accountant - Buxgalter</option>
                  <option value="applicant">9. applicant - Ariza beruvchi</option>
                  <option value="prosecutor">10. prosecutor - Prokuror (Read-Only)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1A1F24]">Tashkilot va Lavozimi:</label>
                <Input
                  placeholder="Masalan: Boʻstonliq DЎX / Yetakchi muhandis"
                  value={newUserOrg}
                  onChange={(e) => setNewUserOrg(e.target.value)}
                />
              </div>

              <div className="pt-3 border-t border-[#E4E7EA] flex items-center justify-end gap-3">
                <Button variant="outline" type="button" onClick={() => setIsAddModalOpen(false)}>
                  Bekor qilish
                </Button>
                <Button type="submit" variant="primary" className="bg-[#2E7D4F] hover:bg-[#23653F] font-bold">
                  Saqlash va Yaratish
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
