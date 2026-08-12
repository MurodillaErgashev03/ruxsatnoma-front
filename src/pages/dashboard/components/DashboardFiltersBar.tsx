import React, { useState } from 'react';
import { Filter, Calendar, MapPin, Layers, Eye, RefreshCw } from 'lucide-react';

export interface DashboardFiltersBarProps {
  onPeriodChange?: (period: string) => void;
  onRegionChange?: (region: string) => void;
  onActivityChange?: (activity: string) => void;
  onToggleOpenData?: (enabled: boolean) => void;
}

export const DashboardFiltersBar: React.FC<DashboardFiltersBarProps> = ({
  onPeriodChange,
  onRegionChange,
  onActivityChange,
  onToggleOpenData,
}) => {
  const [activePeriod, setActivePeriod] = useState<string>('ytd');
  const [isOpenDataEnabled, setIsOpenDataEnabled] = useState<boolean>(true);

  const handlePeriodClick = (p: string) => {
    setActivePeriod(p);
    onPeriodChange?.(p);
  };

  const handleOpenDataToggle = () => {
    const nextVal = !isOpenDataEnabled;
    setIsOpenDataEnabled(nextVal);
    onToggleOpenData?.(nextVal);
  };

  return (
    <div className="bg-white border border-[#E4E7EA] rounded-2xl p-5 shadow-xs font-sans space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E4E7EA] pb-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5A646D]">
          <Filter className="w-4 h-4 text-[#2E7D4F]" />
          <span>Analitik filtrlar va kesimlar (Фильтры)</span>
        </div>
        <span className="text-[11px] font-mono text-[#5A646D]">
          Oxirgi yangilanish: Bugun, 09:15 · Avto-yangilanish: har 15 daqiqa
        </span>
      </div>

      <div className="flex flex-wrap items-end gap-4">
        {/* Period Segment Filter */}
        <div className="space-y-1.5 flex-1 min-w-[280px]">
          <label className="text-xs font-bold text-[#5A646D] uppercase tracking-wider flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-[#2E7D4F]" /> Davr (Период)
          </label>
          <div className="flex border border-[#767F87] rounded-xl overflow-hidden text-xs bg-white">
            {[
              { id: 'month', label: 'Oy' },
              { id: 'quarter', label: 'Kvartal' },
              { id: 'ytd', label: 'Yil boshidan' },
              { id: 'year', label: 'Yil' },
              { id: 'custom', label: 'Ixtiyoriy…' },
            ].map((item) => {
              const isSelected = activePeriod === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handlePeriodClick(item.id)}
                  className={`flex-1 py-2 px-3 text-center transition-all cursor-pointer font-medium ${
                    isSelected
                      ? 'bg-[#2E7D4F] text-white font-bold'
                      : 'text-[#1A1F24] hover:bg-[#F8F9FA]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Region / Territory Select */}
        <div className="space-y-1.5 min-w-[210px]">
          <label className="text-xs font-bold text-[#5A646D] uppercase tracking-wider flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#2E7D4F]" /> Hudud (Разрез: территория)
          </label>
          <select
            onChange={(e) => onRegionChange?.(e.target.value)}
            className="w-full text-xs font-bold border border-[#767F87] rounded-xl px-3 h-10 bg-white text-[#1A1F24] focus:outline-none focus:ring-2 focus:ring-[#2E7D4F]"
          >
            <option value="all">Respublika — barcha 14 viloyat</option>
            <option value="tashkent">Toshkent viloyati</option>
            <option value="qashqadaryo">Qashqadaryo viloyati</option>
            <option value="surxondaryo">Surxondaryo viloyati</option>
            <option value="fergana">Fargʻona viloyati</option>
            <option value="samarkand">Samarqand viloyati</option>
          </select>
        </div>

        {/* Activity Select */}
        <div className="space-y-1.5 min-w-[190px]">
          <label className="text-xs font-bold text-[#5A646D] uppercase tracking-wider flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-[#2E7D4F]" /> Faoliyat turi
          </label>
          <select
            onChange={(e) => onActivityChange?.(e.target.value)}
            className="w-full text-xs font-bold border border-[#767F87] rounded-xl px-3 h-10 bg-white text-[#1A1F24] focus:outline-none focus:ring-2 focus:ring-[#2E7D4F]"
          >
            <option value="all">Barcha 6 faoliyat turi</option>
            <option value="grazing">Chorva molini boqish</option>
            <option value="haymaking">Pichan oʻrish</option>
            <option value="beekeeping">Asalari uyasi joylashtirish</option>
            <option value="medicinal">Dorivor oʻsimlik yigʻish</option>
          </select>
        </div>

        {/* Open-Data Preview Switch */}
        <div className="space-y-1.5">
          <span className="text-xs font-bold text-[#5A646D] uppercase tracking-wider block">
            Koʻrish rejimi
          </span>
          <button
            type="button"
            onClick={handleOpenDataToggle}
            className="flex items-center gap-2 h-10 px-3 border border-[#767F87] rounded-xl bg-white text-xs font-medium text-[#1A1F24] hover:bg-[#F8F9FA] cursor-pointer select-none"
          >
            <div
              className={`w-8 h-4 rounded-full transition-all relative ${
                isOpenDataEnabled ? 'bg-[#2E7D4F]' : 'bg-[#9AA3AB]'
              }`}
            >
              <div
                className={`w-3.5 h-3.5 rounded-full bg-white transition-all absolute top-0.25 ${
                  isOpenDataEnabled ? 'left-4' : 'left-0.5'
                }`}
              />
            </div>
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-[#0369A1]" /> Ochiq ma'lumotlar: <strong className="text-[#2E7D4F]">{isOpenDataEnabled ? 'Yoniq' : 'Oʻchiq'}</strong>
            </span>
          </button>
        </div>
      </div>

      <div className="text-[11px] text-[#5A646D] pt-2 border-t border-[#E4E7EA] flex flex-wrap items-center justify-between gap-2">
        <span>
          Ierarxiya kesimi: Respublika → Viloyat → Tuman → Oʻrmon xoʻjaligi → Kontur.
        </span>
        <span className="flex items-center gap-1 text-[#0369A1] font-semibold">
          <RefreshCw className="w-3 h-3 animate-spin" /> Yirik kesim asinxron hisoblanmoqda (S21 ssenariy)
        </span>
      </div>
    </div>
  );
};
