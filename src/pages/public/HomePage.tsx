import React, { useState } from 'react';
import landingBg from '../../assets/img/landingbackgraund2.png';
import {
  Search,
  QrCode,
  ArrowRight,
  ShieldCheck,
  FileCheck2,
  CheckCircle2,
  Users,
  TrendingUp,
  Trees,
  ChevronRight,
  PhoneCall,
  ExternalLink,
  MapPin,
  Star,
  Send,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/FormControls';

export interface HomePageProps {
  onNavigate?: (page: string, params?: any) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [quickSearchInput, setQuickSearchInput] = useState('');
  const [selectedRating, setSelectedRating] = useState<string>('');
  const [ratingSubmitted, setRatingSubmitted] = useState<boolean>(false);

  const handleRatingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRating) {
      setRatingSubmitted(true);
    }
  };

  const stats = [
    { label: 'Jami berilgan ruxsatnomalar', value: '42,850+', icon: <FileCheck2 className="w-6 h-6 text-[#2E7D4F]" />, change: '+12% ushbu oyda' },
    { label: 'Faol oʻrmon xujaliklari', value: '84 ta', icon: <Trees className="w-6 h-6 text-[#2E7D4F]" />, change: 'Respublika boʻyicha 100%' },
    { label: 'Biriktirilgan chorva mollari', value: '185,400', icon: <Users className="w-6 h-6 text-[#2E7D4F]" />, change: 'Ushbu mavsumda' },
    { label: 'Avtomatik tasdiqlangan', value: '94.8%', icon: <TrendingUp className="w-6 h-6 text-[#2E7D4F]" />, change: 'OneID & E-IMZO integratsiya' },
  ];

  const activities = [
    {
      id: 'grazing',
      title: 'Chorva mollarini boqish',
      desc: 'Yaylov konturlarida belgilangan normalarga muvofiq qoramol, qoʻy va echkilarni boqish uchun rasmiy ruxsatnoma.',
      badge: 'Eng koʻp talab qilingan',
      icon: <Trees className="w-6 h-6 text-[#2E7D4F]" />,
      limit: '85,000 bosh',
    },
    {
      id: 'haymaking',
      title: 'Pichan oʻrish va Somon yigʻish',
      desc: 'Oʻrmon fondi yerlarida pichan oʻrish maydonlaridan mavsumiy foydalanish.',
      badge: 'Mavsumiy',
      icon: <FileCheck2 className="w-6 h-6 text-[#2E7D4F]" />,
      limit: '14,200 gektar',
    },
    {
      id: 'beekeeping',
      title: 'Asalarichilik va In qoʻyish',
      desc: 'Asalari oilalarini oʻrmon hududlariga joylashtirish va asal yigʻish faoliyati.',
      badge: 'Imtiyozli tarif',
      icon: <ShieldCheck className="w-6 h-6 text-[#2E7D4F]" />,
      limit: '42,000 ari oilasi',
    },
    {
      id: 'wild_plants',
      title: 'Yovvoyi oʻsimliklarni yigʻish',
      desc: 'Mevalar, yongʻoqlar, rezavorlar va oziq-ovqat maqsadlaridagi oʻsimlik xomashyosi.',
      badge: 'Kvota boʻyicha',
      icon: <Trees className="w-6 h-6 text-[#2E7D4F]" />,
      limit: '350 tonna',
    },
    {
      id: 'medicinal_herbs',
      title: 'Shifobaxsh dorivor oʻsimliklar',
      desc: 'Sanoat va farmatsevtika maqsadlarida dorivor oʻsimliklarni terish.',
      badge: 'Maxsus ruxsatnoma',
      icon: <Trees className="w-6 h-6 text-[#2E7D4F]" />,
      limit: '120 tonna',
    },
    {
      id: 'recreation',
      title: 'Rekreatsiya va Turizm',
      desc: 'Ekologik turizm, vaqtinchalik yengil inshootlar va dam olish maskanlari tashkil etish.',
      badge: 'Uzoq muddatli',
      icon: <MapPin className="w-6 h-6 text-[#2E7D4F]" />,
      limit: 'Auksion boʻyicha',
    },
  ];

  const newsList = [
    {
      date: '10 Avgust 2026',
      title: '2026-2027 yillar yaylov mavsumi uchun elektron arizalar qabuli boshlandi',
      desc: 'Barcha tuman oʻrmon xoʻjaliklarida yangi GIS chegaralari va elektron kvotalar belgilandi.',
    },
    {
      date: '05 Avgust 2026',
      title: 'Prokuratura va Raqamli Nazorat tizimi bilan oʻzaro integratsiya yakunlandi',
      desc: 'Ruxsatnomalarning haqiqiyligi va risk-indikatorlar avtomatik monitoring qilinadi.',
    },
    {
      date: '01 Avgust 2026',
      title: 'Oʻrmon xoʻjaligi hududlarida chorva boqish toʻlov stavkalari yangilandi',
      desc: 'Vazirlar Mahkamasi qaroriga muvofiq BHM koeffitsientlari tasdiqlandi.',
    },
  ];

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickSearchInput.trim()) {
      onNavigate?.('verify', { query: quickSearchInput.trim() });
    }
  };

  return (
    <div className="space-y-16 font-sans">
      {/* ── 1. DASHBOARD & VERIFICATION SECTION ────────────────────── */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#2E7D4F] bg-[#F0F7F1] px-3 py-1 rounded-full border border-[#D9EBDC]">
              Real-Vaqt Monitoringi
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1F24] mt-2">
              Davlat Portali Statistikasi va Hujjat Tekshiruvi
            </h2>
            <p className="text-sm text-[#5A646D]">
              Oʻrmon fondi yerlaridan foydalanish koʻrsatkichlari hamda ruxsatnoma haqiqiyligini tekshirish paneli
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT SIDE: DIAGRAMS & STATISTICS DASHBOARD (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top 4 Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {stats.map((st, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-[#E4E7EA] p-5 rounded-2xl shadow-xs hover:shadow-md transition-shadow flex items-start justify-between"
                >
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-[#5A646D] uppercase tracking-wider block">
                      {st.label}
                    </span>
                    <div className="text-2xl font-bold text-[#1A1F24]">{st.value}</div>
                    <span className="text-xs text-[#15803D] font-medium flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" /> {st.change}
                    </span>
                  </div>
                  <div className="p-3 bg-[#F0F7F1] rounded-xl shrink-0">{st.icon}</div>
                </div>
              ))}
            </div>

            {/* Visual Diagram Chart Card */}
            <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-sm space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#1A1F24]">Ruxsatnomalar Taqsimoti Diagrammasi</h3>
                  <p className="text-xs text-[#5A646D]">Faoliyat turlari va avtomatik tasdiqlash ulushi</p>
                </div>
                <span className="text-xs font-semibold text-[#2E7D4F] bg-[#F0F7F1] px-2.5 py-1 rounded-lg border border-[#D9EBDC]">
                  2026 Mavsum
                </span>
              </div>

              {/* Progress Diagram Bars */}
              <div className="space-y-4 pt-1">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-[#1A1F24] mb-1">
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#2E7D4F]" />
                      Chorva mollarini boqish
                    </span>
                    <span>68% (29,138 ta)</span>
                  </div>
                  <div className="w-full bg-[#E4E7EA] h-3 rounded-full overflow-hidden">
                    <div className="bg-[#2E7D4F] h-full rounded-full transition-all duration-500" style={{ width: '68%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-[#1A1F24] mb-1">
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#15803D]" />
                      Pichan oʻrish va Somon yigʻish
                    </span>
                    <span>18% (7,713 ta)</span>
                  </div>
                  <div className="w-full bg-[#E4E7EA] h-3 rounded-full overflow-hidden">
                    <div className="bg-[#15803D] h-full rounded-full transition-all duration-500" style={{ width: '18%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-[#1A1F24] mb-1">
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#7FB98A]" />
                      Asalarichilik va In qoʻyish
                    </span>
                    <span>10% (4,285 ta)</span>
                  </div>
                  <div className="w-full bg-[#E4E7EA] h-3 rounded-full overflow-hidden">
                    <div className="bg-[#7FB98A] h-full rounded-full transition-all duration-500" style={{ width: '10%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-[#1A1F24] mb-1">
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#A8D5B1]" />
                      Dorivor oʻsimliklar & Turizm
                    </span>
                    <span>4% (1,714 ta)</span>
                  </div>
                  <div className="w-full bg-[#E4E7EA] h-3 rounded-full overflow-hidden">
                    <div className="bg-[#A8D5B1] h-full rounded-full transition-all duration-500" style={{ width: '4%' }} />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E4E7EA] flex flex-wrap items-center justify-between text-xs text-[#5A646D] gap-2">
                <span>Barcha arizalar OneID orqali autentifikatsiya qilingan</span>
                <span className="font-semibold text-[#2E7D4F] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#15803D]" /> Real vaqtda yangilanadi
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: RUXSATNOMANI TEKSHIRISH CARD (lg:col-span-5) */}
          <div className="lg:col-span-5">
            <form
              onSubmit={handleQuickSearch}
              className="bg-white text-[#1A1F24] p-7 rounded-2xl shadow-lg border border-[#E4E7EA] space-y-5 sticky top-24"
            >
              <div className="flex items-center gap-3.5 pb-2 border-b border-[#E4E7EA]">
                <div className="w-12 h-12 rounded-xl bg-[#F0F7F1] text-[#2E7D4F] flex items-center justify-center font-bold shadow-inner shrink-0">
                  <QrCode className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#1A1F24]">Ruxsatnomani Tekshirish</h3>
                  <p className="text-xs text-[#5A646D]">QR-kod yoki ruxsatnoma raqami boʻyicha</p>
                </div>
              </div>

              <p className="text-xs text-[#5A646D] leading-relaxed">
                Davlat oʻrmon xizmati tomonidan berilgan ruxsatnomaning haqiqiyligini tekshirish uchun seriya va raqamni kiriting.
              </p>

              <div className="space-y-3">
                <Input
                  placeholder="Masalan: RX-2026-0089"
                  value={quickSearchInput}
                  onChange={(e) => setQuickSearchInput(e.target.value)}
                  leftIcon={<Search className="w-4 h-4" />}
                  touchSize
                />
                <Button type="submit" variant="success" fullWidth size="lg" className="font-bold shadow-md bg-[#2E7D4F] hover:bg-[#23653F]">
                  Haqiqiyligini Tekshirish
                </Button>
              </div>

              <div className="bg-[#F8F9FA] p-4 rounded-xl border border-[#E4E7EA] space-y-2 text-xs text-[#5A646D]">
                <div className="flex items-center gap-2 font-semibold text-[#1A1F24]">
                  <CheckCircle2 className="w-4 h-4 text-[#15803D]" />
                  Tekshirish tartibi:
                </div>
                <ul className="list-disc list-inside space-y-1 pl-1 text-[11px]">
                  <li>Hujjat seriyasi (masalan: RX-2026) va raqamini kiriting</li>
                  <li>QR-kod burchagini skanerlash ham mumkin</li>
                  <li>Maʼlumotlar rasmiy GIS bazasi bilan solishtiriladi</li>
                </ul>
              </div>

              <p className="text-[11px] text-[#767F87] text-center pt-1">
                * Tekshiruv davlat reyestri maʼlumotlar bazasiga muvofiq onlayn tarzda amalga oshiriladi.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* ── 3. ACTIVITIES GRID ─────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#2E7D4F]">Xizmat Turlari</span>
            <h2 className="text-2xl font-bold text-[#1A1F24] mt-1">Oʻrmon Fondidan Foydalanish Yoʻnalishlari</h2>
            <p className="text-sm text-[#5A646D]">Oʻzbekiston Respublikasi Oʻrmon Kodeksiga muvofiq beriladigan rasmiy ruxsatnomalar</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            rightIcon={<ChevronRight className="w-4 h-4" />}
            onClick={() => onNavigate?.('activities')}
          >
            Barcha turlarni koʻrish
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((act) => (
            <div
              key={act.id}
              className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs hover:border-[#7FB98A] hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 bg-[#F0F7F1] rounded-xl">{act.icon}</div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#F0F7F1] text-[#2E7D4F] border border-[#D9EBDC]">
                    {act.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#1A1F24] group-hover:text-[#2E7D4F] transition-colors">
                  {act.title}
                </h3>
                <p className="text-xs text-[#5A646D] leading-relaxed">
                  {act.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E4E7EA] flex items-center justify-between text-xs">
                <span className="text-[#767F87]">Yillik kvota: <b className="text-[#1A1F24]">{act.limit}</b></span>
                <button
                  onClick={() => onNavigate?.('auth_login', { activity: act.id })}
                  className="font-bold text-[#2E7D4F] group-hover:underline inline-flex items-center gap-1"
                >
                  Ariza yozish <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. HOW IT WORKS TIMELINE ───────────────────────────────── */}
      <section className="bg-white border border-[#E4E7EA] rounded-2xl p-8 shadow-xs space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2E7D4F]">Qulay va Ishonchli</span>
          <h2 className="text-2xl font-bold text-[#1A1F24]">Ruxsatnoma Olish Bosqichlari</h2>
          <p className="text-sm text-[#5A646D]">Arizadan boshlab tayyor elektron hujjatgacha boʻlgan 4 ta oddiy qadam</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {[
            { step: '01', title: 'OneID Autentifikatsiya', desc: 'OneID yoki E-IMZO orqali shaxsiy kabinetga kiring.' },
            { step: '02', title: 'Hudud va Parametr', desc: 'GIS xaritasidan oʻrmon konturini va chorva sonini tanlang.' },
            { step: '03', title: 'Avto-Hisob & Toʻlov', desc: 'Narx avtomatik hisoblanadi va Click/Payme orqali toʻlanadi.' },
            { step: '04', title: 'QR Ruxsatnoma', desc: 'E-IMZO muhrlangan rasmiy PDF ruxsatnomani yuklab oling.' },
          ].map((st, idx) => (
            <div key={idx} className="relative space-y-3 p-4 bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl">
              <span className="text-2xl font-black font-mono text-[#2E7D4F]">{st.step}</span>
              <h3 className="text-base font-bold text-[#1A1F24]">{st.title}</h3>
              <p className="text-xs text-[#5A646D] leading-relaxed">{st.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. NEWS & ANNOUNCEMENTS ───────────────────────────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-[#E4E7EA] pb-4">
            <h3 className="text-lg font-bold text-[#1A1F24]">Yangiliklar va Eʼlonlar</h3>
            <a href="#" className="text-xs font-bold text-[#2E7D4F] hover:underline flex items-center gap-1">
              Barchasi <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="space-y-4 divide-y divide-[#E4E7EA]">
            {newsList.map((item, idx) => (
              <div key={idx} className="pt-4 first:pt-0 space-y-1">
                <span className="text-[11px] font-mono text-[#767F87]">{item.date}</span>
                <h4 className="text-base font-bold text-[#1A1F24] hover:text-[#2E7D4F] cursor-pointer transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-[#5A646D] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Support & Contact Widget */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#123522] text-white rounded-2xl p-6 shadow-md space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#2E7D4F] rounded-xl">
                <PhoneCall className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-base">Ishonch Telefoni</h4>
                <p className="text-xs text-gray-300">24/7 Texnik qoʻllab-quvvatlash</p>
              </div>
            </div>

            <div className="text-2xl font-bold font-mono text-[#7FB98A]">+998 (71) 207-88-77</div>

            <p className="text-xs text-gray-300 leading-relaxed">
              Tizimdan foydalanish boʻyicha savollaringiz boʻlsa, operatorlarimizga murojaat qiling.
            </p>

            <Button
              variant="outline"
              fullWidth
              className="border-white/30 text-white hover:bg-white/10"
              onClick={() => onNavigate?.('feedback')}
            >
              Murojaat yuborish
            </Button>
          </div>
        </div>
      </section>

      {/* ── 6. PORTALNI BAHOLASH (PREMIUM RATING SECTION) ────────── */}
      <section className="bg-gradient-to-br from-white via-[#FBFDFB] to-[#F0F7F1] border border-[#E4E7EA] rounded-3xl p-8 sm:p-10 shadow-lg space-y-6">
        {ratingSubmitted ? (
          <div className="py-8 px-6 bg-white border border-[#D9EBDC] rounded-2xl text-center space-y-3 shadow-md max-w-2xl mx-auto">
            <div className="w-14 h-14 bg-[#F0F7F1] text-[#2E7D4F] rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-8 h-8 text-[#15803D]" />
            </div>
            <h3 className="text-xl font-bold text-[#1A1F24]">Bahoingiz muvaffaqiyatli qabul qilindi!</h3>
            <p className="text-sm text-[#5A646D] max-w-md mx-auto">
              Portal xizmati sifatini baholaganlingiz va fikr-mulohazangiz uchun tashakkur bildiranamiz.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F0F7F1] text-[#2E7D4F] text-xs font-bold rounded-full border border-[#D9EBDC]">
                <Star className="w-3.5 h-3.5 fill-[#2E7D4F]" /> Berilgan baho: {selectedRating} ball
              </span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleRatingSubmit} className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E4E7EA] pb-5">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F0F7F1] text-[#2E7D4F] text-xs font-bold uppercase tracking-wider rounded-full border border-[#D9EBDC] mb-2">
                  <Star className="w-3.5 h-3.5 fill-[#2E7D4F]" /> Portal Xizmati Sifati
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#1A1F24]">
                  Portal orqali koʻrsatilgan xizmat sifatini baholang
                </h3>
                <p className="text-xs sm:text-sm text-[#5A646D] mt-0.5">
                  Sizning bahoingiz davlat elektron xizmatlarini yanada takomillashtirishga xizmat qiladi.
                </p>
              </div>
            </div>

            {/* Interactive Rating Options Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { value: '5', title: '5 - Aʼlo', desc: 'Juda qulay, tez va tushunarli', stars: 5 },
                { value: '4', title: '4 - Yaxshi', desc: 'Yaxshi, lekin ayrim takliflarim bor', stars: 4 },
                { value: '3', title: '3 - Qoniqarli', desc: 'Oʻrtacha, tushunish qiyinroq', stars: 3 },
                { value: '2', title: '2 - Qoniqarsiz', desc: 'Kamchiliklar mavjud', stars: 2 },
              ].map((item) => {
                const isSelected = selectedRating === item.value;
                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setSelectedRating(item.value)}
                    className={`text-left p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between space-y-3 cursor-pointer group ${
                      isSelected
                        ? 'bg-white border-[#2E7D4F] ring-2 ring-[#2E7D4F]/20 shadow-md transform -translate-y-1'
                        : 'bg-white/80 border-[#E4E7EA] hover:border-[#7FB98A] hover:bg-white shadow-xs'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-[#EAB308]">
                          {Array.from({ length: item.stars }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-[#EAB308]" />
                          ))}
                        </div>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                          isSelected ? 'border-[#2E7D4F] bg-[#2E7D4F] text-white' : 'border-gray-300 group-hover:border-[#7FB98A]'
                        }`}>
                          {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                      </div>
                      <h4 className={`text-base font-bold transition-colors ${isSelected ? 'text-[#2E7D4F]' : 'text-[#1A1F24]'}`}>
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#5A646D] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                type="submit"
                variant="success"
                size="lg"
                disabled={!selectedRating}
                rightIcon={<Send className="w-4 h-4" />}
                className="bg-[#2E7D4F] hover:bg-[#23653F] text-white font-bold px-8 py-3.5 rounded-xl shadow-md transition-transform active:scale-95 disabled:opacity-50"
              >
                Baho Yuborish
              </Button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
};
