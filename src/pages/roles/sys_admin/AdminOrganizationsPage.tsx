import React, { useState } from 'react';
import {
  Building2,
  Plus,
  Search,
  MapPin,
  Users,
  Trees,
  CheckCircle2,
  Edit,
  ChevronRight,
  ChevronDown,
  Layers,
  Phone,
  X,
  SlidersHorizontal,
  Download,
  Archive,
  Info,
} from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/FormControls';
import { Modal } from '../../../components/ui/Overlay';

interface LeskhozRecord {
  id: string;
  name: string;
  code: string;
  inn: string;
  director: string;
  area: string;
  permits: number;
  staff: number;
  phone: string;
  address: string;
  forestryCount: number;
  obxodCount: number;
  kvartalCount: number;
  status: string;
}

export interface AdminOrganizationsPageProps {
  onNavigate?: (page: string, params?: any) => void;
  userRole?: string;
}

export const AdminOrganizationsPage: React.FC<AdminOrganizationsPageProps> = ({ userRole = '' }) => {
  const isCentralAdmin =
    userRole.includes('central_admin') ||
    userRole.includes('Markaziy') ||
    userRole.includes('Центральный');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [viewMode, setViewMode] = useState<'hierarchy' | 'table'>('hierarchy');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [orgToArchive, setOrgToArchive] = useState<LeskhozRecord | null>(null);
  const [orgToEdit, setOrgToEdit] = useState<LeskhozRecord | null>(null);

  /** Leskhoz whose internal structure (forestry -> patrol area -> quarter) is open — TZ 4.2.1.3. */
  const [structureLeskhoz, setStructureLeskhoz] = useState<LeskhozRecord | null>(null);
  const [expandedForestries, setExpandedForestries] = useState<Record<string, boolean>>({});
  const [newForestryName, setNewForestryName] = useState('');

  /**
   * Internal structure per leskhoz, keyed by leskhoz id. Held here rather than inside
   * `regionsData` so the tree can be edited without touching the region listing.
   */
  const [structures, setStructures] = useState<Record<string, { id: string; name: string; obxods: { id: string; name: string; kvartals: string }[] }[]>>({
    l1: [
      { id: 'f1', name: '1-Chorvoq oʻrmonchiligi', obxods: [
        { id: 'o1', name: '1-obxod (Chorvoq shimoli)', kvartals: '1–24-kvartallar' },
        { id: 'o2', name: '2-obxod (Chorvoq janubi)', kvartals: '25–48-kvartallar' },
        { id: 'o3', name: '3-obxod (Yuqori Chotqol)', kvartals: '49–70-kvartallar' },
      ] },
      { id: 'f2', name: '2-Gʻazalkent oʻrmonchiligi', obxods: [
        { id: 'o4', name: '4-obxod (Gʻazalkent markazi)', kvartals: '71–96-kvartallar' },
        { id: 'o5', name: '5-obxod (Xumson)', kvartals: '97–118-kvartallar' },
      ] },
      { id: 'f3', name: '3-Nanay oʻrmonchiligi', obxods: [
        { id: 'o6', name: '6-obxod (Nanay vodiysi)', kvartals: '119–150-kvartallar' },
      ] },
      { id: 'f4', name: '4-Sijjak oʻrmonchiligi', obxods: [
        { id: 'o7', name: '7-obxod (Sijjak)', kvartals: '151–186-kvartallar' },
        { id: 'o8', name: '8-obxod (Pskom)', kvartals: '187–214-kvartallar' },
      ] },
    ],
    l2: [
      { id: 'f5', name: '1-Burchmulla oʻrmonchiligi', obxods: [
        { id: 'o9', name: '1-obxod (Burchmulla markazi)', kvartals: '1–32-kvartallar' },
        { id: 'o10', name: '2-obxod (Bogʻiston)', kvartals: '33–64-kvartallar' },
      ] },
      { id: 'f6', name: '2-Yusufxona oʻrmonchiligi', obxods: [
        { id: 'o11', name: '3-obxod (Yusufxona)', kvartals: '65–110-kvartallar' },
      ] },
      { id: 'f7', name: '3-Nurakota oʻrmonchiligi', obxods: [
        { id: 'o12', name: '4-obxod (Nurakota)', kvartals: '111–168-kvartallar' },
      ] },
    ],
  });

  const openStructure = (leskhoz: LeskhozRecord) => {
    setStructureLeskhoz(leskhoz);
    setExpandedForestries({});
    setNewForestryName('');
  };

  const toggleForestry = (id: string) => {
    setExpandedForestries((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddForestry = () => {
    if (!structureLeskhoz || !newForestryName.trim()) return;
    const key = structureLeskhoz.id;
    setStructures((prev) => {
      const current = prev[key] ?? [];
      return {
        ...prev,
        [key]: [
          ...current,
          { id: `f-${key}-${current.length + 1}`, name: newForestryName.trim(), obxods: [] },
        ],
      };
    });
    setNewForestryName('');
  };

  const handleRemoveForestry = (forestryId: string) => {
    if (!structureLeskhoz) return;
    const key = structureLeskhoz.id;
    setStructures((prev) => ({
      ...prev,
      [key]: (prev[key] ?? []).filter((f) => f.id !== forestryId),
    }));
  };

  const [expandedRegions, setExpandedRegions] = useState<Record<string, boolean>>({
    'tashkent': true,
    'samarkand': true,
  });

  const toggleRegionExpand = (regId: string) => {
    setExpandedRegions((prev) => ({ ...prev, [regId]: !prev[regId] }));
  };

  // 84 Forestries Regional Breakdown Data
  const regionsData = [
    {
      id: 'tashkent',
      name: 'Toshkent viloyati Boshqarmasi',
      code: 'ORG-TSH-01',
      director: 'Xasanov Odil Raximovich',
      leskhozCount: 12,
      totalArea: '142,500 ha',
      activePermits: 1420,
      activeStaff: 320,
      leskhozs: [
        { id: 'l1', name: 'Boʻstonliq Davlat Oʻrmon Xoʻjaligi', code: 'ORG-TSH-BOS-01', inn: '201982341', director: 'Mirzayev Dilshod Akramovich', area: '45,200 ha', permits: 680, staff: 45, phone: '+998 (71) 207-11-22', address: 'Toshkent v., Boʻstonliq t., Gʻazalkent sh., Navoiy koʻch. 12', forestryCount: 4, obxodCount: 18, kvartalCount: 214, status: 'active' },
        { id: 'l2', name: 'Burchmulla Davlat Oʻrmon Xoʻjaligi', code: 'ORG-TSH-BUR-02', inn: '201982342', director: 'Qodirov Alisher Nabiyevich', area: '32,100 ha', permits: 420, staff: 38, phone: '+998 (71) 207-11-23', address: 'Toshkent v., Boʻstonliq t., Burchmulla qishlogʻi', forestryCount: 3, obxodCount: 14, kvartalCount: 168, status: 'active' },
        { id: 'l3', name: 'Parkent Davlat Oʻrmon Xoʻjaligi', code: 'ORG-TSH-PAR-03', inn: '201982343', director: 'Saidov Botir Shavkatovich', area: '28,400 ha', permits: 190, staff: 29, phone: '+998 (71) 207-11-24', address: 'Toshkent v., Parkent t., Parkent sh., Mustaqillik koʻch. 5', forestryCount: 3, obxodCount: 12, kvartalCount: 140, status: 'active' },
        { id: 'l4', name: 'Oltinsoy Davlat Oʻrmon Xoʻjaligi', code: 'ORG-TSH-OLT-04', inn: '201982344', director: 'Toshmatov Ilhom Rustamovich', area: '36,800 ha', permits: 130, staff: 32, phone: '+998 (71) 207-11-25', address: 'Toshkent v., Oltinsoy t., markaziy koʻcha 1', forestryCount: 3, obxodCount: 13, kvartalCount: 152, status: 'active' },
      ],
    },
    {
      id: 'samarkand',
      name: 'Samarqand viloyati Boshqarmasi',
      code: 'ORG-SAM-02',
      director: 'Narzullayev Sardor Jumaevich',
      leskhozCount: 9,
      totalArea: '118,200 ha',
      activePermits: 980,
      activeStaff: 240,
      leskhozs: [
        { id: 'l5', name: 'Zarafshon Davlat Oʻrmon Xoʻjaligi', code: 'ORG-SAM-ZAR-01', inn: '202871101', director: 'Oripov Doston Farxodovich', area: '29,600 ha', permits: 410, staff: 34, phone: '+998 (66) 234-55-11', address: 'Samarqand v., Jomboy t., Zarafshon koʻch. 8', forestryCount: 3, obxodCount: 15, kvartalCount: 176, status: 'active' },
        { id: 'l6', name: 'Urgut Davlat Oʻrmon Xoʻjaligi', code: 'ORG-SAM-URG-02', inn: '202871102', director: 'Egamov Sherzod Mansurovich', area: '34,100 ha', permits: 320, staff: 31, phone: '+998 (66) 234-55-12', address: 'Samarqand v., Urgut t., Bogʻishamol koʻch. 22', forestryCount: 4, obxodCount: 16, kvartalCount: 190, status: 'active' },
        { id: 'l7', name: 'Kattaqoʻrgʻon Davlat Oʻrmon Xoʻjaligi', code: 'ORG-SAM-KAT-03', inn: '202871103', director: 'Xolmurodov Jaxongir', area: '24,500 ha', permits: 250, staff: 28, phone: '+998 (66) 234-55-13', address: 'Samarqand v., Kattaqoʻrgʻon t., Navroʻz koʻch. 3', forestryCount: 2, obxodCount: 10, kvartalCount: 118, status: 'active' },
      ],
    },
    {
      id: 'fergana',
      name: 'Fargʻona viloyati Boshqarmasi',
      code: 'ORG-FER-03',
      director: 'Azimov Otabek Ulugʻbekovich',
      leskhozCount: 8,
      totalArea: '95,400 ha',
      activePermits: 840,
      activeStaff: 210,
      leskhozs: [
        { id: 'l8', name: 'Qoʻqon Davlat Oʻrmon Xoʻjaligi', code: 'ORG-FER-QOQ-01', inn: '203498111', director: 'Valiyev Anvar Karimovich', area: '22,100 ha', permits: 340, staff: 27, phone: '+998 (73) 541-22-01', address: 'Fargʻona v., Qoʻqon sh., Istiqlol koʻch. 44', forestryCount: 2, obxodCount: 9, kvartalCount: 104, status: 'active' },
        { id: 'l9', name: 'Margʻilon Davlat Oʻrmon Xoʻjaligi', code: 'ORG-FER-MAR-02', inn: '203498112', director: 'Sodiqov Bobur', area: '19,800 ha', permits: 280, staff: 25, phone: '+998 (73) 541-22-02', address: 'Fargʻona v., Margʻilon sh., Toshkent koʻch. 17', forestryCount: 2, obxodCount: 8, kvartalCount: 96, status: 'active' },
      ],
    },
    {
      id: 'surkhandarya',
      name: 'Surxondaryo viloyati Boshqarmasi',
      code: 'ORG-SUR-04',
      director: 'Xursanov Nurbek Xasanovich',
      leskhozCount: 11,
      totalArea: '165,800 ha',
      activePermits: 1250,
      activeStaff: 280,
      leskhozs: [
        { id: 'l10', name: 'Boysun Davlat Oʻrmon Xoʻjaligi', code: 'ORG-SUR-BOY-01', inn: '204918201', director: 'Ramazonov Utkur', area: '58,400 ha', permits: 520, staff: 42, phone: '+998 (76) 223-10-01', address: 'Surxondaryo v., Boysun t., Alpomish koʻch. 6', forestryCount: 5, obxodCount: 21, kvartalCount: 248, status: 'active' },
        { id: 'l11', name: 'Sariosiyo Davlat Oʻrmon Xoʻjaligi', code: 'ORG-SUR-SAR-02', inn: '204918202', director: 'Choʻliyev Jasur', area: '44,200 ha', permits: 390, staff: 36, phone: '+998 (76) 223-10-02', address: 'Surxondaryo v., Sariosiyo t., Oybek koʻch. 9', forestryCount: 4, obxodCount: 17, kvartalCount: 196, status: 'active' },
      ],
    },
  ];

  // New Organization Form
  const [newOrgName, setNewOrgName] = useState('');
  const [newOrgInn, setNewOrgInn] = useState('');
  const [newOrgDirector, setNewOrgDirector] = useState('');
  const [newOrgRegion, setNewOrgRegion] = useState('tashkent');

  const handleAddOrg = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrgName || !newOrgInn) return;
    setIsAddModalOpen(false);
    setNewOrgName('');
    setNewOrgInn('');
    setNewOrgDirector('');
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E4E7EA] p-5 rounded-2xl shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#5A646D] uppercase tracking-wider block">Jami oʻrmon xoʻjaliklari</span>
            <div className="text-xl font-bold text-[#1A1F24]">84 ta DЎX</div>
            <span className="text-xs text-[#15803D] font-medium flex items-center gap-1 mt-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 100% Integratsiyalangan
            </span>
          </div>
          <div className="p-3 bg-[#F0F7F1] rounded-xl text-[#2E7D4F]">
            <Building2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white border border-[#E4E7EA] p-5 rounded-2xl shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#5A646D] uppercase tracking-wider block">Hududiy boshqarmalar</span>
            <div className="text-xl font-bold text-[#1A1F24]">14 ta Viloyat</div>
            <span className="text-xs text-[#5A646D] font-medium block mt-1">Respublika qamrovi</span>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <MapPin className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white border border-[#E4E7EA] p-5 rounded-2xl shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#5A646D] uppercase tracking-wider block">Boshqaruv xodimlari</span>
            <div className="text-xl font-bold text-[#1A1F24]">287 nafar</div>
            <span className="text-xs text-[#15803D] font-medium block mt-1">Ijrochilar va inspektorlar (300 tagacha)</span>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white border border-[#E4E7EA] p-5 rounded-2xl shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#5A646D] uppercase tracking-wider block">Umumiy oʻrmon maydoni</span>
            <div className="text-xl font-bold text-[#1A1F24]">3.2 mln ha</div>
            <span className="text-xs text-[#15803D] font-medium flex items-center gap-1 mt-1">
              <Trees className="w-3.5 h-3.5" /> GIS konturlari biriktirilgan
            </span>
          </div>
          <div className="p-3 bg-teal-50 text-teal-600 rounded-xl">
            <Layers className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#2E7D4F] bg-[#F0F7F1] px-3 py-1 rounded-full border border-[#D9EBDC]">
            Tashkilotlar moduli (4.2.1.3)
          </span>
          <h1 className="text-lg font-bold text-[#1A1F24] mt-1.5">Oʻrmon Xoʻjaligi Agentligi va Hududlar Ierarxiyasi</h1>
          <p className="text-xs text-[#5A646D] mt-0.5">
            Markaziy apparat, 14 ta viloyat boshqarmasi va 84 ta davlat oʻrmon xoʻjaligi strukturasi, STIR hamda kontaktlari
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-[#F8F9FA] p-1 rounded-xl border border-[#E4E7EA] flex items-center text-xs font-bold">
            <button
              onClick={() => setViewMode('hierarchy')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                viewMode === 'hierarchy' ? 'bg-white shadow-xs text-[#2E7D4F]' : 'text-[#5A646D]'
              }`}
            >
              Ierarxiya
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                viewMode === 'table' ? 'bg-white shadow-xs text-[#2E7D4F]' : 'text-[#5A646D]'
              }`}
            >
              Jadval
            </button>
          </div>
          {isCentralAdmin ? (
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Download className="w-4 h-4 text-[#15803D]" />}
              onClick={() => alert('Tashkilotlar maʼlumotnomasi Excel formatida tayyorlanmoqda.')}
              className="border-[#767F87] text-[#1A1F24] hover:bg-[#F8F9FA] font-bold text-xs h-9 cursor-pointer"
            >
              Excelga eksport
            </Button>
          ) : (
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={() => setIsAddModalOpen(true)}
              className="bg-[#2E7D4F] hover:bg-[#23653F] font-bold"
            >
              Tashkilot qoʻshish
            </Button>
          )}
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="w-full md:w-96 relative">
          <Input
            placeholder="Tashkilot nomi, STIR yoki SOATO kodi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
            touchSize
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <SlidersHorizontal className="w-4 h-4 text-[#5A646D]" />
          <span className="text-xs font-semibold text-[#5A646D]">Viloyat:</span>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-xs font-semibold px-3 py-2 text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
          >
            <option value="all">Barcha viloyatlar (14 ta)</option>
            <option value="tashkent">Toshkent viloyati</option>
            <option value="samarkand">Samarqand viloyati</option>
            <option value="fergana">Fargʻona viloyati</option>
            <option value="surkhandarya">Surxondaryo viloyati</option>
          </select>
        </div>
      </div>

      {/* Hierarchy Tree View Mode */}
      {viewMode === 'hierarchy' && (
        <div className="space-y-4">
          {/* Level 1: Central Agency */}
          <div className="bg-white border-2 border-[#2E7D4F] rounded-2xl p-6 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#2E7D4F] text-white flex items-center justify-center font-bold">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#2E7D4F] bg-[#F0F7F1] px-2.5 py-0.5 rounded border border-[#D9EBDC]">
                    1-DARAJA — MARKAZIY APPARAT
                  </span>
                  <h2 className="text-lg font-extrabold text-[#1A1F24] mt-0.5">
                    Oʻzbekiston Respublikasi Oʻrmon Xoʻjaligi Agentligi
                  </h2>
                </div>
              </div>
              <span className="text-xs font-bold text-[#15803D] bg-[#F0F7F1] px-3 py-1 rounded-full border border-[#D9EBDC]">
                STIR: 200891234
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 text-xs border-t border-[#E4E7EA]">
              <div><span className="text-[#5A646D]">Direktor:</span> <b className="text-[#1A1F24] block">Tashpulatov A.R.</b></div>
              <div><span className="text-[#5A646D]">Boshqarmalar:</span> <b className="text-[#1A1F24] block">14 ta Viloyat</b></div>
              <div><span className="text-[#5A646D]">Davlat oʻrmon xoʻjaliklari:</span> <b className="text-[#1A1F24] block">84 ta DЎX</b></div>
              <div><span className="text-[#5A646D]">Ishonch telefoni:</span> <b className="text-[#2E7D4F] block">+998 (71) 207-88-77</b></div>
            </div>
          </div>

          {/* Level 2 & 3: Regional Management & Leskhozs */}
          <div className="space-y-4 pl-0 md:pl-6 border-l-2 border-[#D9EBDC] space-y-4">
            {regionsData.map((reg) => {
              const isExpanded = expandedRegions[reg.id] !== false;
              return (
                <div key={reg.id} className="bg-white border border-[#E4E7EA] rounded-2xl overflow-hidden shadow-xs">
                  {/* Regional Header */}
                  <div
                    onClick={() => toggleRegionExpand(reg.id)}
                    className="p-5 bg-[#F8F9FA] border-b border-[#E4E7EA] flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <button className="text-[#2E7D4F]">
                        {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                      </button>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-extrabold text-base text-[#1A1F24]">{reg.name}</h3>
                          <span className="text-xs font-mono text-[#2E7D4F] bg-[#F0F7F1] px-2 py-0.5 rounded border border-[#D9EBDC]">
                            {reg.code}
                          </span>
                        </div>
                        <p className="text-xs text-[#5A646D]">Boshliq: {reg.director} | Maydoni: {reg.totalArea}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-semibold">
                      <span className="text-[#2E7D4F] font-bold bg-white px-3 py-1 rounded-lg border border-[#E4E7EA]">
                        {reg.leskhozCount} ta Oʻrmon Xoʻjaligi
                      </span>
                      <span className="text-[#5A646D]">Arizalar: {reg.activePermits} ta</span>
                    </div>
                  </div>

                  {/* Level 3: Individual Leskhoz Cards Grid */}
                  {isExpanded && (
                    <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                      {reg.leskhozs.map((leskhoz) => (
                        <div
                          key={leskhoz.id}
                          className="p-4 bg-white border border-[#E4E7EA] rounded-xl hover:border-[#7FB98A] shadow-xs space-y-3 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h4 className="font-bold text-sm text-[#1A1F24]">{leskhoz.name}</h4>
                              <span className="text-[11px] font-mono text-[#767F87]">STIR: {leskhoz.inn} | Kod: {leskhoz.code}</span>
                            </div>
                            <span className="text-[10px] font-bold text-[#15803D] bg-[#F0F7F1] px-2 py-0.5 rounded border border-[#D9EBDC] shrink-0">
                              Faol
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-xs text-[#5A646D] pt-1 border-t border-[#E4E7EA]">
                            <div>Direktor: <b className="text-[#1A1F24] block">{leskhoz.director}</b></div>
                            <div>Oʻrmon maydoni: <b className="text-[#1A1F24] block">{leskhoz.area}</b></div>
                            <div>Faol ruxsatnoma: <b className="text-[#2E7D4F] block">{leskhoz.permits} ta</b></div>
                            <div>Xodimlar soni: <b className="text-[#1A1F24] block">{leskhoz.staff} nafar</b></div>
                          </div>

                          {/* Levels 4-6 — TZ 4.2.1.3: forestry, patrol area, quarter */}
                          <div className="pt-2 border-t border-[#E4E7EA] space-y-1.5">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#767F87] block">
                              Ichki tuzilma
                            </span>
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span className="text-[11px] bg-[#F0F7F1] text-[#2E7D4F] border border-[#D9EBDC] px-2 py-0.5 rounded-md font-semibold">
                                {leskhoz.forestryCount} ta oʻrmonchilik
                              </span>
                              <span className="text-[11px] bg-[#F8F9FA] text-[#5A646D] border border-[#E4E7EA] px-2 py-0.5 rounded-md font-semibold">
                                {leskhoz.obxodCount} ta obxod
                              </span>
                              <span className="text-[11px] bg-[#F8F9FA] text-[#5A646D] border border-[#E4E7EA] px-2 py-0.5 rounded-md font-semibold">
                                {leskhoz.kvartalCount} ta kvartal
                              </span>
                              <button
                                onClick={() => openStructure(leskhoz)}
                                className="text-[11px] text-[#2E7D4F] font-bold hover:underline inline-flex items-center gap-0.5"
                              >
                                Ochish <ChevronRight className="w-3 h-3" />
                              </button>
                            </div>
                            <div className="text-[11px] text-[#767F87] flex items-start gap-1 pt-0.5">
                              <MapPin className="w-3 h-3 shrink-0 mt-0.5 text-[#9AA3AB]" />
                              <span>{leskhoz.address}</span>
                            </div>
                          </div>

                          <div className="pt-2 flex items-center justify-between text-xs text-[#767F87] border-t border-[#E4E7EA] gap-2">
                            <span className="flex items-center gap-1 min-w-0"><Phone className="w-3.5 h-3.5 text-[#2E7D4F] shrink-0" /> <span className="truncate">{leskhoz.phone}</span></span>
                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                onClick={() => setOrgToArchive(leskhoz)}
                                className="text-[#B45309] font-bold hover:underline flex items-center gap-1"
                              >
                                Arxivlash <Archive className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => setOrgToEdit(leskhoz)}
                                className="text-[#2E7D4F] font-bold hover:underline flex items-center gap-1"
                              >
                                Tahrirlash <Edit className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Table View Mode */}
      {viewMode === 'table' && (
        <div className="bg-white border border-[#E4E7EA] rounded-2xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F8F9FA] border-b border-[#E4E7EA] text-[11px] font-bold uppercase tracking-wider text-[#5A646D]">
                  <th className="py-3.5 px-4">№</th>
                  <th className="py-3.5 px-4">Tashkilot nomi va STIR</th>
                  <th className="py-3.5 px-4">Tashkilot kodi</th>
                  <th className="py-3.5 px-4">Rahbar F.I.SH</th>
                  <th className="py-3.5 px-4">Oʻrmon maydoni</th>
                  <th className="py-3.5 px-4">Xodimlar</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4E7EA] text-xs">
                {regionsData.flatMap((r) => r.leskhozs).map((l, idx) => (
                  <tr key={l.id} className="hover:bg-[#F8F9FA] transition-colors">
                    <td className="py-3.5 px-4 font-mono font-semibold text-[#767F87]">{idx + 1}</td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#1A1F24]">{l.name}</div>
                      <div className="text-[11px] font-mono text-[#767F87]">STIR: {l.inn}</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[#2E7D4F] font-bold">{l.code}</td>
                    <td className="py-3.5 px-4 font-semibold text-[#1A1F24]">{l.director}</td>
                    <td className="py-3.5 px-4 font-mono text-[#5A646D]">{l.area}</td>
                    <td className="py-3.5 px-4 font-mono text-[#1A1F24]">{l.staff} nafar</td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#F0F7F1] text-[#15803D] border border-[#D9EBDC]">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Faol
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setOrgToArchive(l)}
                          className="p-1.5 text-[#B45309] hover:bg-[#FFFBEB] rounded-lg transition-colors font-bold"
                        >
                          Arxivlash
                        </button>
                        <button
                          onClick={() => setOrgToEdit(l)}
                          className="p-1.5 text-[#2E7D4F] hover:bg-[#F0F7F1] rounded-lg transition-colors font-bold"
                        >
                          Tahrirlash
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Organization Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-[#E4E7EA]">
            <div className="flex items-center justify-between border-b border-[#E4E7EA] pb-3">
              <h3 className="text-lg font-bold text-[#1A1F24] flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#2E7D4F]" /> Yangi tashkilot qoʻshish
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddOrg} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1A1F24]">Tashkilot nomi (davlat tilida):</label>
                <Input
                  placeholder="Masalan: Zomin Davlat Oʻrmon Xoʻjaligi"
                  value={newOrgName}
                  onChange={(e) => setNewOrgName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1A1F24]">STIR (9 xonali):</label>
                <Input
                  placeholder="201982341"
                  value={newOrgInn}
                  onChange={(e) => setNewOrgInn(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1A1F24]">Rahbar F.I.SH:</label>
                <Input
                  placeholder="Masalan: Mirzayev Dilshod Akramovich"
                  value={newOrgDirector}
                  onChange={(e) => setNewOrgDirector(e.target.value)}
                />
              </div>

              {/* Required organisation details — TZ 4.2.1.3 */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1A1F24]">Tashkilot nomi (rus tilida, ixtiyoriy):</label>
                <Input placeholder="Заминское государственное лесное хозяйство" />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1A1F24]">Manzil:</label>
                <Input placeholder="Masalan: Jizzax v., Zomin t., Bogʻbon koʻch. 14" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#1A1F24]">Telefon:</label>
                  <Input placeholder="+998 (72) 000-00-00" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#1A1F24]">Elektron pochta:</label>
                  <Input type="email" placeholder="info@leskhoz.uz" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1A1F24]">Hudud (SOATO kodi):</label>
                <Input placeholder="1712212" className="font-mono" />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1A1F24]">Yuqori turuvchi tashkilot:</label>
                <select
                  value={newOrgRegion}
                  onChange={(e) => setNewOrgRegion(e.target.value)}
                  className="w-full bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-sm p-3 text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
                >
                  <option value="tashkent">Toshkent viloyati Boshqarmasi</option>
                  <option value="samarkand">Samarqand viloyati Boshqarmasi</option>
                  <option value="fergana">Fargʻona viloyati Boshqarmasi</option>
                  <option value="surkhandarya">Surxondaryo viloyati Boshqarmasi</option>
                </select>
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

      {/* Internal structure: forestry -> patrol area -> quarter — TZ 4.2.1.3 */}
      <Modal
        isOpen={!!structureLeskhoz}
        onClose={() => setStructureLeskhoz(null)}
        title={structureLeskhoz ? `Ichki tuzilma — ${structureLeskhoz.name}` : ''}
        subtitle="Oʻrmonchilik → obxod → kvartallar ierarxiyasi"
        maxWidth="2xl"
        footer={
          <div className="flex items-center justify-end gap-2">
            <Button variant="primary" size="sm" onClick={() => setStructureLeskhoz(null)}>
              Yopish
            </Button>
          </div>
        }
      >
        {structureLeskhoz && (
          <div className="space-y-4 py-1 text-xs">
            <div className="p-3 bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="font-bold text-[#1A1F24] text-sm">{structureLeskhoz.forestryCount}</div>
                <div className="text-[#767F87]">oʻrmonchilik</div>
              </div>
              <div>
                <div className="font-bold text-[#1A1F24] text-sm">{structureLeskhoz.obxodCount}</div>
                <div className="text-[#767F87]">obxod</div>
              </div>
              <div>
                <div className="font-bold text-[#1A1F24] text-sm">{structureLeskhoz.kvartalCount}</div>
                <div className="text-[#767F87]">kvartal</div>
              </div>
            </div>

            <div className="border border-[#E4E7EA] rounded-xl divide-y divide-[#E4E7EA]">
              {(structures[structureLeskhoz.id] ?? []).length === 0 ? (
                <div className="p-4 text-center text-[#767F87]">
                  Bu xoʻjalik uchun ichki tuzilma hali kiritilmagan.
                </div>
              ) : (
                (structures[structureLeskhoz.id] ?? []).map((forestry) => {
                  const isOpen = !!expandedForestries[forestry.id];
                  return (
                    <div key={forestry.id}>
                      <div className="p-3 flex items-center justify-between gap-3 hover:bg-[#F8F9FA]">
                        <button
                          onClick={() => toggleForestry(forestry.id)}
                          className="flex items-center gap-2 min-w-0 text-left flex-1"
                        >
                          {isOpen ? (
                            <ChevronDown className="w-4 h-4 text-[#2E7D4F] shrink-0" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-[#2E7D4F] shrink-0" />
                          )}
                          <Trees className="w-4 h-4 text-[#2E7D4F] shrink-0" />
                          <div className="min-w-0">
                            <div className="font-bold text-[#1A1F24]">{forestry.name}</div>
                            <div className="text-[10px] text-[#767F87]">{forestry.obxods.length} ta obxod</div>
                          </div>
                        </button>
                        <button
                          onClick={() => handleRemoveForestry(forestry.id)}
                          title="Oʻrmonchilikni arxivlash"
                          className="p-1.5 text-[#5A646D] hover:text-[#B45309] hover:bg-[#FFFBEB] rounded-lg transition-colors shrink-0"
                        >
                          <Archive className="w-4 h-4" />
                        </button>
                      </div>

                      {isOpen && (
                        <div className="pl-9 pr-3 pb-3 space-y-1.5 bg-[#F8F9FA]/60">
                          {forestry.obxods.length === 0 ? (
                            <div className="text-[#767F87] py-2">Obxod kiritilmagan.</div>
                          ) : (
                            forestry.obxods.map((obxod) => (
                              <div
                                key={obxod.id}
                                className="p-2.5 bg-white border border-[#E4E7EA] rounded-lg flex items-center justify-between gap-3"
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  <MapPin className="w-3.5 h-3.5 text-[#9AA3AB] shrink-0" />
                                  <span className="text-[#1A1F24] font-semibold truncate">{obxod.name}</span>
                                </div>
                                <span className="text-[10px] font-mono text-[#2E7D4F] bg-[#F0F7F1] border border-[#D9EBDC] px-2 py-0.5 rounded shrink-0">
                                  {obxod.kvartals}
                                </span>
                              </div>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                  );
                })
              )}

              <div className="p-3 flex items-center gap-2 bg-[#F8F9FA]">
                <Input
                  placeholder="Yangi oʻrmonchilik nomi..."
                  value={newForestryName}
                  onChange={(e) => setNewForestryName(e.target.value)}
                  className="flex-1"
                />
                <Button
                  variant="primary"
                  size="sm"
                  leftIcon={<Plus className="w-3.5 h-3.5" />}
                  onClick={handleAddForestry}
                  className="bg-[#2E7D4F] hover:bg-[#23653F] font-bold shrink-0"
                >
                  Qoʻshish
                </Button>
              </div>
            </div>

            <div className="p-3 bg-[#F0F7F1] border border-[#D9EBDC] rounded-xl text-[#2E7D4F] flex items-start gap-2">
              <Info className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                Ierarxiya GIS konturlariga bogʻlanadi: har bir kvartal oʻz kontur identifikatoriga ega.
                Oʻrmonchilik arxivlansa, uning obxod va kvartallari yangi arizalarda tanlanmaydi.
              </span>
            </div>
          </div>
        )}
      </Modal>

      {/* Edit organisation */}
      <Modal
        isOpen={!!orgToEdit}
        onClose={() => setOrgToEdit(null)}
        title="Tashkilotni tahrirlash"
        subtitle={orgToEdit?.name}
        maxWidth="lg"
        footer={
          <div className="flex items-center justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setOrgToEdit(null)}>
              Bekor qilish
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setOrgToEdit(null)}
              className="bg-[#2E7D4F] hover:bg-[#23653F] font-bold"
            >
              Saqlash
            </Button>
          </div>
        }
      >
        {orgToEdit && (
          <div className="space-y-4 py-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1A1F24]">Tashkilot nomi:</label>
                <Input defaultValue={orgToEdit.name} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1A1F24]">STIR:</label>
                <Input defaultValue={orgToEdit.inn} className="font-mono" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1A1F24]">Rahbar F.I.SH:</label>
                <Input defaultValue={orgToEdit.director} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1A1F24]">Telefon:</label>
                <Input defaultValue={orgToEdit.phone} />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-[#1A1F24]">Manzil:</label>
                <Input defaultValue={orgToEdit.address} />
              </div>
            </div>

            <div className="p-3 bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-xs text-[#5A646D] space-y-1">
              <span className="font-bold text-[#1A1F24] block">Ichki tuzilma:</span>
              <div className="flex flex-wrap gap-2">
                <span>{orgToEdit.forestryCount} ta oʻrmonchilik</span>
                <span>·</span>
                <span>{orgToEdit.obxodCount} ta obxod</span>
                <span>·</span>
                <span>{orgToEdit.kvartalCount} ta kvartal</span>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Archive organisation — TZ 4.2.1.3 allows archiving, not deletion */}
      <Modal
        isOpen={!!orgToArchive}
        onClose={() => setOrgToArchive(null)}
        title="Tashkilotni arxivlash"
        subtitle={orgToArchive?.name}
        footer={
          <div className="flex items-center justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setOrgToArchive(null)}>
              Bekor qilish
            </Button>
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Archive className="w-4 h-4" />}
              onClick={() => setOrgToArchive(null)}
              className="bg-[#B45309] hover:bg-[#92400E] text-white font-bold"
            >
              Arxivlash
            </Button>
          </div>
        }
      >
        <div className="space-y-3 py-1 text-xs">
          <div className="p-3 bg-[#FFFBEB] border border-[#FDE68A] rounded-xl text-[#B45309]">
            Tashkilot <b>oʻchirilmaydi</b>, «arxivlangan» statusiga oʻtkaziladi.
            Arxivlangan tashkilotga yangi ariza va foydalanuvchi biriktirilmaydi,
            lekin uning eski hujjatlari va ruxsatnomalari saqlanib qoladi.
          </div>
          <div className="p-3 bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-[#5A646D] flex items-start gap-2">
            <Info className="w-4 h-4 shrink-0 mt-0.5 text-[#2E7D4F]" />
            <span>
              Arxivlashdan oldin tashkilotdagi tugallanmagan arizalar va toʻldirilmagan formalar
              boshqa tashkilotga topshirilishi kerak. Amal audit jurnaliga yoziladi.
            </span>
          </div>
        </div>
      </Modal>
    </div>
  );
};
