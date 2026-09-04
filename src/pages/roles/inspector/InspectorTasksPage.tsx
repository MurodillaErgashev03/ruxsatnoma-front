import React, { useState } from 'react';
import {
  QrCode,
  MapPin,
  WifiOff,
  Wifi,
  Camera,
  Navigation,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  FileText,
  ShieldCheck,
  TrendingUp,
  PieChart as PieIcon,
  BarChart3,
  RefreshCw,
  Clock,
  Layers,
  HardDriveDownload,
  Crosshair,
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

export interface InspectorTasksPageProps {
  onNavigate?: (page: string, params?: any) => void;
}

export const InspectorTasksPage: React.FC<InspectorTasksPageProps> = ({ onNavigate }) => {
  const [isOnline, setIsOnline] = useState(true);
  const [timeRange, setTimeRange] = useState<'week' | 'month'>('week');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Timeline inspection data
  const inspectionTimelineData = {
    week: [
      { day: 'Dush', inspected: 8, compliant: 7, violations: 1 },
      { day: 'Sesh', inspected: 10, compliant: 9, violations: 1 },
      { day: 'Chor', inspected: 9, compliant: 9, violations: 0 },
      { day: 'Pay', inspected: 12, compliant: 11, violations: 1 },
      { day: 'Jum', inspected: 11, compliant: 10, violations: 1 },
      { day: 'Shan', inspected: 5, compliant: 5, violations: 0 },
      { day: 'Yak', inspected: 2, compliant: 2, violations: 0 },
    ],
    month: [
      { day: '1-7 avg', inspected: 11, compliant: 10, violations: 1 },
      { day: '8-14 avg', inspected: 14, compliant: 13, violations: 1 },
      { day: '15-21 avg', inspected: 12, compliant: 11, violations: 1 },
      { day: '22-28 avg', inspected: 16, compliant: 15, violations: 1 },
      { day: '29-31 avg', inspected: 8, compliant: 8, violations: 0 },
    ],
  };

  // Violation & Compliance categories
  const actResultsDistribution = [
    { name: 'Muvofiq (Qoidabuzarlik yoʻq)', count: 38, pct: 79, color: '#2E7D4F' },
    { name: 'Meʼyordan ortiq chorva', count: 4, pct: 8, color: '#EF4444' },
    { name: 'Chegara buzilishi (Konflikt)', count: 3, pct: 6, color: '#F59E0B' },
    { name: 'Muddati oʻtgan ruxsatnoma', count: 2, pct: 4, color: '#DC2626' },
    { name: 'Boshqa kamchiliklar', count: 1, pct: 3, color: '#8B5CF6' },
  ];

  // Inspections by Forestry Sector
  const sectorInspectionsData = [
    { sector: 'Chimyon', inspections: 15, violations: 2, passRate: 87 },
    { sector: 'Burchmulla', inspections: 13, violations: 1, passRate: 92 },
    { sector: 'Chorbogʻ', inspections: 9, violations: 1, passRate: 89 },
    { sector: 'Piskom', inspections: 7, violations: 0, passRate: 100 },
    { sector: 'Sijjak', inspections: 4, violations: 0, passRate: 100 },
  ];

  const tasks = [
    {
      id: 'TASK-101',
      permitNo: 'RX-2026-0089',
      applicant: '«Burchmulla Agro» MCHJ',
      activity: 'Chorva mollarini boqish (45 bosh qoramol)',
      contour: 'Kontur №42 (Burchmulla, 4-boʻlim)',
      distanceKm: '1.2 km',
      status: 'pending',
      slaDue: 'Bugun 18:00 gacha',
      priority: 'high',
      areaHa: '41.0 ga',
    },
    {
      id: 'TASK-102',
      permitNo: 'RX-2026-0091',
      applicant: 'Saidov Otabek Shavkatovich',
      activity: 'Asalari uyalarini joylashtirish (50 ari oilasi)',
      contour: 'Kontur №15 (Zomin / Boʻstonliq)',
      distanceKm: '4.8 km',
      status: 'pending',
      slaDue: 'Ertaga 12:00 gacha',
      priority: 'medium',
      areaHa: '2.0 ga',
    },
    {
      id: 'TASK-103',
      permitNo: 'RX-2026-0077',
      applicant: '«Chorva Agro Lyuks» MCHJ',
      activity: 'Pichan oʻrish va chorva boqish',
      contour: 'Kontur №28 (Chimyon boʻlimi)',
      distanceKm: '7.5 km',
      status: 'pending',
      slaDue: '3 kun qoldi',
      priority: 'normal',
      areaHa: '35.0 ga',
    },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setToastMessage('GPS joylashuv, dalolatnomalar va topshiriqlar server bilan sinxronlandi');
      setTimeout(() => setToastMessage(null), 3000);
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-sans pb-16">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="p-4 bg-[#F0F7F1] border border-[#D9EBDC] text-[#2E7D4F] rounded-2xl shadow-sm flex items-center justify-between gap-3 animate-in fade-in duration-300">
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

      {/* 1. Header with Breadcrumb & Quick Actions */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs flex flex-col xl:flex-row xl:items-center justify-between gap-5">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2E7D4F] bg-[#F0F7F1] px-3 py-1 rounded-full border border-[#D9EBDC] flex items-center gap-1.5">
              <Crosshair className="w-3.5 h-3.5" /> 7-rol: inspector
            </span>
            <span className="text-xs font-semibold text-[#5A646D] bg-[#F8F9FA] px-2.5 py-1 rounded-full border border-[#E4E7EA]">
              Toshkent v. Boʻstonliq tumani inspeksiyasi
            </span>
            <span className="text-xs font-mono font-medium text-[#0284C7] bg-[#F0F9FF] px-2.5 py-1 rounded-full border border-[#BAE6FD] flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#0284C7] animate-pulse" />
              GPS: ±2.4 m aniqlik (Galileo/GLONASS)
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-[#1A1F24] tracking-tight">
            Tuman Inspektori Dala Topshiriqlari va Nazorat Muhiti
          </h1>
          <p className="text-xs text-[#5A646D] leading-relaxed">
            Inspektor: <b>Abdullayev Alisher Nabiyevich</b> · QR-kod skanerlash, geofencing, foto/video fiksatsiya va dalolatnomalar reyestri
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Online/Offline PWA Toggle */}
          <div className="bg-[#F8F9FA] border border-[#E4E7EA] px-3 py-1.5 rounded-xl flex items-center gap-2 text-xs">
            <div className={`p-1 rounded-lg text-white ${isOnline ? 'bg-[#15803D]' : 'bg-[#D97706]'}`}>
              {isOnline ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
            </div>
            <span className="font-semibold text-[#1A1F24]">
              {isOnline ? 'ONLAYN (Sync)' : 'OFFLAYN (Kesh)'}
            </span>
            <button
              onClick={() => setIsOnline(!isOnline)}
              className="text-[11px] font-bold text-[#2E7D4F] underline hover:text-[#23653F] cursor-pointer ml-1"
            >
              {isOnline ? 'Offlayn rejim' : 'Onlayn rejim'}
            </button>
          </div>

          {/* Time Range Toggle */}
          <div className="bg-[#F8F9FA] border border-[#E4E7EA] p-1 rounded-xl flex items-center gap-1 text-xs font-semibold">
            <button
              onClick={() => setTimeRange('week')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                timeRange === 'week' ? 'bg-[#2E7D4F] text-white shadow-xs font-bold' : 'text-[#5A646D] hover:text-[#1A1F24]'
              }`}
            >
              Haftalik
            </button>
            <button
              onClick={() => setTimeRange('month')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
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
            leftIcon={<RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#2E7D4F]' : ''}`} />}
            className="text-xs font-semibold"
          >
            Yangilash
          </Button>

          <Button
            variant="primary"
            size="sm"
            leftIcon={<QrCode className="w-4 h-4" />}
            onClick={() => onNavigate?.('field_scan')}
            className="bg-[#2E7D4F] hover:bg-[#23653F] text-white text-xs font-bold shadow-xs"
          >
            QR Skaner
          </Button>
        </div>
      </div>

      {/* 2. Top 4 Actionable Field Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E4E7EA] hover:border-[#7FB98A] p-5 rounded-2xl shadow-xs transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5A646D]">Bugungi Topshiriqlar</span>
            <span className="w-8 h-8 rounded-xl bg-[#D9EBDC] text-[#2E7D4F] flex items-center justify-center font-bold">
              {tasks.length}
            </span>
          </div>
          <div className="text-2xl font-black font-mono text-[#1A1F24] mt-2">{tasks.length} ta tekshiruv</div>
          <p className="text-[11px] text-[#5A646D] mt-1 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#B45309]" /> 1 ta shoshilinch SLA (bugun 18:00)
          </p>
        </div>

        <div className="bg-white border border-[#E4E7EA] hover:border-[#7FB98A] p-5 rounded-2xl shadow-xs transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5A646D]">Oʻtkazilgan Dala Tekshiruvlari</span>
            <span className="w-8 h-8 rounded-xl bg-[#DBEAFE] text-[#1D4ED8] flex items-center justify-center font-bold">
              48
            </span>
          </div>
          <div className="text-2xl font-black font-mono text-[#1D4ED8] mt-2">48 ta akt</div>
          <p className="text-[11px] text-[#15803D] mt-1 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> 91.7% muvofiq deb topilgan
          </p>
        </div>

        <div className="bg-white border border-[#FECACA] bg-[#FEF2F2]/30 p-5 rounded-2xl shadow-xs transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#991B1B]">Qoidabuzarliklar</span>
            <span className="w-8 h-8 rounded-xl bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center font-bold">
              4
            </span>
          </div>
          <div className="text-2xl font-black font-mono text-[#DC2626] mt-2">4 ta dalolatnoma</div>
          <p className="text-[11px] text-[#991B1B] mt-1 flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" /> Ruxsatnomani toʻxtatish tavsiya etildi
          </p>
        </div>

        <div className="bg-white border border-[#E4E7EA] hover:border-[#7FB98A] p-5 rounded-2xl shadow-xs transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5A646D]">Nazorat Maydoni</span>
            <Layers className="w-5 h-5 text-[#2E7D4F]" />
          </div>
          <div className="text-2xl font-black font-mono text-[#2E7D4F] mt-2">18 420 ga</div>
          <p className="text-[11px] text-[#5A646D] mt-1">Boʻstonliq 5 ta boʻlimi boʻyicha</p>
        </div>
      </div>

      {/* 3. DIAGRAMMATIC STATISTICS & CHARTS ROW */}
      <div className="space-y-6">
        {/* ROW 1: Field Inspection Dynamics (AreaChart) + Results Breakdown (Donut) */}
        <div className="grid grid-cols-1 xl:grid-cols-[1.75fr_1.25fr] gap-6">
          {/* Chart 1: Inspection Dynamics */}
          <div className="bg-white border border-[#E4E7EA] rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E4E7EA] pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#2E7D4F]" />
                  <h2 className="text-base font-bold text-[#1A1F24]">
                    Dala Tekshiruvlari va Muvofiqlik Dinamikasi
                  </h2>
                </div>
                <p className="text-xs text-[#5A646D] mt-0.5">
                  Inspektor tomonidan joyiga chiqib oʻtkazilgan tekshiruvlar va aniqlangan qoidabuzarliklar oqimi
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-[#2E7D4F] bg-[#F0F7F1] px-2.5 py-1 rounded-lg border border-[#D9EBDC] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Oʻrtacha vaqt: 38 daq
              </span>
            </div>

            <div className="w-full h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={inspectionTimelineData[timeRange]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="inspectTotalGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2E7D4F" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#2E7D4F" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="inspectCompliantGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0284C7" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#0284C7" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="inspectViolationGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EF4444" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#EF4444" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E4E7EA" vertical={false} />
                  <XAxis dataKey="day" stroke="#767F87" fontSize={11} tickLine={false} />
                  <YAxis stroke="#767F87" fontSize={11} tickLine={false} />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-[#1A1F24] text-white p-3 rounded-xl shadow-lg text-xs space-y-1.5 font-sans">
                            <div className="font-bold text-[#7FB98A] border-b border-white/10 pb-1">{label}</div>
                            <div className="flex justify-between gap-4">
                              <span className="text-emerald-300">Oʻtkazilgan tekshiruvlar:</span>
                              <span className="font-mono font-bold">{payload[0]?.value} ta</span>
                            </div>
                            <div className="flex justify-between gap-4">
                              <span className="text-sky-300">Qoidabuzarliksiz (Muvofiq):</span>
                              <span className="font-mono font-bold">{payload[1]?.value} ta</span>
                            </div>
                            <div className="flex justify-between gap-4">
                              <span className="text-rose-300">Qoidabuzarlik aniqlangan:</span>
                              <span className="font-mono font-bold">{payload[2]?.value} ta</span>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="inspected"
                    name="Jami tekshiruvlar"
                    stroke="#2E7D4F"
                    strokeWidth={2.5}
                    fill="url(#inspectTotalGrad)"
                  />
                  <Area
                    type="monotone"
                    dataKey="compliant"
                    name="Muvofiq"
                    stroke="#0284C7"
                    strokeWidth={2}
                    fill="url(#inspectCompliantGrad)"
                  />
                  <Area
                    type="monotone"
                    dataKey="violations"
                    name="Qoidabuzarlik"
                    stroke="#EF4444"
                    strokeWidth={1.5}
                    fill="url(#inspectViolationGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-[#E4E7EA] bg-[#F8F9FA] p-3 rounded-xl text-center text-xs">
              <div>
                <span className="text-[10px] font-bold uppercase text-[#767F87] block">Dala Rejasi Bajarilishi</span>
                <span className="text-sm font-extrabold text-[#1A1F24] font-mono">100% (48/48)</span>
              </div>
              <div className="border-x border-[#E4E7EA]">
                <span className="text-[10px] font-bold uppercase text-[#767F87] block">Muvofiqlik Darajasi</span>
                <span className="text-sm font-extrabold text-[#2E7D4F] font-mono">91.7%</span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-[#767F87] block">GPS Geofence Aniqligi</span>
                <span className="text-sm font-extrabold text-[#0284C7] font-mono">±2.4 metr</span>
              </div>
            </div>
          </div>

          {/* Chart 2: Act Results Donut */}
          <div className="bg-white border border-[#E4E7EA] rounded-2xl p-5 sm:p-6 shadow-xs space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[#E4E7EA] pb-3">
                <div>
                  <h2 className="text-base font-bold text-[#1A1F24] flex items-center gap-2">
                    <PieIcon className="w-5 h-5 text-[#2E7D4F]" /> Tekshiruv Dalolatnomalari Taqsimoti
                  </h2>
                  <p className="text-xs text-[#5A646D] mt-0.5">
                    48 ta tekshiruv dalolatnomasining xulosa toifalari
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-[#2E7D4F] bg-[#F0F7F1] px-2.5 py-1 rounded-lg border border-[#D9EBDC]">
                  48 ta akt
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
                                <span>Dalolatnomalar:</span>
                                <span className="font-bold text-white">{d.count} ta ({d.pct}%)</span>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Pie
                      data={actResultsDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={48}
                      outerRadius={72}
                      paddingAngle={3}
                      dataKey="count"
                    >
                      {actResultsDistribution.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>

                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xl font-black text-[#1A1F24] font-mono leading-none">48</span>
                  <span className="text-[10px] font-bold uppercase text-[#767F87] tracking-wider mt-0.5">Aktlar</span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-[#E4E7EA]">
              {actResultsDistribution.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs py-0.5">
                  <div className="flex items-center gap-2 truncate">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-[#5A646D] truncate">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-bold text-[#1A1F24] font-mono">{item.count} ta</span>
                    <span className="text-[11px] font-bold text-[#767F87] font-mono w-9 text-right">{item.pct}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ROW 2: Forestry Sectors Inspection Breakdown (BarChart) + Field Tools Quick Box */}
        <div className="grid grid-cols-1 xl:grid-cols-[1.85fr_1.15fr] gap-6">
          {/* Forestry Sectors Inspections BarChart */}
          <div className="bg-white border border-[#E4E7EA] rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E4E7EA] pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#2E7D4F]" />
                  <h2 className="text-base font-bold text-[#1A1F24]">
                    Oʻrmon Boʻlimlari Kesimida Tekshiruvlar va Aniqlangan Qoidabuzarliklar
                  </h2>
                </div>
                <p className="text-xs text-[#5A646D] mt-0.5">
                  Boʻstonliq DЎX oʻrmon boʻlimlari boʻyicha oʻtkazilgan reydlar va qoidabuzarlik holatlari
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-[#5A646D]">
                  <span className="w-3 h-3 rounded bg-[#3B82F6]" /> Tekshiruvlar
                </span>
                <span className="flex items-center gap-1.5 text-[#5A646D]">
                  <span className="w-3 h-3 rounded bg-[#EF4444]" /> Qoidabuzarlik
                </span>
              </div>
            </div>

            <div className="w-full h-[230px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sectorInspectionsData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E4E7EA" vertical={false} />
                  <XAxis dataKey="sector" stroke="#767F87" fontSize={11} tickLine={false} />
                  <YAxis stroke="#767F87" fontSize={11} tickLine={false} />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        const d = payload[0].payload;
                        return (
                          <div className="bg-[#1A1F24] text-white p-3 rounded-xl shadow-lg text-xs space-y-1 font-sans">
                            <div className="font-bold text-[#7FB98A] border-b border-white/10 pb-1">{label} boʻlimi</div>
                            <div className="flex justify-between gap-4 pt-1">
                              <span className="text-sky-300">Oʻtkazilgan tekshiruvlar:</span>
                              <span className="font-mono font-bold">{d.inspections} ta</span>
                            </div>
                            <div className="flex justify-between gap-4">
                              <span className="text-rose-300">Aniqlangan qoidabuzarliklar:</span>
                              <span className="font-mono font-bold text-rose-300">{d.violations} ta</span>
                            </div>
                            <div className="flex justify-between gap-4 border-t border-white/10 pt-1 text-[11px]">
                              <span className="text-emerald-300">Muvofiqlik koʻrsatkichi:</span>
                              <span className="font-mono font-bold text-emerald-300">{d.passRate}%</span>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="inspections" name="Tekshiruvlar" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="violations" name="Qoidabuzarlik" fill="#EF4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 border-t border-[#E4E7EA] text-center text-xs">
              {sectorInspectionsData.map((sec, idx) => (
                <div key={idx} className="bg-[#F8F9FA] p-2 rounded-xl">
                  <span className="text-[11px] font-bold text-[#1A1F24] block">{sec.sector}</span>
                  <span className="text-[10px] text-[#5A646D]">{sec.inspections} ta tekshiruv</span>
                  <div className={`text-[11px] font-mono font-bold mt-0.5 ${sec.violations > 0 ? 'text-[#DC2626]' : 'text-[#2E7D4F]'}`}>
                    {sec.violations > 0 ? `${sec.violations} ta qoidabuzarlik` : '0 qoidabuzarlik'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Field Tools & Offline PWA Sync Status */}
          <div className="bg-white border border-[#E4E7EA] rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#E4E7EA] pb-3">
                <div className="flex items-center gap-2">
                  <Camera className="w-5 h-5 text-[#2E7D4F]" />
                  <h2 className="text-base font-bold text-[#1A1F24]">Dala Asboblari va PWA</h2>
                </div>
                <span className="text-[11px] font-bold text-[#2E7D4F] bg-[#F0F7F1] px-2 py-0.5 rounded border border-[#D9EBDC]">
                  TZ C15
                </span>
              </div>

              {/* Quick Action Camera Scanner CTA */}
              <div className="bg-[#123522] text-white p-4 rounded-2xl shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#7FB98A] uppercase">Joyida Tekshirish</span>
                    <div className="text-sm font-bold">QR-Kod va Joylashuv</div>
                  </div>
                  <div className="p-2 bg-[#2E7D4F] rounded-xl">
                    <Camera className="w-5 h-5 text-white" />
                  </div>
                </div>
                <Button
                  variant="success"
                  fullWidth
                  size="sm"
                  leftIcon={<QrCode className="w-4 h-4" />}
                  onClick={() => onNavigate?.('field_scan')}
                  className="bg-[#2E7D4F] hover:bg-[#23653F] text-white font-bold text-xs"
                >
                  Kamera Bilan Skanerlash (Scan QR)
                </Button>
              </div>

              <div className="space-y-2">
                <div className="p-3 bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <HardDriveDownload className="w-4 h-4 text-[#0284C7]" />
                    <span className="text-[#5A646D]">Lokal keshdagi ruxsatnomalar:</span>
                  </div>
                  <b className="font-mono text-[#1A1F24]">18 ta (Offline faol)</b>
                </div>

                <div className="p-3 bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#2E7D4F]" />
                    <span className="text-[#5A646D]">GPS geofencing tekshiruvi:</span>
                  </div>
                  <b className="text-[#2E7D4F] flex items-center gap-1 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" /> ST_Within faol
                  </b>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#E4E7EA] flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                fullWidth
                leftIcon={<FileText className="w-3.5 h-3.5" />}
                onClick={() => onNavigate?.('inspection_acts')}
                className="text-xs font-semibold"
              >
                Barcha Dalolatnomalar Reyestri
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bugungi Dala Topshiriqlari Navbati */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E4E7EA] pb-3">
          <div>
            <h3 className="text-base font-bold text-[#1A1F24] flex items-center gap-2">
              <Crosshair className="w-4 h-4 text-[#2E7D4F]" /> Bugungi Dala Topshiriqlari Navbati
            </h3>
            <p className="text-xs text-[#5A646D] mt-0.5">
              Reja asosidagi va xavf tahlili boʻyicha biriktirilgan ruxsatnomalarni joyida tekshirish
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-[#2E7D4F] bg-[#F0F7F1] px-2.5 py-1 rounded-lg border border-[#D9EBDC]">
            {tasks.length} ta navbatda
          </span>
        </div>

        <div className="space-y-3">
          {tasks.map((t) => (
            <div
              key={t.id}
              className="bg-[#F8F9FA] border border-[#E4E7EA] rounded-2xl p-5 shadow-xs space-y-3 hover:border-[#7FB98A] hover:bg-white transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E4E7EA] pb-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-sm font-bold text-[#1D4ED8] bg-[#EFF6FF] px-2.5 py-0.5 rounded border border-[#DBEAFE]">
                    {t.permitNo}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      t.priority === 'high'
                        ? 'bg-[#FEF2F2] text-[#991B1B] border border-[#FECACA]'
                        : 'bg-[#F0F7F1] text-[#2E7D4F] border border-[#D9EBDC]'
                    }`}
                  >
                    SLA: {t.slaDue}
                  </span>
                  <span className="text-xs font-mono text-[#5A646D] bg-white px-2 py-0.5 rounded border border-[#E4E7EA]">
                    {t.areaHa}
                  </span>
                </div>
                <span className="text-xs font-mono text-[#5A646D] flex items-center gap-1.5 font-bold">
                  <Navigation className="w-3.5 h-3.5 text-[#0284C7]" /> Masofa: {t.distanceKm}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                <div>
                  <div className="font-bold text-[#1A1F24] text-sm">{t.applicant}</div>
                  <div className="text-[#5A646D] mt-0.5">{t.activity}</div>
                </div>
                <div className="text-[#5A646D] flex items-center gap-1 md:justify-end">
                  <MapPin className="w-3.5 h-3.5 text-[#2E7D4F] shrink-0" />
                  <span>{t.contour}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-end gap-2 border-t border-[#E4E7EA]/60">
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Layers className="w-3.5 h-3.5 text-[#0284C7]" />}
                  onClick={() => onNavigate?.('gis_editor')}
                  className="text-xs"
                >
                  Xaritada koʻrish
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  onClick={() => onNavigate?.('field_inspection', { permitNo: t.permitNo })}
                  className="bg-[#2E7D4F] hover:bg-[#23653F] text-white font-bold text-xs"
                >
                  Dalolatnoma Tuzish
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InspectorTasksPage;
