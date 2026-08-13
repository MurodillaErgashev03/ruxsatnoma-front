import React from 'react';
import { AlertOctagon, ArrowRight } from 'lucide-react';

export const OverdueLeskhozSection: React.FC = () => {
  const rows = [
    {
      id: 1,
      nameUz: 'Boʻstonliq davlat oʻrmon xoʻjaligi',
      nameRu: 'Бўстонлиқ ДЎХ',
      regionRu: 'Тошкент',
      inWork: 214,
      overdue: 31,
      share: '14,5 %',
      avgDays: '17,2',
      oldestDays: 34,
      status: 'critical',
      statusLabel: 'Критично',
    },
    {
      id: 2,
      nameUz: 'Zomin davlat oʻrmon xoʻjaligi',
      nameRu: 'Зомин ДЎХ',
      regionRu: 'Жиззах',
      inWork: 168,
      overdue: 22,
      share: '13,1 %',
      avgDays: '16,4',
      oldestDays: 29,
      status: 'critical',
      statusLabel: 'Критично',
    },
    {
      id: 3,
      nameUz: 'Sherobod davlat oʻrmon xoʻjaligi',
      nameRu: 'Шеробод ДЎХ',
      regionRu: 'Сурхондарё',
      inWork: 143,
      overdue: 17,
      share: '11,9 %',
      avgDays: '15,8',
      oldestDays: 26,
      status: 'critical',
      statusLabel: 'Критично',
    },
    {
      id: 4,
      nameUz: 'Nurota davlat oʻrmon xoʻjaligi',
      nameRu: 'Нурота ДЎХ',
      regionRu: 'Навоий',
      inWork: 121,
      overdue: 12,
      share: '9,9 %',
      avgDays: '14,6',
      oldestDays: 22,
      status: 'warning',
      statusLabel: 'Требует внимания',
    },
    {
      id: 5,
      nameUz: 'Ohangaron davlat oʻrmon xoʻjaligi',
      nameRu: 'Оҳангарон ДЎХ',
      regionRu: 'Тошкент',
      inWork: 96,
      overdue: 8,
      share: '8,3 %',
      avgDays: '13,9',
      oldestDays: 19,
      status: 'warning',
      statusLabel: 'Требует внимания',
    },
    {
      id: 6,
      nameUz: 'Kosonsoy davlat oʻrmon xoʻjaligi',
      nameRu: 'Косонсой ДЎХ',
      regionRu: 'Наманган',
      inWork: 88,
      overdue: 6,
      share: '6,8 %',
      avgDays: '12,7',
      oldestDays: 17,
      status: 'warning',
      statusLabel: 'Требует внимания',
    },
    {
      id: 7,
      nameUz: 'Kitob davlat oʻrmon xoʻjaligi',
      nameRu: 'Китоб ДЎХ',
      regionRu: 'Қашқадарё',
      inWork: 74,
      overdue: 5,
      share: '6,8 %',
      avgDays: '12,1',
      oldestDays: 16,
      status: 'warning',
      statusLabel: 'Требует внимания',
    },
    {
      id: 8,
      nameUz: 'Xiva davlat oʻrmon xoʻjaligi',
      nameRu: 'Хива ДЎХ',
      regionRu: 'Хоразм',
      inWork: 61,
      overdue: 4,
      share: '6,6 %',
      avgDays: '11,8',
      oldestDays: 16,
      status: 'warning',
      statusLabel: 'Требует внимания',
    },
  ];

  return (
    <div className="space-y-4 font-sans">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#1A1F24]">Проблемные места</h2>
      </div>

      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#E4E7EA] pb-3">
          <div>
            <h3 className="text-base font-bold text-[#1A1F24] flex items-center gap-2">
              <AlertOctagon className="w-5 h-5 text-[#B91C1C]" />
              <span>Лесхозы с просрочкой срока рассмотрения</span>
            </h3>
            <p className="text-xs text-[#5A646D] mt-0.5">
              Заявки, вышедшие за 15 рабочих дней · сортировка по доле просроченных
            </p>
          </div>
          <span className="text-xs font-semibold text-[#5A646D] bg-[#F8F9FA] px-2.5 py-1 rounded-md border border-[#767F87]">
            ▤ Служебный разрез · вне открытых данных
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse min-w-[780px]">
            <thead>
              <tr className="border-b border-[#767F87] text-[#5A646D] uppercase tracking-wider font-bold">
                <th className="py-2.5 px-3">Лесхоз</th>
                <th className="py-2.5 px-3">Область</th>
                <th className="py-2.5 px-3 text-right">В работе</th>
                <th className="py-2.5 px-3 text-right">Просрочено</th>
                <th className="py-2.5 px-3 text-right">Доля</th>
                <th className="py-2.5 px-3 text-right">Ср. срок, дн.</th>
                <th className="py-2.5 px-3 text-right">Старейшая, дн.</th>
                <th className="py-2.5 px-3">Состояние</th>
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
                  <td className="py-3 px-3 font-semibold text-[#1A1F24]">{row.regionRu}</td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-[#1A1F24]">{row.inWork}</td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-[#B91C1C]">{row.overdue}</td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-[#B91C1C]">{row.share}</td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-[#1A1F24]">{row.avgDays}</td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-[#B91C1C]">{row.oldestDays}</td>
                  <td className="py-3 px-3">
                    {row.status === 'critical' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#FEF2F2] text-[#B91C1C] border border-[#FECDD3]">
                        {row.statusLabel}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A]">
                        {row.statusLabel}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      type="button"
                      onClick={() => alert(`${row.nameRu} arizalar roʻyxati ochilmoqda...`)}
                      className="inline-flex items-center gap-1 text-[#2E7D4F] font-bold hover:underline cursor-pointer text-xs"
                    >
                      <span>Заявки</span> <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pt-3 border-t border-[#E4E7EA] text-xs text-[#5A646D] leading-relaxed">
          Итого по восьми лесхозам: <strong>105 просроченных заявок</strong> из 692 по республике — <strong>15,2 % всей просрочки</strong>. Ещё 76 лесхозов укладываются в норматив.
        </div>
      </div>
    </div>
  );
};
