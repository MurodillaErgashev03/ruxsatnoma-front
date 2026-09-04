import React, { useState } from 'react';
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileText,
  TrendingUp,
  MapPin,
  ArrowRight,
  RefreshCw,
  Building2,
  PieChart as PieIcon,
  BarChart3,
  Layers,
  ChevronRight,
  Compass,
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

export interface ExecutorStaffDashboardPageProps {
  onNavigate?: (page: string, params?: any) => void;
}

export const ExecutorStaffDashboardPage: React.FC<ExecutorStaffDashboardPageProps> = ({ onNavigate }) => {
  const [timePeriod, setTimePeriod] = useState<'week' | 'month'>('week');
  const [activePieIndex, setActivePieIndex] = useState<number | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  // Top KPIs for Boʻstonliq DЎX staff
  const kpis = [
    {
      title: 'Mening ish navbatim',
      value: '24 ta',
      sub: 'Koʻrib chiqilishi kerak',
      change: '5 ta yangi bugun',
      icon: <FileText className="w-5 h-5 text-[#2E7D4F]" />,
      alert: false,
      onClick: () => onNavigate?.('leskhoz_inbox'),
    },
    {
      title: 'Koʻrib chiqilmoqda',
      value: '11 ta',
      sub: 'Hujjatlar tahlilda',
      change: '8 ta mutaxassis xulosasida',
      icon: <Clock className="w-5 h-5 text-[#0284C7]" />,
      alert: false,
      onClick: () => onNavigate?.('leskhoz_inbox'),
    },
    {
      title: 'GIS xulosasi kutilmoqda',
      value: '4 ta',
      sub: 'Geodeziya ekspertizasida',
      change: '2 ta xulosa tayyor',
      icon: <Layers className="w-5 h-5 text-[#7C3AED]" />,
      alert: false,
      onClick: () => onNavigate?.('leskhoz_inbox'),
    },
    {
      title: 'SLA muddati xavfi',
      value: '2 ta',
      sub: 'Muddati 24s dan kam',
      change: 'Darhol koʻrish shart',
      icon: <AlertTriangle className="w-5 h-5 text-[#DC2626]" />,
      alert: true,
      onClick: () => onNavigate?.('leskhoz_inbox'),
    },
  ];

  // Dynamic review timeline (weekly vs monthly)
  const dynamicsData = {
    week: [
      { day: 'Dush', incoming: 6, reviewed: 5, approved: 4 },
      { day: 'Sesh', incoming: 8, reviewed: 7, approved: 6 },
      { day: 'Chor', incoming: 10, reviewed: 9, approved: 8 },
      { day: 'Pay', incoming: 7, reviewed: 8, approved: 7 },
      { day: 'Jum', incoming: 5, reviewed: 6, approved: 5 },
      { day: 'Shan', incoming: 2, reviewed: 3, approved: 3 },
      { day: 'Yak', incoming: 1, reviewed: 1, approved: 1 },
    ],
    month: [
      { day: '1-hafta', incoming: 28, reviewed: 26, approved: 22 },
      { day: '2-hafta', incoming: 34, reviewed: 31, approved: 28 },
      { day: '3-hafta', incoming: 38, reviewed: 35, approved: 31 },
      { day: '4-hafta', incoming: 42, reviewed: 39, approved: 36 },
    ],
  };

  // Activity breakdown for Boʻstonliq
  const activitiesData = [
    { name: 'Chorva molini boqish (Yaylov)', count: 14, pct: 58.3, color: '#2E7D4F' },
    { name: 'Pichan oʻrish', count: 5, pct: 20.8, color: '#0284C7' },
    { name: 'Asalari uya joylashtirish', count: 3, pct: 12.5, color: '#D97706' },
    { name: 'Dorivor oʻsimliklar yigʻish', count: 2, pct: 8.4, color: '#7C3AED' },
  ];

  // Boʻstonliq Forestry sectors load
  const sectorLoadData = [
    { name: 'Chimyon oʻrmonchilik', apps: 9, area: 142.5, fill: '#2E7D4F' },
    { name: 'Burchmulla oʻrmonchilik', apps: 6, area: 98.0, fill: '#0284C7' },
    { name: 'Chorbogʻ oʻrmonchilik', apps: 5, area: 74.2, fill: '#10B981' },
    { name: 'Piskom oʻrmonchilik', apps: 4, area: 56.8, fill: '#D97706' },
  ];

  // Urgent pending applications
  const urgentApplications = [
    {
      id: 'А-00042',
      applicant: 'Karimov Aziz Botirovich',
      type: 'Chorva molini boqish',
      contour: 'Boʻstonliq 14-2 (Yaylov)',
      deadline: 'Bugun 18:00 (3 soat qoldi)',
      urgent: true,
    },
    {
      id: 'А-00039',
      applicant: '«Chorbogʻ Agro Bogʻ» MCHJ',
      type: 'Asalari uya joylashtirish',
      contour: 'Chorbogʻ 8-kvartal',
      deadline: 'Ertaga 12:00 gacha',
      urgent: false,
    },
    {
      id: 'А-00035',
      applicant: 'Sobirov Jasur Odilovich',
      type: 'Pichan oʻrish',
      contour: 'Chimyon 3-uchastka',
      deadline: 'Ertaga 17:00 gacha',
      urgent: false,
    },
  ];

  return (
    <div className="space-y-6 font-sans">
      {/* 1. Header with Role identity & Quick Controls */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs flex flex-col xl:flex-row xl:items-center justify-between gap-5">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2E7D4F] bg-[#F0F7F1] px-3 py-1 rounded-full border border-[#D9EBDC] flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5" /> 4-rol: executor_staff
            </span>
            <span className="text-xs font-semibold text-[#5A646D] bg-[#F8F9FA] px-2.5 py-1 rounded-full border border-[#E4E7EA]">
              Boʻstonliq davlat oʻrmon xoʻjaligi
            </span>
            <span className="text-xs font-medium text-[#15803D] bg-[#F0FDF4] px-2.5 py-1 rounded-full border border-[#DCFCE7] flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#15803D] animate-pulse" />
              Katta mutaxassis ish joyi
            </span>
          </div>
          <h1 className="text-xl font-extrabold text-[#1A1F24] tracking-tight">
            Ijrochi Tashkilot Xodimi — Boshqaruv va Navbat Paneli
          </h1>
          <p className="text-xs text-[#5A646D] leading-relaxed">
            Kelib tushgan arizalarni tahlil qilish, GIS xulosalarini tekshirish va ruxsatnoma loyihalarini tayyorlash
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-[#F8F9FA] border border-[#E4E7EA] p-1 rounded-xl flex items-center gap-1 text-xs font-semibold">
            <button
              onClick={() => setTimePeriod('week')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                timePeriod === 'week' ? 'bg-[#2E7D4F] text-white shadow-xs font-bold' : 'text-[#5A646D] hover:text-[#1A1F24]'
              }`}
            >
              Haftalik
            </button>
            <button
              onClick={() => setTimePeriod('month')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                timePeriod === 'month' ? 'bg-[#2E7D4F] text-white shadow-xs font-bold' : 'text-[#5A646D] hover:text-[#1A1F24]'
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
            leftIcon={<FileText className="w-4 h-4" />}
            onClick={() => onNavigate?.('leskhoz_inbox')}
            className="bg-[#2E7D4F] hover:bg-[#23653F] font-bold shadow-xs text-xs"
          >
            Arizalar jadvali (24)
          </Button>
        </div>
      </div>

      {/* 2. Top KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => (
          <div
            key={idx}
            onClick={kpi.onClick}
            className={`bg-white border rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-3 cursor-pointer hover:shadow-md transition-all ${
              kpi.alert ? 'border-[#FECACA] hover:border-[#DC2626] bg-[#FEF2F2]/30' : 'border-[#E4E7EA] hover:border-[#7FB98A]'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-[#5A646D] uppercase tracking-wider block">{kpi.title}</span>
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

      {/* 3. PRIMARY ROW: AREA REVIEW DYNAMICS & ACTIVITY DONUT */}
      <div className="grid grid-cols-1 xl:grid-cols-[1.75fr_1.25fr] gap-6">
        {/* CHART 1: Review Dynamics AreaChart */}
        <div className="bg-white border border-[#E4E7EA] rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E4E7EA] pb-3">
            <div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#2E7D4F]" />
                <h2 className="text-base font-bold text-[#1A1F24]">
                  Arizalarni koʻrib chiqish va rasmiylashtirish dinamikasi
                </h2>
              </div>
              <p className="text-xs text-[#5A646D] mt-0.5">
                Kelib tushgan arizalar, koʻrib chiqilganlar va ruxsatnomaga tavsiya etilganlar
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-[#2E7D4F] bg-[#F0F7F1] px-2.5 py-1 rounded-lg border border-[#D9EBDC]">
              Oʻrtacha tezlik: 3.2 kun
            </span>
          </div>

          <div className="w-full h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dynamicsData[timePeriod]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="staffIncoming" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0284C7" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0284C7" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="staffReviewed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2E7D4F" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#2E7D4F" stopOpacity={0.0} />
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
                            <span className="text-sky-300">Kelib tushgan:</span>
                            <span className="font-mono font-bold">{payload[0]?.value} ta</span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <span className="text-emerald-300">Koʻrib chiqilgan:</span>
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
                  dataKey="incoming"
                  name="Kelib tushgan"
                  stroke="#0284C7"
                  strokeWidth={2}
                  fill="url(#staffIncoming)"
                />
                <Area
                  type="monotone"
                  dataKey="reviewed"
                  name="Koʻrib chiqilgan"
                  stroke="#2E7D4F"
                  strokeWidth={2.5}
                  fill="url(#staffReviewed)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-[#E4E7EA] bg-[#F8F9FA] p-3 rounded-xl text-center text-xs">
            <div>
              <span className="text-[10px] font-bold uppercase text-[#767F87] block">Bu davrda jami</span>
              <span className="text-sm font-extrabold text-[#1A1F24] font-mono">39 ta ariza</span>
            </div>
            <div className="border-x border-[#E4E7EA]">
              <span className="text-[10px] font-bold uppercase text-[#767F87] block">Ijobiy xulosa</span>
              <span className="text-sm font-extrabold text-[#2E7D4F] font-mono">34 ta (87.2%)</span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-[#767F87] block">SLA rioya qilinishi</span>
              <span className="text-sm font-extrabold text-[#0284C7] font-mono">91.6% (A’lo)</span>
            </div>
          </div>
        </div>

        {/* CHART 2: Activities Donut Chart */}
        <div className="bg-white border border-[#E4E7EA] rounded-2xl p-5 sm:p-6 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#E4E7EA] pb-3">
              <div>
                <h2 className="text-base font-bold text-[#1A1F24] flex items-center gap-2">
                  <PieIcon className="w-5 h-5 text-[#2E7D4F]" /> Faoliyat turlari boʻyicha taqsimot
                </h2>
                <p className="text-xs text-[#5A646D] mt-0.5">
                  Boʻstonliq DЎX hududidagi joriy 24 ta arizaning turlari
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-[#2E7D4F] bg-[#F0F7F1] px-2.5 py-1 rounded-lg border border-[#D9EBDC]">
                24 ta ariza
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
                              <span>Arizalar:</span>
                              <span className="font-bold text-white">{d.count} ta ({d.pct}%)</span>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Pie
                    data={activitiesData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={78}
                    paddingAngle={3}
                    dataKey="count"
                    onMouseEnter={(_, idx) => setActivePieIndex(idx)}
                    onMouseLeave={() => setActivePieIndex(null)}
                  >
                    {activitiesData.map((entry, index) => (
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
                  {activePieIndex !== null ? activitiesData[activePieIndex].count : '24'}
                </span>
                <span className="text-[10px] font-semibold text-[#5A646D] mt-0.5">
                  {activePieIndex !== null ? 'ariza' : 'jami navbat'}
                </span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              {activitiesData.map((act, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 rounded-lg bg-[#F8F9FA] hover:bg-[#F0F7F1] transition-colors"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: act.color }} />
                    <span className="font-medium text-[#1A1F24] truncate">{act.name}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 font-mono">
                    <span className="font-bold text-[#1A1F24]">{act.count} ta</span>
                    <span className="text-[#5A646D] text-[11px]">({act.pct}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2.5 border-t border-[#E4E7EA] flex items-center justify-between text-xs text-[#5A646D]">
            <span>Eng talabgir yoʻnalish:</span>
            <span className="font-bold text-[#2E7D4F]">Chorva boqish (Yaylov)</span>
          </div>
        </div>
      </div>

      {/* 4. SECOND ROW: FORESTRY SECTORS BAR CHART & URGENT TASK QUEUE */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* CHART 3: Forestry Sections BarChart */}
        <div className="bg-white border border-[#E4E7EA] rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#E4E7EA] pb-3">
            <div>
              <h2 className="text-base font-bold text-[#1A1F24] flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#2E7D4F]" /> Boʻlimlar va uchastkalar kesimidagi yuklama
              </h2>
              <p className="text-xs text-[#5A646D] mt-0.5">
                Boʻstonliq DЎX ning 4 ta oʻrmon boʻlimi boʻyicha arizalar va talab qilingan yer maydoni (ga)
              </p>
            </div>
            <span className="text-xs font-bold text-[#15803D] bg-[#F0FDF4] px-2.5 py-1 rounded-full border border-[#DCFCE7]">
              4 ta boʻlim
            </span>
          </div>

          <div className="w-full h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectorLoadData} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E4E7EA" vertical={false} />
                <XAxis dataKey="name" stroke="#767F87" fontSize={11} tickLine={false} />
                <YAxis stroke="#767F87" fontSize={11} tickLine={false} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload;
                      return (
                        <div className="bg-[#1A1F24] text-white p-3 rounded-xl shadow-lg text-xs space-y-1">
                          <div className="font-bold text-[#7FB98A]">{d.name}</div>
                          <div className="flex justify-between gap-4">
                            <span className="text-gray-300">Arizalar soni:</span>
                            <span className="font-mono font-bold text-white">{d.apps} ta</span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <span className="text-gray-300">Soʻralgan maydon:</span>
                            <span className="font-mono font-bold text-[#38BDF8]">{d.area} gektar</span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="apps" radius={[6, 6, 0, 0]}>
                  {sectorLoadData.map((entry, index) => (
                    <Cell key={`bar-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-2 border-t border-[#E4E7EA] flex items-center justify-between text-xs text-[#5A646D]">
            <span className="flex items-center gap-1.5 font-semibold text-[#1A1F24]">
              <MapPin className="w-4 h-4 text-[#2E7D4F]" /> Jami soʻralgan maydon:
            </span>
            <span className="font-mono text-[#2E7D4F] font-bold">371.5 gektar yer</span>
          </div>
        </div>

        {/* Urgent Task Queue List */}
        <div className="bg-white border border-[#E4E7EA] rounded-2xl p-5 sm:p-6 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#E4E7EA] pb-3">
              <div>
                <h2 className="text-base font-bold text-[#1A1F24] flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#DC2626]" /> Darhol koʻrib chiqilishi shart (Shoshilinch)
                </h2>
                <p className="text-xs text-[#5A646D] mt-0.5">
                  SLA muddati tugash arafasidagi biriktirilgan arizalar navbati
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
              {urgentApplications.map((app) => (
                <div
                  key={app.id}
                  onClick={() => onNavigate?.('application_card', { id: app.id })}
                  className={`p-3 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all hover:shadow-xs ${
                    app.urgent
                      ? 'border-[#FCA5A5] bg-[#FEF2F2]/60 hover:bg-[#FEF2F2]'
                      : 'border-[#E4E7EA] bg-[#F8F9FA] hover:bg-white hover:border-[#7FB98A]'
                  }`}
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-[#1A1F24]">{app.id}</span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white border border-[#E4E7EA] text-[#5A646D]">
                        {app.type}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-[#1A1F24] truncate">{app.applicant}</div>
                    <div className="text-[11px] text-[#5A646D] flex items-center gap-1.5">
                      <Compass className="w-3 h-3 text-[#2E7D4F]" /> {app.contour}
                    </div>
                  </div>

                  <div className="text-right shrink-0 space-y-1">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full font-mono block ${
                        app.urgent ? 'bg-[#DC2626] text-white' : 'bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]'
                      }`}
                    >
                      {app.deadline}
                    </span>
                    <Button
                      variant="primary"
                      size="sm"
                      className="bg-[#2E7D4F] hover:bg-[#23653F] text-[11px] h-7 px-2.5 font-bold"
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate?.('leskhoz_review', { id: app.id });
                      }}
                    >
                      Koʻrish <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2.5 border-t border-[#E4E7EA] flex items-center justify-between text-xs text-[#5A646D]">
            <span>Reglament: 5 ish kuni</span>
            <span className="font-mono text-[#15803D] font-bold">22 ta ariza oʻz vaqtida</span>
          </div>
        </div>
      </div>
    </div>
  );
};
