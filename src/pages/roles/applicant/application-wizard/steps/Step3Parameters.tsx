import React, { useMemo } from 'react';
import { 
  Calendar, 
  Calculator, 
  AlertCircle, 
  CheckCircle2, 
  TrendingUp, 
  Coins, 
  Scale, 
  Layers
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
  // CoefSB coefficients according to VMQ 689-son 5-ilova
  const COEF = {
    adultCattle: 1.0,
    youngCattle: 0.5,
    adultSheep: 0.1,
    youngSheep: 0.05,
  };

  // Tariff calculation (BHM = 375,000 UZS)
  const BHM = 375000;
  // Rates per head/season (example VMQ 278 tariff)
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
  }, [livestockCounts]);

  // Calculate total payment
  const totalAmount = useMemo(() => {
    return (
      (livestockCounts.adultCattle || 0) * RATES.adultCattle +
      (livestockCounts.youngCattle || 0) * RATES.youngCattle +
      (livestockCounts.adultSheep || 0) * RATES.adultSheep +
      (livestockCounts.youngSheep || 0) * RATES.youngSheep
    );
  }, [livestockCounts]);

  const isOverLimit = usedSB > remainingSB;
  const isZero = usedSB === 0;

  return (
    <div className="space-y-6 font-sans">
      {/* 1. Header Guide Card */}
      <div className="bg-gradient-to-r from-[#2E7D4F]/10 via-[#2E7D4F]/5 to-transparent border border-[#2E7D4F]/20 rounded-2xl p-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2E7D4F] text-white flex items-center justify-center shadow-xs">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#1A1F24]">
                3-bosqich: Mavsum parametrlari va Chorva bosh sonini kiritish
              </h2>
              <p className="text-xs text-[#5A646D]">
                VMQ 689-son qaroriga ko‘ra 04-12-007 kontur bo‘yicha maksimal ruxsat etilgan me’yor: <strong>{remainingSB} shartli bosh (SB)</strong>
              </p>
            </div>
          </div>
          <div className="px-4 py-2 bg-white rounded-xl border border-[#CAD0D6] shadow-2xs flex items-center gap-2">
            <Scale className="w-4 h-4 text-[#2E7D4F]" />
            <span className="text-xs font-bold text-[#1A1F24]">
              Ruxsat etilgan limit: <span className="text-[#2E7D4F] text-sm">{remainingSB} SB</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. Season and Date Range Section */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-2xs">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#1A1F24] flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#2E7D4F]" />
            1. Foydalanish davri va mavsum taqvimi (VMQ 689 bo‘yicha 212 kun)
          </h3>
          <span className="text-[11px] font-bold text-[#2E7D4F] bg-[#F0F7F1] px-2.5 py-0.5 rounded-full border border-[#2E7D4F]/20">
            Mavsum ulushi: 0.58
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#1A1F24] mb-1.5">
              Boshlanish sanasi (от)
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
              Tugash sanasi (до)
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => onEndDateChange(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl border border-[#CAD0D6] bg-white text-xs font-medium text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
            />
          </div>

          <div className="bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl p-3 flex flex-col justify-center text-xs">
            <span className="text-[#767F87] block mb-0.5">Jami foydalanish davomiyligi:</span>
            <span className="font-bold text-[#1A1F24] text-sm">214 kalendar kuni (Mavsumiy)</span>
          </div>
        </div>
      </div>

      {/* 3. Livestock Groups Input Grid & Real-time UsedSB Balancing */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">
        {/* Left Column: 4 Livestock Inputs */}
        <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-2xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#F1F3F5]">
            <div>
              <h3 className="text-sm font-bold text-[#1A1F24]">2. Chorva tarkibi va bosh soni</h3>
              <p className="text-xs text-[#5A646D]">VMQ 689-sonli qarorning 5-ilovasidagi me’yoriy koeffitsiyentlar</p>
            </div>
            <span className="text-xs text-[#767F87]">Bosh sonini kiriting</span>
          </div>

          {/* Group 1: Adult Cattle, Horses, Camels (1.0 SB) */}
          <div className="p-4 rounded-xl border border-[#E4E7EA] hover:border-[#2E7D4F]/40 bg-[#FBFDFB] transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-[#1A1F24]">
                    1. Katta yoshdagi qoramol, ot, tuya, eshak
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#F0F7F1] text-[#2E7D4F] border border-[#2E7D4F]/20">
                    1 bosh = 1.0 SB
                  </span>
                </div>
                <p className="text-[11px] text-[#5A646D] mt-0.5">Взрослые: крупный рогатый скот, лошади, верблюды, ослы</p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="flex items-center border border-[#CAD0D6] rounded-xl overflow-hidden bg-white">
                  <button
                    onClick={() => onLivestockCountChange('adultCattle', Math.max(0, livestockCounts.adultCattle - 1))}
                    className="w-9 h-9 flex items-center justify-center font-bold text-base hover:bg-[#F1F3F5] text-[#1A1F24]"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="0"
                    value={livestockCounts.adultCattle}
                    onChange={(e) => onLivestockCountChange('adultCattle', Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-14 h-9 text-center font-bold text-sm text-[#1A1F24] focus:outline-none border-x border-[#E4E7EA]"
                  />
                  <button
                    onClick={() => onLivestockCountChange('adultCattle', livestockCounts.adultCattle + 1)}
                    className="w-9 h-9 flex items-center justify-center font-bold text-base hover:bg-[#F1F3F5] text-[#1A1F24]"
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

          {/* Group 2: Young cattle up to 2 years (0.5 SB) */}
          <div className="p-4 rounded-xl border border-[#E4E7EA] hover:border-[#2E7D4F]/40 bg-[#FBFDFB] transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-[#1A1F24]">
                    2. 2 yoshgacha bo‘lgan yosh qoramollar
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#F0F7F1] text-[#2E7D4F] border border-[#2E7D4F]/20">
                    1 bosh = 0.5 SB
                  </span>
                </div>
                <p className="text-[11px] text-[#5A646D] mt-0.5">Молодняк до 2 лет: крупный рогатый скот, лошади, верблюды</p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="flex items-center border border-[#CAD0D6] rounded-xl overflow-hidden bg-white">
                  <button
                    onClick={() => onLivestockCountChange('youngCattle', Math.max(0, livestockCounts.youngCattle - 1))}
                    className="w-9 h-9 flex items-center justify-center font-bold text-base hover:bg-[#F1F3F5] text-[#1A1F24]"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="0"
                    value={livestockCounts.youngCattle}
                    onChange={(e) => onLivestockCountChange('youngCattle', Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-14 h-9 text-center font-bold text-sm text-[#1A1F24] focus:outline-none border-x border-[#E4E7EA]"
                  />
                  <button
                    onClick={() => onLivestockCountChange('youngCattle', livestockCounts.youngCattle + 1)}
                    className="w-9 h-9 flex items-center justify-center font-bold text-base hover:bg-[#F1F3F5] text-[#1A1F24]"
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

          {/* Group 3: Sheep and Goats over 6 months (0.1 SB) */}
          <div className="p-4 rounded-xl border border-[#E4E7EA] hover:border-[#2E7D4F]/40 bg-[#FBFDFB] transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-[#1A1F24]">
                    3. 6 oylikdan katta qo‘y va echkilar
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#F0F7F1] text-[#2E7D4F] border border-[#2E7D4F]/20">
                    1 bosh = 0.1 SB
                  </span>
                </div>
                <p className="text-[11px] text-[#5A646D] mt-0.5">Старше 6 месяцев: овцы, козы</p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="flex items-center border border-[#CAD0D6] rounded-xl overflow-hidden bg-white">
                  <button
                    onClick={() => onLivestockCountChange('adultSheep', Math.max(0, livestockCounts.adultSheep - 5))}
                    className="w-9 h-9 flex items-center justify-center font-bold text-base hover:bg-[#F1F3F5] text-[#1A1F24]"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="0"
                    value={livestockCounts.adultSheep}
                    onChange={(e) => onLivestockCountChange('adultSheep', Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-14 h-9 text-center font-bold text-sm text-[#1A1F24] focus:outline-none border-x border-[#E4E7EA]"
                  />
                  <button
                    onClick={() => onLivestockCountChange('adultSheep', livestockCounts.adultSheep + 5)}
                    className="w-9 h-9 flex items-center justify-center font-bold text-base hover:bg-[#F1F3F5] text-[#1A1F24]"
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

          {/* Group 4: Lambs and Kids up to 6 months (0.05 SB) */}
          <div className="p-4 rounded-xl border border-[#E4E7EA] hover:border-[#2E7D4F]/40 bg-[#FBFDFB] transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-[#1A1F24]">
                    4. 6 oylikgacha bo‘lgan qo‘zi va uloqlar
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#F0F7F1] text-[#2E7D4F] border border-[#2E7D4F]/20">
                    1 bosh = 0.05 SB
                  </span>
                </div>
                <p className="text-[11px] text-[#5A646D] mt-0.5">До 6 месяцев: ягнята, козлята</p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="flex items-center border border-[#CAD0D6] rounded-xl overflow-hidden bg-white">
                  <button
                    onClick={() => onLivestockCountChange('youngSheep', Math.max(0, livestockCounts.youngSheep - 5))}
                    className="w-9 h-9 flex items-center justify-center font-bold text-base hover:bg-[#F1F3F5] text-[#1A1F24]"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="0"
                    value={livestockCounts.youngSheep}
                    onChange={(e) => onLivestockCountChange('youngSheep', Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-14 h-9 text-center font-bold text-sm text-[#1A1F24] focus:outline-none border-x border-[#E4E7EA]"
                  />
                  <button
                    onClick={() => onLivestockCountChange('youngSheep', livestockCounts.youngSheep + 5)}
                    className="w-9 h-9 flex items-center justify-center font-bold text-base hover:bg-[#F1F3F5] text-[#1A1F24]"
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

        {/* Right Column: Live SB Load Balance & Tariff Card */}
        <div className="space-y-6">
          {/* SB Limit Balance Card */}
          <div
            className={`border rounded-2xl p-5 shadow-2xs transition-all ${
              isOverLimit
                ? 'bg-[#FEF2F2] border-[#FCA5A5]'
                : isZero
                ? 'bg-white border-[#E4E7EA]'
                : 'bg-[#F0F7F1] border-[#86EFAC]'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#1A1F24] flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-[#2E7D4F]" />
                Yuklama balansi (UsedSB)
              </span>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-full ${
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
              <span className="text-xs text-[#5A646D]">Kiritilgan shartli bosh:</span>
              <span
                className={`text-2xl font-black ${
                  isOverLimit ? 'text-[#B91C1C]' : 'text-[#2E7D4F]'
                }`}
              >
                {usedSB} <span className="text-xs font-semibold">/ {remainingSB} SB</span>
              </span>
            </div>

            <div className="pt-3 text-xs space-y-2">
              <div className="w-full bg-[#E4E7EA] h-2.5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    isOverLimit ? 'bg-[#EF4444]' : 'bg-[#2E7D4F]'
                  }`}
                  style={{ width: `${Math.min((usedSB / remainingSB) * 100, 100)}%` }}
                />
              </div>

              {isOverLimit ? (
                <div className="flex items-start gap-1.5 text-[#B91C1C] text-[11px] font-semibold pt-1">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>
                    ERR-NORM-002: Kiritilgan chorva soni ruxsat etilgan {remainingSB} SB limitidan {(usedSB - remainingSB).toFixed(1)} SB ga oshdi.
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-[#15803D] text-[11px] font-semibold pt-1">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>
                    Chorva yuki ruxsat etilgan me’yor ichida ({remainingSB - usedSB > 0 ? `yana ${(remainingSB - usedSB).toFixed(1)} SB zaxira bor` : 'to‘liq band qilindi'}).
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* VMQ 278 Tariff & Payment Breakdown */}
          <div className="bg-white border border-[#E4E7EA] rounded-2xl p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F3F5]">
              <div className="flex items-center gap-2">
                <Coins className="w-4 h-4 text-[#2E7D4F]" />
                <h4 className="text-xs font-bold text-[#1A1F24]">To‘lov hisob-kitobi (VMQ 278-son)</h4>
              </div>
              <span className="text-[10px] text-[#767F87]">BHM = 375 000 so‘m</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-[#5A646D]">
                <span>Chorva soni bo‘yicha to‘lov:</span>
                <span className="font-semibold text-[#1A1F24]">{totalAmount.toLocaleString()} so‘m</span>
              </div>
              <div className="flex justify-between text-[#5A646D]">
                <span>Mavsumiy koeffitsiyent:</span>
                <span className="font-semibold text-[#1A1F24]">1.0</span>
              </div>
              <div className="flex justify-between text-[#5A646D]">
                <span>Imtiyoz / Chegirma:</span>
                <span className="font-semibold text-[#15803D]">0 % (mavjud emas)</span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#F1F3F5] flex items-baseline justify-between">
              <span className="text-xs font-bold text-[#1A1F24]">Jami hisoblangan summa:</span>
              <span className="text-lg font-black text-[#2E7D4F]">
                {totalAmount.toLocaleString()} <span className="text-xs font-bold">so‘m</span>
              </span>
            </div>

            <div className="p-3 bg-[#F8F9FA] rounded-xl border border-[#E4E7EA] text-[11px] text-[#5A646D] space-y-1">
              <div className="flex items-center gap-1 font-bold text-[#1A1F24]">
                <Layers className="w-3.5 h-3.5 text-[#2E7D4F]" />
                <span>50 / 50 Taqsimot (VMQ 278, 10-band):</span>
              </div>
              <div className="flex justify-between pl-4">
                <span>• O‘rmon fondi jamg‘armasi (50%):</span>
                <span className="font-bold">{(totalAmount / 2).toLocaleString()} so‘m</span>
              </div>
              <div className="flex justify-between pl-4">
                <span>• Respublika byudjeti (50%):</span>
                <span className="font-bold">{(totalAmount / 2).toLocaleString()} so‘m</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
