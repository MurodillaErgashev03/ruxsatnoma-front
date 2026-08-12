import React from 'react';
import { CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '../../../components/ui/button';

export const ChecksAndIntegrationsPanel: React.FC = () => {
  const autoChecks = [
    {
      id: 1,
      title: 'E-IMZO Raqamli Imzo Kaliti',
      desc: 'OʻzDSt 1135 raqamli elektron imzo sertifikati (5E:9A:C4:71) haqiqiy va davlat reyestridan oʻtgan.',
      status: 'ok',
    },
    {
      id: 2,
      title: 'Soliq Qoʻmitasi (Solik.uz) Qarzdorlik Tekshiruvi',
      desc: 'Soliq va majburiy toʻlovlar boʻyicha muddati oʻtgan qarzdorlik aniqlanmadi (Qarzsiz).',
      status: 'ok',
    },
    {
      id: 3,
      title: 'Aholisi Reyestri va OneID Identifikatsiya',
      desc: 'Arizachining JSHSHIR (31207854315218) passport maʼlumotlari bilan 100% mos keldi.',
      status: 'ok',
    },
    {
      id: 4,
      title: 'Kadastr va Topologik Chegara Kesishuvi (GIS)',
      desc: 'Soʻralayotgan uchastka 12.50 ha davlat oʻrmon fondi chegarasiga toʻliq tushadi, xususiy yerlar bilan kesishuv 0%.',
      status: 'ok',
    },
    {
      id: 5,
      title: 'Kontur Yaylov Sigʻimi (MaxSB) Tekshiruvi',
      desc: 'Konturdagi qolgan boʻsh zaxira 0.40 bosh. Ariza joylashtirilishi mumkin, lekin zaxira kritik darajaga yetadi.',
      status: 'warn',
    },
  ];

  return (
    <section id="s-checks" className="bg-white border border-[#E4E7EA] rounded-2xl shadow-xs font-sans overflow-hidden">
      {/* Panel Header */}
      <div className="p-6 border-b border-[#E4E7EA] flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-[#1A1F24]">4. Tizimlararo integratsiyalar va avto-tekshiruvlar</h2>
            <span className="text-xs font-semibold text-[#B45309] bg-[#FEF3C7] px-2.5 py-0.5 rounded-full border border-[#FDE68A]">
              1 ta ogohlantirish
            </span>
          </div>
          <p className="text-xs text-[#5A646D] mt-0.5">Davlat axborot tizimlari (OneID, Soliq, Kadastr, E-IMZO) avtomatlashtirilgan javoblari</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          leftIcon={<RefreshCw className="w-4 h-4" />}
          onClick={() => alert('Barcha integratsiya qayta soʻraldi')}
          className="cursor-pointer font-semibold text-xs"
        >
          Qayta soʻrov yuborish
        </Button>
      </div>

      {/* Panel Body */}
      <div className="p-6 space-y-6">
        {/* Auto checks checklist */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#5A646D]">
            Avtomatik avto-tekshiruvlar natijalari
          </h3>
          <div className="space-y-2">
            {autoChecks.map((item) => (
              <div
                key={item.id}
                className={`p-4 rounded-xl border flex items-start gap-3 transition-all ${
                  item.status === 'warn'
                    ? 'border-[#FDE68A] bg-[#FFFBEB]'
                    : 'border-[#E4E7EA] bg-white hover:border-[#2E7D4F]'
                }`}
              >
                {item.status === 'ok' ? (
                  <CheckCircle2 className="w-5 h-5 text-[#15803D] shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-[#B45309] shrink-0 mt-0.5" />
                )}

                <div className="space-y-1">
                  <div className="text-sm font-bold text-[#1A1F24] flex items-center gap-2">
                    <span>{item.title}</span>
                    {item.status === 'warn' && (
                      <span className="text-[10px] font-bold text-[#B45309] bg-white border border-[#B45309]/30 px-2 py-0.2 rounded-full">
                        Limit Minimal
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#5A646D] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Maker-Checker Pair Section */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#5A646D]">
            Ikki bosqichli tasdiq zanjiri (Maker-Checker Pair)
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Cell 1: Inspector / Specialist */}
            <div className="p-4 border border-[#767F87] rounded-xl bg-white space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#5A646D] block">
                1-Bosqich: Xodim / Mutaxassis (Maker)
              </span>
              <div className="text-sm font-bold text-[#1A1F24]">Dilnoza Abdullayeva</div>
              <div className="text-xs font-mono text-[#5A646D]">22.07.2026, 14:20:11 (IP: 213.230.98.14)</div>
              <div className="text-xs text-[#1A1F24] pt-1">
                <strong>Xulosa:</strong> Hujjatlar va xarita joylashuvi tekshirildi. Ijobiy koʻrib chiqish tavsiya qilindi.
              </div>
            </div>

            {/* Cell 2: Head / Manager */}
            <div className="p-4 border border-[#767F87] rounded-xl bg-white space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#5A646D] block">
                2-Bosqich: Rahbar / Tasdiqlovchi (Checker)
              </span>
              <div className="text-sm font-bold text-[#1A1F24]">Ergashev Botir Raximovich</div>
              <div className="text-xs font-mono text-[#5A646D]">Kutilmoqda (Koʻrib chiqish jarayonida)</div>
              <div className="text-xs text-[#5A646D] pt-1">
                <strong>Status:</strong> E-IMZO muhrlash jarayoni kutilmoqda.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
