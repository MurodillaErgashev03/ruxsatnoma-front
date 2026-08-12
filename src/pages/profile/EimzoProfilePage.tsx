import React, { useState } from 'react';
import {
  Key,
  ShieldCheck,
  CheckCircle2,
  FileCheck,
  RefreshCw,
  Lock,
  Calendar,
  Cpu,
  Zap,
} from 'lucide-react';
import { Button } from '../../components/ui/button';

export interface EimzoProfilePageProps {
  onNavigate?: (page: string, params?: any) => void;
}

export const EimzoProfilePage: React.FC<EimzoProfilePageProps> = () => {
  const [isTestSigned, setIsTestSigned] = useState(false);
  const [testDocumentText, setTestDocumentText] = useState('Oʻrmon xoʻjaligi ruxsatnomasini tasdiqlash va E-IMZO bilan imzolash hujjati №RX-2026-0089');
  const [isSyncing, setIsSyncing] = useState(false);

  // E-IMZO Certificate Details (TZ Compliant)
  const activeCertificate = {
    serialNumber: '1A2B3C4D5E6F7890',
    ownerFio: 'Karimov Jamshid Botirovich',
    pinfl: '22222222222222',
    organization: 'Oʻrmon xoʻjaligi agentligi / Boʻlim boshligʻi',
    inn: '200891234',
    validFrom: '2025-06-15',
    validTo: '2027-06-15',
    daysRemaining: 305,
    issuer: 'Soliq Qoʻmitasi Yagona E-IMZO Markazi (VMQ 679-son)',
    standard: "O'z DSt 1092:2009",
    status: 'ACTIVE',
    crlStatus: 'VERIFIED (Ochirilmagan)',
  };

  const handleTestSign = () => {
    setIsTestSigned(true);
    setTimeout(() => setIsTestSigned(false), 5000);
  };

  const handleSyncCrl = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 2000);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Header & Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-white to-[#F0F7F1]/50 border border-[#E4E7EA] p-5 rounded-2xl shadow-xs hover:shadow-md transition-all flex items-center justify-between group">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-[#5A646D] uppercase tracking-wider block">E-IMZO WebSocket</span>
            <div className="text-xl font-extrabold text-[#1A1F24] tracking-tight font-mono">127.0.0.1:64443</div>
            <span className="text-xs text-[#15803D] font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Local Agent Onlayn
            </span>
          </div>
          <div className="p-3 bg-[#2E7D4F]/10 text-[#2E7D4F] rounded-2xl group-hover:scale-110 transition-transform">
            <Cpu className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-blue-50/40 border border-[#E4E7EA] p-5 rounded-2xl shadow-xs hover:shadow-md transition-all flex items-center justify-between group">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-[#5A646D] uppercase tracking-wider block">Kripto Standart</span>
            <div className="text-xl font-extrabold text-[#1A1F24] tracking-tight">Oʻz DSt 1092:2009</div>
            <span className="text-xs text-blue-700 font-bold flex items-center gap-1">
              <Lock className="w-3.5 h-3.5" /> Davlat Sertifikati
            </span>
          </div>
          <div className="p-3 bg-blue-500/10 text-blue-600 rounded-2xl group-hover:scale-110 transition-transform">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-emerald-50/40 border border-[#E4E7EA] p-5 rounded-2xl shadow-xs hover:shadow-md transition-all flex items-center justify-between group">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-[#5A646D] uppercase tracking-wider block">CRL / OCSP Tekshiruvi</span>
            <div className="text-xl font-extrabold text-[#1A1F24] tracking-tight">Real-vaqt</div>
            <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
              <RefreshCw className="w-3.5 h-3.5" /> Soliq Qoʻmitasi API
            </span>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-600 rounded-2xl group-hover:scale-110 transition-transform">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-purple-50/40 border border-[#E4E7EA] p-5 rounded-2xl shadow-xs hover:shadow-md transition-all flex items-center justify-between group">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-[#5A646D] uppercase tracking-wider block">Kalit Muddati</span>
            <div className="text-xl font-extrabold text-[#1A1F24] tracking-tight">{activeCertificate.daysRemaining} kun qoldi</div>
            <span className="text-xs text-purple-700 font-bold flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> {activeCertificate.validTo} gacha
            </span>
          </div>
          <div className="p-3 bg-purple-500/10 text-purple-600 rounded-2xl group-hover:scale-110 transition-transform">
            <Key className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#2E7D4F] bg-[#F0F7F1] px-3 py-1 rounded-full border border-[#D9EBDC]">
            MODUL 10.7 — ELEKTRON RAQAMLI IMZO
          </span>
          <h1 className="text-lg md:text-xl font-bold text-[#1A1F24] tracking-tight mt-1.5">Elektron Raqamli Imzo (E-IMZO) Kaliti</h1>
          <p className="text-xs text-[#5A646D] mt-0.5">
            Soliq Qoʻmitasi E-IMZO sertifikatlari, Oʻz DSt 1092:2009 standarti va hujjatlarni 4 bosqichli imzolash
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={handleSyncCrl}
            variant="outline"
            size="sm"
            leftIcon={<RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />}
            className="border-[#E4E7EA] text-[#1A1F24] font-bold hover:bg-gray-50"
          >
            CRL/OCSP Sinxronlash
          </Button>
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Key className="w-4 h-4" />}
            className="bg-[#2E7D4F] hover:bg-[#23653F] font-bold shadow-sm"
          >
            + Kalit Biriktirish (.pfx)
          </Button>
        </div>
      </div>

      {/* Legal E-IMZO Policy Banner */}
      <div className="bg-gradient-to-r from-[#0A1C0E] to-[#1E3A27] text-white rounded-2xl p-5 shadow-sm border border-[#2E7D4F]/30 flex items-start gap-4">
        <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl shrink-0 mt-0.5 border border-emerald-500/30">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-emerald-400 uppercase tracking-wider text-[11px]">
              HUQUQIY RUKN (TZ п. 10.7 & VMQ 679-SON)
            </span>
            <span className="text-[10px] font-mono bg-emerald-950/80 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">
              OʻZ DST 1092:2009
            </span>
          </div>
          <p className="text-emerald-100/90 leading-relaxed font-sans">
            Tizimda barcha ruxsatnomalar, rad etish qarorlari va dala dalolatnomalari <b className="text-white">"Elektron raqamli imzo toʻgʻrisida"gi</b> va <b className="text-white">"Elektron hujjat aylanishi toʻgʻrisida"gi</b> Qonunlarga muvofiq <b className="text-white">Oʻz DSt 1092:2009</b> davlat standarti boʻyicha E-IMZO bilan imzo joylanadi. E-IMZO sertifikati CRL/OCSP orqali real-vaqtda tekshiriladi.
          </p>
        </div>
      </div>

      {/* Main Active Certificate Card */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-[#E4E7EA] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F0F7F1] border border-[#D9EBDC] text-[#2E7D4F] flex items-center justify-center font-bold">
              <Key className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#2E7D4F] bg-[#F0F7F1] px-2.5 py-0.5 rounded border border-[#D9EBDC]">
                FAOL SERTIFIKAT #1
              </span>
              <h2 className="text-lg font-extrabold text-[#1A1F24] mt-0.5">{activeCertificate.ownerFio}</h2>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#F0F7F1] text-[#15803D] border border-[#D9EBDC]">
            <CheckCircle2 className="w-4 h-4" /> {activeCertificate.status} (CRL Tasdiqlangan)
          </span>
        </div>

        {/* Certificate Data Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-mono">
          <div className="p-4 bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl space-y-1">
            <span className="text-[#767F87] font-sans font-bold block text-[11px]">Sertifikat Seriya Raqami:</span>
            <span className="font-bold text-[#1A1F24] text-sm block">{activeCertificate.serialNumber}</span>
          </div>

          <div className="p-4 bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl space-y-1">
            <span className="text-[#767F87] font-sans font-bold block text-[11px]">JSHSHIR / STIR:</span>
            <span className="font-bold text-[#2E7D4F] text-sm block">{activeCertificate.pinfl}</span>
          </div>

          <div className="p-4 bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl space-y-1">
            <span className="text-[#767F87] font-sans font-bold block text-[11px]">Tashkilot STIR (INN):</span>
            <span className="font-bold text-[#1A1F24] text-sm block">{activeCertificate.inn}</span>
          </div>

          <div className="p-4 bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl space-y-1 col-span-1 md:col-span-2 font-sans">
            <span className="text-[#767F87] font-bold block text-[11px]">Tashkilot va Lavozimi:</span>
            <span className="font-bold text-[#1A1F24] text-sm block">{activeCertificate.organization}</span>
          </div>

          <div className="p-4 bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl space-y-1 font-sans">
            <span className="text-[#767F87] font-bold block text-[11px]">Amal qilish muddati:</span>
            <span className="font-bold text-[#15803D] text-xs block">{activeCertificate.validFrom} — {activeCertificate.validTo}</span>
          </div>
        </div>

        <div className="pt-2 border-t border-[#E4E7EA] text-xs text-[#5A646D] font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span>Manba: <b>{activeCertificate.issuer}</b></span>
          <span>Standart: <b>{activeCertificate.standard}</b></span>
        </div>
      </div>

      {/* Multi-Signature (4-Signatures) Workflow Requirement (TZ 16-forms.md) */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#E4E7EA] pb-3">
          <div className="flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-[#2E7D4F]" />
            <h3 className="font-bold text-base text-[#1A1F24]">Hujjatdagi 4 ta E-IMZO Bosqichlari (TZ 16-forms.md)</h3>
          </div>
          <span className="text-xs text-[#5A646D]">Oʻrmon chiptasi va ruxsatnomalarda 4 ta imzo</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-sans">
          <div className="p-4 bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#2E7D4F]">1-IMZO</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">BAJARILGAN</span>
            </div>
            <h4 className="font-bold text-[#1A1F24]">Arizachi (Foydalanuvchi)</h4>
            <p className="text-[#5A646D] text-[11px]">Ariza topshirishda E-IMZO tasdiqlovi</p>
          </div>

          <div className="p-4 bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#2E7D4F]">2-IMZO</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">BAJARILGAN</span>
            </div>
            <h4 className="font-bold text-[#1A1F24]">Bosh Oʻrmonchi</h4>
            <p className="text-[#5A646D] text-[11px]">Geobotanik norma va kontur tasdiqlovi</p>
          </div>

          <div className="p-4 bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#2E7D4F]">3-IMZO</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">BAJARILGAN</span>
            </div>
            <h4 className="font-bold text-[#1A1F24]">Bosh Buxgalter</h4>
            <p className="text-[#5A646D] text-[11px]">Billing toʻlovi 50/50 taqsimoti imzosi</p>
          </div>

          <div className="p-4 bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl space-y-2 border-l-4 border-l-[#2E7D4F]">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#2E7D4F]">4-IMZO</span>
              <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded">YAKUNIY</span>
            </div>
            <h4 className="font-bold text-[#1A1F24]">Tashkilot Rahbari</h4>
            <p className="text-[#5A646D] text-[11px]">Ruxsatnomani yakuniy berish imzosi</p>
          </div>
        </div>
      </div>

      {/* Demo E-IMZO Document Test Sign Box */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#E4E7EA] pb-3">
          <h3 className="font-bold text-base text-[#1A1F24] flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#2E7D4F]" /> E-IMZO Test Imzolash va Verifikatsiya
          </h3>
          <span className="text-xs text-[#5A646D]">PKCS#7 / CMS Standarti</span>
        </div>

        <div className="space-y-3">
          <label className="text-xs font-bold text-[#1A1F24]">Imzolanadigan matn/hujjat xeshi:</label>
          <textarea
            rows={2}
            value={testDocumentText}
            onChange={(e) => setTestDocumentText(e.target.value)}
            className="w-full bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-xs p-3 font-mono text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
          />

          <div className="flex items-center justify-between pt-2">
            <Button
              onClick={handleTestSign}
              variant="primary"
              size="sm"
              leftIcon={<Key className="w-4 h-4" />}
              className="bg-[#2E7D4F] hover:bg-[#23653F] font-bold"
            >
              Test Hujjatini E-IMZO bilan Imzolash
            </Button>

            {isTestSigned && (
              <span className="text-xs font-mono font-bold text-[#15803D] bg-[#F0F7F1] px-3 py-1.5 rounded-xl border border-[#D9EBDC] flex items-center gap-1.5 animate-pulse">
                <CheckCircle2 className="w-4 h-4" /> PKCS#7 Imzo muvaffaqiyatli yaratildi (SHA-256 Hash tasdiqlandi)
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
