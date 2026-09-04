import React, { useState } from 'react';
import {
  Map,
  Layers,
  Compass,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  MapPin,
  RefreshCw,
  PieChart as PieIcon,
  BarChart3,
  ChevronRight,
  UploadCloud,
  Globe2,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Button } from '../../../components/ui/button';

export interface GisSpecialistDashboardPageProps {
  onNavigate?: (page: string, params?: any) => void;
}

export const GisSpecialistDashboardPage: React.FC<GisSpecialistDashboardPageProps> = ({ onNavigate }) => {
  const [timeRange, setTimeRange] = useState<'week' | 'month'>('week');
  const [activePieIndex, setActivePieIndex] = useState<number | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  // Top KPIs for GIS Specialist
  const kpiCards = [
    {
      label: 'Raqamlashtirilgan yer fondi',
      value: '842 600 ga',
      sub: '13 ta faol geo-qatlam',
      change: '100% WGS-84 (EPSG:4326)',
      icon: <Globe2 className="w-5 h-5 text-[#2E7D4F]" />,
      alert: false,
    },
    {
      label: 'GIS xulosasi kutilmoqda',
      value: '4 ta ariza',
      sub: 'Fazoviy tahlilda',
      change: '2 ta yangi bugun keldi',
      icon: <Compass className="w-5 h-5 text-[#0284C7]" />,
      alert: false,
    },
    {
      label: 'Ijobiy xulosalar berilgan',
      value: '18 ta',
      sub: 'Boʻstonliq DЎX boʻyicha',
      change: 'Chegara va sigʻim tasdiqlandi',
      icon: <CheckCircle2 className="w-5 h-5 text-[#15803D]" />,
      alert: false,
    },
    {
      label: 'Topologik konflikt (Kesishuv)',
      value: '1 ta xato',
      sub: 'ST_Overlaps aniqlandi',
      change: 'Chegara tahriri talab etiladi',
      icon: <AlertTriangle className="w-5 h-5 text-[#DC2626]" />,
      alert: true,
    },
  ];

  // Dynamic conclusions throughput
  const timelineData = {
    week: [
      { day: 'Dush', conclusions: 5, checks: 12, uploads: 2 },
      { day: 'Sesh', conclusions: 7, checks: 15, uploads: 4 },
      { day: 'Chor', conclusions: 8, checks: 18, uploads: 3 },
      { day: 'Pay', conclusions: 6, checks: 14, uploads: 1 },
      { day: 'Jum', conclusions: 5, checks: 11, uploads: 2 },
      { day: 'Shan', conclusions: 2, checks: 6, uploads: 0 },
      { day: 'Yak', conclusions: 1, checks: 3, uploads: 0 },
    ],
    month: [
      { day: '1-hafta', conclusions: 24, checks: 58, uploads: 8 },
      { day: '2-hafta', conclusions: 31, checks: 72, uploads: 12 },
      { day: '3-hafta', conclusions: 36, checks: 84, uploads: 15 },
      { day: '4-hafta', conclusions: 41, checks: 92, uploads: 10 },
    ],
  };

  // GIS Layers distribution
  const layersDistribution = [
    { name: 'Oʻrmon fondi chegaralari', count: 1204, pct: 46.7, color: '#2E7D4F' },
    { name: 'Yaylov va pichanloq konturlari', count: 642, pct: 24.9, color: '#0284C7' },
    { name: 'Qizil kitob flora/fauna zonalari', count: 312, pct: 12.1, color: '#DC2626' },
    { name: 'Suv muhofaza mintaqalari', count: 240, pct: 9.3, color: '#0D9488' },
    { name: 'Ijara va maxsus uchastkalar', count: 180, pct: 7.0, color: '#D97706' },
  ];

  // Regions digitization area (BarChart)
  const regionAreaCoverage = [
    { region: 'Toshkent (Boʻstonliq)', area: 142.5, polygons: 450, fill: '#2E7D4F' },
    { region: 'Surxondaryo (Boysun)', area: 118.2, polygons: 380, fill: '#0284C7' },
    { region: 'Qashqadaryo (Kitob)', area: 96.4, polygons: 310, fill: '#10B981' },
    { region: 'Samarqand (Urgut)', area: 82.1, polygons: 260, fill: '#D97706' },
    { region: 'Jizzax (Zomin)', area: 68.4, polygons: 215, fill: '#7C3AED' },
  ];

  // Pending GIS conclusions queue
  const pendingQueue = [
    {
      appNo: 'А-00042',
      applicant: 'Aziz Karimov',
      contour: 'Boʻstonliq 14-2 (Yaylov)',
      area: '12.5 ga',
      type: 'Chorva molini boqish',
      status: 'Tekshirishga tayyor',
      validity: 'ST_IsValid (100%)',
      conflict: false,
    },
    {
      appNo: 'А-00040',
      applicant: '«Chorvachilik Servis» MCHJ',
      contour: 'Oqqoʻrgʻon 7-1 (Pichanloq)',
      area: '34.0 ga',
      type: 'Pichan oʻrish',
      status: 'Chegara kesishuvi',
      validity: 'ST_Overlaps (1.2% kesishuv)',
      conflict: true,
    },
    {
      appNo: 'А-00037',
      applicant: 'Shoira Umarova',
      contour: 'Boʻstonliq 21-6 (Rekreatsiya)',
      area: '8.0 ga',
      type: 'Ratsional dam olish',
      status: 'Zonaga mos',
      validity: 'Muhofaza zonasi chetida',
      conflict: false,
    },
  ];

  return (
    <div className="space-y-6 font-sans">
      {/* 1. Header with Breadcrumb & Quick Actions */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs flex flex-col xl:flex-row xl:items-center justify-between gap-5">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2E7D4F] bg-[#F0F7F1] px-3 py-1 rounded-full border border-[#D9EBDC] flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" /> 5-rol: gis_specialist
            </span>
            <span className="text-xs font-semibold text-[#5A646D] bg-[#F8F9FA] px-2.5 py-1 rounded-full border border-[#E4E7EA]">
              Oʻrmon loyiha instituti
            </span>
            <span className="text-xs font-medium text-[#0284C7] bg-[#F0F9FF] px-2.5 py-1 rounded-full border border-[#BAE6FD] flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#0284C7] animate-pulse" />
              Geo-fazoviy tahlil moduli faol
            </span>
          </div>
          <h1 className="text-xl font-extrabold text-[#1A1F24] tracking-tight">
            GIS Mutaxassisi — Geo-monitoring va Fazoviy Tahlil Paneli
          </h1>
          <p className="text-xs text-[#5A646D] leading-relaxed">
            13 ta GIS qatlamlari monitoringi, topologik kesishuvlar tahlili, arizalarga GIS xulosalari va qatlamlar importi
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-[#F8F9FA] border border-[#E4E7EA] p-1 rounded-xl flex items-center gap-1 text-xs font-semibold">
            <button
              onClick={() => setTimeRange('week')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                timeRange === 'week' ? 'bg-[#2E7D4F] text-white shadow-xs font-bold' : 'text-[#5A646D] hover:text-[#1A1F24]'
              }`}
            >
              Haftalik
            </button>
            <button
              onClick={() => setTimeRange('month')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                timeRange === 'month' ? 'bg-[#2E7D4F] text-white shadow-xs font-bold' : 'text-[#5A646D] hover:text-[#1A1F24]'
              }`}
            >
              Oylik
            </button>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            leftIcon={<RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-[#2E7D4F]' : ''}`} />}
            className="text-xs font-semibold"
          >
            Yangilash
          </Button>

          <Button
            variant="primary"
            size="sm"
            leftIcon={<Map className="w-4 h-4" />}
            onClick={() => onNavigate?.('gis_editor')}
            className="bg-[#2E7D4F] hover:bg-[#23653F] font-bold shadow-xs text-xs"
          >
            GIS Xarita muharriri
          </Button>
        </div>
      </div>

      {/* 2. Top KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi, idx) => (
          <div
            key={idx}
            className={`bg-white border rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-3 hover:shadow-md transition-all ${
              kpi.alert ? 'border-[#FECACA] bg-[#FEF2F2]/30' : 'border-[#E4E7EA] hover:border-[#7FB98A]'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-[#5A646D] uppercase tracking-wider block">{kpi.label}</span>
                <div className={`text-2xl font-black tracking-tight ${kpi.alert ? 'text-[#DC2626]' : 'text-[#1A1F24]'}`}>
                  {kpi.value}
                </div>
                <div className="text-xs text-[#5A646D] font-medium">{kpi.sub}</div>
              </div>
              <div className={`p-3 rounded-2xl shrink-0 ${kpi.alert ? 'bg-[#FEE2E2]' : 'bg-[#F0F7F1]'}`}>
                {kpi.icon}
              </div>
            </div>

            <div className="pt-2.5 border-t border-[#E4E7EA] flex items-center justify-between text-xs">
              <span className={`font-semibold flex items-center gap-1 ${kpi.alert ? 'text-[#DC2626]' : 'text-[#15803D]'}`}>
                {kpi.alert ? <AlertTriangle className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />} {kpi.change}
              </span>
              <ChevronRight className="w-4 h-4 text-[#9AA3AB]" />
            </div>
          </div>
        ))}
      </div>

      {/* 3. PRIMARY ROW: SPATIAL DYNAMICS CHART & 13 LAYERS DONUT */}
      <div className="grid grid-cols-1 xl:grid-cols-[1.75fr_1.25fr] gap-6">
        {/* CHART 1: GIS Conclusions Dynamics (AreaChart) */}
        <div className="bg-white border border-[#E4E7EA] rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E4E7EA] pb-3">
            <div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#2E7D4F]" />
                <h2 className="text-base font-bold text-[#1A1F24]">
                  GIS xulosalari va fazoviy tahlillar dinamikasi
                </h2>
              </div>
              <p className="text-xs text-[#5A646D] mt-0.5">
                Berilgan GIS xulosalari, ST_Intersects tekshiruvlari va yangi import qilingan poligonlar
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-[#2E7D4F] bg-[#F0F7F1] px-2.5 py-1 rounded-lg border border-[#D9EBDC]">
              Oʻrtacha tekshiruv: 1.4 kun
            </span>
          </div>

          <div className="w-full h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timelineData[timeRange]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gisConclusionsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2E7D4F" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#2E7D4F" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="gisChecksGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0284C7" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0284C7" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E4E7EA" vertical={false} />
                <XAxis dataKey="day" stroke="#767F87" fontSize={11} tickLine={false} />
                <YAxis stroke="#767F87" fontSize={11} tickLine={false} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-[#1A1F24] text-white p-3 rounded-xl shadow-lg text-xs space-y-1 font-sans">
                          <div className="font-bold text-[#7FB98A] border-b border-white/10 pb-1">{label}</div>
                          <div className="flex justify-between gap-4 pt-1">
                            <span className="text-emerald-300">Berilgan GIS xulosalari:</span>
                            <span className="font-mono font-bold">{payload[0]?.value} ta</span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <span className="text-sky-300">Fazoviy tekshiruvlar:</span>
                            <span className="font-mono font-bold">{payload[1]?.value} ta</span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="conclusions"
                  name="GIS xulosalari"
                  stroke="#2E7D4F"
                  strokeWidth={2.5}
                  fill="url(#gisConclusionsGrad)"
                />
                <Area
                  type="monotone"
                  dataKey="checks"
                  name="Fazoviy tekshiruvlar"
                  stroke="#0284C7"
                  strokeWidth={2}
                  fill="url(#gisChecksGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-[#E4E7EA] bg-[#F8F9FA] p-3 rounded-xl text-center text-xs">
            <div>
              <span className="text-[10px] font-bold uppercase text-[#767F87] block">Fazoviy soʻrovlar</span>
              <span className="text-sm font-extrabold text-[#1A1F24] font-mono">340 ta / davr</span>
            </div>
            <div className="border-x border-[#E4E7EA]">
              <span className="text-[10px] font-bold uppercase text-[#767F87] block">Aniqlik darajasi</span>
              <span className="text-sm font-extrabold text-[#2E7D4F] font-mono">99.8% (ST_IsValid)</span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-[#767F87] block">GeoServer javobi</span>
              <span className="text-sm font-extrabold text-[#0284C7] font-mono">68 ms (WMS)</span>
            </div>
          </div>
        </div>

        {/* CHART 2: 13 GIS Layers Donut Chart */}
        <div className="bg-white border border-[#E4E7EA] rounded-2xl p-5 sm:p-6 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#E4E7EA] pb-3">
              <div>
                <h2 className="text-base font-bold text-[#1A1F24] flex items-center gap-2">
                  <PieIcon className="w-5 h-5 text-[#2E7D4F]" /> 13 ta GIS qatlami taqsimoti
                </h2>
                <p className="text-xs text-[#5A646D] mt-0.5">
                  2 578 ta umumiy poligon va qatlamlar ulushi
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-[#0284C7] bg-[#F0F9FF] px-2.5 py-1 rounded-lg border border-[#BAE6FD]">
                13 ta qatlam
              </span>
            </div>

            <div className="relative w-full h-[180px] flex items-center justify-center my-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const d = payload[0].payload;
                        return (
                          <div className="bg-[#1A1F24] text-white p-2.5 rounded-xl shadow-lg text-xs space-y-0.5">
                            <div className="font-bold text-[#7FB98A]">{d.name}</div>
                            <div className="flex justify-between gap-3 font-mono">
                              <span>Poligonlar soni:</span>
                              <span className="font-bold text-white">{d.count} ta ({d.pct}%)</span>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Pie
                    data={layersDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={78}
                    paddingAngle={3}
                    dataKey="count"
                    onMouseEnter={(_, idx) => setActivePieIndex(idx)}
                    onMouseLeave={() => setActivePieIndex(null)}
                  >
                    {layersDistribution.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        stroke={activePieIndex === index ? '#1A1F24' : '#FFFFFF'}
                        strokeWidth={activePieIndex === index ? 2 : 1.5}
                        className="cursor-pointer transition-all"
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              <div className="absolute flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xl font-extrabold text-[#1A1F24] font-mono leading-none">
                  {activePieIndex !== null ? layersDistribution[activePieIndex].count : '2 578'}
                </span>
                <span className="text-[10px] font-semibold text-[#5A646D] mt-0.5">
                  {activePieIndex !== null ? 'poligon' : 'jami poligon'}
                </span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs max-h-[150px] overflow-y-auto pr-1">
              {layersDistribution.map((layer, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 rounded-lg bg-[#F8F9FA] hover:bg-[#F0F7F1] transition-colors"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: layer.color }} />
                    <span className="font-medium text-[#1A1F24] truncate">{layer.name}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 font-mono">
                    <span className="font-bold text-[#1A1F24]">{layer.count} ta</span>
                    <span className="text-[#5A646D] text-[11px]">({layer.pct}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2.5 border-t border-[#E4E7EA] flex items-center justify-between text-xs text-[#5A646D]">
            <span>Asosiy baza:</span>
            <span className="font-bold text-[#2E7D4F]">PostGIS + MinIO GeoServer</span>
          </div>
        </div>
      </div>

      {/* 4. SECOND ROW: REGIONS COVERAGE BAR CHART & GIS QUEUE */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* CHART 3: Regional Coverage BarChart */}
        <div className="bg-white border border-[#E4E7EA] rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#E4E7EA] pb-3">
            <div>
              <h2 className="text-base font-bold text-[#1A1F24] flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#2E7D4F]" /> Hududlar kesimida raqamlashtirish koʻlami (ming ga)
              </h2>
              <p className="text-xs text-[#5A646D] mt-0.5">
                Oʻrmon xoʻjaliklari boʻyicha raqamlashtirilgan poligonlar va yer maydonlari
              </p>
            </div>
            <span className="text-xs font-bold text-[#15803D] bg-[#F0FDF4] px-2.5 py-1 rounded-full border border-[#DCFCE7]">
              5 ta yetakchi DЎX
            </span>
          </div>

          <div className="w-full h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionAreaCoverage} margin={{ top: 10, right: 10, left: -15, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E4E7EA" vertical={false} />
                <XAxis
                  dataKey="region"
                  stroke="#767F87"
                  fontSize={10}
                  tickLine={false}
                  angle={-15}
                  textAnchor="end"
                  interval={0}
                />
                <YAxis stroke="#767F87" fontSize={11} tickLine={false} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload;
                      return (
                        <div className="bg-[#1A1F24] text-white p-3 rounded-xl shadow-lg text-xs space-y-1">
                          <div className="font-bold text-[#7FB98A]">{d.region}</div>
                          <div className="flex justify-between gap-4">
                            <span className="text-gray-300">Raqamlashtirilgan maydon:</span>
                            <span className="font-mono font-bold text-white">{d.area} ming ga</span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <span className="text-gray-300">Poligonlar soni:</span>
                            <span className="font-mono font-bold text-[#38BDF8]">{d.polygons} ta</span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="area" radius={[6, 6, 0, 0]}>
                  {regionAreaCoverage.map((entry, index) => (
                    <Cell key={`bar-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-2 border-t border-[#E4E7EA] flex items-center justify-between text-xs text-[#5A646D]">
            <span className="flex items-center gap-1.5 font-semibold text-[#1A1F24]">
              <MapPin className="w-4 h-4 text-[#2E7D4F]" /> Jami qamrov:
            </span>
            <span className="font-mono text-[#2E7D4F] font-bold">507.6 ming gektar</span>
          </div>
        </div>

        {/* GIS Queue and Spatial Checks */}
        <div className="bg-white border border-[#E4E7EA] rounded-2xl p-5 sm:p-6 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#E4E7EA] pb-3">
              <div>
                <h2 className="text-base font-bold text-[#1A1F24] flex items-center gap-2">
                  <Compass className="w-5 h-5 text-[#0284C7]" /> Fazoviy ekspertiza kutayotgan arizalar
                </h2>
                <p className="text-xs text-[#5A646D] mt-0.5">
                  Topologik tekshiruv va geobotanik meʼyorlarga solishtirish navbati
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate?.('leskhoz_inbox')}
                className="text-xs font-semibold"
              >
                Barchasi (24)
              </Button>
            </div>

            <div className="mt-3 space-y-2.5">
              {pendingQueue.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                    item.conflict
                      ? 'border-[#FCA5A5] bg-[#FEF2F2]/60 hover:bg-[#FEF2F2]'
                      : 'border-[#E4E7EA] bg-[#F8F9FA] hover:bg-white hover:border-[#7FB98A]'
                  }`}
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-[#1A1F24]">{item.appNo}</span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white border border-[#E4E7EA] text-[#5A646D]">
                        {item.type}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-[#1A1F24] truncate">{item.applicant}</div>
                    <div className="text-[11px] text-[#5A646D] flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-[#2E7D4F]" /> {item.contour} ({item.area})
                    </div>
                  </div>

                  <div className="text-right shrink-0 space-y-1">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full font-mono block ${
                        item.conflict ? 'bg-[#DC2626] text-white' : 'bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7]'
                      }`}
                    >
                      {item.validity}
                    </span>
                    <Button
                      variant="primary"
                      size="sm"
                      className="bg-[#0284C7] hover:bg-[#0369A1] text-[11px] h-7 px-2.5 font-bold"
                      onClick={() => onNavigate?.('gis_editor', { appNo: item.appNo })}
                    >
                      Xaritada tahlil <ChevronRight className="w-3 h-3 ml-0.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2.5 border-t border-[#E4E7EA] flex items-center justify-between text-xs text-[#5A646D]">
            <span>Fazoviy aniqlik:</span>
            <span className="font-mono text-[#15803D] font-bold">1:10 000 masshtab</span>
          </div>
        </div>
      </div>

      {/* 5. GIS MODULES QUICK SHORTCUTS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => onNavigate?.('gis_editor')}
          className="bg-white border border-[#E4E7EA] p-5 rounded-2xl shadow-xs hover:border-[#7FB98A] hover:shadow-md transition-all text-left flex items-center justify-between group cursor-pointer"
        >
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-[#F0F7F1] text-[#2E7D4F] rounded-xl group-hover:scale-105 transition-transform">
              <Map className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-[#1A1F24]">GIS Xarita Muharriri</div>
              <div className="text-xs text-[#5A646D]">Konturlarni tahrirlash va chizish</div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-[#9AA3AB] group-hover:text-[#2E7D4F] transition-colors" />
        </button>

        <button
          onClick={() => onNavigate?.('gis_import')}
          className="bg-white border border-[#E4E7EA] p-5 rounded-2xl shadow-xs hover:border-[#0284C7] hover:shadow-md transition-all text-left flex items-center justify-between group cursor-pointer"
        >
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-[#F0F9FF] text-[#0284C7] rounded-xl group-hover:scale-105 transition-transform">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-[#1A1F24]">Qatlamlar Importi</div>
              <div className="text-xs text-[#5A646D]">GeoJSON, Shapefile (SHP), KML yuklash</div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-[#9AA3AB] group-hover:text-[#0284C7] transition-colors" />
        </button>

        <button
          onClick={() => onNavigate?.('normative_norms')}
          className="bg-white border border-[#E4E7EA] p-5 rounded-2xl shadow-xs hover:border-[#7C3AED] hover:shadow-md transition-all text-left flex items-center justify-between group cursor-pointer"
        >
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-[#F5F3FF] text-[#7C3AED] rounded-xl group-hover:scale-105 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-[#1A1F24]">Meʼyor va Limitlar</div>
              <div className="text-xs text-[#5A646D]">Geobotanik sigʻim va tariflar</div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-[#9AA3AB] group-hover:text-[#7C3AED] transition-colors" />
        </button>
      </div>
    </div>
  );
};
