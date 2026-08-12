import React, { useState } from 'react';
import {
  Building2,
  Plus,
  Search,
  Filter,
  MapPin,
  Users,
  Trees,
  CheckCircle2,
  Edit,
  ChevronRight,
  ChevronDown,
  FileText,
  Layers,
  Phone,
  Mail,
  X,
  SlidersHorizontal,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/FormControls';

export interface AdminOrganizationsPageProps {
  onNavigate?: (page: string, params?: any) => void;
}

export const AdminOrganizationsPage: React.FC<AdminOrganizationsPageProps> = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [viewMode, setViewMode] = useState<'hierarchy' | 'table'>('hierarchy');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
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
        { id: 'l1', name: 'Boʻstonliq Davlat Oʻrmon Xoʻjaligi', code: 'ORG-TSH-BOS-01', inn: '201982341', director: 'Mirzayev Dilshod Akramovich', area: '45,200 ha', permits: 680, staff: 45, phone: '+998 (71) 207-11-22' },
        { id: 'l2', name: 'Burchmulla Davlat Oʻrmon Xoʻjaligi', code: 'ORG-TSH-BUR-02', inn: '201982342', director: 'Qodirov Alisher Nabiyevich', area: '32,100 ha', permits: 420, staff: 38, phone: '+998 (71) 207-11-23' },
        { id: 'l3', name: 'Parkent Davlat Oʻrmon Xoʻjaligi', code: 'ORG-TSH-PAR-03', inn: '201982343', director: 'Saidov Botir Shavkatovich', area: '28,400 ha', permits: 190, staff: 29, phone: '+998 (71) 207-11-24' },
        { id: 'l4', name: 'Oltinsoy Davlat Oʻrmon Xoʻjaligi', code: 'ORG-TSH-OLT-04', inn: '201982344', director: 'Toshmatov Ilhom Rustamovich', area: '36,800 ha', permits: 130, staff: 32, phone: '+998 (71) 207-11-25' },
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
        { id: 'l5', name: 'Zarafshon Davlat Oʻrmon Xoʻjaligi', code: 'ORG-SAM-ZAR-01', inn: '202871101', director: 'Oripov Doston Farxodovich', area: '29,600 ha', permits: 410, staff: 34, phone: '+998 (66) 234-55-11' },
        { id: 'l6', name: 'Urgut Davlat Oʻrmon Xoʻjaligi', code: 'ORG-SAM-URG-02', inn: '202871102', director: 'Egamov Sherzod Mansurovich', area: '34,100 ha', permits: 320, staff: 31, phone: '+998 (66) 234-55-12' },
        { id: 'l7', name: 'Kattaqoʻrgʻon Davlat Oʻrmon Xoʻjaligi', code: 'ORG-SAM-KAT-03', inn: '202871103', director: 'Xolmurodov Jaxongir', area: '24,500 ha', permits: 250, staff: 28, phone: '+998 (66) 234-55-13' },
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
        { id: 'l8', name: 'Qoʻqon Davlat Oʻrmon Xoʻjaligi', code: 'ORG-FER-QOQ-01', inn: '203498111', director: 'Valiyev Anvar Karimovich', area: '22,100 ha', permits: 340, staff: 27, phone: '+998 (73) 541-22-01' },
        { id: 'l9', name: 'Margʻilon Davlat Oʻrmon Xoʻjaligi', code: 'ORG-FER-MAR-02', inn: '203498112', director: 'Sodiqov Bobur', area: '19,800 ha', permits: 280, staff: 25, phone: '+998 (73) 541-22-02' },
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
        { id: 'l10', name: 'Boysun Davlat Oʻrmon Xoʻjaligi', code: 'ORG-SUR-BOY-01', inn: '204918201', director: 'Ramazonov Utkur', area: '58,400 ha', permits: 520, staff: 42, phone: '+998 (76) 223-10-01' },
        { id: 'l11', name: 'Sariosiyo Davlat Oʻrmon Xoʻjaligi', code: 'ORG-SUR-SAR-02', inn: '204918202', director: 'Choʻliyev Jasur', area: '44,200 ha', permits: 390, staff: 36, phone: '+998 (76) 223-10-02' },
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
            <span className="text-xs font-semibold text-[#5A646D] uppercase tracking-wider block">Jami Oʻrmon Xoʻjaliklari</span>
            <div className="text-xl font-bold text-[#1A1F24]">84 ta DӪX</div>
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
            <span className="text-xs font-semibold text-[#5A646D] uppercase tracking-wider block">Hududiy Boshqarmalar</span>
            <div className="text-xl font-bold text-[#1A1F24]">14 ta Viloyat</div>
            <span className="text-xs text-[#5A646D] font-medium block mt-1">Respublika qamrovi</span>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <MapPin className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white border border-[#E4E7EA] p-5 rounded-2xl shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#5A646D] uppercase tracking-wider block">Boshqaruv Xodimlari</span>
            <div className="text-xl font-bold text-[#1A1F24]">1,850 nafar</div>
            <span className="text-xs text-[#15803D] font-medium block mt-1">Ijrochilar va Inspektorlar</span>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white border border-[#E4E7EA] p-5 rounded-2xl shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#5A646D] uppercase tracking-wider block">Umumiy Oʻrmon Maydoni</span>
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
            Tashkilotlar Ierarxiyasi (84 DЎX)
          </span>
          <h1 className="text-lg font-bold text-[#1A1F24] mt-1.5">Oʻmon Xoʻjaligi Agentligi va Hududlar Ierarxiyasi</h1>
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
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#2E7D4F] hover:bg-[#23653F] font-bold"
          >
            Tashkilot Qoʻshish
          </Button>
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
                    DARAZHA 1 — MARKAZIY BOSHQARMA
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

                          <div className="pt-2 flex items-center justify-between text-xs text-[#767F87] border-t border-[#E4E7EA]">
                            <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-[#2E7D4F]" /> {leskhoz.phone}</span>
                            <button className="text-[#2E7D4F] font-bold hover:underline flex items-center gap-1">
                              Tahrirlash <Edit className="w-3 h-3" />
                            </button>
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
                  <th className="py-3.5 px-4">Tashkilot Nomi & STIR</th>
                  <th className="py-3.5 px-4">Tashkilot Kodi</th>
                  <th className="py-3.5 px-4">Rahbar F.I.SH</th>
                  <th className="py-3.5 px-4">Oʻrmon Maydoni</th>
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
                      <button className="p-1.5 text-[#2E7D4F] hover:bg-[#F0F7F1] rounded-lg transition-colors font-bold">
                        Tahrirlash
                      </button>
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
                <Building2 className="w-5 h-5 text-[#2E7D4F]" /> Yangi Oʻrmon Xoʻjaligi Qoʻshish
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddOrg} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1A1F24]">Tashkilot Nomi:</label>
                <Input
                  placeholder="Masalan: Zomin Davlat Oʻrmon Xoʻjaligi"
                  value={newOrgName}
                  onChange={(e) => setNewOrgName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1A1F24]">STIR (9 xonali INN):</label>
                <Input
                  placeholder="201982341"
                  value={newOrgInn}
                  onChange={(e) => setNewOrgInn(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1A1F24]">Rahbar F.I.SH (Direktor):</label>
                <Input
                  placeholder="Masalan: Mirzayev Dilshod Akramovich"
                  value={newOrgDirector}
                  onChange={(e) => setNewOrgDirector(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1A1F24]">Viloyat Boshqarmasi:</label>
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
