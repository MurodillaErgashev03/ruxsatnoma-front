import React from 'react';
import {
  Upload,
  Download,
} from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { hasRight } from '../../../lib/permissions';
import { DataTable, type Column } from '../../../components/ui/DataTable';

export interface AccountantReconciliationPageProps {
  userRole?: string;
  onNavigate?: (page: string, params?: any) => void;
}

export interface BankTransactionItem {
  id: string;
  txHash: string;
  permitNo: string;
  provider: 'Click' | 'Payme' | 'Uzum' | 'Bank Transfer';
  amount: string;
  forestryFund50: string;
  stateBudget50: string;
  matchedStatus: 'matched' | 'discrepancy' | 'manual';
  date: string;
}

export const AccountantReconciliationPage: React.FC<AccountantReconciliationPageProps> = ({ userRole = '' }) => {
  /**
   * TZ appendix 4: only the accountant holds Я and Ў on payments; monitoring
   * roles read and export.
   */
  const isMonitoringOnly = !hasRight(userRole, 'payment', 'edit');
  const transactions: BankTransactionItem[] = [
    { id: 'TX-901', txHash: 'CLK-9081234', permitNo: 'RX-2026-0089', provider: 'Click', amount: '1,428,000 UZS', forestryFund50: '714,000 UZS', stateBudget50: '714,000 UZS', matchedStatus: 'matched', date: '10.08.2026 14:31' },
    { id: 'TX-902', txHash: 'PAY-4019284', permitNo: 'RX-2026-0090', provider: 'Payme', amount: '2,850,000 UZS', forestryFund50: '1,425,000 UZS', stateBudget50: '1,425,000 UZS', matchedStatus: 'matched', date: '09.08.2026 11:20' },
    { id: 'TX-903', txHash: 'BNK-7712049', permitNo: 'RX-2026-0095', provider: 'Bank Transfer', amount: '360,000 UZS', forestryFund50: '180,000 UZS', stateBudget50: '180,000 UZS', matchedStatus: 'manual', date: '08.08.2026 16:00' },
  ];

  const columns: Column<BankTransactionItem>[] = [
    { key: 'txHash', header: 'Tranzaksiya ID', sortable: true, width: '140px' },
    { key: 'permitNo', header: 'Ruxsatnoma №', sortable: true, width: '130px' },
    { key: 'provider', header: 'Toʻlov Tizimi', sortable: true, width: '130px' },
    { key: 'amount', header: 'Jami Summa', sortable: true, width: '130px' },
    { key: 'forestryFund50', header: 'Oʻrmon Jamgʻarmasi (50%)', sortable: true, width: '160px' },
    { key: 'stateBudget50', header: 'Davlat Byudjeti (50%)', sortable: true, width: '160px' },
    {
      key: 'matchedStatus',
      header: 'Sverka Holati',
      sortable: true,
      width: '150px',
      accessor: (row) => (
        <span
          className={`px-2 py-0.5 rounded text-[11px] font-bold ${
            row.matchedStatus === 'matched'
              ? 'bg-[#F0F7F1] text-[#2E7D4F] border border-[#D9EBDC]'
              : row.matchedStatus === 'manual'
              ? 'bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A]'
              : 'bg-[#FEF2F2] text-[#991B1B] border border-[#FCA5A5]'
          }`}
        >
          {row.matchedStatus === 'matched' ? 'SOLISHTIRILDI' : 'QOʻLDA (RI-01)'}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-8 font-sans">
      {/* Header */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#2E7D4F] bg-[#F0F7F1] px-2.5 py-1 rounded">
            {isMonitoringOnly ? 'Toʻlovlar monitoringi (faqat koʻrish)' : 'Moliya subtizimi (4.2.10)'}
          </span>
          <h1 className="text-lg font-bold text-[#1A1F24] mt-1.5">
            {isMonitoringOnly ? 'Toʻlovlar va 50/50 Taqsimot Monitoringi' : 'Solishtirma va 50/50 Taqsimot'}
          </h1>
          <p className="text-xs text-[#5A646D]">
            {isMonitoringOnly
              ? 'Respublika boʻyicha tushumlar, solishtirma natijalari va Oʻrmon jamgʻarmasi hamda byudjet oʻrtasidagi taqsimot.'
              : 'Tushgan tushumlarni avtomatik solishtirish va Oʻrmon jamgʻarmasi hamda byudjet oʻrtasida 50 ga 50 taqsimlash.'}
          </p>
        </div>
        {isMonitoringOnly ? (
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Download className="w-4 h-4" />}
            onClick={() => alert('Toʻlovlar solishtirmasi Excel formatida tayyorlanmoqda.')}
          >
            Excelga eksport
          </Button>
        ) : (
          <Button variant="primary" size="sm" leftIcon={<Upload className="w-4 h-4" />}>
            Bank koʻchirmasini yuklash
          </Button>
        )}
      </div>

      {/* Allocation Ledger Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-[#E4E7EA] p-5 rounded-2xl shadow-xs space-y-1">
          <span className="text-xs font-bold uppercase text-[#5A646D]">Jami Tushum (Bugun)</span>
          <div className="text-2xl font-bold text-[#1A1F24] font-mono">4,638,000 UZS</div>
          <span className="text-xs text-[#15803D]">100% solishtirildi</span>
        </div>

        <div className="bg-[#F0F7F1] border border-[#D9EBDC] p-5 rounded-2xl space-y-1">
          <span className="text-xs font-bold uppercase text-[#123522]">Oʻrmon Jamgʻarmasi Hissasi (50%)</span>
          <div className="text-2xl font-bold text-[#2E7D4F] font-mono">2,319,000 UZS</div>
          <span className="text-xs text-[#2E7D4F]">Maxsus hisobvaraqqa oʻtkazildi</span>
        </div>

        <div className="bg-[#E0F2FE] border border-[#BAE6FD] p-5 rounded-2xl space-y-1">
          <span className="text-xs font-bold uppercase text-[#0369A1]">Davlat Byudjeti Hissasi (50%)</span>
          <div className="text-2xl font-bold text-[#0284C7] font-mono">2,319,000 UZS</div>
          <span className="text-xs text-[#0369A1]">Gʻaznachilik hisobiga taqsimlandi</span>
        </div>
      </div>

      {/* Reconciliation Table */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-[#1A1F24]">Solishtirilgan Bank Tranzaksiyalari Registri</h2>
        <DataTable columns={columns} data={transactions} selectable />
      </div>
    </div>
  );
};
