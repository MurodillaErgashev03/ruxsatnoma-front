import React from 'react';
import {
  Plus,
  CreditCard,
  Clock,
  Upload,
  MessageSquare,
  MapPin,
  RotateCcw,
  AlertCircle,
} from 'lucide-react';
import { Button } from '../../../components/ui/button';

export interface ApplicantDashboardProps {
  userName?: string;
  userOrg?: string;
  onNavigate?: (page: string, params?: any) => void;
}

export const ApplicantDashboard: React.FC<ApplicantDashboardProps> = ({
  userName = 'Saidov Otabek Shavkatovich',
  userOrg = '«Chorvador-Sardor» fermer xoʻjaligi',
  onNavigate,
}) => {
  return (
    <div className="space-y-10 font-sans pb-12">
      {/* ── 1. Onboarding Section at the Very Top (applicant-cabinet.html onboarding design) ── */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-xs text-[#5A646D]">
          <span className="px-2.5 py-1 rounded-full bg-white border border-[#E4E7EA] font-semibold text-[#1A1F24] uppercase text-[10px] shadow-2xs">
            ◻ EKRAN HOLATI (ONBOARDING YOʻRIQNOMASI)
          </span>
          <span>Siz birorta ariza topshirmagan boʻlsangiz ham — tizim tartibini tushuntiruvchi boʻlim.</span>
        </div>

        <div className="bg-white border border-[#E4E7EA] rounded-3xl p-8 lg:p-12 shadow-xs space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl lg:text-3xl font-bold text-[#1A1F24]">
              Xush kelibsiz, {userName.split(' ')[1] || 'Dilshod'} Normatovich!
            </h2>
            <p className="text-sm text-[#5A646D] leading-relaxed">
              Bu yerda oʻrmon fondidan foydalanish ruxsatnomalari rasmiylashtiriladi: chorva boqish, pichan oʻrish, asalari uyalari, dam olish, oʻtin yigʻish va ilmiy tadqiqotlar. Hozircha sizda birorta ham ariza yoʻq — birinchisidan boshlaymiz.
            </p>
          </div>

          {/* 3 Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center space-y-2">
              <div className="w-11 h-11 rounded-full bg-[#F0F7F1] border-2 border-[#2E7D4F] text-[#123522] font-bold text-lg flex items-center justify-center mx-auto shadow-2xs">
                1
              </div>
              <h3 className="font-bold text-sm text-[#1A1F24]">Uchastka va muddatni tanlang</h3>
              <p className="text-xs text-[#5A646D] leading-relaxed">
                Yoningizdagi boʻsh uchastkalarni xaritada koʻrsatamiz va qancha chorva joylashtirish mumkinligini darhol hisoblaymiz.
              </p>
            </div>

            <div className="text-center space-y-2">
              <div className="w-11 h-11 rounded-full bg-[#F0F7F1] border-2 border-[#2E7D4F] text-[#123522] font-bold text-lg flex items-center justify-center mx-auto shadow-2xs">
                2
              </div>
              <h3 className="font-bold text-sm text-[#1A1F24]">Imzolang va yuboring</h3>
              <p className="text-xs text-[#5A646D] leading-relaxed">
                Raqamli elektron kalit (ERI) bilan imzolashingiz kerak — soliq idorasidagi kabi. Agar u yoʻq boʻlsa, olishga yordamlashamiz.
              </p>
            </div>

            <div className="text-center space-y-2">
              <div className="w-11 h-11 rounded-full bg-[#F0F7F1] border-2 border-[#2E7D4F] text-[#123522] font-bold text-lg flex items-center justify-center mx-auto shadow-2xs">
                3
              </div>
              <h3 className="font-bold text-sm text-[#1A1F24]">Toʻlang va hujjatni oling</h3>
              <p className="text-xs text-[#5A646D] leading-relaxed">
                Javob 15 kundan kechikmay keladi. Toʻlovdan soʻng ruxsatnoma shu yerda paydo boʻladi, yuklab olinadi va chop etiladi.
              </p>
            </div>
          </div>

          {/* 6 Kinds of Usage Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
            <button onClick={() => onNavigate?.('applicant_wizard', { activity: 1 })} className="px-4 py-2 rounded-full border border-[#767F87] bg-white text-xs font-semibold text-[#1A1F24] hover:bg-[#F0F7F1] hover:border-[#2E7D4F] transition-all flex items-center gap-2 shadow-2xs cursor-pointer">
              <span className="text-[#2E7D4F]">◈</span> Chorva molini boqish
            </button>
            <button onClick={() => onNavigate?.('applicant_wizard', { activity: 2 })} className="px-4 py-2 rounded-full border border-[#767F87] bg-white text-xs font-semibold text-[#1A1F24] hover:bg-[#F0F7F1] hover:border-[#2E7D4F] transition-all flex items-center gap-2 shadow-2xs cursor-pointer">
              <span className="text-[#2E7D4F]">≋</span> Pichan oʻrish
            </button>
            <button onClick={() => onNavigate?.('applicant_wizard', { activity: 3 })} className="px-4 py-2 rounded-full border border-[#767F87] bg-white text-xs font-semibold text-[#1A1F24] hover:bg-[#F0F7F1] hover:border-[#2E7D4F] transition-all flex items-center gap-2 shadow-2xs cursor-pointer">
              <span className="text-[#2E7D4F]">⬡</span> Asalari uyalari
            </button>
            <button onClick={() => onNavigate?.('applicant_wizard', { activity: 4 })} className="px-4 py-2 rounded-full border border-[#767F87] bg-white text-xs font-semibold text-[#1A1F24] hover:bg-[#F0F7F1] hover:border-[#2E7D4F] transition-all flex items-center gap-2 shadow-2xs cursor-pointer">
              <span className="text-[#2E7D4F]">⛺</span> Dam olish va ekskursiyalar
            </button>
            <button onClick={() => onNavigate?.('applicant_wizard', { activity: 5 })} className="px-4 py-2 rounded-full border border-[#767F87] bg-white text-xs font-semibold text-[#1A1F24] hover:bg-[#F0F7F1] hover:border-[#2E7D4F] transition-all flex items-center gap-2 shadow-2xs cursor-pointer">
              <span className="text-[#2E7D4F]">⌇</span> Oʻtin va quruq shox-shabba
            </button>
            <button onClick={() => onNavigate?.('applicant_wizard', { activity: 6 })} className="px-4 py-2 rounded-full border border-[#767F87] bg-white text-xs font-semibold text-[#1A1F24] hover:bg-[#F0F7F1] hover:border-[#2E7D4F] transition-all flex items-center gap-2 shadow-2xs cursor-pointer">
              <span className="text-[#2E7D4F]">⚗</span> Ilmiy tadqiqotlar
            </button>
          </div>

          {/* Giant CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate?.('applicant_wizard')}
              className="h-14 px-8 rounded-2xl bg-[#2E7D4F] text-white hover:bg-[#23653F] text-base font-bold shadow-lg transition-all flex items-center justify-center gap-2 border border-[#23653F] cursor-pointer"
            >
              <Plus className="w-6 h-6" />
              <span>Birinchi arizani topshirish</span>
            </button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => onNavigate?.('tariffs')}
              className="h-14 px-6 rounded-2xl border-[#767F87] text-[#1A1F24] font-bold"
            >
              Qancha turishini koʻrish
            </Button>
          </div>

          {/* Footnote */}
          <div className="pt-6 border-t border-[#E4E7EA] text-center text-xs text-[#5A646D] leading-relaxed max-w-2xl mx-auto">
            Oʻzingizga mosini tanlashda ikkilanayapsizmi? Oʻz oʻrmon xoʻjaligingizga qoʻngʻiroq qiling — telefonlar{' '}
            <button onClick={() => onNavigate?.('applicant_help')} className="font-bold text-[#2E7D4F] hover:underline">
              yordam boʻlimida
            </button>{' '}
            bor, u yerda har bir bosqich boʻyicha qisqa videolar mavjud. Arizani my.gov.uz orqali ham topshirishingiz mumkin — u ham ushbu kabinetga kelib tushadi.
          </div>
        </div>
      </section>

      {/* ── 2. Hero Section (applicant-cabinet.html design) ───────────────── */}
      <div className="bg-gradient-to-r from-[#1D5434] via-[#23653F] to-[#2E7D4F] text-white rounded-3xl p-8 lg:p-10 shadow-lg flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 border border-[#39935E]/40 relative overflow-hidden">
        {/* Subtle background decorative element */}
        <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />

        <div className="space-y-3 max-w-2xl z-10">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
            Assalomu alaykum, {userName}
          </h1>
          <p className="text-sm md:text-base text-emerald-50/90 leading-relaxed font-normal">
            {userOrg}. Sizda 2 ta amaldagi ruxsatnoma va 1 ta toʻlov kutilayotgan ariza bor. Qolgan ishlar reja boʻyicha ketmoqda — biror narsa kerak boʻlganda xabar beramiz.
          </p>
        </div>

        <div className="shrink-0 text-center lg:text-right w-full lg:w-auto z-10 flex flex-col items-center lg:items-end">
          <button
            onClick={() => onNavigate?.('applicant_wizard')}
            className="w-full sm:w-auto h-16 px-8 rounded-2xl bg-white text-[#123522] hover:bg-[#F0F7F1] text-lg font-extrabold shadow-xl hover:shadow-2xl transition-all duration-200 flex items-center justify-center gap-3 border-2 border-white/90 group transform hover:scale-[1.03] active:scale-[0.98] cursor-pointer ring-4 ring-white/20"
          >
            <div className="w-9 h-9 rounded-xl bg-[#F0F7F1] border border-[#2E7D4F]/20 flex items-center justify-center text-[#2E7D4F] group-hover:bg-[#2E7D4F] group-hover:text-white transition-colors">
              <Plus className="w-6 h-6 stroke-[2.5]" />
            </div>
            <span className="tracking-tight text-[#123522]">Ariza topshirish</span>
          </button>
          <small className="block mt-3 text-xs text-emerald-100/80 leading-snug max-w-[280px] text-center lg:text-right font-medium">
            Olti bosqich, taxminan 15 daqiqa. Istalgan vaqtda toʻxtatishingiz mumkin — qoralama saqlanadi.
          </small>
        </div>
      </div>

      {/* ── 3. Pending Payment Banner (applicant-cabinet.html pay design) ──── */}
      <div className="bg-[#FFFBEB] border-2 border-[#B45309] rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-13 h-13 rounded-full border-2 border-[#B45309] bg-white text-[#B45309] flex items-center justify-center font-bold text-2xl shrink-0 shadow-xs">
              <CreditCard className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-[#B45309]">Toʻlovni amalga oshirish kerak</h2>
              <p className="text-sm text-[#1A1F24] leading-relaxed max-w-2xl">
                Zangiota oʻrmonchiligida pichan oʻrish arizasi tasdiqlandi. Ruxsatnoma berilishi uchun toʻlov kutilmoqda.{' '}
                <strong className="font-semibold text-[#B45309]">
                  Agar 14-avgustgacha toʻlanmasa, ariza bekor qilinadi
                </strong>{' '}
                va uchastka boshqaga oʻtib ketishi mumkin.
              </p>
            </div>
          </div>

          <div className="w-full lg:w-auto text-left lg:text-right shrink-0 space-y-2">
            <div className="font-mono text-2xl font-bold text-[#1A1F24] tracking-tight">
              2 480 240 UZS
            </div>
            <div className="text-xs font-semibold text-[#B45309] flex items-center lg:justify-end gap-1">
              <Clock className="w-4 h-4" />
              <span>14-avgustgacha, 4 kun qoldi</span>
            </div>
            <div className="flex items-center lg:justify-end gap-2 pt-1">
              <Button
                variant="primary"
                size="md"
                onClick={() => alert('Toʻlov tizimiga oʻtilmoqda...')}
                className="bg-[#B45309] hover:bg-[#92400E] text-white border-none shadow-xs font-bold cursor-pointer"
              >
                Toʻlash
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={() => alert('Hisob-faktura koʻrish')}
                className="bg-white border-[#767F87] text-[#1A1F24] hover:bg-gray-50 font-bold"
              >
                Hisobni koʻrish
              </Button>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="pt-4 border-t border-[#B45309]/30 flex flex-wrap items-center gap-2 text-xs text-[#5A646D]">
          <span className="font-bold text-[#1A1F24]">Toʻlov usullari:</span>
          <span className="px-3 py-1 bg-white border border-[#767F87] rounded-full font-semibold text-[#1A1F24] shadow-2xs hover:border-[#2E7D4F] cursor-pointer">
            Payme
          </span>
          <span className="px-3 py-1 bg-white border border-[#767F87] rounded-full font-semibold text-[#1A1F24] shadow-2xs hover:border-[#2E7D4F] cursor-pointer">
            Click
          </span>
          <span className="px-3 py-1 bg-white border border-[#767F87] rounded-full font-semibold text-[#1A1F24] shadow-2xs hover:border-[#2E7D4F] cursor-pointer">
            Uzum
          </span>
          <span className="px-3 py-1 bg-white border border-[#767F87] rounded-full font-semibold text-[#1A1F24] shadow-2xs hover:border-[#2E7D4F] cursor-pointer">
            Paynet
          </span>
          <span className="px-3 py-1 bg-white border border-[#767F87] rounded-full font-semibold text-[#1A1F24] shadow-2xs hover:border-[#2E7D4F] cursor-pointer">
            Bank oʻtkazmasi
          </span>
          <span className="ml-auto text-[11px] text-[#767F87]">
            Mablagʻ bir necha daqiqada yetib keladi, kvitansiya shu yerning oʻzida paydo boʻladi.
          </span>
        </div>
      </div>

      {/* ── 4. Applications in Progress Section (applicant-cabinet.html design) ── */}
      <section className="space-y-4 font-sans">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#E4E7EA] pb-3">
          <div className="flex items-baseline gap-3">
            <h2 className="text-xl font-bold text-[#1A1F24]">Sizning arizalaringiz</h2>
            <span className="text-xs font-semibold text-[#5A646D]">3 ta jarayonda</span>
          </div>
          <button
            onClick={() => onNavigate?.('applicant_applications')}
            className="text-xs font-bold text-[#2E7D4F] hover:underline cursor-pointer"
          >
            Barcha arizalar va qoralamalar →
          </button>
        </div>

        <div className="space-y-4">
          {/* CARD 1: Normal In Review */}
          <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs space-y-4 hover:border-[#2E7D4F] transition-all">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-[#1A1F24]">Chorva molini boqish</h3>
                <p className="text-xs text-[#5A646D] mt-0.5">
                  Zangiota oʻrmonchiligi, 14-kvartal · 42.6 ga · 1-noyabrdan 31-dekabrgacha
                </p>
              </div>
              <div className="text-right text-xs text-[#5A646D]">
                Ariza raqami: <strong className="font-mono font-bold text-[#1A1F24] block text-sm">A-00052</strong>
                <span>9-avgustda topshirilgan</span>
              </div>
            </div>

            {/* 3 Questions QA Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-[#E4E7EA]">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#5A646D] block mb-1">
                  1. Nima boʻlmoqda?
                </span>
                <div className="space-y-1">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#E0F2FE] text-[#0369A1] text-xs font-bold border border-[#BAE6FD]">
                    <Clock className="w-3.5 h-3.5" /> Arizani tekshirmoqdamiz
                  </span>
                  <p className="text-xs text-[#5A646D]">Oʻrmon xoʻjaligi joyni va hujjatlarni koʻrib chiqmoqda.</p>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#5A646D] block mb-1">
                  2. Sizdan nima talab qilinadi?
                </span>
                <p className="text-xs text-[#1A1F24] font-medium leading-relaxed">
                  Hozircha hech narsa. Biror narsa kerak boʻlsa xabar beramiz va qoʻngʻiroq qilamiz.
                </p>
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#5A646D] block mb-1">
                  3. Qaysi sanagacha javob boʻladi?
                </span>
                <div className="text-xs text-[#1A1F24]">
                  <strong className="font-bold block text-sm">24-avgustgacha</strong>
                  <span className="text-[#767F87]">Odatda ertaroq javob berishadi</span>
                </div>
              </div>
            </div>

            {/* 5-Step Progress Bar */}
            <div className="pt-4 border-t border-dashed border-[#E4E7EA] flex items-center gap-2 overflow-x-auto text-xs">
              <div className="flex items-center gap-1.5 font-bold text-[#1A1F24] shrink-0">
                <span className="w-5 h-5 rounded-full bg-[#2E7D4F] text-white flex items-center justify-center text-[10px]">
                  ✓
                </span>
                <span>1. Ariza topshirildi</span>
              </div>
              <span className="text-[#9AA3AB]">→</span>
              <div className="flex items-center gap-1.5 font-bold text-[#2E7D4F] shrink-0 bg-[#F0F7F1] px-2 py-0.5 rounded-lg border border-[#7FB98A]">
                <span className="w-5 h-5 rounded-full border-2 border-[#2E7D4F] bg-white text-[#2E7D4F] flex items-center justify-center text-[10px]">
                  2
                </span>
                <span>2. Tekshirmoqdamiz</span>
              </div>
              <span className="text-[#9AA3AB]">→</span>
              <div className="flex items-center gap-1.5 text-[#5A646D] shrink-0">
                <span className="w-5 h-5 rounded-full border border-[#767F87] bg-white text-[#5A646D] flex items-center justify-center text-[10px]">
                  3
                </span>
                <span>3. Oʻrmon xoʻjaligi qarori</span>
              </div>
              <span className="text-[#9AA3AB]">→</span>
              <div className="flex items-center gap-1.5 text-[#5A646D] shrink-0">
                <span className="w-5 h-5 rounded-full border border-[#767F87] bg-white text-[#5A646D] flex items-center justify-center text-[10px]">
                  4
                </span>
                <span>4. Toʻlov</span>
              </div>
              <span className="text-[#9AA3AB]">→</span>
              <div className="flex items-center gap-1.5 text-[#5A646D] shrink-0">
                <span className="w-5 h-5 rounded-full border border-[#767F87] bg-white text-[#5A646D] flex items-center justify-center text-[10px]">
                  5
                </span>
                <span>5. Ruxsatnoma tayyor</span>
              </div>
            </div>
          </div>

          {/* CARD 2: Needs document from user */}
          <div className="bg-white border-2 border-[#B45309] rounded-2xl p-6 shadow-xs space-y-4 border-l-8 border-l-[#B45309]">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-[#1A1F24]">Asalari uyalarini joylashtirish</h3>
                <p className="text-xs text-[#5A646D] mt-0.5">
                  Pskent oʻrmonchiligi, 7-kvartal · 60 uya · 1-sentabrdan 30-noyabrgacha
                </p>
              </div>
              <div className="text-right text-xs text-[#5A646D]">
                Ariza raqami: <strong className="font-mono font-bold text-[#1A1F24] block text-sm">A-00045</strong>
                <span>28-iyulda topshirilgan</span>
              </div>
            </div>

            {/* 3 Questions QA Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-[#E4E7EA]">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#5A646D] block mb-1">
                  1. Nima boʻlmoqda?
                </span>
                <div className="space-y-1">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#FEF3C7] text-[#B45309] text-xs font-bold border border-[#FDE68A]">
                    <AlertCircle className="w-3.5 h-3.5" /> Hujjatingizni kutmoqdamiz
                  </span>
                  <p className="text-xs text-[#5A646D]">Hujjat biriktirilmaguncha ariza joyida toʻxtab turibdi.</p>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#5A646D] block mb-1">
                  2. Sizdan nima talab qilinadi?
                </span>
                <p className="text-xs text-[#B45309] font-bold leading-relaxed">
                  Asalari xonasi (pasika) uchun veterinariya ma'lumotnomasini biriktiring — foto yoki skan (10 MB gacha).
                </p>
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#5A646D] block mb-1">
                  3. Qaysi sanagacha javob boʻladi?
                </span>
                <div className="text-xs text-[#B45309]">
                  <strong className="font-bold block text-sm">13-avgustgacha</strong>
                  <span className="font-semibold">3 kun qoldi</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <Button
                variant="primary"
                size="md"
                leftIcon={<Upload className="w-4 h-4" />}
                onClick={() => alert('Hujjat biriktirish oynasi')}
                className="bg-[#2E7D4F] hover:bg-[#23653F] text-white font-bold cursor-pointer"
              >
                Hujjat biriktirish
              </Button>
              <Button
                variant="outline"
                size="md"
                leftIcon={<MessageSquare className="w-4 h-4" />}
                onClick={() => alert('Oʻrmon xoʻjaligiga yozish oynasi')}
                className="border-[#767F87] text-[#1A1F24] hover:bg-gray-50 font-bold"
              >
                Oʻrmon xoʻjaligiga yozish
              </Button>
            </div>
          </div>

          {/* CARD 3: Returned for correction */}
          <div className="bg-white border-2 border-[#B45309] rounded-2xl p-6 shadow-xs space-y-4 border-l-8 border-l-[#B45309]">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-[#1A1F24]">Oʻtin va quruq shox-shabbalarni yigʻish</h3>
                <p className="text-xs text-[#5A646D] mt-0.5">
                  Ohangaron oʻrmonchiligi, 22-kvartal · 6 ga · 1-oktabrdan 30-noyabrgacha
                </p>
              </div>
              <div className="text-right text-xs text-[#5A646D]">
                Ariza raqami: <strong className="font-mono font-bold text-[#1A1F24] block text-sm">A-00039</strong>
                <span>21-iyulda topshirilgan</span>
              </div>
            </div>

            {/* 3 Questions QA Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-[#E4E7EA]">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#5A646D] block mb-1">
                  1. Nima boʻlmoqda?
                </span>
                <div className="space-y-1">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#FEF3C7] text-[#B45309] text-xs font-bold border border-[#FDE68A]">
                    <RotateCcw className="w-3.5 h-3.5" /> Tuzatish uchun qaytarildi
                  </span>
                  <p className="text-xs text-[#5A646D]">Oʻrmonchi Ergashev B. R., 5-avgust.</p>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#5A646D] block mb-1">
                  2. Sizdan nima talab qilinadi?
                </span>
                <p className="text-xs text-[#B45309] font-bold leading-relaxed">
                  Maydonni 4 gektargacha kamaytiring: 2 gektarida yil oxirigacha boshqa shaxs ruxsatnomasi amal qilmoqda. Arizaning qolgan qismini oʻzgartirish shart emas.
                </p>
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#5A646D] block mb-1">
                  3. Qaysi sanagacha javob boʻladi?
                </span>
                <div className="text-xs text-[#B45309]">
                  <strong className="font-bold block text-sm">17-avgustgacha</strong>
                  <span className="font-semibold">7 kun qoldi</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <Button
                variant="primary"
                size="md"
                onClick={() => alert('Arizani tahrirlash va qayta yuborish')}
                className="bg-[#2E7D4F] hover:bg-[#23653F] text-white font-bold cursor-pointer"
              >
                Tuzatib qayta yuborish
              </Button>
              <Button
                variant="outline"
                size="md"
                leftIcon={<MapPin className="w-4 h-4" />}
                onClick={() => alert('Uchastkani xaritada koʻrish')}
                className="border-[#767F87] text-[#1A1F24] hover:bg-gray-50 font-bold"
              >
                Uchastkani xaritada koʻrish
              </Button>
              <Button
                variant="ghost"
                size="md"
                onClick={() => alert('Arizani bekor qilish')}
                className="text-[#B91C1C] hover:bg-[#FEF2F2] font-bold cursor-pointer"
              >
                Arizani bekor qilish
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Permits in Force Section (applicant-cabinet.html design) ─────── */}
      <section className="space-y-4 font-sans">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#E4E7EA] pb-3">
          <div className="flex items-baseline gap-3">
            <h2 className="text-xl font-bold text-[#1A1F24]">Amaldagi ruxsatnomalar</h2>
            <span className="text-xs font-semibold text-[#5A646D]">2 ta ruxsatnoma</span>
          </div>
          <button
            onClick={() => onNavigate?.('applicant_permits')}
            className="text-xs font-bold text-[#2E7D4F] hover:underline cursor-pointer"
          >
            Barcha ruxsatnomalar, oʻtgan yillardagilar ham →
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {/* PERMIT 1 */}
          <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs flex flex-col md:flex-row gap-6 items-start justify-between hover:border-[#2E7D4F] transition-all">
            <div className="shrink-0 space-y-1 text-center w-full md:w-auto">
              <svg className="w-full md:w-[180px] h-[112px] rounded-lg border border-[#767F87] bg-[#F0F7F1]" viewBox="0 0 180 112">
                <rect fill="#F0F7F1" width="180" height="112" />
                <path fill="#FFFFFF" stroke="#767F87" strokeWidth="1" d="M6 14 L48 6 L60 34 L36 58 L10 50 Z" />
                <path fill="#FFFFFF" stroke="#767F87" strokeWidth="1" d="M128 8 L174 16 L170 52 L134 48 Z" />
                <path fill="#FFFFFF" stroke="#767F87" strokeWidth="1" d="M16 70 L58 68 L70 104 L24 106 Z" />
                <path fill="none" stroke="#767F87" strokeWidth="1.5" strokeDasharray="5 3" d="M0 64 C44 56 78 84 180 70" />
                <path fill="#7FB98A" fillOpacity="0.75" stroke="#23653F" strokeWidth="2" d="M66 22 L120 12 L142 48 L124 92 L82 96 L62 62 Z" />
                <circle fill="#23653F" stroke="#FFFFFF" strokeWidth="1.5" cx="102" cy="54" r="5" />
              </svg>
              <span className="text-[11px] font-semibold text-[#5A646D] block">Kontur 217-2 · 42.6 ga</span>
            </div>

            <div className="space-y-3 flex-1">
              <div>
                <span className="font-mono text-xl font-bold text-[#1A1F24] block">A № 004182</span>
                <p className="text-xs text-[#5A646D]">Chorva molini boqish · Zangiota oʻrmonchiligi, 14-kvartal</p>
              </div>

              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#DCFCE7] text-[#15803D] text-xs font-bold border border-[#86EFAC]">
                <span className="w-2 h-2 rounded-full bg-[#15803D]" /> Amalda
              </span>

              <div className="space-y-1.5 text-xs max-w-md">
                <div className="flex justify-between">
                  <span className="text-[#5A646D]">Amal qilish muddati:</span>
                  <span className="font-mono font-medium text-[#1A1F24]">1-avgust — 31-oktabr</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5A646D]">Qoldi:</span>
                  <span className="font-bold text-[#1A1F24]">82 kun <span className="font-mono text-[11px] font-normal text-[#767F87]">(92 kundan)</span></span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5A646D]">Chorva soni:</span>
                  <span className="font-medium text-[#1A1F24]">198 bosh</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full max-w-md bg-[#E4E7EA] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#2E7D4F] h-full rounded-full" style={{ width: '11%' }} />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Button variant="outline" size="sm" onClick={() => alert('PDF Yuklab olish')} className="cursor-pointer">
                  PDF yuklab olish
                </Button>
                <Button variant="outline" size="sm" onClick={() => alert('Inspektorga koʻrsatish')} className="cursor-pointer">
                  Inspektorga koʻrsatish
                </Button>
              </div>
            </div>

            {/* Mini QR Side */}
            <div className="shrink-0 text-center space-y-1 w-full md:w-[112px] pt-3 md:pt-0 md:border-l border-[#E4E7EA] md:pl-4">
              <div className="w-24 h-24 mx-auto p-1.5 bg-white border border-[#767F87] rounded-lg shadow-2xs">
                <svg viewBox="0 0 21 21" className="w-full h-full text-[#1A1F24] fill-current">
                  <rect x="0" y="0" width="7" height="1"/><rect x="8" y="0" width="1" height="1"/><rect x="14" y="0" width="7" height="1"/>
                  <rect x="0" y="1" width="1" height="1"/><rect x="6" y="1" width="1" height="1"/><rect x="10" y="1" width="3" height="1"/><rect x="14" y="1" width="1" height="1"/><rect x="20" y="1" width="1" height="1"/>
                  <rect x="0" y="2" width="1" height="1"/><rect x="2" y="2" width="3" height="1"/><rect x="6" y="2" width="1" height="1"/><rect x="9" y="2" width="1" height="1"/><rect x="11" y="2" width="1" height="1"/><rect x="14" y="2" width="1" height="1"/><rect x="16" y="2" width="3" height="1"/><rect x="20" y="2" width="1" height="1"/>
                  <rect x="0" y="3" width="1" height="1"/><rect x="2" y="3" width="3" height="1"/><rect x="6" y="3" width="1" height="1"/><rect x="8" y="3" width="2" height="1"/><rect x="11" y="3" width="2" height="1"/><rect x="14" y="3" width="1" height="1"/><rect x="16" y="3" width="3" height="1"/><rect x="20" y="3" width="1" height="1"/>
                  <rect x="0" y="4" width="1" height="1"/><rect x="2" y="4" width="3" height="1"/><rect x="6" y="4" width="1" height="1"/><rect x="10" y="4" width="1" height="1"/><rect x="14" y="4" width="1" height="1"/><rect x="16" y="4" width="3" height="1"/><rect x="20" y="4" width="1" height="1"/>
                  <rect x="0" y="5" width="1" height="1"/><rect x="6" y="5" width="1" height="1"/><rect x="9" y="5" width="3" height="1"/><rect x="14" y="5" width="1" height="1"/><rect x="20" y="5" width="1" height="1"/>
                  <rect x="0" y="6" width="7" height="1"/><rect x="8" y="6" width="2" height="1"/><rect x="11" y="6" width="1" height="1"/><rect x="14" y="6" width="7" height="1"/>
                  <rect x="0" y="14" width="7" height="1"/><rect x="8" y="14" width="4" height="1"/><rect x="14" y="14" width="3" height="1"/>
                  <rect x="0" y="20" width="7" height="1"/><rect x="9" y="20" width="2" height="1"/><rect x="13" y="20" width="8" height="1"/>
                </svg>
              </div>
              <span className="text-[11px] text-[#5A646D] block leading-tight pt-1">
                Kodni koʻrsating —<br />inspektor tekshiradi
              </span>
            </div>
          </div>

          {/* PERMIT 2 */}
          <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs flex flex-col md:flex-row gap-6 items-start justify-between hover:border-[#2E7D4F] transition-all">
            <div className="shrink-0 space-y-1 text-center w-full md:w-auto">
              <svg className="w-full md:w-[180px] h-[112px] rounded-lg border border-[#767F87] bg-[#F0F7F1]" viewBox="0 0 180 112">
                <rect fill="#F0F7F1" width="180" height="112" />
                <path fill="#FFFFFF" stroke="#767F87" strokeWidth="1" d="M8 8 L52 10 L56 40 L12 44 Z" />
                <path fill="#FFFFFF" stroke="#767F87" strokeWidth="1" d="M118 62 L168 58 L174 100 L124 104 Z" />
                <path fill="#FFFFFF" stroke="#767F87" strokeWidth="1" d="M8 62 L44 66 L40 104 L6 100 Z" />
                <path fill="none" stroke="#767F87" strokeWidth="1.5" strokeDasharray="5 3" d="M62 0 C70 40 52 70 74 112" />
                <path fill="#7FB98A" fillOpacity="0.75" stroke="#23653F" strokeWidth="2" d="M78 14 L142 8 L168 30 L156 50 L112 58 L80 44 Z" />
                <circle fill="#23653F" stroke="#FFFFFF" strokeWidth="1.5" cx="124" cy="32" r="5" />
              </svg>
              <span className="text-[11px] font-semibold text-[#5A646D] block">Kontur 104 · 18.4 ga</span>
            </div>

            <div className="space-y-3 flex-1">
              <div>
                <span className="font-mono text-xl font-bold text-[#1A1F24] block">A № 003960</span>
                <p className="text-xs text-[#5A646D]">Pichan oʻrish · Ohangaron oʻrmonchiligi, 22-kvartal</p>
              </div>

              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#FEF3C7] text-[#B45309] text-xs font-bold border border-[#FDE68A]">
                <span className="w-2 h-2 rounded-full bg-[#B45309]" /> Yaqinda tugaydi
              </span>

              <div className="space-y-1.5 text-xs max-w-md">
                <div className="flex justify-between">
                  <span className="text-[#5A646D]">Amal qilish muddati:</span>
                  <span className="font-mono font-medium text-[#1A1F24]">15-iyun — 31-avgust</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5A646D]">Qoldi:</span>
                  <span className="font-bold text-[#B45309]">21 kun <span className="font-mono text-[11px] font-normal text-[#767F87]">(78 kundan)</span></span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5A646D]">Hosil miqdori:</span>
                  <span className="font-medium text-[#1A1F24]">26 tonnagacha</span>
                </div>
              </div>

              {/* Progress Bar (Soon Expiring) */}
              <div className="w-full max-w-md bg-[#E4E7EA] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#B45309] h-full rounded-full" style={{ width: '73%' }} />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Button variant="primary" size="sm" onClick={() => alert('Muddatini uzaytirish')} className="bg-[#2E7D4F] hover:bg-[#23653F] cursor-pointer">
                  Muddatini uzaytirish
                </Button>
                <Button variant="outline" size="sm" onClick={() => alert('PDF Yuklab olish')} className="cursor-pointer">
                  PDF yuklab olish
                </Button>
              </div>
            </div>

            {/* Mini QR Side */}
            <div className="shrink-0 text-center space-y-1 w-full md:w-[112px] pt-3 md:pt-0 md:border-l border-[#E4E7EA] md:pl-4">
              <div className="w-24 h-24 mx-auto p-1.5 bg-white border border-[#767F87] rounded-lg shadow-2xs">
                <svg viewBox="0 0 21 21" className="w-full h-full text-[#1A1F24] fill-current">
                  <rect x="0" y="0" width="7" height="1"/><rect x="8" y="0" width="1" height="1"/><rect x="14" y="0" width="7" height="1"/>
                  <rect x="0" y="1" width="1" height="1"/><rect x="6" y="1" width="1" height="1"/><rect x="10" y="1" width="3" height="1"/><rect x="14" y="1" width="1" height="1"/><rect x="20" y="1" width="1" height="1"/>
                  <rect x="0" y="2" width="1" height="1"/><rect x="2" y="2" width="3" height="1"/><rect x="6" y="2" width="1" height="1"/><rect x="9" y="2" width="1" height="1"/><rect x="11" y="2" width="1" height="1"/><rect x="14" y="2" width="1" height="1"/><rect x="16" y="2" width="3" height="1"/><rect x="20" y="2" width="1" height="1"/>
                  <rect x="0" y="3" width="1" height="1"/><rect x="2" y="3" width="3" height="1"/><rect x="6" y="3" width="1" height="1"/><rect x="8" y="3" width="2" height="1"/><rect x="11" y="3" width="2" height="1"/><rect x="14" y="3" width="1" height="1"/><rect x="16" y="3" width="3" height="1"/><rect x="20" y="3" width="1" height="1"/>
                  <rect x="0" y="4" width="1" height="1"/><rect x="2" y="4" width="3" height="1"/><rect x="6" y="4" width="1" height="1"/><rect x="10" y="4" width="1" height="1"/><rect x="14" y="4" width="1" height="1"/><rect x="16" y="4" width="3" height="1"/><rect x="20" y="4" width="1" height="1"/>
                  <rect x="0" y="5" width="1" height="1"/><rect x="6" y="5" width="1" height="1"/><rect x="9" y="5" width="3" height="1"/><rect x="14" y="5" width="1" height="1"/><rect x="20" y="5" width="1" height="1"/>
                  <rect x="0" y="6" width="7" height="1"/><rect x="8" y="6" width="2" height="1"/><rect x="11" y="6" width="1" height="1"/><rect x="14" y="6" width="7" height="1"/>
                  <rect x="0" y="14" width="7" height="1"/><rect x="8" y="14" width="4" height="1"/><rect x="14" y="14" width="3" height="1"/>
                  <rect x="0" y="20" width="7" height="1"/><rect x="9" y="20" width="2" height="1"/><rect x="13" y="20" width="8" height="1"/>
                </svg>
              </div>
              <span className="text-[11px] text-[#5A646D] block leading-tight pt-1">
                Kodni koʻrsating —<br />inspektor tekshiradi
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Collapsible History Section by Years (applicant-cabinet.html design) ──── */}
      <section className="space-y-4 font-sans">
        <details className="bg-white border border-[#E4E7EA] rounded-2xl overflow-hidden group shadow-xs">
          <summary className="p-5 font-bold text-base text-[#1A1F24] cursor-pointer hover:bg-[#F8F9FA] flex items-center justify-between transition-colors">
            <div className="flex items-center gap-2">
              <span className="text-[#5A646D] group-open:rotate-90 transition-transform">▸</span>
              <span>Oʻtgan arizalar va ruxsatnomalar tarixi</span>
            </div>
            <span className="text-xs font-normal text-[#5A646D]">7 ta yakunlangan, 2 ta rad etilgan · 2024-yildan beri</span>
          </summary>
          <div className="p-5 border-t border-[#E4E7EA] space-y-6 overflow-x-auto">
            {/* 2025 Group */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#2E7D4F] uppercase tracking-wider bg-[#F0F7F1] px-2.5 py-1 rounded inline-block">
                2025-yil arizalari
              </span>
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-[#E4E7EA] text-[#767F87] uppercase text-[10px] font-bold">
                    <th className="pb-2">Faoliyat va joyi</th>
                    <th className="pb-2">Muddati</th>
                    <th className="pb-2">Natija va qaror sababi</th>
                    <th className="pb-2 text-right">Amal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E4E7EA]">
                  <tr>
                    <td className="py-3">
                      <span className="font-bold text-[#1A1F24] block text-xs">Chorva molini boqish</span>
                      <span className="text-[#5A646D]">Zangiota oʻrmonchiligi, 40.2 ga</span>
                    </td>
                    <td className="py-3 font-mono">avgust — oktabr 2025</td>
                    <td className="py-3">
                      <span className="inline-flex items-center gap-1 text-[#5A646D] bg-[#F8F9FA] border border-[#E4E7EA] px-2 py-0.5 rounded font-medium">
                        Yakunlangan
                      </span>
                      <span className="text-[10px] text-[#767F87] block mt-0.5">Ruxsatnoma A № 003114 (muddati tugagan)</span>
                    </td>
                    <td className="py-3 text-right">
                      <button onClick={() => alert('Arxiv hujjatini ochish')} className="text-[#2E7D4F] font-bold hover:underline cursor-pointer">Ochish</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3">
                      <span className="font-bold text-[#1A1F24] block text-xs">Pichan oʻrish</span>
                      <span className="text-[#5A646D]">Ohangaron oʻrmonchiligi, 18.4 ga</span>
                    </td>
                    <td className="py-3 font-mono">iyun — avgust 2025</td>
                    <td className="py-3">
                      <span className="inline-flex items-center gap-1 text-[#5A646D] bg-[#F8F9FA] border border-[#E4E7EA] px-2 py-0.5 rounded font-medium">
                        Yakunlangan
                      </span>
                      <span className="text-[10px] text-[#767F87] block mt-0.5">Ruxsatnoma A № 002877 (muddati tugagan)</span>
                    </td>
                    <td className="py-3 text-right">
                      <button onClick={() => alert('Arxiv hujjatini ochish')} className="text-[#2E7D4F] font-bold hover:underline cursor-pointer">Ochish</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3">
                      <span className="font-bold text-[#1A1F24] block text-xs">Chorva molini boqish</span>
                      <span className="text-[#5A646D]">Pskent oʻrmonchiligi, 55 ga</span>
                    </td>
                    <td className="py-3 font-mono">aprel 2025</td>
                    <td className="py-3">
                      <span className="inline-flex items-center gap-1 text-[#B91C1C] bg-[#FEF2F2] border border-[#FCA5A5] px-2 py-0.5 rounded font-medium">
                        Rad etilgan
                      </span>
                      <span className="text-[10px] text-[#B91C1C] block mt-0.5 font-medium">Rad sababi: Uchastkada boʻsh joy yoʻq edi (yaylov toʻliq band)</span>
                    </td>
                    <td className="py-3 text-right">
                      <button onClick={() => alert('Rad etish sababini batafsil koʻrish')} className="text-[#2E7D4F] font-bold hover:underline cursor-pointer">Sababi</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3">
                      <span className="font-bold text-[#1A1F24] block text-xs">Ilmiy tadqiqotlar</span>
                      <span className="text-[#5A646D]">Zangiota oʻrmonchiligi, 3 ga</span>
                    </td>
                    <td className="py-3 font-mono">fevral 2025</td>
                    <td className="py-3">
                      <span className="inline-flex items-center gap-1 text-[#B91C1C] bg-[#FEF2F2] border border-[#FCA5A5] px-2 py-0.5 rounded font-medium">
                        Rad etilgan
                      </span>
                      <span className="text-[10px] text-[#B91C1C] block mt-0.5 font-medium">Rad sababi: Ilmiy tashkilotning rasmiy xati yetishmadi, muddat oʻtdi</span>
                    </td>
                    <td className="py-3 text-right">
                      <button onClick={() => alert('Rad etish sababini batafsil koʻrish')} className="text-[#2E7D4F] font-bold hover:underline cursor-pointer">Sababi</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 2024 Group */}
            <div className="space-y-2 pt-2 border-t border-[#E4E7EA]">
              <span className="text-xs font-bold text-[#5A646D] uppercase tracking-wider bg-[#F8F9FA] border border-[#E4E7EA] px-2.5 py-1 rounded inline-block">
                2024-yil arizalari
              </span>
              <table className="w-full text-xs text-left">
                <tbody className="divide-y divide-[#E4E7EA]">
                  <tr>
                    <td className="py-3">
                      <span className="font-bold text-[#1A1F24] block text-xs">Asalari uyalarini joylashtirish</span>
                      <span className="text-[#5A646D]">Burchmulla oʻrmonchiligi, 40 uya</span>
                    </td>
                    <td className="py-3 font-mono">may — avgust 2024</td>
                    <td className="py-3">
                      <span className="inline-flex items-center gap-1 text-[#5A646D] bg-[#F8F9FA] border border-[#E4E7EA] px-2 py-0.5 rounded font-medium">
                        Yakunlangan
                      </span>
                      <span className="text-[10px] text-[#767F87] block mt-0.5">Ruxsatnoma A № 001942</span>
                    </td>
                    <td className="py-3 text-right">
                      <button onClick={() => alert('Arxiv hujjatini ochish')} className="text-[#2E7D4F] font-bold hover:underline cursor-pointer">Ochish</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </details>
      </section>
    </div>
  );
};
