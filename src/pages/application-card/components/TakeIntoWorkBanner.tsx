import React from 'react';
import { ShieldAlert, ArrowRight, CheckCircle2, PauseCircle, Lock } from 'lucide-react';
import { Button } from '../../../components/ui/button';

export interface TakeIntoWorkBannerProps {
  onTakeIntoWork?: () => void;
}

export const TakeIntoWorkBanner: React.FC<TakeIntoWorkBannerProps> = ({
  onTakeIntoWork,
}) => {
  return (
    <div className="bg-[#FFFBEB] border-2 border-[#B45309] rounded-3xl p-6 lg:p-8 shadow-md space-y-6 font-sans">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-full border-2 border-[#B45309] bg-white text-[#B45309] flex items-center justify-center font-bold text-2xl shrink-0 shadow-xs">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#B45309] bg-white px-3 py-1 rounded-full border border-[#B45309]/30">
                2-HOLAT · ARIZA KOʻRIB CHIQISHGA OLINGAN EMAS
              </span>
            </div>
            <h3 className="text-xl font-bold text-[#B45309]">
              Ariza A-00044 hali birorta masʼul ijrochiga biriktirilmagan
            </h3>
            <p className="text-xs md:text-sm text-[#1A1F24] leading-relaxed max-w-3xl">
              Ushbu ariza boʻyicha qaror qabul qilish, E-IMZO bilan imzolash va javob yuborish uchun avval uni oʻzingizning ijroingizga qabul qilishingiz kerak.
            </p>
          </div>
        </div>

        <Button
          variant="primary"
          size="lg"
          rightIcon={<ArrowRight className="w-5 h-5" />}
          onClick={onTakeIntoWork}
          className="bg-[#2E7D4F] hover:bg-[#23653F] text-white font-bold h-14 px-8 rounded-2xl shrink-0 cursor-pointer shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02]"
        >
          Koʻrib chiqishga olish (Принять в работу)
        </Button>
      </div>

      {/* Locked & Read-only Status Explanations Grid */}
      <div className="pt-4 border-t border-[#B45309]/30 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div className="bg-white p-3 rounded-xl border border-[#FDE68A] space-y-1">
          <div className="font-bold text-[#15803D] flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#15803D]" /> 1. Oʻqish uchun ochiq
          </div>
          <p className="text-[#5A646D] leading-tight">Arizachi maʼlumotlari va ilova hujjatlar oʻqib chiqish uchun ochiq.</p>
        </div>

        <div className="bg-white p-3 rounded-xl border border-[#FDE68A] space-y-1">
          <div className="font-bold text-[#B45309] flex items-center gap-1.5">
            <PauseCircle className="w-4 h-4 text-[#B45309]" /> 2. Dastlabki hisob
          </div>
          <p className="text-[#5A646D] leading-tight">Hisob-kitob koʻrsatilgan, yakuniy norma ijroga olingach kuchga kiradi.</p>
        </div>

        <div className="bg-white p-3 rounded-xl border border-[#FDE68A] space-y-1">
          <div className="font-bold text-[#B45309] flex items-center gap-1.5">
            <PauseCircle className="w-4 h-4 text-[#B45309]" /> 3. Tizim soʻrovlari
          </div>
          <p className="text-[#5A646D] leading-tight">Kadastr va Soliq soʻrovlari ijroga olingach qayta yangilanadi.</p>
        </div>

        <div className="bg-white p-3 rounded-xl border border-[#FDE68A] space-y-1">
          <div className="font-bold text-[#B91C1C] flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-[#B91C1C]" /> 4. Qaror berish bloklangan
          </div>
          <p className="text-[#5A646D] leading-tight">Tasdiqlash va E-IMZO muhrlash tugmalari ijroga olingach faollashadi.</p>
        </div>
      </div>
    </div>
  );
};
