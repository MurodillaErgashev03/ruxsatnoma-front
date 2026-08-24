import React, { useState, useEffect } from 'react';
import {
  X,
  MapPin,
  Layers,
  FileText,
  CheckCircle2,
  AlertTriangle,
  UploadCloud,
  Calendar,
  ShieldCheck,
  Save,
  Compass,
  FileCheck,
  Sparkles,
  Info,
} from 'lucide-react';
import { Button } from '../../../components/ui/button';

export type ContourStatus = 'draft' | 'review' | 'approved' | 'published' | 'archived';

export interface ContourFormData {
  id: string;
  name: string;
  leskhoz: string;
  section: string;
  layer: string;
  areaHa: number;
  maxSB: number;
  currentSB: number;
  status: ContourStatus;
  lastUpdated?: string;
  source: string;
  accuracy: string;
  surveyDate: string;
  effectiveFrom: string;
  effectiveTo: string;
  approvalDocId: string;
  approvalDocName?: string;
  coordinates: string;
  notes?: string;
}

export interface ContourFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ContourFormData) => void;
  initialData?: ContourFormData | null;
  mode: 'create' | 'edit';
}

const GIS_LAYERS_OPTIONS = [
  'Yaylov konturlari',
  'Pichan oʻrish maydonlari',
  'Oʻrmon fondi chegaralari',
  'Tashkilot chegaralari',
  'Asalari uyalari uchastkalari',
  'Rekreatsiya zonalari',
  'Cheklovlar va taqiqlar',
  'Muhofaza zonalari',
  'Rotatsiya uchastkalari',
  'Dam olish maydonlari',
  'Suv nuqtalari',
  'Mol yoʻllari',
];

const FORESTRY_ORGS = [
  'Burchmulla davlat oʻrmon xoʻjaligi',
  'Zomin davlat qoʻriqxonasi',
  'Kitob davlat oʻrmon xoʻjaligi',
  'Pop davlat oʻrmon xoʻjaligi',
  'Oqdaryo davlat oʻrmon xoʻjaligi',
  'Boysun davlat oʻrmon xoʻjaligi',
  'Chiroqchi davlat oʻrmon xoʻjaligi',
];

const GEODETIC_SOURCES = [
  'Yerqurilish loyihasi 2024–2026',
  'Dala geodezik oʻlchovi (GNSS RTK)',
  'Aerofotosuratga asoslangan ortofotoplan',
  'Davlat Kadastr agentligi maʼlumotlari',
  'GPS / Dala plansheti orqali oʻlchov',
  'Qoʻlda chizilgan dastlabki qoralama',
];

const ACCURACY_OPTIONS = ['±0.3 m', '±0.5 m', '±1.0 m', '±2.0 m', '±5.0 m'];

export const ContourFormModal: React.FC<ContourFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  mode,
}) => {
  const [activeTab, setActiveTab] = useState<'general' | 'geodetic' | 'document' | 'topology'>('general');

  const [formData, setFormData] = useState<ContourFormData>({
    id: '',
    name: '',
    leskhoz: FORESTRY_ORGS[0],
    section: '14-kvartal, 2-ajratma',
    layer: 'Yaylov konturlari',
    areaHa: 150,
    maxSB: 180,
    currentSB: 0,
    status: 'draft',
    source: GEODETIC_SOURCES[0],
    accuracy: '±0.5 m',
    surveyDate: new Date().toISOString().split('T')[0],
    effectiveFrom: new Date().toISOString().split('T')[0],
    effectiveTo: '—',
    approvalDocId: '',
    approvalDocName: '',
    coordinates: 'POLYGON((70.0245 41.6028, 70.0352 41.6054, 70.0401 41.5951, 70.0245 41.6028))',
    notes: '',
  });

  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData && mode === 'edit') {
      setFormData({
        ...initialData,
        section: initialData.section || '14-kvartal, 2-ajratma',
        coordinates:
          initialData.coordinates ||
          'POLYGON((70.0245 41.6028, 70.0352 41.6054, 70.0401 41.5951, 70.0245 41.6028))',
      });
      setUploadedFileName(initialData.approvalDocName || (initialData.approvalDocId ? `${initialData.approvalDocId}_qaror.pdf` : null));
    } else {
      const randomId = `K-0${Math.floor(10 + Math.random() * 90)}`;
      setFormData({
        id: randomId,
        name: `Yangi Yaylov Konturi (${randomId})`,
        leskhoz: FORESTRY_ORGS[0],
        section: '14-kvartal, 2-ajratma',
        layer: 'Yaylov konturlari',
        areaHa: 120,
        maxSB: 150,
        currentSB: 0,
        status: 'draft',
        source: GEODETIC_SOURCES[0],
        accuracy: '±0.5 m',
        surveyDate: new Date().toISOString().split('T')[0],
        effectiveFrom: new Date().toISOString().split('T')[0],
        effectiveTo: '—',
        approvalDocId: '',
        approvalDocName: '',
        coordinates: 'POLYGON((70.0245 41.6028, 70.0352 41.6054, 70.0401 41.5951, 70.0245 41.6028))',
        notes: '',
      });
      setUploadedFileName(null);
    }
    setErrors({});
    setActiveTab('general');
  }, [initialData, mode, isOpen]);

  if (!isOpen) return null;

  const handleChange = (field: keyof ContourFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const err: Record<string, string> = {};
    if (!formData.name.trim()) err.name = 'Kontur nomini kiritish majburiy';
    if (!formData.leskhoz) err.leskhoz = 'Oʻrmon xoʻjaligini tanlang';
    if (formData.areaHa <= 0) err.areaHa = 'Maydon 0 dan katta boʻlishi shart';
    if (formData.maxSB < 0) err.maxSB = 'Sigʻim musbat son boʻlishi kerak';
    if (!formData.source) err.source = 'Geodezik manbani koʻrsating';

    // TZ rule 17.3: Published status requires approval document
    if (formData.status === 'published' && !formData.approvalDocId.trim() && !uploadedFileName) {
      err.approvalDocId =
        'TZ talabi (17.3-band): "Eʼlon qilingan (Published)" holatiga oʻtkazish uchun tasdiqlovchi hujjat kiritilishi shart!';
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) {
      // If error is in document tab, switch to it
      if (errors.approvalDocId) {
        setActiveTab('document');
      }
      return;
    }
    onSave({
      ...formData,
      approvalDocName: uploadedFileName || formData.approvalDocName,
      lastUpdated: new Date().toLocaleDateString('ru-RU'),
    });
    onClose();
  };

  const handleSimulateFileUpload = () => {
    const docName = `TAS_${formData.id || '2026'}_Qaror_ilova.pdf`;
    setUploadedFileName(docName);
    if (!formData.approvalDocId) {
      handleChange('approvalDocId', `TAS-2026-${Math.floor(100 + Math.random() * 900)}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 font-sans">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog Box */}
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl z-10 overflow-hidden animate-in zoom-in-95 duration-200 border border-[#E4E7EA] flex flex-col max-h-[92vh]"
        role="dialog"
      >
        {/* Modal Top Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#E4E7EA] bg-[#F8F9FA]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F0F7F1] text-[#2E7D4F] flex items-center justify-center border border-[#D9EBDC]">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-[#1A1F24]">
                  {mode === 'create' ? 'Yangi GIS-Kontur Kiritish' : `Konturni Tahrirlash: ${formData.id}`}
                </h3>
                <span className="text-[11px] font-mono font-bold bg-[#E0F2FE] text-[#0369A1] px-2 py-0.5 rounded border border-[#BAE6FD]">
                  TZ 10.2 / С17
                </span>
              </div>
              <p className="text-xs text-[#5A646D] mt-0.5">
                Poligon parametrlari, geodezik manba, topologiya va versiyalash atributlari
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

        {/* Tab Navigation */}
        <div className="flex items-center border-b border-[#E4E7EA] px-5 bg-white overflow-x-auto text-xs font-semibold gap-1">
          <button
            type="button"
            onClick={() => setActiveTab('general')}
            className={`py-3 px-3.5 border-b-2 flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'general'
                ? 'border-[#2E7D4F] text-[#2E7D4F]'
                : 'border-transparent text-[#5A646D] hover:text-[#1A1F24]'
            }`}
          >
            <MapPin className="w-4 h-4" /> 1. Asosiy Rekvizitlar
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('geodetic')}
            className={`py-3 px-3.5 border-b-2 flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'geodetic'
                ? 'border-[#2E7D4F] text-[#2E7D4F]'
                : 'border-transparent text-[#5A646D] hover:text-[#1A1F24]'
            }`}
          >
            <Layers className="w-4 h-4" /> 2. Geodeziya va Versiya
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('document')}
            className={`py-3 px-3.5 border-b-2 flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'document'
                ? 'border-[#2E7D4F] text-[#2E7D4F]'
                : 'border-transparent text-[#5A646D] hover:text-[#1A1F24]'
            }`}
          >
            <FileText className="w-4 h-4" /> 3. Tasdiqlovchi Hujjat & Status
            {formData.status === 'published' && !formData.approvalDocId && (
              <span className="w-2 h-2 rounded-full bg-red-500" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('topology')}
            className={`py-3 px-3.5 border-b-2 flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'topology'
                ? 'border-[#2E7D4F] text-[#2E7D4F]'
                : 'border-transparent text-[#5A646D] hover:text-[#1A1F24]'
            }`}
          >
            <ShieldCheck className="w-4 h-4" /> 4. Topologiya Tahlili
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 overflow-y-auto flex-1 text-xs text-[#1A1F24] space-y-4">
          {/* ── TAB 1: ASOSIY REKVIZITLAR ── */}
          {activeTab === 'general' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-[#5A646D] mb-1">Kontur ID (Identifikator) *</label>
                  <input
                    type="text"
                    value={formData.id}
                    onChange={(e) => handleChange('id', e.target.value)}
                    placeholder="Masalan: K-042"
                    className="w-full bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl px-3 py-2 text-xs font-mono font-bold text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-[#5A646D] mb-1">Kontur Nomi va Tavsifi *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Masalan: Boʻstonliq 14-kvartal yaylov uchastkasi"
                    className={`w-full bg-[#F8F9FA] border rounded-xl px-3 py-2 text-xs text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F] ${
                      errors.name ? 'border-[#B91C1C]' : 'border-[#E4E7EA]'
                    }`}
                  />
                  {errors.name && <p className="text-[11px] text-[#B91C1C] mt-1">{errors.name}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#5A646D] mb-1">Oʻrmon xoʻjaligi tashkiloti *</label>
                  <select
                    value={formData.leskhoz}
                    onChange={(e) => handleChange('leskhoz', e.target.value)}
                    className="w-full bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl px-3 py-2 text-xs font-medium text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
                  >
                    {FORESTRY_ORGS.map((org) => (
                      <option key={org} value={org}>
                        {org}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#5A646D] mb-1">Boʻlim / Kvartal / Ajratma *</label>
                  <input
                    type="text"
                    value={formData.section}
                    onChange={(e) => handleChange('section', e.target.value)}
                    placeholder="Masalan: 14-kvartal, 3-ajratma"
                    className="w-full bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl px-3 py-2 text-xs text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-[#5A646D] mb-1">GIS Qatlami Turi *</label>
                  <select
                    value={formData.layer}
                    onChange={(e) => handleChange('layer', e.target.value)}
                    className="w-full bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl px-3 py-2 text-xs font-medium text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
                  >
                    {GIS_LAYERS_OPTIONS.map((layer) => (
                      <option key={layer} value={layer}>
                        {layer}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#5A646D] mb-1">Ajratilgan Maydon (ga) *</label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={formData.areaHa}
                      onChange={(e) => handleChange('areaHa', parseFloat(e.target.value) || 0)}
                      className="w-full bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl px-3 py-2 text-xs font-mono font-bold text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
                    />
                    <span className="absolute right-3 top-2 text-[#767F87] font-semibold">ga</span>
                  </div>
                  {errors.areaHa && <p className="text-[11px] text-[#B91C1C] mt-1">{errors.areaHa}</p>}
                </div>

                <div>
                  <label className="block font-semibold text-[#5A646D] mb-1">Maksimal Sigʻim (MaxSB) *</label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      value={formData.maxSB}
                      onChange={(e) => handleChange('maxSB', parseInt(e.target.value) || 0)}
                      className="w-full bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl px-3 py-2 text-xs font-mono font-bold text-[#2E7D4F] focus:outline-none focus:border-[#2E7D4F]"
                    />
                    <span className="absolute right-3 top-2 text-[#767F87] font-semibold">bosh</span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 bg-[#F0F7F1] border border-[#D9EBDC] rounded-xl flex items-start gap-2.5 text-[#123522]">
                <Info className="w-4 h-4 text-[#2E7D4F] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="font-bold">Eslatma (TZ Modul 10.2):</span>
                  <p className="text-[#5A646D]">
                    Maydon koʻrsatkichi xaritadagi poligon geometriyasidan avtomatik tekshiriladi (`ST_Area`).
                    Maksimal sigʻim (MaxSB) esa 10.3-subtizim geobotanik normativ formulasi orqali asoslanadi.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ── TAB 2: GEODEZIYA VA VERSIYA ATRIBUTLARI ── */}
          {activeTab === 'geodetic' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#5A646D] mb-1">Geodezik Manba (Source) *</label>
                  <select
                    value={formData.source}
                    onChange={(e) => handleChange('source', e.target.value)}
                    className="w-full bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl px-3 py-2 text-xs font-medium text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
                  >
                    {GEODETIC_SOURCES.map((src) => (
                      <option key={src} value={src}>
                        {src}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#5A646D] mb-1">Oʻlchov Aniqligi (Accuracy) *</label>
                  <select
                    value={formData.accuracy}
                    onChange={(e) => handleChange('accuracy', e.target.value)}
                    className="w-full bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl px-3 py-2 text-xs font-medium text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
                  >
                    {ACCURACY_OPTIONS.map((acc) => (
                      <option key={acc} value={acc}>
                        {acc}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-[#5A646D] mb-1">Dala Oʻlchov Sanasi (Survey Date) *</label>
                  <input
                    type="date"
                    value={formData.surveyDate}
                    onChange={(e) => handleChange('surveyDate', e.target.value)}
                    className="w-full bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl px-3 py-2 text-xs font-mono text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#5A646D] mb-1">Kuchga Kirish Sanasi (Effective From) *</label>
                  <input
                    type="date"
                    value={formData.effectiveFrom}
                    onChange={(e) => handleChange('effectiveFrom', e.target.value)}
                    className="w-full bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl px-3 py-2 text-xs font-mono text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#5A646D] mb-1">Amal Qilish Tugashi (Effective To)</label>
                  <input
                    type="text"
                    value={formData.effectiveTo}
                    onChange={(e) => handleChange('effectiveTo', e.target.value)}
                    placeholder="Muddatsiz boʻlsa —"
                    className="w-full bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl px-3 py-2 text-xs font-mono text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#5A646D] mb-1">WKT Geometriya Poligoni (WGS-84 / EPSG:4326)</label>
                <textarea
                  rows={3}
                  value={formData.coordinates}
                  onChange={(e) => handleChange('coordinates', e.target.value)}
                  className="w-full bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl p-3 text-[11px] font-mono text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
                />
              </div>
            </div>
          )}

          {/* ── TAB 3: TASDIQLOVCHI HUJJAT VA STATUS ── */}
          {activeTab === 'document' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-[#1A1F24]">Kontur Hayotiy Sikli Holati (Status Lifecycle) *</label>
                  <span className="text-[11px] text-[#767F87] font-mono">Draft → Review → Approved → Published</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {[
                    { key: 'draft', label: 'Qoralama (Draft)', color: 'border-[#767F87]' },
                    { key: 'review', label: 'Koʻrib chiqishda', color: 'border-[#0284C7]' },
                    { key: 'approved', label: 'Tasdiqlangan', color: 'border-[#D97706]' },
                    { key: 'published', label: 'Eʼlon qilingan', color: 'border-[#2E7D4F]' },
                    { key: 'archived', label: 'Arxivlangan', color: 'border-gray-400' },
                  ].map((st) => (
                    <button
                      key={st.key}
                      type="button"
                      onClick={() => handleChange('status', st.key)}
                      className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                        formData.status === st.key
                          ? 'bg-[#1A1F24] text-white border-[#1A1F24] shadow-xs'
                          : 'bg-[#F8F9FA] text-[#5A646D] border-[#E4E7EA] hover:bg-white'
                      }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Approval document section */}
              <div className="border border-[#E4E7EA] rounded-2xl p-4 bg-[#F8F9FA] space-y-3">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-[#2E7D4F]" />
                  <div>
                    <h4 className="font-bold text-xs text-[#1A1F24]">Tasdiqlovchi Hujjat Maʼlumotlari</h4>
                    <p className="text-[11px] text-[#5A646D]">
                      Konturni 'Published' holatiga oʻtkazish uchun huquqiy asos hujjati (Qaror / Farmoyish)
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[#5A646D] mb-1">
                      Tasdiqlovchi Hujjat Raqami (approval_doc_id)
                    </label>
                    <input
                      type="text"
                      value={formData.approvalDocId}
                      onChange={(e) => handleChange('approvalDocId', e.target.value)}
                      placeholder="Masalan: TAS-2026-089"
                      className="w-full bg-white border border-[#E4E7EA] rounded-xl px-3 py-2 text-xs font-mono font-bold text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#5A646D] mb-1">Hujjat Fayli (PDF / Skan)</label>
                    {uploadedFileName ? (
                      <div className="flex items-center justify-between p-2 rounded-xl bg-[#F0F7F1] border border-[#D9EBDC] text-xs">
                        <span className="font-semibold text-[#2E7D4F] truncate max-w-[200px]">{uploadedFileName}</span>
                        <button
                          type="button"
                          onClick={() => setUploadedFileName(null)}
                          className="text-[#B91C1C] hover:underline font-bold text-[11px]"
                        >
                          Oʻchirish
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSimulateFileUpload}
                        className="w-full py-2 px-3 rounded-xl border border-dashed border-[#2E7D4F] bg-white text-[#2E7D4F] font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#F0F7F1] transition-colors cursor-pointer"
                      >
                        <UploadCloud className="w-4 h-4" /> PDF Hujjat Yuklash
                      </button>
                    )}
                  </div>
                </div>

                {errors.approvalDocId && (
                  <div className="p-3 bg-[#FEF2F2] border border-[#FCA5A5] rounded-xl flex items-start gap-2 text-[#991B1B]">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{errors.approvalDocId}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── TAB 4: TOPOLOGIYA TAHLILI ── */}
          {activeTab === 'topology' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-4 bg-white border border-[#E4E7EA] rounded-2xl shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-[#E4E7EA] pb-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#2E7D4F]" />
                    <span className="font-bold text-xs text-[#1A1F24]">Avtomatik Fazoviy va Topologik Audit</span>
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 bg-[#F0F7F1] text-[#2E7D4F] border border-[#D9EBDC] rounded-md">
                    POSTGIS STATUS: VALID
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-[#F0F7F1] border border-[#D9EBDC] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#123522]">ST_IsValid</span>
                      <CheckCircle2 className="w-4 h-4 text-[#2E7D4F]" />
                    </div>
                    <p className="text-[11px] text-[#5A646D]">Poligon yopiq, oʻz-oʻzi bilan kesishmagan vertexlar mavjud emas.</p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#F0F7F1] border border-[#D9EBDC] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#123522]">ST_Within</span>
                      <CheckCircle2 className="w-4 h-4 text-[#2E7D4F]" />
                    </div>
                    <p className="text-[11px] text-[#5A646D]">Kontur davlat oʻrmon fondi rasmiy chegaralari ichida joylashgan.</p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#F0F7F1] border border-[#D9EBDC] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#123522]">ST_Overlaps</span>
                      <CheckCircle2 className="w-4 h-4 text-[#2E7D4F]" />
                    </div>
                    <p className="text-[11px] text-[#5A646D]">Amaldagi ruxsatnomalar yoki cheklov zonalari bilan konflikt: 0%.</p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#F0F7F1] border border-[#D9EBDC] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#123522]">ST_Area</span>
                      <span className="font-mono font-bold text-[#2E7D4F]">{formData.areaHa} ga</span>
                    </div>
                    <p className="text-[11px] text-[#5A646D]">Hisoblangan sferoid maydoni kiritilgan qiymat bilan toʻliq mos.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#F8F9FA] border-t border-[#E4E7EA] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[11px] text-[#5A646D] flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#2E7D4F]" />
            <span>Saqlangan kontur darhol vector tile va reestrga kiritiladi.</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button variant="outline" size="sm" onClick={onClose} className="flex-1 sm:flex-none">
              Bekor qilish
            </Button>
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Save className="w-4 h-4" />}
              onClick={handleSubmit}
              className="bg-[#2E7D4F] hover:bg-[#23653F] text-white font-bold flex-1 sm:flex-none"
            >
              {mode === 'create' ? 'Konturni Saqlash' : 'Oʻzgarishlarni Saqlash'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
