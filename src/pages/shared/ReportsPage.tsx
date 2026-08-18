import React, { useState } from 'react';
import {
  Download,
  Plus,
  Search,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Building2,
  Send,
  FileSpreadsheet,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { hasRight } from '../../lib/permissions';
import { Input } from '../../components/ui/FormControls';
import { Tabs } from '../../components/ui/Navigation';
import { Modal } from '../../components/ui/Overlay';

export interface ReportsPageProps {
  onNavigate?: (page: string, params?: any) => void;
  userRole?: string;
}

export interface ReportItem {
  id: string;
  code: string;
  title: string;
  organization: string;
  region: string;
  period: string;
  deadline: string;
  submittedDate: string;
  author: string;
  /** "draft" is the «Создана» state of TZ 4.2.6.1 — filled in but not yet sent. */
  status: 'draft' | 'submitted' | 'approved' | 'returned' | 'overdue';
  returnReason?: string;
  /** Editing a form is limited to its author while it is still a draft (TZ 4.2.6.2). */
  isOwn?: boolean;
}

export const ReportsPage: React.FC<ReportsPageProps> = ({ userRole = '' }) => {
  /**
   * TZ appendix 4 splits this page three ways:
   *   Т — accept and return an incoming report, and publish a new form: central apparatus
   *   Я, Ў — fill a form in and correct one's own draft: staff of the executing
   *          organisation and the accountant
   *   К, Э — everyone else who reaches the page
   * Controls outside the role's rights are not rendered at all (TZ 4.1.7).
   */
  const canManageReports = hasRight(userRole, 'report', 'approve');
  const canFillReports = hasRight(userRole, 'report', 'create');
  const canEditOwnDraft = hasRight(userRole, 'report', 'edit');
  /** Publishing a form and setting its deadline is Я — the central apparatus only. */
  const canPublishForms = hasRight(userRole, 'report', 'create') && hasRight(userRole, 'report', 'approve');

  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrgFilter, setSelectedOrgFilter] = useState('all');

  const [selectedReportForReturn, setSelectedReportForReturn] = useState<ReportItem | null>(null);
  const [returnNote, setReturnNote] = useState('');
  const [selectedReportDetail, setSelectedReportDetail] = useState<ReportItem | null>(null);
  const [isAddFormModalOpen, setIsAddFormModalOpen] = useState(false);

  // Fill-in flow — TZ 4.2.6.1 and 4.2.6.2
  const [draftBeingEdited, setDraftBeingEdited] = useState<ReportItem | null>(null);
  const [isFillModalOpen, setIsFillModalOpen] = useState(false);
  const [fillTitle, setFillTitle] = useState('');
  const [fillPeriod, setFillPeriod] = useState('2026 III-Kvartal');
  const [fillArea, setFillArea] = useState('');
  const [fillLivestock, setFillLivestock] = useState('');
  const [fillRevenue, setFillRevenue] = useState('');
  const [fillNote, setFillNote] = useState('');
  const [fillError, setFillError] = useState<string | null>(null);

  // Mock reports list based on TZ 4.2.6 requirements
  const [reportsList, setReportsList] = useState<ReportItem[]>([
    {
      id: '1',
      code: 'REP-2026-Q2-014',
      title: 'Yaylovlar va chorva mollaridan foydalanish boʻyicha II kvartal hisoboti',
      organization: 'Boʻstonliq DЎX',
      region: 'tashkent',
      period: '2026 II-Kvartal',
      deadline: '15.07.2026',
      submittedDate: '12.07.2026',
      author: 'Rahimov J.U.',
      status: 'submitted',
    },
    {
      id: '2',
      code: 'REP-2026-Q2-015',
      title: 'Ruxsatnomalar tushumlari va 50/50 taqsimoti boʻyicha hisobot',
      organization: 'Kitob baland togʻ DЎX',
      region: 'kashkadarya',
      period: '2026 II-Kvartal',
      deadline: '15.07.2026',
      submittedDate: '10.07.2026',
      author: 'Mirzayev D.A.',
      status: 'approved',
    },
    {
      id: '3',
      code: 'REP-2026-Q2-019',
      title: 'Oʻrmon fondi konturlari bandligi (Occupancy) va meʼyori hisoboti',
      organization: 'Zomin DЎX',
      region: 'jizzakh',
      period: '2026 II-Kvartal',
      deadline: '15.07.2026',
      submittedDate: '14.07.2026',
      author: 'Yusupov B.M.',
      status: 'returned',
      returnReason: '4-kontur boʻyicha chorva bosh soni normasi (SLA) qayta hisoblanmagan.',
    },
    {
      id: '4',
      code: 'REP-2026-Q2-022',
      title: 'DЎX hududida oʻtkazilgan inspeksiya aktlari va dalolatnomalari yigʻma hisoboti',
      organization: 'Pop DЎX',
      region: 'namangan',
      period: '2026 II-Kvartal',
      deadline: '10.07.2026',
      submittedDate: '—',
      author: 'Oripov S.K.',
      status: 'overdue',
    },
    {
      id: '5',
      code: 'REP-2026-Q2-028',
      title: 'Asalarichilik va in qoʻyish uchastkalari monitoringi hisoboti',
      organization: 'Oqdaryo DЎX',
      region: 'samarkand',
      period: '2026 II-Kvartal',
      deadline: '15.07.2026',
      submittedDate: '11.07.2026',
      author: 'Sodiqov U.T.',
      status: 'approved',
    },
    {
      id: '6',
      code: 'REP-2026-Q2-031',
      title: 'Oʻtin va shox-shabba yigʻish boʻyicha berilgan ruxsatnomalar hisobi',
      organization: 'Burchmulla DЎX',
      region: 'tashkent',
      period: '2026 II-Kvartal',
      deadline: '15.07.2026',
      submittedDate: '13.07.2026',
      author: 'Abdullayev A.N.',
      status: 'submitted',
    },
  ]);

  const openFillForm = (draft?: ReportItem) => {
    setDraftBeingEdited(draft ?? null);
    setFillTitle(draft?.title ?? '');
    setFillPeriod(draft?.period ?? '2026 III-Kvartal');
    setFillArea('');
    setFillLivestock('');
    setFillRevenue('');
    setFillNote('');
    setFillError(null);
    setIsFillModalOpen(true);
  };

  /** TZ 4.2.6.1: a filled-in form is saved and takes the «Created» state. */
  const handleSaveDraft = () => {
    if (!fillTitle.trim()) {
      setFillError('Hisobot nomi kiritilishi shart.');
      return;
    }
    if (!fillArea.trim() || !fillLivestock.trim() || !fillRevenue.trim()) {
      setFillError('Barcha majburiy maydonlar toʻldirilishi kerak.');
      return;
    }

    if (draftBeingEdited) {
      setReportsList((prev) =>
        prev.map((r) =>
          r.id === draftBeingEdited.id ? { ...r, title: fillTitle.trim(), period: fillPeriod } : r
        )
      );
    } else {
      setReportsList((prev) => [
        {
          id: `d-${prev.length + 1}`,
          code: `REP-2026-Q3-${String(prev.length + 40).padStart(3, '0')}`,
          title: fillTitle.trim(),
          organization: 'Boʻstonliq DЎX',
          region: 'tashkent',
          period: fillPeriod,
          deadline: '15.10.2026',
          submittedDate: '—',
          author: 'Rahimov J.U.',
          status: 'draft',
          isOwn: true,
        },
        ...prev,
      ]);
    }
    setIsFillModalOpen(false);
  };

  /** A draft leaves the author's hands and becomes an incoming report. */
  const handleSubmitDraft = (id: string) => {
    setReportsList((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, status: 'submitted' as const, submittedDate: new Date().toLocaleDateString('ru-RU') }
          : r
      )
    );
  };

  // Actions
  const handleApproveReport = (id: string) => {
    setReportsList((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'approved' as const } : r))
    );
    alert('Hisobot qabul qilindi va tasdiqlandi.');
  };

  const handleConfirmReturnReport = () => {
    if (!selectedReportForReturn) return;
    if (!returnNote.trim()) {
      alert('Qaytarish sababini yozing.');
      return;
    }
    setReportsList((prev) =>
      prev.map((r) =>
        r.id === selectedReportForReturn.id
          ? { ...r, status: 'returned' as const, returnReason: returnNote }
          : r
      )
    );
    alert(`Hisobot (${selectedReportForReturn.code}) DЎXga qaytarildi.`);
    setSelectedReportForReturn(null);
    setReturnNote('');
  };

  // Filtered reports
  const filteredReports = reportsList.filter((r) => {
    if (activeTab === 'submitted' && r.status !== 'submitted') return false;
    if (activeTab === 'approved' && r.status !== 'approved') return false;
    if (activeTab === 'returned' && r.status !== 'returned') return false;
    if (activeTab === 'overdue' && r.status !== 'overdue') return false;
    if (activeTab === 'draft' && r.status !== 'draft') return false;
    // Drafts belong to their author until submitted, so they stay out of the other tabs.
    if (activeTab !== 'draft' && r.status === 'draft' && !canFillReports) return false;
    if (selectedOrgFilter !== 'all' && r.region !== selectedOrgFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        r.code.toLowerCase().includes(q) ||
        r.title.toLowerCase().includes(q) ||
        r.organization.toLowerCase().includes(q) ||
        r.author.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  // Status counters
  const totalCount = reportsList.length;
  const draftCount = reportsList.filter((r) => r.status === 'draft').length;
  const submittedCount = reportsList.filter((r) => r.status === 'submitted').length;
  const approvedCount = reportsList.filter((r) => r.status === 'approved').length;
  const returnedCount = reportsList.filter((r) => r.status === 'returned').length;
  const overdueCount = reportsList.filter((r) => r.status === 'overdue').length;

  return (
    <div className="space-y-6 font-sans pb-16">
      {/* 1. Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E4E7EA] pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#2E7D4F] bg-[#F0F7F1] px-2.5 py-1 rounded border border-[#D9EBDC]">
            Hisobotlar subtizimi (4.2.6)
          </span>
          <h1 className="text-lg md:text-xl font-bold text-[#1A1F24] mt-1.5">
            Hisobotlar va Formalar
          </h1>
          <p className="text-xs text-[#5A646D] mt-0.5">
            Hududiy oʻrmon xoʻjaliklaridan (DЎX) keladigan davriy hisobotlarni qabul qilish, tekshirish, qaytarish va topshirish muddatlarini belgilash
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Download className="w-4 h-4 text-[#15803D]" />}
            onClick={() => alert('Hisobotlar yigʻmasi Excel formatida tayyorlanmoqda.')}
            className="border-[#767F87] text-[#1A1F24] hover:bg-[#F8F9FA] font-bold text-xs h-9 cursor-pointer"
          >
            Excelga eksport
          </Button>

          {canFillReports && !canManageReports && (
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={() => openFillForm()}
              className="bg-[#2E7D4F] hover:bg-[#23653F] text-white font-bold text-xs h-9 cursor-pointer shadow-xs"
            >
              Hisobot toʻldirish
            </Button>
          )}

          {canPublishForms && (
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={() => setIsAddFormModalOpen(true)}
              className="bg-[#2E7D4F] hover:bg-[#23653F] text-white font-bold text-xs h-9 cursor-pointer shadow-xs"
            >
              Yangi hisobot formasi
            </Button>
          )}
        </div>
      </div>

      {/* 2. Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E4E7EA] rounded-2xl p-4 shadow-xs space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#5A646D]">Jami DЎX Hisobotlari</span>
          <div className="text-xl font-bold text-[#1A1F24] font-mono">{totalCount} ta Form</div>
          <div className="text-xs text-[#15803D] font-medium">84 ta DЎX dan 78 tasi kelib tushgan</div>
        </div>

        <div className="bg-white border border-[#E4E7EA] rounded-2xl p-4 shadow-xs space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#5A646D]">Qabul Qilingan (Принятые)</span>
          <div className="text-xl font-bold text-[#15803D] font-mono">{approvedCount} ta</div>
          <div className="text-xs text-[#5A646D]">Tekshirilgan va tasdiqlangan</div>
        </div>

        <div className="bg-white border border-[#E4E7EA] rounded-2xl p-4 shadow-xs space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#5A646D]">Qaytarilgan</span>
          <div className="text-xl font-bold text-[#B45309] font-mono">{returnedCount} ta</div>
          <div className="text-xs text-[#B45309] font-medium">Xatolik sabab DЎXga qaytarilgan</div>
        </div>

        <div className="bg-white border border-[#E4E7EA] rounded-2xl p-4 shadow-xs space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#5A646D]">Muddati Oʻtgan (Просрочено)</span>
          <div className="text-xl font-bold text-[#B91C1C] font-mono">{overdueCount} ta DЎX</div>
          <div className="text-xs text-[#B91C1C] font-medium">SLA topshirish muddati oʻtgan</div>
        </div>
      </div>

      {/* 3. Status tabs and filters — TZ 4.2.6.8 */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-4 shadow-xs space-y-4">
        {/* Full Width Tabs */}
        <div className="border-b border-[#E4E7EA] pb-2">
          <Tabs
            tabs={[
              { id: 'all', label: 'Barchasi', count: totalCount },
              { id: 'submitted', label: 'Kelib tushgan', count: submittedCount },
              { id: 'approved', label: 'Qabul qilingan', count: approvedCount },
              { id: 'returned', label: 'Qaytarilgan', count: returnedCount },
              { id: 'overdue', label: 'Muddati oʻtgan', count: overdueCount },
              ...(canFillReports ? [{ id: 'draft', label: 'Qoralamalar', count: draftCount }] : []),
            ]}
            activeTabId={activeTab}
            onChange={setActiveTab}
          />
        </div>

        {/* Dedicated Filters Control Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-bold text-[#5A646D] uppercase tracking-wider whitespace-nowrap">
              Hudud:
            </span>
            <select
              value={selectedOrgFilter}
              onChange={(e) => setSelectedOrgFilter(e.target.value)}
              className="h-9 px-3 text-xs bg-[#F8F9FA] border border-[#767F87] rounded-lg text-[#1A1F24] font-medium focus:ring-2 focus:ring-[#2E7D4F] focus:outline-none w-full sm:w-64"
            >
              <option value="all">Respublika — Barcha DЎXlar</option>
              <option value="tashkent">Toshkent viloyati DЎXlari</option>
              <option value="kashkadarya">Qashqadaryo viloyati DЎXlari</option>
              <option value="jizzakh">Jizzax viloyati DЎXlari</option>
              <option value="namangan">Namangan viloyati DЎXlari</option>
              <option value="samarkand">Samarqand viloyati DЎXlari</option>
            </select>
          </div>

          <div className="w-full sm:w-72">
            <Input
              placeholder="Hisobot kodi, DЎX yoki muallif..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-4 h-4 text-[#9AA3AB]" />}
            />
          </div>
        </div>
      </div>

      {/* 4. Reports Table View */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8F9FA] border-b border-[#E4E7EA] text-[#5A646D] font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Hisobot Kodi & Nomi</th>
                <th className="py-3.5 px-4">Tashkilot (DЎX)</th>
                <th className="py-3.5 px-4">Davr</th>
                <th className="py-3.5 px-4">Topshirish Muddati</th>
                <th className="py-3.5 px-4">Yuborilgan Sana</th>
                <th className="py-3.5 px-4">Holati (Status)</th>
                <th className="py-3.5 px-4 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E7EA]">
              {filteredReports.map((r) => (
                <tr key={r.id} className="hover:bg-[#F8F9FA]/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-mono font-bold text-[#2E7D4F] flex items-center gap-1.5">
                      <FileSpreadsheet className="w-4 h-4 shrink-0 text-[#2E7D4F]" />
                      <span>{r.code}</span>
                    </div>
                    <div className="font-medium text-[#1A1F24] mt-0.5 max-w-md line-clamp-1">{r.title}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-[#1A1F24] flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-[#5A646D]" />
                      <span>{r.organization}</span>
                    </div>
                    <div className="text-[11px] text-[#5A646D]">Mas'ul: {r.author}</div>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-[#1A1F24] whitespace-nowrap">
                    {r.period}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-[#1A1F24] whitespace-nowrap">
                    {r.deadline}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[#5A646D] whitespace-nowrap">
                    {r.submittedDate}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {r.status === 'draft' && (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#F8F9FA] text-[#5A646D] border border-[#E4E7EA] inline-flex items-center gap-1">
                        <FileSpreadsheet className="w-3 h-3" /> Qoralama
                      </span>
                    )}
                    {r.status === 'submitted' && (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200 inline-flex items-center gap-1">
                        <Send className="w-3 h-3" /> Kelib tushgan
                      </span>
                    )}
                    {r.status === 'approved' && (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#F0F7F1] text-[#2E7D4F] border border-[#D9EBDC] inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Qabul qilingan
                      </span>
                    )}
                    {r.status === 'returned' && (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A] inline-flex items-center gap-1" title={r.returnReason}>
                        <RotateCcw className="w-3 h-3" /> Qaytarilgan
                      </span>
                    )}
                    {r.status === 'overdue' && (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#FEF2F2] text-[#B91C1C] border border-[#FCA5A5] inline-flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> Muddati oʻtgan
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedReportDetail(r)}
                      className="border-[#767F87] text-[#1A1F24] font-bold hover:bg-[#F8F9FA]"
                    >
                      Koʻrish
                    </Button>

                    {canEditOwnDraft && r.status === 'draft' && r.isOwn && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openFillForm(r)}
                          className="border-[#767F87] text-[#1A1F24] font-bold hover:bg-[#F8F9FA]"
                        >
                          Tahrirlash
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleSubmitDraft(r.id)}
                          className="bg-[#2E7D4F] hover:bg-[#23653F] text-white font-bold"
                        >
                          Topshirish
                        </Button>
                      </>
                    )}

                    {canManageReports && r.status === 'submitted' && (
                      <>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleApproveReport(r.id)}
                          className="bg-[#2E7D4F] hover:bg-[#23653F] text-white font-bold"
                        >
                          Qabul qilish
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedReportForReturn(r)}
                          className="border-[#B45309] text-[#B45309] hover:bg-[#FFFBEB] font-bold"
                        >
                          Qaytarish
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Return report modal */}
      {selectedReportForReturn && (
        <Modal
          isOpen={!!selectedReportForReturn}
          onClose={() => setSelectedReportForReturn(null)}
          title={`Hisobotni qaytarish — ${selectedReportForReturn.code}`}
          subtitle={`${selectedReportForReturn.organization} tomoniga xatolik sababini yuborish`}
          footer={
            <div className="flex items-center justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedReportForReturn(null)}>
                Bekor qilish
              </Button>
              <Button variant="primary" size="sm" onClick={handleConfirmReturnReport} className="bg-[#B45309] hover:bg-[#92400E] text-white font-bold">
                Qaytarish va Izoh Yuborish
              </Button>
            </div>
          }
        >
          <div className="space-y-4 py-2">
            <div className="p-3 bg-[#FFFBEB] border border-[#FDE68A] rounded-xl text-xs text-[#B45309] font-medium">
              Hisobot DЎXga qaytarilgach, u qayta koʻrib chiqish va xatolarni tuzatish rejimiga oʻtadi.
            </div>
            <div>
              <label className="text-xs font-bold text-[#5A646D] block mb-1">Qaytarish sababi va koʻrsatmalar (kamchiliklar):</label>
              <textarea
                rows={4}
                value={returnNote}
                onChange={(e) => setReturnNote(e.target.value)}
                placeholder="Hisobotdagi xatoliklar, yetishmayotgan raqamlar va tuzatish koʻrsatmalari..."
                className="w-full p-3 text-xs border border-[#767F87] rounded-xl focus:ring-2 focus:ring-[#2E7D4F] focus:outline-none"
              />
            </div>
          </div>
        </Modal>
      )}

      {/* 6. View Report Detail Modal */}
      {selectedReportDetail && (
        <Modal
          isOpen={!!selectedReportDetail}
          onClose={() => setSelectedReportDetail(null)}
          title={`Hisobot ma'lumotlari: ${selectedReportDetail.code}`}
          subtitle={selectedReportDetail.title}
          footer={
            <Button variant="primary" size="sm" onClick={() => setSelectedReportDetail(null)}>
              Yopish
            </Button>
          }
        >
          <div className="space-y-4 py-2 text-xs">
            <div className="grid grid-cols-2 gap-3 p-3 bg-[#F8F9FA] rounded-xl border border-[#E4E7EA]">
              <div><span className="text-[#5A646D]">Tashkilot:</span> <b>{selectedReportDetail.organization}</b></div>
              <div><span className="text-[#5A646D]">Davr:</span> <b>{selectedReportDetail.period}</b></div>
              <div><span className="text-[#5A646D]">Topshirish muddati:</span> <b>{selectedReportDetail.deadline}</b></div>
              <div><span className="text-[#5A646D]">Mas'ul xodim:</span> <b>{selectedReportDetail.author}</b></div>
            </div>

            {selectedReportDetail.returnReason && (
              <div className="p-3 bg-[#FFFBEB] border border-[#FDE68A] rounded-xl text-[#B45309]">
                <b>Qaytarish sababi:</b> {selectedReportDetail.returnReason}
              </div>
            )}

            <div className="p-4 border border-[#E4E7EA] rounded-xl space-y-2">
              <div className="font-bold text-[#1A1F24]">Hisobot mazmuni:</div>
              <p className="text-[#5A646D] leading-relaxed">
                Ushbu hisobot {selectedReportDetail.organization} boʻyicha belgilangan davr oraligʻida yer uchastkalaridan foydalanish, ruxsatnomalar statistikasi hamda tushumlar sverkasi ma'lumotlarini oʻz ichiga oladi.
              </p>
            </div>
          </div>
        </Modal>
      )}

      {/* 7. Fill in a report form — TZ 4.2.6.1 (create) and 4.2.6.2 (edit own draft) */}
      <Modal
        isOpen={isFillModalOpen}
        onClose={() => setIsFillModalOpen(false)}
        title={draftBeingEdited ? `Qoralamani tahrirlash — ${draftBeingEdited.code}` : 'Hisobotni toʻldirish'}
        subtitle="Barcha majburiy maydonlar toʻldirilgach forma «Qoralama» holatida saqlanadi"
        maxWidth="lg"
        footer={
          <div className="flex items-center justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsFillModalOpen(false)}>
              Bekor qilish
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSaveDraft}
              className="bg-[#2E7D4F] hover:bg-[#23653F] text-white font-bold"
            >
              Qoralama sifatida saqlash
            </Button>
          </div>
        }
      >
        <div className="space-y-4 py-1 text-xs">
          {fillError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 font-semibold flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" /> {fillError}
            </div>
          )}

          <div className="space-y-1">
            <label className="font-bold text-[#1A1F24]">Hisobot nomi:</label>
            <Input
              placeholder="Masalan: III kvartal yaylovlardan foydalanish hisoboti"
              value={fillTitle}
              onChange={(e) => { setFillTitle(e.target.value); setFillError(null); }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-[#1A1F24]">Hisobot davri:</label>
              <select
                value={fillPeriod}
                onChange={(e) => setFillPeriod(e.target.value)}
                className="w-full bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-sm p-3 text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
              >
                <option>2026 I-Kvartal</option>
                <option>2026 II-Kvartal</option>
                <option>2026 III-Kvartal</option>
                <option>2026 IV-Kvartal</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="font-bold text-[#1A1F24]">Tashkilot:</label>
              <Input value="Boʻstonliq DЎX" readOnly className="bg-[#F8F9FA]" />
            </div>
          </div>

          <div className="p-3 bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl space-y-3">
            <span className="font-bold text-[#1A1F24] block">Hisobot koʻrsatkichlari (majburiy):</span>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-[#5A646D]">Foydalanilgan maydon (ga):</label>
                <Input
                  placeholder="1 240"
                  value={fillArea}
                  onChange={(e) => { setFillArea(e.target.value); setFillError(null); }}
                  className="font-mono"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-[#5A646D]">Chorva bosh soni:</label>
                <Input
                  placeholder="860"
                  value={fillLivestock}
                  onChange={(e) => { setFillLivestock(e.target.value); setFillError(null); }}
                  className="font-mono"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-[#5A646D]">Tushum (soʻm):</label>
                <Input
                  placeholder="18 400 000"
                  value={fillRevenue}
                  onChange={(e) => { setFillRevenue(e.target.value); setFillError(null); }}
                  className="font-mono"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-[#1A1F24]">Izoh (ixtiyoriy):</label>
            <textarea
              rows={3}
              value={fillNote}
              onChange={(e) => setFillNote(e.target.value)}
              placeholder="Hisobot boʻyicha qoʻshimcha maʼlumot..."
              className="w-full bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-xs p-3 text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
            />
          </div>

          <div className="p-3 bg-[#F0F7F1] border border-[#D9EBDC] rounded-xl text-[11px] text-[#2E7D4F]">
            Saqlangan forma <b>«Qoralama»</b> holatida qoladi va uni faqat siz tahrirlay olasiz.
            «Topshirish» bosilgach forma markaziy apparatga yuboriladi va tahrirlash yopiladi.
          </div>
        </div>
      </Modal>

      {/* 8. New report form modal — TZ 4.2.6.1 and 4.2.6.5 */}
      {isAddFormModalOpen && (
        <Modal
          isOpen={isAddFormModalOpen}
          onClose={() => setIsAddFormModalOpen(false)}
          title="Yangi hisobot formasi va topshirish muddati"
          subtitle="Respublika DЎXlari uchun yangi davriy hisobot shaklini e'lon qilish"
          footer={
            <div className="flex items-center justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsAddFormModalOpen(false)}>
                Bekor qilish
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  alert("Yangi hisobot shakli eʼlon qilindi va DЎXlarga yuborildi.");
                  setIsAddFormModalOpen(false);
                }}
                className="bg-[#2E7D4F] hover:bg-[#23653F] text-white font-bold"
              >
                E'lon qilish va Yuborish
              </Button>
            </div>
          }
        >
          <div className="space-y-4 py-2 text-xs">
            <div>
              <label className="font-bold text-[#5A646D] block mb-1">Hisobot Nomi:</label>
              <Input placeholder="Masalan: III Kvartal oʻrmon mahsulotlari va tushumlar hisoboti" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-[#5A646D] block mb-1">Hisobot Davri:</label>
                <Input placeholder="2026 III-Kvartal" />
              </div>
              <div>
                <label className="font-bold text-[#5A646D] block mb-1">Topshirish Deadline Muddati:</label>
                <Input type="date" />
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
