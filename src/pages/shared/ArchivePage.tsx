import React, { useState } from 'react';
import {
  Archive,
  Search,
  Download,
  ShieldCheck,
  Calendar,
  FileText,
  SlidersHorizontal,
  CheckCircle2,
  RotateCcw,
  Copy,
  Check,
  Info,
  Database,
  Clock,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { hasRight } from '../../lib/permissions';
import { Input } from '../../components/ui/FormControls';
import { Modal } from '../../components/ui/Overlay';

export interface ArchivePageProps {
  onNavigate?: (page: string, params?: any) => void;
  userRole?: string;
}

interface ArchiveRecord {
  id: string;
  docNumber: string;
  title: string;
  docType: string;
  organization: string;
  region: string;
  closedDate: string;
  archivedDate: string;
  retentionUntil: string;
  format: string;
  sizeKb: number;
  hash: string;
  /** Whether the stored hash still matches the document — TZ module 10.13. */
  integrityOk: boolean;
  transferredToState: boolean;
}

const DOC_TYPES = [
  { id: 'permit', label: 'Ruxsatnoma' },
  { id: 'application', label: 'Ariza' },
  { id: 'act', label: 'Tekshiruv dalolatnomasi' },
  { id: 'report', label: 'Hisobot' },
  { id: 'payment', label: 'Toʻlov hujjati' },
];

const DOC_TYPE_LABELS: Record<string, string> = Object.fromEntries(
  DOC_TYPES.map((t) => [t.id, t.label])
);

const ARCHIVE_RECORDS: ArchiveRecord[] = [
  {
    id: 'ARC-2026-001204',
    docNumber: 'RX-2024-0731',
    title: 'Chorva mollarini boqish uchun ruxsatnoma',
    docType: 'permit',
    organization: 'Boʻstonliq DЎX',
    region: 'tashkent',
    closedDate: '31.12.2024',
    archivedDate: '15.01.2025',
    retentionUntil: '31.12.2029',
    format: 'PDF/A-2b',
    sizeKb: 412,
    hash: 'a3f5c9e1b7d2486f0c1a9e8d7b6f5a4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a',
    integrityOk: true,
    transferredToState: true,
  },
  {
    id: 'ARC-2026-001198',
    docNumber: 'A-2024-0688',
    title: 'Pichan oʻrish boʻyicha ariza va qaror',
    docType: 'application',
    organization: 'Zomin DЎX',
    region: 'jizzakh',
    closedDate: '20.11.2024',
    archivedDate: '10.01.2025',
    retentionUntil: '20.11.2029',
    format: 'PDF/A-2b',
    sizeKb: 268,
    hash: 'b4e6d0f2c8a3597e1d2b0f9e8c7a6b5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b',
    integrityOk: true,
    transferredToState: true,
  },
  {
    id: 'ARC-2026-001187',
    docNumber: 'ACT-2024-0412',
    title: 'Dala tekshiruvi dalolatnomasi (14-kontur)',
    docType: 'act',
    organization: 'Boʻstonliq tumani inspeksiyasi',
    region: 'tashkent',
    closedDate: '05.10.2024',
    archivedDate: '02.01.2025',
    retentionUntil: '05.10.2029',
    format: 'PDF/A-2b',
    sizeKb: 1840,
    hash: 'c5f7e1a3d9b4608f2e3c1a0f9d8b7c6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c',
    integrityOk: true,
    transferredToState: false,
  },
  {
    id: 'ARC-2026-001172',
    docNumber: 'REP-2024-Q3-021',
    title: 'III kvartal yaylovlardan foydalanish hisoboti',
    docType: 'report',
    organization: 'Urgut DЎX',
    region: 'samarkand',
    closedDate: '15.10.2024',
    archivedDate: '28.12.2024',
    retentionUntil: '15.10.2034',
    format: 'PDF/A-2b + XLSX',
    sizeKb: 736,
    hash: 'd6a8f2b4e0c5719a3f4d2b1a0e9c8d7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d',
    integrityOk: false,
    transferredToState: false,
  },
  {
    id: 'ARC-2026-001165',
    docNumber: 'INV-2024-3390',
    title: 'Toʻlov invoysi va bank koʻchirmasi',
    docType: 'payment',
    organization: 'Moliya-hisob boʻlimi',
    region: 'republic',
    closedDate: '30.09.2024',
    archivedDate: '20.12.2024',
    retentionUntil: '30.09.2029',
    format: 'PDF/A-2b',
    sizeKb: 154,
    hash: 'e7b9a3c5f1d6820b4a5e3c2b1f0d9e8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e',
    integrityOk: true,
    transferredToState: true,
  },
  {
    id: 'ARC-2026-001150',
    docNumber: 'RX-2023-0512',
    title: 'Asalarichilik uchun ruxsatnoma',
    docType: 'permit',
    organization: 'Pop DЎX',
    region: 'namangan',
    closedDate: '31.12.2023',
    archivedDate: '18.01.2024',
    retentionUntil: '31.12.2028',
    format: 'PDF/A-2b',
    sizeKb: 398,
    hash: 'f8c0b4d6a2e7931c5b6f4d3c2a1e0f9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f',
    integrityOk: true,
    transferredToState: true,
  },
];

export const ArchivePage: React.FC<ArchivePageProps> = ({ userRole = '' }) => {
  /**
   * TZ appendix 4: the archive is К for every internal role and К+Э for the
   * central apparatus, management and the prosecutor. Restoring a document
   * stays with the system administrator, who administers the backups.
   */
  const canExport = hasRight(userRole, 'archive', 'export');
  const canRestore = hasRight(userRole, 'backups', 'edit');

  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');
  const [copiedHash, setCopiedHash] = useState<string | null>(null);
  const [detail, setDetail] = useState<ArchiveRecord | null>(null);
  const [toRestore, setToRestore] = useState<ArchiveRecord | null>(null);

  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const filtered = ARCHIVE_RECORDS.filter((r) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      r.docNumber.toLowerCase().includes(q) ||
      r.title.toLowerCase().includes(q) ||
      r.organization.toLowerCase().includes(q) ||
      r.id.toLowerCase().includes(q);
    const matchesType = typeFilter === 'all' || r.docType === typeFilter;
    const matchesRegion = regionFilter === 'all' || r.region === regionFilter;
    const matchesYear = yearFilter === 'all' || r.closedDate.endsWith(yearFilter);
    return matchesSearch && matchesType && matchesRegion && matchesYear;
  });

  const integrityIssues = ARCHIVE_RECORDS.filter((r) => !r.integrityOk).length;
  const pendingTransfer = ARCHIVE_RECORDS.filter((r) => !r.transferredToState).length;

  return (
    <div className="space-y-6 font-sans">
      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E4E7EA] p-5 rounded-2xl shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#5A646D] uppercase tracking-wider block">Arxivdagi hujjatlar</span>
            <div className="text-xl font-bold text-[#1A1F24]">1 204 ta</div>
            <span className="text-xs text-[#15803D] font-medium flex items-center gap-1 mt-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Uzoq muddatli saqlash
            </span>
          </div>
          <div className="p-3 bg-[#F0F7F1] rounded-xl text-[#2E7D4F]"><Archive className="w-6 h-6" /></div>
        </div>

        <div className="bg-white border border-[#E4E7EA] p-5 rounded-2xl shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#5A646D] uppercase tracking-wider block">Saqlash formati</span>
            <div className="text-xl font-bold text-[#1A1F24]">PDF/A-2b</div>
            <span className="text-xs text-[#5A646D] font-medium block mt-1">Xalqaro arxiv standarti</span>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><FileText className="w-6 h-6" /></div>
        </div>

        <div className="bg-white border border-[#E4E7EA] p-5 rounded-2xl shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#5A646D] uppercase tracking-wider block">Butunlik tekshiruvi</span>
            <div className={`text-xl font-bold ${integrityIssues > 0 ? 'text-[#B45309]' : 'text-[#15803D]'}`}>
              {integrityIssues > 0 ? `${integrityIssues} ta nomuvofiq` : 'Muvofiq'}
            </div>
            <span className="text-xs text-[#5A646D] font-medium block mt-1">SHA-256 xesh boʻyicha</span>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><ShieldCheck className="w-6 h-6" /></div>
        </div>

        <div className="bg-white border border-[#E4E7EA] p-5 rounded-2xl shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#5A646D] uppercase tracking-wider block">Davlat arxiviga</span>
            <div className="text-xl font-bold text-[#1A1F24]">{pendingTransfer} ta kutmoqda</div>
            <span className="text-xs text-[#5A646D] font-medium block mt-1">PQ-197-son boʻyicha</span>
          </div>
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl"><Database className="w-6 h-6" /></div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#2E7D4F] bg-[#F0F7F1] px-3 py-1 rounded-full border border-[#D9EBDC]">
            Arxiv moduli (4.2.10, 10.13)
          </span>
          <h1 className="text-lg font-bold text-[#1A1F24] mt-1.5">Elektron Arxiv</h1>
          <p className="text-xs text-[#5A646D] mt-0.5">
            Yakunlangan hujjatlarni qidirish va koʻrish, xesh boʻyicha butunlikni tekshirish,
            saqlash muddatlari va markazlashgan davlat arxiviga uzatish
          </p>
        </div>
        {canExport && (
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Download className="w-4 h-4" />}
            onClick={() => alert('Arxiv roʻyxati Excel formatida tayyorlanmoqda.')}
          >
            Roʻyxatni eksport qilish
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-4 shadow-xs space-y-3">
        <div className="w-full md:w-96">
          <Input
            placeholder="Hujjat raqami, nomi, tashkilot yoki arxiv ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
            touchSize
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-1 border-t border-[#E4E7EA]">
          <SlidersHorizontal className="w-4 h-4 text-[#5A646D]" />

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-xs font-semibold px-3 py-2 text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
          >
            <option value="all">Barcha hujjat turlari</option>
            {DOC_TYPES.map((t) => (
              <option key={t.id} value={t.id}>{t.label}</option>
            ))}
          </select>

          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-xs font-semibold px-3 py-2 text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
          >
            <option value="all">Barcha hududlar</option>
            <option value="tashkent">Toshkent viloyati</option>
            <option value="samarkand">Samarqand viloyati</option>
            <option value="jizzakh">Jizzax viloyati</option>
            <option value="namangan">Namangan viloyati</option>
            <option value="republic">Respublika (markaziy)</option>
          </select>

          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-xs font-semibold px-3 py-2 text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
          >
            <option value="all">Barcha yillar</option>
            <option value="2024">2024-yil</option>
            <option value="2023">2023-yil</option>
          </select>

          <span className="text-xs text-[#767F87] ml-auto">
            Topildi: <b className="text-[#1A1F24] font-mono">{filtered.length}</b> ta hujjat
          </span>
        </div>
      </div>

      {/* Archive table */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F8F9FA] border-b border-[#E4E7EA] text-[11px] font-bold uppercase tracking-wider text-[#5A646D]">
                <th className="py-3.5 px-4">Arxiv ID va hujjat</th>
                <th className="py-3.5 px-4">Turi</th>
                <th className="py-3.5 px-4">Tashkilot</th>
                <th className="py-3.5 px-4">Arxivga olingan</th>
                <th className="py-3.5 px-4">Saqlash muddati</th>
                <th className="py-3.5 px-4">Butunlik</th>
                <th className="py-3.5 px-4 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E7EA]">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-[#767F87]">
                    Filtr boʻyicha arxiv hujjatlari topilmadi.
                  </td>
                </tr>
              ) : (
                filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-[#F8F9FA] transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-mono font-bold text-[#2E7D4F]">{r.docNumber}</div>
                      <div className="text-[#1A1F24] mt-0.5 max-w-xs">{r.title}</div>
                      <div className="text-[10px] font-mono text-[#767F87] mt-0.5">{r.id}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-[11px] font-semibold text-[#5A646D] bg-[#F8F9FA] border border-[#E4E7EA] px-2 py-0.5 rounded">
                        {DOC_TYPE_LABELS[r.docType]}
                      </span>
                      <div className="text-[10px] font-mono text-[#767F87] mt-1">{r.format}</div>
                    </td>
                    <td className="py-3.5 px-4 text-[#1A1F24] font-semibold">{r.organization}</td>
                    <td className="py-3.5 px-4 font-mono text-[#5A646D] whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#9AA3AB]" /> {r.archivedDate}
                      </div>
                      <div className="text-[10px] text-[#767F87] mt-0.5">Yopilgan: {r.closedDate}</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[#1A1F24] whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#9AA3AB]" /> {r.retentionUntil}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      {r.integrityOk ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#F0F7F1] text-[#15803D] border border-[#D9EBDC]">
                          <ShieldCheck className="w-3.5 h-3.5" /> Muvofiq
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A]">
                          <ShieldCheck className="w-3.5 h-3.5" /> Xesh mos emas
                        </span>
                      )}
                      {r.transferredToState && (
                        <div className="text-[10px] text-[#767F87] mt-1">Davlat arxiviga uzatilgan</div>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setDetail(r)}
                          className="px-2.5 py-1 rounded-lg font-bold text-xs border border-[#E4E7EA] text-[#1A1F24] hover:bg-[#F8F9FA] transition-colors"
                        >
                          Koʻrish
                        </button>
                        {canRestore && (
                          <button
                            onClick={() => setToRestore(r)}
                            title="Arxivdan tiklash"
                            className="p-1.5 text-[#5A646D] hover:text-[#2E7D4F] hover:bg-[#F0F7F1] rounded-lg transition-colors"
                          >
                            <RotateCcw className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Document detail */}
      <Modal
        isOpen={!!detail}
        onClose={() => setDetail(null)}
        title={detail ? `${detail.docNumber} — arxiv kartasi` : ''}
        subtitle={detail?.title}
        maxWidth="lg"
        footer={
          <div className="flex items-center justify-between w-full gap-2">
            {canExport ? (
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Download className="w-4 h-4" />}
                onClick={() => alert('Hujjat PDF/A formatida yuklab olinmoqda.')}
              >
                Hujjatni yuklab olish
              </Button>
            ) : (
              <span />
            )}
            <Button variant="primary" size="sm" onClick={() => setDetail(null)}>
              Yopish
            </Button>
          </div>
        }
      >
        {detail && (
          <div className="space-y-4 py-1 text-xs">
            <div className="p-3 bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl grid grid-cols-2 gap-2 text-[#5A646D]">
              <div>Arxiv ID: <b className="text-[#1A1F24] font-mono">{detail.id}</b></div>
              <div>Turi: <b className="text-[#1A1F24]">{DOC_TYPE_LABELS[detail.docType]}</b></div>
              <div>Tashkilot: <b className="text-[#1A1F24]">{detail.organization}</b></div>
              <div>Format: <b className="text-[#1A1F24] font-mono">{detail.format}</b></div>
              <div>Yopilgan: <b className="text-[#1A1F24] font-mono">{detail.closedDate}</b></div>
              <div>Arxivga olingan: <b className="text-[#1A1F24] font-mono">{detail.archivedDate}</b></div>
              <div>Saqlash muddati: <b className="text-[#1A1F24] font-mono">{detail.retentionUntil}</b></div>
              <div>Hajmi: <b className="text-[#1A1F24] font-mono">{detail.sizeKb} KB</b></div>
            </div>

            {/* TZ module 10.13: integrity is verified through the stored hash */}
            <div className="space-y-2">
              <span className="font-bold text-[#1A1F24] block">Butunlik tekshiruvi (SHA-256):</span>
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-white border border-[#E4E7EA] rounded-lg px-3 py-2 font-mono text-[10px] text-[#1A1F24] break-all">
                  {detail.hash}
                </code>
                <button
                  onClick={() => handleCopyHash(detail.hash)}
                  title="Xeshni nusxalash"
                  className="p-2 rounded-lg border border-[#E4E7EA] text-[#5A646D] hover:text-[#2E7D4F] hover:bg-[#F0F7F1] transition-colors shrink-0"
                >
                  {copiedHash === detail.hash ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              {detail.integrityOk ? (
                <div className="p-3 bg-[#F0F7F1] border border-[#D9EBDC] rounded-xl text-[#2E7D4F] flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>Hujjat xeshi arxivga olingandagi qiymat bilan mos — hujjat oʻzgartirilmagan.</span>
                </div>
              ) : (
                <div className="p-3 bg-[#FFFBEB] border border-[#FDE68A] rounded-xl text-[#B45309] flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>
                    <b>Diqqat:</b> joriy xesh arxivdagi qiymatga mos kelmadi. Hodisa audit jurnaliga
                    yozildi va administratorga xabar berildi.
                  </span>
                </div>
              )}
            </div>

            <div className="p-3 bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-[#5A646D] flex items-start gap-2">
              <Info className="w-4 h-4 shrink-0 mt-0.5 text-[#2E7D4F]" />
              <span>
                Markazlashgan davlat elektron arxiviga uzatish:{' '}
                <b className="text-[#1A1F24]">
                  {detail.transferredToState ? 'bajarilgan' : 'navbatda (PQ-197-son)'}
                </b>
              </span>
            </div>
          </div>
        )}
      </Modal>

      {/* Restore from archive */}
      <Modal
        isOpen={!!toRestore}
        onClose={() => setToRestore(null)}
        title="Hujjatni arxivdan tiklash"
        subtitle={toRestore?.docNumber}
        footer={
          <div className="flex items-center justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setToRestore(null)}>
              Bekor qilish
            </Button>
            <Button
              variant="primary"
              size="sm"
              leftIcon={<RotateCcw className="w-4 h-4" />}
              onClick={() => setToRestore(null)}
              className="bg-[#2E7D4F] hover:bg-[#23653F] font-bold"
            >
              Tiklash
            </Button>
          </div>
        }
      >
        <div className="space-y-3 py-1 text-xs">
          <div className="p-3 bg-[#F0F7F1] border border-[#D9EBDC] rounded-xl text-[#2E7D4F]">
            Hujjat arxivdan faol reyestrga qaytariladi. Arxivdagi nusxa va uning xeshi
            oʻzgarmaydi — tiklash faqat nusxa yaratadi.
          </div>
          <p className="text-[#5A646D]">Tiklash amali va uning sababi audit jurnaliga yoziladi.</p>
        </div>
      </Modal>
    </div>
  );
};
