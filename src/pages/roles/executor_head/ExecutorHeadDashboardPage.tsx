import React, { useState } from 'react';
import {
  FileText,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  KeyRound,
  ShieldCheck,
  Building2,
  QrCode,
  Download,
  Eye,
  Send,
  RotateCcw,
  CheckSquare,
  FileBarChart,
  CreditCard,
  Search,
  Compass,
  UserCheck,
  Gavel,
  Sparkles,
  Info,
} from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Modal } from '../../../components/ui/Overlay';

export interface ExecutorHeadDashboardPageProps {
  onNavigate?: (page: string, params?: any) => void;
}

export const ExecutorHeadDashboardPage: React.FC<ExecutorHeadDashboardPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'applications' | 'permits' | 'inspections' | 'reports'>('applications');
  const [selectedAppForDecision, setSelectedAppForDecision] = useState<any | null>(null);
  const [isSignModalOpen, setIsSignModalOpen] = useState(false);
  const [selectedPermitForSign, setSelectedPermitForSign] = useState<any | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('RJ-05');
  const [rejectComment, setRejectComment] = useState('');
  const [isSigning, setIsSigning] = useState(false);

  // Decision pending applications (reviewed by staff & GIS)
  const [pendingApplications, setPendingApplications] = useState([
    {
      id: 'А-00031',
      applicantName: '«Ipak Yoʻli Agroservis» MCHJ',
      applicantId: 'STIR 306148912',
      activityType: 'Chorva mollarini boqish',
      contour: 'Boʻstonliq 14-2 (Yaylov)',
      areaHa: 41.0,
      livestock: '45 bosh qoramol (41.0 SB)',
      amount: '4 100 000 UZS',
      staffConclusion: 'Ijobiy (Hujjatlar toʻliq)',
      gisConclusion: 'Ijobiy (ST_IsValid, Sigʻim yetarli)',
      slaText: '18 soat qoldi',
      isOverdue: false,
    },
    {
      id: 'А-00042',
      applicantName: 'Karimov Aziz Botirovich',
      applicantId: 'JSHSHIR 3170886025218',
      activityType: 'Chorva mollarini boqish',
      contour: 'Boʻstonliq 14-2 (Yaylov)',
      areaHa: 12.5,
      livestock: '14 bosh qoramol (12.5 SB)',
      amount: '1 207 325 UZS',
      staffConclusion: 'Ijobiy (Veterinariya akti tasdiqlangan)',
      gisConclusion: 'Ijobiy (Konflikt yoʻq)',
      slaText: 'Bugun 18:00 gacha',
      isOverdue: false,
    },
    {
      id: 'А-00037',
      applicantName: 'Umarova Shoira Rustamovna',
      applicantId: 'JSHSHIR 4120993013391',
      activityType: 'Ratsional dam olish (Ekoturizm)',
      contour: 'Boʻstonliq 21-6 (Rekreatsiya)',
      areaHa: 8.0,
      livestock: '—',
      amount: '960 000 UZS',
      staffConclusion: 'Ijobiy',
      gisConclusion: 'Ijobiy (Muhofaza zonasi chetida)',
      slaText: '2 kun qoldi',
      isOverdue: false,
    },
    {
      id: 'А-00040',
      applicantName: '«Chorvachilik Servis» MCHJ',
      applicantId: 'STIR 305718841',
      activityType: 'Pichan oʻrish',
      contour: 'Oqqoʻrgʻon 7-1',
      areaHa: 34.0,
      livestock: '—',
      amount: '3 400 000 UZS',
      staffConclusion: 'Qayta koʻrib chiqish tavsiya etildi',
      gisConclusion: 'Ogohlantirish (Chegara aniqligi)',
      slaText: '1 kun oʻtgan (SLA)',
      isOverdue: true,
    },
  ]);

  // Permits awaiting E-IMZO signing
  const [signingPermits, setSigningPermits] = useState([
    {
      id: 'RX-2026-0091',
      appNo: 'А-00028',
      applicantName: '«Burchmulla Agro» MCHJ',
      activity: 'Chorva mollarini boqish',
      contour: 'Boʻstonliq 14-2',
      areaHa: 41.0,
      sumPaid: '4 100 000 UZS (Toʻlangan)',
      paymentDate: '10.08.2026',
      period: '10.08.2026 — 10.08.2027',
      status: 'awaiting_signature',
    },
    {
      id: 'RX-2026-0092',
      appNo: 'А-00029',
      applicantName: 'Saidov Otabek Shavkatovich',
      activity: 'Asalari uyalarini joylashtirish',
      contour: 'Zangiota 3-1',
      areaHa: 2.0,
      sumPaid: '450 000 UZS (Toʻlangan)',
      paymentDate: '11.08.2026',
      period: '15.08.2026 — 15.10.2026',
      status: 'awaiting_signature',
    },
  ]);

  // Inspection acts pending review
  const [inspectionActs, setInspectionActs] = useState([
    {
      id: 'ACT-2026-0088',
      permitNo: 'RX-2026-0089',
      inspector: 'Abdullayev A.N. (Tuman inspektori)',
      date: '12.08.2026',
      result: 'compliant',
      title: 'Dala tekshiruvi: Chegaralar va chorva soni meʼyorida',
      recommendation: 'Faoliyatni davom ettirishga ruxsat',
    },
    {
      id: 'ACT-2026-0089',
      permitNo: 'RX-2026-0072',
      inspector: 'Abdullayev A.N. (Tuman inspektori)',
      date: '11.08.2026',
      result: 'violation',
      title: 'Qoidabuzarlik: Belgilangan normadan ortiq 15 bosh qoramol boqilmoqda',
      recommendation: 'Ruxsatnomani vaqtincha toʻxtatish (Suspend)',
    },
  ]);

  const handleApproveDecision = (app: any) => {
    setPendingApplications((prev) => prev.filter((a) => a.id !== app.id));
    setToastMessage(`Ariza "${app.id}" (${app.applicantName}) muvaffaqiyatli tasdiqlandi va arizachiga toʻlov xabarnomasi (Invoice) yuborildi!`);
    setSelectedAppForDecision(null);
    setTimeout(() => setToastMessage(null), 4500);
  };

  const handleRejectDecision = (app: any) => {
    setPendingApplications((prev) => prev.filter((a) => a.id !== app.id));
    setToastMessage(`Ariza "${app.id}" rasmiy rad etildi (${rejectReason}). Arizachiga asoslantirilgan xat joʻnatildi.`);
    setSelectedAppForDecision(null);
    setRejectComment('');
    setTimeout(() => setToastMessage(null), 4500);
  };

  const handleSignPermitWithEimzo = () => {
    if (!selectedPermitForSign) return;
    setIsSigning(true);
    setTimeout(() => {
      setIsSigning(false);
      setSigningPermits((prev) => prev.filter((p) => p.id !== selectedPermitForSign.id));
      setIsSignModalOpen(false);
      setToastMessage(`Ruxsatnoma "${selectedPermitForSign.id}" E-IMZO bilan muvaffaqiyatli imzolandi, QR-kodli rasmiy PDF shakllantirildi va arizachining shaxsiy kabinetiga yuborildi!`);
      setSelectedPermitForSign(null);
      setTimeout(() => setToastMessage(null), 4500);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-sans pb-16">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="p-4 bg-[#F0F7F1] border border-[#D9EBDC] text-[#2E7D4F] rounded-2xl shadow-sm flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-[#2E7D4F] shrink-0" />
            <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-xs font-bold underline hover:opacity-75 cursor-pointer"
          >
            Yopish
          </button>
        </div>
      )}

      {/* Director Header Card */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2E7D4F] bg-[#F0F7F1] px-2.5 py-1 rounded border border-[#D9EBDC] flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5" /> Boʻstonliq davlat oʻrmon xoʻjaligi
            </span>
            <span className="text-xs font-mono font-bold bg-[#E0F2FE] text-[#0369A1] px-2.5 py-1 rounded border border-[#BAE6FD]">
              TZ C6 / C7 Ssenariylari
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-[#1A1F24]">
            Rahbar Ish Stoli va Qaror Qabul Qilish Muhiti
          </h1>
          <p className="text-xs text-[#5A646D]">
            Direktor: <b>Mirzayev Dilshod Akramovich</b> · E-IMZO Sertifikati: <span className="text-[#2E7D4F] font-mono font-bold">FAOL (DS-2026-DX841)</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<KeyRound className="w-4 h-4 text-[#2E7D4F]" />}
            onClick={() => alert('E-IMZO kaliti faol. Amal qilish muddati: 14.11.2027 gacha.')}
            className="text-xs font-bold"
          >
            E-IMZO Holati
          </Button>
          <Button
            variant="primary"
            size="sm"
            leftIcon={<FileBarChart className="w-4 h-4" />}
            onClick={() => onNavigate?.('reports')}
            className="bg-[#2E7D4F] hover:bg-[#23653F] text-white text-xs font-bold"
          >
            Davriy Hisobotlar
          </Button>
        </div>
      </div>

      {/* Actionable Executive Metric Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => setActiveTab('applications')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer ${
            activeTab === 'applications'
              ? 'bg-[#F0F7F1] border-[#2E7D4F] shadow-sm'
              : 'bg-white border-[#E4E7EA] hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5A646D]">Qaror Kutayotgan</span>
            <span className="w-8 h-8 rounded-xl bg-[#D9EBDC] text-[#2E7D4F] flex items-center justify-center font-bold">
              {pendingApplications.length}
            </span>
          </div>
          <div className="text-2xl font-bold font-mono text-[#1A1F24] mt-2">{pendingApplications.length} ta ariza</div>
          <p className="text-[11px] text-[#5A646D] mt-1">Mutaxassis va GIS koʻrib chiqqan</p>
        </div>

        <div
          onClick={() => setActiveTab('permits')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer ${
            activeTab === 'permits'
              ? 'bg-[#EFF6FF] border-[#3B82F6] shadow-sm'
              : 'bg-white border-[#E4E7EA] hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5A646D]">E-IMZO Imzolash</span>
            <span className="w-8 h-8 rounded-xl bg-[#DBEAFE] text-[#1D4ED8] flex items-center justify-center font-bold">
              {signingPermits.length}
            </span>
          </div>
          <div className="text-2xl font-bold font-mono text-[#1D4ED8] mt-2">{signingPermits.length} ta ruxsatnoma</div>
          <p className="text-[11px] text-[#5A646D] mt-1">Toʻlovi toʻliq qabul qilingan</p>
        </div>

        <div
          onClick={() => setActiveTab('inspections')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer ${
            activeTab === 'inspections'
              ? 'bg-[#FFFBEB] border-[#F59E0B] shadow-sm'
              : 'bg-white border-[#E4E7EA] hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5A646D]">Inspeksiya Aktlari</span>
            <span className="w-8 h-8 rounded-xl bg-[#FEF3C7] text-[#B45309] flex items-center justify-center font-bold">
              {inspectionActs.length}
            </span>
          </div>
          <div className="text-2xl font-bold font-mono text-[#B45309] mt-2">{inspectionActs.length} ta dalolatnoma</div>
          <p className="text-[11px] text-[#5A646D] mt-1">1 ta qoidabuzarlik aniqlangan</p>
        </div>

        <div className="p-5 bg-white border border-[#E4E7EA] rounded-2xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5A646D]">Oylik Tushum (50/50)</span>
            <CreditCard className="w-5 h-5 text-[#2E7D4F]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#2E7D4F] mt-2">128.4 mln</div>
          <p className="text-[11px] text-[#5A646D] mt-1">DЎX hisobidagi ulush: 64.2 mln UZS</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-[#E4E7EA] flex items-center gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('applications')}
          className={`px-4 py-2.5 text-xs font-bold transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
            activeTab === 'applications'
              ? 'border-[#2E7D4F] text-[#2E7D4F] bg-white rounded-t-xl'
              : 'border-transparent text-[#5A646D] hover:text-[#1A1F24]'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Qaror kutayotgan arizalar</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-[#D9EBDC] text-[#2E7D4F]">
            {pendingApplications.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('permits')}
          className={`px-4 py-2.5 text-xs font-bold transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
            activeTab === 'permits'
              ? 'border-[#3B82F6] text-[#1D4ED8] bg-white rounded-t-xl'
              : 'border-transparent text-[#5A646D] hover:text-[#1A1F24]'
          }`}
        >
          <KeyRound className="w-4 h-4" />
          <span>E-IMZO imzolash navbati</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-[#DBEAFE] text-[#1D4ED8]">
            {signingPermits.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('inspections')}
          className={`px-4 py-2.5 text-xs font-bold transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
            activeTab === 'inspections'
              ? 'border-[#F59E0B] text-[#B45309] bg-white rounded-t-xl'
              : 'border-transparent text-[#5A646D] hover:text-[#1A1F24]'
          }`}
        >
          <CheckSquare className="w-4 h-4" />
          <span>Inspeksiya dalolatnomalari</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-[#FEF3C7] text-[#B45309]">
            {inspectionActs.length}
          </span>
        </button>
      </div>

      {/* Tab 1: Applications Decision Queue */}
      {activeTab === 'applications' && (
        <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-[#1A1F24]">Qaror Qabul Qilish Navbati (C6 Ssenariysi)</h2>
              <p className="text-xs text-[#5A646D]">
                Ijrochi tashkilot xodimi va GIS mutaxassisi tomonidan tekshirilgan va tasdiqqa kiritilgan arizalar
              </p>
            </div>
            <span className="text-xs text-[#5A646D] font-mono">Boʻstonliq tumani boʻyicha</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-[#F8F9FA] border-b border-[#E4E7EA]">
                <tr>
                  <th className="p-3 font-semibold text-[#5A646D]">Ariza №</th>
                  <th className="p-3 font-semibold text-[#5A646D]">Arizachi</th>
                  <th className="p-3 font-semibold text-[#5A646D]">Faoliyat va Kontur</th>
                  <th className="p-3 font-semibold text-[#5A646D]">Maydon / Bosh</th>
                  <th className="p-3 font-semibold text-[#5A646D]">Ekspertiza Xulosalari</th>
                  <th className="p-3 font-semibold text-[#5A646D]">Summa</th>
                  <th className="p-3 font-semibold text-[#5A646D]">SLA</th>
                  <th className="p-3 font-semibold text-[#5A646D] text-right">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4E7EA]">
                {pendingApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-[#F8F9FA]">
                    <td className="p-3 font-mono font-bold text-[#2E7D4F]">{app.id}</td>
                    <td className="p-3">
                      <div className="font-bold text-[#1A1F24]">{app.applicantName}</div>
                      <span className="text-[11px] font-mono text-[#5A646D]">{app.applicantId}</span>
                    </td>
                    <td className="p-3">
                      <div className="font-semibold text-[#1A1F24]">{app.activityType}</div>
                      <span className="text-[11px] text-[#5A646D]">{app.contour}</span>
                    </td>
                    <td className="p-3 font-mono">
                      <b>{app.areaHa} ga</b>
                      {app.livestock !== '—' && <div className="text-[10px] text-[#5A646D]">{app.livestock}</div>}
                    </td>
                    <td className="p-3 space-y-1">
                      <div className="flex items-center gap-1 text-[11px] text-[#2E7D4F] font-semibold">
                        <UserCheck className="w-3.5 h-3.5" /> {app.staffConclusion}
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-[#0369A1] font-semibold">
                        <Compass className="w-3.5 h-3.5" /> {app.gisConclusion}
                      </div>
                    </td>
                    <td className="p-3 font-mono font-bold text-[#123522]">{app.amount}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                          app.isOverdue ? 'bg-[#FEF2F2] text-[#991B1B]' : 'bg-[#FFFBEB] text-[#B45309]'
                        }`}
                      >
                        {app.slaText}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onNavigate?.('application_card', { id: app.id })}
                          className="text-[11px] px-2 py-1 h-7"
                        >
                          Koʻrish
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => setSelectedAppForDecision(app)}
                          className="bg-[#2E7D4F] hover:bg-[#23653F] text-white font-bold text-[11px] px-2.5 py-1 h-7"
                        >
                          Qaror Chiqarish
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Permits E-IMZO Signing Queue */}
      {activeTab === 'permits' && (
        <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#1A1F24]">Ruxsatnomalarni E-IMZO Bilan Imzolash (C7 Ssenariysi)</h2>
              <p className="text-xs text-[#5A646D]">
                Toʻlov toʻliq qabul qilingan. Direktor E-IMZO qoʻygach QR-kodli elektron ruxsatnoma generatsiya qilinadi.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-[#F8F9FA] border-b border-[#E4E7EA]">
                <tr>
                  <th className="p-3 font-semibold text-[#5A646D]">Ruxsatnoma №</th>
                  <th className="p-3 font-semibold text-[#5A646D]">Ariza №</th>
                  <th className="p-3 font-semibold text-[#5A646D]">Arizachi</th>
                  <th className="p-3 font-semibold text-[#5A646D]">Faoliyat va Kontur</th>
                  <th className="p-3 font-semibold text-[#5A646D]">Muddati</th>
                  <th className="p-3 font-semibold text-[#5A646D]">Toʻlov Holati</th>
                  <th className="p-3 font-semibold text-[#5A646D] text-right">Imzolash</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4E7EA]">
                {signingPermits.map((permit) => (
                  <tr key={permit.id} className="hover:bg-[#F8F9FA]">
                    <td className="p-3 font-mono font-bold text-[#1D4ED8]">{permit.id}</td>
                    <td className="p-3 font-mono text-[#5A646D]">{permit.appNo}</td>
                    <td className="p-3 font-bold text-[#1A1F24]">{permit.applicantName}</td>
                    <td className="p-3">
                      <div>{permit.activity}</div>
                      <span className="text-[11px] text-[#5A646D]">{permit.contour} ({permit.areaHa} ga)</span>
                    </td>
                    <td className="p-3 font-mono text-[11px]">{permit.period}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#F0F7F1] text-[#2E7D4F] border border-[#D9EBDC]">
                        {permit.sumPaid}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <Button
                        variant="primary"
                        size="sm"
                        leftIcon={<KeyRound className="w-3.5 h-3.5" />}
                        onClick={() => {
                          setSelectedPermitForSign(permit);
                          setIsSignModalOpen(true);
                        }}
                        className="bg-[#2E7D4F] hover:bg-[#23653F] text-white font-bold text-xs"
                      >
                        E-IMZO Bilan Tasdiqlash
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Inspection Acts */}
      {activeTab === 'inspections' && (
        <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#1A1F24]">Tuman Inspektori Dala Dalolatnomalari (C15 Ssenariysi)</h2>
              <p className="text-xs text-[#5A646D]">
                Dala nazorati xulosalari boʻyicha ruxsatnomani toʻxtatish (suspend) yoki qoidabuzarlik ishini ochish
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate?.('inspection_acts')}
              className="text-xs"
            >
              Barcha Aktlar Reyestri
            </Button>
          </div>

          <div className="space-y-3">
            {inspectionActs.map((act) => (
              <div
                key={act.id}
                className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  act.result === 'violation' ? 'bg-[#FFFBEB] border-[#FDE68A]' : 'bg-[#F8F9FA] border-[#E4E7EA]'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-[#1A1F24]">{act.id}</span>
                    <span className="text-xs text-[#5A646D]">· Ruxsatnoma: <b className="font-mono">{act.permitNo}</b></span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        act.result === 'violation'
                          ? 'bg-[#FEF2F2] text-[#991B1B] border border-[#FCA5A5]'
                          : 'bg-[#F0F7F1] text-[#2E7D4F] border border-[#D9EBDC]'
                      }`}
                    >
                      {act.result === 'violation' ? 'Qoidabuzarlik' : 'Muvofiq'}
                    </span>
                  </div>
                  <div className="font-bold text-xs text-[#1A1F24]">{act.title}</div>
                  <div className="text-[11px] text-[#5A646D]">{act.inspector} · {act.date}</div>
                </div>

                <div className="flex items-center gap-2">
                  {act.result === 'violation' && (
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<AlertTriangle className="w-3.5 h-3.5 text-[#B91C1C]" />}
                      onClick={() => alert(`Ruxsatnoma ${act.permitNo} vaqtincha toʻxtatildi (Suspend)!`)}
                      className="border-[#B91C1C] text-[#B91C1C] hover:bg-[#FEF2F2] text-xs font-bold"
                    >
                      Ruxsatnomani Toʻxtatish
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onNavigate?.('inspection_acts')}
                    className="text-xs"
                  >
                    Aktni Koʻrish
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Decision Modal (Approve / Reject / Return) */}
      {selectedAppForDecision && (
        <Modal
          isOpen={!!selectedAppForDecision}
          onClose={() => setSelectedAppForDecision(null)}
          title={`Ariza boʻyicha Yakuniy Qaror: ${selectedAppForDecision.id}`}
          subtitle={`${selectedAppForDecision.applicantName} · ${selectedAppForDecision.activityType}`}
          maxWidth="lg"
          footer={
            <div className="flex items-center justify-between w-full gap-3">
              <Button variant="outline" size="sm" onClick={() => setSelectedAppForDecision(null)}>
                Bekor qilish
              </Button>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<XCircle className="w-4 h-4 text-[#B91C1C]" />}
                  onClick={() => handleRejectDecision(selectedAppForDecision)}
                  className="border-[#B91C1C] text-[#B91C1C] hover:bg-[#FEF2F2] font-bold"
                >
                  Rad etish ({rejectReason})
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  leftIcon={<CheckCircle2 className="w-4 h-4" />}
                  onClick={() => handleApproveDecision(selectedAppForDecision)}
                  className="bg-[#2E7D4F] hover:bg-[#23653F] text-white font-bold"
                >
                  Tasdiqlash va Toʻlovga Chiqarish
                </Button>
              </div>
            </div>
          }
        >
          <div className="space-y-4 py-1 text-xs text-[#1A1F24]">
            <div className="p-3 bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl grid grid-cols-2 gap-2 text-[#5A646D]">
              <div>Maydon: <b className="text-[#1A1F24] font-mono">{selectedAppForDecision.areaHa} ga</b></div>
              <div>Hisoblangan summa: <b className="text-[#2E7D4F] font-mono">{selectedAppForDecision.amount}</b></div>
              <div>Kontur: <b className="text-[#1A1F24]">{selectedAppForDecision.contour}</b></div>
              <div>Chorva: <b className="text-[#1A1F24]">{selectedAppForDecision.livestock}</b></div>
            </div>

            <div className="space-y-2">
              <span className="font-bold block">Ekspertiza Xulosalari:</span>
              <div className="p-3 bg-[#F0F7F1] border border-[#D9EBDC] rounded-xl text-[#2E7D4F] space-y-1">
                <div>✓ <b>Masʼul xodim:</b> {selectedAppForDecision.staffConclusion}</div>
                <div>✓ <b>GIS ekspertizasi:</b> {selectedAppForDecision.gisConclusion}</div>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-[#E4E7EA]">
              <label className="font-bold text-[#B91C1C] block">Rad etilgan taqdirda sababi (TZ Klassifikatori RJ-01..15):</label>
              <select
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="w-full bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl px-3 py-2 text-xs font-semibold text-[#1A1F24] focus:outline-none focus:border-[#B91C1C]"
              >
                <option value="RJ-01">RJ-01: Hujjatlar toʻliq emas yoki talabga javob bermaydi</option>
                <option value="RJ-02">RJ-02: Arizachi maʼlumotlari notoʻgʻri yoki tasdiqlanmadi</option>
                <option value="RJ-03">RJ-03: Tanlangan maydon oʻrmon fondi chegarasidan tashqarida</option>
                <option value="RJ-04">RJ-04: Maydon boshqa amaldagi ruxsatnoma bilan band</option>
                <option value="RJ-05">RJ-05: Yuklama belgilangan normadan oshgan (MaxSB yetarli emas)</option>
                <option value="RJ-08">RJ-08: Maydon muhofaza yoki taqiqlangan zonada joylashgan</option>
              </select>
            </div>
          </div>
        </Modal>
      )}

      {/* E-IMZO Signing Modal */}
      {isSignModalOpen && selectedPermitForSign && (
        <Modal
          isOpen={isSignModalOpen}
          onClose={() => setIsSignModalOpen(false)}
          title="Ruxsatnomani E-IMZO Bilan Imzolash va Chiqarish"
          subtitle={`Ruxsatnoma: ${selectedPermitForSign.id} · ${selectedPermitForSign.applicantName}`}
          maxWidth="md"
          footer={
            <div className="flex items-center justify-between w-full gap-3">
              <Button variant="outline" size="sm" onClick={() => setIsSignModalOpen(false)}>
                Bekor qilish
              </Button>
              <Button
                variant="primary"
                size="sm"
                isLoading={isSigning}
                leftIcon={<KeyRound className="w-4 h-4" />}
                onClick={handleSignPermitWithEimzo}
                className="bg-[#2E7D4F] hover:bg-[#23653F] text-white font-bold"
              >
                E-IMZO Bilan Imzolash
              </Button>
            </div>
          }
        >
          <div className="space-y-4 py-1 text-xs text-[#1A1F24]">
            <div className="p-4 bg-[#F0F7F1] border border-[#D9EBDC] rounded-2xl text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-white text-[#2E7D4F] border border-[#D9EBDC] flex items-center justify-center mx-auto shadow-xs">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div className="font-bold text-sm text-[#1A1F24]">Elektron Raqamli Imzo Kaliti</div>
              <p className="text-[#5A646D] text-[11px]">
                Sertifikat egasi: <b>Mirzayev Dilshod Akramovich</b> (Boʻstonliq DЎX Direktori)
              </p>
              <div className="font-mono text-[11px] text-[#2E7D4F] font-bold">
                SERIAL: 67F8-4A12-B902-88E1
              </div>
            </div>

            <div className="p-3 bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl space-y-1 text-[#5A646D]">
              <div className="flex justify-between">
                <span>Toʻlangan summa:</span>
                <b className="text-[#2E7D4F] font-mono">{selectedPermitForSign.sumPaid}</b>
              </div>
              <div className="flex justify-between">
                <span>Amal qilish muddati:</span>
                <b className="text-[#1A1F24] font-mono">{selectedPermitForSign.period}</b>
              </div>
              <div className="flex justify-between">
                <span>Uchastka:</span>
                <b className="text-[#1A1F24]">{selectedPermitForSign.contour}</b>
              </div>
            </div>

            <div className="p-2.5 bg-[#EFF6FF] border border-[#BFDBFE] rounded-xl text-[#1D4ED8] flex items-start gap-2 text-[11px]">
              <Sparkles className="w-4 h-4 shrink-0 mt-0.5" />
              <span>Imzolangandan soʻng QR-kodli elektron ruxsatnoma avtomatik tarzda PDF shaklida shakllantiriladi va my.gov.uz orqali arizachiga yuboriladi.</span>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ExecutorHeadDashboardPage;
