import React, { useState } from 'react';
import {
  Shield,
  Server,
  Users,
  Activity,
  CheckCircle2,
  Building2,
  Database,
  Sliders,
  Megaphone,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  HardDrive,
  Globe2,
  RefreshCw,
  Clock,
  PieChart as PieIcon,
  BarChart3,
  Radio,
  Cpu,
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

export interface AdminSettingsPageProps {
  onNavigate?: (page: string, params?: any) => void;
}

type TimeRange = 'today' | 'week' | 'month' | 'year';

export const AdminSettingsPage: React.FC<AdminSettingsPageProps> = ({ onNavigate }) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('today');
  const [activeMetric, setActiveMetric] = useState<'requests' | 'latency' | 'both'>('both');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activePieIndex, setActivePieIndex] = useState<number | null>(null);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  // 1. Time-range datasets for Area & Line Chart
  const timeSeriesData: Record<TimeRange, any[]> = {
    today: [
      { time: '00:00', requests: 4200, latency: 26, cpu: 14, success: 4195, error: 5 },
      { time: '03:00', requests: 1800, latency: 22, cpu: 10, success: 1798, error: 2 },
      { time: '06:00', requests: 3100, latency: 24, cpu: 16, success: 3096, error: 4 },
      { time: '09:00', requests: 18400, latency: 42, cpu: 38, success: 18385, error: 15 },
      { time: '12:00', requests: 24600, latency: 48, cpu: 48, success: 24578, error: 22 },
      { time: '15:00', requests: 28900, latency: 52, cpu: 56, success: 28872, error: 28 },
      { time: '18:00', requests: 19800, latency: 41, cpu: 42, success: 19782, error: 18 },
      { time: '21:00', requests: 12400, latency: 35, cpu: 28, success: 12390, error: 10 },
      { time: '23:59', requests: 6800, latency: 28, cpu: 18, success: 6794, error: 6 },
    ],
    week: [
      { time: 'Dushanba', requests: 138000, latency: 41, cpu: 42, success: 137880, error: 120 },
      { time: 'Seshanba', requests: 145000, latency: 43, cpu: 46, success: 144860, error: 140 },
      { time: 'Chorshanba', requests: 152000, latency: 46, cpu: 50, success: 151840, error: 160 },
      { time: 'Payshanba', requests: 148000, latency: 44, cpu: 48, success: 147850, error: 150 },
      { time: 'Juma', requests: 142800, latency: 42, cpu: 47, success: 142670, error: 130 },
      { time: 'Shanba', requests: 64000, latency: 32, cpu: 22, success: 63960, error: 40 },
      { time: 'Yakshanba', requests: 42000, latency: 28, cpu: 16, success: 41980, error: 20 },
    ],
    month: [
      { time: '1-hafta', requests: 780000, latency: 39, cpu: 38, success: 779200, error: 800 },
      { time: '2-hafta', requests: 840000, latency: 41, cpu: 42, success: 839100, error: 900 },
      { time: '3-hafta', requests: 890000, latency: 44, cpu: 45, success: 889050, error: 950 },
      { time: '4-hafta', requests: 910000, latency: 43, cpu: 48, success: 909000, error: 1000 },
    ],
    year: [
      { time: 'Yan', requests: 1800000, latency: 36, cpu: 30, success: 1798000, error: 2000 },
      { time: 'Fev', requests: 2100000, latency: 38, cpu: 34, success: 2097800, error: 2200 },
      { time: 'Mar', requests: 2600000, latency: 40, cpu: 40, success: 2597000, error: 3000 },
      { time: 'Apr', requests: 3100000, latency: 43, cpu: 45, success: 3096500, error: 3500 },
      { time: 'May', requests: 3420000, latency: 45, cpu: 48, success: 3416000, error: 4000 },
      { time: 'Iyun', requests: 3800000, latency: 46, cpu: 52, success: 3795500, error: 4500 },
      { time: 'Iyul', requests: 3950000, latency: 47, cpu: 54, success: 3945000, error: 5000 },
      { time: 'Avg', requests: 3600000, latency: 44, cpu: 49, success: 3595600, error: 4400 },
      { time: 'Sen', requests: 3420000, latency: 42, cpu: 47, success: 3416000, error: 4000 },
      { time: 'Okt', requests: 3100000, latency: 40, cpu: 43, success: 3096500, error: 3500 },
      { time: 'Noy', requests: 2800000, latency: 39, cpu: 38, success: 2797000, error: 3000 },
      { time: 'Dek', requests: 2400000, latency: 37, cpu: 35, success: 2397500, error: 2500 },
    ],
  };

  // 2. 10 Roles Distribution Data for Donut Chart & Breakdown
  const rolesDistribution = [
    { name: 'Ariza beruvchilar (Jismoniy & Yuridik)', code: 'applicant', value: 8620, pct: 82.4, color: '#2E7D4F', online: 184 },
    { name: 'Ijrochi tashkilot (DЎX) xodimlari', code: 'executor_staff', value: 680, pct: 6.5, color: '#0284C7', online: 38 },
    { name: 'Hududiy inspektorlar', code: 'inspector', value: 412, pct: 3.9, color: '#D97706', online: 22 },
    { name: 'Agentlik rahbariyati', code: 'management', value: 120, pct: 1.1, color: '#7C3AED', online: 6 },
    { name: 'GIS mutaxassislari', code: 'gis_specialist', value: 94, pct: 0.9, color: '#10B981', online: 5 },
    { name: 'Buxgalterlar', code: 'accountant', value: 86, pct: 0.8, color: '#EA580C', online: 4 },
    { name: 'Ijrochi rahbarlar (Direktorlar)', code: 'executor_head', value: 84, pct: 0.8, color: '#3B82F6', online: 5 },
    { name: 'Markaziy apparat', code: 'central_admin', value: 74, pct: 0.7, color: '#6366F1', online: 3 },
    { name: 'Prokuratura organlari', code: 'prosecutor', value: 64, pct: 0.6, color: '#DC2626', online: 2 },
    { name: 'Tizim administratorlari', code: 'sys_admin', value: 12, pct: 0.1, color: '#14B8A6', online: 1 },
  ];

  // 3. Integrations Bar Chart Data
  const integrationsBarData = [
    { name: 'OneID', reqs: 28410, latency: 34, uptime: 100, fill: '#2E7D4F' },
    { name: 'GIS GeoServer', reqs: 45100, latency: 68, uptime: 99.9, fill: '#0284C7' },
    { name: 'E-IMZO', reqs: 14230, latency: 45, uptime: 100, fill: '#10B981' },
    { name: 'Billing / Munis', reqs: 8640, latency: 52, uptime: 99.9, fill: '#D97706' },
    { name: 'IIV Pasport', reqs: 7350, latency: 48, uptime: 99.9, fill: '#7C3AED' },
    { name: 'Soliq (STIR)', reqs: 6820, latency: 55, uptime: 99.9, fill: '#EC4899' },
    { name: 'cs.egov NSI', reqs: 3120, latency: 28, uptime: 100, fill: '#14B8A6' },
    { name: 'Raqamli nazorat', reqs: 1240, latency: 41, uptime: 100, fill: '#F59E0B' },
  ];

  // 4. Server Hardware Gauges
  const serverGauges = [
    { label: 'CPU Yuklamasi', value: 24, max: 100, unit: '%', status: 'Optimal', color: '#2E7D4F', icon: <Cpu className="w-4 h-4" /> },
    { label: 'RAM Xotira', value: 58, max: 100, unit: '%', status: '37.1 / 64 GB', color: '#0284C7', icon: <Activity className="w-4 h-4" /> },
    { label: 'Disk Saqlash', value: 16.9, max: 100, unit: '%', status: '186 GB / 1.1 TB', color: '#7C3AED', icon: <HardDrive className="w-4 h-4" /> },
    { label: 'Uptime (24h)', value: 99.98, max: 100, unit: '%', status: '100% onlayn', color: '#10B981', icon: <Server className="w-4 h-4" /> },
  ];

  // 5. Storage Distribution Breakdown
  const storageData = [
    { name: 'PostgreSQL DB', value: 48.2, total: 200, color: '#2E7D4F', pct: 24.1 },
    { name: 'MinIO GIS S3', value: 92.4, total: 500, color: '#0284C7', pct: 18.5 },
    { name: 'WORM Audit', value: 21.8, total: 150, color: '#D97706', pct: 14.5 },
    { name: 'Zaxiralar (ZFS)', value: 24.0, total: 250, color: '#7C3AED', pct: 9.6 },
  ];

  // 6. Administration Modules (TZ 4.2.1.1 - 4.2.1.7)
  const adminModules = [
    { page: 'admin_users', tzCode: '4.2.1.1', title: 'Foydalanuvchilar', metric: '10 457 ta', icon: <Users className="w-5 h-5" /> },
    { page: 'admin_roles', tzCode: '4.2.1.2', title: 'Rollar va huquqlar', metric: '10 ta rol', icon: <Shield className="w-5 h-5" /> },
    { page: 'admin_orgs', tzCode: '4.2.1.3', title: 'Tashkilotlar ierarxiyasi', metric: '84 ta DЎX', icon: <Building2 className="w-5 h-5" /> },
    { page: 'admin_classifiers', tzCode: '4.2.1.4', title: 'Klassifikatorlar (NSI)', metric: '14 ta NSI', icon: <Sliders className="w-5 h-5" /> },
    { page: 'admin_backups', tzCode: '4.2.1.5', title: 'Zahiraviy nusxalash', metric: '42 ta nusxa', icon: <Database className="w-5 h-5" /> },
    { page: 'admin_audit_logs', tzCode: '4.2.1.6', title: 'Monitoring va jurnallar', metric: '9 ta jurnal', icon: <Shield className="w-5 h-5" /> },
    { page: 'admin_announcements', tzCode: '4.2.1.7', title: 'Eʼlon va xabarnomalar', metric: '4 ta faol', icon: <Megaphone className="w-5 h-5" /> },
    { page: 'admin_system_settings', tzCode: '4.2.1', title: 'Tizim sozlamalari', metric: 'BHM 375k', icon: <Sliders className="w-5 h-5" /> },
  ];

  const recentAudit = [
    { time: '13:08:42', user: 'Ergashov Sardor', role: 'sys_admin', action: 'Tizim sozlamalari yangilandi (BHM)', ip: '172.16.4.12', status: 'Muvaffaqiyatli' },
    { time: '12:45:10', user: 'Yusupov Bobur', role: 'gis_specialist', action: 'Boʻstonliq 14-kontur GIS qatlami yuklandi', ip: '172.16.4.45', status: 'Muvaffaqiyatli' },
    { time: '11:30:05', user: 'Zahira demoni', role: 'SYSTEM', action: 'Toshkent-Node01 MBBT toʻliq zaxira nusxasi olindi (4.2 GB)', ip: '127.0.0.1', status: 'Muvaffaqiyatli' },
    { time: '10:15:22', user: 'Abdullayev Alisher', role: 'inspector', action: 'ACT-2026-088 dalolatnomasi E-IMZO bilan imzolandi', ip: '172.16.8.99', status: 'Muvaffaqiyatli' },
    { time: '09:40:11', user: 'Tashpulatova Nodira', role: 'management', action: 'RX-2026-0042 ruxsatnoma arizasi tasdiqlandi', ip: '172.16.2.15', status: 'Muvaffaqiyatli' },
  ];

  return (
    <div className="space-y-6 font-sans">
      {/* 1. Header with Breadcrumbs & Time Controls */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs flex flex-col xl:flex-row xl:items-center justify-between gap-5">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2E7D4F] bg-[#F0F7F1] px-3 py-1 rounded-full border border-[#D9EBDC] flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" /> 1-rol: sys_admin
            </span>
            <span className="text-xs font-semibold text-[#5A646D] bg-[#F8F9FA] px-2.5 py-1 rounded-full border border-[#E4E7EA]">
              Maʼmurlash subtizimi (4.2.1)
            </span>
            <div className="flex items-center gap-1.5 text-xs text-[#15803D] font-medium bg-[#F0FDF4] px-2.5 py-1 rounded-full border border-[#DCFCE7]">
              <Radio className="w-3 h-3 text-[#15803D] animate-pulse" />
              <span>Jonli telemetriya faol</span>
            </div>
          </div>
          <h1 className="text-xl font-extrabold text-[#1A1F24] tracking-tight">
            Tizim Administratori Boshqaruv va Monitoring Paneli
          </h1>
          <p className="text-xs text-[#5A646D] leading-relaxed">
            Infratuzilma unumdorligi, 10 ta rol statistikasi, tashqi integratsiyalar trafigi va MBBT telemetriyasi
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-[#F8F9FA] border border-[#E4E7EA] p-1 rounded-xl flex items-center gap-1 text-xs font-semibold">
            {(
              [
                { key: 'today', label: 'Bugun (24s)' },
                { key: 'week', label: '7 kun' },
                { key: 'month', label: '30 kun' },
                { key: 'year', label: '2026 yil' },
              ] as const
            ).map((t) => (
              <button
                key={t.key}
                onClick={() => setTimeRange(t.key)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  timeRange === t.key
                    ? 'bg-[#2E7D4F] text-white shadow-xs font-bold'
                    : 'text-[#5A646D] hover:text-[#1A1F24] hover:bg-white'
                }`}
              >
                {t.label}
              </button>
            ))}
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
            leftIcon={<Users className="w-4 h-4" />}
            onClick={() => onNavigate?.('admin_users')}
            className="bg-[#2E7D4F] hover:bg-[#23653F] font-bold shadow-xs text-xs"
          >
            Foydalanuvchilar
          </Button>
        </div>
      </div>

      {/* 2. Top Hardware Gauges & Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {serverGauges.map((g, idx) => (
          <div
            key={idx}
            className="bg-white border border-[#E4E7EA] p-5 rounded-2xl shadow-xs flex items-center justify-between hover:border-[#7FB98A] transition-all"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-[#5A646D] uppercase tracking-wider">
                <span className="p-1.5 rounded-lg bg-[#F0F7F1] text-[#2E7D4F]">{g.icon}</span>
                <span>{g.label}</span>
              </div>
              <div className="text-2xl font-black text-[#1A1F24] font-mono">
                {g.value}
                <span className="text-sm font-normal text-[#5A646D] ml-0.5">{g.unit}</span>
              </div>
              <div className="text-xs font-semibold text-[#15803D] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> {g.status}
              </div>
            </div>

            {/* Circular Gauge Preview */}
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="14" fill="none" stroke="#E4E7EA" strokeWidth="3.5" />
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  stroke={g.color}
                  strokeWidth="3.5"
                  strokeDasharray={`${(g.value / g.max) * 88} 88`}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute text-[11px] font-bold font-mono text-[#1A1F24]">
                {Math.round(g.value)}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 3. PRIMARY ROW: AREA DYNAMICS CHART & 10 ROLES DONUT CHART */}
      <div className="grid grid-cols-1 xl:grid-cols-[1.8fr_1.2fr] gap-6">
        {/* CHART 1: Dynamic Telemetry (AreaChart) */}
        <div className="bg-white border border-[#E4E7EA] rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E4E7EA] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#2E7D4F]" />
                <h2 className="text-base font-bold text-[#1A1F24]">
                  Server yuklamasi va API soʻrovlari dinamikasi
                </h2>
              </div>
              <p className="text-xs text-[#5A646D] mt-0.5">
                Vaqt kesimida tushgan soʻrovlar hajmi, tarmoq kechikish vaqti (latency) va muvaffaqiyat foizi
              </p>
            </div>

            {/* Filter buttons for the chart */}
            <div className="flex items-center gap-1 bg-[#F8F9FA] p-1 rounded-xl border border-[#E4E7EA] text-xs font-semibold">
              <button
                onClick={() => setActiveMetric('both')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  activeMetric === 'both' ? 'bg-[#2E7D4F] text-white shadow-xs font-bold' : 'text-[#5A646D] hover:text-[#1A1F24]'
                }`}
              >
                Barchasi
              </button>
              <button
                onClick={() => setActiveMetric('requests')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  activeMetric === 'requests' ? 'bg-[#0284C7] text-white shadow-xs font-bold' : 'text-[#5A646D] hover:text-[#1A1F24]'
                }`}
              >
                Soʻrovlar
              </button>
              <button
                onClick={() => setActiveMetric('latency')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  activeMetric === 'latency' ? 'bg-[#D97706] text-white shadow-xs font-bold' : 'text-[#5A646D] hover:text-[#1A1F24]'
                }`}
              >
                Javob (ms)
              </button>
            </div>
          </div>

          {/* Recharts Area Chart Container */}
          <div className="w-full h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timeSeriesData[timeRange]} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <defs>
                  <linearGradient id="reqGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2E7D4F" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#2E7D4F" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="latGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0284C7" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0284C7" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E4E7EA" vertical={false} />
                <XAxis dataKey="time" stroke="#767F87" fontSize={11} tickLine={false} />
                <YAxis
                  yAxisId="left"
                  stroke="#767F87"
                  fontSize={11}
                  tickLine={false}
                  tickFormatter={(val) => (val >= 1000000 ? `${(val / 1000000).toFixed(1)}M` : val >= 1000 ? `${val / 1000}k` : val)}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="#D97706"
                  fontSize={11}
                  tickLine={false}
                  tickFormatter={(val) => `${val}ms`}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-[#1A1F24] text-white p-3 rounded-xl shadow-xl text-xs space-y-1.5 border border-white/10 font-sans">
                          <div className="font-bold text-[#7FB98A] flex items-center justify-between gap-4 border-b border-white/10 pb-1">
                            <span>Vaqt: {label}</span>
                            <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-mono">2026</span>
                          </div>
                          <div className="space-y-1 pt-0.5">
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-gray-300">API Soʻrovlari:</span>
                              <span className="font-bold font-mono text-white">
                                {payload[0]?.value?.toLocaleString()} ta
                              </span>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-gray-300">Oʻrtacha javob vaqti:</span>
                              <span className="font-bold font-mono text-[#FBBF24]">
                                {payload[1]?.value} ms
                              </span>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-gray-300">Server CPU:</span>
                              <span className="font-bold font-mono text-[#38BDF8]">
                                {payload[0]?.payload?.cpu}%
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                {(activeMetric === 'both' || activeMetric === 'requests') && (
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="requests"
                    name="API Soʻrovlari"
                    stroke="#2E7D4F"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#reqGradient)"
                  />
                )}
                {(activeMetric === 'both' || activeMetric === 'latency') && (
                  <Area
                    yAxisId="right"
                    type="monotone"
                    dataKey="latency"
                    name="Kechikish (ms)"
                    stroke="#D97706"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    fillOpacity={1}
                    fill="url(#latGradient)"
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Metric Bottom Footnotes */}
          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-[#E4E7EA] bg-[#F8F9FA] p-3 rounded-xl text-center">
            <div>
              <span className="text-[10px] font-bold uppercase text-[#767F87] block">Tanlangan davr jami</span>
              <span className="text-sm font-extrabold text-[#1A1F24] font-mono">142 800 ta soʻrov</span>
            </div>
            <div className="border-x border-[#E4E7EA]">
              <span className="text-[10px] font-bold uppercase text-[#767F87] block">Oʻrtacha javob tezligi</span>
              <span className="text-sm font-extrabold text-[#2E7D4F] font-mono">42 ms (A’lo)</span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-[#767F87] block">Maksimal oqim (Peak)</span>
              <span className="text-sm font-extrabold text-[#0284C7] font-mono">382 req/sek</span>
            </div>
          </div>
        </div>

        {/* CHART 2: 10 Roles Donut Chart & Distribution */}
        <div className="bg-white border border-[#E4E7EA] rounded-2xl p-5 sm:p-6 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#E4E7EA] pb-3">
              <div>
                <h2 className="text-base font-bold text-[#1A1F24] flex items-center gap-2">
                  <PieIcon className="w-5 h-5 text-[#2E7D4F]" /> 10 ta rol boʻyicha taqsimot
                </h2>
                <p className="text-xs text-[#5A646D] mt-0.5">
                  10 457 ta foydalanuvchining rollar kesimidagi doiraviy diagrammasi
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-[#2E7D4F] bg-[#F0F7F1] px-2.5 py-1 rounded-lg border border-[#D9EBDC]">
                268 onlayn
              </span>
            </div>

            {/* Recharts Donut Pie Chart with Centered Total */}
            <div className="relative w-full h-[190px] flex items-center justify-center my-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-[#1A1F24] text-white p-2.5 rounded-xl shadow-lg text-xs space-y-1">
                            <div className="font-bold text-[#7FB98A]">{data.name}</div>
                            <div className="flex items-center justify-between gap-3 text-gray-200">
                              <span>Akkauntlar:</span>
                              <span className="font-mono font-bold">{data.value.toLocaleString()} ta ({data.pct}%)</span>
                            </div>
                            <div className="flex items-center justify-between gap-3 text-emerald-400">
                              <span>Hozir onlayn:</span>
                              <span className="font-mono font-bold">{data.online} nafar</span>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Pie
                    data={rolesDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={82}
                    paddingAngle={3}
                    dataKey="value"
                    onMouseEnter={(_, index) => setActivePieIndex(index)}
                    onMouseLeave={() => setActivePieIndex(null)}
                  >
                    {rolesDistribution.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        stroke={activePieIndex === index ? '#1A1F24' : '#FFFFFF'}
                        strokeWidth={activePieIndex === index ? 2 : 1.5}
                        className="transition-all cursor-pointer"
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              {/* Absolute Center Counter */}
              <div className="absolute flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xl font-extrabold text-[#1A1F24] font-mono leading-none">
                  {activePieIndex !== null ? rolesDistribution[activePieIndex].value.toLocaleString() : '10 457'}
                </span>
                <span className="text-[10px] font-semibold text-[#5A646D] mt-0.5">
                  {activePieIndex !== null ? rolesDistribution[activePieIndex].code : 'jami akkaunt'}
                </span>
              </div>
            </div>

            {/* Top 5 Key Roles Mini-Badges */}
            <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-1 text-xs">
              {rolesDistribution.map((role) => (
                <div
                  key={role.code}
                  className="flex items-center justify-between p-2 rounded-lg bg-[#F8F9FA] hover:bg-[#F0F7F1] transition-colors"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: role.color }} />
                    <span className="font-medium text-[#1A1F24] truncate">{role.name}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 font-mono">
                    <span className="font-bold text-[#1A1F24]">{role.value.toLocaleString()}</span>
                    <span className="text-[#5A646D] text-[11px]">({role.pct}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Authentication methods breakdown footer */}
          <div className="pt-2.5 border-t border-[#E4E7EA] flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="font-bold text-[#1A1F24]">Kirish usullari:</span>
            <div className="flex items-center gap-2 text-[11px] font-medium font-mono">
              <span className="text-[#0284C7] bg-[#F0F9FF] px-2 py-0.5 rounded border border-[#BAE6FD]">
                OneID: 78.2%
              </span>
              <span className="text-[#2E7D4F] bg-[#F0F7F1] px-2 py-0.5 rounded border border-[#D9EBDC]">
                E-IMZO: 18.1%
              </span>
              <span className="text-[#D97706] bg-[#FFFBEB] px-2 py-0.5 rounded border border-[#FDE68A]">
                Login: 3.7%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. SECOND ROW: BAR CHART (EXTERNAL APIS) & STORAGE GAUGES */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* CHART 3: Bar Chart of External Integrations Traffic */}
        <div className="bg-white border border-[#E4E7EA] rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#E4E7EA] pb-3">
            <div>
              <h2 className="text-base font-bold text-[#1A1F24] flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#2E7D4F]" /> Tashqi tizimlar va integratsiya shlyuzlari (Bar Chart)
              </h2>
              <p className="text-xs text-[#5A646D] mt-0.5">
                8 ta tashqi davlat va moliya axborot tizimlarining kunlik soʻrovlar hajmi va javob vaqti
              </p>
            </div>
            <span className="text-xs font-bold text-[#15803D] bg-[#F0FDF4] px-2.5 py-1 rounded-full border border-[#DCFCE7]">
              12 / 12 faol
            </span>
          </div>

          <div className="w-full h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={integrationsBarData} margin={{ top: 10, right: 10, left: -15, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E4E7EA" vertical={false} />
                <XAxis
                  dataKey="name"
                  stroke="#767F87"
                  fontSize={10}
                  tickLine={false}
                  angle={-20}
                  textAnchor="end"
                  interval={0}
                />
                <YAxis
                  stroke="#767F87"
                  fontSize={11}
                  tickLine={false}
                  tickFormatter={(v) => (v >= 1000 ? `${v / 1000}k` : v)}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload;
                      return (
                        <div className="bg-[#1A1F24] text-white p-3 rounded-xl shadow-lg text-xs space-y-1">
                          <div className="font-bold text-[#7FB98A]">{d.name} Integratsiyasi</div>
                          <div className="flex justify-between gap-4">
                            <span className="text-gray-300">Kunlik soʻrovlar:</span>
                            <span className="font-mono font-bold text-white">{d.reqs.toLocaleString()} ta</span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <span className="text-gray-300">Javob kechikishi:</span>
                            <span className="font-mono font-bold text-[#FBBF24]">{d.latency} ms</span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <span className="text-gray-300">Ishlash kafolati:</span>
                            <span className="font-mono font-bold text-emerald-400">{d.uptime}%</span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="reqs" radius={[6, 6, 0, 0]}>
                  {integrationsBarData.map((entry, index) => (
                    <Cell key={`bar-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-2 border-t border-[#E4E7EA] flex items-center justify-between text-xs text-[#5A646D]">
            <span className="flex items-center gap-1.5 font-semibold text-[#1A1F24]">
              <Globe2 className="w-4 h-4 text-[#2E7D4F]" /> Jami 8 ta davlat integratsiyasi
            </span>
            <span className="font-mono text-[#15803D] font-bold">114 670 ta soʻrov / 24s</span>
          </div>
        </div>

        {/* CHART 4: Storage Breakdown & DB Gauges */}
        <div className="bg-white border border-[#E4E7EA] rounded-2xl p-5 sm:p-6 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#E4E7EA] pb-3">
              <div>
                <h2 className="text-base font-bold text-[#1A1F24] flex items-center gap-2">
                  <HardDrive className="w-5 h-5 text-[#2E7D4F]" /> MBBT va Disk xotirasi sigʻimlari
                </h2>
                <p className="text-xs text-[#5A646D] mt-0.5">
                  PostgreSQL relyatsion bazasi, MinIO S3, WORM audit va zaxiralar xotirasi
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate?.('admin_backups')}
                className="text-xs font-semibold"
              >
                Zahiralar
              </Button>
            </div>

            {/* Total Storage Banner */}
            <div className="mt-4 bg-[#F0F7F1] border border-[#D9EBDC] rounded-xl p-4 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[11px] font-bold text-[#2E7D4F] uppercase tracking-wider">
                  Jami band qilingan MBBT hajmi
                </span>
                <div className="text-xl font-extrabold text-[#1A1F24] font-mono">
                  186.4 GB <span className="text-xs font-normal text-[#5A646D]">/ 1.1 TB ajratilgan</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-[#15803D] bg-white px-2.5 py-1 rounded-lg border border-[#D9EBDC] font-mono">
                  16.9% band
                </span>
                <span className="text-[11px] text-[#5A646D] block mt-1">913.6 GB boʻsh joy</span>
              </div>
            </div>

            {/* Detailed Storage Bars */}
            <div className="mt-4 space-y-3">
              {storageData.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="font-semibold text-[#1A1F24]">{item.name}</span>
                    </div>
                    <span className="font-mono font-bold text-[#1A1F24]">
                      {item.value} GB / {item.total} GB ({item.pct}%)
                    </span>
                  </div>
                  <div className="h-2.5 w-full bg-[#E4E7EA] rounded-full overflow-hidden shadow-inner">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${item.pct}%`, backgroundColor: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-[#E4E7EA] flex items-center justify-between text-xs text-[#5A646D]">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#2E7D4F]" /> Oxirgi zaxira olingan vaqt: 42 daqiqa oldin
            </span>
            <span className="font-mono text-[#15803D] font-bold">100% yaxlit (42 ta nusxa)</span>
          </div>
        </div>
      </div>

      {/* 5. ADMINISTRATION MODULES (TZ 4.2.1.1 - 4.2.1.7) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div>
            <h2 className="text-base font-bold text-[#1A1F24]">Maʼmurlash modullari (7 ta asosiy modul)</h2>
            <p className="text-xs text-[#5A646D]">
              Tizim sozlamalari, foydalanuvchilar, rollar, tashkilotlar va klassifikatorlar boshqaruvi
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-[#767F87]">TZ 4.2.1 boʻlimi</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {adminModules.map((mod) => (
            <button
              key={mod.page}
              onClick={() => onNavigate?.(mod.page)}
              className="bg-white border border-[#E4E7EA] p-5 rounded-2xl shadow-xs space-y-3 hover:border-[#7FB98A] hover:shadow-md transition-all text-left group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="p-2.5 bg-[#F0F7F1] rounded-xl text-[#2E7D4F] group-hover:scale-105 transition-transform border border-[#D9EBDC]">
                    {mod.icon}
                  </div>
                  <span className="text-[10px] font-mono font-bold text-[#767F87] bg-[#F8F9FA] px-2 py-0.5 rounded border border-[#E4E7EA]">
                    {mod.tzCode}
                  </span>
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-sm text-[#1A1F24] group-hover:text-[#2E7D4F] transition-colors">
                    {mod.title}
                  </h3>
                </div>
              </div>

              <div className="pt-2.5 border-t border-[#E4E7EA] flex items-center justify-between w-full">
                <span className="text-xs font-bold text-[#2E7D4F] font-mono">{mod.metric}</span>
                <ChevronRight className="w-4 h-4 text-[#9AA3AB] group-hover:text-[#2E7D4F] group-hover:translate-x-0.5 transition-all" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 6. RECENT AUDIT LOGS & BOUNDARY REMINDER */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        {/* Recent Audit Events */}
        <div className="bg-white border border-[#E4E7EA] rounded-2xl p-5 sm:p-6 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-[#E4E7EA] pb-3">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#2E7D4F]" />
              <h3 className="font-bold text-base text-[#1A1F24]">Oxirgi xavfsizlik va audit hodisalari</h3>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate?.('admin_audit_logs')}
              className="text-xs font-bold text-[#2E7D4F]"
            >
              Toʻliq jurnal (4.2.1.6)
            </Button>
          </div>

          <div className="space-y-2 text-xs">
            {recentAudit.map((log, idx) => (
              <div
                key={idx}
                className="p-3 bg-[#F8F9FA] hover:bg-white border border-[#E4E7EA] rounded-xl flex items-center justify-between gap-3 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-[#767F87] font-mono font-bold shrink-0">{log.time}</span>
                  <span className="font-bold text-[#1A1F24] shrink-0">{log.user}</span>
                  <span className="text-[10px] font-mono text-[#2E7D4F] bg-[#F0F7F1] px-2 py-0.5 rounded border border-[#D9EBDC] shrink-0">
                    {log.role}
                  </span>
                  <span className="text-[#5A646D] truncate">{log.action}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] font-bold text-[#15803D] bg-[#F0FDF4] px-2 py-0.5 rounded border border-[#DCFCE7]">
                    {log.status}
                  </span>
                  <span className="text-[#767F87] font-mono bg-white px-2 py-0.5 rounded border border-[#E4E7EA] text-[11px]">
                    {log.ip}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Administrator Boundary Banner */}
        <div className="bg-[#F8F9FA] border border-[#E4E7EA] rounded-2xl p-5 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white border border-[#D9EBDC] rounded-xl text-[#2E7D4F] shrink-0 shadow-xs">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-sm text-[#1A1F24] block">Administrator vakolatlari chegarasi</span>
                <span className="text-xs text-[#5A646D]">TZ 4.2.1 reglament talabi</span>
              </div>
            </div>
            <p className="text-xs text-[#5A646D] leading-relaxed">
              Tizim administratori foydalanuvchilar, rollar, tashkilotlar, klassifikatorlar, sozlamalar va zaxiralarni boshqaradi.
              Administrator <b className="text-[#1A1F24]">audit jurnalini oʻzgartira va oʻchira olmaydi</b>, ariza boʻyicha qaror qabul qilmaydi,
              hisobotni tasdiqlamaydi va ruxsatnoma hujjatlarini E-IMZO bilan imzolamaydi.
            </p>
          </div>

          <div className="pt-3 border-t border-[#E4E7EA] flex items-center justify-between text-xs text-[#5A646D]">
            <span className="font-medium">WORM xavfsizlik standarti</span>
            <span className="font-mono text-[#15803D] font-bold">RFC 3161 vaqt tamgʻasi</span>
          </div>
        </div>
      </div>
    </div>
  );
};
