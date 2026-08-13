import React from 'react';
import { Printer, AlertTriangle, UserCheck, FileText } from 'lucide-react';
import { Button } from '../../../components/ui/button';

export const GeneralInfoPanel: React.FC = () => {
  return (
    <section id="s-general" className="bg-white border border-[#E4E7EA] rounded-2xl shadow-xs font-sans overflow-hidden">
      {/* Panel Header */}
      <div className="p-6 border-b border-[#E4E7EA] flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-[#1A1F24]">1. Umumiy maʼlumotlar</h2>
          <p className="text-xs text-[#5A646D] mt-0.5">Arizachi va ariza rekvizitlari, OneID va E-IMZO tekshiruvi statusi</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          leftIcon={<Printer className="w-4 h-4" />}
          onClick={() => window.print()}
          className="cursor-pointer font-semibold"
        >
          Kartochkani chop etish
        </Button>
      </div>

      {/* Panel Body */}
      <div className="p-6 space-y-6">
        {/* KV Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Column 1: Applicant */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#5A646D] border-b border-[#E4E7EA] pb-2 flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-[#2E7D4F]" /> Arizachi maʼlumotlari
            </h3>
            <dl className="grid grid-cols-1 sm:grid-cols-3 gap-y-3 gap-x-2 text-xs">
              <dt className="text-[#5A646D]">F.I.SH:</dt>
              <dd className="sm:col-span-2 font-bold text-[#1A1F24]">Aziz Karimov</dd>

              <dt className="text-[#5A646D]">JSHSHIR (PINFL):</dt>
              <dd className="sm:col-span-2 font-mono font-semibold text-[#1A1F24]">
                31207854315218
                <span className="block text-[11px] font-normal text-[#5A646D]">14 raqamli, Aholisi reyestri bilan solishtirilgan</span>
              </dd>

              <dt className="text-[#5A646D]">Pasport seriyasi:</dt>
              <dd className="sm:col-span-2 font-mono font-semibold text-[#1A1F24]">
                AA 4310572
                <span className="block text-[11px] font-normal text-[#5A646D]">19.05.2019-yilda Boʻstonliq tumani IIB tomonidan berilgan</span>
              </dd>

              <dt className="text-[#5A646D]">Identifikatsiya:</dt>
              <dd className="sm:col-span-2 font-semibold text-[#15803D]">
                OneID orqali tasdiqlangan
                <span className="block text-[11px] font-normal text-[#5A646D]">22.07.2026, 09:41-da muvaffaqiyatli solishtirildi</span>
              </dd>

              <dt className="text-[#5A646D]">Telefon raqami:</dt>
              <dd className="sm:col-span-2 font-mono font-semibold text-[#1A1F24]">+998 90 214 41 27</dd>

              <dt className="text-[#5A646D]">Yashash manzili:</dt>
              <dd className="sm:col-span-2 font-medium text-[#1A1F24]">
                Toshkent viloyati, Boʻstonliq tumani, Xumson KFY
                <span className="block text-[11px] font-normal text-[#5A646D]">Oʻrmon xoʻjaligi hududi chegarasida yashaydi</span>
              </dd>

              <dt className="text-[#5A646D]">Imtiyozli kategoriya:</dt>
              <dd className="sm:col-span-2 text-[#5A646D]">
                Mavjud emas
                <span className="block text-[11px] text-[#767F87]">VMQ 278-sonli chegirma qoʻllanilmaydi</span>
              </dd>

              <dt className="text-[#5A646D]">Vakil orqali:</dt>
              <dd className="sm:col-span-2 text-[#5A646D]">
                Yoʻq (Shaxsan topshirilgan)
                <span className="block text-[11px] text-[#767F87]">Ishtirok etish ishonchnomasi talab etilmaydi</span>
              </dd>
            </dl>
          </div>

          {/* Column 2: Application Details */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#5A646D] border-b border-[#E4E7EA] pb-2 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-[#2E7D4F]" /> Ariza paramertlari
            </h3>
            <dl className="grid grid-cols-1 sm:grid-cols-3 gap-y-3 gap-x-2 text-xs">
              <dt className="text-[#5A646D]">Ariza raqami:</dt>
              <dd className="sm:col-span-2 font-mono font-bold text-[#1A1F24]">А-00042</dd>

              <dt className="text-[#5A646D]">Faoliyat turi:</dt>
              <dd className="sm:col-span-2 font-bold text-[#2E7D4F]">Chorva mollarini boqish (Yaylov)</dd>

              <dt className="text-[#5A646D]">Soʻralgan davr:</dt>
              <dd className="sm:col-span-2 font-mono font-bold text-[#1A1F24]">
                01.09.2026 — 30.11.2026
                <span className="block text-[11px] font-normal text-[#5A646D]">91 kun (3 toʻliq oy)</span>
              </dd>

              <dt className="text-[#5A646D]">Soʻralgan maydon:</dt>
              <dd className="sm:col-span-2 font-mono font-bold text-[#1A1F24]">12.50 gektar</dd>

              <dt className="text-[#5A646D]">Oʻrmon xoʻjaligi:</dt>
              <dd className="sm:col-span-2 font-medium text-[#1A1F24]">
                Boʻstonliq davlat oʻrmon xoʻjaligi
                <span className="block text-[11px] text-[#5A646D]">Xumson oʻrmonchiligi, 3-obxod, 14-kvartal</span>
              </dd>

              <dt className="text-[#5A646D]">Yuborish kanali:</dt>
              <dd className="sm:col-span-2 font-semibold text-[#1A1F24]">
                my.gov.uz (YEPGM API)
                <span className="block text-[11px] text-[#5A646D]">Raqamli elektron ariza formatida</span>
              </dd>

              <dt className="text-[#5A646D]">E-IMZO kaliti:</dt>
              <dd className="sm:col-span-[#15803D] font-mono font-semibold">
                Imzolangan va haqiqiy
                <span className="block text-[11px] text-[#5A646D]">Sertifikat: 5E:9A:C4:71, amal qilish muddati 14.02.2027</span>
              </dd>

              <dt className="text-[#5A646D]">Xavf koʻrsatkichi:</dt>
              <dd className="sm:col-span-2 text-[#15803D] font-medium">
                Xavf aniqlanmadi (Normal)
                <span className="block text-[11px] text-[#5A646D]">SLA buzilmadi, qoʻlda belgilangan xavflar yoʻq</span>
              </dd>
            </dl>
          </div>
        </div>

        {/* Warning Verdict Banner */}
        <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-xl p-4 flex items-start gap-3 text-xs text-[#B45309]">
          <AlertTriangle className="w-5 h-5 text-[#B45309] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-sm text-[#B45309]">
              Diqqat: Konturdagi boʻsh yaylov sigʻimi (MaxSB) minimal darajada!
            </h4>
            <p className="text-[#1A1F24] leading-relaxed">
              Ushbu ariza qanoatlantirilgach, Boʻstonliq 14-2 konturida umumiy 29 bosh usta birlikdan faqat{' '}
              <strong className="font-mono font-bold text-[#B45309]">0.40 bosh</strong> boʻsh joy qoladi.
              Ushbu davr uchun keyingi keladigan arizalarga avtomatik ravishda <code className="bg-white px-1.5 py-0.5 rounded border border-[#B45309]/30 font-mono text-[11px]">RJ-05 (Yaylov sigʻimi yetarli emas)</code> kodi bilan rad etish javobi shakllanadi. Batafsil hisob-kitob boʻlimida.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
