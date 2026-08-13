import React, { useState } from 'react';
import { CheckCircle2, PenTool, HelpCircle } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { resolveRole } from '../../../lib/permissions';

export interface PermitDigitalSignaturesPanelProps {
  userRole?: string;
}

export const PermitDigitalSignaturesPanel: React.FC<PermitDigitalSignaturesPanelProps> = ({
  userRole = '',
}) => {
  /**
   * The fourth signature is the applicant confirming receipt of their own permit.
   * Every other role opens this document from a registry and only observes the
   * signature chain, so the signing control is theirs alone.
   */
  const isApplicant = resolveRole(userRole) === 'applicant';

  const [isSignedByUser, setIsSignedByUser] = useState<boolean>(false);

  const handleSignPermit = () => {
    setIsSignedByUser(true);
    alert('Siz (Arizachi) ushbu Ruxsatnomani E-IMZO orqali tasdiqladingiz!');
  };

  return (
    <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs font-sans space-y-6">
      <div className="flex flex-wrap items-center justify-between border-b border-[#E4E7EA] pb-3 gap-2">
        <div>
          <h2 className="text-base font-bold text-[#1A1F24]">Elektron raqamli imzolar (Электронные подписи)</h2>
          <p className="text-xs text-[#5A646D]">
            E-IMZO, O‘z DSt 1092:2009 algoritmi · Yagona NTP manbasidan vaqt muhrlari
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#15803D] bg-[#DCFCE7] px-3 py-1 rounded-full border border-[#86EFAC]">
            {isSignedByUser ? 'Imzolangan 4 dan 4' : 'Imzolangan 3 dan 4'}
          </span>
        </div>
      </div>

      {/* 4-Signature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* 1. Leskhoz Chief */}
        <div className="border border-[#86EFAC] bg-[#F0F7F1] rounded-xl p-4 space-y-2">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#DCFCE7] border border-[#86EFAC] text-[#15803D] font-bold flex items-center justify-center">
                ✓
              </span>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#5A646D]">Xoʻjalik rahbari</span>
                <strong className="block text-sm font-bold text-[#1A1F24]">Toshmatov Shuhrat Abdullayevich</strong>
              </div>
            </div>
            <span className="w-6 h-6 rounded-full bg-white border border-[#767F87] text-[#5A646D] text-[11px] font-bold flex items-center justify-center">
              1
            </span>
          </div>

          <div className="space-y-1 font-mono text-[#5A646D] pt-2 border-t border-[#86EFAC]/50">
            <div className="flex justify-between"><span>Imzolangan:</span><strong className="text-[#1A1F24]">24.07.2026, 14:32:07</strong></div>
            <div className="flex justify-between"><span>Sertifikat:</span><span>11.02.2027 gacha</span></div>
            <div className="text-[10px] text-[#15803D] font-sans font-bold flex items-center gap-1 pt-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Imzo 25.07.2026 kuni tekshirilgan
            </div>
          </div>
        </div>

        {/* 2. Chief Forester */}
        <div className="border border-[#86EFAC] bg-[#F0F7F1] rounded-xl p-4 space-y-2">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#DCFCE7] border border-[#86EFAC] text-[#15803D] font-bold flex items-center justify-center">
                ✓
              </span>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#5A646D]">Bosh oʻrmonchi</span>
                <strong className="block text-sm font-bold text-[#1A1F24]">Ergashev Baxtiyor Raximovich</strong>
              </div>
            </div>
            <span className="w-6 h-6 rounded-full bg-white border border-[#767F87] text-[#5A646D] text-[11px] font-bold flex items-center justify-center">
              2
            </span>
          </div>

          <div className="space-y-1 font-mono text-[#5A646D] pt-2 border-t border-[#86EFAC]/50">
            <div className="flex justify-between"><span>Imzolangan:</span><strong className="text-[#1A1F24]">24.07.2026, 15:08:44</strong></div>
            <div className="flex justify-between"><span>Sertifikat:</span><span>30.09.2026 gacha</span></div>
            <div className="text-[10px] text-[#15803D] font-sans font-bold flex items-center gap-1 pt-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Imzo 25.07.2026 kuni tekshirilgan
            </div>
          </div>
        </div>

        {/* 3. Chief Accountant */}
        <div className="border border-[#86EFAC] bg-[#F0F7F1] rounded-xl p-4 space-y-2">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#DCFCE7] border border-[#86EFAC] text-[#15803D] font-bold flex items-center justify-center">
                ✓
              </span>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#5A646D]">Bosh buxgalter</span>
                <strong className="block text-sm font-bold text-[#1A1F24]">Sobirova Nodira Azizovna</strong>
              </div>
            </div>
            <span className="w-6 h-6 rounded-full bg-white border border-[#767F87] text-[#5A646D] text-[11px] font-bold flex items-center justify-center">
              3
            </span>
          </div>

          <div className="space-y-1 font-mono text-[#5A646D] pt-2 border-t border-[#86EFAC]/50">
            <div className="flex justify-between"><span>Imzolangan:</span><strong className="text-[#1A1F24]">25.07.2026, 09:47:19</strong></div>
            <div className="flex justify-between"><span>Sertifikat:</span><span>06.06.2027 gacha</span></div>
            <div className="text-[10px] text-[#15803D] font-sans font-bold flex items-center gap-1 pt-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Imzo 25.07.2026 kuni tekshirilgan
            </div>
          </div>
        </div>

        {/* 4. Applicant / User */}
        {isSignedByUser ? (
          <div className="border border-[#86EFAC] bg-[#F0F7F1] rounded-xl p-4 space-y-2">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-[#DCFCE7] border border-[#86EFAC] text-[#15803D] font-bold flex items-center justify-center">
                  ✓
                </span>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#5A646D]">Foydalanuvchi / Arizachi</span>
                  <strong className="block text-sm font-bold text-[#1A1F24]">Yuldoshev Rustam Normatovich</strong>
                </div>
              </div>
              <span className="w-6 h-6 rounded-full bg-white border border-[#767F87] text-[#5A646D] text-[11px] font-bold flex items-center justify-center">
                4
              </span>
            </div>

            <div className="space-y-1 font-mono text-[#5A646D] pt-2 border-t border-[#86EFAC]/50">
              <div className="flex justify-between"><span>Imzolangan:</span><strong className="text-[#1A1F24]">11.08.2026, 14:30:12</strong></div>
              <div className="flex justify-between"><span>Sertifikat:</span><span>E-IMZO Kalit mos</span></div>
              <div className="text-[10px] text-[#15803D] font-sans font-bold flex items-center gap-1 pt-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Imzolangan va tasdiqlangan
              </div>
            </div>
          </div>
        ) : (
          <div className="border border-dashed border-[#B45309] bg-[#FFFBEB] rounded-xl p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-white border border-dashed border-[#B45309] text-[#B45309] font-bold flex items-center justify-center">
                  ⧗
                </span>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#5A646D]">Foydalanuvchi / Arizachi</span>
                  <strong className="block text-sm font-bold text-[#1A1F24]">Yuldoshev Rustam Normatovich</strong>
                </div>
              </div>
              <span className="w-6 h-6 rounded-full bg-white border border-[#767F87] text-[#5A646D] text-[11px] font-bold flex items-center justify-center">
                4
              </span>
            </div>

            <div className="text-xs text-[#B45309]">
              {isApplicant
                ? 'Siz E-IMZO kaliti bilan tasdiqlashingiz kutilmoqda.'
                : 'Arizachi E-IMZO kaliti bilan tasdiqlashi kutilmoqda.'}
            </div>

            {isApplicant && (
              <Button
                variant="primary"
                size="sm"
                leftIcon={<PenTool className="w-4 h-4" />}
                onClick={handleSignPermit}
                className="w-full bg-[#2E7D4F] hover:bg-[#23653F] text-white font-bold h-9 text-xs cursor-pointer shadow-xs"
              >
                E-IMZO bilan tasdiqlash
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Open Question Footnote Box */}
      <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-xl p-4 text-xs text-[#B45309] space-y-1">
        <div className="flex items-center gap-1.5 font-bold">
          <HelpCircle className="w-4 h-4 text-[#B45309]" />
          <span>П7 Swash Note: Imzolar ketma-ketligi va majburiyligi</span>
        </div>
        <p className="text-[11px] text-[#5A646D] leading-relaxed">
          Nizo holatlarini oldini olish uchun 4 ta E-IMZO raqamli imzosi taqdim etiladi. Arizachi imzo qoʻygach hujjat toʻliq kuchga kiradi va PDF/A arxiv shakliga oʻtadi.
        </p>
      </div>
    </div>
  );
};
