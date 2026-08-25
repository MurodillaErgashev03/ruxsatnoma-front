import React, { useMemo, useState } from 'react';
import { 
  Calendar, 
  Calculator, 
  AlertCircle, 
  CheckCircle2, 
  TrendingUp, 
  Coins, 
  Layers,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export interface LivestockCounts {
  adultCattle: number; // Katta qoramol, ot, tuya (1.0 SB)
  youngCattle: number; // 2 yoshgacha yosh mollar (0.5 SB)
  adultSheep: number;  // 6 oylikdan katta qo'y/echki (0.1 SB)
  youngSheep: number;  // 6 oylikgacha qo'zi/uloq (0.05 SB)
}

export interface Step3ParametersProps {
  startDate: string;
  onStartDateChange: (val: string) => void;
  endDate: string;
  onEndDateChange: (val: string) => void;
  livestockCounts: LivestockCounts;
  onLivestockCountChange: (key: keyof LivestockCounts, val: number) => void;
  remainingSB?: number;
}

export const Step3Parameters: React.FC<Step3ParametersProps> = ({
  startDate = '2026-04-01',
  onStartDateChange,
  endDate = '2026-10-31',
  onEndDateChange,
  livestockCounts,
  onLivestockCountChange,
  remainingSB = 10,
}) => {
  const [showTariffDetails, setShowTariffDetails] = useState<boolean>(false);

  // CoefSB coefficients according to VMQ 689-son 5-ilova
  const COEF = {
    adultCattle: 1.0,
    youngCattle: 0.5,
    adultSheep: 0.1,
    youngSheep: 0.05,
  };

  // Tariff calculation (BHM = 375,000 UZS)
  const BHM = 375000;
  const RATES = {
    adultCattle: 0.2 * BHM, // 75,000 UZS
    youngCattle: 0.1 * BHM, // 37,500 UZS
    adultSheep: 0.04 * BHM, // 15,000 UZS
    youngSheep: 0.02 * BHM, // 7,500 UZS
  };

  // Calculate UsedSB
  const usedSB = useMemo(() => {
    const total =
      (livestockCounts.adultCattle || 0) * COEF.adultCattle +
      (livestockCounts.youngCattle || 0) * COEF.youngCattle +
      (livestockCounts.adultSheep || 0) * COEF.adultSheep +
      (livestockCounts.youngSheep || 0) * COEF.youngSheep;
    return Number(total.toFixed(2));
  }, [livestockCounts, COEF.adultCattle, COEF.youngCattle, COEF.adultSheep, COEF.youngSheep]);

  // Calculate total payment
  const totalAmount = useMemo(() => {
    return (
      (livestockCounts.adultCattle || 0) * RATES.adultCattle +
      (livestockCounts.youngCattle || 0) * RATES.youngCattle +
      (livestockCounts.adultSheep || 0) * RATES.adultSheep +
      (livestockCounts.youngSheep || 0) * RATES.youngSheep
    );
  }, [livestockCounts, RATES.adultCattle, RATES.youngCattle, RATES.adultSheep, RATES.youngSheep]);

  const isOverLimit = usedSB > remainingSB;
  const isZero = usedSB === 0;
  const remainingHeadCapacity = Number((remainingSB - usedSB).toFixed(1));

  return (
    <div className="space-y-6 font-sans">
      {/* 1. Top Smart Capacity Header */}
      <div className="bg-gradient-to-r from-[#2E7D4F]/10 via-white to-[#2E7D4F]/5 border border-[#86EFAC] rounded-3xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#2E7D4F] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#DCFCE7] text-[#15803D] border border-[#86EFAC]">
                  3-bosqich: Parametrlar
                </span>
                <span className="text-xs text-[#5A646D]">
                  Maksimal ruxsat: <strong>{remainingSB} shartli bosh</strong>
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-[#14532D] mt-1">
                Yaylovga qo‘ymoqchi bo‘lgan chorva mollarining sonini kiriting
              </h2>
              <p className="text-xs text-[#4B5563] mt-0.5">
                Pastdagi turlar bo‘yicha bosh sonini kiritsangiz, tizim ruxsat etilgan limitni va to‘lov summasini avtomatik hisoblab beradi.
              </p>
            </div>
          </div>

          <div className="bg-white px-5 py-3 rounded-2xl border border-[#86EFAC] shadow-2xs text-center shrink-0">
            <span className="text-[11px] text-[#5A646D] block">Yaylov imkoniyati</span>
            <span className="text-2xl font-black text-[#15803D]">{remainingSB} <span className="text-xs font-semibold">shartli bosh</span></span>
          </div>
        </div>
      </div>

      {/* 2. Season and Date Range Section */}
      <div className="bg-white border border-[#E4E7EA] rounded-3xl p-6 shadow-2xs">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#1A1F24] flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#2E7D4F]" />
            1. Foydalanish mavsumi (VMQ 689 bo‘yicha 212 kunlik qonuniy oraliq)
          </h3>
          <span className="text-[11px] font-bold text-[#2E7D4F] bg-[#F0F7F1] px-3 py-1 rounded-full border border-[#2E7D4F]/20">
            Mavsumiy foydalanish
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#1A1F24] mb-1.5">
              Boshlanish sanasi
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => onStartDateChange(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl border border-[#CAD0D6] bg-white text-xs font-medium text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1A1F24] mb-1.5">
              Tugash sanasi
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => onEndDateChange(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl border border-[#CAD0D6] bg-white text-xs font-medium text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
            />
          </div>

          <div className="bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl p-3 flex flex-col justify-center text-xs">
            <span className="text-[#767F87] block mb-0.5">Jami mavsum davomiyligi:</span>
            <span className="font-bold text-[#1A1F24] text-sm">214 kalendar kuni</span>
          </div>
        </div>
      </div>

      {/* 3. Livestock Inputs & Smart Live Capacity Meter */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-6 items-start">
        {/* Left Column: 4 Livestock Inputs */}
        <div className="bg-white border border-[#E4E7EA] rounded-3xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#F1F3F5]">
            <div>
              <h3 className="text-sm font-bold text-[#1A1F24]">2. Chorva mollarini turlar bo‘yicha kiritish</h3>
              <p className="text-xs text-[#5A646D]">Tegishli toifadagi `+` va `-` tugmalari yordamida bosh sonini belgilang</p>
            </div>
            <span className="text-xs text-[#767F87]">Bosh soni</span>
          </div>

          {/* Group 1: Adult Cattle */}
          <div className="p-4 rounded-2xl border border-[#E4E7EA] hover:border-[#2E7D4F]/50 bg-[#FBFDFB] transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs sm:text-sm text-[#1A1F24]">
                    1. Katta yoshdagi qoramol, ot, tuya, eshak
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F0F7F1] text-[#2E7D4F] border border-[#2E7D4F]/20 shrink-0">
                    1 bosh = 1 SB
                  </span>
                </div>
                <p className="text-[11px] text-[#5A646D] mt-0.5">Katta mollar (sigir, buqa, ot, tuya)</p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="flex items-center border border-[#CAD0D6] rounded-xl overflow-hidden bg-white shadow-2xs">
                  <button
                    onClick={() => onLivestockCountChange('adultCattle', Math.max(0, livestockCounts.adultCattle - 1))}
                    className="w-10 h-10 flex items-center justify-center font-bold text-lg hover:bg-[#F1F3F5] text-[#1A1F24] cursor-pointer"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="0"
                    value={livestockCounts.adultCattle}
                    onChange={(e) => onLivestockCountChange('adultCattle', Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-14 h-10 text-center font-bold text-sm text-[#1A1F24] focus:outline-none border-x border-[#E4E7EA]"
                  />
                  <button
                    onClick={() => onLivestockCountChange('adultCattle', livestockCounts.adultCattle + 1)}
                    className="w-10 h-10 flex items-center justify-center font-bold text-lg hover:bg-[#F1F3F5] text-[#1A1F24] cursor-pointer"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs font-bold text-[#2E7D4F] w-14 text-right">
                  {(livestockCounts.adultCattle * COEF.adultCattle).toFixed(1)} SB
                </span>
              </div>
            </div>
          </div>

          {/* Group 2: Young cattle */}
          <div className="p-4 rounded-2xl border border-[#E4E7EA] hover:border-[#2E7D4F]/50 bg-[#FBFDFB] transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs sm:text-sm text-[#1A1F24]">
                    2. 2 yoshgacha bo‘lgan yosh qoramollar
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F0F7F1] text-[#2E7D4F] border border-[#2E7D4F]/20 shrink-0">
                    2 bosh = 1 SB
                  </span>
                </div>
                <p className="text-[11px] text-[#5A646D] mt-0.5">Buzoq, tana, toychoqlar</p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="flex items-center border border-[#CAD0D6] rounded-xl overflow-hidden bg-white shadow-2xs">
                  <button
                    onClick={() => onLivestockCountChange('youngCattle', Math.max(0, livestockCounts.youngCattle - 1))}
                    className="w-10 h-10 flex items-center justify-center font-bold text-lg hover:bg-[#F1F3F5] text-[#1A1F24] cursor-pointer"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="0"
                    value={livestockCounts.youngCattle}
                    onChange={(e) => onLivestockCountChange('youngCattle', Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-14 h-10 text-center font-bold text-sm text-[#1A1F24] focus:outline-none border-x border-[#E4E7EA]"
                  />
                  <button
                    onClick={() => onLivestockCountChange('youngCattle', livestockCounts.youngCattle + 1)}
                    className="w-10 h-10 flex items-center justify-center font-bold text-lg hover:bg-[#F1F3F5] text-[#1A1F24] cursor-pointer"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs font-bold text-[#2E7D4F] w-14 text-right">
                  {(livestockCounts.youngCattle * COEF.youngCattle).toFixed(1)} SB
                </span>
              </div>
            </div>
          </div>

          {/* Group 3: Adult Sheep and Goats */}
          <div className="p-4 rounded-2xl border border-[#E4E7EA] hover:border-[#2E7D4F]/50 bg-[#FBFDFB] transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs sm:text-sm text-[#1A1F24]">
                    3. 6 oylikdan katta qo‘y va echkilar
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F0F7F1] text-[#2E7D4F] border border-[#2E7D4F]/20 shrink-0">
                    10 bosh = 1 SB
                  </span>
                </div>
                <p className="text-[11px] text-[#5A646D] mt-0.5">Katta qo‘y, sovliq, echkilar</p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="flex items-center border border-[#CAD0D6] rounded-xl overflow-hidden bg-white shadow-2xs">
                  <button
                    onClick={() => onLivestockCountChange('adultSheep', Math.max(0, livestockCounts.adultSheep - 5))}
                    className="w-10 h-10 flex items-center justify-center font-bold text-lg hover:bg-[#F1F3F5] text-[#1A1F24] cursor-pointer"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="0"
                    value={livestockCounts.adultSheep}
                    onChange={(e) => onLivestockCountChange('adultSheep', Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-14 h-10 text-center font-bold text-sm text-[#1A1F24] focus:outline-none border-x border-[#E4E7EA]"
                  />
                  <button
                    onClick={() => onLivestockCountChange('adultSheep', livestockCounts.adultSheep + 5)}
                    className="w-10 h-10 flex items-center justify-center font-bold text-lg hover:bg-[#F1F3F5] text-[#1A1F24] cursor-pointer"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs font-bold text-[#2E7D4F] w-14 text-right">
                  {(livestockCounts.adultSheep * COEF.adultSheep).toFixed(1)} SB
                </span>
              </div>
            </div>
          </div>

          {/* Group 4: Lambs and Kids */}
          <div className="p-4 rounded-2xl border border-[#E4E7EA] hover:border-[#2E7D4F]/50 bg-[#FBFDFB] transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs sm:text-sm text-[#1A1F24]">
                    4. 6 oylikgacha bo‘lgan qo‘zi va uloqlar
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F0F7F1] text-[#2E7D4F] border border-[#2E7D4F]/20 shrink-0">
                    20 bosh = 1 SB
                  </span>
                </div>
                <p className="text-[11px] text-[#5A646D] mt-0.5">Kichik yoshdagi qo‘zichoq va uloqchalar</p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="flex items-center border border-[#CAD0D6] rounded-xl overflow-hidden bg-white shadow-2xs">
                  <button
                    onClick={() => onLivestockCountChange('youngSheep', Math.max(0, livestockCounts.youngSheep - 5))}
                    className="w-10 h-10 flex items-center justify-center font-bold text-lg hover:bg-[#F1F3F5] text-[#1A1F24] cursor-pointer"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="0"
                    value={livestockCounts.youngSheep}
                    onChange={(e) => onLivestockCountChange('youngSheep', Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-14 h-10 text-center font-bold text-sm text-[#1A1F24] focus:outline-none border-x border-[#E4E7EA]"
                  />
                  <button
                    onClick={() => onLivestockCountChange('youngSheep', livestockCounts.youngSheep + 5)}
                    className="w-10 h-10 flex items-center justify-center font-bold text-lg hover:bg-[#F1F3F5] text-[#1A1F24] cursor-pointer"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs font-bold text-[#2E7D4F] w-14 text-right">
                  {(livestockCounts.youngSheep * COEF.youngSheep).toFixed(1)} SB
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Smart Load Meter & Clean Invoice */}
        <div className="space-y-6">
          {/* Smart Capacity Meter Card */}
          <div
            className={`border-2 rounded-3xl p-6 shadow-sm transition-all ${
              isOverLimit
                ? 'bg-[#FEF2F2] border-[#EF4444]'
                : isZero
                ? 'bg-white border-[#E4E7EA]'
                : 'bg-[#F0FDF4] border-[#86EFAC]'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#1A1F24] flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-[#2E7D4F]" />
                Yaylov bandligi
              </span>
              <span
                className={`text-xs font-bold px-3 py-0.5 rounded-full ${
                  isOverLimit
                    ? 'bg-[#FEE2E2] text-[#B91C1C]'
                    : isZero
                    ? 'bg-[#F1F3F5] text-[#767F87]'
                    : 'bg-[#DCFCE7] text-[#15803D]'
                }`}
              >
                {isOverLimit ? 'Me’yordan ortiq' : isZero ? 'Kiritilmagan' : 'Ruxsat etilgan'}
              </span>
            </div>

            <div className="flex items-baseline justify-between py-2 border-b border-black/5">
              <span className="text-xs text-[#5A646D]">Siz kiritgan chorvalar:</span>
              <span
                className={`text-3xl font-black ${
                  isOverLimit ? 'text-[#B91C1C]' : 'text-[#15803D]'
                }`}
              >
                {usedSB} <span className="text-xs font-semibold text-[#5A646D]">/ {remainingSB} SB</span>
              </span>
            </div>

            <div className="pt-3 text-xs space-y-2">
              <div className="w-full bg-[#E4E7EA] h-3 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    isOverLimit ? 'bg-[#EF4444]' : 'bg-[#15803D]'
                  }`}
                  style={{ width: `${Math.min((usedSB / remainingSB) * 100, 100)}%` }}
                />
              </div>

              {/* Dynamic Friendly Advice */}
              {isOverLimit ? (
                <div className="p-3 bg-white rounded-xl border border-[#FCA5A5] text-[#B91C1C] text-xs font-semibold space-y-1">
                  <div className="flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>Me’yordan oshib ketdi!</span>
                  </div>
                  <p className="text-[11px] font-normal leading-tight">
                    Kiritilgan chorva yaylov imkoniyatidan {(usedSB - remainingSB).toFixed(1)} shartli boshga ko‘p. Davom etish uchun chorva sonini kamaytiring.
                  </p>
                </div>
              ) : isZero ? (
                <div className="text-[11px] text-[#767F87] pt-1">
                  Iltimos, yuqoridagi ro‘yxatdan boqmoqchi bo‘lgan chorva sonini kiriting.
                </div>
              ) : (
                <div className="p-3 bg-white rounded-xl border border-[#86EFAC] text-[#15803D] text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Me’yorga to‘liq mos keladi</span>
                  </div>
                  <p className="text-[11px] font-normal leading-tight text-[#166534]">
                    {remainingHeadCapacity > 0
                      ? `Yana ${remainingHeadCapacity} shartli bosh (masalan, ${Math.floor(remainingHeadCapacity)} ta qoramol yoki ${Math.floor(remainingHeadCapacity * 10)} ta qo‘y) qo‘shishingiz mumkin.`
                      : 'Yaylov imkoniyati to‘liq 100% band qilindi.'}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Clean Invoice & Tariff Breakdown */}
          <div className="bg-white border border-[#E4E7EA] rounded-3xl p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F3F5]">
              <div className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-[#2E7D4F]" />
                <h4 className="text-sm font-bold text-[#1A1F24]">Mavsumiy to‘lov hisobi</h4>
              </div>
              <span className="text-[10px] text-[#767F87]">VMQ 278-son stavkalari</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-[#5A646D]">
                <span>Chorva soni bo‘yicha to‘lov:</span>
                <span className="font-semibold text-[#1A1F24]">{totalAmount.toLocaleString()} so‘m</span>
              </div>
              <div className="flex justify-between text-[#5A646D]">
                <span>Mavsumiy koeffitsiyent:</span>
                <span className="font-semibold text-[#1A1F24]">1.0 (to‘liq mavsum)</span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#F1F3F5] flex items-baseline justify-between">
              <span className="text-xs font-bold text-[#1A1F24]">Jami to‘lanadigan summa:</span>
              <span className="text-xl font-black text-[#2E7D4F]">
                {totalAmount.toLocaleString()} <span className="text-xs font-bold">so‘m</span>
              </span>
            </div>

            {/* Collapsible Fund Distribution */}
            <div className="pt-2">
              <button
                onClick={() => setShowTariffDetails(!showTariffDetails)}
                className="w-full flex items-center justify-between text-[11px] text-[#5A646D] hover:text-[#1A1F24] font-semibold py-1.5 px-2 rounded-lg hover:bg-[#F8F9FA] transition-all cursor-pointer"
              >
                <div className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#2E7D4F]" />
                  <span>50/50 Mablag‘lar taqsimoti (VMQ 278)</span>
                </div>
                {showTariffDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {showTariffDetails && (
                <div className="mt-2 p-3 bg-[#F8F9FA] rounded-xl border border-[#E4E7EA] text-[11px] text-[#5A646D] space-y-1.5 animate-fadeIn">
                  <div className="flex justify-between">
                    <span>• O‘rmon fondini rivojlantirish jamg‘armasi (50%):</span>
                    <span className="font-bold text-[#1A1F24]">{(totalAmount / 2).toLocaleString()} so‘m</span>
                  </div>
                  <div className="flex justify-between">
                    <span>• Davlat byudjeti (50%):</span>
                    <span className="font-bold text-[#1A1F24]">{(totalAmount / 2).toLocaleString()} so‘m</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
