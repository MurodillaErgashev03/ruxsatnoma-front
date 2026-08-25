import React from 'react';
import { 
  CheckCircle2, 
  MapPin, 
  User, 
  Trees, 
  Wheat, 
  Bug, 
  Compass, 
  Flame, 
  GraduationCap,
  Building2,
  FileCheck2,
  ShieldCheck
} from 'lucide-react';

export interface Step1ActivitySelectionProps {
  selectedActivity: string;
  onSelectActivity: (id: string) => void;
  selectedRegion: string;
  onSelectRegion: (val: string) => void;
  selectedForestry: string;
  onSelectForestry: (val: string) => void;
  selectedDepartment: string;
  onSelectDepartment: (val: string) => void;
}

const ACTIVITIES = [
  {
    id: 'grazing',
    titleUz: 'Chorva molini boqish',
    titleRu: 'Выпас скота',
    desc: 'O‘rmon fondi yaylovlarida chorva mollarini mavsumiy boqish va ruxsatnoma olish.',
    icon: Trees,
    badge: 'VMQ 689-son',
    color: 'border-[#2E7D4F] bg-[#F0F7F1] text-[#2E7D4F]',
    isPopular: true,
  },
  {
    id: 'haymaking',
    titleUz: 'Pichan o‘rish (Senokoshenie)',
    titleRu: 'Сенокошение',
    desc: 'O‘rmon fondi ochiq maydonlarida tabiiy o‘tlarni o‘rish va pichan jamg‘arish.',
    icon: Wheat,
    badge: 'VMQ 278-son',
    color: 'border-[#E4E7EA] bg-white text-[#1A1F24] hover:border-[#2E7D4F]/50',
  },
  {
    id: 'beekeeping',
    titleUz: 'Asalari uyalarini joylashtirish',
    titleRu: 'Размещение пчелиных ульев',
    desc: 'Asal yig‘ish mavsumida o‘rmon hududlarida ko‘chma asalarichilik xo‘jaligini yuritish.',
    icon: Bug,
    badge: 'Imtiyozli',
    color: 'border-[#E4E7EA] bg-white text-[#1A1F24] hover:border-[#2E7D4F]/50',
  },
  {
    id: 'recreation',
    titleUz: 'Rekreatsiya va turizm',
    titleRu: 'Рекреация и экотуризм',
    desc: 'Madaniy-ma’rifiy, turistik va dam olish maskanlarini tashkil etish.',
    icon: Compass,
    badge: 'Shartnoma asosida',
    color: 'border-[#E4E7EA] bg-white text-[#1A1F24] hover:border-[#2E7D4F]/50',
  },
  {
    id: 'firewood',
    titleUz: 'O‘tin va shox-shabba yig‘ish',
    titleRu: 'Сбор дров и хвороста',
    desc: 'Yiqilgan quruq shox-shabba va o‘rmon chiqindilarini tozalash va yig‘ish.',
    icon: Flame,
    badge: 'Sanitariya tozalovi',
    color: 'border-[#E4E7EA] bg-white text-[#1A1F24] hover:border-[#2E7D4F]/50',
  },
  {
    id: 'research',
    titleUz: 'Ilmiy-tadqiqot maqsadlari',
    titleRu: 'Научные исследования',
    desc: 'Flora va faunani o‘rganish, monitoring va ilmiy tajribalar o‘tkazish.',
    icon: GraduationCap,
    badge: 'Maxsus ruxsat',
    color: 'border-[#E4E7EA] bg-white text-[#1A1F24] hover:border-[#2E7D4F]/50',
  },
];

export const Step1ActivitySelection: React.FC<Step1ActivitySelectionProps> = ({
  selectedActivity = 'grazing',
  onSelectActivity,
  selectedRegion,
  onSelectRegion,
  selectedForestry,
  onSelectForestry,
  selectedDepartment,
  onSelectDepartment,
}) => {
  return (
    <div className="space-y-6 font-sans">
      {/* 1. Applicant Profile Auto-fill Banner */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-5 shadow-2xs">
        <div className="flex items-center justify-between pb-4 border-b border-[#F1F3F5]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F0F7F1] border border-[#2E7D4F]/20 flex items-center justify-center text-[#2E7D4F]">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#1A1F24]">Ariza beruvchi rekvizitlari (OneID integratsiyasi)</h2>
              <p className="text-xs text-[#5A646D]">Ma’lumotlar davlat reyestrlari va E-IMZO orqali avtomatik to‘ldirildi</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DCFCE7] text-[#15803D] text-xs font-bold border border-[#86EFAC]">
            <ShieldCheck className="w-4 h-4" />
            <span>Identifikatsiya tasdiqlangan</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 text-xs">
          <div className="bg-[#F8F9FA] p-3 rounded-xl border border-[#E4E7EA]">
            <span className="text-[#767F87] block mb-1">F.I.SH. / Yuridik shaxs:</span>
            <span className="font-bold text-[#1A1F24]">Saidov Otabek Shavkatovich</span>
          </div>
          <div className="bg-[#F8F9FA] p-3 rounded-xl border border-[#E4E7EA]">
            <span className="text-[#767F87] block mb-1">JShShIR / STIR:</span>
            <span className="font-bold text-[#1A1F24]">31205901234567 / 504123987</span>
          </div>
          <div className="bg-[#F8F9FA] p-3 rounded-xl border border-[#E4E7EA]">
            <span className="text-[#767F87] block mb-1">Aloqa telefoni:</span>
            <span className="font-bold text-[#1A1F24]">+998 (90) 123-45-67</span>
          </div>
          <div className="bg-[#F8F9FA] p-3 rounded-xl border border-[#E4E7EA]">
            <span className="text-[#767F87] block mb-1">Doimiy ro‘yxat manzili:</span>
            <span className="font-bold text-[#1A1F24] truncate block">Toshkent vil., Zangiota t., Guliston MFY</span>
          </div>
        </div>
      </div>

      {/* 2. Select Activity Type Grid */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-2xs">
        <div className="mb-5">
          <h2 className="text-base font-bold text-[#1A1F24] flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-[#2E7D4F]" />
            1. O‘rmondan foydalanish faoliyat turini tanlang
          </h2>
          <p className="text-xs text-[#5A646D] mt-1">
            Har bir faoliyat turi bo‘yicha O‘zbekiston Respublikasi VMQ qarorlari bilan tasdiqlangan me’yorlar va stavkalar qo‘llaniladi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ACTIVITIES.map((act) => {
            const isSelected = selectedActivity === act.id;
            const Icon = act.icon;

            return (
              <div
                key={act.id}
                onClick={() => onSelectActivity(act.id)}
                className={`relative p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between text-left ${
                  isSelected
                    ? 'border-[#2E7D4F] bg-[#F0F7F1] shadow-sm'
                    : 'border-[#E4E7EA] bg-white hover:border-[#2E7D4F]/40 hover:bg-[#F8F9FA]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isSelected
                          ? 'bg-[#2E7D4F] text-white'
                          : 'bg-[#F1F3F5] text-[#5A646D]'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                        isSelected
                          ? 'bg-white text-[#2E7D4F] border-[#2E7D4F]/30'
                          : 'bg-[#F8F9FA] text-[#767F87] border-[#E4E7EA]'
                      }`}
                    >
                      {act.badge}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-[#1A1F24] leading-snug">
                    {act.titleUz}
                  </h3>
                  <span className="text-[11px] text-[#767F87] block mb-2">{act.titleRu}</span>
                  <p className="text-xs text-[#5A646D] leading-relaxed">
                    {act.desc}
                  </p>
                </div>

                <div className="pt-4 mt-2 border-t border-[#E4E7EA]/60 flex items-center justify-between text-xs">
                  <span className={`font-semibold ${isSelected ? 'text-[#2E7D4F]' : 'text-[#767F87]'}`}>
                    {isSelected ? 'Tanlangan' : 'Tanlash uchun bosing'}
                  </span>
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                      isSelected
                        ? 'border-[#2E7D4F] bg-[#2E7D4F] text-white'
                        : 'border-[#CAD0D6] bg-white'
                    }`}
                  >
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Territorial Hierarchy Selector */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-2xs">
        <div className="mb-5">
          <h2 className="text-base font-bold text-[#1A1F24] flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#2E7D4F]" />
            2. Hudud va o‘rmon xo‘jaligini belgilang
          </h2>
          <p className="text-xs text-[#5A646D] mt-1">
            Hududiy ierarxiya bo‘yicha tanlangan o‘rmon xo‘jaligi va bo‘limining GIS xaritasi keyingi bosqichda ochiladi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#1A1F24] mb-1.5">
              Viloyat / Hudud
            </label>
            <select
              value={selectedRegion}
              onChange={(e) => onSelectRegion(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl border border-[#CAD0D6] bg-white text-xs font-medium text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F] focus:ring-1 focus:ring-[#2E7D4F]"
            >
              <option value="tashkent_reg">Toshkent viloyati</option>
              <option value="samarkand_reg">Samarqand viloyati</option>
              <option value="bukhara_reg">Buxoro viloyati</option>
              <option value="namangan_reg">Namangan viloyati</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1A1F24] mb-1.5">
              Davlat o‘rmon xo‘jaligi (DЎX)
            </label>
            <select
              value={selectedForestry}
              onChange={(e) => onSelectForestry(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl border border-[#CAD0D6] bg-white text-xs font-medium text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F] focus:ring-1 focus:ring-[#2E7D4F]"
            >
              <option value="zangiota">Zangiota davlat o‘rmon xo‘jaligi</option>
              <option value="parkent">Parkent davlat o‘rmon xo‘jaligi</option>
              <option value="burchmulla">Burchmulla davlat o‘rmon xo‘jaligi</option>
              <option value="ohangaron">Ohangaron davlat o‘rmon xo‘jaligi</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1A1F24] mb-1.5">
              O‘rmon bo‘limi / Obxod / Kvartal
            </label>
            <select
              value={selectedDepartment}
              onChange={(e) => onSelectDepartment(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl border border-[#CAD0D6] bg-white text-xs font-medium text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F] focus:ring-1 focus:ring-[#2E7D4F]"
            >
              <option value="chinoz_12">Chinoz o‘rmon bo‘limi (3-aylanma, 12-kvartal)</option>
              <option value="zangiota_5">Zangiota o‘rmon bo‘limi (1-aylanma, 5-kvartal)</option>
              <option value="yangiyol_8">Yangiyo‘l o‘rmon bo‘limi (2-aylanma, 8-kvartal)</option>
            </select>
          </div>
        </div>

        <div className="mt-4 p-3.5 bg-[#F0F7F1] border border-[#86EFAC] rounded-xl flex items-center gap-3 text-xs text-[#15803D]">
          <Building2 className="w-4 h-4 shrink-0" />
          <span>
            Tanlangan hudud bo‘yicha bazada <strong>14 ta tasdiqlangan (Published) GIS kontur</strong> va <strong>VMQ 689 me’yorlari</strong> mavjud.
          </span>
        </div>
      </div>
    </div>
  );
};
