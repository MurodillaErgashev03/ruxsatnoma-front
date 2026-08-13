import React, { useState } from 'react';
import {
  Sliders,
  Plus,
  Search,
  RefreshCw,
  CheckCircle2,
  Archive,
  ChevronRight,
  Database,
  Layers,
  X,
  SlidersHorizontal,
  Download,
  Upload,
  Info,
  History,
  Edit,
  Check,
} from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { hasRight } from '../../../lib/permissions';
import { Input } from '../../../components/ui/FormControls';
import { Modal } from '../../../components/ui/Overlay';

interface ClassifierRecord {
  id: string;
  code: string;
  name: string;
  source: string;
  provider: string;
  itemsCount: number;
  version: string;
  validFrom: string;
  validTo: string;
  status: string;
  lastSynced: string;
  sampleItems: string[];
}

export interface AdminClassifiersPageProps {
  onNavigate?: (page: string, params?: any) => void;
  userRole?: string;
}

export const AdminClassifiersPage: React.FC<AdminClassifiersPageProps> = ({ userRole = '' }) => {
  /**
   * TZ appendix 4: classifiers are К for everyone except the system
   * administrator, who alone holds Я and Ў.
   */
  const canEdit = hasRight(userRole, 'classifiers', 'edit');
  const isCentralAdmin = !canEdit;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSourceFilter, setSelectedSourceFilter] = useState('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');
  const [detailClassifier, setDetailClassifier] = useState<ClassifierRecord | null>(null);
  const [classifierToArchive, setClassifierToArchive] = useState<ClassifierRecord | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  // Editing an existing classifier — TZ 4.2.1.4 (create, edit, version, set validity period).
  const [classifierToEdit, setClassifierToEdit] = useState<ClassifierRecord | null>(null);
  const [editName, setEditName] = useState('');
  const [editSource, setEditSource] = useState('');
  const [editProvider, setEditProvider] = useState('');
  const [editVersion, setEditVersion] = useState('');
  const [editValidFrom, setEditValidFrom] = useState('');
  const [editValidTo, setEditValidTo] = useState('');
  const [bumpVersion, setBumpVersion] = useState(false);

  // Element-level editing inside a classifier — TZ 4.2.1.4.
  const [newElementValue, setNewElementValue] = useState('');
  const [editingElementIndex, setEditingElementIndex] = useState<number | null>(null);
  const [editingElementValue, setEditingElementValue] = useState('');

  const openEditModal = (c: ClassifierRecord) => {
    setClassifierToEdit(c);
    setEditName(c.name);
    setEditSource(c.source);
    setEditProvider(c.provider);
    setEditVersion(c.version);
    setEditValidFrom(c.validFrom);
    setEditValidTo(c.validTo);
    setBumpVersion(false);
  };

  /** Raises the trailing number of a semantic version string, e.g. v2.4 -> v2.5. */
  const nextVersion = (version: string) => {
    const match = version.match(/^(.*?)(\d+)$/);
    if (!match) return version;
    return `${match[1]}${Number(match[2]) + 1}`;
  };

  const handleSaveClassifier = () => {
    if (!classifierToEdit || !editName.trim()) return;
    setClassifiersList((prev) =>
      prev.map((c) =>
        c.id === classifierToEdit.id
          ? {
              ...c,
              name: editName.trim(),
              source: editSource,
              provider: editProvider,
              version: bumpVersion ? nextVersion(editVersion) : editVersion,
              validFrom: editValidFrom,
              validTo: editValidTo,
            }
          : c
      )
    );
    setClassifierToEdit(null);
  };

  /** Adds an element and keeps the displayed total in step with it. */
  const handleAddElement = () => {
    if (!detailClassifier || !newElementValue.trim()) return;
    const value = newElementValue.trim();
    setClassifiersList((prev) =>
      prev.map((c) =>
        c.id === detailClassifier.id
          ? { ...c, sampleItems: [...c.sampleItems, value], itemsCount: c.itemsCount + 1 }
          : c
      )
    );
    setDetailClassifier((prev) =>
      prev ? { ...prev, sampleItems: [...prev.sampleItems, value], itemsCount: prev.itemsCount + 1 } : prev
    );
    setNewElementValue('');
  };

  const handleSaveElement = () => {
    if (!detailClassifier || editingElementIndex === null || !editingElementValue.trim()) return;
    const value = editingElementValue.trim();
    const apply = (items: string[]) => items.map((it, i) => (i === editingElementIndex ? value : it));
    setClassifiersList((prev) =>
      prev.map((c) => (c.id === detailClassifier.id ? { ...c, sampleItems: apply(c.sampleItems) } : c))
    );
    setDetailClassifier((prev) => (prev ? { ...prev, sampleItems: apply(prev.sampleItems) } : prev));
    setEditingElementIndex(null);
    setEditingElementValue('');
  };

  /**
   * TZ 4.2.1.4: an element used by live records is archived rather than deleted,
   * so removal only takes it out of the selectable list and lowers the active count.
   */
  const handleArchiveElement = (index: number) => {
    if (!detailClassifier) return;
    const apply = (items: string[]) => items.filter((_, i) => i !== index);
    setClassifiersList((prev) =>
      prev.map((c) =>
        c.id === detailClassifier.id
          ? { ...c, sampleItems: apply(c.sampleItems), itemsCount: Math.max(0, c.itemsCount - 1) }
          : c
      )
    );
    setDetailClassifier((prev) =>
      prev
        ? { ...prev, sampleItems: apply(prev.sampleItems), itemsCount: Math.max(0, prev.itemsCount - 1) }
        : prev
    );
  };

  // 14 Classifiers from TZ 14-errors-classifiers.md (p. 4.1.10)
  const [classifiersList, setClassifiersList] = useState<ClassifierRecord[]>([
    {
      id: 'CL-01',
      code: 'livestock_types',
      name: 'Chorva mollari turlari va yosh guruhlari',
      source: 'VMQ 689-son 5-ilova',
      provider: 'Tizim reyestri / Moliya',
      itemsCount: 14,
      version: 'v2.4',
      validFrom: '01.01.2024',
      validTo: '—',
      status: 'active',
      lastSynced: 'Bugun 10:15',
      sampleItems: ['Qoramol (K=1.0 BHM)', 'Qoʻy va Echkilar (K=0.2 BHM)', 'Ot va Tuyalar (K=1.2 BHM)', 'Parrandalar (K=0.05 BHM)'],
    },
    {
      id: 'CL-02',
      code: 'forest_activity_types',
      name: 'Oʻrmon Kodeksi boʻyicha faoliyat turlari (6 ta)',
      source: 'Oʻrmon Kodeksi & VMQ 278-son',
      provider: 'Davlat Oʻrmon Agentligi',
      itemsCount: 6,
      version: 'v3.0',
      validFrom: '01.03.2025',
      validTo: '—',
      status: 'active',
      lastSynced: 'Kechagi 14:20',
      sampleItems: ['Chorva boqish', 'Pichan oʻrish', 'Asalarichilik', 'Dorivor oʻsimliklar yigʻish', 'Rekreatsiya va Turizm', 'Oʻsimlik xomashyosi'],
    },
    {
      id: 'CL-03',
      code: 'soato_regions',
      name: 'Viloyatlar va Qoraqalpogʻiston Respublikasi (SOATO 1)',
      source: 'cs.egov.uz',
      provider: 'Statistika Agentligi',
      itemsCount: 14,
      version: 'v2026.1',
      validFrom: '01.01.2026',
      validTo: '—',
      status: 'active',
      lastSynced: 'Bugun 09:00',
      sampleItems: ['Toshkent v. (1726)', 'Samarqand v. (1718)', 'Fargʻona v. (1730)', 'Surxondaryo v. (1722)'],
    },
    {
      id: 'CL-04',
      code: 'soato_districts',
      name: 'Tumanlar va shaharlar klassifikatori (SOATO 2)',
      source: 'cs.egov.uz',
      provider: 'Statistika Agentligi',
      itemsCount: 208,
      version: 'v2026.1',
      validFrom: '01.01.2026',
      validTo: '—',
      status: 'active',
      lastSynced: 'Bugun 09:00',
      sampleItems: ['Boʻstonliq t. (1726208)', 'Parkent t. (1726220)', 'Urgut t. (1718234)', 'Boysun t. (1722204)'],
    },
    {
      id: 'CL-05',
      code: 'leskhoz_registry',
      name: 'Davlat oʻrmon xoʻjaliklari nomi va kodlari (84 ta DЎX)',
      source: 'Tizim reyestri',
      provider: 'Oʻrmon loyiha instituti',
      itemsCount: 84,
      version: 'v4.2',
      validFrom: '15.02.2025',
      validTo: '—',
      status: 'active',
      lastSynced: 'Bugun 11:30',
      sampleItems: ['Boʻstonliq DЎX (ORG-TSH-BOS)', 'Burchmulla DЎX (ORG-TSH-BUR)', 'Zarafshon DЎX (ORG-SAM-ZAR)'],
    },
    {
      id: 'CL-06',
      code: 'forest_divisions',
      name: 'Oʻrmon boʻlimlari, obxodlar va kvartallar',
      source: 'GIS Tizim reyestri',
      provider: 'Oʻrmon loyiha / Geodeziya',
      itemsCount: 420,
      version: 'v1.9',
      validFrom: '01.06.2025',
      validTo: '—',
      status: 'active',
      lastSynced: 'Kechagi 16:45',
      sampleItems: ['1-Oʻrmon boʻlimi (Chorvoq)', '2-Oʻrmon boʻlimi (Burchmulla)', '3-Oʻrmon boʻlimi (Parkent)'],
    },
    {
      id: 'CL-07',
      code: 'gis_layers_srid',
      name: 'GIS qatlamlari va SRID koordinata tizimlari katalogi',
      source: 'EPSG:4326 / WGS-84',
      provider: 'GIS Geoserver Engine',
      itemsCount: 13,
      version: 'v2.0',
      validFrom: '01.01.2025',
      validTo: '—',
      status: 'active',
      lastSynced: 'Bugun 08:30',
      sampleItems: ['Oʻrmon chegara qatlami (SRID 4326)', 'Yaylov konturlari qatlami', 'Suv muhofaza zonalari qatlami'],
    },
    {
      id: 'CL-08',
      code: 'document_types',
      name: 'Hujjatlar va ruxsatnomalar turlari katalogi',
      source: 'Tizim reyestri',
      provider: 'Oʻrmon Agentligi Legal',
      itemsCount: 18,
      version: 'v1.5',
      validFrom: '01.09.2024',
      validTo: '—',
      status: 'active',
      lastSynced: '10 Avgust 2026',
      sampleItems: ['Elektron Ruxsatnoma (PDF/A)', 'Dala Tekshiruv Akti (PWA)', 'Toʻlov Billing Invoysi'],
    },
    {
      id: 'CL-09',
      code: 'rejection_reasons',
      name: 'Rad etish va qaytarish sabablari (8.2-ilova)',
      source: 'VMQ 278-son 8.2-ilova',
      provider: 'Adliya Vazirligi',
      itemsCount: 12,
      version: 'v1.0',
      validFrom: '01.01.2026',
      validTo: '31.12.2026',
      status: 'active',
      lastSynced: '05 Avgust 2026',
      sampleItems: ['Notoʻgʻri geobotanik kontur', 'Nisbiy meʼyordan ortiq chorva soni', 'E-IMZO imzo mos kelmasligi'],
    },
    {
      id: 'CL-10',
      code: 'violation_types',
      name: 'Qoidabuzarlik va huquqbuzarlik turlari',
      source: 'Oʻrmon Inspeksiyasi',
      provider: 'Bosh Prokuratura 11-tarmoq',
      itemsCount: 16,
      version: 'v2.1',
      validFrom: '01.04.2025',
      validTo: '—',
      status: 'active',
      lastSynced: '01 Avgust 2026',
      sampleItems: ['Ruxsatnomasiz chorva boqish', 'Belgilangan kontur chegarasidan chiqish', 'Noqonuniy pichan oʻrish'],
    },
    {
      id: 'CL-11',
      code: 'privilege_categories',
      name: 'Imtiyozli kategoriyalar va tasdiqlovchi hujjatlar',
      source: 'VMQ 278-son 9-11 moddalar',
      provider: 'Ijtimoiy Himoya Agentligi',
      itemsCount: 8,
      version: 'v1.3',
      validFrom: '01.01.2025',
      validTo: '—',
      status: 'active',
      lastSynced: 'Bugun 12:10',
      sampleItems: ['Nogironligi boʻlgan shaxslar (50% imtiyoz)', 'Urush qatnashchilari va faxriylar', 'Kam taʼminlangan oilalar'],
    },
    {
      id: 'CL-12',
      code: 'legal_entities_db',
      name: 'Yuridik shaxslar yagona davlat reyestri (STIR)',
      source: 'Soliq Qoʻmitasi API',
      provider: 'cs.egov.uz Soliq API',
      itemsCount: 8500,
      version: 'Real-time',
      validFrom: '01.01.2024',
      validTo: '—',
      status: 'active',
      lastSynced: 'Bugun 13:00',
      sampleItems: ['MCHJlar reyestri', 'Fermer xoʻjaliklari reyestri', 'AJ va DUKlar reyestri'],
    },
    {
      id: 'CL-13',
      code: 'country_codes_iso',
      name: 'Mamlakatlar klassifikatori (ISO-3166-1)',
      source: 'ISO-3166-1',
      provider: 'cs.egov.uz Standard',
      itemsCount: 249,
      version: 'v2026.0',
      validFrom: '01.01.2024',
      validTo: '—',
      status: 'active',
      lastSynced: '15 Iyun 2026',
      sampleItems: ['Oʻzbekiston (UZB / 860)', 'Qozogʻiston (KAZ / 398)', 'Qirgʻiziston (KGZ / 417)'],
    },
    {
      id: 'CL-14',
      code: 'risk_indicators',
      name: 'Risk-indikatorlar va xavf darajalari katalogi',
      source: 'Raqamli Nazorat 6.2-ilova',
      provider: 'Bosh Prokuratura Portali',
      itemsCount: 15,
      version: 'v3.1',
      validFrom: '01.02.2026',
      validTo: '—',
      status: 'active',
      lastSynced: 'Bugun 11:00',
      sampleItems: ['Yuqori xavf (Qizil): Bir necha bor qoidabuzarlik', 'Oʻrta xavf (Sariq): Toʻlov kechikishi', 'Past xavf (Yashil): Namunali foydalanuvchi'],
    },
  ]);

  // Filtered Classifiers
  const filteredClassifiers = classifiersList.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.provider.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSource = selectedSourceFilter === 'all' || c.source.toLowerCase().includes(selectedSourceFilter.toLowerCase());
    const matchesStatus = selectedStatusFilter === 'all' || c.status === selectedStatusFilter;

    return matchesSearch && matchesSource && matchesStatus;
  });

  const toggleArchiveStatus = (id: string) => {
    setClassifiersList(
      classifiersList.map((c) =>
        c.id === id ? { ...c, status: c.status === 'active' ? 'archived' : 'active' } : c
      )
    );
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Header Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E4E7EA] p-5 rounded-2xl shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#5A646D] uppercase tracking-wider block">Jami klassifikatorlar</span>
            <div className="text-xl font-bold text-[#1A1F24]">14 ta klassifikator</div>
            <span className="text-xs text-[#15803D] font-medium flex items-center gap-1 mt-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> TZ 4.1.10 boʻyicha toʻliq qamrov
            </span>
          </div>
          <div className="p-3 bg-[#F0F7F1] rounded-xl text-[#2E7D4F]">
            <Sliders className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white border border-[#E4E7EA] p-5 rounded-2xl shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#5A646D] uppercase tracking-wider block">cs.egov.uz sinxronizatsiyasi</span>
            <div className="text-xl font-bold text-[#1A1F24]">Real-vaqt</div>
            <span className="text-xs text-[#15803D] font-medium flex items-center gap-1 mt-1">
              <RefreshCw className="w-3.5 h-3.5" /> Integratsiyalangan
            </span>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Database className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white border border-[#E4E7EA] p-5 rounded-2xl shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#5A646D] uppercase tracking-wider block">Jami elementlar</span>
            <div className="text-xl font-bold text-[#1A1F24]">9,850+ ta</div>
            <span className="text-xs text-[#5A646D] font-medium block mt-1">Maʼlumotnoma yozuvlari</span>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <Layers className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white border border-[#E4E7EA] p-5 rounded-2xl shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#5A646D] uppercase tracking-wider block">Oʻchirish qoidasi</span>
            <div className="text-xl font-bold text-[#1A1F24]">Arxivlash</div>
            <span className="text-xs text-[#15803D] font-medium block mt-1">Amaldagi yozuvda ishlatilsa — arxivga</span>
          </div>
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <Archive className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#2E7D4F] bg-[#F0F7F1] px-3 py-1 rounded-full border border-[#D9EBDC]">
            Klassifikatorlar moduli (4.2.1.4)
          </span>
          <h1 className="text-lg font-bold text-[#1A1F24] mt-1.5">Davlat Klassifikatorlari va Maʼlumotnomalari</h1>
          <p className="text-xs text-[#5A646D] mt-0.5">
            Oʻrmon kodeksi, geobotanik normalar, BHM koeffitsientlari, SOATO kodlari va cs.egov.uz yagona reyestri
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {isCentralAdmin ? (
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Download className="w-4 h-4 text-[#15803D]" />}
              onClick={() => alert('14 ta klassifikator Excel formatida tayyorlanmoqda.')}
              className="border-[#767F87] text-[#1A1F24] hover:bg-[#F8F9FA] font-bold text-xs h-9 cursor-pointer"
            >
              Excelga eksport
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Upload className="w-4 h-4" />}
                onClick={() => setIsImportModalOpen(true)}
              >
                Import / eksport
              </Button>
              <Button
                variant="outline"
                size="sm"
                leftIcon={<RefreshCw className="w-4 h-4" />}
                onClick={() => alert('cs.egov.uz reyestri bilan sinxronlash boshlandi.')}
              >
                cs.egov.uz bilan sinxronlash
              </Button>
              <Button
                variant="primary"
                size="sm"
                leftIcon={<Plus className="w-4 h-4" />}
                onClick={() => setIsAddModalOpen(true)}
                className="bg-[#2E7D4F] hover:bg-[#23653F] font-bold"
              >
                Klassifikator qoʻshish
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Search & Source Filter Bar */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="w-full md:w-96 relative">
          <Input
            placeholder="Klassifikator nomi, kodi yoki manbasi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
            touchSize
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#5A646D]" />
            <span className="text-xs font-semibold text-[#5A646D]">Manba:</span>
            <select
              value={selectedSourceFilter}
              onChange={(e) => setSelectedSourceFilter(e.target.value)}
              className="bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-xs font-semibold px-3 py-2 text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
            >
              <option value="all">Barcha manbalar</option>
              <option value="egov">cs.egov.uz</option>
              <option value="vmq">VMQ 689 / 278-son</option>
              <option value="iso">ISO-3166-1</option>
              <option value="tizim">Tizim reyestri</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#5A646D]">Status:</span>
            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              className="bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-xs font-semibold px-3 py-2 text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
            >
              <option value="all">Barcha statuslar</option>
              <option value="active">Faol</option>
              <option value="archived">Arxivlangan</option>
            </select>
          </div>
        </div>
      </div>

      {/* 14 Classifiers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredClassifiers.map((c) => (
          <div
            key={c.id}
            className={`bg-white border p-6 rounded-2xl shadow-xs space-y-4 transition-all ${
              c.status === 'archived' ? 'opacity-60 bg-gray-50 border-gray-200' : 'border-[#E4E7EA] hover:border-[#7FB98A]'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#2E7D4F] bg-[#F0F7F1] px-2.5 py-0.5 rounded-md border border-[#D9EBDC]">
                    {c.id}
                  </span>
                  <span className="text-[11px] font-mono text-[#767F87]">code: {c.code}</span>
                </div>
                <h3 className="font-extrabold text-base text-[#1A1F24] mt-1">{c.name}</h3>
              </div>

              {c.status === 'active' ? (
                <span className="text-[10px] font-bold text-[#15803D] bg-[#F0F7F1] px-2.5 py-1 rounded-full border border-[#D9EBDC] shrink-0">
                  Faol
                </span>
              ) : (
                <span className="text-[10px] font-bold text-gray-600 bg-gray-200 px-2.5 py-1 rounded-full border border-gray-300 shrink-0">
                  Arxivlangan
                </span>
              )}
            </div>

            {/* Provider & Source info */}
            <div className="p-3 bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-xs space-y-1.5 font-mono text-[#5A646D]">
              <div className="flex justify-between">
                <span>Manba (Hujjat):</span>
                <b className="text-[#1A1F24]">{c.source}</b>
              </div>
              <div className="flex justify-between">
                <span>Provayder:</span>
                <b className="text-[#2E7D4F]">{c.provider}</b>
              </div>
              <div className="flex justify-between">
                <span>Elementlar soni:</span>
                <b className="text-[#1A1F24]">{c.itemsCount} ta maʼlumotnoma</b>
              </div>
              {/* TZ 4.2.1.4: every classifier carries a validity period */}
              <div className="flex justify-between">
                <span>Amal qilish davri:</span>
                <b className="text-[#1A1F24]">
                  {c.validFrom} — {c.validTo === '—' ? 'muddatsiz' : c.validTo}
                </b>
              </div>
            </div>

            {/* Sample Items Chips */}
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-[#767F87] block">Namunaviy qiymatlar:</span>
              <div className="flex flex-wrap gap-1.5">
                {c.sampleItems.map((item, idx) => (
                  <span key={idx} className="text-[11px] bg-gray-100 text-gray-700 px-2.5 py-0.5 rounded-md font-medium">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Action Bar */}
            <div className="pt-3 border-t border-[#E4E7EA] flex items-center justify-between text-xs">
              <span className="text-[#767F87] font-mono text-[11px]">Sinxron: {c.lastSynced} ({c.version})</span>
              <div className="flex items-center gap-2">
                {canEdit && (
                  <>
                    <button
                      onClick={() => openEditModal(c)}
                      className="px-2.5 py-1 rounded-lg font-semibold text-xs transition-colors border border-[#D9EBDC] bg-[#F0F7F1] text-[#2E7D4F] hover:bg-[#D9EBDC] inline-flex items-center gap-1"
                    >
                      <Edit className="w-3.5 h-3.5" /> Tahrirlash
                    </button>
                    <button
                      onClick={() => (c.status === 'active' ? setClassifierToArchive(c) : toggleArchiveStatus(c.id))}
                      className={`px-2.5 py-1 rounded-lg font-semibold text-xs transition-colors border ${
                        c.status === 'active'
                          ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                      }`}
                    >
                      {c.status === 'active' ? 'Arxivlash' : 'Qaytarish'}
                    </button>
                  </>
                )}
                <button
                  onClick={() => setDetailClassifier(c)}
                  className="text-[#2E7D4F] font-bold hover:underline inline-flex items-center gap-1"
                >
                  Elementlar <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Classifier Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-[#E4E7EA]">
            <div className="flex items-center justify-between border-b border-[#E4E7EA] pb-3">
              <h3 className="text-lg font-bold text-[#1A1F24] flex items-center gap-2">
                <Sliders className="w-5 h-5 text-[#2E7D4F]" /> Yangi klassifikator yaratish
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setIsAddModalOpen(false); }} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1A1F24]">Klassifikator nomi:</label>
                <Input placeholder="Masalan: Maxsus ruxsatnoma turlari klassifikatori" required />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1A1F24]">Tizim kodi:</label>
                <Input placeholder="permit_special_types" required />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1A1F24]">Manba (hujjat yoki standart):</label>
                <Input placeholder="cs.egov.uz / VMQ 278-son" required />
              </div>

              <div className="pt-3 border-t border-[#E4E7EA] flex items-center justify-end gap-3">
                <Button variant="outline" type="button" onClick={() => setIsAddModalOpen(false)}>
                  Bekor qilish
                </Button>
                <Button type="submit" variant="primary" className="bg-[#2E7D4F] hover:bg-[#23653F] font-bold">
                  Saqlash va qoʻshish
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Classifier elements and version history */}
      <Modal
        isOpen={!!detailClassifier}
        onClose={() => setDetailClassifier(null)}
        title={detailClassifier ? `${detailClassifier.id} — ${detailClassifier.name}` : ''}
        subtitle={detailClassifier ? `${detailClassifier.itemsCount} ta element · ${detailClassifier.version}` : ''}
        maxWidth="lg"
        footer={
          <div className="flex items-center justify-between w-full gap-2">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Download className="w-4 h-4" />}
              onClick={() => alert('Klassifikator elementlari Excel formatida tayyorlanmoqda.')}
            >
              Elementlarni eksport qilish
            </Button>
            <Button variant="primary" size="sm" onClick={() => setDetailClassifier(null)}>
              Yopish
            </Button>
          </div>
        }
      >
        {detailClassifier && (
          <div className="space-y-4 py-1 text-xs">
            <div className="p-3 bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl space-y-1 text-[#5A646D]">
              <div className="flex justify-between"><span>Manba:</span><b className="text-[#1A1F24]">{detailClassifier.source}</b></div>
              <div className="flex justify-between"><span>Provayder:</span><b className="text-[#2E7D4F]">{detailClassifier.provider}</b></div>
              <div className="flex justify-between">
                <span>Amal qilish davri:</span>
                <b className="text-[#1A1F24]">
                  {detailClassifier.validFrom} — {detailClassifier.validTo === '—' ? 'muddatsiz' : detailClassifier.validTo}
                </b>
              </div>
              <div className="flex justify-between"><span>Oxirgi sinxronlash:</span><b className="text-[#1A1F24]">{detailClassifier.lastSynced}</b></div>
            </div>

            {/* TZ 4.2.1.4: elements are created, edited and archived inside the classifier */}
            <div className="space-y-2">
              <span className="font-bold text-[#1A1F24] block">Elementlar:</span>
              <div className="border border-[#E4E7EA] rounded-xl divide-y divide-[#E4E7EA]">
                {detailClassifier.sampleItems.map((item: string, idx: number) => (
                  <div key={idx} className="p-3 flex items-center justify-between gap-3 hover:bg-[#F8F9FA]">
                    {editingElementIndex === idx ? (
                      <>
                        <Input
                          value={editingElementValue}
                          onChange={(e) => setEditingElementValue(e.target.value)}
                          className="flex-1"
                        />
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={handleSaveElement}
                            title="Saqlash"
                            className="p-1.5 text-[#2E7D4F] hover:bg-[#F0F7F1] rounded-lg transition-colors"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => { setEditingElementIndex(null); setEditingElementValue(''); }}
                            title="Bekor qilish"
                            className="p-1.5 text-[#767F87] hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="min-w-0">
                          <div className="text-[#1A1F24]">{item}</div>
                          <div className="text-[10px] font-mono text-[#767F87]">
                            {detailClassifier.code}.{String(idx + 1).padStart(3, '0')}
                          </div>
                        </div>
                        {canEdit && (
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              onClick={() => { setEditingElementIndex(idx); setEditingElementValue(item); }}
                              title="Tahrirlash"
                              className="p-1.5 text-[#5A646D] hover:text-[#2E7D4F] hover:bg-[#F0F7F1] rounded-lg transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleArchiveElement(idx)}
                              title="Elementni arxivlash"
                              className="p-1.5 text-[#5A646D] hover:text-[#B45309] hover:bg-[#FFFBEB] rounded-lg transition-colors"
                            >
                              <Archive className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}

                {detailClassifier.itemsCount > detailClassifier.sampleItems.length && (
                  <div className="p-3 text-[#767F87] text-center">
                    … yana {detailClassifier.itemsCount - detailClassifier.sampleItems.length} ta element
                  </div>
                )}

                {canEdit && (
                  <div className="p-3 flex items-center gap-2 bg-[#F8F9FA]">
                    <Input
                      placeholder="Yangi element qiymatini kiriting..."
                      value={newElementValue}
                      onChange={(e) => setNewElementValue(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      variant="primary"
                      size="sm"
                      leftIcon={<Plus className="w-3.5 h-3.5" />}
                      onClick={handleAddElement}
                      className="bg-[#2E7D4F] hover:bg-[#23653F] font-bold shrink-0"
                    >
                      Qoʻshish
                    </Button>
                  </div>
                )}
              </div>
              {canEdit && (
                <span className="text-[10px] text-[#767F87] block">
                  Amaldagi yozuvlarda ishlatilayotgan element oʻchirilmaydi — arxivga oʻtkaziladi.
                </span>
              )}
            </div>

            {/* TZ 4.2.1.4: classifiers are versioned */}
            <div className="space-y-2">
              <span className="font-bold text-[#1A1F24] flex items-center gap-1.5">
                <History className="w-4 h-4 text-[#2E7D4F]" /> Versiyalar tarixi:
              </span>
              <div className="border border-[#E4E7EA] rounded-xl divide-y divide-[#E4E7EA]">
                <div className="p-3 flex items-center justify-between">
                  <div>
                    <span className="font-mono font-bold text-[#2E7D4F]">{detailClassifier.version}</span>
                    <span className="text-[#5A646D] ml-2">joriy versiya</span>
                  </div>
                  <span className="text-[10px] text-[#767F87] font-mono">{detailClassifier.validFrom} dan</span>
                </div>
                <div className="p-3 flex items-center justify-between opacity-60">
                  <div>
                    <span className="font-mono font-bold text-[#767F87]">oldingi versiya</span>
                    <span className="text-[#5A646D] ml-2">arxivda saqlanadi</span>
                  </div>
                  <span className="text-[10px] text-[#767F87] font-mono">{detailClassifier.validFrom} gacha</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-[#F0F7F1] border border-[#D9EBDC] rounded-xl text-[#2E7D4F] flex items-start gap-2">
              <Info className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                Ilgari berilgan ruxsatnomalar oʻz <b>versiyasiga</b> bogʻlangan holda qoladi —
                klassifikator yangilansa, ular qayta hisoblanmaydi.
              </span>
            </div>
          </div>
        )}
      </Modal>

      {/* Edit classifier — TZ 4.2.1.4 */}
      <Modal
        isOpen={!!classifierToEdit}
        onClose={() => setClassifierToEdit(null)}
        title={classifierToEdit ? `Klassifikatorni tahrirlash — ${classifierToEdit.id}` : ''}
        subtitle="Nomi, manbasi, versiyasi va amal qilish davri"
        maxWidth="lg"
        footer={
          <div className="flex items-center justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setClassifierToEdit(null)}>
              Bekor qilish
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSaveClassifier}
              className="bg-[#2E7D4F] hover:bg-[#23653F] font-bold"
            >
              Saqlash
            </Button>
          </div>
        }
      >
        {classifierToEdit && (
          <div className="space-y-4 py-1">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1A1F24]">Klassifikator nomi:</label>
              <Input value={editName} onChange={(e) => setEditName(e.target.value)} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1A1F24]">Manba (hujjat yoki standart):</label>
                <Input value={editSource} onChange={(e) => setEditSource(e.target.value)} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1A1F24]">Provayder:</label>
                <Input value={editProvider} onChange={(e) => setEditProvider(e.target.value)} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1A1F24]">Amal qilish boshlanishi:</label>
                <Input
                  value={editValidFrom}
                  onChange={(e) => setEditValidFrom(e.target.value)}
                  placeholder="01.01.2026"
                  className="font-mono"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1A1F24]">Amal qilish tugashi:</label>
                <Input
                  value={editValidTo}
                  onChange={(e) => setEditValidTo(e.target.value)}
                  placeholder="— (muddatsiz)"
                  className="font-mono"
                />
              </div>
            </div>

            {/* TZ 4.2.1.4: classifiers are versioned */}
            <div className="p-3 bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#1A1F24]">Joriy versiya:</span>
                <span className="font-mono font-bold text-[#2E7D4F]">{editVersion}</span>
              </div>
              <label className="flex items-start gap-2 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={bumpVersion}
                  onChange={() => setBumpVersion(!bumpVersion)}
                  className="w-4 h-4 accent-[#2E7D4F] shrink-0 mt-0.5"
                />
                <span className="text-[#5A646D]">
                  Yangi versiya yaratilsin (<b className="text-[#1A1F24] font-mono">{nextVersion(editVersion)}</b>) —
                  oldingi versiya arxivda saqlanadi, ilgari berilgan ruxsatnomalar oʻz versiyasida qoladi
                </span>
              </label>
            </div>

            <div className="p-3 bg-[#F0F7F1] border border-[#D9EBDC] rounded-xl text-[11px] text-[#2E7D4F] flex items-start gap-2">
              <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span>Oʻzgarish audit jurnaliga yoziladi. Elementlarni tahrirlash «Elementlar» oynasida bajariladi.</span>
            </div>
          </div>
        )}
      </Modal>

      {/* Archive confirmation — TZ 4.2.1.4: values in use are archived, not deleted */}
      <Modal
        isOpen={!!classifierToArchive}
        onClose={() => setClassifierToArchive(null)}
        title="Klassifikatorni arxivlash"
        subtitle={classifierToArchive?.name}
        footer={
          <div className="flex items-center justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setClassifierToArchive(null)}>
              Bekor qilish
            </Button>
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Archive className="w-4 h-4" />}
              onClick={() => {
                if (classifierToArchive) toggleArchiveStatus(classifierToArchive.id);
                setClassifierToArchive(null);
              }}
              className="bg-[#B45309] hover:bg-[#92400E] text-white font-bold"
            >
              Arxivlash
            </Button>
          </div>
        }
      >
        <div className="space-y-3 py-1 text-xs">
          <div className="p-3 bg-[#FFFBEB] border border-[#FDE68A] rounded-xl text-[#B45309]">
            <b>Qoida (4.2.1.4):</b> klassifikator qiymati amaldagi yozuvlarda ishlatilayotgan boʻlsa,
            u <b>oʻchirilmaydi</b> — «arxivlangan» statusiga oʻtkaziladi. Arxivlangan qiymat yangi
            yozuvlarda tanlanmaydi, lekin eski yozuvlarda saqlanib qoladi.
          </div>
          <div className="p-3 bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-[#5A646D]">
            Ushbu klassifikatorda <b className="text-[#1A1F24]">{classifierToArchive?.itemsCount} ta</b> element bor.
            Arxivlash amali audit jurnaliga yoziladi.
          </div>
        </div>
      </Modal>

      {/* Import / export — TZ 4.2.1.4 */}
      <Modal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        title="Klassifikatorlarni import va eksport qilish"
        subtitle="Fayl orqali yuklash yoki mavjud maʼlumotnomalarni chiqarish"
        footer={
          <Button variant="primary" size="sm" onClick={() => setIsImportModalOpen(false)}>
            Yopish
          </Button>
        }
      >
        <div className="space-y-4 py-1 text-xs">
          <div className="p-4 border-2 border-dashed border-[#E4E7EA] rounded-xl text-center space-y-2">
            <Upload className="w-8 h-8 text-[#9AA3AB] mx-auto" />
            <div className="font-semibold text-[#1A1F24]">Faylni bu yerga tashlang yoki tanlang</div>
            <div className="text-[#767F87]">Qoʻllab-quvvatlanadigan formatlar: .xlsx, .csv, .json</div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => alert('Fayl tanlash oynasi ochiladi.')}
              className="mt-1"
            >
              Fayl tanlash
            </Button>
          </div>

          <div className="space-y-2">
            <span className="font-bold text-[#1A1F24] block">Eksport:</span>
            <div className="flex flex-wrap gap-2">
              {['Excel (.xlsx)', 'CSV', 'JSON'].map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => alert(`Klassifikatorlar ${fmt} formatida tayyorlanmoqda.`)}
                  className="px-3 py-2 rounded-lg border border-[#E4E7EA] text-[#1A1F24] font-semibold hover:bg-[#F8F9FA] transition-colors inline-flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-[#2E7D4F]" /> {fmt}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 bg-[#F0F7F1] border border-[#D9EBDC] rounded-xl text-[#2E7D4F] flex items-start gap-2">
            <Info className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              Import qilishda yangi versiya yaratiladi, eski versiya arxivda qoladi.
              Amal audit jurnaliga yoziladi.
            </span>
          </div>
        </div>
      </Modal>
    </div>
  );
};
