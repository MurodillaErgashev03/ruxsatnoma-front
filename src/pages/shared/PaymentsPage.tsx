import React, { useState } from 'react';
import {
  Upload,
  Download,
  CreditCard,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Calculator,
  Plus,
  RefreshCw,
  Search,
  Building2,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  Info,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { hasRight } from '../../lib/permissions';
import { DataTable, type Column } from '../../components/ui/DataTable';
import { Modal } from '../../components/ui/Overlay';

export interface PaymentsPageProps {
  userRole?: string;
  onNavigate?: (page: string, params?: any) => void;
}

export interface BankTransactionItem {
  id: string;
  txHash: string;
  permitNo: string;
  applicantName: string;
  provider: 'Click' | 'Payme' | 'Uzum' | 'Bank Transfer' | 'Munis';
  amount: string;
  amountNum: number;
  forestryFund50: string;
  stateBudget50: string;
  matchedStatus: 'matched' | 'discrepancy' | 'manual';
  date: string;
}

export interface RefundItem {
  id: string;
  permitNo: string;
  applicantName: string;
  totalPaid: number;
  paidPeriodDays: number;
  unusedDays: number;
  refundAmount: number;
  legalBasis: string;
  status: 'pending_approval' | 'completed' | 'rejected';
  requestedAt: string;
  makerChecker: string;
  riIndicator?: string;
}

export const PaymentsPage: React.FC<PaymentsPageProps> = ({ userRole = '' }) => {
  const isAccountant = hasRight(userRole, 'payment', 'edit');
  const [activeTab, setActiveTab] = useState<'reconciliation' | 'refunds' | 'invoices'>('reconciliation');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals state
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Refund Form State (VMQ 278-son 9-11 bandlari)
  const [refundPermitNo, setRefundPermitNo] = useState('RX-2026-0089');
  const [refundApplicant, setRefundApplicant] = useState('«Burchmulla Agro» MCHJ');
  const [paidAmount, setPaidAmount] = useState<number>(4100000);
  const [totalPeriodDays, setTotalPeriodDays] = useState<number>(365);
  const [unusedPeriodDays, setUnusedPeriodDays] = useState<number>(240);
  const [refundLegalBasis, setRefundLegalBasis] = useState('VMQ 278-son 9-bandi (Foydalanish muddatidan oldin toʻxtatilganda)');

  // Formula: Refund = Paid * unused_eligible_period / paid_period
  const calculatedRefund = Math.floor((paidAmount * unusedPeriodDays) / totalPeriodDays);

  const [transactions, setTransactions] = useState<BankTransactionItem[]>([
    {
      id: 'TX-901',
      txHash: 'MNS-9081234',
      permitNo: 'RX-2026-0089',
      applicantName: '«Burchmulla Agro» MCHJ',
      provider: 'Munis',
      amount: '4,100,000 UZS',
      amountNum: 4100000,
      forestryFund50: '2,050,000 UZS',
      stateBudget50: '2,050,000 UZS',
      matchedStatus: 'matched',
      date: '10.08.2026 14:31',
    },
    {
      id: 'TX-902',
      txHash: 'PAY-4019284',
      permitNo: 'RX-2026-0090',
      applicantName: 'Karimov Aziz Botirovich',
      provider: 'Payme',
      amount: '1,207,325 UZS',
      amountNum: 1207325,
      forestryFund50: '603,662.50 UZS',
      stateBudget50: '603,662.50 UZS',
      matchedStatus: 'matched',
      date: '09.08.2026 11:20',
    },
    {
      id: 'TX-903',
      txHash: 'BNK-7712049',
      permitNo: 'RX-2026-0095',
      applicantName: '«Chorva Servis» MCHJ',
      provider: 'Bank Transfer',
      amount: '3,400,000 UZS',
      amountNum: 3400000,
      forestryFund50: '1,700,000 UZS',
      stateBudget50: '1,700,000 UZS',
      matchedStatus: 'manual',
      date: '08.08.2026 16:00',
    },
    {
      id: 'TX-904',
      txHash: 'CLK-1182741',
      permitNo: 'RX-2026-0092',
      applicantName: 'Saidov Otabek Shavkatovich',
      provider: 'Click',
      amount: '450,000 UZS',
      amountNum: 4500000,
      forestryFund50: '225,000 UZS',
      stateBudget50: '225,000 UZS',
      matchedStatus: 'matched',
      date: '07.08.2026 09:40',
    },
  ]);

  const [refunds, setRefunds] = useState<RefundItem[]>([
    {
      id: 'REF-2026-001',
      permitNo: 'RX-2026-0064',
      applicantName: '«Zomin Agro» MCHJ',
      totalPaid: 3600000,
      paidPeriodDays: 365,
      unusedDays: 180,
      refundAmount: 1775342,
      legalBasis: 'VMQ 278-son 10-bandi (Yongʻin xavfsizligi taqiqi sababli)',
      status: 'completed',
      requestedAt: '05.08.2026',
      makerChecker: 'Tasdiqlangan (Buxgalter Umarova M. + Direktor Mirzayev D.)',
    },
    {
      id: 'REF-2026-002',
      permitNo: 'RX-2026-0072',
      applicantName: 'Rahimov Jasur Umidovich',
      totalPaid: 1200000,
      paidPeriodDays: 180,
      unusedDays: 90,
      refundAmount: 600000,
      legalBasis: 'VMQ 278-son 9-bandi (Ruxsatnoma bekor qilinganda)',
      status: 'pending_approval',
      requestedAt: '10.08.2026',
      makerChecker: 'Tekshiruvda (Maker-Checker nazorati)',
    },
  ]);

  const handleSimulateBankUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setIsUploadModalOpen(false);
      setToastMessage('Bank koʻchirmasi (Gʻaznachilik 2026-08) muvaffaqiyatli yuklandi. 12 ta yangi tranzaksiya Munis billing hisobiga avtomatik solishtirildi!');
      setTimeout(() => setToastMessage(null), 4500);
    }, 1200);
  };

  const handleCreateRefund = () => {
    const newRefund: RefundItem = {
      id: `REF-2026-00${refunds.length + 1}`,
      permitNo: refundPermitNo,
      applicantName: refundApplicant,
      totalPaid: paidAmount,
      paidPeriodDays: totalPeriodDays,
      unusedDays: unusedPeriodDays,
      refundAmount: calculatedRefund,
      legalBasis: refundLegalBasis,
      status: 'pending_approval',
      requestedAt: new Date().toLocaleDateString('ru-RU'),
      makerChecker: 'Yuborildi (Rahbar tasdigʻi kutilmoqda)',
    };

    setRefunds((prev) => [newRefund, ...prev]);
    setIsRefundModalOpen(false);
    setToastMessage(`Qaytarish (Refund) arizasi ${newRefund.id} (${calculatedRefund.toLocaleString()} UZS) shakllantirildi va maker-checker nazoratiga yuborildi!`);
    setTimeout(() => setToastMessage(null), 4500);
  };

  const columns: Column<BankTransactionItem>[] = [
    { key: 'txHash', header: 'Tranzaksiya ID', sortable: true, width: '140px' },
    { key: 'permitNo', header: 'Ruxsatnoma №', sortable: true, width: '130px' },
    { key: 'applicantName', header: 'Arizachi / Tashkilot', sortable: true },
    { key: 'provider', header: 'Toʻlov Tizimi', sortable: true, width: '120px' },
    {
      key: 'amount',
      header: 'Jami Summa',
      sortable: true,
      width: '130px',
      accessor: (row) => <b className="font-mono text-[#123522]">{row.amount}</b>,
    },
    {
      key: 'forestryFund50',
      header: 'Oʻrmon Jamgʻarmasi (50%)',
      sortable: true,
      width: '170px',
      accessor: (row) => <span className="font-mono text-[#2E7D4F] font-semibold">{row.forestryFund50}</span>,
    },
    {
      key: 'stateBudget50',
      header: 'Davlat Byudjeti (50%)',
      sortable: true,
      width: '160px',
      accessor: (row) => <span className="font-mono text-[#0369A1] font-semibold">{row.stateBudget50}</span>,
    },
    {
      key: 'matchedStatus',
      header: 'Sverka Holati',
      sortable: true,
      width: '150px',
      accessor: (row) => (
        <span
          className={`px-2 py-0.5 rounded text-[11px] font-bold border ${
            row.matchedStatus === 'matched'
              ? 'bg-[#F0F7F1] text-[#2E7D4F] border-[#D9EBDC]'
              : row.matchedStatus === 'manual'
              ? 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]'
              : 'bg-[#FEF2F2] text-[#991B1B] border-[#FCA5A5]'
          }`}
        >
          {row.matchedStatus === 'matched' ? 'SOLISHTIRILDI' : 'QOʻLDA (RI-01)'}
        </span>
      ),
    },
  ];

  const totalRevenue = transactions.reduce((acc, t) => acc + t.amountNum, 0);
  const forestryShare = totalRevenue * 0.5;
  const budgetShare = totalRevenue * 0.5;

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-sans pb-16">
      {/* Toast Banner */}
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

      {/* Header Card */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2E7D4F] bg-[#F0F7F1] px-2.5 py-1 rounded border border-[#D9EBDC]">
              {isAccountant ? 'Moliya subtizimi (10.4 / VMQ 278)' : 'Toʻlovlar monitoringi (faqat koʻrish)'}
            </span>
            <span className="text-xs font-mono font-bold bg-[#E0F2FE] text-[#0369A1] px-2 py-0.5 rounded border border-[#BAE6FD]">
              TZ C19 / C20
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-[#1A1F24] mt-1.5">
            {isAccountant ? 'Moliya-Hisob va 50/50 Taqsimot Subtizimi' : 'Toʻlovlar va 50/50 Taqsimot Monitoringi'}
          </h1>
          <p className="text-xs text-[#5A646D] mt-0.5">
            Munis billing integratsiyasi, Gʻaznachilik solishtirmasi va VMQ 278-son boʻyicha qaytarish (refund) registri
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isAccountant ? (
            <>
              <Button
                variant="outline"
                size="sm"
                leftIcon={<RotateCcw className="w-4 h-4 text-[#B45309]" />}
                onClick={() => setIsRefundModalOpen(true)}
                className="text-xs font-bold border-[#FDE68A] text-[#B45309] hover:bg-[#FFFBEB]"
              >
                Qaytarish (Refund)
              </Button>
              <Button
                variant="primary"
                size="sm"
                leftIcon={<Upload className="w-4 h-4" />}
                onClick={() => setIsUploadModalOpen(true)}
                className="bg-[#2E7D4F] hover:bg-[#23653F] text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                Bank Koʻchirmasi Yuklash
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Download className="w-4 h-4" />}
              onClick={() => alert('Excel formati yuklab olindi.')}
            >
              Excelga eksport
            </Button>
          )}
        </div>
      </div>

      {/* Allocation Ledger 50/50 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-[#E4E7EA] p-5 rounded-2xl shadow-xs space-y-1">
          <span className="text-xs font-bold uppercase text-[#5A646D]">Jami Tushum (Solishtirilgan)</span>
          <div className="text-2xl font-bold text-[#1A1F24] font-mono">
            {totalRevenue.toLocaleString()} UZS
          </div>
          <span className="text-xs text-[#15803D] font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> 100% solishtirildi (Munis)
          </span>
        </div>

        <div className="bg-[#F0F7F1] border border-[#D9EBDC] p-5 rounded-2xl space-y-1">
          <span className="text-xs font-bold uppercase text-[#123522]">Oʻrmon Jamgʻarmasi Hissasi (50%)</span>
          <div className="text-2xl font-bold text-[#2E7D4F] font-mono">
            {forestryShare.toLocaleString()} UZS
          </div>
          <span className="text-xs text-[#2E7D4F]">Oʻrmonni rivojlantirish jamgʻarmasiga oʻtkazildi</span>
        </div>

        <div className="bg-[#E0F2FE] border border-[#BAE6FD] p-5 rounded-2xl space-y-1">
          <span className="text-xs font-bold uppercase text-[#0369A1]">Davlat Byudjeti Hissasi (50%)</span>
          <div className="text-2xl font-bold text-[#0284C7] font-mono">
            {budgetShare.toLocaleString()} UZS
          </div>
          <span className="text-xs text-[#0369A1]">Gʻaznachilik maxsus tranzit hisobiga taqsimlandi</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-[#E4E7EA] flex items-center gap-2">
        <button
          onClick={() => setActiveTab('reconciliation')}
          className={`px-4 py-2.5 text-xs font-bold transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
            activeTab === 'reconciliation'
              ? 'border-[#2E7D4F] text-[#2E7D4F] bg-white rounded-t-xl'
              : 'border-transparent text-[#5A646D] hover:text-[#1A1F24]'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Solishtirilgan Tranzaksiyalar (50/50 Ledger)</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-[#D9EBDC] text-[#2E7D4F]">
            {transactions.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('refunds')}
          className={`px-4 py-2.5 text-xs font-bold transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
            activeTab === 'refunds'
              ? 'border-[#B45309] text-[#B45309] bg-white rounded-t-xl'
              : 'border-transparent text-[#5A646D] hover:text-[#1A1F24]'
          }`}
        >
          <RotateCcw className="w-4 h-4" />
          <span>Qaytarishlar (Refund - VMQ 278)</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-[#FEF3C7] text-[#B45309]">
            {refunds.length}
          </span>
        </button>
      </div>

      {/* Tab 1: Reconciliation Table */}
      {activeTab === 'reconciliation' && (
        <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-[#1A1F24]">Solishtirilgan Bank Tranzaksiyalari Registri</h2>
              <p className="text-xs text-[#5A646D]">
                Gʻaznachilik va Munis toʻlov tizimi orqali kelib tushgan toʻlovlar hamda ularning 50/50 taqsimoti
              </p>
            </div>
          </div>

          <DataTable columns={columns} data={transactions} selectable />
        </div>
      )}

      {/* Tab 2: Refund Registry */}
      {activeTab === 'refunds' && (
        <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-[#1A1F24]">Mablagʻlarni Qaytarish (Refund) Registri (C20 Ssenariy)</h2>
              <p className="text-xs text-[#5A646D]">
                VMQ 278-son 9–11 bandlari asosida ishlatilmagan davr uchun pul mablagʻlarini arizachiga qaytarish
              </p>
            </div>
            {isAccountant && (
              <Button
                variant="primary"
                size="sm"
                leftIcon={<Plus className="w-4 h-4" />}
                onClick={() => setIsRefundModalOpen(true)}
                className="bg-[#2E7D4F] hover:bg-[#23653F] text-white text-xs font-bold"
              >
                Yangi Qaytarish Shakllantirish
              </Button>
            )}
          </div>

          {/* Refund Formula Box */}
          <div className="p-4 bg-[#FFFBEB] border border-[#FDE68A] rounded-xl text-xs space-y-1 font-mono text-[#92400E]">
            <div className="font-bold">
              Formula: Refund = Toʻlangan summa × (Ishlatilmagan kunlar / Jami ruxsatnoma muddati)
            </div>
            <div className="text-[11px] text-[#B45309] font-sans">
              * Qonuniy asossiz qaytarish urinishlari tizimda `RI-11` xavf indikatorini vujudga keltiradi va maker-checker nazoratidan oʻtadi.
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-[#F8F9FA] border-b border-[#E4E7EA]">
                <tr>
                  <th className="p-3 font-semibold text-[#5A646D]">Refund ID</th>
                  <th className="p-3 font-semibold text-[#5A646D]">Ruxsatnoma №</th>
                  <th className="p-3 font-semibold text-[#5A646D]">Arizachi</th>
                  <th className="p-3 font-semibold text-[#5A646D]">Toʻlangan / Qoldiq kun</th>
                  <th className="p-3 font-semibold text-[#5A646D]">Qaytariladigan Summa</th>
                  <th className="p-3 font-semibold text-[#5A646D]">Huquqiy Asos</th>
                  <th className="p-3 font-semibold text-[#5A646D]">Maker-Checker Nazorati</th>
                  <th className="p-3 font-semibold text-[#5A646D]">Holati</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4E7EA]">
                {refunds.map((ref) => (
                  <tr key={ref.id} className="hover:bg-[#F8F9FA]">
                    <td className="p-3 font-mono font-bold text-[#B45309]">{ref.id}</td>
                    <td className="p-3 font-mono">{ref.permitNo}</td>
                    <td className="p-3 font-bold text-[#1A1F24]">{ref.applicantName}</td>
                    <td className="p-3 font-mono">
                      {ref.totalPaid.toLocaleString()} UZS / <b>{ref.unusedDays} kun</b>
                    </td>
                    <td className="p-3 font-mono font-bold text-[#2E7D4F]">
                      {ref.refundAmount.toLocaleString()} UZS
                    </td>
                    <td className="p-3 text-[11px] text-[#5A646D]">{ref.legalBasis}</td>
                    <td className="p-3 text-[11px] text-[#0369A1] font-semibold">{ref.makerChecker}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          ref.status === 'completed'
                            ? 'bg-[#F0F7F1] text-[#2E7D4F] border border-[#D9EBDC]'
                            : 'bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A]'
                        }`}
                      >
                        {ref.status === 'completed' ? 'Qaytarildi' : 'Koʻrib chiqilmoqda'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Bank Statement Upload Modal */}
      {isUploadModalOpen && (
        <Modal
          isOpen={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
          title="Bank / Gʻaznachilik Koʻchirmasini Yuklash"
          subtitle="Munis va Gʻaznachilik tranzaksiyalari avto-solishtirmasi (C19)"
          maxWidth="md"
          footer={
            <div className="flex items-center justify-between w-full gap-3">
              <Button variant="outline" size="sm" onClick={() => setIsUploadModalOpen(false)}>
                Bekor qilish
              </Button>
              <Button
                variant="primary"
                size="sm"
                isLoading={isUploading}
                leftIcon={<Upload className="w-4 h-4" />}
                onClick={handleSimulateBankUpload}
                className="bg-[#2E7D4F] hover:bg-[#23653F] text-white font-bold"
              >
                Yuklash va Solishtirish
              </Button>
            </div>
          }
        >
          <div className="space-y-4 py-1 text-xs text-[#1A1F24]">
            <div className="p-6 border-2 border-dashed border-[#D9EBDC] bg-[#F0F7F1]/40 rounded-2xl text-center space-y-2">
              <Upload className="w-8 h-8 text-[#2E7D4F] mx-auto" />
              <div className="font-bold text-sm">Gʻaznachilik (.txt / .xml / .xlsx) faylini tanlang</div>
              <p className="text-[11px] text-[#5A646D]">Format: 23402000... tranzit hisobvaraq koʻchirmasi</p>
            </div>

            <div className="p-3 bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl space-y-1 text-[#5A646D]">
              <div>Tashkilot: <b>Boʻstonliq davlat oʻrmon xoʻjaligi</b></div>
              <div>Hisobvaraq: <b className="font-mono">20210000800100024001</b></div>
            </div>
          </div>
        </Modal>
      )}

      {/* Refund Creation Modal */}
      {isRefundModalOpen && (
        <Modal
          isOpen={isRefundModalOpen}
          onClose={() => setIsRefundModalOpen(false)}
          title="Mablagʻni Qaytarish (Refund) Formulali Dalolatnomasi"
          subtitle="VMQ 278-son 9–11 bandlari boʻyicha avto-hisob"
          maxWidth="lg"
          footer={
            <div className="flex items-center justify-between w-full gap-3">
              <Button variant="outline" size="sm" onClick={() => setIsRefundModalOpen(false)}>
                Bekor qilish
              </Button>
              <Button
                variant="primary"
                size="sm"
                leftIcon={<CheckCircle2 className="w-4 h-4" />}
                onClick={handleCreateRefund}
                className="bg-[#2E7D4F] hover:bg-[#23653F] text-white font-bold"
              >
                Qaytarishni Tasdiqlashga Yuborish ({calculatedRefund.toLocaleString()} UZS)
              </Button>
            </div>
          }
        >
          <div className="space-y-4 py-1 text-xs text-[#1A1F24]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-[#5A646D] mb-1">Ruxsatnoma № *</label>
                <input
                  type="text"
                  value={refundPermitNo}
                  onChange={(e) => setRefundPermitNo(e.target.value)}
                  className="w-full bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl px-3 py-2 text-xs font-mono font-bold text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#5A646D] mb-1">Arizachi / Tashkilot *</label>
                <input
                  type="text"
                  value={refundApplicant}
                  onChange={(e) => setRefundApplicant(e.target.value)}
                  className="w-full bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl px-3 py-2 text-xs text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-semibold text-[#5A646D] mb-1">Toʻlangan Summa (UZS) *</label>
                <input
                  type="number"
                  value={paidAmount}
                  onChange={(e) => setPaidAmount(Number(e.target.value))}
                  className="w-full bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl px-3 py-2 text-xs font-mono font-bold text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#5A646D] mb-1">Jami Muddat (kun) *</label>
                <input
                  type="number"
                  value={totalPeriodDays}
                  onChange={(e) => setTotalPeriodDays(Number(e.target.value))}
                  className="w-full bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl px-3 py-2 text-xs font-mono text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#5A646D] mb-1">Ishlatilmagan Qoldiq (kun) *</label>
                <input
                  type="number"
                  value={unusedPeriodDays}
                  onChange={(e) => setUnusedPeriodDays(Number(e.target.value))}
                  className="w-full bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl px-3 py-2 text-xs font-mono font-bold text-[#2E7D4F] focus:outline-none focus:border-[#2E7D4F]"
                />
              </div>
            </div>

            {/* Formula Calculation Box */}
            <div className="p-4 bg-[#F0F7F1] border border-[#D9EBDC] rounded-2xl flex items-center justify-between gap-4">
              <div>
                <div className="font-bold text-xs text-[#123522]">Qaytariladigan Hisoblangan Mablagʻ:</div>
                <div className="text-[11px] text-[#5A646D] font-mono">
                  {paidAmount.toLocaleString()} × ({unusedPeriodDays} / {totalPeriodDays})
                </div>
              </div>
              <div className="text-xl font-bold font-mono text-[#2E7D4F]">
                {calculatedRefund.toLocaleString()} UZS
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[#5A646D] mb-1">Qonuniy Asos (VMQ 278-son) *</label>
              <select
                value={refundLegalBasis}
                onChange={(e) => setRefundLegalBasis(e.target.value)}
                className="w-full bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl px-3 py-2 text-xs font-medium text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
              >
                <option value="VMQ 278-son 9-bandi (Foydalanish muddatidan oldin toʻxtatilganda)">
                  VMQ 278-son 9-bandi (Foydalanish muddatidan oldin toʻxtatilganda)
                </option>
                <option value="VMQ 278-son 10-bandi (Yongʻin xavfsizligi taqiqi sababli)">
                  VMQ 278-son 10-bandi (Yongʻin xavfsizligi taqiqi sababli)
                </option>
                <option value="VMQ 278-son 11-bandi (Sud qarori yoki vakolatli organ hujjati asosida)">
                  VMQ 278-son 11-bandi (Sud qarori yoki vakolatli organ hujjati asosida)
                </option>
              </select>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PaymentsPage;
