/**
 * ApplicantBillingPage — TZ: C9, C14, 10.5, VMQ 278-son
 */
import React, { useState } from 'react';
import {
  CreditCard, Clock, CheckCircle2, AlertCircle,
  Download, RotateCcw, Eye, FileText,
  ChevronDown, ChevronUp, Shield, Info, X,
} from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Modal } from '../../../components/ui/Overlay';

export interface ApplicantBillingPageProps {
  onNavigate?: (page: string, params?: unknown) => void;
  userName?: string;
}

interface InvoiceItem {
  id: string; permitRequestNo: string; activity: string; zone: string;
  issuedAt: string; dueDate: string; daysLeft: number; amount: number;
  status: 'pending' | 'paid' | 'expired' | 'cancelled';
  providers: ('Payme' | 'Click' | 'Uzum' | 'Paynet' | 'Bank')[];
  calcSnapshot: { bhm: number; coefficient: number; area: number; months: number };
}
interface PaymentTransaction {
  id: string; invoiceId: string; permitNo: string; activity: string;
  provider: 'Payme' | 'Click' | 'Uzum' | 'Paynet' | 'Bank';
  amount: number; paidAt: string; status: 'paid';
}
interface RefundRequest {
  id: string; permitNo: string; activity: string; totalPaid: number;
  paidPeriodDays: number; unusedDays: number; refundAmount: number;
  legalBasis: string; status: 'draft' | 'pending_checker' | 'completed' | 'rejected';
  submittedAt: string; slaDeadline: string; makerCheckerNote?: string;
}

const INVOICES: InvoiceItem[] = [{
  id: 'INV-2026-0031', permitRequestNo: 'A-00062',
  activity: "Pichan o'rish", zone: "Zangiota o'rmon xo'jaligi, 14-kvartal",
  issuedAt: '24.08.2026 10:15', dueDate: '03.09.2026', daysLeft: 4,
  amount: 2480240, status: 'pending',
  providers: ['Payme', 'Click', 'Uzum', 'Paynet', 'Bank'],
  calcSnapshot: { bhm: 400000, coefficient: 1.5, area: 42.6, months: 3 },
}];

const TRANSACTIONS: PaymentTransaction[] = [
  { id: 'TX-2026-0018', invoiceId: 'INV-2026-0017', permitNo: 'RX-2026-0089',
    activity: 'Chorva molini boqish', provider: 'Payme', amount: 1428000,
    paidAt: '10.08.2026 14:33', status: 'paid' },
  { id: 'TX-2026-0009', invoiceId: 'INV-2026-0009', permitNo: 'RX-2026-0071',
    activity: 'Asalari uyalari', provider: 'Click', amount: 864000,
    paidAt: '15.06.2026 09:20', status: 'paid' },
];

const REFUNDS: RefundRequest[] = [{
  id: 'REF-2026-0004', permitNo: 'RX-2026-0071', activity: 'Asalari uyalari',
  totalPaid: 864000, paidPeriodDays: 180, unusedDays: 75, refundAmount: 360000,
  legalBasis: 'VMQ 278-son 9-bandi — muddatidan oldin toxtatilganda',
  status: 'pending_checker', submittedAt: '20.08.2026', slaDeadline: '17.09.2026',
  makerCheckerNote: 'Buxgalteriya va rahbar tasdiqini kutmoqda',
}];

const PC: Record<string, string> = {
  Payme: 'bg-[#0095DA]/10 text-[#0095DA] border-[#0095DA]/30',
  Click: 'bg-[#FF7300]/10 text-[#FF7300] border-[#FF7300]/30',
  Uzum: 'bg-[#8B5CF6]/10 text-[#8B5CF6] border-[#8B5CF6]/30',
  Paynet: 'bg-[#2E7D4F]/10 text-[#2E7D4F] border-[#2E7D4F]/30',
  Bank: 'bg-[#5A646D]/10 text-[#5A646D] border-[#5A646D]/30',
};
const SM: Record<string, { label: string; cls: string }> = {
  pending: { label: "To'lov kutilmoqda", cls: 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]' },
  paid: { label: "To'landi", cls: 'bg-[#F0F7F1] text-[#2E7D4F] border-[#D9EBDC]' },
  expired: { label: "Muddati o'tdi", cls: 'bg-[#FEF2F2] text-[#991B1B] border-[#FCA5A5]' },
  cancelled: { label: 'Bekor qilindi', cls: 'bg-[#F8F9FA] text-[#5A646D] border-[#E4E7EA]' },
  draft: { label: 'Qoralama', cls: 'bg-[#F8F9FA] text-[#5A646D] border-[#E4E7EA]' },
  pending_checker: { label: 'Tekshiruvda', cls: 'bg-[#E0F2FE] text-[#0369A1] border-[#BAE6FD]' },
  completed: { label: 'Qaytarildi', cls: 'bg-[#F0F7F1] text-[#2E7D4F] border-[#D9EBDC]' },
  rejected: { label: 'Rad etildi', cls: 'bg-[#FEF2F2] text-[#991B1B] border-[#FCA5A5]' },
};
const fmt = (n: number) => n.toLocaleString('ru-RU') + ' UZS';

export const ApplicantBillingPage: React.FC<ApplicantBillingPageProps> = () => {
  const [activeTab, setActiveTab] = useState<'invoices' | 'history' | 'refunds'>('invoices');
  const [expandedInvoice, setExpandedInvoice] = useState<string | null>(null);
  const [payModalInvoice, setPayModalInvoice] = useState<InvoiceItem | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [paySuccess, setPaySuccess] = useState(false);
  const [refundModalOpen, setRefundModalOpen] = useState(false);
  const [refundPermitNo, setRefundPermitNo] = useState('');
  const [refundLegalBasis, setRefundLegalBasis] = useState('VMQ 278-son 9-bandi');
  const [totalPaid, setTotalPaid] = useState(1428000);
  const [totalDays, setTotalDays] = useState(365);
  const [unusedDays, setUnusedDays] = useState(120);
  const [refundSubmitted, setRefundSubmitted] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 5000); };
  const calcRefund = Math.floor((totalPaid * unusedDays) / totalDays);
  const pendingCount = INVOICES.filter(i => i.status === 'pending').length;
  const closePayModal = () => { setPayModalInvoice(null); setSelectedProvider(null); setPaySuccess(false); };

  const handlePay = () => {
    if (!selectedProvider) return;
    setPaySuccess(true);
    const inv = payModalInvoice; const prov = selectedProvider;
    setTimeout(() => {
      setPaySuccess(false); setPayModalInvoice(null); setSelectedProvider(null);
      showToast("To'lov amalga oshirildi! " + prov + " orqali " + fmt(inv?.amount ?? 0) + " to'landi.");
    }, 1800);
  };

  const handleRefundSubmit = () => {
    setRefundSubmitted(true); const amount = calcRefund;
    setTimeout(() => {
      setRefundSubmitted(false); setRefundModalOpen(false);
      showToast("Qaytarish arizasi yuborildi! " + fmt(amount) + " — SLA: 20 ish kuni (VMQ 278).");
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 font-sans pb-16">
      {toast && (
        <div className="p-4 bg-[#F0F7F1] border border-[#D9EBDC] rounded-2xl flex items-start justify-between gap-3 shadow-sm">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-[#2E7D4F] shrink-0 mt-0.5" />
            <span className="text-xs font-semibold text-[#1A1F24] leading-relaxed">{toast}</span>
          </div>
          <button onClick={() => setToast(null)} className="text-[#5A646D] hover:text-[#1A1F24] shrink-0 cursor-pointer"><X className="w-4 h-4" /></button>
        </div>
      )}

      {/* Header */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#2E7D4F] bg-[#F0F7F1] px-2.5 py-1 rounded border border-[#D9EBDC]">Moduli 10.5 · C9 · C14 · VMQ 278-son</span>
              <span className="text-[10px] font-bold bg-[#E0F2FE] text-[#0369A1] px-2 py-1 rounded border border-[#BAE6FD]">Faqat sizning to'lovlaringiz (ABAC)</span>
            </div>
            <h1 className="text-xl font-bold text-[#1A1F24]">Mening to'lovlarim va invoyslarim</h1>
            <p className="text-xs text-[#5A646D] mt-0.5">To'lov kutilayotgan invoyslar, to'lovlar tarixi, kvitansiyalar va mablag'ni qaytarish arizalari</p>
          </div>
          <Button variant="outline" size="sm" leftIcon={<RotateCcw className="w-4 h-4 text-[#B45309]" />} onClick={() => setRefundModalOpen(true)} className="text-xs font-bold border-[#FDE68A] text-[#B45309] hover:bg-[#FFFBEB] shrink-0">Mablag'ni qaytarish (Refund)</Button>
        </div>
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-[#FFFBEB] border border-[#FDE68A] rounded-xl"><div className="text-[11px] font-semibold uppercase text-[#B45309] mb-0.5">To'lov kutilayotgan</div><div className="text-lg font-bold font-mono text-[#1A1F24]">{pendingCount} ta invoys</div></div>
          <div className="p-3 bg-[#F0F7F1] border border-[#D9EBDC] rounded-xl"><div className="text-[11px] font-semibold uppercase text-[#2E7D4F] mb-0.5">To'langan (jami)</div><div className="text-lg font-bold font-mono text-[#2E7D4F]">{fmt(TRANSACTIONS.reduce((s,t)=>s+t.amount,0))}</div></div>
          <div className="p-3 bg-[#E0F2FE] border border-[#BAE6FD] rounded-xl"><div className="text-[11px] font-semibold uppercase text-[#0369A1] mb-0.5">Aktiv ruxsatnomalar</div><div className="text-lg font-bold font-mono text-[#0369A1]">2 ta</div></div>
          <div className="p-3 bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl"><div className="text-[11px] font-semibold uppercase text-[#5A646D] mb-0.5">Qaytarish (Refund)</div><div className="text-lg font-bold font-mono text-[#5A646D]">{REFUNDS.length} ta ariza</div></div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#E4E7EA] flex items-center gap-1 overflow-x-auto">
        {[
          { key: 'invoices' as const, label: "To'lov kutilayotgan invoyslar", icon: <CreditCard className="w-4 h-4"/>, badge: pendingCount, bc: 'bg-[#FDE68A] text-[#B45309]' },
          { key: 'history' as const, label: "To'lovlar tarixi", icon: <FileText className="w-4 h-4"/> },
          { key: 'refunds' as const, label: 'Qaytarish arizalari (Refund)', icon: <RotateCcw className="w-4 h-4"/>, badge: REFUNDS.filter(r=>r.status==='pending_checker').length, bc: 'bg-[#D9EBDC] text-[#2E7D4F]' },
        ].map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)}
            className={['px-4 py-2.5 text-xs font-bold whitespace-nowrap transition-all border-b-2 flex items-center gap-2 cursor-pointer', activeTab===tab.key ? 'border-[#2E7D4F] text-[#2E7D4F]' : 'border-transparent text-[#5A646D] hover:text-[#1A1F24]'].join(' ')}>
            {tab.icon}<span>{tab.label}</span>
            {tab.badge !== undefined && tab.badge > 0 && <span className={"px-1.5 py-0.5 rounded-full text-[10px] font-bold " + (tab.bc??'')}>{tab.badge}</span>}
          </button>
        ))}
      </div>

      {/* TAB 1: Invoices */}
      {activeTab === 'invoices' && (
        <div className="space-y-4">
          {INVOICES.map(inv => {
            const isExpanded = expandedInvoice === inv.id;
            const s = SM[inv.status];
            const isUrgent = inv.daysLeft <= 3 && inv.status === 'pending';
            return (
              <div key={inv.id} className={['bg-white border rounded-2xl shadow-xs', inv.status==='pending' ? (isUrgent?'border-[#B91C1C]':'border-[#B45309]') : 'border-[#E4E7EA]'].join(' ')}>
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-1 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono font-bold text-sm text-[#1A1F24]">{inv.id}</span>
                        <span className={"px-2 py-0.5 rounded text-[10px] font-bold border " + s.cls}>{s.label}</span>
                        {isUrgent && <span className="px-2 py-0.5 rounded text-[10px] font-bold border bg-[#FEF2F2] text-[#B91C1C] border-[#FCA5A5]">SHOSHILINCH</span>}
                      </div>
                      <div className="font-bold text-base text-[#1A1F24]">{inv.activity}</div>
                      <div className="text-xs text-[#5A646D]">{inv.zone}</div>
                      <div className="text-xs text-[#5A646D]">Ariza: <span className="font-mono font-bold">{inv.permitRequestNo}</span> · Chiqarildi: {inv.issuedAt}</div>
                    </div>
                    <div className="shrink-0 text-right space-y-2">
                      <div className="text-2xl font-bold font-mono text-[#1A1F24]">{fmt(inv.amount)}</div>
                      {inv.status==='pending' && <div className={"flex items-center justify-end gap-1 text-xs font-semibold " + (isUrgent?'text-[#B91C1C]':'text-[#B45309]')}><Clock className="w-4 h-4"/><span>{inv.daysLeft} kun qoldi · {inv.dueDate}gacha</span></div>}
                    </div>
                  </div>
                  {inv.status==='pending' && (
                    <div className="mt-5 pt-5 border-t border-[#E4E7EA] space-y-3">
                      <div className="text-xs font-semibold text-[#5A646D] uppercase tracking-wider">To'lov usulini tanlang (TZ C9):</div>
                      <div className="flex flex-wrap gap-2">
                        {inv.providers.map(p => (
                          <button key={p} onClick={() => { setPayModalInvoice(inv); setSelectedProvider(p); }}
                            className={"px-4 py-2 rounded-xl border text-xs font-bold transition-all hover:scale-[1.03] active:scale-[0.97] cursor-pointer " + PC[p]}>
                            {p==='Bank' ? "Bank o'tkazmasi" : p}
                          </button>
                        ))}
                      </div>
                      <div className="flex items-start gap-2 p-3 bg-[#FFFBEB] border border-[#FDE68A] rounded-xl text-xs text-[#92400E]">
                        <Info className="w-4 h-4 shrink-0 mt-0.5"/>
                        <div><strong>Muhim:</strong> VMQ 278-son bo'yicha 100% oldindan to'lov talab etiladi. To'lov <strong>{inv.dueDate}gacha</strong> amalga oshirilmasa, ariza avtomatik to'xtatiladi. Webhook orqali tizimda aks etadi va ruxsatnoma shakllanadi.</div>
                      </div>
                    </div>
                  )}
                  <button onClick={() => setExpandedInvoice(isExpanded ? null : inv.id)} className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-[#2E7D4F] hover:underline cursor-pointer">
                    {isExpanded ? <ChevronUp className="w-4 h-4"/> : <ChevronDown className="w-4 h-4"/>}
                    Hisob-kitob tafsilotlari (calculation_snapshot)
                  </button>
                  {isExpanded && (
                    <div className="mt-3 p-4 bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-xs space-y-2">
                      <div className="font-bold text-[#1A1F24] mb-2">Hisob-kitob asosi (VMQ 278-son) — immutable snapshot</div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[#5A646D]">
                        <div>BHM: <strong className="text-[#1A1F24]">{inv.calcSnapshot.bhm.toLocaleString()} UZS</strong></div>
                        <div>Koeff: <strong className="text-[#1A1F24]">x {inv.calcSnapshot.coefficient}</strong></div>
                        <div>Maydon: <strong className="text-[#1A1F24]">{inv.calcSnapshot.area} ga</strong></div>
                        <div>Muddat: <strong className="text-[#1A1F24]">{inv.calcSnapshot.months} oy</strong></div>
                      </div>
                      <div className="font-mono text-[11px] text-[#767F87] pt-2 border-t border-[#E4E7EA]">rule_v2026.08 · Tasdiqlangan: {inv.issuedAt}</div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          <div className="p-4 bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl flex items-start gap-3 text-xs text-[#5A646D]">
            <Shield className="w-4 h-4 shrink-0 text-[#2E7D4F] mt-0.5"/>
            <div><strong className="text-[#1A1F24]">To'lov xavfsizligi:</strong> Barcha to'lovlar Payme, Click, Uzum, Paynet yoki Munis orqali amalga oshiriladi. Webhook orqali 30 daqiqadan oshmasligi kerak. To'lov holati o'zgarganda SMS va email bildirishnoma keladi.</div>
          </div>
        </div>
      )}

      {/* TAB 2: History */}
      {activeTab === 'history' && (
        <div className="bg-white border border-[#E4E7EA] rounded-2xl shadow-xs overflow-hidden">
          <div className="p-5 border-b border-[#E4E7EA]">
            <h2 className="text-base font-bold text-[#1A1F24]">To'lovlar tarixi</h2>
            <p className="text-xs text-[#5A646D] mt-0.5">Barcha tasdiqlangan to'lovlar va kvitansiyalar (faqat sizning to'lovlaringiz)</p>
          </div>
          <div className="divide-y divide-[#E4E7EA]">
            {TRANSACTIONS.map(tx => (
              <div key={tx.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#F8F9FA] transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#F0F7F1] border border-[#D9EBDC] flex items-center justify-center shrink-0"><CheckCircle2 className="w-5 h-5 text-[#2E7D4F]"/></div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-0.5">
                      <span className="font-mono font-bold text-sm text-[#1A1F24]">{tx.permitNo}</span>
                      <span className={"px-2 py-0.5 rounded text-[10px] font-bold border " + PC[tx.provider]}>{tx.provider}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold border bg-[#F0F7F1] text-[#2E7D4F] border-[#D9EBDC]">TO'LANDI</span>
                    </div>
                    <div className="text-xs font-semibold text-[#1A1F24]">{tx.activity}</div>
                    <div className="text-[11px] text-[#767F87] mt-0.5">{tx.paidAt} · {tx.id}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right"><div className="text-base font-bold font-mono text-[#2E7D4F]">{fmt(tx.amount)}</div><div className="text-[11px] text-[#5A646D]">100% oldindan to'lov</div></div>
                  <Button variant="outline" size="sm" leftIcon={<Download className="w-4 h-4"/>} onClick={() => showToast("Kvitansiya (" + tx.id + ") PDF formatida yuklab olinyapti...")} className="text-xs font-bold">Kvitansiya</Button>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-[#E4E7EA] flex items-center justify-between">
            <span className="text-xs text-[#5A646D]">Jami: {TRANSACTIONS.length} ta tranzaksiya</span>
            <Button variant="ghost" size="sm" leftIcon={<Download className="w-4 h-4"/>} onClick={() => showToast("Barcha to'lovlar Excel formatida yuklab olinyapti...")} className="text-xs">Excel yuklab olish</Button>
          </div>
        </div>
      )}

      {/* TAB 3: Refunds */}
      {activeTab === 'refunds' && (
        <div className="space-y-4">
          <div className="p-4 bg-[#FFFBEB] border border-[#FDE68A] rounded-xl text-xs text-[#92400E] space-y-1">
            <div className="font-bold">TZ C14 · VMQ 278-son 9-11 bandlari bo'yicha qaytarish formulasi:</div>
            <div className="font-mono text-sm">Qaytariladigan summa = To'langan summa x (Foydalanilmagan kunlar / Jami muddat kuni)</div>
            <div className="text-[11px]">* Formuladan chetga chiqilgan urinishlar RI-11 xavf indikatorini vujudga keltiradi. SLA: 20 ish kuni.</div>
          </div>
          {REFUNDS.map(ref => {
            const s = SM[ref.status];
            return (
              <div key={ref.id} className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-mono font-bold text-sm text-[#B45309]">{ref.id}</span>
                      <span className={"px-2 py-0.5 rounded text-[10px] font-bold border " + s.cls}>{s.label}</span>
                    </div>
                    <div className="font-bold text-[#1A1F24]">{ref.permitNo} · {ref.activity}</div>
                    <div className="text-xs text-[#5A646D] mt-0.5">Yuborildi: {ref.submittedAt} · SLA muddat: {ref.slaDeadline}</div>
                  </div>
                  <div className="text-right shrink-0"><div className="text-xl font-bold font-mono text-[#2E7D4F]">{fmt(ref.refundAmount)}</div><div className="text-xs text-[#5A646D]">qaytariladigan summa</div></div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  {[
                    { label: "To'langan", val: fmt(ref.totalPaid), cls: '', bg: '' },
                    { label: 'Jami muddat', val: ref.paidPeriodDays+' kun', cls: '', bg: '' },
                    { label: 'Foydalanilmagan', val: ref.unusedDays+' kun', cls: 'text-[#2E7D4F]', bg: '' },
                    { label: 'Qaytariladi', val: fmt(ref.refundAmount), cls: 'text-[#B45309]', bg: 'bg-[#FFFBEB] border-[#FDE68A]' },
                  ].map((item, i) => (
                    <div key={i} className={"p-3 rounded-xl border " + (item.bg||'bg-[#F8F9FA] border-[#E4E7EA]')}>
                      <div className="text-[#5A646D] mb-0.5">{item.label}</div>
                      <div className={"font-bold font-mono " + item.cls}>{item.val}</div>
                    </div>
                  ))}
                </div>
                <div className="text-xs text-[#5A646D] space-y-1 pt-2 border-t border-[#E4E7EA]">
                  <div><strong>Qonuniy asos:</strong> {ref.legalBasis}</div>
                  {ref.makerCheckerNote && <div className="flex items-center gap-1.5 text-[#0369A1]"><Eye className="w-3.5 h-3.5"/><span>{ref.makerCheckerNote}</span></div>}
                </div>
              </div>
            );
          })}
          <Button variant="outline" size="sm" leftIcon={<RotateCcw className="w-4 h-4 text-[#B45309]"/>} onClick={() => setRefundModalOpen(true)} className="text-xs font-bold border-[#FDE68A] text-[#B45309] hover:bg-[#FFFBEB]">+ Yangi qaytarish arizasi yuborish</Button>
        </div>
      )}

      {/* MODAL: Payment */}
      <Modal isOpen={!!payModalInvoice} onClose={closePayModal} title="To'lovni amalga oshirish" subtitle={payModalInvoice ? payModalInvoice.id + ' · ' + payModalInvoice.activity : ''} maxWidth="md"
        footer={<div className="flex items-center justify-between w-full gap-3"><Button variant="outline" size="sm" onClick={closePayModal}>Bekor qilish</Button><Button variant="primary" size="sm" isLoading={paySuccess} onClick={handlePay} disabled={!selectedProvider||paySuccess} className="bg-[#2E7D4F] hover:bg-[#23653F] text-white font-bold">{paySuccess ? 'Tasdiqlanmoqda...' : selectedProvider ? selectedProvider+" orqali "+fmt(payModalInvoice?.amount??0)+" to'lash" : "To'lov usulini tanlang"}</Button></div>}
      >
        {paySuccess ? (
          <div className="py-8 text-center space-y-3"><CheckCircle2 className="w-12 h-12 text-[#2E7D4F] mx-auto"/><div className="font-bold text-[#1A1F24]">To'lov muvaffaqiyatli tasdiqlandi!</div><div className="text-xs text-[#5A646D]">Ruxsatnoma avtomatik shakllantirilmoqda...</div></div>
        ) : (
          <div className="space-y-4 py-1">
            <div className="p-4 bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-xs space-y-2">
              <div className="flex justify-between"><span className="text-[#5A646D]">Invoys:</span><span className="font-mono font-bold">{payModalInvoice?.id}</span></div>
              <div className="flex justify-between"><span className="text-[#5A646D]">Summa (100% oldindan):</span><span className="font-bold font-mono">{fmt(payModalInvoice?.amount??0)}</span></div>
              <div className="flex justify-between"><span className="text-[#5A646D]">Muddat:</span><span className="font-bold text-[#B45309]">{payModalInvoice?.dueDate}</span></div>
            </div>
            <div className="space-y-2">
              <div className="text-xs font-semibold text-[#5A646D] uppercase tracking-wider">To'lov usulini tanlang:</div>
              <div className="grid grid-cols-2 gap-2">
                {payModalInvoice?.providers.map(p => (
                  <button key={p} onClick={() => setSelectedProvider(p)} className={['p-3 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer', selectedProvider===p ? 'border-[#2E7D4F] bg-[#F0F7F1] ring-2 ring-[#2E7D4F]/20' : 'border-[#E4E7EA] bg-white hover:border-[#767F87]'].join(' ')}>
                    <div className="flex items-center gap-2"><div className={"w-2 h-2 rounded-full " + (selectedProvider===p ? 'bg-[#2E7D4F]' : 'bg-[#D9EBDC]')}/><span>{p==='Bank' ? "Bank o'tkazmasi" : p}</span></div>
                    {p==='Bank' && <div className="mt-1 text-[10px] text-[#5A646D] font-normal">Rekvizit fayli (PDF) yuklab olinadi</div>}
                  </button>
                ))}
              </div>
            </div>
            <div className="p-3 bg-[#F0F7F1] border border-[#D9EBDC] rounded-xl flex items-start gap-2 text-xs text-[#2E7D4F]"><Shield className="w-4 h-4 shrink-0 mt-0.5"/><div>To'lov webhook orqali avtomatik aks etadi. Bir xil to'lov ikki marta qayta ishlanmaydi (idempotency).</div></div>
          </div>
        )}
      </Modal>

      {/* MODAL: Refund */}
      <Modal isOpen={refundModalOpen} onClose={() => { setRefundModalOpen(false); setRefundSubmitted(false); }} title="Mablag'ni Qaytarish (Refund) Arizasi" subtitle="VMQ 278-son 9-11 bandlari · TZ C14" maxWidth="lg"
        footer={<div className="flex items-center justify-between w-full gap-3"><Button variant="outline" size="sm" onClick={() => setRefundModalOpen(false)}>Bekor qilish</Button><Button variant="primary" size="sm" isLoading={refundSubmitted} onClick={handleRefundSubmit} className="bg-[#2E7D4F] hover:bg-[#23653F] text-white font-bold">{refundSubmitted ? 'Yuborilmoqda...' : "Ariza yuborish (" + fmt(calcRefund) + ")"}</Button></div>}
      >
        <div className="space-y-4 py-1 text-xs">
          <div><label className="block font-semibold text-[#5A646D] mb-1">Ruxsatnoma yoki Ariza No *</label><input type="text" value={refundPermitNo} onChange={e => setRefundPermitNo(e.target.value)} placeholder="Masalan: RX-2026-0089" className="w-full bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl px-3 py-2 text-xs font-mono font-bold text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"/></div>
          <div><label className="block font-semibold text-[#5A646D] mb-1">Qonuniy asos (VMQ 278-son) *</label>
            <select value={refundLegalBasis} onChange={e => setRefundLegalBasis(e.target.value)} className="w-full bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl px-3 py-2 text-xs text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]">
              <option value="VMQ 278-son 9-bandi">9-band — Foydalanish muddatidan oldin to'xtatilganda</option>
              <option value="VMQ 278-son 10-bandi">10-band — Yong'in xavfsizligi taqiqi sababli</option>
              <option value="VMQ 278-son 11-bandi">11-band — Sud qarori yoki vakolatli organ hujjati asosida</option>
            </select>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div><label className="block font-semibold text-[#5A646D] mb-1">To'langan summa (UZS) *</label><input type="number" value={totalPaid} onChange={e => setTotalPaid(Number(e.target.value))} className="w-full bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl px-3 py-2 text-xs font-mono font-bold text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"/></div>
            <div><label className="block font-semibold text-[#5A646D] mb-1">Jami muddat (kun) *</label><input type="number" value={totalDays} onChange={e => setTotalDays(Number(e.target.value))} className="w-full bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl px-3 py-2 text-xs font-mono text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"/></div>
            <div><label className="block font-semibold text-[#5A646D] mb-1">Ishlatilmagan kunlar *</label><input type="number" value={unusedDays} onChange={e => setUnusedDays(Number(e.target.value))} className="w-full bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl px-3 py-2 text-xs font-mono font-bold text-[#2E7D4F] focus:outline-none focus:border-[#2E7D4F]"/></div>
          </div>
          <div className="p-4 bg-[#F0F7F1] border border-[#D9EBDC] rounded-2xl flex items-center justify-between gap-4">
            <div><div className="font-bold text-[#123522]">Qaytariladigan hisoblangan mablag':</div><div className="text-[11px] font-mono text-[#5A646D]">{totalPaid.toLocaleString()} x ({unusedDays} / {totalDays})</div></div>
            <div className="text-2xl font-bold font-mono text-[#2E7D4F]">{fmt(calcRefund)}</div>
          </div>
          <div className="p-3 bg-[#FFFBEB] border border-[#FDE68A] rounded-xl flex items-start gap-2 text-xs text-[#92400E]"><AlertCircle className="w-4 h-4 shrink-0 mt-0.5"/><div>Ariza yuborilgach, buxgalteriya va rahbar (maker-checker) tomonidan ko'rib chiqiladi. VMQ 278-son bo'yicha mablag' <strong>20 ish kuni</strong> ichida qaytarilishi shart. RI-11 xavf indikatori qo'llaniladi.</div></div>
        </div>
      </Modal>
    </div>
  );
};

export default ApplicantBillingPage;
