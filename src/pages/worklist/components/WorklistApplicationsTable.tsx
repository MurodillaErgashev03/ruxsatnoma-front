import React from 'react';
import { AlertTriangle, Clock, ArrowUpDown, MoreHorizontal, FileText } from 'lucide-react';

export interface WorklistApplicationRow {
  id: string;
  appNo: string;
  applicantName: string;
  applicantId: string;
  activityType: string;
  contour: string;
  contourLayer: string;
  areaHa: number;
  sumAmount: string;
  statusText: string;
  statusType: 'under_review' | 'submitted' | 'info_requested' | 'approved' | 'returned';
  slaState: 'overdue' | 'due_today' | 'normal';
  slaText: string;
  slaSubtext: string;
  slaPercent: number;
  riTag?: string;
}

export interface WorklistApplicationsTableProps {
  rows: WorklistApplicationRow[];
  selectedIds: string[];
  onToggleSelectRow: (id: string) => void;
  onToggleSelectAll: () => void;
  onRowClick?: (appNo: string) => void;
}

export const WorklistApplicationsTable: React.FC<WorklistApplicationsTableProps> = ({
  rows,
  selectedIds,
  onToggleSelectRow,
  onToggleSelectAll,
  onRowClick,
}) => {
  const isAllSelected = rows.length > 0 && selectedIds.length === rows.length;

  return (
    <div className="bg-white border border-[#E4E7EA] rounded-b-2xl overflow-x-auto shadow-xs font-sans">
      <table className="w-full text-xs text-left border-collapse min-w-[900px]">
        <thead>
          <tr className="bg-[#F8F9FA] border-b border-[#767F87] text-[#5A646D] uppercase font-bold text-[11px]">
            <th className="p-3 w-10 text-center">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={onToggleSelectAll}
                className="w-4 h-4 rounded border-[#767F87] text-[#2E7D4F] focus:ring-[#2E7D4F] cursor-pointer"
              />
            </th>
            <th className="p-3">
              <button className="flex items-center gap-1 font-bold hover:text-[#1A1F24] cursor-pointer">
                Raqam <ArrowUpDown className="w-3 h-3" />
              </button>
            </th>
            <th className="p-3">
              <button className="flex items-center gap-1 font-bold hover:text-[#1A1F24] cursor-pointer">
                Arizachi <ArrowUpDown className="w-3 h-3" />
              </button>
            </th>
            <th className="p-3">Faoliyat turi</th>
            <th className="p-3">Kontur</th>
            <th className="p-3 text-right">
              <button className="flex items-center gap-1 font-bold hover:text-[#1A1F24] cursor-pointer ml-auto">
                Maydon, ga <ArrowUpDown className="w-3 h-3" />
              </button>
            </th>
            <th className="p-3 text-right">
              <button className="flex items-center gap-1 font-bold hover:text-[#1A1F24] cursor-pointer ml-auto">
                Summa, soʻm <ArrowUpDown className="w-3 h-3" />
              </button>
            </th>
            <th className="p-3">Status</th>
            <th className="p-3">
              <button className="flex items-center gap-1 font-bold hover:text-[#1A1F24] cursor-pointer">
                SLA muddati <ArrowUpDown className="w-3 h-3" />
              </button>
            </th>
            <th className="p-3 w-10 text-center">
              <span className="sr-only">Amallar</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E4E7EA]">
          {rows.map((r) => {
            const isSelected = selectedIds.includes(r.id);

            return (
              <tr
                key={r.id}
                className={`transition-colors hover:bg-[#F8F9FA] ${
                  isSelected ? 'bg-[#F0F7F1]' : ''
                }`}
              >
                {/* Checkbox */}
                <td className="p-3 text-center">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggleSelectRow(r.id)}
                    className="w-4 h-4 rounded border-[#767F87] text-[#2E7D4F] focus:ring-[#2E7D4F] cursor-pointer"
                  />
                </td>

                {/* Application Number */}
                <td className="p-3 font-mono font-bold">
                  <button
                    type="button"
                    onClick={() => onRowClick?.(r.appNo)}
                    className="text-[#2E7D4F] hover:underline font-bold text-xs cursor-pointer flex items-center gap-1"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    {r.appNo}
                  </button>
                </td>

                {/* Applicant */}
                <td className="p-3">
                  <strong className="block font-bold text-[#1A1F24]">{r.applicantName}</strong>
                  <span className="text-[11px] text-[#5A646D] font-mono">{r.applicantId}</span>
                </td>

                {/* Activity Type */}
                <td className="p-3 text-[#1A1F24] font-medium">{r.activityType}</td>

                {/* Contour */}
                <td className="p-3 font-mono">
                  <strong className="block font-bold text-[#1A1F24]">{r.contour}</strong>
                  <span className="text-[10px] text-[#5A646D] block font-sans">{r.contourLayer}</span>
                </td>

                {/* Area */}
                <td className="p-3 text-right font-mono font-bold text-[#1A1F24]">
                  {r.areaHa.toFixed(1)}
                </td>

                {/* Sum */}
                <td className="p-3 text-right font-mono font-bold text-[#123522]">
                  {r.sumAmount}
                </td>

                {/* Status Badge */}
                <td className="p-3">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#E0F2FE] text-[#0369A1] border border-[#BAE6FD]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0369A1]" />
                    <span>{r.statusText}</span>
                  </span>
                </td>

                {/* SLA Urgency Indicator */}
                <td className="p-3">
                  {r.slaState === 'overdue' ? (
                    <div className="bg-[#FEE2E2] border border-[#FCA5A5] rounded-lg p-2 text-[#991B1B] space-y-1 max-w-[200px]">
                      <div className="flex items-center gap-1 font-bold text-[11px]">
                        <AlertTriangle className="w-3.5 h-3.5 text-[#B91C1C] shrink-0" />
                        <span>{r.slaText}</span>
                        {r.riTag && (
                          <span className="ml-auto font-mono text-[9px] bg-[#B91C1C] text-white px-1 rounded">
                            {r.riTag}
                          </span>
                        )}
                      </div>
                      <span className="block text-[10px] text-[#7F1D1D] font-mono">{r.slaSubtext}</span>
                      <div className="h-1 bg-[#FCA5A5] rounded-full overflow-hidden">
                        <div className="h-full bg-[#B91C1C]" style={{ width: `${r.slaPercent}%` }} />
                      </div>
                    </div>
                  ) : r.slaState === 'due_today' ? (
                    <div className="bg-[#FEF3C7] border border-[#FDE68A] rounded-lg p-2 text-[#B45309] space-y-1 max-w-[200px]">
                      <div className="flex items-center gap-1 font-bold text-[11px]">
                        <Clock className="w-3.5 h-3.5 text-[#B45309] shrink-0" />
                        <span>{r.slaText}</span>
                      </div>
                      <span className="block text-[10px] text-[#92400E] font-mono">{r.slaSubtext}</span>
                      <div className="h-1 bg-[#FDE68A] rounded-full overflow-hidden">
                        <div className="h-full bg-[#B45309]" style={{ width: `${r.slaPercent}%` }} />
                      </div>
                    </div>
                  ) : (
                    <div className="text-[#15803D] font-medium text-[11px] space-y-0.5">
                      <span className="block font-bold">{r.slaText}</span>
                      <span className="block text-[10px] text-[#5A646D] font-mono">{r.slaSubtext}</span>
                    </div>
                  )}
                </td>

                {/* Actions Kebab Menu */}
                <td className="p-3 text-center">
                  <button
                    type="button"
                    onClick={() => onRowClick?.(r.appNo)}
                    className="p-1.5 rounded-lg text-[#5A646D] hover:text-[#1A1F24] hover:bg-[#E4E7EA] cursor-pointer"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
