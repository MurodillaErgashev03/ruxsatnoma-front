import React, { useState } from 'react';
import {
  Shield,
  Search,
  Filter,
  Download,
  Lock,
  AlertOctagon,
  CheckCircle2,
  Calendar,
  User,
  Activity,
  FileSpreadsheet,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  SlidersHorizontal,
  Key,
  Copy,
  Check,
  Terminal,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/FormControls';

export interface AdminAuditLogsPageProps {
  onNavigate?: (page: string, params?: any) => void;
}

export const AdminAuditLogsPage: React.FC<AdminAuditLogsPageProps> = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  // TZ Compliant Real-time Audit Logs Mock Data
  const [logsList] = useState([
    {
      id: 'AUD-2026-90142',
      timestamp: '2026-08-12 13:40:15',
      user: 'Ergashov Sardor Anvarovich',
      role: 'sys_admin',
      roleLabel: 'Tizim Administratori',
      event: 'Tizim sozlamalari (BHM & E-IMZO) yangilandi',
      category: 'SYSTEM_ADMIN',
      severity: 'INFO',
      ip: '172.16.4.12',
      device: 'Chrome 128 / Windows 11',
      hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      nazoratPushed: true,
    },
    {
      id: 'AUD-2026-90141',
      timestamp: '2026-08-12 13:25:02',
      user: 'Xalilov Utkir Xasanovich',
      role: 'prosecutor',
      roleLabel: 'Prokuror (Read-Only)',
      event: 'Boʻstonliq tumani arizalari boʻyicha Read-Only qidiruv va eksport',
      category: 'PROSECUTOR_QUERY',
      severity: 'INFO',
      ip: '10.200.15.88',
      device: 'Raqamli Nazorat Terminal',
      hash: '8f4e2c91b5a3d7e2f1c0b9a8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8',
      nazoratPushed: true,
    },
    {
      id: 'AUD-2026-90140',
      timestamp: '2026-08-12 12:45:10',
      user: 'Yusupov Bobur Maratovich',
      role: 'gis_specialist',
      roleLabel: 'GIS Mutaxassisi',
      event: 'Boʻstonliq DЎX 14-kontur yaylov GIS qatlami yangilandi (SRID 4326)',
      category: 'GIS_EDIT',
      severity: 'INFO',
      ip: '172.16.4.45',
      device: 'QGIS Desktop Agent',
      hash: 'a1b2c3d4e5f67890123456789abcdef0123456789abcdef0123456789abcdef0',
      nazoratPushed: true,
    },
    {
      id: 'AUD-2026-90139',
      timestamp: '2026-08-12 11:30:00',
      user: 'Tizim Avto-Backup Daemon',
      role: 'SYSTEM',
      roleLabel: 'Tizim Avto-Daemon',
      event: 'PostgreSQL DB Toshkent-Node01 toʻliq zaxira nusxasi (Backup) olindi',
      category: 'BACKUP',
      severity: 'INFO',
      ip: '127.0.0.1 (Localhost)',
      device: 'Linux Kernel 6.8',
      hash: '7c9e3a1b5d2f4e6c8a0b2d4f6e8a0c2e4f6a8c0b2d4e6f8a0c2e4f6a8c0b2d4e',
      nazoratPushed: true,
    },
    {
      id: 'AUD-2026-90138',
      timestamp: '2026-08-12 10:15:22',
      user: 'Abdullayev Alisher Nabiyevich',
      role: 'inspector',
      roleLabel: 'Dala Inspektori',
      event: 'Dala tekshiruv dalolatnomasi №ACT-2026-088 E-IMZO bilan imzolandi',
      category: 'FIELD_INSPECTION',
      severity: 'INFO',
      ip: '172.16.8.99',
      device: 'Android PWA Mobile',
      hash: '4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c',
      nazoratPushed: true,
    },
    {
      id: 'AUD-2026-90137',
      timestamp: '2026-08-12 09:40:11',
      user: 'Saidov Otabek Shavkatovich',
      role: 'applicant',
      roleLabel: 'Ariza beruvchi',
      event: 'Chorva boqish uchun yangi ariza topshirildi №А-2026-0094',
      category: 'APPLICANT_FLOW',
      severity: 'INFO',
      ip: '213.230.100.12',
      device: 'OneID Auth / Mobile',
      hash: '1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
      nazoratPushed: true,
    },
    {
      id: 'AUD-2026-90136',
      timestamp: '2026-08-12 08:30:00',
      user: 'Nomaʻlum IP Urinishi',
      role: 'UNKNOWN',
      roleLabel: 'Bloklangan IP',
      event: 'Audit logini oʻchirishga noqonuniy urinish bloklandi (RI-06 Signal)',
      category: 'SECURITY_ALERT',
      severity: 'CRITICAL',
      ip: '194.26.29.110',
      device: 'Unauthorized Script',
      hash: 'ff00ff00ff00ff00ff00ff00ff00ff00ff00ff00ff00ff00ff00ff00ff00ff00',
      nazoratPushed: true,
    },
  ]);

  const filteredLogs = logsList.filter((log) => {
    const matchesSearch =
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.event.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.ip.includes(searchQuery) ||
      log.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCat = selectedCategory === 'all' || log.category === selectedCategory;
    const matchesSev = selectedSeverity === 'all' || log.severity === selectedSeverity;

    return matchesSearch && matchesCat && matchesSev;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Top Header & Ultra Premium Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-white to-[#F0F7F1]/50 border border-[#E4E7EA] p-5 rounded-2xl shadow-xs hover:shadow-md transition-all flex items-center justify-between group">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-[#5A646D] uppercase tracking-wider block">Audit Jurnal Tartibi</span>
            <div className="text-base font-bold text-[#1A1F24] tracking-tight">WORM Append-only</div>
            <span className="text-xs text-[#15803D] font-bold flex items-center gap-1">
              <Lock className="w-3.5 h-3.5" /> UPDATE / DELETE Taqiqlangan
            </span>
          </div>
          <div className="p-3 bg-[#2E7D4F]/10 text-[#2E7D4F] rounded-2xl group-hover:scale-110 transition-transform">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-blue-50/40 border border-[#E4E7EA] p-5 rounded-2xl shadow-xs hover:shadow-md transition-all flex items-center justify-between group">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-[#5A646D] uppercase tracking-wider block">Log Saqlash Muddati</span>
            <div className="text-base font-bold text-[#1A1F24] tracking-tight">3 Yil (1095 kun)</div>
            <span className="text-xs text-blue-700 font-bold flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> п. 4.2.4 TZ Standarti
            </span>
          </div>
          <div className="p-3 bg-blue-500/10 text-blue-600 rounded-2xl group-hover:scale-110 transition-transform">
            <Calendar className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-emerald-50/40 border border-[#E4E7EA] p-5 rounded-2xl shadow-xs hover:shadow-md transition-all flex items-center justify-between group">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-[#5A646D] uppercase tracking-wider block">Raqamli Nazorat Sync</span>
            <div className="text-base font-bold text-[#1A1F24] tracking-tight">100% Sinxron</div>
            <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
              <Activity className="w-3.5 h-3.5" /> Bosh Prokuratura 11-tarmoq
            </span>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-600 rounded-2xl group-hover:scale-110 transition-transform">
            <Activity className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-purple-50/40 border border-[#E4E7EA] p-5 rounded-2xl shadow-xs hover:shadow-md transition-all flex items-center justify-between group">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-[#5A646D] uppercase tracking-wider block">Xavfsizlik Hodisalari</span>
            <div className="text-base font-bold text-emerald-700 tracking-tight">0 Incident</div>
            <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> RI-06 Buzilish kuzatilmadi
            </span>
          </div>
          <div className="p-3 bg-purple-500/10 text-purple-600 rounded-2xl group-hover:scale-110 transition-transform">
            <Shield className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Premium Header Bar */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#2E7D4F] bg-[#F0F7F1] px-3 py-1 rounded-full border border-[#D9EBDC]">
              WORM APPEND-ONLY LOG TIZIMI (П. 4.2.4)
            </span>
            <span className="text-[11px] font-mono font-bold text-[#15803D] bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" /> Real-time Outbox
            </span>
          </div>
          <h1 className="text-lg font-bold text-[#1A1F24] tracking-tight mt-1.5">Audit va Xavfsizlik Loglari Jurnali</h1>
          <p className="text-xs text-[#5A646D] mt-1">
            Foydalanuvchilar, adminlar va prokurorlar tomonidan bajarilgan barcha operatsiyalarning oʻzgarmas tarixi va SHA-256 xesh zanjiri
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" leftIcon={<Download className="w-4 h-4" />} className="border-[#E4E7EA] text-[#1A1F24] font-bold shadow-2xs hover:bg-gray-50">
            Eksport (Watermark bilan)
          </Button>
        </div>
      </div>

      {/* Premium Security Policy Banner */}
      <div className="bg-gradient-to-r from-[#0A1C0E] to-[#1E3A27] text-white rounded-2xl p-5 shadow-sm border border-[#2E7D4F]/30 flex items-start gap-4">
        <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl shrink-0 mt-0.5 border border-emerald-500/30">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-emerald-400 uppercase tracking-wider text-[11px]">
              🚨 XAVFSIZLIK VA DAXLSISLIK REGLAMENTI (TZ С24, 24.2-BAND)
            </span>
            <span className="text-[10px] font-mono bg-emerald-950/80 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">
              STRICT IMMUTABLE
            </span>
          </div>
          <p className="text-emerald-100/90 leading-relaxed font-sans">
            Audit loglari bazada <b className="text-white">WORM Append-Only</b> rejimida saqlanadi. Hattoki <b className="text-white">Tizim Administratori (`sys_admin`)</b> ham audit yozuvlarini oʻchirish yoki oʻzgartirish huquqiga ega emas. Auditni buzishga qilingan har bir urinish zudlik bilan <b className="text-amber-300">`RI-06` Kritik Risk-Indikatori</b> sifatida Bosh Prokuraturaga va SOC markaziga avtomatik signal yuboradi.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="w-full md:w-96 relative">
          <Input
            placeholder="F.I.SH, IP manzil, Hujjat ID yoki amal kodi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-4 h-4 text-[#5A646D]" />}
            touchSize
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#5A646D]" />
            <span className="text-xs font-bold text-[#5A646D]">Kategoriya:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-xs font-semibold px-3.5 py-2 text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
            >
              <option value="all">Barcha kategoriyalar</option>
              <option value="SYSTEM_ADMIN">Tizim Maʻmurlash</option>
              <option value="PROSECUTOR_QUERY">Prokuror Soʻrovi</option>
              <option value="GIS_EDIT">GIS Qatlamlari</option>
              <option value="FIELD_INSPECTION">Dala Tekshiruvi</option>
              <option value="APPLICANT_FLOW">Ariza Topshirish</option>
              <option value="SECURITY_ALERT">Xavfsizlik Ogohlantirishi</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#5A646D]">Daraja:</span>
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-xs font-semibold px-3.5 py-2 text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
            >
              <option value="all">Barcha darajalar</option>
              <option value="INFO">Maʻlumot (INFO)</option>
              <option value="CRITICAL">Kritik (RI-06 Alert)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Ultra Premium Audit Logs Table */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-sans">
            <thead>
              <tr className="bg-[#F8F9FA] border-b border-[#E4E7EA] text-[11px] font-extrabold uppercase tracking-wider text-[#5A646D]">
                <th className="py-4 px-5">Log ID & Vaqt</th>
                <th className="py-4 px-5">Foydalanuvchi & Rol kodi</th>
                <th className="py-4 px-5">Bajarilgan Amal / Hodisa</th>
                <th className="py-4 px-5">Kategoriya</th>
                <th className="py-4 px-5">IP Manzil & Qurilma</th>
                <th className="py-4 px-5">Nazorat Statusi</th>
                <th className="py-4 px-5 text-right">SHA-256 Hash Zanjiri</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E7EA] text-xs">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-[#767F87] font-medium">
                    Filtr boʻyicha audit loglari topilmadi.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr
                    key={log.id}
                    className={`hover:bg-[#F8F9FA] transition-colors ${
                      log.severity === 'CRITICAL' ? 'bg-rose-50/80 border-l-4 border-l-rose-600' : ''
                    }`}
                  >
                    <td className="py-4 px-5 font-mono">
                      <div className="font-bold text-[#2E7D4F] text-sm">{log.id}</div>
                      <div className="text-[11px] text-[#767F87] mt-0.5 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        {log.timestamp}
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <div className="font-extrabold text-[#1A1F24] text-sm">{log.user}</div>
                      <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-[#F0F7F1] text-[#2E7D4F] border border-[#D9EBDC]">
                        <User className="w-3 h-3" /> {log.role}
                      </span>
                    </td>
                    <td className="py-4 px-5 max-w-md leading-relaxed">
                      <div className="font-semibold text-[#1A1F24] text-xs">{log.event}</div>
                      {log.severity === 'CRITICAL' && (
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold text-rose-800 bg-rose-100 px-2.5 py-1 rounded-md mt-1.5 border border-rose-300 animate-pulse">
                          <AlertOctagon className="w-3.5 h-3.5 text-rose-600" /> KRITIK RI-06 SIGNAL (SOC ogohlantirildi)
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-5">
                      <span className="text-[11px] font-mono font-bold text-[#2E7D4F] bg-[#F0F7F1] px-2.5 py-1 rounded-md border border-[#D9EBDC] inline-block">
                        {log.category}
                      </span>
                    </td>
                    <td className="py-4 px-5 font-mono text-[11px]">
                      <div className="font-bold text-[#1A1F24] flex items-center gap-1">
                        <Terminal className="w-3 h-3 text-gray-400" /> {log.ip}
                      </div>
                      <div className="text-[10px] text-[#767F87] truncate max-w-[150px]">{log.device}</div>
                    </td>
                    <td className="py-4 px-5">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#F0F7F1] text-[#15803D] border border-[#D9EBDC]">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Sent to Outbox
                      </span>
                    </td>
                    <td className="py-4 px-5 text-right font-mono">
                      <button
                        onClick={() => handleCopyHash(log.hash)}
                        title="SHA-256 Xesh nusxalash"
                        className="inline-flex items-center gap-1.5 text-[10px] font-mono text-gray-600 bg-gray-100 hover:bg-gray-200 px-2.5 py-1 rounded-md border border-gray-200 transition-colors"
                      >
                        <span className="max-w-[100px] truncate">{log.hash.slice(0, 14)}...</span>
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
    </div>
  );
};

