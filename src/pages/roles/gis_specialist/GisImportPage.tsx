import React, { useState } from 'react';
import {
  UploadCloud,
  FileCheck2,
  ArrowLeft,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  Layers,
  Globe,
  Settings2,
  Download,
  Filter,
  Check,
  X,
  Sparkles,
  Info,
  ExternalLink,
} from 'lucide-react';
import { Button } from '../../../components/ui/button';

export interface GisImportPageProps {
  onNavigate?: (page: string, params?: any) => void;
}

export interface ImportErrorItem {
  lineNo: number;
  featureId: string;
  contourName: string;
  errorCode: 'VALID' | 'ERR-GIS-001' | 'ERR-GIS-002' | 'ERR-GIS-003' | 'ERR-GIS-004' | 'WARN-GIS-001' | 'WARN-GIS-002';
  category: 'topology' | 'boundary' | 'schema' | 'projection' | 'valid';
  message: string;
  suggestion: string;
  status: 'error' | 'warning' | 'valid';
  areaHa?: number;
}

const GIS_LAYERS_LIST = [
  'Oʻrmon fondi konturlari',
  'Yaylovlar',
  'Pichanzorlar',
  'Tashkilot chegaralari',
  'Rekreatsiya zonalari',
  'Asalari uyalari uchastkalari',
  'Rotatsiya uchastkalari',
  'Muhofaza zonalari',
];

export const GisImportPage: React.FC<GisImportPageProps> = ({ onNavigate }) => {
  const [importMode, setImportMode] = useState<'file' | 'wfs' | 'api'>('file');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [wfsUrl, setWfsUrl] = useState('https://geoserver.urmon.uz/geoserver/wfs?service=WFS&request=GetFeature&typeName=forest:contours_2026');
  const [targetLayer, setTargetLayer] = useState(GIS_LAYERS_LIST[0]);
  const [sourceSrid, setSourceSrid] = useState('4326');
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasProcessed, setHasProcessed] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'all' | 'error' | 'warning' | 'valid'>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [reports, setReports] = useState<ImportErrorItem[]>([
    {
      lineNo: 1,
      featureId: 'FT-001',
      contourName: 'K-042 (Burchmulla yaylovi)',
      errorCode: 'VALID',
      category: 'valid',
      message: 'ST_IsValid=true, ST_Within(ForestFund)=true. Barcha majburiy atributlar mavjud.',
      suggestion: 'Muammo yoʻq, importga tayyor.',
      status: 'valid',
      areaHa: 450,
    },
    {
      lineNo: 14,
      featureId: 'FT-014',
      contourName: 'K-055 (Pichangoh shimol)',
      errorCode: 'ERR-GIS-001',
      category: 'topology',
      message: 'Topologik xato: Poligon oʻz-oʻzi bilan kesishgan (Self-intersection at vertex [70.0412, 41.6089]).',
      suggestion: 'GIS dasturida ST_MakeValid yoki vertexlarni tuzatib qayta yuklang.',
      status: 'error',
      areaHa: 120,
    },
    {
      lineNo: 22,
      featureId: 'FT-022',
      contourName: 'K-068 (Zomin chegarasi)',
      errorCode: 'WARN-GIS-001',
      category: 'projection',
      message: 'Koordinata tizimi mosligi: EPSG:32642 UTM proyeksiyasidan EPSG:4326 ga avto-konvert qilindi.',
      suggestion: 'Metrik aniqlik ±0.3 m doirasida tasdiqlangan.',
      status: 'warning',
      areaHa: 280,
    },
    {
      lineNo: 28,
      featureId: 'FT-028',
      contourName: 'K-079 (Boʻsh uchastka)',
      errorCode: 'ERR-GIS-004',
      category: 'schema',
      message: 'Majburiy atribut yetishmaydi: `leskhoz_id` va `survey_date` kiritilmagan.',
      suggestion: 'Atributlar jadvaliga oʻrmon xoʻjaligi kodi va oʻlchov sanasini qoʻshing.',
      status: 'error',
      areaHa: 65,
    },
    {
      lineNo: 35,
      featureId: 'FT-035',
      contourName: 'K-091 (Kitob baland yaylov)',
      errorCode: 'VALID',
      category: 'valid',
      message: 'Topologik tahlildan muvaffaqiyatli oʻtdi.',
      suggestion: 'Muammo yoʻq.',
      status: 'valid',
      areaHa: 310,
    },
    {
      lineNo: 42,
      featureId: 'FT-042',
      contourName: 'K-104 (Burchmulla rotatsiya)',
      errorCode: 'VALID',
      category: 'valid',
      message: 'Topologik tahlildan muvaffaqiyatli oʻtdi.',
      suggestion: 'Muammo yoʻq.',
      status: 'valid',
      areaHa: 195,
    },
  ]);

  const handleSimulateUpload = () => {
    setSelectedFile('Burchmulla_Forest_Contours_2026.geojson');
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setHasProcessed(true);
      setToastMessage('Fayl topologik va atributiv tahlili yakunlandi. Error Report shakllantirildi!');
      setTimeout(() => setToastMessage(null), 4500);
    }, 1200);
  };

  const handleSimulateWfsConnect = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setHasProcessed(true);
      setSelectedFile('WFS_Service_Stream (Remote Geoserver)');
      setToastMessage('WFS qatlami muvaffaqiyatli yuklandi va topologik tahlildan oʻtkazildi!');
      setTimeout(() => setToastMessage(null), 4500);
    }, 1400);
  };

  const handleRollback = () => {
    if (confirm('Rostdan ham import qilingan keshni toʻliq bekor qilmoqchimisiz (Rollback)?')) {
      setHasProcessed(false);
      setSelectedFile(null);
      setToastMessage('Import jarayoni toʻliq bekor qilindi (Rollback bajarildi). Hech qanday maʼlumot bazaga yozilmadi.');
      setTimeout(() => setToastMessage(null), 4000);
    }
  };

  const handleCommitValidOnly = () => {
    const validCount = reports.filter((r) => r.status === 'valid' || r.status === 'warning').length;
    setToastMessage(`Muvaffaqiyatli: Faqat toʻgʻri boʻlgan ${validCount} ta poligon GIS bazasiga (Draft holatida) saqlandi! Xatolar alohida logga yozildi.`);
    setTimeout(() => {
      onNavigate?.('gis_editor');
    }, 1800);
  };

  const handleExportErrorReport = () => {
    alert('Import xatolar hisoboti (Error_Report_GIS_2026.csv) yuklab olindi.');
  };

  const totalCount = 42; // Simulation total
  const validCount = reports.filter((r) => r.status === 'valid').length + 36;
  const warningCount = reports.filter((r) => r.status === 'warning').length;
  const errorCount = reports.filter((r) => r.status === 'error').length;

  const filteredReports = reports.filter((r) => {
    if (statusFilter === 'all') return true;
    return r.status === statusFilter;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6 font-sans pb-16">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="p-4 bg-[#F0F7F1] border border-[#D9EBDC] text-[#2E7D4F] rounded-2xl shadow-sm flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-[#2E7D4F] shrink-0" />
            <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-xs font-bold underline hover:opacity-75 cursor-pointer"
          >
            Yopish
          </button>
        </div>
      )}

      {/* Top Navigation & Subsystem Badge */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          leftIcon={<ArrowLeft className="w-4 h-4" />}
          onClick={() => onNavigate?.('gis_editor')}
        >
          GIS Xarita muharririga qaytish
        </Button>
        <span className="text-xs font-mono font-bold bg-[#F8F9FA] text-[#5A646D] px-3 py-1 rounded-lg border border-[#E4E7EA]">
          TZ Subtizim 10.2 · Ssenariy C17
        </span>
      </div>

      {/* Title Card */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#2E7D4F] bg-[#F0F7F1] px-3 py-1 rounded-full border border-[#D9EBDC] inline-block">
          GIS Qatlam Maʼlumotlarini Import Qilish va Validatsiya
        </span>
        <h1 className="text-xl sm:text-2xl font-bold text-[#1A1F24]">
          Geo-Fayl Importi va Topologik Xatolar Hisoboti (Error Report)
        </h1>
        <p className="text-xs text-[#5A646D]">
          SHP (.zip), GeoJSON, KML, GPKG fayllari yoki WFS/API servislaridan yuklangan qatlamlar PostGIS topologiyasi (`ST_IsValid`, `ST_Within`, `ST_Overlaps`) va atribut sxemasi boʻyicha avto-tekshiriladi.
        </p>
      </div>

      {/* Import Settings & Source Selection */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-[#E4E7EA] pb-3">
          <div className="flex items-center gap-2">
            <Settings2 className="w-5 h-5 text-[#2E7D4F]" />
            <h2 className="text-sm font-bold text-[#1A1F24]">1. Import Manbasi va Parametrlari</h2>
          </div>
          {/* Source Tabs */}
          <div className="bg-[#F8F9FA] p-1 rounded-xl border border-[#E4E7EA] flex items-center gap-1 text-xs font-bold">
            <button
              onClick={() => setImportMode('file')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                importMode === 'file' ? 'bg-white shadow-xs text-[#2E7D4F]' : 'text-[#5A646D]'
              }`}
            >
              Fayl Yuklash
            </button>
            <button
              onClick={() => setImportMode('wfs')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                importMode === 'wfs' ? 'bg-white shadow-xs text-[#2E7D4F]' : 'text-[#5A646D]'
              }`}
            >
              WFS / WMS Servis
            </button>
            <button
              onClick={() => setImportMode('api')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                importMode === 'api' ? 'bg-white shadow-xs text-[#2E7D4F]' : 'text-[#5A646D]'
              }`}
            >
              Davlat Kadastr API
            </button>
          </div>
        </div>

        {/* Configuration Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-[#5A646D] mb-1">Maqsadli GIS Qatlami *</label>
            <select
              value={targetLayer}
              onChange={(e) => setTargetLayer(e.target.value)}
              className="w-full bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl px-3 py-2 text-xs font-semibold text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
            >
              {GIS_LAYERS_LIST.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-[#5A646D] mb-1">Manba Koordinata Tizimi (SRID) *</label>
            <select
              value={sourceSrid}
              onChange={(e) => setSourceSrid(e.target.value)}
              className="w-full bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl px-3 py-2 text-xs font-mono font-semibold text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
            >
              <option value="4326">EPSG:4326 — WGS 84 (Gradus)</option>
              <option value="3857">EPSG:3857 — Web Mercator</option>
              <option value="32642">EPSG:32642 — UTM 42N (Metr)</option>
              <option value="32641">EPSG:32641 — UTM 41N</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-[#5A646D] mb-1">Boshlangʻich Holat (TZ C17) *</label>
            <div className="bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl px-3 py-2 text-xs text-[#1A1F24] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-500" />
              <span className="font-bold">Qoralama (Draft)</span>
              <span className="text-[11px] text-[#767F87] ml-auto">Tasdiq talab etiladi</span>
            </div>
          </div>
        </div>

        {/* Upload Action Area */}
        {importMode === 'file' ? (
          <div className="border-2 border-dashed border-[#D9EBDC] bg-[#F0F7F1]/40 rounded-2xl p-6 text-center space-y-3">
            <div className="w-12 h-12 bg-white text-[#2E7D4F] rounded-2xl flex items-center justify-center mx-auto shadow-xs border border-[#D9EBDC]">
              <UploadCloud className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-[#1A1F24]">Faylni tanlang yoki shu yerga tashlang</h3>
              <p className="text-xs text-[#5A646D]">
                Qoʻllab-quvvatlanadigan formatlar: <b>.zip (Shapefile: shp, shx, dbf, prj)</b>, <b>.geojson</b>, <b>.kml</b>, <b>.kmz</b>, <b>.gpkg</b>, <b>.csv</b> (Maksimal: 50 MB)
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-1">
              <Button
                variant="primary"
                size="sm"
                isLoading={isProcessing}
                onClick={handleSimulateUpload}
                className="bg-[#2E7D4F] hover:bg-[#23653F] text-white font-bold"
              >
                {selectedFile ? `Faylni Qayta Tahlil Qilish (${selectedFile})` : 'Kompyuterdan Fayl Tanlash'}
              </Button>
            </div>
          </div>
        ) : importMode === 'wfs' ? (
          <div className="p-4 bg-[#F8F9FA] border border-[#E4E7EA] rounded-2xl space-y-3">
            <label className="block font-semibold text-[#5A646D] text-xs">
              WFS / WMS Servis Server URL (GetCapabilities):
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={wfsUrl}
                onChange={(e) => setWfsUrl(e.target.value)}
                className="flex-1 bg-white border border-[#E4E7EA] rounded-xl px-3 py-2 text-xs font-mono text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
              />
              <Button
                variant="primary"
                size="sm"
                isLoading={isProcessing}
                onClick={handleSimulateWfsConnect}
                className="bg-[#2E7D4F] hover:bg-[#23653F] text-white font-bold shrink-0"
              >
                Ulanish va Import
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-[#F8F9FA] border border-[#E4E7EA] rounded-2xl flex items-center justify-between">
            <div>
              <span className="font-bold text-xs text-[#1A1F24]">Davlat Kadastr Agentligi Integratsiya Shlyuzi</span>
              <p className="text-xs text-[#5A646D]">Real vaqt rejimida kadastr chegaralari va muhofaza zonalarini tortib olish.</p>
            </div>
            <Button
              variant="primary"
              size="sm"
              isLoading={isProcessing}
              onClick={handleSimulateWfsConnect}
              className="bg-[#2E7D4F] hover:bg-[#23653F] text-white font-bold"
            >
              API orqali Yangilash
            </Button>
          </div>
        )}
      </div>

      {/* Line-by-Line Error Report Results Section */}
      {hasProcessed && (
        <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-md space-y-5 animate-in fade-in duration-300">
          {/* Summary Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl">
              <span className="text-[#5A646D] block">Jami Poligonlar:</span>
              <span className="text-lg font-mono font-bold text-[#1A1F24]">{totalCount} ta</span>
            </div>
            <div className="p-3 bg-[#F0F7F1] border border-[#D9EBDC] rounded-xl">
              <span className="text-[#2E7D4F] block font-semibold">Valid (Xatosiz):</span>
              <span className="text-lg font-mono font-bold text-[#2E7D4F]">{validCount} ta</span>
            </div>
            <div className="p-3 bg-[#FFFBEB] border border-[#FDE68A] rounded-xl">
              <span className="text-[#B45309] block font-semibold">Ogohlantirish:</span>
              <span className="text-lg font-mono font-bold text-[#B45309]">{warningCount} ta</span>
            </div>
            <div className="p-3 bg-[#FEF2F2] border border-[#FCA5A5] rounded-xl">
              <span className="text-[#991B1B] block font-semibold">Topologik Xatolar:</span>
              <span className="text-lg font-mono font-bold text-[#991B1B]">{errorCount} ta</span>
            </div>
          </div>

          {/* Table Controls & Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E4E7EA] pb-4">
            <div>
              <h2 className="text-base font-bold text-[#1A1F24]">Qatorlar Boʻyicha Xatolar Hisoboti (Error Report)</h2>
              <p className="text-xs text-[#5A646D]">
                Har bir poligon uchun xato kodi va tuzatish tavsiyalari
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Filter pills */}
              <div className="bg-[#F8F9FA] p-1 rounded-xl border border-[#E4E7EA] flex items-center gap-1 text-[11px] font-bold">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    statusFilter === 'all' ? 'bg-white shadow-xs text-[#1A1F24]' : 'text-[#5A646D]'
                  }`}
                >
                  Barchasi ({reports.length})
                </button>
                <button
                  onClick={() => setStatusFilter('error')}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    statusFilter === 'error' ? 'bg-[#FEF2F2] text-[#991B1B]' : 'text-[#5A646D]'
                  }`}
                >
                  Xatolar ({reports.filter((r) => r.status === 'error').length})
                </button>
                <button
                  onClick={() => setStatusFilter('valid')}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    statusFilter === 'valid' ? 'bg-[#F0F7F1] text-[#2E7D4F]' : 'text-[#5A646D]'
                  }`}
                >
                  Valid ({reports.filter((r) => r.status === 'valid').length})
                </button>
              </div>

              <Button
                variant="outline"
                size="sm"
                leftIcon={<Download className="w-4 h-4" />}
                onClick={handleExportErrorReport}
                className="text-xs"
              >
                Log Eksport (CSV)
              </Button>
            </div>
          </div>

          {/* Line-by-Line Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-[#F8F9FA] border-b border-[#E4E7EA]">
                <tr>
                  <th className="p-3 font-semibold text-[#5A646D] w-16">Qator</th>
                  <th className="p-3 font-semibold text-[#5A646D]">Feature ID</th>
                  <th className="p-3 font-semibold text-[#5A646D]">Kontur Nomi / Maydon</th>
                  <th className="p-3 font-semibold text-[#5A646D]">Xato Kodi (TZ 14)</th>
                  <th className="p-3 font-semibold text-[#5A646D]">Tahlil Xabari & Tavsiya</th>
                  <th className="p-3 font-semibold text-[#5A646D] w-24">Holati</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4E7EA]">
                {filteredReports.map((row) => (
                  <tr key={row.lineNo} className="hover:bg-[#F8F9FA]">
                    <td className="p-3 font-mono font-bold">{row.lineNo}</td>
                    <td className="p-3 font-mono font-semibold">{row.featureId}</td>
                    <td className="p-3">
                      <div className="font-semibold text-[#1A1F24]">{row.contourName}</div>
                      {row.areaHa && <div className="text-[11px] font-mono text-[#5A646D]">{row.areaHa} ga</div>}
                    </td>
                    <td className="p-3 font-mono">
                      <span
                        className={`px-2 py-0.5 rounded text-[11px] font-bold border ${
                          row.status === 'valid'
                            ? 'bg-[#F0F7F1] text-[#2E7D4F] border-[#D9EBDC]'
                            : row.status === 'warning'
                            ? 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]'
                            : 'bg-[#FEF2F2] text-[#991B1B] border-[#FCA5A5]'
                        }`}
                      >
                        {row.errorCode}
                      </span>
                    </td>
                    <td className="p-3 space-y-0.5">
                      <div className="text-[#1A1F24] font-medium">{row.message}</div>
                      <div className="text-[11px] text-[#5A646D] italic">Tavsiya: {row.suggestion}</div>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          row.status === 'valid'
                            ? 'bg-[#F0F7F1] text-[#2E7D4F]'
                            : row.status === 'warning'
                            ? 'bg-[#FFFBEB] text-[#B45309]'
                            : 'bg-[#FEF2F2] text-[#991B1B]'
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Rollback & Commit Action Bar */}
          <div className="p-4 bg-[#F8F9FA] border border-[#E4E7EA] rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-[#5A646D]">
              <Info className="w-4 h-4 text-[#0369A1] shrink-0" />
              <span>
                <b>Rollback:</b> Hech narsa saqlanmaydi. <b>Valid Qismlarni Saqlash:</b> Xatoli 2 ta poligon chetlab oʻtiladi va faqat toʻgʻri qismlar qoralama sifatida kiritiladi.
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="outline"
                size="sm"
                leftIcon={<RotateCcw className="w-4 h-4" />}
                onClick={handleRollback}
                className="text-xs"
              >
                Bekor qilish (Rollback)
              </Button>
              <Button
                variant="primary"
                size="sm"
                leftIcon={<FileCheck2 className="w-4 h-4" />}
                onClick={handleCommitValidOnly}
                className="bg-[#2E7D4F] hover:bg-[#23653F] text-white font-bold text-xs"
              >
                Valid Qismlarni Saqlash ({validCount} ta)
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
