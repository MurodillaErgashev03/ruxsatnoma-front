import React, { useState } from 'react';
import { ChevronRight, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { Button } from '../../../components/ui/button';

export const RegionsBreakdownSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'region' | 'district' | 'leskhoz' | 'activity' | 'contour'>('region');

  const rows = [
    {
      id: 1,
      nameUz: 'Qashqadaryo viloyati',
      nameRu: 'Қашқадарё',
      submitted: '3 120',
      issued: '2 540',
      rejected: '386',
      revenue: '921 400 000',
      occupancy: 71,
      avgDays: '9,8',
      slaStatus: 'norm',
      slaLabel: '97,9 % в норме',
    },
    {
      id: 2,
      nameUz: 'Toshkent viloyati',
      nameRu: 'Тошкент',
      submitted: '2 860',
      issued: '2 305',
      rejected: '401',
      revenue: '848 720 000',
      occupancy: 78,
      avgDays: '11,4',
      slaStatus: 'violation',
      slaLabel: '95,4 % нарушение',
    },
    {
      id: 3,
      nameUz: 'Samarqand viloyati',
      nameRu: 'Самарқанд',
      submitted: '2 240',
      issued: '1 812',
      rejected: '297',
      revenue: '654 300 000',
      occupancy: 64,
      avgDays: '8,9',
      slaStatus: 'norm',
      slaLabel: '98,2 % в норме',
    },
    {
      id: 4,
      nameUz: 'Surxondaryo viloyati',
      nameRu: 'Сурхондарё',
      submitted: '2 010',
      issued: '1 604',
      rejected: '268',
      revenue: '578 950 000',
      occupancy: 69,
      avgDays: '10,2',
      slaStatus: 'risk',
      slaLabel: '96,6 % риск',
    },
    {
      id: 5,
      nameUz: 'Jizzax viloyati',
      nameRu: 'Жиззах',
      submitted: '1 880',
      issued: '1 488',
      rejected: '241',
      revenue: '531 640 000',
      occupancy: 66,
      avgDays: '10,9',
      slaStatus: 'violation',
      slaLabel: '96,1 % нарушение',
    },
    {
      id: 6,
      nameUz: 'Namangan viloyati',
      nameRu: 'Наманган',
      submitted: '1 640',
      issued: '1 346',
      rejected: '189',
      revenue: '470 210 000',
      occupancy: 58,
      avgDays: '7,6',
      slaStatus: 'norm',
      slaLabel: '98,8 % в норме',
    },
    {
      id: 7,
      nameUz: 'Navoiy viloyati',
      nameRu: 'Навоий',
      submitted: '1 425',
      issued: '1 152',
      rejected: '176',
      revenue: '402 880 000',
      occupancy: 52,
      avgDays: '8,1',
      slaStatus: 'norm',
      slaLabel: '98,5 % в норме',
    },
    {
      id: 8,
      nameUz: 'Qoraqalpogʻiston Respublikasi',
      nameRu: 'Қорақалпоғистон',
      submitted: '1 190',
      issued: '934',
      rejected: '158',
      revenue: '318 460 000',
      occupancy: 47,
      avgDays: '9,3',
      slaStatus: 'risk',
      slaLabel: '97,3 % риск',
    },
  ];

  return (
    <div className="space-y-4 font-sans">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#1A1F24]">Разрез: области</h2>
      </div>

      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#E4E7EA] pb-3">
          <div>
            <h3 className="text-base font-bold text-[#1A1F24]">Показатели по областям</h3>
            <p className="text-xs text-[#5A646D] mt-0.5">
              С начала 2026 года · показаны 8 областей из 14 по числу заявок
            </p>
          </div>
          <span className="text-xs font-semibold text-[#5A646D] bg-[#F8F9FA] px-2.5 py-1 rounded-md border border-[#767F87]">
            ▤ Служебный разрез
          </span>
        </div>

        {/* Drill-down level tabs */}
        <div className="flex border-b border-[#E4E7EA] gap-1 overflow-x-auto text-xs font-medium text-[#5A646D]">
          {[
            { id: 'region', label: 'Области', count: '14' },
            { id: 'district', label: 'Районы', count: '208' },
            { id: 'leskhoz', label: 'Лесхозы', count: '84' },
            { id: 'activity', label: 'Виды деятельности', count: '6' },
            { id: 'contour', label: 'Контуры', count: '3 412' },
          ].map((tab) => {
            const isSel = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-3 flex items-center gap-1.5 border-b-2 transition-all cursor-pointer ${
                  isSel
                    ? 'border-[#2E7D4F] text-[#123522] font-bold bg-[#F0F7F1]/50'
                    : 'border-transparent hover:text-[#1A1F24] hover:bg-[#F8F9FA]'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${isSel ? 'bg-[#D9EBDC] text-[#123522]' : 'bg-[#E4E7EA] text-[#5A646D]'}`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse min-w-[840px]">
            <thead>
              <tr className="border-b border-[#767F87] text-[#5A646D] uppercase tracking-wider font-bold">
                <th className="py-2.5 px-3">Область</th>
                <th className="py-2.5 px-3 text-right">Заявок</th>
                <th className="py-2.5 px-3 text-right">Выдано</th>
                <th className="py-2.5 px-3 text-right">Отказано</th>
                <th className="py-2.5 px-3 text-right">Собрано, сум</th>
                <th className="py-2.5 px-3 text-right">Занятость</th>
                <th className="py-2.5 px-3 text-right">Ср. срок, дн.</th>
                <th className="py-2.5 px-3">SLA</th>
                <th className="py-2.5 px-3 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E7EA]">
              {rows.map((row) => (
                <tr key={row.id} className="hover:bg-[#F8F9FA] transition-all">
                  <td className="py-3 px-3">
                    <div className="font-bold text-[#1A1F24]">{row.nameRu}</div>
                    <div className="text-[11px] text-[#5A646D]">{row.nameUz}</div>
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-[#1A1F24]">{row.submitted}</td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-[#15803D]">{row.issued}</td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-[#B91C1C]">{row.rejected}</td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-[#123522]">{row.revenue}</td>
                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-16 h-2 rounded-full bg-[#E4E7EA] overflow-hidden">
                        <div
                          className={`h-full rounded-full ${row.occupancy > 75 ? 'bg-[#B45309]' : 'bg-[#2E7D4F]'}`}
                          style={{ width: `${row.occupancy}%` }}
                        />
                      </div>
                      <span className="font-mono font-bold text-[11px] text-[#1A1F24]">{row.occupancy} %</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-[#1A1F24]">{row.avgDays}</td>
                  <td className="py-3 px-3">
                    {row.slaStatus === 'norm' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-[#DCFCE7] text-[#15803D] border border-[#86EFAC]">
                        <CheckCircle2 className="w-3 h-3" /> {row.slaLabel}
                      </span>
                    )}
                    {row.slaStatus === 'risk' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A]">
                        <AlertTriangle className="w-3 h-3" /> {row.slaLabel}
                      </span>
                    )}
                    {row.slaStatus === 'violation' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-[#FEF2F2] text-[#B91C1C] border border-[#FECDD3]">
                        <XCircle className="w-3 h-3" /> {row.slaLabel}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      type="button"
                      onClick={() => alert(`${row.nameUz} tumanlar kesimi ochilmoqda...`)}
                      className="inline-flex items-center gap-1 text-[#2E7D4F] font-bold hover:underline cursor-pointer text-xs"
                    >
                      <span>Детали</span> <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pt-2 text-center">
          <Button variant="outline" size="sm" className="border-[#767F87] text-[#1A1F24] hover:bg-[#F8F9FA] text-xs font-bold">
            Показать все 14 областей
          </Button>
        </div>
      </div>
    </div>
  );
};
