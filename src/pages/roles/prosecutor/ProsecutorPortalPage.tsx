import React, { useState } from 'react';
import {
  ShieldAlert,
  Search,
  Download,
  TrendingUp,
  PieChart as PieIcon,
  BarChart3,
  CheckCircle2,
  ShieldCheck,
  AlertTriangle,
  RefreshCw,
  Clock,
  Lock,
  Scale,
  FileText,
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
import { Input } from '../../../components/ui/FormControls';
import { DataTable, type Column } from '../../../components/ui/DataTable';

export interface ProsecutorPortalPageProps {
  onNavigate?: (page: string, params?: any) => void;
}

export interface RiskIndicatorItem {
  id: string;
  code: 'RI-01' | 'RI-04' | 'RI-12' | 'RI-15';
  level: 'HIGH' | 'MEDIUM' | 'LOW';
  title: string;
  targetObject: string;
  leskhoz: string;
  ipAddress: string;
  detectedAt: string;
  auditTrail: string;
}

export const ProsecutorPortalPage: React.FC<ProsecutorPortalPageProps> = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [timeRange, setTimeRange] = useState<'week' | 'month'>('month');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Risk dynamics timeline
  const riskTimelineData = {
    week: [
      { day: 'Dush', high: 1, medium: 2, resolved: 3 },
      { day: 'Sesh', high: 2, medium: 1, resolved: 2 },
      { day: 'Chor', high: 0, medium: 3, resolved: 4 },
      { day: 'Pay', high: 2, medium: 2, resolved: 3 },
      { day: 'Jum', high: 1, medium: 1, resolved: 5 },
      { day: 'Shan', high: 0, medium: 1, resolved: 1 },
      { day: 'Yak', high: 0, medium: 0, resolved: 1 },
    ],
    month: [
      { day: '1-7 avg', high: 3, medium: 5, resolved: 8 },
      { day: '8-14 avg', high: 4, medium: 6, resolved: 11 },
      { day: '15-21 avg', high: 2, medium: 4, resolved: 9 },
      { day: '22-28 avg', high: 5, medium: 7, resolved: 14 },
      { day: '29-31 avg', high: 1, medium: 2, resolved: 6 },
    ],
  };

  // 15 Risk indicators distribution
  const riskDistributionData = [
    { code: 'RI-01', name: 'Qoʻlda toʻlov belgilash (Bank koʻchirmasisiz)', count: 4, pct: 29, color: '#DC2626' },
    { code: 'RI-12', name: 'Yaylov sigʻimi (MaxSB) normadan oshirilgan', count: 3, pct: 21, color: '#EF4444' },
    { code: 'RI-04', name: 'Retroaktiv БҲМ tarif oʻzgarishi', count: 3, pct: 21, color: '#F59E0B' },
    { code: 'RI-08', name: 'Muhofaza yoki taqiqlangan zonada ruxsatnoma', count: 2, pct: 14, color: '#7C3AED' },
    { code: 'RI-03', name: 'Bir konturga takroriy ruxsat berish (Konflikt)', count: 2, pct: 15, color: '#3B82F6' },
  ];

  // Regional risk distribution
  const regionalRiskData = [
    { region: 'Boʻstonliq DЎX', signals: 4, audited: 48, rate: '8.3%' },
    { region: 'Boysun DЎX', signals: 3, audited: 36, rate: '8.3%' },
    { region: 'Zomin DЎX', signals: 3, audited: 42, rate: '7.1%' },
    { region: 'Kitob DЎX', signals: 2, audited: 29, rate: '6.9%' },
    { region: 'Ohangaron DЎX', signals: 2, audited: 31, rate: '6.5%' },
  ];

  const riskIndicators: RiskIndicatorItem[] = [
    {
      id: 'RISK-801',
      code: 'RI-01',
      level: 'HIGH',
      title: 'Qoʻlda toʻlov belgilash (Bank koʻchirmasisiz tasdiqlash)',
      targetObject: 'Ruxsatnoma №RX-2026-0095',
      leskhoz: 'Burchmulla oʻrmon xoʻjaligi',
      ipAddress: '192.168.10.45',
      detectedAt: '08.08.2026 16:00',
      auditTrail: 'Buxgalter Sodiqov T. M. tomonidan qoʻlda tasdiq urilgan',
    },
    {
      id: 'RISK-802',
      code: 'RI-04',
      level: 'MEDIUM',
      title: 'Retroaktiv БҲМ oʻzgarishi (Maker-Checker chetlab oʻtildi)',
      targetObject: 'Tarif №NRM-001 (Kontur №42)',
      leskhoz: 'Markaziy Apparat',
      ipAddress: '10.0.4.12',
      detectedAt: '01.08.2026 09:12',
      auditTrail: 'Normativ mutaxassis Karimov B. tomonidan oʻzgartirilgan',
    },
    {
      id: 'RISK-803',
      code: 'RI-12',
      level: 'HIGH',
      title: 'Yaylov sigʻimi (MaxSB) chegarasidan oshiqcha ruxsat berish',
      targetObject: 'Ruxsatnoma №RX-2026-0088',
      leskhoz: 'Zomin davlat qoʻriqxonasi',
      ipAddress: '192.168.12.89',
      detectedAt: '28.07.2026 11:45',
      auditTrail: 'Xodim Xasanov R. A. tomonidan tasdiqlashga yuborilgan',
    },
  ];

  const columns: Column<RiskIndicatorItem>[] = [
    {
      key: 'code',
      header: 'Code',
      sortable: true,
      width: '100px',
      accessor: (row) => <b className="font-mono text-[#B91C1C]">{row.code}</b>,
    },
    {
      key: 'level',
      header: 'Daraja',
      sortable: true,
      width: '110px',
      accessor: (row) => (
        <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${row.level === 'HIGH' ? 'bg-[#FEF2F2] text-[#991B1B] border border-[#FCA5A5]' : 'bg-[#FFFBEB] text-[#92400E] border border-[#FDE68A]'}`}>
          {row.level}
        </span>
      ),
    },
    { key: 'title', header: 'Risk-Indikator Turi', sortable: true },
    { key: 'targetObject', header: 'Obʼyekt', sortable: true, width: '180px' },
    { key: 'leskhoz', header: 'Oʻrmon Xoʻjaligi', sortable: true },
    { key: 'detectedAt', header: 'Vaqt', sortable: true, width: '130px' },
    { key: 'ipAddress', header: 'IP Manzil', sortable: true, width: '120px' },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setToastMessage('WORM audit loglari va 15 ta risk-indikator stream sinxronlandi. Kripto-heslar mos keldi.');
      setTimeout(() => setToastMessage(null), 3000);
    }, 600);
  };

  const handleExportWatermarkedPDF = () => {
    alert('Bosh Prokuratura 11-tarmoq suvi belgisi (Watermark: PROSECUTOR-99999999999999) bilan audit xulosasi generatsiya qilindi.');
  };

  return (
    <div className="space-y-8 font-sans pb-16">
      {/* Toast Banner */}
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

      {/* Strict Read-Only Header */}
      <div className="bg-[#123522] text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-4 border border-[#23653F]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-[#2E7D4F] rounded-2xl shadow-sm">
              <ShieldAlert className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-[#B91C1C] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                  YOPIQ PERIMETR — STRICT READ-ONLY
                </span>
                <span className="bg-white/10 text-emerald-200 text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-white/10 flex items-center gap-1">
                  <Lock className="w-3 h-3" /> WORM SHA-256 Validated
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white mt-1 tracking-tight">
                Prokuratura Raqamli Nazorat Portali
              </h1>
              <p className="text-xs text-gray-300">
                Nazoratchi: <b>Xalilov Utkir Xasanovich</b> (Bosh Prokuratura / 11-tarmoq prokurori)
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Time range switcher */}
            <div className="bg-black/20 border border-white/10 p-1 rounded-xl flex items-center gap-1 text-xs font-semibold">
              <button
                onClick={() => setTimeRange('week')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  timeRange === 'week' ? 'bg-[#2E7D4F] text-white font-bold shadow-xs' : 'text-gray-300 hover:text-white'
                }`}
              >
                Haftalik
              </button>
              <button
                onClick={() => setTimeRange('month')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  timeRange === 'month' ? 'bg-[#2E7D4F] text-white font-bold shadow-xs' : 'text-gray-300 hover:text-white'
                }`}
              >
                Oylik
              </button>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              className="border-white/30 text-white hover:bg-white/10 text-xs"
              leftIcon={<RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-emerald-300' : ''}`} />}
            >
              Yangilash
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleExportWatermarkedPDF}
              className="border-white/30 text-white hover:bg-white/10 text-xs font-bold"
              leftIcon={<Download className="w-4 h-4" />}
            >
              Watermarked Audit PDF
            </Button>
          </div>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed max-w-3xl">
          Oʻzbekiston Respublikasi Bosh Prokuraturasi 11-tarmogʻi maxsus raqamli nazorat ekrani. Tizimda tahrirlash va oʻchirish tugmalari HTML darajasida chiqarib tashlangan (Read-Only). Har qanday qidiruv, ochish va eksport harakatlari suv belgilari (Watermark) bilan qayd etiladi.
        </p>
      </div>

      {/* 4 Top Prosecutor KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#FECACA] bg-[#FEF2F2]/30 p-5 rounded-2xl shadow-xs space-y-1 hover:border-[#EF4444] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-[#991B1B]">Faol Risk Signallari</span>
            <span className="w-8 h-8 rounded-xl bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center font-bold">
              14
            </span>
          </div>
          <div className="text-2xl font-black font-mono text-[#DC2626]">14 ta signal</div>
          <p className="text-[11px] text-[#991B1B] font-semibold flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" /> 3 ta yuqori (HIGH) xavf darajasida
          </p>
        </div>

        <div className="bg-white border border-[#E4E7EA] hover:border-[#7FB98A] p-5 rounded-2xl shadow-xs space-y-1 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-[#5A646D]">Nazorat Taqdimnomalari</span>
            <Scale className="w-5 h-5 text-[#2E7D4F]" />
          </div>
          <div className="text-2xl font-black font-mono text-[#1A1F24]">6 ta ish</div>
          <p className="text-[11px] text-[#5A646D]">4 ta ruxsatnoma toʻxtatilgan (Suspend)</p>
        </div>

        <div className="bg-white border border-[#E4E7EA] hover:border-[#7FB98A] p-5 rounded-2xl shadow-xs space-y-1 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-[#5A646D]">WORM Audit Qaydlari</span>
            <Lock className="w-5 h-5 text-[#0284C7]" />
          </div>
          <div className="text-2xl font-black font-mono text-[#0284C7]">15 480 ta</div>
          <p className="text-[11px] text-[#15803D] font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> 100% oʻzgarmas (Tamper-proof)
          </p>
        </div>

        <div className="bg-white border border-[#E4E7EA] hover:border-[#7FB98A] p-5 rounded-2xl shadow-xs space-y-1 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-[#5A646D]">Nazoratdagi Moliyaviy Summa</span>
            <ShieldCheck className="w-5 h-5 text-[#2E7D4F]" />
          </div>
          <div className="text-2xl font-black font-mono text-[#123522]">142.5 mln UZS</div>
          <p className="text-[11px] text-[#5A646D]">Qaytarilgan zarar: 38.4 mln UZS</p>
        </div>
      </div>

      {/* 1. PROSECUTOR STATISTICAL DIAGRAMS */}
      <div className="space-y-6">
        {/* ROW 1: Risk Signals Flow (AreaChart) + 15 Indicators Breakdown (Donut) */}
        <div className="grid grid-cols-1 xl:grid-cols-[1.75fr_1.25fr] gap-6">
          {/* Chart 1: Risk Signals AreaChart */}
          <div className="bg-white border border-[#E4E7EA] rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E4E7EA] pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#DC2626]" />
                  <h2 className="text-base font-bold text-[#1A1F24]">
                    Risk-Indikatorlar va Qonunbuzilishlar Dinamikasi
                  </h2>
                </div>
                <p className="text-xs text-[#5A646D] mt-0.5">
                  Avtomatlashtirilgan qoidalarga tushgan signallar, tekshiruvlar va prokuror taqdimnomalari
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-[#DC2626] bg-[#FEF2F2] px-2.5 py-1 rounded-lg border border-[#FCA5A5] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Munosabat vaqti: 4.2 soat
              </span>
            </div>

            <div className="w-full h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={riskTimelineData[timeRange]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="prosecutorHighGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#DC2626" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#DC2626" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="prosecutorMedGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="prosecutorResGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2E7D4F" stopOpacity={0.3} />
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
                          <div className="bg-[#1A1F24] text-white p-3 rounded-xl shadow-lg text-xs space-y-1.5 font-sans">
                            <div className="font-bold text-[#FCA5A5] border-b border-white/10 pb-1">{label}</div>
                            <div className="flex justify-between gap-4">
                              <span className="text-rose-300">Yuqori xavf (HIGH):</span>
                              <span className="font-mono font-bold text-rose-300">{payload[0]?.value} ta</span>
                            </div>
                            <div className="flex justify-between gap-4">
                              <span className="text-amber-300">Oʻrta xavf (MEDIUM):</span>
                              <span className="font-mono font-bold text-amber-300">{payload[1]?.value} ta</span>
                            </div>
                            <div className="flex justify-between gap-4">
                              <span className="text-emerald-300">Bartaraf etilgan:</span>
                              <span className="font-mono font-bold text-emerald-300">{payload[2]?.value} ta</span>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="high"
                    name="Yuqori xavf (HIGH)"
                    stroke="#DC2626"
                    strokeWidth={2.5}
                    fill="url(#prosecutorHighGrad)"
                  />
                  <Area
                    type="monotone"
                    dataKey="medium"
                    name="Oʻrta xavf (MEDIUM)"
                    stroke="#F59E0B"
                    strokeWidth={2}
                    fill="url(#prosecutorMedGrad)"
                  />
                  <Area
                    type="monotone"
                    dataKey="resolved"
                    name="Bartaraf etilgan"
                    stroke="#2E7D4F"
                    strokeWidth={1.5}
                    fill="url(#prosecutorResGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-[#E4E7EA] bg-[#F8F9FA] p-3 rounded-xl text-center text-xs">
              <div>
                <span className="text-[10px] font-bold uppercase text-[#767F87] block">Nazoratdagi Harakatlar</span>
                <span className="text-sm font-extrabold text-[#1A1F24] font-mono">1 240 ta / davr</span>
              </div>
              <div className="border-x border-[#E4E7EA]">
                <span className="text-[10px] font-bold uppercase text-[#767F87] block">WORM Immutability</span>
                <span className="text-sm font-extrabold text-[#2E7D4F] font-mono">100% Buzilmas</span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-[#767F87] block">Tergovga Oʻtkazilgan</span>
                <span className="text-sm font-extrabold text-[#DC2626] font-mono">2 ta material</span>
              </div>
            </div>
          </div>

          {/* Chart 2: 15 Risk-Indicators Donut */}
          <div className="bg-white border border-[#E4E7EA] rounded-2xl p-5 sm:p-6 shadow-xs space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[#E4E7EA] pb-3">
                <div>
                  <h2 className="text-base font-bold text-[#1A1F24] flex items-center gap-2">
                    <PieIcon className="w-5 h-5 text-[#DC2626]" /> Risk-Indikatorlar Taqsimoti (RI)
                  </h2>
                  <p className="text-xs text-[#5A646D] mt-0.5">
                    14 ta faol risk indikatorining modullar kesimidagi toifalari
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-[#DC2626] bg-[#FEF2F2] px-2.5 py-1 rounded-lg border border-[#FCA5A5]">
                  14 ta signal
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
                              <div className="font-bold text-[#FCA5A5] font-mono">{d.code}</div>
                              <div className="text-[11px] text-gray-300">{d.name}</div>
                              <div className="flex justify-between gap-3 font-mono pt-1 text-white">
                                <span>Signallar soni:</span>
                                <span className="font-bold">{d.count} ta ({d.pct}%)</span>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Pie
                      data={riskDistributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={48}
                      outerRadius={72}
                      paddingAngle={3}
                      dataKey="count"
                    >
                      {riskDistributionData.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>

                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xl font-black text-[#DC2626] font-mono leading-none">14</span>
                  <span className="text-[10px] font-bold uppercase text-[#767F87] tracking-wider mt-0.5">Xavf Signali</span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-[#E4E7EA]">
              {riskDistributionData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs py-0.5">
                  <div className="flex items-center gap-2 truncate">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="font-mono font-bold text-[#1A1F24] shrink-0">{item.code}</span>
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

        {/* ROW 2: Regional Risk Breakdown (BarChart) + WORM Security Panel */}
        <div className="grid grid-cols-1 xl:grid-cols-[1.85fr_1.15fr] gap-6">
          {/* Regional Risk BarChart */}
          <div className="bg-white border border-[#E4E7EA] rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E4E7EA] pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#DC2626]" />
                  <h2 className="text-base font-bold text-[#1A1F24]">
                    Oʻrmon Xoʻjaliklari Kesimida Risk Signallari va Nazorat Qamrovi
                  </h2>
                </div>
                <p className="text-xs text-[#5A646D] mt-0.5">
                  Xoʻjaliklar boʻyicha aniqlangan xavflar va tekshirilgan umumiy jarayonlar soni
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-[#5A646D]">
                  <span className="w-3 h-3 rounded bg-[#0284C7]" /> Nazorat qilingan
                </span>
                <span className="flex items-center gap-1.5 text-[#5A646D]">
                  <span className="w-3 h-3 rounded bg-[#DC2626]" /> Risk signali
                </span>
              </div>
            </div>

            <div className="w-full h-[230px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionalRiskData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E4E7EA" vertical={false} />
                  <XAxis dataKey="region" stroke="#767F87" fontSize={11} tickLine={false} />
                  <YAxis stroke="#767F87" fontSize={11} tickLine={false} />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        const d = payload[0].payload;
                        return (
                          <div className="bg-[#1A1F24] text-white p-3 rounded-xl shadow-lg text-xs space-y-1 font-sans">
                            <div className="font-bold text-[#FCA5A5] border-b border-white/10 pb-1">{label}</div>
                            <div className="flex justify-between gap-4 pt-1">
                              <span className="text-sky-300">Nazorat qilingan arizalar:</span>
                              <span className="font-mono font-bold">{d.audited} ta</span>
                            </div>
                            <div className="flex justify-between gap-4">
                              <span className="text-rose-300">Aniqlangan risklar:</span>
                              <span className="font-mono font-bold text-rose-300">{d.signals} ta</span>
                            </div>
                            <div className="flex justify-between gap-4 border-t border-white/10 pt-1 text-[11px]">
                              <span className="text-amber-300">Risk darajasi nisbati:</span>
                              <span className="font-mono font-bold text-amber-300">{d.rate}</span>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="audited" name="Nazorat qilingan" fill="#0284C7" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="signals" name="Risk signali" fill="#DC2626" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 border-t border-[#E4E7EA] text-center text-xs">
              {regionalRiskData.map((r, idx) => (
                <div key={idx} className="bg-[#F8F9FA] p-2 rounded-xl">
                  <span className="text-[11px] font-bold text-[#1A1F24] block truncate">{r.region}</span>
                  <span className="text-[10px] text-[#5A646D]">{r.audited} ta operatsiya</span>
                  <div className="text-[11px] font-mono font-bold text-[#DC2626] mt-0.5">{r.signals} ta risk</div>
                </div>
              ))}
            </div>
          </div>

          {/* WORM Cryptographic Security & Watermark Panel */}
          <div className="bg-white border border-[#E4E7EA] rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#E4E7EA] pb-3">
                <div className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-[#2E7D4F]" />
                  <h2 className="text-base font-bold text-[#1A1F24]">WORM Kriptografik Xavfsizlik</h2>
                </div>
                <span className="text-[11px] font-bold text-[#2E7D4F] bg-[#F0F7F1] px-2 py-0.5 rounded border border-[#D9EBDC]">
                  SHA-256
                </span>
              </div>
              <p className="text-xs text-[#5A646D]">
                Tizimning barcha operatsiyalari Write-Once-Read-Many (WORM) registrida saqlanadi. Hech bir maʼmur yoki xodim yozuvlarni oʻchira olmaydi.
              </p>

              <div className="space-y-2">
                <div className="p-3 bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#2E7D4F]" />
                    <span className="text-[#5A646D]">Audit loglari yaxlitligi:</span>
                  </div>
                  <b className="text-[#2E7D4F] font-mono font-bold">100% Validated</b>
                </div>

                <div className="p-3 bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#0284C7]" />
                    <span className="text-[#5A646D]">Eksport suv belgisi (Watermark):</span>
                  </div>
                  <b className="font-mono text-[#0284C7]">PROSECUTOR-99999</b>
                </div>

                <div className="p-3 bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[#B91C1C]" />
                    <span className="text-[#5A646D]">Ruxsat chegarasi:</span>
                  </div>
                  <b className="text-[#B91C1C] font-semibold">Strict Read-Only</b>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#E4E7EA]">
              <Button
                variant="outline"
                size="sm"
                fullWidth
                onClick={() => alert('Barcha 15 480 ta WORM audit loglari reyestriga oʻtildi.')}
                className="text-xs font-semibold"
              >
                Toʻliq Audit Jurnali Reyestri
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Strict Read-Only Search Form */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-[#767F87] block">
          JSHSHIR, STIR, Ruxsatnoma № yoki IP boʻyicha Qidiruv
        </span>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Input
              placeholder="Masalan: 304918234 yoki RX-2026-0089"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
              touchSize
            />
          </div>
          <Button variant="primary" size="lg" className="bg-[#123522] hover:bg-[#1D5434]">
            Qidiruv (Audit Query)
          </Button>
        </div>
      </div>

      {/* Real-time Risk-Indicators Table */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#1A1F24]">Tizim Risk-Indikatorlari Stream (RI-01 ... RI-15)</h2>
          <span className="text-xs font-mono font-bold text-[#B91C1C]">3 ta faol risk signal</span>
        </div>

        <DataTable columns={columns} data={riskIndicators} selectable />
      </div>
    </div>
  );
};

export default ProsecutorPortalPage;
