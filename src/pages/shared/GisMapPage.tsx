import React, { useState } from 'react';
import {
  Layers,
  Edit3,
  Square,
  Ruler,
  Upload,
  Plus,
  Compass,
  Printer,
  Maximize2,
  CheckCircle2,
  History,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { hasRight } from '../../lib/permissions';
import { Select } from '../../components/ui/FormControls';
import { DataTable, type Column } from '../../components/ui/DataTable';
import { Modal } from '../../components/ui/Overlay';
import { ContourFormModal, type ContourFormData, type ContourStatus } from './components/ContourFormModal';
import { ContourStatusModal } from './components/ContourStatusModal';

export interface GisMapPageProps {
  onNavigate?: (page: string, params?: any) => void;
  userRole?: string;
}

const STATUS_LABELS: Record<ContourStatus, string> = {
  draft: 'Qoralama',
  review: 'Koʻrib chiqishda',
  approved: 'Tasdiqlangan',
  published: 'Eʼlon qilingan',
  archived: 'Arxivlangan',
};

const STATUS_STYLES: Record<ContourStatus, string> = {
  draft: 'bg-[#F8F9FA] text-[#767F87] border-[#E4E7EA]',
  review: 'bg-[#E0F2FE] text-[#0369A1] border-[#BAE6FD]',
  approved: 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]',
  published: 'bg-[#F0F7F1] text-[#2E7D4F] border-[#D9EBDC]',
  archived: 'bg-gray-100 text-gray-600 border-gray-300',
};

interface ContourItem {
  id: string;
  name: string;
  leskhoz: string;
  section?: string;
  areaHa: number;
  maxSB: number; // Maximum livestock capacity
  currentSB: number; // Currently used
  layer: string;
  status: ContourStatus;
  lastUpdated: string;
  /** Version attributes required by TZ module 10.2. */
  source: string;
  accuracy: string;
  surveyDate: string;
  effectiveFrom: string;
  effectiveTo: string;
  approvalDocId: string;
  approvalDocName?: string;
  coordinates?: string;
  notes?: string;
}

export const GisMapPage: React.FC<GisMapPageProps> = ({ onNavigate, userRole = '' }) => {
  /**
   * Only the GIS/normative specialist may draw or import a contour (Я, Ў).
   * Everyone else — including management, which previously fell through to the
   * editor — gets the monitoring view.
   */
  const canEditContours = hasRight(userRole, 'gis_contour', 'edit');
  const isMonitoringView = !canEditContours;

  const [activeTool, setActiveTool] = useState<'select' | 'polygon' | 'measure' | 'vertex'>('select');
  const [selectedRegion, setSelectedRegion] = useState('all');

  // Map settings required by TZ module 10.2
  const [baseMap, setBaseMap] = useState<'osm' | 'satellite'>('osm');
  const [srid, setSrid] = useState('4326');
  const [layerOpacity, setLayerOpacity] = useState(80);
  const [contourCard, setContourCard] = useState<ContourItem | null>(null);

  // Contour Create/Edit Modal State
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [formModalMode, setFormModalMode] = useState<'create' | 'edit'>('create');
  const [selectedContourForEdit, setSelectedContourForEdit] = useState<ContourFormData | null>(null);

  // Contour Status Lifecycle Transition Modal State
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedContourForStatus, setSelectedContourForStatus] = useState<ContourItem | null>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  /** The thirteen layers named in TZ module 10.2, in the order the TZ lists them. */
  const gisLayers = [
    { id: 'forest_fund', name: 'Oʻrmon fondi', count: 1204, visible: true, color: '#123522' },
    { id: 'org_bounds', name: 'Tashkilot chegaralari', count: 84, visible: true, color: '#0369A1' },
    { id: 'contours', name: 'Konturlar', count: 642, visible: true, color: '#2E7D4F' },
    { id: 'pasture', name: 'Yaylovlar', count: 142, visible: true, color: '#7FB98A' },
    { id: 'haymaking', name: 'Pichanzorlar', count: 58, visible: true, color: '#B45309' },
    { id: 'bees', name: 'Asalari uyalari uchastkalari', count: 26, visible: false, color: '#D97706' },
    { id: 'recreation', name: 'Rekreatsiya zonalari', count: 31, visible: false, color: '#0284C7' },
    { id: 'restrictions', name: 'Cheklovlar va taqiqlar', count: 47, visible: true, color: '#B91C1C' },
    { id: 'protection', name: 'Muhofaza zonalari', count: 12, visible: true, color: '#991B1B' },
    { id: 'rotation', name: 'Rotatsiya uchastkalari', count: 38, visible: false, color: '#15803D' },
    { id: 'rest', name: 'Dam olish maydonlari', count: 19, visible: false, color: '#0891B2' },
    { id: 'water_points', name: 'Suv nuqtalari', count: 34, visible: false, color: '#0EA5E9' },
    { id: 'cattle_route', name: 'Mol yoʻllari', count: 22, visible: false, color: '#767F87' },
  ];

  const [contoursList, setContoursList] = useState<ContourItem[]>([
    {
      id: 'K-042',
      name: 'Kontur №42 (Chorva boqish)',
      leskhoz: 'Burchmulla davlat oʻrmon xoʻjaligi',
      section: '14-kvartal, 2-ajratma',
      areaHa: 450,
      maxSB: 500,
      currentSB: 120,
      layer: 'Yaylov konturlari',
      status: 'published',
      lastUpdated: '10.08.2026',
      source: 'Yerqurilish loyihasi 2024',
      accuracy: '±0.5 m',
      surveyDate: '12.03.2024',
      effectiveFrom: '01.01.2025',
      effectiveTo: '—',
      approvalDocId: 'TAS-2024-118',
      approvalDocName: 'TAS-2024-118_qaror.pdf',
      coordinates: 'POLYGON((70.0245 41.6028, 70.0352 41.6054, 70.0401 41.5951, 70.0245 41.6028))',
    },
    {
      id: 'K-015',
      name: 'Kontur №15 (Pichangoh)',
      leskhoz: 'Zomin davlat qoʻriqxonasi',
      section: '8-kvartal, 1-ajratma',
      areaHa: 180,
      maxSB: 200,
      currentSB: 180,
      layer: 'Pichan oʻrish maydonlari',
      status: 'published',
      lastUpdated: '08.08.2026',
      source: 'Aerofotosuratga asoslangan',
      accuracy: '±1.2 m',
      surveyDate: '05.06.2023',
      effectiveFrom: '01.09.2023',
      effectiveTo: '—',
      approvalDocId: 'TAS-2023-076',
      approvalDocName: 'TAS-2023-076_hujjat.pdf',
      coordinates: 'POLYGON((68.5245 39.9028, 68.5352 39.9054, 68.5401 39.8951, 68.5245 39.9028))',
    },
    {
      id: 'K-088',
      name: 'Kontur №88 (Yangi chegara)',
      leskhoz: 'Kitob davlat oʻrmon xoʻjaligi',
      section: '3-kvartal, 4-ajratma',
      areaHa: 320,
      maxSB: 350,
      currentSB: 0,
      layer: 'Yaylov konturlari',
      status: 'review',
      lastUpdated: '05.08.2026',
      source: 'Dala geodezik oʻlchovi',
      accuracy: '±0.3 m',
      surveyDate: '28.07.2026',
      effectiveFrom: '—',
      effectiveTo: '—',
      approvalDocId: '—',
      coordinates: 'POLYGON((66.9245 39.1028, 66.9352 39.1054, 66.9401 39.0951, 66.9245 39.1028))',
    },
    {
      id: 'K-099',
      name: 'Kontur №99 (Qoralama)',
      leskhoz: 'Pop davlat oʻrmon xoʻjaligi',
      section: '11-kvartal, 1-ajratma',
      areaHa: 95,
      maxSB: 100,
      currentSB: 0,
      layer: 'Yaylov konturlari',
      status: 'draft',
      lastUpdated: '01.08.2026',
      source: 'Qoʻlda chizilgan qoralama',
      accuracy: 'aniqlanmagan',
      surveyDate: '—',
      effectiveFrom: '—',
      effectiveTo: '—',
      approvalDocId: '—',
      coordinates: 'POLYGON((71.1245 40.8028, 71.1352 40.8054, 71.1401 40.7951, 71.1245 40.8028))',
    },
  ]);

  const handleOpenCreateModal = () => {
    setSelectedContourForEdit(null);
    setFormModalMode('create');
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (contour: ContourItem) => {
    setSelectedContourForEdit({
      id: contour.id,
      name: contour.name,
      leskhoz: contour.leskhoz,
      section: contour.section || '14-kvartal, 2-ajratma',
      layer: contour.layer,
      areaHa: contour.areaHa,
      maxSB: contour.maxSB,
      currentSB: contour.currentSB,
      status: contour.status,
      source: contour.source,
      accuracy: contour.accuracy,
      surveyDate: contour.surveyDate !== '—' ? contour.surveyDate : new Date().toISOString().split('T')[0],
      effectiveFrom: contour.effectiveFrom !== '—' ? contour.effectiveFrom : new Date().toISOString().split('T')[0],
      effectiveTo: contour.effectiveTo,
      approvalDocId: contour.approvalDocId !== '—' ? contour.approvalDocId : '',
      approvalDocName: contour.approvalDocName,
      coordinates: contour.coordinates || 'POLYGON((70.0245 41.6028, 70.0352 41.6054, 70.0401 41.5951, 70.0245 41.6028))',
      notes: contour.notes,
    });
    setFormModalMode('edit');
    setIsFormModalOpen(true);
  };

  const handleOpenStatusModal = (contour: ContourItem) => {
    setSelectedContourForStatus(contour);
    setIsStatusModalOpen(true);
  };

  const handleSaveContour = (savedData: ContourFormData) => {
    if (formModalMode === 'create') {
      const newContour: ContourItem = {
        ...savedData,
        lastUpdated: new Date().toLocaleDateString('ru-RU'),
      };
      setContoursList((prev) => [newContour, ...prev]);
      setToastMessage(`Yangi GIS-kontur "${savedData.name}" muvaffaqiyatli saqlandi va reestrga qoʻshildi!`);
    } else {
      setContoursList((prev) =>
        prev.map((c) =>
          c.id === savedData.id
            ? {
                ...c,
                ...savedData,
                lastUpdated: new Date().toLocaleDateString('ru-RU'),
              }
            : c
        )
      );
      setToastMessage(`"${savedData.id}" konturining barcha parametrlari va versiya maʼlumotlari yangilandi!`);
    }
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleConfirmStatusChange = (
    contourId: string,
    newStatus: ContourStatus,
    docId?: string,
    docName?: string,
    note?: string
  ) => {
    setContoursList((prev) =>
      prev.map((c) =>
        c.id === contourId
          ? {
              ...c,
              status: newStatus,
              approvalDocId: docId || c.approvalDocId,
              approvalDocName: docName || c.approvalDocName,
              notes: note || c.notes,
              lastUpdated: new Date().toLocaleDateString('ru-RU'),
            }
          : c
      )
    );
    const statusText = STATUS_LABELS[newStatus];
    setToastMessage(`"${contourId}" konturining hayotiy sikl holati muvaffaqiyatli "${statusText}" ga oʻzgartirildi!`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const columns: Column<ContourItem>[] = [
    { key: 'id', header: 'Kontur ID', sortable: true, width: '100px' },
    { key: 'name', header: 'Nomi va Qatlami', sortable: true },
    { key: 'leskhoz', header: 'Oʻrmon xoʻjaligi', sortable: true },
    { key: 'areaHa', header: 'Maydon (ga)', sortable: true, width: '110px' },
    {
      key: 'maxSB',
      header: 'Sigʻim (MaxSB / Ishlatilgan)',
      sortable: true,
      width: '180px',
      accessor: (row) => (
        <span className="font-mono text-xs">
          <b>{row.currentSB}</b> / {row.maxSB} bosh
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Holati',
      sortable: true,
      width: '160px',
      accessor: (row) => (
        <button
          type="button"
          onClick={() => canEditContours && handleOpenStatusModal(row)}
          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all hover:scale-105 flex items-center gap-1.5 cursor-pointer ${STATUS_STYLES[row.status]}`}
          title={canEditContours ? 'Hayotiy sikl holatini oʻzgartirish uchun bosing' : undefined}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          <span>{STATUS_LABELS[row.status]}</span>
        </button>
      ),
    },
    {
      key: 'id',
      header: 'Amallar',
      width: '210px',
      accessor: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setContourCard(row)}
            className="text-[11px] font-bold text-[#2E7D4F] hover:underline cursor-pointer"
          >
            Maʼlumot
          </button>
          {canEditContours && (
            <>
              <span className="text-gray-300">|</span>
              <button
                onClick={() => handleOpenEditModal(row)}
                className="text-[11px] font-bold text-[#0369A1] hover:underline flex items-center gap-0.5 cursor-pointer"
              >
                <Edit3 className="w-3 h-3" /> Tahrir
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={() => handleOpenStatusModal(row)}
                className="text-[11px] font-bold text-[#B45309] hover:underline flex items-center gap-0.5 cursor-pointer"
              >
                <History className="w-3 h-3" /> Bosqich
              </button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 font-sans pb-16">
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

      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E4E7EA] pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#2E7D4F] bg-[#F0F7F1] px-2.5 py-1 rounded border border-[#D9EBDC]">
            {isMonitoringView ? 'RESPUBLIKA GIS MONITORINGI' : 'GIS Subtizimi (Phase 3)'}
          </span>
          <h1 className="text-lg md:text-xl font-bold text-[#1A1F24] mt-1.5">
            {isMonitoringView ? 'Respublika GIS Monitoring Xaritasi' : 'GIS Xarita Muharriri va Konturlar Muhiti'}
          </h1>
          <p className="text-xs text-[#5A646D] mt-0.5">
            {isMonitoringView
              ? 'Oʻrmon fondi konturlari bandligi (occupancy), 13 ta GIS qatlami va respublika boʻyicha yer uchastkalari monitoringi'
              : 'Oʻrmon zonasi poligonlarini chizish, 13 ta GIS qatlamini boshqarish va topologik konfliktlarni tahlil qilish'}
          </p>
        </div>

        <div className="flex flex-wrap lg:flex-nowrap items-center gap-2 shrink-0">
          {isMonitoringView ? (
            <>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="h-9 px-3 text-xs bg-[#F8F9FA] border border-[#767F87] rounded-lg text-[#1A1F24] font-medium focus:ring-2 focus:ring-[#2E7D4F] focus:outline-none shrink-0"
              >
                <option value="all">Respublika (14 viloyat)</option>
                <option value="tashkent">Toshkent v. (Boʻstonliq DЎX)</option>
                <option value="kashkadarya">Qashqadaryo v. (Kitob DЎX)</option>
                <option value="jizzakh">Jizzax v. (Zomin DЎX)</option>
                <option value="namangan">Namangan v. (Pop DЎX)</option>
                <option value="samarkand">Samarqand v. (Oqdaryo DЎX)</option>
              </select>

              <Button
                variant="primary"
                size="sm"
                leftIcon={<Printer className="w-4 h-4" />}
                onClick={() => alert('Xarita PDF va PNG formatlarida eksportga tayyorlandi.')}
                className="bg-[#2E7D4F] hover:bg-[#23653F] text-white font-bold text-xs h-9 cursor-pointer shadow-xs whitespace-nowrap shrink-0"
              >
                Xaritani eksport (PDF/PNG)
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Upload className="w-4 h-4" />}
                onClick={() => onNavigate?.('gis_import')}
              >
                Fayl Import (GeoJSON/SHP)
              </Button>
              <Button
                variant="primary"
                size="sm"
                leftIcon={<Plus className="w-4 h-4" />}
                onClick={handleOpenCreateModal}
                className="bg-[#2E7D4F] hover:bg-[#23653F] text-white font-bold text-xs h-9 shadow-xs cursor-pointer"
              >
                Yangi Kontur Kiritish
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Main Interactive Map Section */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[550px]">
        {/* Left Toolbar & Layers Selector */}
        <div className="lg:col-span-3 border-r border-[#E4E7EA] p-4 space-y-6 bg-[#F8F9FA]">
          {/* Drawing & Navigation Tools */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#767F87] block">
              {isMonitoringView ? 'Monitoring Asboblari (Read-Only)' : 'Xarita Asboblari'}
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setActiveTool('select')}
                className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                  activeTool === 'select'
                    ? 'bg-[#2E7D4F] text-white border-[#2E7D4F]'
                    : 'bg-white text-[#1A1F24] border-[#E4E7EA] hover:bg-gray-50'
                }`}
              >
                <Compass className="w-4 h-4" /> Tanlash
              </button>

              <button
                type="button"
                onClick={() => setActiveTool('measure')}
                className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                  activeTool === 'measure'
                    ? 'bg-[#2E7D4F] text-white border-[#2E7D4F]'
                    : 'bg-white text-[#1A1F24] border-[#E4E7EA] hover:bg-gray-50'
                }`}
              >
                <Ruler className="w-4 h-4" /> Masofa
              </button>

              {isMonitoringView ? (
                <>
                  <button
                    type="button"
                    onClick={() => alert('Maydon va kontur oʻlchami tahlil qilindi!')}
                    className="p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-colors bg-white text-[#1A1F24] border-[#E4E7EA] hover:bg-gray-50 cursor-pointer"
                  >
                    <Square className="w-4 h-4" /> Maydon
                  </button>
                  <button
                    type="button"
                    onClick={() => alert('Xarita kadri toʻliq ekranga moslashtirildi!')}
                    className="p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-colors bg-white text-[#1A1F24] border-[#E4E7EA] hover:bg-gray-50 cursor-pointer"
                  >
                    <Maximize2 className="w-4 h-4" /> Zoom Kadr
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTool('polygon');
                      handleOpenCreateModal();
                    }}
                    className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                      activeTool === 'polygon'
                        ? 'bg-[#2E7D4F] text-white border-[#2E7D4F]'
                        : 'bg-white text-[#1A1F24] border-[#E4E7EA] hover:bg-gray-50'
                    }`}
                  >
                    <Square className="w-4 h-4" /> Poligon
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTool('vertex');
                      if (contoursList.length > 0) {
                        handleOpenEditModal(contoursList[0]);
                      }
                    }}
                    className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                      activeTool === 'vertex'
                        ? 'bg-[#2E7D4F] text-white border-[#2E7D4F]'
                        : 'bg-white text-[#1A1F24] border-[#E4E7EA] hover:bg-gray-50'
                    }`}
                  >
                    <Edit3 className="w-4 h-4" /> Tahrir
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Base map, coordinate system and layer transparency — TZ module 10.2 */}
          <div className="space-y-3 pb-4 border-b border-[#E4E7EA]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#767F87]">Xarita sozlamalari</span>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-[#5A646D]">Asosiy xarita:</label>
              <div className="bg-[#F8F9FA] p-1 border border-[#E4E7EA] rounded-xl flex items-center gap-1 text-xs font-bold">
                <button
                  onClick={() => setBaseMap('osm')}
                  className={`flex-1 px-2 py-1.5 rounded-lg transition-colors ${
                    baseMap === 'osm' ? 'bg-white shadow-xs text-[#2E7D4F]' : 'text-[#5A646D]'
                  }`}
                >
                  OSM
                </button>
                <button
                  onClick={() => setBaseMap('satellite')}
                  className={`flex-1 px-2 py-1.5 rounded-lg transition-colors ${
                    baseMap === 'satellite' ? 'bg-white shadow-xs text-[#2E7D4F]' : 'text-[#5A646D]'
                  }`}
                >
                  Sputnik
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-[#5A646D]">Koordinata tizimi (SRID):</label>
              <select
                value={srid}
                onChange={(e) => setSrid(e.target.value)}
                className="w-full bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-xs font-semibold px-3 py-2 text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
              >
                <option value="4326">EPSG:4326 — WGS 84</option>
                <option value="3857">EPSG:3857 — Web Mercator</option>
                <option value="32642">EPSG:32642 — UTM 42N</option>
                <option value="32641">EPSG:32641 — UTM 41N</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-[#5A646D] flex items-center justify-between">
                <span>Qatlam shaffofligi:</span>
                <span className="font-mono text-[#1A1F24]">{layerOpacity}%</span>
              </label>
              <input
                type="range"
                min={20}
                max={100}
                step={5}
                value={layerOpacity}
                onChange={(e) => setLayerOpacity(Number(e.target.value))}
                className="w-full accent-[#2E7D4F]"
              />
            </div>
          </div>

          {/* GIS Layers Switcher List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#767F87]">
                GIS qatlamlar ({gisLayers.length} ta)
              </span>
              <Layers className="w-4 h-4 text-[#2E7D4F]" />
            </div>

            <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
              {gisLayers.map((l) => (
                <label
                  key={l.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-white border border-[#E4E7EA] text-xs cursor-pointer hover:border-[#7FB98A]"
                >
                  <div className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked={l.visible} className="accent-[#2E7D4F]" />
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: l.color }} />
                    <span className="font-semibold text-[#1A1F24]">{l.name}</span>
                  </div>
                  <span className="font-mono text-[11px] text-[#767F87]">{l.count}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Coordinate Projection System */}
          <div className="pt-2 border-t border-[#E4E7EA] space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#767F87] block">Koordinatalar Tizimi</span>
            <Select
              options={[
                { value: 'epsg4326', label: 'EPSG:4326 - WGS 84 (Gradus)' },
                { value: 'epsg3857', label: 'EPSG:3857 - Web Mercator (Metr)' },
              ]}
              touchSize
            />
          </div>
        </div>

        {/* Right Canvas Map Simulation */}
        <div className="lg:col-span-9 relative bg-[#E5E9EC] flex flex-col justify-between p-6 overflow-hidden">
          {/* Top Canvas Controls Bar */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 bg-white/90 backdrop-blur-md p-3 rounded-xl border border-white/40 shadow-xs text-xs">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded bg-[#2E7D4F] text-white font-bold text-[11px]">MODE: {activeTool.toUpperCase()}</span>
              <span className="text-[#5A646D] hidden sm:inline">Markaz: 41.6028° N, 70.0245° E (Burchmulla)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#15803D] font-bold bg-[#F0F7F1] px-2 py-1 rounded border border-[#D9EBDC]">
                Topologiya: 0% Kesishuv (Valid)
              </span>
              {canEditContours && (
                <button
                  onClick={handleOpenCreateModal}
                  className="px-2.5 py-1 bg-[#2E7D4F] text-white rounded-lg font-bold hover:bg-[#23653F] transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Kontur Saqlash
                </button>
              )}
            </div>
          </div>

          {/* Simulated Map Canvas Graphics */}
          <div className="my-auto py-12 flex flex-col items-center justify-center relative">
            {/* Vector Polygon Visual Simulations */}
            <div className="relative w-full max-w-lg h-72 border-2 border-dashed border-[#2E7D4F] bg-[#2E7D4F]/15 rounded-3xl p-6 flex flex-col justify-between shadow-inner animate-pulse">
              <div className="flex justify-between items-start">
                <span className="bg-[#2E7D4F] text-white font-mono font-bold text-xs px-2 py-1 rounded shadow-xs">
                  {contoursList[0]?.id || 'K-042'} ({contoursList[0]?.areaHa || 450} ga)
                </span>
                <span className="bg-white text-[#123522] font-mono text-xs px-2 py-1 rounded border border-[#E4E7EA] font-semibold">
                  {contoursList[0]?.layer || 'Yaylov Zonasi'}
                </span>
              </div>

              <div className="text-center space-y-1 bg-white/80 backdrop-blur-md p-3 rounded-xl border border-white/60 max-w-xs mx-auto">
                <div className="text-xs font-bold text-[#1A1F24]">Geobotanik Normalar (MaxSB)</div>
                <div className="text-sm font-mono font-bold text-[#2E7D4F]">{contoursList[0]?.maxSB || 500} Bosh Usta Birlik</div>
                <div className="text-[11px] text-[#5A646D]">
                  Erkin sigʻim qoldigʻi: {(contoursList[0]?.maxSB || 500) - (contoursList[0]?.currentSB || 120)} bosh
                </div>
              </div>

              <div className="flex justify-between text-[11px] font-mono text-[#5A646D] bg-white/60 p-2 rounded-lg">
                <span>N: 41.6028°</span>
                <span>E: 70.0245°</span>
                <span>Perimetr: 8.4 km</span>
              </div>
            </div>
          </div>

          {/* Bottom Coordinates & Scale Bar */}
          <div className="relative z-10 flex items-center justify-between text-xs text-[#5A646D] bg-white/90 backdrop-blur-md p-2.5 rounded-xl border border-white/40 shadow-xs font-mono">
            <div>Masshtab: 1 : 10,000 | Z-Index: 12</div>
            <div>Oʻrmon Xoʻjaligi Davlat Cadastre Sync: FAOL</div>
          </div>
        </div>
      </div>

      {/* Contours Lifecycle Registry Table */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-[#1A1F24]">Oʻrmon Konturlari Hayotiy Sikli Reestri</h2>
            <p className="text-xs text-[#5A646D]">Draft → Review → Approved → Published → Archived statustagi konturlar</p>
          </div>
          {canEditContours && (
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={handleOpenCreateModal}
              className="bg-[#2E7D4F] hover:bg-[#23653F] text-white font-bold text-xs h-9 cursor-pointer"
            >
              Yangi Kontur Kiritish
            </Button>
          )}
        </div>

        <DataTable columns={columns} data={contoursList} selectable />
      </div>

      {/* Contour Information Card Modal */}
      <Modal
        isOpen={!!contourCard}
        onClose={() => setContourCard(null)}
        title={contourCard ? `${contourCard.id} — ${contourCard.name}` : ''}
        subtitle={contourCard?.leskhoz}
        maxWidth="lg"
        footer={
          <div className="flex items-center justify-between w-full gap-2">
            <span className="text-xs text-[#5A646D]">
              Holati:{' '}
              {contourCard && (
                <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${STATUS_STYLES[contourCard.status]}`}>
                  {STATUS_LABELS[contourCard.status]}
                </span>
              )}
            </span>
            <div className="flex items-center gap-2">
              {canEditContours && contourCard && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<History className="w-4 h-4" />}
                    onClick={() => {
                      const c = contourCard;
                      setContourCard(null);
                      handleOpenStatusModal(c);
                    }}
                    className="border-[#B45309] text-[#B45309] hover:bg-[#FFFBEB]"
                  >
                    Holatni Oʻzgartirish
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<Edit3 className="w-4 h-4" />}
                    onClick={() => {
                      const c = contourCard;
                      setContourCard(null);
                      handleOpenEditModal(c);
                    }}
                  >
                    Tahrirlash
                  </Button>
                </>
              )}
              <Button variant="primary" size="sm" onClick={() => setContourCard(null)}>
                Yopish
              </Button>
            </div>
          </div>
        }
      >
        {contourCard && (
          <div className="space-y-4 py-1 text-xs">
            <div className="p-3 bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl grid grid-cols-2 gap-2 text-[#5A646D]">
              <div>Qatlam: <b className="text-[#1A1F24]">{contourCard.layer}</b></div>
              <div>Boʻlim/Kvartal: <b className="text-[#1A1F24]">{contourCard.section || '14-kvartal'}</b></div>
              <div>Maydon: <b className="text-[#1A1F24] font-mono">{contourCard.areaHa} ga</b></div>
              <div>Sigʻim (MaxSB): <b className="text-[#1A1F24] font-mono">{contourCard.maxSB} bosh</b></div>
              <div>Band qilingan: <b className="text-[#2E7D4F] font-mono">{contourCard.currentSB} bosh</b></div>
              <div>Erkin qoldiq: <b className="text-[#0369A1] font-mono">{contourCard.maxSB - contourCard.currentSB} bosh</b></div>
            </div>

            {/* Version attributes the TZ names explicitly */}
            <div className="space-y-2">
              <span className="font-bold text-[#1A1F24] block">Versiya atributlari:</span>
              <div className="border border-[#E4E7EA] rounded-xl divide-y divide-[#E4E7EA]">
                {[
                  ['Manba (source)', contourCard.source],
                  ['Aniqlik (accuracy)', contourCard.accuracy],
                  ['Oʻlchov sanasi (survey_date)', contourCard.surveyDate],
                  ['Amal qilish boshlanishi (effective_from)', contourCard.effectiveFrom],
                  ['Amal qilish tugashi (effective_to)', contourCard.effectiveTo],
                  ['Tasdiqlovchi hujjat (approval_doc_id)', contourCard.approvalDocId],
                ].map(([label, value]) => (
                  <div key={label} className="p-2.5 flex items-center justify-between gap-3">
                    <span className="text-[#5A646D]">{label}</span>
                    <b className="text-[#1A1F24] font-mono text-right">{value}</b>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 bg-[#F0F7F1] border border-[#D9EBDC] rounded-xl text-[#2E7D4F]">
              Kontur hayot sikli: Qoralama → Koʻrib chiqishda → Tasdiqlangan → Eʼlon qilingan → Arxivlangan.
              Ariza faqat <b>eʼlon qilingan (published)</b> konturga topshiriladi.
            </div>
          </div>
        )}
      </Modal>

      {/* Contour Form Modal (Create / Edit) */}
      <ContourFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSave={handleSaveContour}
        initialData={selectedContourForEdit}
        mode={formModalMode}
      />

      {/* Contour Status Lifecycle Transition Modal */}
      <ContourStatusModal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        onConfirm={handleConfirmStatusChange}
        contour={selectedContourForStatus}
      />
    </div>
  );
};
