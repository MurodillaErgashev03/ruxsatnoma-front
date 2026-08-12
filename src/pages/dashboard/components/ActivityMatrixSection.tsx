import React from 'react';
import { Eye, Lock, HelpCircle } from 'lucide-react';

export const ActivityMatrixSection: React.FC = () => {
  return (
    <div className="space-y-4 font-sans">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#1A1F24]">Разрез: виды деятельности по областям</h2>
      </div>

      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#E4E7EA] pb-3">
          <div>
            <h3 className="text-base font-bold text-[#1A1F24]">
              Выданные разрешения: вид деятельности × область
            </h3>
            <p className="text-xs text-[#5A646D] mt-0.5">
              Показаны 4 области из 14. Итог — по всей республике
            </p>
          </div>
          <span className="text-xs font-semibold text-[#0369A1] bg-[#F0F9FF] px-2.5 py-1 rounded-md border border-[#BAE6FD] flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-[#0369A1]" /> Открытые данные · k-anonymity включена
          </span>
        </div>

        {/* Matrix Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse min-w-[760px]">
            <thead>
              <tr className="border-b border-[#767F87] text-[#5A646D] uppercase tracking-wider font-bold">
                <th className="py-2.5 px-3">Вид деятельности</th>
                <th className="py-2.5 px-3 text-right">ТОШКЕНТ</th>
                <th className="py-2.5 px-3 text-right">САМАРҚАНД</th>
                <th className="py-2.5 px-3 text-right">ҚАШҚАДАРЁ</th>
                <th className="py-2.5 px-3 text-right">НАМАНГАН</th>
                <th className="py-2.5 px-3 text-right">ИТОГО ПО РЕСПУБЛИКЕ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E7EA]">
              <tr>
                <td className="py-3 px-3">
                  <div className="font-bold text-[#1A1F24]">Выпас скота</div>
                  <div className="text-[11px] text-[#5A646D]">Чорва молларини боқиш</div>
                </td>
                <td className="py-3 px-3 text-right font-mono font-bold text-[#1A1F24]">1 840</td>
                <td className="py-3 px-3 text-right font-mono font-bold text-[#1A1F24]">1 210</td>
                <td className="py-3 px-3 text-right font-mono font-bold text-[#1A1F24]">2 060</td>
                <td className="py-3 px-3 text-right font-mono font-bold text-[#1A1F24]">930</td>
                <td className="py-3 px-3 text-right font-mono font-extrabold text-[#123522]">10 262</td>
              </tr>

              <tr>
                <td className="py-3 px-3">
                  <div className="font-bold text-[#1A1F24]">Сенокошение</div>
                  <div className="text-[11px] text-[#5A646D]">Пичан ўриш</div>
                </td>
                <td className="py-3 px-3 text-right font-mono font-bold text-[#1A1F24]">620</td>
                <td className="py-3 px-3 text-right font-mono font-bold text-[#1A1F24]">480</td>
                <td className="py-3 px-3 text-right font-mono font-bold text-[#1A1F24]">710</td>
                <td className="py-3 px-3 text-right font-mono font-bold text-[#1A1F24]">390</td>
                <td className="py-3 px-3 text-right font-mono font-extrabold text-[#123522]">3 954</td>
              </tr>

              <tr>
                <td className="py-3 px-3">
                  <div className="font-bold text-[#1A1F24]">Сбор дров и хвороста</div>
                  <div className="text-[11px] text-[#5A646D]">Ўтин ва шох-шабба йиғиш</div>
                </td>
                <td className="py-3 px-3 text-right font-mono font-bold text-[#1A1F24]">285</td>
                <td className="py-3 px-3 text-right font-mono font-bold text-[#1A1F24]">190</td>
                <td className="py-3 px-3 text-right font-mono font-bold text-[#1A1F24]">240</td>
                <td className="py-3 px-3 text-right font-mono font-bold text-[#1A1F24]">175</td>
                <td className="py-3 px-3 text-right font-mono font-extrabold text-[#123522]">1 779</td>
              </tr>

              <tr>
                <td className="py-3 px-3">
                  <div className="font-bold text-[#1A1F24]">Размещение пчелиных ульев</div>
                  <div className="text-[11px] text-[#5A646D]">Асалари уяларини жойлаштириш</div>
                </td>
                <td className="py-3 px-3 text-right font-mono font-bold text-[#1A1F24]">170</td>
                <td className="py-3 px-3 text-right font-mono font-bold text-[#1A1F24]">220</td>
                <td className="py-3 px-3 text-right font-mono font-bold text-[#1A1F24]">95</td>
                <td className="py-3 px-3 text-right font-mono font-bold text-[#1A1F24]">140</td>
                <td className="py-3 px-3 text-right font-mono font-extrabold text-[#123522]">1 078</td>
              </tr>

              <tr>
                <td className="py-3 px-3">
                  <div className="font-bold text-[#1A1F24]">Рекреация</div>
                  <div className="text-[11px] text-[#5A646D]">Дам олиш ва рекреация</div>
                </td>
                <td className="py-3 px-3 text-right font-mono font-bold text-[#1A1F24]">118</td>
                <td className="py-3 px-3 text-right font-mono font-bold text-[#1A1F24]">64</td>
                {/* Masked Cell */}
                <td className="py-3 px-3 text-right bg-[#F8F9FA] border border-[#E4E7EA]">
                  <span className="inline-flex items-center gap-1 text-[11px] italic text-[#5A646D]">
                    <Lock className="w-3 h-3 text-[#9AA3AB]" /> Данных недостаточно для отображения
                  </span>
                </td>
                <td className="py-3 px-3 text-right font-mono font-bold text-[#1A1F24]">41</td>
                <td className="py-3 px-3 text-right font-mono font-extrabold text-[#123522]">683</td>
              </tr>

              <tr>
                <td className="py-3 px-3">
                  <div className="font-bold text-[#1A1F24]">Научные исследования</div>
                  <div className="text-[11px] text-[#5A646D]">Илмий тадқиқотлар</div>
                </td>
                <td className="py-3 px-3 text-right font-mono font-bold text-[#1A1F24]">37</td>
                <td className="py-3 px-3 text-right font-mono font-bold text-[#1A1F24]">22</td>
                {/* Masked Cell */}
                <td className="py-3 px-3 text-right bg-[#F8F9FA] border border-[#E4E7EA]">
                  <span className="inline-flex items-center gap-1 text-[11px] italic text-[#5A646D]">
                    <Lock className="w-3 h-3 text-[#9AA3AB]" /> Данных недостаточно для отображения
                  </span>
                </td>
                {/* Masked Cell */}
                <td className="py-3 px-3 text-right bg-[#F8F9FA] border border-[#E4E7EA]">
                  <span className="inline-flex items-center gap-1 text-[11px] italic text-[#5A646D]">
                    <Lock className="w-3 h-3 text-[#9AA3AB]" /> Данных недостаточно для отображения
                  </span>
                </td>
                <td className="py-3 px-3 text-right font-mono font-extrabold text-[#123522]">216</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* k-anonymity Explanation Footnote */}
        <div className="pt-3 border-t border-[#E4E7EA] space-y-2 text-xs text-[#5A646D] leading-relaxed">
          <p>
            <strong>▦ Правило k-anonymity:</strong> Разрез, в котором число записей меньше порога, в открытой статистике не раскрывается. Вместо числа выводится фраза «Данных недостаточно для отображения» — не ноль va не пустая ячейка.
          </p>
          <div className="inline-flex items-center gap-1.5 text-[#B45309] font-bold bg-[#FFFBEB] px-2.5 py-1 rounded border border-[#FDE68A]">
            <HelpCircle className="w-3.5 h-3.5" /> Вопрос П9 открыт: Значение порога k Заказчиком не утверждено. В макете принято условное k = 5.
          </div>
        </div>
      </div>
    </div>
  );
};
