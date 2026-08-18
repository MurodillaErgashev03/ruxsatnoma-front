import React, { useState } from 'react';
import { Check, X, Minus } from 'lucide-react';

export const InspectionChecklistCard: React.FC = () => {
  const [answers, setAnswers] = useState<Record<number, 'ok' | 'bad' | 'na'>>({
    1: 'ok',
    2: 'bad',
    3: 'bad',
    4: 'ok',
    5: 'na',
  });

  const handleToggle = (id: number, val: 'ok' | 'bad' | 'na') => {
    setAnswers((prev) => ({ ...prev, [id]: val }));
  };

  const questions = [
    { id: 1, text: 'Ruxsatnoma taqdim etildi va amal qilmoqda' },
    { id: 2, text: 'Faoliyat kontur chegaralarida olib borilmoqda' },
    { id: 3, text: 'Chorva bosh soni ruxsatnomaga mos keladi' },
    { id: 4, text: 'Yongʻin xavfsizligi qoidalariga rioya qilingan' },
    { id: 5, text: 'Mollarga veterinariya hujjatlari mavjud' },
  ];

  return (
    <div className="bg-white border border-[#E4E7EA] rounded-2xl p-4 shadow-xs font-sans space-y-4">
      <div className="flex items-center justify-between border-b border-[#E4E7EA] pb-2">
        <h3 className="text-sm font-bold text-[#1A1F24]">Tekshirish чек-листи</h3>
        <span className="text-xs text-[#5A646D] font-mono">5 dan 5 ta toʻldirildi</span>
      </div>

      <div className="space-y-4">
        {questions.map((q) => {
          const current = answers[q.id];
          return (
            <div key={q.id} className="space-y-2 border-b border-[#E4E7EA] pb-3 last:border-none last:pb-0">
              <div className="text-xs font-semibold text-[#1A1F24]">
                <span className="text-[#5A646D] font-normal">{q.id}.</span> {q.text}
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleToggle(q.id, 'ok')}
                  className={`h-11 rounded-xl border text-xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                    current === 'ok'
                      ? 'bg-[#2E7D4F] border-[#2E7D4F] text-white shadow-xs'
                      : 'bg-white border-[#767F87] text-[#1A1F24] hover:bg-[#F8F9FA]'
                  }`}
                >
                  <Check className="w-4 h-4" /> Mos
                </button>

                <button
                  type="button"
                  onClick={() => handleToggle(q.id, 'bad')}
                  className={`h-11 rounded-xl border text-xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                    current === 'bad'
                      ? 'bg-[#B91C1C] border-[#B91C1C] text-white shadow-xs'
                      : 'bg-white border-[#767F87] text-[#1A1F24] hover:bg-[#F8F9FA]'
                  }`}
                >
                  <X className="w-4 h-4" /> Buzilish
                </button>

                <button
                  type="button"
                  onClick={() => handleToggle(q.id, 'na')}
                  className={`h-11 rounded-xl border text-xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                    current === 'na'
                      ? 'bg-[#5A646D] border-[#5A646D] text-white shadow-xs'
                      : 'bg-white border-[#767F87] text-[#1A1F24] hover:bg-[#F8F9FA]'
                  }`}
                >
                  <Minus className="w-4 h-4" /> Taalluqli emas
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
