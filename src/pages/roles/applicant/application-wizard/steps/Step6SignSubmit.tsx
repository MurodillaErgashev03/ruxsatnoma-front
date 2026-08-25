import React, { useState } from 'react';
import { 
  Key, 
  CheckCircle2, 
  FileText, 
  QrCode, 
  Download, 
  ArrowRight, 
  ShieldCheck, 
  Clock
} from 'lucide-react';
import type { LivestockCounts } from './Step3Parameters';

export interface Step6SignSubmitProps {
  draftNo: string;
  applicantName?: string;
  applicantId?: string;
  selectedContour?: string;
  freeArea?: number;
  startDate?: string;
  endDate?: string;
  livestockCounts: LivestockCounts;
  totalAmount: number;
  isSubmitted: boolean;
  onSubmitSuccess: () => void;
  onNavigateToDashboard?: () => void;
}

export const Step6SignSubmit: React.FC<Step6SignSubmitProps> = ({
  draftNo = 'RX-2026-004903',
  applicantName = 'Saidov Otabek Shavkatovich',
  applicantId = '31205901234567',
  selectedContour = '04-12-007',
  freeArea = 18.5,
  startDate = '2026-04-01',
  endDate = '2026-10-31',
  livestockCounts,
  totalAmount = 975000,
  isSubmitted = false,
  onSubmitSuccess,
  onNavigateToDashboard,
}) => {
  const [selectedKey, setSelectedKey] = useState<string>('key_1');
  const [keyPassword, setKeyPassword] = useState<string>('••••••••');
  const [isSigning, setIsSigning] = useState<boolean>(false);

  const handleSign = () => {
    setIsSigning(true);
    setTimeout(() => {
      setIsSigning(false);
      onSubmitSuccess();
    }, 1200);
  };

  if (isSubmitted) {
    return (
      <div className="space-y-6 font-sans">
        {/* Success Banner */}
        <div className="bg-gradient-to-r from-[#DCFCE7] via-[#F0FDF4] to-white border border-[#86EFAC] rounded-3xl p-8 shadow-sm text-center max-w-3xl mx-auto space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-[#15803D] text-white flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#15803D] text-white uppercase tracking-wider">
              Holat: SUBMITTED (Muvaffaqiyatli yuborildi)
            </span>
            <h2 className="text-2xl font-black text-[#14532D] mt-3">
              Arizangiz E-IMZO bilan tasdiqlandi va qabul qilindi!
            </h2>
            <p className="text-sm text-[#166534] mt-1">
              Ariza raqami: <strong>№ {draftNo}</strong> • Ro‘yxatga olingan vaqt: <strong>{new Date().toLocaleString('uz-UZ')}</strong>
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-[#86EFAC] text-left max-w-xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-[#2E7D4F] shrink-0" />
              <div>
                <span className="text-xs font-bold text-[#1A1F24] block">
                  Reglament ko‘rib chiqish muddati (SLA-taymer):
                </span>
                <span className="text-xs text-[#5A646D]">
                  Maksimal 15 ish kuni (Ijrochi: Zangiota DЎX)
                </span>
              </div>
            </div>
            <div className="w-16 h-16 bg-[#F8F9FA] rounded-xl border border-[#E4E7EA] flex items-center justify-center p-1 shrink-0">
              <QrCode className="w-12 h-12 text-[#1A1F24]" />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <button
              onClick={() => alert(`Ariza pasporti PDF yuklab olinmoqda (ID: ${draftNo})`)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#2E7D4F] text-xs font-bold text-[#2E7D4F] hover:bg-[#F0F7F1] cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Arizani yuklab olish (PDF/A)</span>
            </button>

            <button
              onClick={onNavigateToDashboard}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#2E7D4F] text-white text-xs font-bold hover:bg-[#23653F] cursor-pointer shadow-md"
            >
              <span>Mening arizalarimga o‘tish</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-sans">
      {/* 1. Header Guide */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-5 shadow-2xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F0F7F1] border border-[#2E7D4F]/20 flex items-center justify-center text-[#2E7D4F]">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#1A1F24]">
                6-bosqich: Ariza pasportini tasdiqlash va E-IMZO bilan imzolash
              </h2>
              <p className="text-xs text-[#5A646D]">
                Qonun hujjatlariga asosan elektron ariza E-IMZO kaliti orqali rasmiylashtiriladi
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#F0F7F1] text-[#2E7D4F] text-xs font-bold border border-[#2E7D4F]/20">
            <ShieldCheck className="w-4 h-4" />
            <span>Xavfsiz E-IMZO protokoli</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6 items-start">
        {/* Left Column: Application Summary Passport */}
        <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#F1F3F5]">
            <h3 className="text-sm font-bold text-[#1A1F24] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#2E7D4F]" />
              Ariza ma’lumotlari pasporti (Anketa)
            </h3>
            <span className="text-xs font-mono font-bold text-[#2E7D4F] bg-[#F0F7F1] px-2 py-0.5 rounded">
              № {draftNo}
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-2 p-3 bg-[#F8F9FA] rounded-xl border border-[#E4E7EA]">
              <div>
                <span className="text-[#767F87] block text-[11px]">Ariza beruvchi:</span>
                <span className="font-bold text-[#1A1F24]">{applicantName}</span>
              </div>
              <div>
                <span className="text-[#767F87] block text-[11px]">JShShIR / STIR:</span>
                <span className="font-bold text-[#1A1F24]">{applicantId}</span>
              </div>
            </div>

            <div className="p-3 bg-[#F8F9FA] rounded-xl border border-[#E4E7EA] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[#767F87] text-[11px]">Faoliyat turi:</span>
                <span className="font-bold text-[#1A1F24]">Chorva molini boqish (VMQ 689)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#767F87] text-[11px]">O‘rmon xo‘jaligi:</span>
                <span className="font-bold text-[#1A1F24]">Zangiota DЎX, Chinoz bo‘limi</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#767F87] text-[11px]">Tanlangan GIS kontur:</span>
                <span className="font-bold text-[#2E7D4F] font-mono">{selectedContour} (Bo‘sh {freeArea} ha)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#767F87] text-[11px]">Foydalanish muddati:</span>
                <span className="font-bold text-[#1A1F24]">{startDate} — {endDate} (Mavsumiy)</span>
              </div>
            </div>

            <div className="p-3 bg-[#F8F9FA] rounded-xl border border-[#E4E7EA] space-y-1.5">
              <span className="text-[#767F87] block text-[11px] font-bold">Chorva tarkibi va yuklama (UsedSB):</span>
              <div className="flex justify-between text-[11px] text-[#5A646D]">
                <span>• Katta qoramol / ot / tuya (1.0 SB):</span>
                <span className="font-bold">{livestockCounts.adultCattle} bosh ({(livestockCounts.adultCattle * 1.0).toFixed(1)} SB)</span>
              </div>
              <div className="flex justify-between text-[11px] text-[#5A646D]">
                <span>• 2 yoshgacha yosh mollar (0.5 SB):</span>
                <span className="font-bold">{livestockCounts.youngCattle} bosh ({(livestockCounts.youngCattle * 0.5).toFixed(1)} SB)</span>
              </div>
              <div className="flex justify-between text-[11px] text-[#5A646D]">
                <span>• 6 oylikdan katta qo‘y/echki (0.1 SB):</span>
                <span className="font-bold">{livestockCounts.adultSheep} bosh ({(livestockCounts.adultSheep * 0.1).toFixed(1)} SB)</span>
              </div>
              <div className="flex justify-between text-[11px] text-[#5A646D]">
                <span>• 6 oylikgacha qo‘zi/uloq (0.05 SB):</span>
                <span className="font-bold">{livestockCounts.youngSheep} bosh ({(livestockCounts.youngSheep * 0.05).toFixed(1)} SB)</span>
              </div>
              <div className="pt-2 border-t border-[#E4E7EA] flex justify-between font-bold text-xs text-[#2E7D4F]">
                <span>Jami me’yoriy yuklama:</span>
                <span>
                  {(
                    livestockCounts.adultCattle * 1.0 +
                    livestockCounts.youngCattle * 0.5 +
                    livestockCounts.adultSheep * 0.1 +
                    livestockCounts.youngSheep * 0.05
                  ).toFixed(1)}{' '}
                  / 10.0 SB (Mos)
                </span>
              </div>
            </div>

            <div className="p-3 bg-[#F0F7F1] rounded-xl border border-[#86EFAC] flex items-center justify-between">
              <span className="font-bold text-xs text-[#14532D]">Jami to‘lov summasi:</span>
              <span className="font-black text-sm text-[#15803D]">{totalAmount.toLocaleString()} so‘m</span>
            </div>
          </div>
        </div>

        {/* Right Column: E-IMZO Certificate Selector & Sign Box */}
        <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-2xs space-y-5">
          <div className="flex items-center gap-3 pb-3 border-b border-[#F1F3F5]">
            <div className="w-9 h-9 rounded-xl bg-[#2E7D4F] text-white flex items-center justify-center">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#1A1F24]">E-IMZO kalitini tanlang</h3>
              <p className="text-xs text-[#5A646D]">Elektron raqamli imzo moduli (E-IMZO Browser v4.x)</p>
            </div>
          </div>

          {/* Certificate Selection Card */}
          <div className="space-y-3">
            <div
              onClick={() => setSelectedKey('key_1')}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                selectedKey === 'key_1'
                  ? 'border-[#2E7D4F] bg-[#F0F7F1]'
                  : 'border-[#E4E7EA] bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-[#1A1F24]">SAIDOV OTABEK SHAVKATOVICH</span>
                <span className="text-[10px] font-bold text-[#15803D] bg-[#DCFCE7] px-2 py-0.5 rounded-full">
                  Faol
                </span>
              </div>
              <p className="text-[11px] text-[#5A646D]">
                DSQ E-IMZO sertifikat № <strong>3F89A12B</strong>
              </p>
              <p className="text-[10px] text-[#767F87] mt-1">
                Amal qilish muddati: <strong>14.11.2027 gacha</strong>
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1A1F24] mb-1.5">
                E-IMZO kalit paroli
              </label>
              <input
                type="password"
                value={keyPassword}
                onChange={(e) => setKeyPassword(e.target.value)}
                placeholder="Kalit parolini kiriting"
                className="w-full h-11 px-3.5 rounded-xl border border-[#CAD0D6] bg-white text-xs font-mono text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
              />
            </div>
          </div>

          <div className="p-3 bg-[#F8F9FA] rounded-xl border border-[#E4E7EA] text-[11px] text-[#5A646D] flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-[#2E7D4F] shrink-0 mt-0.5" />
            <span>
              Imzolash tugmasini bosish orqali siz kiritilgan ma’lumotlarning to‘g‘riligini va O‘zbekiston Respublikasi O‘rmon qonunchiligi talablariga rioya qilishni tasdiqlaysiz.
            </span>
          </div>

          <button
            onClick={handleSign}
            disabled={isSigning}
            className="w-full h-12 rounded-xl bg-[#2E7D4F] hover:bg-[#23653F] text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all disabled:opacity-50"
          >
            {isSigning ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>E-IMZO bilan imzolanmoqda...</span>
              </>
            ) : (
              <>
                <Key className="w-4 h-4" />
                <span>E-IMZO bilan imzolash va topshirish</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
