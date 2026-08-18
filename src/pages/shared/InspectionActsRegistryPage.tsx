import React, { useState } from 'react';
import {
  ClipboardCheck,
  Search,
  Download,
  SlidersHorizontal,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  Calendar,
  ShieldCheck,
  Gavel,
  FileText,
  Info,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { hasRight } from '../../lib/permissions';
import { Input } from '../../components/ui/FormControls';
import { Tabs } from '../../components/ui/Navigation';
import { Modal } from '../../components/ui/Overlay';

export interface InspectionActsRegistryPageProps {
  onNavigate?: (page: string, params?: any) => void;
  userRole?: string;
}

interface InspectionAct {
  id: string;
  actNumber: string;
  permitNumber: string;
  activityType: string;
  organization: string;
  region: string;
  inspector: string;
  inspectedAt: string;
  contour: string;
  /** Whether the field check found the permit conditions respected. */
  result: 'compliant' | 'violation';
  violationType?: string;
  /** Case opened on the back of a violation — TZ object "Дело о нарушении". */
  caseNumber?: string;
  caseStatus?: 'open' | 'transferred' | 'closed';
  signedWithEimzo: boolean;
}

const ACTS: InspectionAct[] = [
  {
    id: '1',
    actNumber: 'ACT-2026-0088',
    permitNumber: 'RX-2026-0089',
    activityType: 'Chorva boqish',
    organization: 'Boʻstonliq DЎX',
    region: 'tashkent',
    inspector: 'Abdullayev A.N.',
    inspectedAt: '12.08.2026',
    contour: '14-kontur (Chorvoq)',
    result: 'compliant',
    signedWithEimzo: true,
  },
  {
    id: '2',
    actNumber: 'ACT-2026-0087',
    permitNumber: 'RX-2026-0074',
    activityType: 'Pichan oʻrish',
    organization: 'Zomin DЎX',
    region: 'jizzakh',
    inspector: 'Oripov S.K.',
    inspectedAt: '11.08.2026',
    contour: '7-kontur (Zomin shimoli)',
    result: 'violation',
    violationType: 'Belgilangan kontur chegarasidan chiqish',
    caseNumber: 'ISH-2026-0041',
    caseStatus: 'transferred',
    signedWithEimzo: true,
  },
  {
    id: '3',
    actNumber: 'ACT-2026-0086',
    permitNumber: 'RX-2026-0061',
    activityType: 'Asalarichilik',
    organization: 'Oqdaryo DЎX',
    region: 'samarkand',
    inspector: 'Sodiqov U.T.',
    inspectedAt: '10.08.2026',
    contour: '22-kontur (Oqdaryo)',
    result: 'compliant',
    signedWithEimzo: true,
  },
  {
    id: '4',
    actNumber: 'ACT-2026-0085',
    permitNumber: 'RX-2026-0058',
    activityType: 'Chorva boqish',
    organization: 'Pop DЎX',
    region: 'namangan',
    inspector: 'Yoʻldoshev B.R.',
    inspectedAt: '09.08.2026',
    contour: '3-kontur (Pop janubi)',
    result: 'violation',
    violationType: 'Meʼyordan ortiq chorva bosh soni',
    caseNumber: 'ISH-2026-0040',
    caseStatus: 'open',
    signedWithEimzo: true,
  },
  {
    id: '5',
    actNumber: 'ACT-2026-0084',
    permitNumber: 'RX-2026-0049',
    activityType: 'Oʻtin va shox-shabba yigʻish',
    organization: 'Burchmulla DЎX',
    region: 'tashkent',
    inspector: 'Abdullayev A.N.',
    inspectedAt: '08.08.2026',
    contour: '9-kontur (Burchmulla)',
    result: 'violation',
    violationType: 'Ruxsatnomasiz faoliyat',
    caseNumber: 'ISH-2026-0038',
    caseStatus: 'closed',
    signedWithEimzo: true,
  },
  {
    id: '6',
    actNumber: 'ACT-2026-0083',
    permitNumber: 'RX-2026-0044',
    activityType: 'Rekreatsiya va turizm',
    organization: 'Urgut DЎX',
    region: 'samarkand',
    inspector: 'Egamov Sh.M.',
    inspectedAt: '07.08.2026',
    contour: '18-kontur (Urgut)',
    result: 'compliant',
    signedWithEimzo: true,
  },
];

const CASE_STATUS_LABELS: Record<string, string> = {
  open: 'Koʻrib chiqilmoqda',
  transferred: 'Prokuraturaga uzatilgan',
  closed: 'Yakunlangan',
};

const CASE_STATUS_STYLES: Record<string, string> = {
  open: 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]',
  transferred: 'bg-rose-50 text-rose-700 border-rose-200',
  closed: 'bg-[#F0F7F1] text-[#15803D] border-[#D9EBDC]',
};

export const InspectionActsRegistryPage: React.FC<InspectionActsRegistryPageProps> = ({ userRole = '' }) => {
  /**
   * TZ appendix 4: inspection acts and violation cases are К+Э for the central
   * apparatus, management and the prosecutor. Drawing up and signing an act
   * belongs to the inspector, so this registry is read-and-export only.
   */
  const canExport = hasRight(userRole, 'inspection_act', 'export');

  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState('all');
  const [detail, setDetail] = useState<InspectionAct | null>(null);

  const filtered = ACTS.filter((a) => {
    if (activeTab === 'compliant' && a.result !== 'compliant') return false;
    if (activeTab === 'violation' && a.result !== 'violation') return false;
    if (activeTab === 'cases' && !a.caseNumber) return false;
    if (regionFilter !== 'all' && a.region !== regionFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        a.actNumber.toLowerCase().includes(q) ||
        a.permitNumber.toLowerCase().includes(q) ||
        a.organization.toLowerCase().includes(q) ||
        a.inspector.toLowerCase().includes(q) ||
        (a.caseNumber ?? '').toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const totalCount = ACTS.length;
  const compliantCount = ACTS.filter((a) => a.result === 'compliant').length;
  const violationCount = ACTS.filter((a) => a.result === 'violation').length;
  const caseCount = ACTS.filter((a) => a.caseNumber).length;

  return (
    <div className="space-y-6 font-sans">
      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E4E7EA] p-5 rounded-2xl shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#5A646D] uppercase tracking-wider block">Jami dalolatnomalar</span>
            <div className="text-xl font-bold text-[#1A1F24]">{totalCount} ta</div>
            <span className="text-xs text-[#5A646D] font-medium block mt-1">Joriy oy boʻyicha</span>
          </div>
          <div className="p-3 bg-[#F0F7F1] rounded-xl text-[#2E7D4F]"><ClipboardCheck className="w-6 h-6" /></div>
        </div>

        <div className="bg-white border border-[#E4E7EA] p-5 rounded-2xl shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#5A646D] uppercase tracking-wider block">Talabga muvofiq</span>
            <div className="text-xl font-bold text-[#15803D]">{compliantCount} ta</div>
            <span className="text-xs text-[#15803D] font-medium flex items-center gap-1 mt-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Buzilish aniqlanmadi
            </span>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><CheckCircle2 className="w-6 h-6" /></div>
        </div>

        <div className="bg-white border border-[#E4E7EA] p-5 rounded-2xl shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#5A646D] uppercase tracking-wider block">Buzilish aniqlangan</span>
            <div className="text-xl font-bold text-[#B45309]">{violationCount} ta</div>
            <span className="text-xs text-[#B45309] font-medium block mt-1">Chora koʻrish talab qilinadi</span>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><AlertTriangle className="w-6 h-6" /></div>
        </div>

        <div className="bg-white border border-[#E4E7EA] p-5 rounded-2xl shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#5A646D] uppercase tracking-wider block">Huquqbuzarlik ishlari</span>
            <div className="text-xl font-bold text-[#1A1F24]">{caseCount} ta</div>
            <span className="text-xs text-[#5A646D] font-medium block mt-1">Ochilgan ishlar</span>
          </div>
          <div className="p-3 bg-rose-50 text-rose-600 rounded-xl"><Gavel className="w-6 h-6" /></div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#2E7D4F] bg-[#F0F7F1] px-3 py-1 rounded-full border border-[#D9EBDC]">
            Inspeksiya moduli (4.2.10, 10.8) — faqat koʻrish
          </span>
          <h1 className="text-lg font-bold text-[#1A1F24] mt-1.5">Inspeksiya Dalolatnomalari va Huquqbuzarlik Ishlari</h1>
          <p className="text-xs text-[#5A646D] mt-0.5">
            Respublika boʻyicha dala tekshiruvlari natijalari, aniqlangan buzilishlar va ular
            boʻyicha ochilgan ishlar reyestri
          </p>
        </div>
        {canExport && (
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Download className="w-4 h-4" />}
            onClick={() => alert('Dalolatnomalar reyestri Excel formatida tayyorlanmoqda.')}
          >
            Excelga eksport
          </Button>
        )}
      </div>

      {/* Tabs and filters */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-4 shadow-xs space-y-4">
        <div className="border-b border-[#E4E7EA] pb-2">
          <Tabs
            tabs={[
              { id: 'all', label: 'Barchasi', count: totalCount },
              { id: 'compliant', label: 'Talabga muvofiq', count: compliantCount },
              { id: 'violation', label: 'Buzilish aniqlangan', count: violationCount },
              { id: 'cases', label: 'Huquqbuzarlik ishlari', count: caseCount },
            ]}
            activeTabId={activeTab}
            onChange={setActiveTab}
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="w-full sm:w-96">
            <Input
              placeholder="Dalolatnoma №, ruxsatnoma №, DЎX yoki inspektor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
              touchSize
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <SlidersHorizontal className="w-4 h-4 text-[#5A646D] shrink-0" />
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-xs font-semibold px-3 py-2 text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F] w-full sm:w-56"
            >
              <option value="all">Respublika — barcha hududlar</option>
              <option value="tashkent">Toshkent viloyati</option>
              <option value="samarkand">Samarqand viloyati</option>
              <option value="jizzakh">Jizzax viloyati</option>
              <option value="namangan">Namangan viloyati</option>
            </select>
            <span className="text-xs text-[#767F87] whitespace-nowrap">
              Topildi: <b className="text-[#1A1F24] font-mono">{filtered.length}</b>
            </span>
          </div>
        </div>
      </div>

      {/* Acts table */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F8F9FA] border-b border-[#E4E7EA] text-[11px] font-bold uppercase tracking-wider text-[#5A646D]">
                <th className="py-3.5 px-4">Dalolatnoma va ruxsatnoma</th>
                <th className="py-3.5 px-4">Tashkilot va kontur</th>
                <th className="py-3.5 px-4">Inspektor va sana</th>
                <th className="py-3.5 px-4">Natija</th>
                <th className="py-3.5 px-4">Huquqbuzarlik ishi</th>
                <th className="py-3.5 px-4 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E7EA]">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-[#767F87]">
                    Filtr boʻyicha dalolatnomalar topilmadi.
                  </td>
                </tr>
              ) : (
                filtered.map((a) => (
                  <tr key={a.id} className="hover:bg-[#F8F9FA] transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-mono font-bold text-[#2E7D4F]">{a.actNumber}</div>
                      <div className="text-[11px] text-[#5A646D] mt-0.5">
                        Ruxsatnoma: <span className="font-mono text-[#1A1F24]">{a.permitNumber}</span>
                      </div>
                      <div className="text-[11px] text-[#767F87]">{a.activityType}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-[#1A1F24]">{a.organization}</div>
                      <div className="text-[11px] text-[#767F87] flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-[#9AA3AB]" /> {a.contour}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-[#1A1F24] font-semibold">{a.inspector}</div>
                      <div className="text-[11px] font-mono text-[#767F87] flex items-center gap-1 mt-0.5">
                        <Calendar className="w-3 h-3 text-[#9AA3AB]" /> {a.inspectedAt}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      {a.result === 'compliant' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#F0F7F1] text-[#15803D] border border-[#D9EBDC]">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Muvofiq
                        </span>
                      ) : (
                        <>
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A]">
                            <AlertTriangle className="w-3.5 h-3.5" /> Buzilish
                          </span>
                          <div className="text-[11px] text-[#B45309] mt-1 max-w-[12rem]">{a.violationType}</div>
                        </>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      {a.caseNumber ? (
                        <>
                          <div className="font-mono font-bold text-[#1A1F24]">{a.caseNumber}</div>
                          <span
                            className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                              CASE_STATUS_STYLES[a.caseStatus ?? 'open']
                            }`}
                          >
                            {CASE_STATUS_LABELS[a.caseStatus ?? 'open']}
                          </span>
                        </>
                      ) : (
                        <span className="text-[#9AA3AB]">—</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setDetail(a)}
                        className="px-2.5 py-1 rounded-lg font-bold text-xs border border-[#E4E7EA] text-[#1A1F24] hover:bg-[#F8F9FA] transition-colors"
                      >
                        Koʻrish
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Act detail */}
      <Modal
        isOpen={!!detail}
        onClose={() => setDetail(null)}
        title={detail ? `Dalolatnoma ${detail.actNumber}` : ''}
        subtitle={detail ? `${detail.organization} · ${detail.contour}` : ''}
        maxWidth="lg"
        footer={
          <div className="flex items-center justify-between w-full gap-2">
            {canExport ? (
              <Button
                variant="outline"
                size="sm"
                leftIcon={<FileText className="w-4 h-4" />}
                onClick={() => alert('Dalolatnoma PDF/A formatida yuklab olinmoqda.')}
              >
                PDF/A yuklab olish
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
              <div>Ruxsatnoma: <b className="text-[#1A1F24] font-mono">{detail.permitNumber}</b></div>
              <div>Faoliyat turi: <b className="text-[#1A1F24]">{detail.activityType}</b></div>
              <div>Kontur: <b className="text-[#1A1F24]">{detail.contour}</b></div>
              <div>Tekshiruv sanasi: <b className="text-[#1A1F24] font-mono">{detail.inspectedAt}</b></div>
              <div>Inspektor: <b className="text-[#1A1F24]">{detail.inspector}</b></div>
              <div>Tashkilot: <b className="text-[#1A1F24]">{detail.organization}</b></div>
            </div>

            {detail.result === 'violation' ? (
              <div className="p-3 bg-[#FFFBEB] border border-[#FDE68A] rounded-xl text-[#B45309] space-y-1">
                <span className="font-bold flex items-center gap-1">
                  <AlertTriangle className="w-4 h-4" /> Aniqlangan buzilish
                </span>
                <p>{detail.violationType}</p>
                {detail.caseNumber && (
                  <p className="pt-1">
                    Ish raqami: <b className="font-mono">{detail.caseNumber}</b> —{' '}
                    {CASE_STATUS_LABELS[detail.caseStatus ?? 'open']}
                  </p>
                )}
              </div>
            ) : (
              <div className="p-3 bg-[#F0F7F1] border border-[#D9EBDC] rounded-xl text-[#2E7D4F] flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <span>Tekshiruvda ruxsatnoma shartlari buzilgani aniqlanmadi.</span>
              </div>
            )}

            {detail.signedWithEimzo && (
              <div className="p-3 bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-[#5A646D] flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-[#2E7D4F]" />
                <span>
                  Dalolatnoma inspektor tomonidan <b className="text-[#1A1F24]">E-IMZO</b> bilan imzolangan,
                  imzo vaqt tamgʻasi va xeshi bilan saqlanadi.
                </span>
              </div>
            )}

            <div className="p-3 bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-[11px] text-[#5A646D] flex items-start gap-2">
              <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#2E7D4F]" />
              <span>
                Bu reyestr faqat koʻrish uchun. Dalolatnoma tuzish va imzolash inspektor,
                buzilish boʻyicha qaror qabul qilish esa tashkilot rahbari vakolatida.
              </span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
