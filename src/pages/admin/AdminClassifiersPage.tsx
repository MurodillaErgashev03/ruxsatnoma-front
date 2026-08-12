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
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/FormControls';

export interface AdminClassifiersPageProps {
  onNavigate?: (page: string, params?: any) => void;
}

export const AdminClassifiersPage: React.FC<AdminClassifiersPageProps> = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSourceFilter, setSelectedSourceFilter] = useState('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_activeClassifierDetail, setActiveClassifierDetail] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // 14 Classifiers from TZ 14-errors-classifiers.md (p. 4.1.10)
  const [classifiersList, setClassifiersList] = useState([
    {
      id: 'CL-01',
      code: 'livestock_types',
      name: 'Chorva mollarini boqish turlari va yosh guruhlari',
      source: 'VMQ 689-son 5-ilova',
      provider: 'Tizim reyestri / Moliya',
      itemsCount: 14,
      version: 'v2.4',
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
      status: 'active',
      lastSynced: 'Bugun 09:00',
      sampleItems: ['Boʻstonliq t. (1726208)', 'Parkent t. (1726220)', 'Urush t. (1718204)', 'Boysun t. (1722204)'],
    },
    {
      id: 'CL-05',
      code: 'leskhoz_registry',
      name: 'Davlat oʻrmon xoʻjaliklari nomi va kodlari (84 ta DЎX)',
      source: 'Tizim reyestri',
      provider: 'Oʻrmon loyiha instituti',
      itemsCount: 84,
      version: 'v4.2',
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
      status: 'active',
      lastSynced: 'Kechagi 16:45',
      sampleItems: ['1-Oʻrmon boʻlimi (Chorvoq)', '2-Oʻrmon boʻlimi (Burchmulla)', '3-Oʻrmon boʻlimi (Parkent)'],
    },
    {
      id: 'CL-07',
      code: 'gis_layers_srid',
      name: 'Katalog GIS-slas va SRID koordinata sistemalari',
      source: 'EPSG:4326 / WGS-84',
      provider: 'GIS Geoserver Engine',
      itemsCount: 13,
      version: 'v2.0',
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
            <span className="text-xs font-semibold text-[#5A646D] uppercase tracking-wider block">Jami Klassifikatorlar</span>
            <div className="text-xl font-bold text-[#1A1F24]">14 ta Davlat</div>
            <span className="text-xs text-[#15803D] font-medium flex items-center gap-1 mt-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> п. 4.1.10 Toʻliq qamrov
            </span>
          </div>
          <div className="p-3 bg-[#F0F7F1] rounded-xl text-[#2E7D4F]">
            <Sliders className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white border border-[#E4E7EA] p-5 rounded-2xl shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#5A646D] uppercase tracking-wider block">cs.egov.uz Sinxronizatsiya</span>
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
            <span className="text-xs font-semibold text-[#5A646D] uppercase tracking-wider block">Jami Elementlar</span>
            <div className="text-xl font-bold text-[#1A1F24]">9,850+ ta</div>
            <span className="text-xs text-[#5A646D] font-medium block mt-1">Maʼlumotnomalar kodi</span>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <Layers className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white border border-[#E4E7EA] p-5 rounded-2xl shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#5A646D] uppercase tracking-wider block">Oʻchirish Qoidasi</span>
            <div className="text-xl font-bold text-[#1A1F24]">Arxivlash</div>
            <span className="text-xs text-[#15803D] font-medium block mt-1">Oʻchirish oʻrniga arxiv</span>
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
            cs.egov.uz Integratsiyasi (п. 4.1.10)
          </span>
          <h1 className="text-lg font-bold text-[#1A1F24] mt-1.5">Davlat Klassifikatorlari va Maʼlumotnomalar</h1>
          <p className="text-xs text-[#5A646D] mt-0.5">
            Oʻrmon kodeksi, geobotanik normalar, BHM koeffitsientlari, SOATO kodlari va cs.egov.uz yagona reyestri
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" size="sm" leftIcon={<RefreshCw className="w-4 h-4" />}>
            cs.egov.uz Sinxronlash
          </Button>
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#2E7D4F] hover:bg-[#23653F] font-bold"
          >
            Klassifikator Qoʻshish
          </Button>
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
                <button
                  onClick={() => toggleArchiveStatus(c.id)}
                  className={`px-2.5 py-1 rounded-lg font-semibold text-xs transition-colors border ${
                    c.status === 'active'
                      ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                  }`}
                >
                  {c.status === 'active' ? 'Arxivlash' : 'Qaytarish'}
                </button>
                <button
                  onClick={() => setActiveClassifierDetail(c.id)}
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
                <Sliders className="w-5 h-5 text-[#2E7D4F]" /> Yangi Klassifikator Yaratish
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setIsAddModalOpen(false); }} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1A1F24]">Klassifikator Nomi:</label>
                <Input placeholder="Masalan: Maxsus ruxsatnoma turlari klassifikatori" required />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1A1F24]">Tizim Kodi (System Code):</label>
                <Input placeholder="permit_special_types" required />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1A1F24]">Manba (Hujjat / Standart):</label>
                <Input placeholder="cs.egov.uz / VMQ 278-son" required />
              </div>

              <div className="pt-3 border-t border-[#E4E7EA] flex items-center justify-end gap-3">
                <Button variant="outline" type="button" onClick={() => setIsAddModalOpen(false)}>
                  Bekor qilish
                </Button>
                <Button type="submit" variant="primary" className="bg-[#2E7D4F] hover:bg-[#23653F] font-bold">
                  Saqlash va Qoʻshish
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
