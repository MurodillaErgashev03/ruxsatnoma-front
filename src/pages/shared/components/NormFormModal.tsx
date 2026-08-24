import React, { useState, useEffect } from 'react';
import {
  X,
  Calculator,
  FileText,
  UploadCloud,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Calendar,
  Layers,
  Save,
  HelpCircle,
  TrendingUp,
} from 'lucide-react';
import { Button } from '../../../components/ui/button';

export interface GeobotanicNormFormData {
  id: string;
  contourNo: string;
  leskhoz: string;
  activityType: string;
  geobotanicDoc: string;
  geobotanicDocFile?: string;
  yieldPerHa: number; // sentner/ga
  areaHa: number; // ga
  seasonShare: number; // e.g. 0.9 or 1.0
  rotationSeason: string;
  calculatedOz: number; // general feed stock
  calculatedOzEff: number; // effective feed stock (after 15% insurance deduction)
  maxSB: number; // Sustainable Capacity (floor(Oz_eff / 3.74))
  ruleVersion: string;
  effectiveFrom: string;
  effectiveTo: string;
  approvalDocId: string;
  status: 'active' | 'archived';
  lastAuditDate?: string;
}

export interface NormFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: GeobotanicNormFormData) => void;
  initialData?: GeobotanicNormFormData | null;
}

const PUBLISHED_CONTOURS = [
  { id: 'Kontur №42', name: 'Kontur №42 (Chorva boqish)', leskhoz: 'Burchmulla davlat oʻrmon xoʻjaligi', areaHa: 450 },
  { id: 'Kontur №15', name: 'Kontur №15 (Pichangoh)', leskhoz: 'Zomin davlat qoʻriqxonasi', areaHa: 180 },
  { id: 'Kontur №88', name: 'Kontur №88 (Yangi chegara)', leskhoz: 'Kitob davlat oʻrmon xoʻjaligi', areaHa: 320 },
  { id: 'Kontur №99', name: 'Kontur №99 (Yaylov)', leskhoz: 'Pop davlat oʻrmon xoʻjaligi', areaHa: 95 },
];

const SEASONS = [
  'Bahor-Yoz (Aprel–Sentyabr)',
  'Kuz-Qish (Oktyabr–Mart)',
  'Yoz (Iyun–Avgust)',
  'Yil davomida (Toʻliq mavsum)',
];

const ACTIVITIES = [
  'Chorva boqish (Yaylov foydalanishi)',
  'Pichan oʻrish maydoni',
  'Asalari uyalarini joylashtirish',
  'Dorivor oʻsimliklar yetishtirish',
];

export const NormFormModal: React.FC<NormFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [contourNo, setContourNo] = useState(PUBLISHED_CONTOURS[0].id);
  const [leskhoz, setLeskhoz] = useState(PUBLISHED_CONTOURS[0].leskhoz);
  const [areaHa, setAreaHa] = useState(PUBLISHED_CONTOURS[0].areaHa);
  const [activityType, setActivityType] = useState(ACTIVITIES[0]);

  const [geobotanicDoc, setGeobotanicDoc] = useState('OʻzR FA Botanika instituti xulosasi №18/2026');
  const [uploadedDocName, setUploadedDocName] = useState<string | null>(null);

  // VMQ 689 formula variables
  const [yieldPerHa, setYieldPerHa] = useState<number>(4.5); // sentner/ga
  const [seasonShare, setSeasonShare] = useState<number>(0.9); // season duration share
  const [rotationSeason, setRotationSeason] = useState(SEASONS[0]);

  const [ruleVersion, setRuleVersion] = useState('v2.5 (2026)');
  const [effectiveFrom, setEffectiveFrom] = useState(new Date().toISOString().split('T')[0]);
  const [effectiveTo, setEffectiveTo] = useState('—');
  const [approvalDocId, setApprovalDocId] = useState('TAS-2026-N12');

  const [errors, setErrors] = useState<Record<string, string>>({});

  // When contour changes, sync leskhoz and area
  const handleContourChange = (cId: string) => {
    setContourNo(cId);
    const found = PUBLISHED_CONTOURS.find((c) => c.id === cId);
    if (found) {
      setLeskhoz(found.leskhoz);
      setAreaHa(found.areaHa);
    }
  };

  useEffect(() => {
    if (initialData) {
      setContourNo(initialData.contourNo);
      setLeskhoz(initialData.leskhoz);
      setAreaHa(initialData.areaHa || 450);
      setActivityType(initialData.activityType || ACTIVITIES[0]);
      setGeobotanicDoc(initialData.geobotanicDoc);
      setYieldPerHa(initialData.yieldPerHa || 4.5);
      setSeasonShare(initialData.seasonShare || 0.9);
      setRotationSeason(initialData.rotationSeason || SEASONS[0]);
      setRuleVersion(initialData.ruleVersion || 'v2.5 (2026)');
      setEffectiveFrom(initialData.effectiveFrom || new Date().toISOString().split('T')[0]);
      setEffectiveTo(initialData.effectiveTo || '—');
      setApprovalDocId(initialData.approvalDocId || 'TAS-2026-N12');
      setUploadedDocName(initialData.geobotanicDocFile || null);
    } else {
      setContourNo(PUBLISHED_CONTOURS[0].id);
      setLeskhoz(PUBLISHED_CONTOURS[0].leskhoz);
      setAreaHa(PUBLISHED_CONTOURS[0].areaHa);
      setActivityType(ACTIVITIES[0]);
      setGeobotanicDoc('OʻzR FA Botanika instituti xulosasi №18/2026');
      setYieldPerHa(4.5);
      setSeasonShare(0.9);
      setRotationSeason(SEASONS[0]);
      setRuleVersion('v2.5 (2026)');
      setEffectiveFrom(new Date().toISOString().split('T')[0]);
      setEffectiveTo('—');
      setApprovalDocId('TAS-2026-N12');
      setUploadedDocName(null);
    }
    setErrors({});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  // ── VMQ 689 Mathematical Calculation Chain ─────────────────────────────────
  // 1. Oz = Yield × Area × Season_share
  const calculatedOz = Number((yieldPerHa * areaHa * seasonShare).toFixed(2));
  // 2. Oz_eff = Oz × 0.85 (15% insurance fund deduction)
  const calculatedOzEff = Number((calculatedOz * 0.85).toFixed(2));
  // 3. MaxSB = floor(Oz_eff / 3.74) (3.74 sentner feed unit per SB)
  const calculatedMaxSB = Math.floor(calculatedOzEff / 3.74);

  const handleSimulateUpload = () => {
    setUploadedDocName(`Geobotanik_Xulosa_${contourNo.replace(/[\s№]/g, '')}_2026.pdf`);
  };

  const validate = (): boolean => {
    const err: Record<string, string> = {};
    if (!geobotanicDoc.trim()) err.geobotanicDoc = 'Geobotanik tadqiqot asosi majburiy';
    if (yieldPerHa <= 0) err.yieldPerHa = 'Hosildorlik 0 dan katta boʻlishi kerak';
    if (areaHa <= 0) err.areaHa = 'Maydon 0 dan katta boʻlishi kerak';
    if (!approvalDocId.trim()) err.approvalDocId = 'Tasdiqlovchi hujjat raqamini kiriting';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    const data: GeobotanicNormFormData = {
      id: initialData?.id || `NRM-00${Math.floor(10 + Math.random() * 90)}`,
      contourNo,
      leskhoz,
      activityType,
      geobotanicDoc,
      geobotanicDocFile: uploadedDocName || undefined,
      yieldPerHa,
      areaHa,
      seasonShare,
      rotationSeason,
      calculatedOz,
      calculatedOzEff,
      maxSB: calculatedMaxSB,
      ruleVersion,
      effectiveFrom,
      effectiveTo,
      approvalDocId,
      status: 'active',
      lastAuditDate: new Date().toLocaleDateString('ru-RU'),
    };

    onSave(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 font-sans">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl z-10 overflow-hidden animate-in zoom-in-95 duration-200 border border-[#E4E7EA] flex flex-col max-h-[92vh]"
        role="dialog"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#E4E7EA] bg-[#F8F9FA]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F0F7F1] text-[#2E7D4F] flex items-center justify-center border border-[#D9EBDC]">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-[#1A1F24]">
                  Yangi Geobotanik Meʼyor va Sigʻim (MaxSB) Biriktirish
                </h3>
                <span className="text-[11px] font-mono font-bold bg-[#E0F2FE] text-[#0369A1] px-2 py-0.5 rounded border border-[#BAE6FD]">
                  VMQ 689 / 10.3
                </span>
              </div>
              <p className="text-xs text-[#5A646D] mt-0.5">
                Hosildorlik, rotatsiya mavsumi va qonuniy formulalar boʻyicha sigʻim avto-hisobi
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#767F87] hover:text-[#1A1F24] hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 overflow-y-auto flex-1 text-xs text-[#1A1F24] space-y-5">
          {/* Section 1: Contour & Activity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-[#5A646D] mb-1">
                Eʼlon qilingan (Published) GIS Kontur *
              </label>
              <select
                value={contourNo}
                onChange={(e) => handleContourChange(e.target.value)}
                className="w-full bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl px-3 py-2 text-xs font-semibold text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
              >
                {PUBLISHED_CONTOURS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.areaHa} ga)
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-[#767F87] mt-1">{leskhoz}</p>
            </div>

            <div>
              <label className="block font-semibold text-[#5A646D] mb-1">Faoliyat Turi *</label>
              <select
                value={activityType}
                onChange={(e) => setActivityType(e.target.value)}
                className="w-full bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl px-3 py-2 text-xs font-medium text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
              >
                {ACTIVITIES.map((act) => (
                  <option key={act} value={act}>
                    {act}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Section 2: Geobotanic Basis Document */}
          <div className="p-4 bg-[#F8F9FA] border border-[#E4E7EA] rounded-2xl space-y-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#2E7D4F]" />
              <span className="font-bold text-xs text-[#1A1F24]">Geobotanik Tadqiqot Hujjati Asosi (VMQ 689)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-[#5A646D] mb-1">
                  Hujjat Nomi / Xulosa Raqami *
                </label>
                <input
                  type="text"
                  value={geobotanicDoc}
                  onChange={(e) => setGeobotanicDoc(e.target.value)}
                  placeholder="Masalan: OʻzR FA Botanika instituti xulosasi №18/2026"
                  className="w-full bg-white border border-[#E4E7EA] rounded-xl px-3 py-2 text-xs text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
                />
                {errors.geobotanicDoc && (
                  <p className="text-[11px] text-[#B91C1C] mt-1">{errors.geobotanicDoc}</p>
                )}
              </div>

              <div>
                <label className="block font-semibold text-[#5A646D] mb-1">Hujjat Fayli (PDF / Skan)</label>
                {uploadedDocName ? (
                  <div className="flex items-center justify-between p-2 bg-white border border-[#D9EBDC] rounded-xl text-xs">
                    <span className="font-semibold text-[#2E7D4F] truncate max-w-[180px]">
                      {uploadedDocName}
                    </span>
                    <button
                      type="button"
                      onClick={() => setUploadedDocName(null)}
                      className="text-[#B91C1C] hover:underline font-bold text-[11px]"
                    >
                      Oʻchirish
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleSimulateUpload}
                    className="w-full py-2 px-3 rounded-xl border border-dashed border-[#2E7D4F] bg-white text-[#2E7D4F] font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#F0F7F1] transition-colors cursor-pointer"
                  >
                    <UploadCloud className="w-4 h-4" /> PDF Hujjat Yuklash
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Section 3: Formula Inputs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-[#5A646D] mb-1">
                Hosildorlik (sentner / ga) *
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  value={yieldPerHa}
                  onChange={(e) => setYieldPerHa(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl px-3 py-2 text-xs font-mono font-bold text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
                />
                <span className="absolute right-3 top-2 text-[#767F87] font-semibold">ц/га</span>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[#5A646D] mb-1">
                Kontur Maydoni (ga) *
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="1"
                  min="1"
                  value={areaHa}
                  onChange={(e) => setAreaHa(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl px-3 py-2 text-xs font-mono font-bold text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
                />
                <span className="absolute right-3 top-2 text-[#767F87] font-semibold">ga</span>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[#5A646D] mb-1">
                Mavsum Ulushi (Season_share) *
              </label>
              <select
                value={seasonShare}
                onChange={(e) => setSeasonShare(parseFloat(e.target.value))}
                className="w-full bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl px-3 py-2 text-xs font-mono font-bold text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
              >
                <option value={0.9}>0.90 (Bahor-Yoz mavsumi)</option>
                <option value={0.75}>0.75 (Qisqa mavsum)</option>
                <option value={1.0}>1.00 (Toʻliq yillik mavsum)</option>
                <option value={0.5}>0.50 (Yarim mavsum)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-[#5A646D] mb-1">Mavsumiy Rotatsiya Taqvimi *</label>
            <select
              value={rotationSeason}
              onChange={(e) => setRotationSeason(e.target.value)}
              className="w-full bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl px-3 py-2 text-xs font-medium text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
            >
              {SEASONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Section 4: Live Interactive VMQ 689 Calculation Chain */}
          <div className="bg-[#F0F7F1] border border-[#D9EBDC] rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-[#D9EBDC] pb-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#2E7D4F]" />
                <span className="font-bold text-xs text-[#123522]">
                  VMQ 689-son Boʻyicha Avtomatik Hisob-Kitob Zanjiri
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#2E7D4F] font-bold">
                Formula: VMQ 689 / 4.3.1
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-2.5 bg-white rounded-xl border border-[#D9EBDC] space-y-0.5">
                <span className="text-[11px] text-[#5A646D]">1. Ozuqa zaxirasi (Oz):</span>
                <div className="font-mono font-bold text-[#1A1F24]">
                  {calculatedOz.toLocaleString('ru-RU')} sentner
                </div>
                <div className="text-[10px] text-[#767F87] font-mono">
                  {yieldPerHa} ц × {areaHa} га × {seasonShare}
                </div>
              </div>

              <div className="p-2.5 bg-white rounded-xl border border-[#D9EBDC] space-y-0.5">
                <span className="text-[11px] text-[#5A646D]">2. Samarali zaxira (-15% sugʻurta):</span>
                <div className="font-mono font-bold text-[#1A1F24]">
                  {calculatedOzEff.toLocaleString('ru-RU')} sentner
                </div>
                <div className="text-[10px] text-[#767F87] font-mono">
                  {calculatedOz} × 0.85 koeffitsient
                </div>
              </div>

              <div className="p-2.5 bg-[#123522] text-white rounded-xl shadow-xs space-y-0.5">
                <span className="text-[11px] text-green-200">3. Maksimal Sigʻim (MaxSB):</span>
                <div className="font-mono font-bold text-base text-yellow-300">
                  {calculatedMaxSB.toLocaleString('ru-RU')} Bosh
                </div>
                <div className="text-[10px] text-green-300 font-mono">
                  floor({calculatedOzEff} / 3.74)
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Version & Approval details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            <div>
              <label className="block font-semibold text-[#5A646D] mb-1">Qoida Versiyasi (rule_version) *</label>
              <input
                type="text"
                value={ruleVersion}
                onChange={(e) => setRuleVersion(e.target.value)}
                placeholder="v2.5 (2026)"
                className="w-full bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl px-3 py-2 text-xs font-mono font-bold text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#5A646D] mb-1">Kuchga Kirish Sanasi *</label>
              <input
                type="date"
                value={effectiveFrom}
                onChange={(e) => setEffectiveFrom(e.target.value)}
                className="w-full bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl px-3 py-2 text-xs font-mono text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#5A646D] mb-1">Tasdiqlovchi Hujjat Raqami *</label>
              <input
                type="text"
                value={approvalDocId}
                onChange={(e) => setApprovalDocId(e.target.value)}
                placeholder="TAS-2026-N12"
                className="w-full bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl px-3 py-2 text-xs font-mono font-bold text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F8F9FA] border-t border-[#E4E7EA] flex items-center justify-between gap-3">
          <div className="text-[11px] text-[#5A646D] flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#2E7D4F]" />
            <span>Mavjud arizalar va ruxsatnomalar eski versiyada oʻzgarmasdan saqlanadi (TZ 18.3).</span>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onClose}>
              Bekor qilish
            </Button>

            <Button
              variant="primary"
              size="sm"
              leftIcon={<Save className="w-4 h-4" />}
              onClick={handleSave}
              className="bg-[#2E7D4F] hover:bg-[#23653F] text-white font-bold"
            >
              Meʼyorni Biriktirish ({calculatedMaxSB} bosh)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
