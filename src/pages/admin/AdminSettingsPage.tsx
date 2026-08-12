import React, { useState } from 'react';
import {
  Shield,
  Plus,
  Server,
  Users,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Sliders,
  Database,
  Lock,
  Search,
  ExternalLink,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Tabs } from '../../components/ui/Navigation';

export interface AdminSettingsPageProps {
  onNavigate?: (page: string, params?: any) => void;
}

export const AdminSettingsPage: React.FC<AdminSettingsPageProps> = () => {
  const [activeTab, setActiveTab] = useState('roles');
  const [searchQuery, setSearchQuery] = useState('');

  const systemMetrics = [
    { label: 'Tizim Serverlari Holati', value: '100% Onlayn', change: 'API, DB, GIS, E-IMZO faol', icon: <Server className="w-5 h-5 text-[#2E7D4F]" /> },
    { label: 'Jami Foydalanuvchilar', value: '43,947 ta', change: '384 nafar hozir onlayn', icon: <Users className="w-5 h-5 text-[#2E7D4F]" /> },
    { label: 'Tashqi Integratsiyalar', value: '5/5 Ulanish', change: 'OneID, E-IMZO, Prokuratura', icon: <Activity className="w-5 h-5 text-[#2E7D4F]" /> },
    { label: 'Audit va Loglar Statusi', value: 'WORM Append-only', change: '0 ta xavfsizlik hodisasi', icon: <Lock className="w-5 h-5 text-[#2E7D4F]" /> },
  ];

  const roles = [
    { name: 'Arizachi (Applicant)', usersCount: 42800, scope: 'Shaxsiy kabinet va arizalar topshirish', access: 'RBAC / ABAC' },
    { name: 'Oʻrmon Xoʻjaligi Xodimi (Staff)', usersCount: 320, scope: 'Tuman va boʻlim arizalarini koʻrib chiqish', access: 'Leskhoz Restricted' },
    { name: 'Tashkilot Rahbari (Manager)', usersCount: 84, scope: 'Qaror chiqarish va E-IMZO ommaviy imzolash', access: 'Organization Executive' },
    { name: 'GIS Mutaxassisi', usersCount: 45, scope: 'XaritaMuharriri va 13 qatlam muhiti', access: 'GIS Layer Write' },
    { name: 'Normativ Mutaxassis', usersCount: 18, scope: 'Geobotanik normalar va MaxSB formulalari', access: 'Normative Write' },
    { name: 'Dala Inspektori (Inspector PWA)', usersCount: 450, scope: 'Offline PWA ilovasi, QR skaner, GPS va Foto', access: 'Field Mobile' },
    { name: 'Buxgalter (Accountant)', usersCount: 84, scope: 'Bank koʻchirmalari va 50/50 taqsimot', access: 'Financial Ledger' },
    { name: 'Tizim Administratori (SysAdmin)', usersCount: 5, scope: 'Toʻliq maʼmuriy va foydalanuvchilar boshqaruvi', access: 'Super Admin' },
    { name: 'Markaziy Apparat (Central)', usersCount: 25, scope: 'Respublika analitikasi va monitoring', access: 'Nationwide Read' },
    { name: 'Prokuror (Prosecutor Read-Only)', usersCount: 120, scope: 'Raqamli Nazorat yopiq portali va Risk-Indikatorlar', access: 'STRICT READ-ONLY' },
  ];

  const orgsList = [
    { region: 'Toshkent viloyati', count: 12, code: 'ORG-TSH-01', status: 'Faol' },
    { region: 'Samarqand viloyati', count: 9, code: 'ORG-SAM-02', status: 'Faol' },
    { region: 'Fargʻona viloyati', count: 8, code: 'ORG-[#FER]-03', status: 'Faol' },
    { region: 'Surxondaryo viloyati', count: 11, code: 'ORG-SUR-04', status: 'Faol' },
    { region: 'Qashqadaryo viloyati', count: 10, code: 'ORG-QASH-05', status: 'Faol' },
    { region: 'Namangan viloyati', count: 7, code: 'ORG-NAM-06', status: 'Faol' },
    { region: 'Andijon viloyati', count: 6, code: 'ORG-AND-07', status: 'Faol' },
    { region: 'Buxoro viloyati', count: 8, code: 'ORG-[#BUX]-08', status: 'Faol' },
    { region: 'Qoraqalpogʻiston Respublikasi', count: 13, code: 'ORG-QR-09', status: 'Faol' },
  ];

  const classifiersList = [
    { id: 'CS-01', name: 'Oʻrmon Kodeksi faoliyat turlari va tariflari', provider: 'cs.egov.uz', version: 'v2.4' },
    { id: 'CS-02', name: 'Chorva mollarini boqish geobotanik meʼyorlari', provider: 'Oʻrmon loyiha', version: 'v1.8' },
    { id: 'CS-03', name: 'Respublika BHM va toʻlov koeffitsientlari', provider: 'Moliya Vazirligi', version: 'v2026.1' },
    { id: 'CS-04', name: 'Tuman va shahar hududiy SOATO kodlari', provider: 'Statistika Agentligi', version: 'v3.0' },
    { id: 'CS-05', name: 'Bank va Billing tranzaksiya turlari', provider: 'E-GOV Billing', version: 'v1.2' },
    { id: 'CS-06', name: 'E-IMZO sertifikat va kalit turlari', provider: 'NIST Davlat Reyestri', version: 'v4.0' },
  ];

  const auditLogs = [
    { time: '13:08:42', user: 'Ergashov Sardor (SysAdmin)', action: 'Tizim sozlamalari yangilandi', ip: '172.16.4.12' },
    { time: '12:45:10', user: 'Yusupov Bobur (GIS)', action: 'Boʻstonliq 14-kontur GIS qatlami yuklandi', ip: '172.16.4.45' },
    { time: '11:30:05', user: 'Tizim Avto-Backup', action: 'Toshkent Server-01 DB zaxira nusxasi yaratildi', ip: 'Localhost' },
    { time: '10:15:22', user: 'Abdullayev Alisher (Inspector)', action: 'Akt №ACT-2026-088 E-IMZO bilan imzolandi', ip: '172.16.8.99' },
  ];

  return (
    <div className="space-y-8 font-sans">
      {/* System Health Top KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {systemMetrics.map((st, idx) => (
          <div key={idx} className="bg-white border border-[#E4E7EA] p-5 rounded-2xl shadow-xs flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-[#5A646D] uppercase tracking-wider block">{st.label}</span>
              <div className="text-xl font-bold text-[#1A1F24]">{st.value}</div>
              <span className="text-xs text-[#15803D] font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#15803D]" /> {st.change}
              </span>
            </div>
            <div className="p-3 bg-[#F0F7F1] rounded-xl shrink-0">{st.icon}</div>
          </div>
        ))}
      </div>

      {/* Main Admin Header */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#2E7D4F] bg-[#F0F7F1] px-3 py-1 rounded-full border border-[#D9EBDC]">
            Tizim Administratori Paneli
          </span>
          <h1 className="text-lg font-bold text-[#1A1F24] mt-1.5">Tizim Boshqaruvi va Maʻmurlash</h1>
          <p className="text-xs text-[#5A646D] mt-0.5">
            10 ta foydalanuvchi roli boʻyicha huquqlar matritsasi, 84 ta oʻrmon xoʻjaligi ierarxiyasi va cs.egov.uz 14 ta klassifikatori.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" leftIcon={<Database className="w-4 h-4" />}>
            Backup Yaratish
          </Button>
          <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
            Yangi Foydalanuvchi
          </Button>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-4 shadow-xs">
        <Tabs
          tabs={[
            { id: 'roles', label: '10 ta Tizim Rollari (RBAC/ABAC)', count: 10 },
            { id: 'orgs', label: '84 ta Oʻrmon Xoʻjaligi Ierarxiyasi', count: 84 },
            { id: 'classifiers', label: 'cs.egov.uz 14 ta Klassifikator', count: 14 },
          ]}
          activeTabId={activeTab}
          onChange={setActiveTab}
        />
      </div>

      {/* Tab 1: Roles Grid */}
      {activeTab === 'roles' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {roles.map((r, idx) => (
            <div key={idx} className="bg-white border border-[#E4E7EA] p-5 rounded-2xl shadow-xs space-y-3 hover:border-[#7FB98A] transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-[#1A1F24] flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#2E7D4F]" /> {r.name}
                </span>
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold bg-[#F0F7F1] text-[#2E7D4F] border border-[#D9EBDC]">
                  {r.access}
                </span>
              </div>
              <p className="text-xs text-[#5A646D]">{r.scope}</p>
              <div className="pt-2 border-t border-[#E4E7EA] flex justify-between items-center text-xs text-[#767F87]">
                <span>Faol foydalanuvchilar: <b className="text-[#1A1F24] font-mono">{r.usersCount}</b></span>
                <button className="text-[#2E7D4F] font-bold hover:underline">Huquqlarni Sozlash</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Organizations Hierarchy */}
      {activeTab === 'orgs' && (
        <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#E4E7EA] pb-4">
            <h3 className="font-bold text-base text-[#1A1F24]">84 ta Oʻrmon Xoʻjaligi va Hududiy Boshqarmalar</h3>
            <span className="text-xs text-[#5A646D]">Respublika boʻyicha 100% integratsiya qilingan</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {orgsList.map((o, idx) => (
              <div key={idx} className="p-4 bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[#1A1F24] flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#2E7D4F]" /> {o.region}
                  </span>
                  <span className="text-[10px] font-bold text-[#15803D] bg-[#F0F7F1] px-2 py-0.5 rounded border border-[#D9EBDC]">
                    {o.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#5A646D] font-mono">
                  <span>Kod: {o.code}</span>
                  <span>{o.count} ta oʻrmon xoʻjaligi</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Classifiers */}
      {activeTab === 'classifiers' && (
        <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#E4E7EA] pb-4">
            <h3 className="font-bold text-base text-[#1A1F24]">cs.egov.uz 14 ta Davlat Klassifikatori</h3>
            <span className="text-xs text-[#5A646D]">Yagona klassifikatorlar bazasi</span>
          </div>

          <div className="space-y-3">
            {classifiersList.map((cl, idx) => (
              <div key={idx} className="p-4 bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#2E7D4F] bg-[#F0F7F1] px-2 py-0.5 rounded border border-[#D9EBDC]">
                      {cl.id}
                    </span>
                    <h4 className="font-bold text-sm text-[#1A1F24]">{cl.name}</h4>
                  </div>
                  <p className="text-xs text-[#5A646D]">Manba: {cl.provider} | Versiya: {cl.version}</p>
                </div>
                <button className="text-xs font-bold text-[#2E7D4F] hover:underline flex items-center gap-1">
                  Sinxronlash <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Audit Log Preview Section */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#E4E7EA] pb-3">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#2E7D4F]" />
            <h3 className="font-bold text-base text-[#1A1F24]">Audit va Xavfsizlik Loglari (Append-only)</h3>
          </div>
          <span className="text-xs text-[#767F87] font-mono">Oxirgi hodisalar: Real-vaqt</span>
        </div>

        <div className="space-y-2 font-mono text-xs">
          {auditLogs.map((log, idx) => (
            <div key={idx} className="p-3 bg-[#F8F9FA] border border-[#E4E7EA] rounded-lg flex items-center justify-between gap-4 text-[#1A1F24]">
              <div className="flex items-center gap-3">
                <span className="text-[#767F87] font-bold">{log.time}</span>
                <span className="font-semibold text-[#2E7D4F]">{log.user}</span>
                <span className="text-[#5A646D]">{log.action}</span>
              </div>
              <span className="text-[#767F87] bg-white px-2 py-0.5 rounded border border-[#E4E7EA]">{log.ip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
