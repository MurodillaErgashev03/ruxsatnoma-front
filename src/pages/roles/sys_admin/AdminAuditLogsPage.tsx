import React, { useState } from 'react';
import {
  Shield,
  Search,
  Download,
  Lock,
  AlertOctagon,
  CheckCircle2,
  Calendar,
  User,
  Activity,
  ShieldCheck,
  SlidersHorizontal,
  Copy,
  Check,
  Terminal,
  FileDown,
  Info,
} from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { hasRight } from '../../../lib/permissions';
import { Input } from '../../../components/ui/FormControls';
import { Modal } from '../../../components/ui/Overlay';

export interface AdminAuditLogsPageProps {
  onNavigate?: (page: string, params?: any) => void;
  userRole?: string;
}

/** The nine journal types required by TZ 4.2.4. */
const JOURNAL_TYPES = [
  { id: 'SECURITY', label: '1. Axborot xavfsizligi va avariya hodisalari' },
  { id: 'BACKUP', label: '2. Zahiraviy nusxalar (olish, tiklash, tekshirish)' },
  { id: 'OS', label: '3. Operatsion tizim hodisalari' },
  { id: 'DBMS', label: '4. Maʼlumotlar bazasi hodisalari' },
  { id: 'ANTIVIRUS', label: '5. Antivirus himoyasi hodisalari' },
  { id: 'IDS', label: '6. Hujumlarni aniqlash va oldini olish' },
  { id: 'CMS', label: '7. Kontent boshqaruv tizimi hodisalari' },
  { id: 'INTEGRATION', label: '8. Integratsiya xabarlari' },
  { id: 'PROSECUTOR', label: '9. Prokurorning koʻrish, qidiruv va eksport amallari' },
];

/** Parameter filters required by TZ 4.2.1.6. */
const EVENT_PARAMETERS = [
  { id: 'errors', label: 'Xatoliklar' },
  { id: 'failed_login', label: 'Muvaffaqiyatsiz kirish urinishlari' },
  { id: 'integration', label: 'Integratsiya xabarlari' },
  { id: 'data_change', label: 'Maʼlumot va formalardagi oʻzgarishlar' },
  { id: 'admin_action', label: 'Administrator amallari' },
];

interface AuditRecord {
  id: string;
  timestamp: string;
  date: string;
  user: string;
  role: string;
  event: string;
  journal: string;
  parameters: string[];
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  ip: string;
  device: string;
  hash: string;
}

export const AdminAuditLogsPage: React.FC<AdminAuditLogsPageProps> = ({ userRole = '' }) => {
  /**
   * TZ appendix 4: the audit journal is К for the administrator, the central
   * apparatus and management; only the prosecutor also holds Э.
   */
  const canExport = hasRight(userRole, 'audit_log', 'export');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJournal, setSelectedJournal] = useState('all');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [selectedParameters, setSelectedParameters] = useState<string[]>([]);
  const [dateFrom, setDateFrom] = useState('2026-08-01');
  const [dateTo, setDateTo] = useState('2026-08-13');
  const [copiedHash, setCopiedHash] = useState<string | null>(null);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState('xlsx');

  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const [logsList] = useState<AuditRecord[]>([
    {
      id: 'AUD-2026-90142', timestamp: '13:40:15', date: '2026-08-12',
      user: 'Ergashov Sardor Anvarovich', role: 'sys_admin',
      event: 'Tizim sozlamalari yangilandi: BHM qiymati va E-IMZO majburiyligi',
      journal: 'SECURITY', parameters: ['admin_action', 'data_change'], severity: 'INFO',
      ip: '172.16.4.12', device: 'Chrome 128 / Windows 11',
      hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    },
    {
      id: 'AUD-2026-90141', timestamp: '13:25:02', date: '2026-08-12',
      user: 'Xalilov Utkir Xasanovich', role: 'prosecutor',
      event: 'Boʻstonliq tumani arizalari boʻyicha qidiruv va eksport (46 ta yozuv)',
      journal: 'PROSECUTOR', parameters: [], severity: 'INFO',
      ip: '10.200.15.88', device: '«Raqamli nazorat» terminali',
      hash: '8f4e2c91b5a3d7e2f1c0b9a8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8',
    },
    {
      id: 'AUD-2026-90140', timestamp: '12:45:10', date: '2026-08-12',
      user: 'Yusupov Bobur Maratovich', role: 'gis_specialist',
      event: 'Boʻstonliq DЎX 14-kontur yaylov qatlami yangilandi (SRID 4326)',
      journal: 'CMS', parameters: ['data_change'], severity: 'INFO',
      ip: '172.16.4.45', device: 'QGIS Desktop Agent',
      hash: 'a1b2c3d4e5f67890123456789abcdef0123456789abcdef0123456789abcdef0',
    },
    {
      id: 'AUD-2026-90139', timestamp: '11:30:00', date: '2026-08-12',
      user: 'Zahira demoni', role: 'SYSTEM',
      event: 'PostgreSQL Toshkent-Node01 toʻliq zaxira nusxasi olindi (42.8 GB)',
      journal: 'BACKUP', parameters: [], severity: 'INFO',
      ip: '127.0.0.1', device: 'Linux Kernel 6.8',
      hash: '7c9e3a1b5d2f4e6c8a0b2d4f6e8a0c2e4f6a8c0b2d4e6f8a0c2e4f6a8c0b2d4e',
    },
    {
      id: 'AUD-2026-90138', timestamp: '10:15:22', date: '2026-08-12',
      user: 'Abdullayev Alisher Nabiyevich', role: 'inspector',
      event: 'ACT-2026-088 dalolatnomasi E-IMZO bilan imzolandi',
      journal: 'CMS', parameters: ['data_change'], severity: 'INFO',
      ip: '172.16.8.99', device: 'Android PWA',
      hash: '4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c',
    },
    {
      id: 'AUD-2026-90137', timestamp: '09:52:41', date: '2026-08-12',
      user: 'Integratsiya servisi', role: 'SYSTEM',
      event: 'my.gov.uz BFF kanalidan 24 ta ariza statusi sinxronlandi',
      journal: 'INTEGRATION', parameters: ['integration'], severity: 'INFO',
      ip: '172.16.2.30', device: 'Outbox Worker',
      hash: '2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c',
    },
    {
      id: 'AUD-2026-90136', timestamp: '09:40:11', date: '2026-08-12',
      user: 'Soliq qoʻmitasi API', role: 'SYSTEM',
      event: 'STIR reyestriga soʻrov vaqt boʻyicha uzildi (timeout 30 s), qayta urinish navbatga qoʻyildi',
      journal: 'INTEGRATION', parameters: ['integration', 'errors'], severity: 'WARNING',
      ip: '172.16.2.30', device: 'Retry Worker',
      hash: '9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f',
    },
    {
      id: 'AUD-2026-90135', timestamp: '08:30:00', date: '2026-08-12',
      user: 'Nomaʼlum IP', role: 'UNKNOWN',
      event: 'Audit yozuvini oʻchirishga ruxsatsiz urinish bloklandi (RI-06 signali)',
      journal: 'IDS', parameters: ['errors', 'failed_login'], severity: 'CRITICAL',
      ip: '194.26.29.110', device: 'Avtorizatsiyasiz skript',
      hash: 'ff00ff00ff00ff00ff00ff00ff00ff00ff00ff00ff00ff00ff00ff00ff00ff00',
    },
    {
      id: 'AUD-2026-90134', timestamp: '08:12:35', date: '2026-08-11',
      user: 'Rahimov Jasur Umidovich', role: 'executor_staff',
      event: 'Ketma-ket 5 marta notoʻgʻri parol kiritildi, akkaunt vaqtincha bloklandi',
      journal: 'SECURITY', parameters: ['failed_login'], severity: 'WARNING',
      ip: '172.16.6.77', device: 'Firefox 129 / Ubuntu',
      hash: '5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b',
    },
    {
      id: 'AUD-2026-90133', timestamp: '03:00:12', date: '2026-08-11',
      user: 'Antivirus demoni', role: 'SYSTEM',
      event: 'Yuklangan fayllar skaneri: 1 284 ta fayl tekshirildi, tahdid topilmadi',
      journal: 'ANTIVIRUS', parameters: [], severity: 'INFO',
      ip: '127.0.0.1', device: 'ClamAV Scheduler',
      hash: '3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d',
    },
    {
      id: 'AUD-2026-90132', timestamp: '02:41:08', date: '2026-08-11',
      user: 'MBBT monitoringi', role: 'SYSTEM',
      event: 'Uzoq davom etgan soʻrov aniqlandi: GIS occupancy tekshiruvi 4.8 s',
      journal: 'DBMS', parameters: ['errors'], severity: 'WARNING',
      ip: '127.0.0.1', device: 'PostgreSQL 18',
      hash: '6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a',
    },
    {
      id: 'AUD-2026-90131', timestamp: '01:15:00', date: '2026-08-11',
      user: 'Tizim demoni', role: 'SYSTEM',
      event: 'Ilova serveri qayta ishga tushirildi (rejalashtirilgan profilaktika)',
      journal: 'OS', parameters: [], severity: 'INFO',
      ip: '127.0.0.1', device: 'systemd',
      hash: '8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c',
    },
  ]);

  const toggleParameter = (id: string) => {
    setSelectedParameters((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const filteredLogs = logsList.filter((log) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      log.user.toLowerCase().includes(query) ||
      log.event.toLowerCase().includes(query) ||
      log.ip.includes(searchQuery) ||
      log.id.toLowerCase().includes(query);

    const matchesJournal = selectedJournal === 'all' || log.journal === selectedJournal;
    const matchesSeverity = selectedSeverity === 'all' || log.severity === selectedSeverity;
    const matchesParameters =
      selectedParameters.length === 0 || selectedParameters.some((p) => log.parameters.includes(p));
    const matchesPeriod = (!dateFrom || log.date >= dateFrom) && (!dateTo || log.date <= dateTo);

    return matchesSearch && matchesJournal && matchesSeverity && matchesParameters && matchesPeriod;
  });

  const criticalCount = logsList.filter((l) => l.severity === 'CRITICAL').length;

  const severityStyles: Record<AuditRecord['severity'], string> = {
    INFO: 'bg-[#F0F7F1] text-[#15803D] border-[#D9EBDC]',
    WARNING: 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]',
    CRITICAL: 'bg-rose-50 text-rose-700 border-rose-200',
  };

  return (
    <div className="space-y-6 font-sans">
      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E4E7EA] p-5 rounded-2xl shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-[#5A646D] uppercase tracking-wider block">Jurnal tartibi</span>
            <div className="text-base font-bold text-[#1A1F24]">WORM append-only</div>
            <span className="text-xs text-[#15803D] font-bold flex items-center gap-1">
              <Lock className="w-3.5 h-3.5" /> Oʻzgartirish va oʻchirish taqiqlangan
            </span>
          </div>
          <div className="p-3 bg-[#F0F7F1] text-[#2E7D4F] rounded-2xl"><ShieldCheck className="w-6 h-6" /></div>
        </div>

        <div className="bg-white border border-[#E4E7EA] p-5 rounded-2xl shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-[#5A646D] uppercase tracking-wider block">Saqlash muddati</span>
            <div className="text-base font-bold text-[#1A1F24]">Kamida 3 yil</div>
            <span className="text-xs text-blue-700 font-bold flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> TZ 4.2.4 talabi
            </span>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><Calendar className="w-6 h-6" /></div>
        </div>

        <div className="bg-white border border-[#E4E7EA] p-5 rounded-2xl shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-[#5A646D] uppercase tracking-wider block">Jurnal turlari</span>
            <div className="text-base font-bold text-[#1A1F24]">{JOURNAL_TYPES.length} ta jurnal</div>
            <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
              <Activity className="w-3.5 h-3.5" /> Alohida jurnal serverida
            </span>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl"><Activity className="w-6 h-6" /></div>
        </div>

        <div className="bg-white border border-[#E4E7EA] p-5 rounded-2xl shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-[#5A646D] uppercase tracking-wider block">Kritik hodisalar</span>
            <div className={`text-base font-bold ${criticalCount > 0 ? 'text-rose-700' : 'text-emerald-700'}`}>
              {criticalCount} ta
            </div>
            <span className="text-xs text-[#5A646D] font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> RI-06 signali boʻyicha
            </span>
          </div>
          <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl"><Shield className="w-6 h-6" /></div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#2E7D4F] bg-[#F0F7F1] px-3 py-1 rounded-full border border-[#D9EBDC]">
            Monitoring va jurnallar moduli (4.2.1.6)
          </span>
          <h1 className="text-lg font-bold text-[#1A1F24] mt-1.5">Audit va Tizim Jurnallari</h1>
          <p className="text-xs text-[#5A646D] mt-1">
            Davr, jurnal turi va koʻrsatiladigan parametrlar boʻyicha filtr; yozuvlar SHA-256 xesh zanjiri bilan muhrlanadi
          </p>
        </div>
        {canExport && (
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Download className="w-4 h-4" />}
            onClick={() => setIsExportOpen(true)}
          >
            Jurnalni eksport qilish
          </Button>
        )}
      </div>

      {/* Immutability banner */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-5 shadow-xs flex items-start gap-4">
        <div className="p-3 bg-[#F0F7F1] text-[#2E7D4F] rounded-xl shrink-0 border border-[#D9EBDC]">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div className="space-y-1 text-xs">
          <span className="font-bold text-[#1A1F24] block">Daxlsizlik reglamenti (TZ 4.2.4)</span>
          <p className="text-[#5A646D] leading-relaxed">
            Audit yozuvlari <b className="text-[#1A1F24]">append-only</b> rejimida, faqat oʻqish uchun ochiq alohida jurnal serverida saqlanadi.
            <b className="text-[#1A1F24]"> Tizim administratoriga ham</b> jurnalni oʻzgartirish yoki oʻchirish huquqi berilmaydi.
            Buzishga qilingan urinish <b className="text-[#B45309]">RI-06</b> risk-indikatori sifatida darhol qayd etiladi.
            Prokuror va administrator amallari bitta umumiy jurnalga tushadi.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-4 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="w-full md:w-80">
            <Input
              placeholder="F.I.SH, IP manzil, hodisa yoki log ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-4 h-4 text-[#5A646D]" />}
              touchSize
            />
          </div>

          {/* TZ 4.2.1.6: the administrator sets the reporting period */}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#5A646D] shrink-0" />
            <span className="text-xs font-bold text-[#5A646D] whitespace-nowrap">Davr:</span>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-xs font-semibold px-3 py-2 text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
            />
            <span className="text-xs text-[#767F87]">—</span>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-xs font-semibold px-3 py-2 text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-[#E4E7EA]">
          <SlidersHorizontal className="w-4 h-4 text-[#5A646D]" />

          <select
            value={selectedJournal}
            onChange={(e) => setSelectedJournal(e.target.value)}
            className="bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-xs font-semibold px-3 py-2 text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F] max-w-xs"
          >
            <option value="all">Barcha jurnallar ({JOURNAL_TYPES.length} ta turi)</option>
            {JOURNAL_TYPES.map((j) => (
              <option key={j.id} value={j.id}>{j.label}</option>
            ))}
          </select>

          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-xs font-semibold px-3 py-2 text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
          >
            <option value="all">Barcha darajalar</option>
            <option value="INFO">Maʼlumot</option>
            <option value="WARNING">Ogohlantirish</option>
            <option value="CRITICAL">Kritik</option>
          </select>

          <span className="text-xs text-[#767F87] ml-auto">
            Topildi: <b className="text-[#1A1F24] font-mono">{filteredLogs.length}</b> ta yozuv
          </span>
        </div>

        {/* TZ 4.2.1.6: choosing which parameters are shown */}
        <div className="pt-3 border-t border-[#E4E7EA] space-y-2">
          <span className="text-xs font-bold text-[#5A646D]">Koʻrsatiladigan parametrlar:</span>
          <div className="flex flex-wrap gap-2">
            {EVENT_PARAMETERS.map((p) => {
              const isSelected = selectedParameters.includes(p.id);
              return (
                <button
                  key={p.id}
                  onClick={() => toggleParameter(p.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                    isSelected
                      ? 'bg-[#F0F7F1] text-[#2E7D4F] border-[#D9EBDC]'
                      : 'bg-white text-[#5A646D] border-[#E4E7EA] hover:bg-[#F8F9FA]'
                  }`}
                >
                  {p.label}
                </button>
              );
            })}
            {selectedParameters.length > 0 && (
              <button
                onClick={() => setSelectedParameters([])}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#767F87] hover:text-[#1A1F24]"
              >
                Tozalash
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Logs table */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-sans">
            <thead>
              <tr className="bg-[#F8F9FA] border-b border-[#E4E7EA] text-[11px] font-bold uppercase tracking-wider text-[#5A646D]">
                <th className="py-4 px-5">Log ID va vaqt</th>
                <th className="py-4 px-5">Foydalanuvchi va rol</th>
                <th className="py-4 px-5">Hodisa</th>
                <th className="py-4 px-5">Jurnal turi</th>
                <th className="py-4 px-5">IP va qurilma</th>
                <th className="py-4 px-5">Daraja</th>
                <th className="py-4 px-5 text-right">SHA-256 xesh</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E7EA] text-xs">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-[#767F87] font-medium">
                    Tanlangan davr va filtr boʻyicha jurnal yozuvlari topilmadi.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr
                    key={log.id}
                    className={`hover:bg-[#F8F9FA] transition-colors ${
                      log.severity === 'CRITICAL' ? 'bg-rose-50/60 border-l-4 border-l-rose-600' : ''
                    }`}
                  >
                    <td className="py-4 px-5 font-mono">
                      <div className="font-bold text-[#2E7D4F] text-sm">{log.id}</div>
                      <div className="text-[11px] text-[#767F87] mt-0.5 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        {log.date} {log.timestamp}
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <div className="font-bold text-[#1A1F24] text-xs">{log.user}</div>
                      <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#F0F7F1] text-[#2E7D4F] border border-[#D9EBDC]">
                        <User className="w-3 h-3" /> {log.role}
                      </span>
                    </td>
                    <td className="py-4 px-5 max-w-md leading-relaxed">
                      <div className="font-semibold text-[#1A1F24] text-xs">{log.event}</div>
                      {log.severity === 'CRITICAL' && (
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-rose-800 bg-rose-100 px-2.5 py-1 rounded-md mt-1.5 border border-rose-300">
                          <AlertOctagon className="w-3.5 h-3.5 text-rose-600" /> RI-06 signali yuborildi
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-5">
                      <span className="text-[11px] font-mono font-bold text-[#2E7D4F] bg-[#F0F7F1] px-2.5 py-1 rounded-md border border-[#D9EBDC] inline-block">
                        {log.journal}
                      </span>
                    </td>
                    <td className="py-4 px-5 font-mono text-[11px]">
                      <div className="font-bold text-[#1A1F24] flex items-center gap-1">
                        <Terminal className="w-3 h-3 text-gray-400" /> {log.ip}
                      </div>
                      <div className="text-[10px] text-[#767F87] truncate max-w-[150px]">{log.device}</div>
                    </td>
                    <td className="py-4 px-5">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${severityStyles[log.severity]}`}>
                        {log.severity === 'INFO' ? 'Maʼlumot' : log.severity === 'WARNING' ? 'Ogohlantirish' : 'Kritik'}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-right font-mono">
                      <button
                        onClick={() => handleCopyHash(log.hash)}
                        title="SHA-256 xeshni nusxalash"
                        className="inline-flex items-center gap-1.5 text-[10px] font-mono text-gray-600 bg-gray-100 hover:bg-gray-200 px-2.5 py-1 rounded-md border border-gray-200 transition-colors"
                      >
                        <span className="max-w-[100px] truncate">{log.hash.slice(0, 14)}…</span>
                        {copiedHash === log.hash ? (
                          <Check className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Copy className="w-3 h-3 text-gray-400" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Export modal */}
      <Modal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        title="Jurnalni eksport qilish"
        subtitle={`${dateFrom} — ${dateTo} davri, ${filteredLogs.length} ta yozuv`}
        footer={
          <div className="flex items-center justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsExportOpen(false)}>
              Bekor qilish
            </Button>
            <Button
              variant="primary"
              size="sm"
              leftIcon={<FileDown className="w-4 h-4" />}
              onClick={() => {
                setIsExportOpen(false);
                alert(`Jurnal ${exportFormat.toUpperCase()} formatida tayyorlanmoqda. Eksport amali audit jurnaliga yoziladi.`);
              }}
              className="bg-[#2E7D4F] hover:bg-[#23653F] font-bold"
            >
              Eksportni boshlash
            </Button>
          </div>
        }
      >
        <div className="space-y-4 py-1 text-xs">
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#1A1F24]">Format:</label>
            <select
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value)}
              className="w-full bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-sm p-3 text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
            >
              <option value="xlsx">Microsoft Excel (.xlsx)</option>
              <option value="pdf">PDF</option>
              <option value="csv">CSV</option>
            </select>
          </div>

          <div className="p-3 bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl space-y-1 text-[#5A646D]">
            <div className="flex justify-between"><span>Davr:</span><b className="text-[#1A1F24] font-mono">{dateFrom} — {dateTo}</b></div>
            <div className="flex justify-between">
              <span>Jurnal turi:</span>
              <b className="text-[#1A1F24]">
                {selectedJournal === 'all' ? 'Barchasi' : JOURNAL_TYPES.find((j) => j.id === selectedJournal)?.label}
              </b>
            </div>
            <div className="flex justify-between"><span>Yozuvlar soni:</span><b className="text-[#1A1F24] font-mono">{filteredLogs.length} ta</b></div>
          </div>

          <div className="p-3 bg-[#F0F7F1] border border-[#D9EBDC] rounded-xl text-[#2E7D4F] flex items-start gap-2">
            <Info className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              Eksport faqat oʻqish uchun nusxa yaratadi — jurnaldagi yozuvlar oʻzgarmaydi.
              Eksport amalining oʻzi ham audit jurnaliga qayd etiladi.
            </span>
          </div>
        </div>
      </Modal>
    </div>
  );
};
