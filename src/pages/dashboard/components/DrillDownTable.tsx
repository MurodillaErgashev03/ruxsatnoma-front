import React, { useState } from 'react';
import { Layers, ChevronRight, Lock } from 'lucide-react';

export interface DrillDownTableProps {
  onDrillSelect?: (regionName: string) => void;
}

export const DrillDownTable: React.FC<DrillDownTableProps> = ({ onDrillSelect }) => {
  const [activeTab, setActiveTab] = useState<'region' | 'district' | 'leskhoz'>('region');

  const rows = [
    {
      id: 1,
      nameUz: 'Toshkent viloyati',
      nameRu: 'Ташкентская область',
      submitted: 4520,
      issued: 3890,
      rejected: 412,
      inProgress: 218,
      overdue: 86,
      revenue: '1.48 mlrd',
      occupancy: 78,
    },
    {
      id: 2,
      nameUz: 'Qashqadaryo viloyati',
      nameRu: 'Кашкадарьинская область',
      submitted: 3840,
      issued: 3120,
      rejected: 450,
      inProgress: 170,
      overdue: 100,
      revenue: '1.12 mlrd',
      occupancy: 64,
    },
    {
      id: 3,
      nameUz: 'Surxondaryo viloyati',
      nameRu: 'Сурхандарьинская область',
      submitted: 3410,
      issued: 2680,
      rejected: 410,
      inProgress: 178,
      overdue: 142,
      revenue: '980 mln',
      occupancy: 82,
    },
    {
      id: 4,
      nameUz: 'Fargʻona viloyati',
      nameRu: 'Ферганская область',
      submitted: 2950,
      issued: 2480,
      rejected: 310,
      inProgress: 110,
      overdue: 50,
      revenue: '840 mln',
      occupancy: 55,
    },
    {
      id: 5,
      nameUz: 'Samarqand viloyati',
      nameRu: 'Самаркандская область',
      submitted: 2810,
      issued: 2310,
      rejected: 320,
      inProgress: 120,
      overdue: 60,
      revenue: '790 mln',
      occupancy: 69,
    },
    {
      id: 6,
      nameUz: 'Buxoro viloyati (Masklangan / k-anonymity)',
      nameRu: 'Бухарская область',
      submitted: '< 5 ta ariza',
      issued: '< 5 ta',
      rejected: '0',
      inProgress: '1',
      overdue: '0',
      revenue: '12 mln',
      occupancy: 12,
      isMasked: true,
    },
  ];

  return (
    <div className="bg-white border border-[#E4E7EA] rounded-2xl p-5 shadow-xs font-sans space-y-4">
      {/* Header & Drill Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E4E7EA] pb-3">
        <div>
          <h3 className="text-base font-bold text-[#1A1F24] flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#2E7D4F]" /> Hududlar boʻyicha tahlil va kesimlar (Drill-Down)
          </h3>
          <p className="text-xs text-[#5A646D] mt-0.5">
            Respublika → Viloyat → Tuman → Oʻrmon xoʻjaligi ierarxik jadvali
          </p>
        </div>

        <div className="flex border border-[#E4E7EA] rounded-xl overflow-hidden text-xs bg-[#F8F9FA]">
          <button
            type="button"
            onClick={() => setActiveTab('region')}
            className={`px-3 py-1.5 font-bold cursor-pointer transition-all ${
              activeTab === 'region' ? 'bg-[#2E7D4F] text-white' : 'text-[#5A646D] hover:text-[#1A1F24]'
            }`}
          >
            Viloyatlar (14)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('district')}
            className={`px-3 py-1.5 font-bold cursor-pointer transition-all ${
              activeTab === 'district' ? 'bg-[#2E7D4F] text-white' : 'text-[#5A646D] hover:text-[#1A1F24]'
            }`}
          >
            Tumanlar (208)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('leskhoz')}
            className={`px-3 py-1.5 font-bold cursor-pointer transition-all ${
              activeTab === 'leskhoz' ? 'bg-[#2E7D4F] text-white' : 'text-[#5A646D] hover:text-[#1A1F24]'
            }`}
          >
            Oʻrmon xoʻjaliklari (98)
          </button>
        </div>
      </div>

      {/* Drill Down Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-[#767F87] text-[#5A646D] uppercase tracking-wider font-bold">
              <th className="py-2.5 px-3">Hudud nomi</th>
              <th className="py-2.5 px-3 text-right">Topshirilgan</th>
              <th className="py-2.5 px-3 text-right">Berilgan</th>
              <th className="py-2.5 px-3 text-right">Rad etilgan</th>
              <th className="py-2.5 px-3 text-right">Jarayonda</th>
              <th className="py-2.5 px-3 text-right">Muddati oʻtgan</th>
              <th className="py-2.5 px-3 text-right">Jamlangan toʻlov</th>
              <th className="py-2.5 px-3 text-right">Bandlik %</th>
              <th className="py-2.5 px-3 text-center">Batafsil</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E4E7EA]">
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-[#F8F9FA] transition-all">
                <td className="py-3 px-3">
                  <div className="font-bold text-[#1A1F24]">{row.nameUz}</div>
                  <div className="text-[11px] text-[#5A646D]">{row.nameRu}</div>
                </td>

                <td className="py-3 px-3 text-right font-mono font-bold text-[#1A1F24]">
                  {row.isMasked ? (
                    <span className="text-[#5A646D] italic flex items-center justify-end gap-1">
                      <Lock className="w-3 h-3 text-[#9AA3AB]" /> {row.submitted}
                    </span>
                  ) : (
                    row.submitted
                  )}
                </td>

                <td className="py-3 px-3 text-right font-mono font-bold text-[#15803D]">
                  {row.issued}
                </td>

                <td className="py-3 px-3 text-right font-mono font-bold text-[#B91C1C]">
                  {row.rejected}
                </td>

                <td className="py-3 px-3 text-right font-mono font-bold text-[#0369A1]">
                  {row.inProgress}
                </td>

                <td className="py-3 px-3 text-right font-mono font-bold text-[#B91C1C]">
                  <span className={Number(row.overdue) > 100 ? 'bg-[#FEF2F2] px-1.5 py-0.5 rounded border border-[#B91C1C]' : ''}>
                    {row.overdue}
                  </span>
                </td>

                <td className="py-3 px-3 text-right font-mono font-bold text-[#123522]">
                  {row.revenue}
                </td>

                <td className="py-3 px-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div className="w-16 h-2 rounded-full bg-[#E4E7EA] overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          row.occupancy > 75 ? 'bg-[#B45309]' : 'bg-[#2E7D4F]'
                        }`}
                        style={{ width: `${row.occupancy}%` }}
                      />
                    </div>
                    <span className="font-mono font-bold text-[11px] text-[#1A1F24]">
                      {row.occupancy}%
                    </span>
                  </div>
                </td>

                <td className="py-3 px-3 text-center">
                  <button
                    type="button"
                    onClick={() => onDrillSelect?.(row.nameUz)}
                    className="inline-flex items-center gap-1 text-[#2E7D4F] font-bold hover:underline cursor-pointer"
                  >
                    <span>Tumanlar</span> <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* k-anonymity Note */}
      <div className="pt-3 border-t border-[#E4E7EA] text-[11px] text-[#5A646D] flex flex-wrap items-center justify-between gap-2">
        <span>
          * k-anonymity himoyasi: 5 tadan kam boʻlgan ma'lumotlar maxfiylikni saqlash uchun masklangan.
        </span>
        <button
          type="button"
          onClick={() => alert('Excel yuklab olindi!')}
          className="text-[#2E7D4F] font-bold hover:underline cursor-pointer"
        >
          Barcha 14 viloyatni Excel faylida yuklash (XLSX)
        </button>
      </div>
    </div>
  );
};
