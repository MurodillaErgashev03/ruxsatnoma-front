import React, { useState } from 'react';
import {
  Database,
  Plus,
  Search,
  Download,
  RotateCcw,
  Trash2,
  HardDrive,
  Clock,
  ShieldCheck,
  CheckCircle2,
  FileArchive,
  Terminal,
  X,
  SlidersHorizontal,
  Info,
  Server,
  Zap,
  Save,
  AlertTriangle,
  Usb,
} from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/FormControls';
import { Modal } from '../../../components/ui/Overlay';

/** Elements that can be selected when restoring — TZ 4.2.1.5. */
const RESTORE_ELEMENTS = [
  { id: 'db', label: 'Relyatsion maʼlumotlar bazasi (arizalar, ruxsatnomalar, toʻlovlar)' },
  { id: 'gis', label: 'GIS konturlari va qatlamlari (PostGIS)' },
  { id: 'objects', label: 'Obyekt xotirasi: PDF/A hujjatlar, foto va video' },
  { id: 'config', label: 'Tizim sozlamalari va klassifikatorlar' },
];

interface BackupRecord {
  id: string;
  name: string;
  timestamp: string;
  size: string;
  type: string;
  typeLabel: string;
  reason: string;
  createdUser: string;
  node: string;
  status: string;
  retentionDays: number;
}

export interface AdminBackupsPageProps {
  onNavigate?: (page: string, params?: any) => void;
}

export const AdminBackupsPage: React.FC<AdminBackupsPageProps> = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState('all');
  // TZ 4.2.1.5: the list of created backups is viewable by period.
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false);
  const [selectedBackupForRestore, setSelectedBackupForRestore] = useState<BackupRecord | null>(null);
  const [backupToDelete, setBackupToDelete] = useState<BackupRecord | null>(null);
  const [backupToExport, setBackupToExport] = useState<BackupRecord | null>(null);
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);

  // Elements chosen for restoration — TZ 4.2.1.5 requires naming what gets restored.
  const [restoreElements, setRestoreElements] = useState<string[]>(RESTORE_ELEMENTS.map((el) => el.id));

  // Automatic backup rules — TZ 4.2.1.5: periodicity, retention and storage location.
  const [ruleFrequency, setRuleFrequency] = useState('daily_incremental');
  const [ruleRetentionDays, setRuleRetentionDays] = useState('30');
  const [ruleStorage, setRuleStorage] = useState('hot_cold');
  const [ruleTime, setRuleTime] = useState('03:00');
  const [rulesSaved, setRulesSaved] = useState(false);

  // Manual backup creation requires a stated reason (TZ 4.2.1.5).
  const [backupReason, setBackupReason] = useState('');
  const [backupType, setBackupType] = useState('FULL');
  const [exportTarget, setExportTarget] = useState('external_disk');

  // TZ Compliant Mock Backups Data
  const [backupsList, setBackupsList] = useState<BackupRecord[]>([
    {
      id: 'BCK-2026-0812-01',
      name: 'PostgreSQL_Full_DB_v2026.08.12.dump',
      timestamp: '2026-08-12 03:00:00',
      size: '42.8 GB',
      type: 'FULL',
      typeLabel: 'Toʻliq nusxa',
      reason: 'Har kuni avtomatik rejalashtirilgan Cron backup',
      createdUser: 'Zahira demoni',
      node: 'Toshkent-DB-Primary-Node01',
      status: 'VERIFIED',
      retentionDays: 30,
    },
    {
      id: 'BCK-2026-0811-02',
      name: 'Pre_Deploy_v2.4_Safety_Dump.dump',
      timestamp: '2026-08-11 18:45:12',
      size: '41.5 GB',
      type: 'MANUAL',
      typeLabel: 'Qoʻlda yaratilgan',
      reason: 'Tizimni v2.4 versiyaga yangilash oldidan xavfsizlik zaxirasi',
      createdUser: 'Ergashov Sardor (SysAdmin)',
      node: 'Toshkent-DB-Primary-Node01',
      status: 'VERIFIED',
      retentionDays: 60,
    },
    {
      id: 'BCK-2026-0810-01',
      name: 'PostgreSQL_Full_DB_v2026.08.10.dump',
      timestamp: '2026-08-10 03:00:00',
      size: '40.9 GB',
      type: 'FULL',
      typeLabel: 'Toʻliq nusxa',
      reason: 'Har kuni avtomatik rejalashtirilgan Cron backup',
      createdUser: 'Zahira demoni',
      node: 'Toshkent-DB-Primary-Node01',
      status: 'VERIFIED',
      retentionDays: 30,
    },
    {
      id: 'BCK-2026-0809-03',
      name: 'GIS_Layers_SRID4326_Snapshot.tar.gz',
      timestamp: '2026-08-09 14:20:00',
      size: '185.4 GB',
      type: 'GIS_SNAPSHOT',
      typeLabel: 'GIS qatlamlari',
      reason: '84 oʻrmon xoʻjaligi geobotanik konturlari migratsiyasi',
      createdUser: 'Yusupov Bobur (GIS Specialist)',
      node: 'GIS-Geoserver-Cluster',
      status: 'VERIFIED',
      retentionDays: 90,
    },
    {
      id: 'BCK-2026-0805-01',
      name: 'Weekly_Full_Archive_2026_W32.dump',
      timestamp: '2026-08-05 02:00:00',
      size: '39.8 GB',
      type: 'WEEKLY',
      typeLabel: 'Haftalik arxiv',
      reason: 'Haftalik toʻliq arxivlash (Cold Storage)',
      createdUser: 'Zahira demoni',
      node: 'Cold-Storage-Disaster-Node',
      status: 'ARCHIVED',
      retentionDays: 365,
    },
  ]);

  const handleCreateManualBackup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!backupReason) return;

    const newBackup = {
      id: `BCK-2026-${Date.now().toString().slice(-4)}`,
      name: `Manual_DB_Dump_${Date.now()}.dump`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      size: '42.9 GB',
      type: backupType,
      typeLabel: backupType === 'FULL' ? 'Toʻliq nusxa' : 'Inkremental nusxa',
      reason: backupReason,
      createdUser: 'Ergashov Sardor (SysAdmin)',
      node: 'Toshkent-DB-Primary-Node01',
      status: 'VERIFIED',
      retentionDays: 30,
    };

    setBackupsList([newBackup, ...backupsList]);
    setIsAddModalOpen(false);
    setBackupReason('');
  };

  const handleStartRestore = (backup: BackupRecord) => {
    setSelectedBackupForRestore(backup);
    setRestoreElements(RESTORE_ELEMENTS.map((el) => el.id));
    setIsRestoreModalOpen(true);
  };

  const toggleRestoreElement = (id: string) => {
    setRestoreElements((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const handleConfirmRestore = () => {
    if (!selectedBackupForRestore || restoreElements.length === 0) return;

    // TZ 4.2.1.5: a backup of the current state is taken automatically before any restore.
    const safetySnapshot = {
      id: `BCK-AUTO-RESTORE-${Date.now().toString().slice(-4)}`,
      name: `Auto_PreRestore_Safety_${selectedBackupForRestore.id}.dump`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      size: '43.0 GB',
      type: 'AUTO_SAFETY',
      typeLabel: 'Avto-xavfsizlik nusxasi',
      reason: `${selectedBackupForRestore.id} nusxasidan tiklashdan oldingi joriy holat nusxasi (${restoreElements.length} ta element)`,
      createdUser: 'Xavfsizlik demoni',
      node: 'Toshkent-DB-Primary-Node01',
      status: 'VERIFIED',
      retentionDays: 30,
    };

    setBackupsList([safetySnapshot, ...backupsList]);
    setIsRestoreModalOpen(false);
    setSelectedBackupForRestore(null);
  };

  /** TZ 4.2.1.5: a backup is deleted only after explicit user confirmation. */
  const handleConfirmDeleteBackup = () => {
    if (!backupToDelete) return;
    setBackupsList(backupsList.filter((b) => b.id !== backupToDelete.id));
    setBackupToDelete(null);
  };

  const handleSaveRules = () => {
    setRulesSaved(true);
    setTimeout(() => {
      setRulesSaved(false);
      setIsRulesModalOpen(false);
    }, 1200);
  };

  const filteredBackups = backupsList.filter((b) => {
    const matchesSearch =
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = selectedTypeFilter === 'all' || b.type === selectedTypeFilter;

    // Timestamps are stored as "YYYY-MM-DD HH:mm:ss", so a plain prefix compare is enough.
    const day = b.timestamp.slice(0, 10);
    const matchesPeriod = (!dateFrom || day >= dateFrom) && (!dateTo || day <= dateTo);

    return matchesSearch && matchesType && matchesPeriod;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Top Header & Disaster Recovery Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E4E7EA] p-5 rounded-2xl shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-[#5A646D] uppercase tracking-wider block">Nusxa olish jadvali</span>
            <div className="text-base font-bold text-[#1A1F24] tracking-tight">Kunlik / haftalik</div>
            <span className="text-xs text-[#15803D] font-bold flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" /> Kunlik inkremental, haftalik toʻliq
            </span>
          </div>
          <div className="p-3 bg-[#F0F7F1] text-[#2E7D4F] rounded-2xl"><Clock className="w-6 h-6" /></div>
        </div>

        <div className="bg-white border border-[#E4E7EA] p-5 rounded-2xl shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-[#5A646D] uppercase tracking-wider block">RTO (tiklash vaqti)</span>
            <div className="text-base font-bold text-[#1A1F24] tracking-tight">≤ 4 soat</div>
            <span className="text-xs text-blue-700 font-bold flex items-center gap-1">
              <Server className="w-3.5 h-3.5" /> Dasturiy taʼminot — 3 soat
            </span>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><HardDrive className="w-6 h-6" /></div>
        </div>

        <div className="bg-white border border-[#E4E7EA] p-5 rounded-2xl shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-[#5A646D] uppercase tracking-wider block">Mavjud nusxalar</span>
            <div className="text-base font-bold text-[#1A1F24] tracking-tight">42 ta nusxa</div>
            <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Hot va cold storage faol
            </span>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl"><Database className="w-6 h-6" /></div>
        </div>

        <div className="bg-white border border-[#E4E7EA] p-5 rounded-2xl shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-[#5A646D] uppercase tracking-wider block">Jami zaxira hajmi</span>
            <div className="text-base font-bold text-[#1A1F24] tracking-tight">1.42 TB</div>
            <span className="text-xs text-purple-700 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Kamida 1 oy saqlanadi
            </span>
          </div>
          <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl"><FileArchive className="w-6 h-6" /></div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#2E7D4F] bg-[#F0F7F1] px-3 py-1 rounded-full border border-[#D9EBDC]">
            Zahiraviy nusxalash moduli (4.2.1.5)
          </span>
          <h1 className="text-lg font-bold text-[#1A1F24] tracking-tight mt-1.5">Maʼlumotlar Bazasining Zahiraviy Nusxalari</h1>
          <p className="text-xs text-[#5A646D] mt-0.5">
            Jadval boʻyicha va qoʻlda nusxa olish, xavfsiz tiklash, tashqi eltuvchiga eksport va avtomatik zaxiralash qoidalari
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            onClick={() => setIsRulesModalOpen(true)}
            variant="outline"
            size="sm"
            leftIcon={<SlidersHorizontal className="w-4 h-4" />}
          >
            Zaxiralash qoidalari
          </Button>
          <Button
            onClick={() => setIsAddModalOpen(true)}
            variant="primary"
            size="sm"
            leftIcon={<Plus className="w-4 h-4" />}
            className="bg-[#2E7D4F] hover:bg-[#23653F] font-bold shadow-sm"
          >
            Qoʻlda nusxa yaratish
          </Button>
        </div>
      </div>

      {/* Restore safety rule — TZ 4.2.1.5 */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-5 shadow-xs flex items-start gap-4">
        <div className="p-3 bg-[#F0F7F1] text-[#2E7D4F] rounded-xl shrink-0 border border-[#D9EBDC]">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div className="space-y-1 text-xs">
          <span className="font-bold text-[#1A1F24] block">Tiklash xavfsizligi qoidasi</span>
          <p className="text-[#5A646D] leading-relaxed">
            Ilgarigi nusxadan tiklashdan oldin tizim <b className="text-[#1A1F24]">joriy holatning avtomatik zaxira nusxasini</b> yaratadi.
            Tiklashda qaysi elementlar qaytarilishi alohida tanlanadi, natija va sabab audit jurnaliga yoziladi.
            Zahiraviy MBBT butunligi buzilgani aniqlansa, administratorga darhol xabar beriladi.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-4 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="w-full md:w-80">
            <Input
              placeholder="Nusxa nomi, sababi yoki ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-4 h-4 text-[#5A646D]" />}
              touchSize
            />
          </div>

          {/* TZ 4.2.1.5: viewing created backups by period */}
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#5A646D] shrink-0" />
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
            {(dateFrom || dateTo) && (
              <button
                onClick={() => { setDateFrom(''); setDateTo(''); }}
                className="text-xs font-semibold text-[#767F87] hover:text-[#1A1F24] px-1"
              >
                Tozalash
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-[#E4E7EA]">
          <SlidersHorizontal className="w-4 h-4 text-[#5A646D]" />
          <span className="text-xs font-bold text-[#5A646D]">Nusxa turi:</span>
          <select
            value={selectedTypeFilter}
            onChange={(e) => setSelectedTypeFilter(e.target.value)}
            className="bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-xs font-semibold px-3.5 py-2 text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
          >
            <option value="all">Barcha turlar</option>
            <option value="FULL">Toʻliq nusxa</option>
            <option value="MANUAL">Qoʻlda yaratilgan</option>
            <option value="GIS_SNAPSHOT">GIS qatlamlari</option>
            <option value="WEEKLY">Haftalik arxiv</option>
            <option value="AUTO_SAFETY">Avto-xavfsizlik nusxasi</option>
          </select>

          <span className="text-xs text-[#767F87] ml-auto">
            Topildi: <b className="text-[#1A1F24] font-mono">{filteredBackups.length}</b> ta nusxa
          </span>
        </div>
      </div>

      {/* Backups Data Table */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-sans">
            <thead>
              <tr className="bg-[#F8F9FA] border-b border-[#E4E7EA] text-[11px] font-extrabold uppercase tracking-wider text-[#5A646D]">
                <th className="py-4 px-5">ID & Yaratilgan Vaqt</th>
                <th className="py-4 px-5">Fayl Nomi & Hajmi</th>
                <th className="py-4 px-5">Nusxa Turi & Yaratish Sababi</th>
                <th className="py-4 px-5">Yaratgan Foydalanuvchi / Node</th>
                <th className="py-4 px-5">Status</th>
                <th className="py-4 px-5 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E7EA] text-xs">
              {filteredBackups.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-[#767F87] font-medium">
                    Filtr boʻyicha zahiraviy nusxalar topilmadi.
                  </td>
                </tr>
              ) : (
                filteredBackups.map((b) => (
                  <tr key={b.id} className="hover:bg-[#F8F9FA] transition-colors">
                    <td className="py-4 px-5 font-mono">
                      <div className="font-bold text-[#2E7D4F] text-sm">{b.id}</div>
                      <div className="text-[11px] text-[#767F87] mt-0.5 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        {b.timestamp}
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <div className="font-bold text-[#1A1F24] font-mono text-xs flex items-center gap-1.5">
                        <FileArchive className="w-4 h-4 text-[#2E7D4F]" />
                        {b.name}
                      </div>
                      <span className="text-[11px] font-mono font-bold text-[#5A646D] bg-gray-100 px-2 py-0.5 rounded mt-1 inline-block border border-gray-200">
                        {b.size}
                      </span>
                    </td>
                    <td className="py-4 px-5 max-w-xs leading-relaxed">
                      <span className="text-[11px] font-mono font-bold text-[#2E7D4F] bg-[#F0F7F1] px-2.5 py-0.5 rounded-md border border-[#D9EBDC] inline-block mb-1">
                        {b.typeLabel}
                      </span>
                      <div className="text-xs text-[#1A1F24] font-semibold">{b.reason}</div>
                    </td>
                    <td className="py-4 px-5 text-[#5A646D] text-[11px]">
                      <div className="font-bold text-[#1A1F24]">{b.createdUser}</div>
                      <div className="font-mono text-[10px] text-[#767F87] flex items-center gap-1 mt-0.5">
                        <Terminal className="w-3 h-3 text-gray-400" /> {b.node}
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      {b.status === 'VERIFIED' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#F0F7F1] text-[#15803D] border border-[#D9EBDC]">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Tekshirilgan
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                          <HardDrive className="w-3.5 h-3.5" /> Cold Storage
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleStartRestore(b)}
                          title="Tizimni shu nusxadan tiklash"
                          className="px-2.5 py-1 rounded-lg font-bold text-xs bg-emerald-50 text-[#2E7D4F] border border-[#D9EBDC] hover:bg-[#F0F7F1] transition-colors flex items-center gap-1"
                        >
                          <RotateCcw className="w-3.5 h-3.5" /> Tiklash
                        </button>
                        <button
                          onClick={() => setBackupToExport(b)}
                          title="Tashqi eltuvchiga eksport qilish"
                          className="p-1.5 text-[#5A646D] hover:text-[#2E7D4F] hover:bg-[#F0F7F1] rounded-lg transition-colors"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setBackupToDelete(b)}
                          title="Oʻchirish"
                          className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
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

      {/* Manual Backup Creation Modal (TZ C24 Rule: Reason Required) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-[#E4E7EA]">
            <div className="flex items-center justify-between border-b border-[#E4E7EA] pb-3">
              <h3 className="text-lg font-bold text-[#1A1F24] flex items-center gap-2">
                <Database className="w-5 h-5 text-[#2E7D4F]" /> Qoʻlda zahiraviy nusxa yaratish
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateManualBackup} className="space-y-4">
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-[#2E7D4F] flex items-start gap-2">
                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  <b>Qoida (4.2.1.5):</b> qoʻlda nusxa olinganda uning aniq sababini koʻrsatish majburiy, bu amal jurnalga yoziladi.
                </span>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1A1F24]">Nusxa turi:</label>
                <select
                  value={backupType}
                  onChange={(e) => setBackupType(e.target.value)}
                  className="w-full bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-sm p-3 text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
                >
                  <option value="FULL">Toʻliq nusxa (.dump)</option>
                  <option value="INCREMENTAL">Inkremental nusxa (.diff)</option>
                  <option value="GIS_SNAPSHOT">GIS qatlamlari snapshot (.tar.gz)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1A1F24]">Yaratish Sababi (Majburiy):</label>
                <textarea
                  rows={3}
                  placeholder="Masalan: Tizimni v2.4 versiyaga yangilash oldidan xavfsizlik zaxirasini olish..."
                  value={backupReason}
                  onChange={(e) => setBackupReason(e.target.value)}
                  className="w-full bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-xs p-3 text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
                  required
                />
              </div>

              <div className="pt-3 border-t border-[#E4E7EA] flex items-center justify-end gap-3">
                <Button variant="outline" type="button" onClick={() => setIsAddModalOpen(false)}>
                  Bekor qilish
                </Button>
                <Button type="submit" variant="primary" className="bg-[#2E7D4F] hover:bg-[#23653F] font-bold">
                  Nusxa yaratish
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Restore Confirmation Modal (TZ Pre-restoration Auto Snapshot Rule) */}
      {isRestoreModalOpen && selectedBackupForRestore && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-rose-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-lg font-extrabold text-[#1A1F24] flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-rose-600" /> Tizimni Tiklashni Tasdiqlang
              </h3>
              <button onClick={() => setIsRestoreModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-[#1A1F24]">
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl space-y-1">
                <span className="font-bold text-rose-800 block">Diqqat! Tizim tiklanmoqda:</span>
                <p className="text-rose-700 leading-relaxed">
                  Tizim <b>{selectedBackupForRestore.name}</b> ({selectedBackupForRestore.timestamp}) holatiga qaytariladi.
                </p>
              </div>

              {/* TZ 4.2.1.5: the administrator names which elements are restored */}
              <div className="space-y-2">
                <span className="font-bold text-[#1A1F24] block">Tiklanadigan elementlar:</span>
                <div className="space-y-1.5 border border-[#E4E7EA] rounded-xl p-3">
                  {RESTORE_ELEMENTS.map((el) => (
                    <label key={el.id} className="flex items-start gap-2 cursor-pointer hover:bg-[#F8F9FA] p-1.5 rounded-lg">
                      <input
                        type="checkbox"
                        checked={restoreElements.includes(el.id)}
                        onChange={() => toggleRestoreElement(el.id)}
                        className="w-4 h-4 accent-[#2E7D4F] shrink-0 mt-0.5"
                      />
                      <span className="text-[#1A1F24] leading-snug">{el.label}</span>
                    </label>
                  ))}
                </div>
                {restoreElements.length === 0 && (
                  <span className="text-[11px] text-rose-700 font-semibold flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> Kamida bitta element tanlanishi kerak.
                  </span>
                )}
              </div>

              <div className="p-3 bg-[#F0F7F1] border border-[#D9EBDC] rounded-xl text-[#2E7D4F] space-y-1">
                <span className="font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Avtomatik xavfsizlik nusxasi
                </span>
                <p className="text-[#5A646D]">
                  Tiklash boshlanishidan oldin joriy holatning zaxira nusxasi avtomatik olinadi va jurnalga yoziladi.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-3">
              <Button variant="outline" type="button" onClick={() => setIsRestoreModalOpen(false)}>
                Bekor qilish
              </Button>
              <Button
                onClick={handleConfirmRestore}
                variant="primary"
                disabled={restoreElements.length === 0}
                className="bg-rose-700 hover:bg-rose-800 font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Ha, tiklashni boshlash
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation — TZ 4.2.1.5: deletion only after explicit confirmation */}
      <Modal
        isOpen={!!backupToDelete}
        onClose={() => setBackupToDelete(null)}
        title="Zahiraviy nusxani oʻchirishni tasdiqlang"
        subtitle={backupToDelete?.name}
        footer={
          <div className="flex items-center justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setBackupToDelete(null)}>
              Bekor qilish
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleConfirmDeleteBackup}
              className="bg-rose-700 hover:bg-rose-800 text-white font-bold"
            >
              Ha, oʻchirish
            </Button>
          </div>
        }
      >
        <div className="space-y-3 py-1 text-xs">
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 space-y-1">
            <span className="font-bold flex items-center gap-1">
              <AlertTriangle className="w-4 h-4" /> Bu amalni qaytarib boʻlmaydi
            </span>
            <p className="leading-relaxed">
              <b>{backupToDelete?.id}</b> ({backupToDelete?.size}, {backupToDelete?.timestamp}) nusxasi butunlay oʻchiriladi.
            </p>
          </div>
          <div className="p-3 bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-[#5A646D]">
            Oʻchirish amali va uning sababi zahiraviy nusxalar jurnaliga yoziladi.
            Oʻchirishdan oldin nusxani tashqi eltuvchiga eksport qilish tavsiya etiladi.
          </div>
        </div>
      </Modal>

      {/* Export to external media — TZ 4.2.1.5 */}
      <Modal
        isOpen={!!backupToExport}
        onClose={() => setBackupToExport(null)}
        title="Nusxani tashqi eltuvchiga eksport qilish"
        subtitle={backupToExport?.name}
        footer={
          <div className="flex items-center justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setBackupToExport(null)}>
              Bekor qilish
            </Button>
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Usb className="w-4 h-4" />}
              onClick={() => {
                setBackupToExport(null);
                alert('Eksport boshlandi. Yakunlangach zahiraviy nusxalar jurnaliga yozuv qoʻshiladi.');
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
            <label className="text-xs font-bold text-[#1A1F24]">Eltuvchi turi:</label>
            <select
              value={exportTarget}
              onChange={(e) => setExportTarget(e.target.value)}
              className="w-full bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-sm p-3 text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
            >
              <option value="external_disk">Tashqi qattiq disk (uzoq muddatli saqlash)</option>
              <option value="tape">Magnit lenta (cold archive)</option>
              <option value="secure_share">Himoyalangan tarmoq resursi</option>
            </select>
          </div>

          <div className="p-3 bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl space-y-1 text-[#5A646D]">
            <div className="flex justify-between"><span>Nusxa ID:</span><b className="text-[#1A1F24] font-mono">{backupToExport?.id}</b></div>
            <div className="flex justify-between"><span>Hajmi:</span><b className="text-[#1A1F24] font-mono">{backupToExport?.size}</b></div>
            <div className="flex justify-between"><span>Yaratilgan:</span><b className="text-[#1A1F24] font-mono">{backupToExport?.timestamp}</b></div>
          </div>

          <div className="p-3 bg-[#F0F7F1] border border-[#D9EBDC] rounded-xl text-[#2E7D4F] flex items-start gap-2">
            <Info className="w-4 h-4 shrink-0 mt-0.5" />
            <span>Eksport qilingan nusxa shifrlanadi va uning nazorat summasi (checksum) alohida saqlanadi.</span>
          </div>
        </div>
      </Modal>

      {/* Automatic backup rules — TZ 4.2.1.5 */}
      <Modal
        isOpen={isRulesModalOpen}
        onClose={() => setIsRulesModalOpen(false)}
        title="Avtomatik zaxiralash qoidalari"
        subtitle="Davriylik, saqlash muddati va saqlash joyini belgilash"
        footer={
          <div className="flex items-center justify-end gap-2">
            {rulesSaved && (
              <span className="text-xs font-bold text-[#15803D] flex items-center gap-1 mr-auto">
                <CheckCircle2 className="w-4 h-4" /> Qoidalar saqlandi
              </span>
            )}
            <Button variant="outline" size="sm" onClick={() => setIsRulesModalOpen(false)}>
              Yopish
            </Button>
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Save className="w-4 h-4" />}
              onClick={handleSaveRules}
              className="bg-[#2E7D4F] hover:bg-[#23653F] font-bold"
            >
              Saqlash
            </Button>
          </div>
        }
      >
        <div className="space-y-4 py-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1A1F24]">Davriylik:</label>
              <select
                value={ruleFrequency}
                onChange={(e) => setRuleFrequency(e.target.value)}
                className="w-full bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-sm p-3 text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
              >
                <option value="daily_incremental">Kunlik inkremental + haftalik toʻliq</option>
                <option value="daily_full">Har kuni toʻliq nusxa</option>
                <option value="weekly_full">Haftada bir marta toʻliq nusxa</option>
                <option value="biweekly">Ikki haftada bir marta (TZ minimumi)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1A1F24]">Ishga tushish vaqti:</label>
              <input
                type="time"
                value={ruleTime}
                onChange={(e) => setRuleTime(e.target.value)}
                className="w-full bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-sm p-3 text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F] font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1A1F24]">Saqlash muddati (kun):</label>
              <Input
                value={ruleRetentionDays}
                onChange={(e) => setRuleRetentionDays(e.target.value.replace(/\D/g, ''))}
                className="font-mono"
              />
              <span className="text-[10px] text-[#767F87]">TZ talabi: kamida 30 kun (bir oy)</span>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1A1F24]">Saqlash joyi:</label>
              <select
                value={ruleStorage}
                onChange={(e) => setRuleStorage(e.target.value)}
                className="w-full bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-sm p-3 text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
              >
                <option value="hot_cold">Hot storage + cold arxiv (zaxira serverga nusxalash)</option>
                <option value="hot">Faqat hot storage</option>
                <option value="offsite">Alohida hududdagi zaxira markazi</option>
              </select>
            </div>
          </div>

          <div className="p-3 bg-[#F0F7F1] border border-[#D9EBDC] rounded-xl text-[11px] text-[#2E7D4F] flex items-start gap-2">
            <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            <span>
              Zahiraviy nusxa tizim ishini toʻxtatmasdan olinadi. PITR (vaqt nuqtasiga tiklash) va replikatsiya yoqilgan.
              Nusxa olish natijasi har safar jurnalga yoziladi.
            </span>
          </div>
        </div>
      </Modal>
    </div>
  );
};
