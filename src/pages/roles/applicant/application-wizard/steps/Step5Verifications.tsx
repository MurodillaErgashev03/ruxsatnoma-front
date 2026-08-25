import React from 'react';
import { 
  CheckCircle2, 
  ShieldCheck, 
  Database, 
  Building2, 
  Map, 
  Activity, 
  RefreshCw,
  FileCheck2,
  Lock
} from 'lucide-react';

export interface Step5VerificationsProps {
  onRevalidate?: () => void;
}

export const Step5Verifications: React.FC<Step5VerificationsProps> = ({
  onRevalidate,
}) => {
  const CHECKS = [
    {
      id: 'oneid',
      title: 'OneID & Shaxs identifikatsiyasi',
      system: 'Davlat personallashtirish markazi (GBDCP)',
      desc: 'JShShIR 31205901234567, Saidov Otabek Shavkatovich — shaxs tasdiqlangan, taqiqlar yo‘q.',
      status: 'success',
      time: '0.8 soniya',
      icon: ShieldCheck,
    },
    {
      id: 'kadastr',
      title: 'Davlat Kadastri & O‘rmon chegaralari',
      system: 'Davlat kadastrlari palatasi (GIS integratsiya)',
      desc: '04-12-007 kontur Zangiota davlat o‘rmon xo‘jaligi chegaralariga 100% mos (ST_Within).',
      status: 'success',
      time: '1.2 soniya',
      icon: Map,
    },
    {
      id: 'overlap',
      title: 'GIS Bandlik va Kesishuv tekshiruvi',
      system: 'Server-side PostGIS ST_Overlaps',
      desc: 'Bo‘sh maydon: 18.5 ha. Amaldagi ruxsatnomalar bilan boshqa kesishuvlar mavjud emas.',
      status: 'success',
      time: '2.4 soniya',
      icon: Database,
    },
    {
      id: 'vet',
      title: 'Veterinariya axborot tizimi',
      system: 'Davlat veterinariya qo‘mitasi AT',
      desc: 'Chorva mollarining emlanganligi va hududda karantin cheklovlari yo‘qligi tasdiqlandi.',
      status: 'success',
      time: '1.1 soniya',
      icon: Activity,
    },
    {
      id: 'soliq',
      title: 'Soliq to‘lovlari va qarzdorlik nazorati',
      system: 'Davlat soliq qo‘mitasi (Soliq AT)',
      desc: 'O‘rmon fondi to‘lovlari va mahalliy soliqlar bo‘yicha muddati o‘tgan qarzdorlik aniqlanmadi.',
      status: 'success',
      time: '0.9 soniya',
      icon: Building2,
    },
    {
      id: 'duplicate',
      title: 'Dublikat ariza va takrorlanish nazorati',
      system: 'DB Constraint (applicant + contour + period)',
      desc: 'Ushbu kontur va muddat oralig‘ida faol ariza mavjud emas (409 Conflict xavfi yo‘q).',
      status: 'success',
      time: '0.4 soniya',
      icon: Lock,
    },
  ];

  return (
    <div className="space-y-6 font-sans">
      {/* 1. Overall Status Card */}
      <div className="bg-gradient-to-r from-[#DCFCE7] via-[#F0FDF4] to-white border border-[#86EFAC] rounded-2xl p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#15803D] text-white flex items-center justify-center shadow-xs">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-[#14532D]">
                  Barcha avtomatik va idoralararo tekshiruvlar muvaffaqiyatli o‘tdi
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#15803D] text-white">
                  6 / 6 Tasdiqlandi
                </span>
              </div>
              <p className="text-xs text-[#166534] mt-0.5">
                Arizangiz qonuniy me’yorlarga to‘liq mos. Keyingi bosqichda E-IMZO orqali imzolab yuborishingiz mumkin.
              </p>
            </div>
          </div>

          <button
            onClick={() => onRevalidate?.()}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#86EFAC] text-xs font-bold text-[#15803D] hover:bg-[#F0FDF4] cursor-pointer shadow-2xs shrink-0"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Qayta tekshirish</span>
          </button>
        </div>
      </div>

      {/* 2. Detailed Checks List */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-2xs">
        <h3 className="text-sm font-bold text-[#1A1F24] mb-4 flex items-center gap-2">
          <FileCheck2 className="w-4 h-4 text-[#2E7D4F]" />
          Idoralararo axborot tizimlari javoblari va reglament protokoli
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CHECKS.map((check) => {
            const Icon = check.icon;
            return (
              <div
                key={check.id}
                className="p-4 rounded-xl border border-[#E4E7EA] bg-[#FBFDFB] hover:border-[#86EFAC] transition-all space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#DCFCE7] text-[#15803D] flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#1A1F24]">{check.title}</h4>
                      <span className="text-[10px] text-[#767F87]">{check.system}</span>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-[#15803D] bg-[#DCFCE7] px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Muvaffaqiyatli
                  </span>
                </div>

                <p className="text-xs text-[#5A646D] leading-relaxed pt-1">
                  {check.desc}
                </p>

                <div className="pt-2 border-t border-[#F1F3F5] flex items-center justify-between text-[10px] text-[#767F87]">
                  <span>Javob berish vaqti:</span>
                  <span className="font-semibold text-[#1A1F24]">{check.time} (reglament ≤ 5s)</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
