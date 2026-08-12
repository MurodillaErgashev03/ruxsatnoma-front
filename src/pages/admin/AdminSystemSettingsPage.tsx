import React, { useState } from 'react';
import {
  Settings,
  ShieldCheck,
  Server,
  Lock,
  Globe,
  Bell,
  Database,
  Save,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  Sliders,
  RefreshCw,
  Clock,
  Smartphone,
  Cpu,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/FormControls';

export interface AdminSystemSettingsPageProps {
  onNavigate?: (page: string, params?: any) => void;
}

export const AdminSystemSettingsPage: React.FC<AdminSystemSettingsPageProps> = () => {
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'security' | 'integrations' | 'notifications' | 'backup'>('general');

  // System Settings State
  const [bhmValue, setBhmValue] = useState('375000');
  const [reviewTermDays, setReviewTermDays] = useState('5');
  const [sessionTimeoutMinutes, setSessionTimeoutMinutes] = useState('30');
  const [maxFailedLogins, setMaxFailedLogins] = useState('5');
  const [auditLogRetentionYears, setAuditLogRetentionYears] = useState('3');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [eimzoMandatory, setEimzoMandatory] = useState(true);
  const [mfaEnabled, setMfaEnabled] = useState(true);
  const [smsGatewayActive, setSmsGatewayActive] = useState(true);
  const [telegramBotActive, setTelegramBotActive] = useState(true);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 4000);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Header & Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E4E7EA] p-5 rounded-2xl shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#5A646D] uppercase tracking-wider block">BHM Qiymati (2026)</span>
            <div className="text-xl font-bold text-[#1A1F24] font-mono">375,000 UZS</div>
            <span className="text-xs text-[#15803D] font-medium block mt-1">Moliya Vazirligi integratsiyasi</span>
          </div>
          <div className="p-3 bg-[#F0F7F1] rounded-xl text-[#2E7D4F]">
            <Sliders className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white border border-[#E4E7EA] p-5 rounded-2xl shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#5A646D] uppercase tracking-wider block">Xavfsizlik Perimetri</span>
            <div className="text-xl font-bold text-[#1A1F24]">E-IMZO / MFA</div>
            <span className="text-xs text-[#15803D] font-medium flex items-center gap-1 mt-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Davlat standarti faol
            </span>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Lock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white border border-[#E4E7EA] p-5 rounded-2xl shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#5A646D] uppercase tracking-wider block">Tashqi Integratsiyalar</span>
            <div className="text-xl font-bold text-[#1A1F24]">5/5 Onlayn</div>
            <span className="text-xs text-[#15803D] font-medium block mt-1">OneID, E-IMZO, Prokuratura</span>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <Globe className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white border border-[#E4E7EA] p-5 rounded-2xl shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#5A646D] uppercase tracking-wider block">Profilaktika Rejimi</span>
            <div className="text-xl font-bold text-[#1A1F24]">
              {maintenanceMode ? 'YOQILGAN' : 'OʻCHIRILGAN'}
            </div>
            <span className="text-xs text-[#5A646D] font-medium block mt-1">
              {maintenanceMode ? 'Tizim profilaktikada' : 'Tizim toʻliq faol'}
            </span>
          </div>
          <div className={`p-3 rounded-xl ${maintenanceMode ? 'bg-amber-50 text-amber-600' : 'bg-green-50 text-green-600'}`}>
            <Server className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#2E7D4F] bg-[#F0F7F1] px-3 py-1 rounded-full border border-[#D9EBDC]">
            Tizim Admini Maʻmurlashi
          </span>
          <h1 className="text-lg font-bold text-[#1A1F24] mt-1.5">Tizim Sozlamalari va Konfiguratsiyasi</h1>
          <p className="text-xs text-[#5A646D] mt-0.5">
            Portal parametrlari, E-IMZO majburiyligi, seans taym-autlari, API kalitlari va avto-backup jadvali
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isSaved && (
            <span className="text-xs font-bold text-[#15803D] bg-[#F0F7F1] px-3 py-2 rounded-xl border border-[#D9EBDC] flex items-center gap-1.5 animate-bounce">
              <CheckCircle2 className="w-4 h-4" /> Sozlamalar saqlandi!
            </span>
          )}
          <Button
            onClick={handleSaveSettings}
            variant="primary"
            size="sm"
            leftIcon={<Save className="w-4 h-4" />}
            className="bg-[#2E7D4F] hover:bg-[#23653F] font-bold shadow-sm"
          >
            Sozlamalarni Saqlash
          </Button>
        </div>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-2 shadow-xs flex items-center gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('general')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'general' ? 'bg-[#2E7D4F] text-white shadow-xs' : 'text-[#5A646D] hover:bg-gray-100'
          }`}
        >
          <Sliders className="w-4 h-4" /> 1. Asosiy Parametrlar
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'security' ? 'bg-[#2E7D4F] text-white shadow-xs' : 'text-[#5A646D] hover:bg-gray-100'
          }`}
        >
          <Lock className="w-4 h-4" /> 2. Xavfsizlik & E-IMZO
        </button>
        <button
          onClick={() => setActiveTab('integrations')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'integrations' ? 'bg-[#2E7D4F] text-white shadow-xs' : 'text-[#5A646D] hover:bg-gray-100'
          }`}
        >
          <Globe className="w-4 h-4" /> 3. Tashqi Integratsiyalar
        </button>
        <button
          onClick={() => setActiveTab('notifications')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'notifications' ? 'bg-[#2E7D4F] text-white shadow-xs' : 'text-[#5A646D] hover:bg-gray-100'
          }`}
        >
          <Bell className="w-4 h-4" /> 4. Xabarnomalar & SMS
        </button>
        <button
          onClick={() => setActiveTab('backup')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'backup' ? 'bg-[#2E7D4F] text-white shadow-xs' : 'text-[#5A646D] hover:bg-gray-100'
          }`}
        >
          <Database className="w-4 h-4" /> 5. Backup & Profilaktika
        </button>
      </div>

      {/* Tab 1: General Parameters */}
      {activeTab === 'general' && (
        <form onSubmit={handleSaveSettings} className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs space-y-6">
          <div className="border-b border-[#E4E7EA] pb-3">
            <h3 className="font-bold text-base text-[#1A1F24] flex items-center gap-2">
              <Sliders className="w-5 h-5 text-[#2E7D4F]" /> General Portal Settings
            </h3>
            <p className="text-xs text-[#5A646D]">Tizimning moliyaviy va reglament vaqtlari boʻyicha asosiy konstantalar</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1A1F24]">BHM (Baza Hisoblash Miqdori) (UZS):</label>
              <Input
                value={bhmValue}
                onChange={(e) => setBhmValue(e.target.value)}
                placeholder="375000"
                className="font-mono font-bold"
              />
              <span className="text-[11px] text-[#767F87]">2026-yil uchun belgilangan BHM stavkasi (toʻlovlar hisob-kitobi uchun)</span>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1A1F24]">Ariza koʻrib chiqish reglament muddati (ish kuni):</label>
              <Input
                value={reviewTermDays}
                onChange={(e) => setReviewTermDays(e.target.value)}
                placeholder="5"
                className="font-mono font-bold"
              />
              <span className="text-[11px] text-[#767F87]">Ijrochi xodimlar uchun belgilangan standart reglament kuni (VMQ 278-son)</span>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1A1F24]">Portal Nomi va Sarlavhasi:</label>
              <Input defaultValue="Oʻrmon Xoʻjaligi Davlat Portali - Ruxsatnomalar" />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1A1F24]">Rasmiy Domen va API Endpoint:</label>
              <Input defaultValue="https://ruxsatnoma-urmon.uz/api/v1" className="font-mono" />
            </div>
          </div>
        </form>
      )}

      {/* Tab 2: Security & E-IMZO */}
      {activeTab === 'security' && (
        <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs space-y-6">
          <div className="border-b border-[#E4E7EA] pb-3">
            <h3 className="font-bold text-base text-[#1A1F24] flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#2E7D4F]" /> Security & E-IMZO Authentication
            </h3>
            <p className="text-xs text-[#5A646D]">Foydalanuvchi seanslari, parol xavfsizligi va E-IMZO raqamli imzo talablari</p>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-[#1A1F24]">E-IMZO Majburiy Imzolash (Sign Requirement)</h4>
                <p className="text-xs text-[#5A646D]">Barcha qaror va ruxsatnomalar faqat E-IMZO kaliti bilan tasdiqlanadi</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={eimzoMandatory}
                  onChange={() => setEimzoMandatory(!eimzoMandatory)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2E7D4F]" />
              </label>
            </div>

            <div className="p-4 bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-[#1A1F24]">MFA (Ikki Bosqichli Autentifikatsiya)</h4>
                <p className="text-xs text-[#5A646D]">Xodimlar va adminlar uchun SMS / OTP 2FA talabi</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={mfaEnabled}
                  onChange={() => setMfaEnabled(!mfaEnabled)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2E7D4F]" />
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1A1F24]">Seans taym-auti (daqiqada):</label>
                <Input
                  value={sessionTimeoutMinutes}
                  onChange={(e) => setSessionTimeoutMinutes(e.target.value)}
                  className="font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1A1F24]">Max muvaffaqiyatsiz kirish urinishi:</label>
                <Input
                  value={maxFailedLogins}
                  onChange={(e) => setMaxFailedLogins(e.target.value)}
                  className="font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1A1F24]">Audit loglarini saqlash muddati (yil):</label>
                <Input
                  value={auditLogRetentionYears}
                  onChange={(e) => setAuditLogRetentionYears(e.target.value)}
                  className="font-mono"
                />
                <span className="text-[10px] text-[#767F87]">TZ talabi: Kamida 3 yil (WORM Append-only)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: External Integrations */}
      {activeTab === 'integrations' && (
        <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs space-y-4">
          <div className="border-b border-[#E4E7EA] pb-3">
            <h3 className="font-bold text-base text-[#1A1F24] flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#2E7D4F]" /> Tashqi Davlat Integratsiyalari Statusi
            </h3>
            <p className="text-xs text-[#5A646D]">OneID, E-IMZO, Raqamli Nazorat, Billing hamda GIS Geoserver ulanishlari</p>
          </div>

          <div className="space-y-3">
            {[
              { name: 'OneID OAuth2 Single Sign-On Gateway', url: 'https://sso.egov.uz', status: 'Onlayn', ping: '14ms', provider: 'E-GOV' },
              { name: 'E-IMZO Raqamli Imzo Sertifikat Reyestri', url: 'https://e-imzo.soliq.uz', status: 'Onlayn', ping: '22ms', provider: 'NIST Davlat Reyestri' },
              { name: 'Raqamli Nazorat (Bosh Prokuratura Yopiq Perimetr API)', url: 'https://nazorat.prokuratura.uz/api', status: 'Onlayn', ping: '18ms', provider: 'Bosh Prokuratura 11-tarmoq' },
              { name: 'Payme / Click & E-GOV Payment Gateway', url: 'https://billing.egov.uz/v2', status: 'Onlayn', ping: '35ms', provider: 'Moliya Vazirligi Billing' },
              { name: 'GIS Geoserver Engine (EPSG:4326 WGS-84)', url: 'https://gis.ruxsatnoma-urmon.uz/geoserver', status: 'Onlayn', ping: '8ms', provider: 'Oʻrmon Loyiha Geodeziya' },
            ].map((ig, idx) => (
              <div key={idx} className="p-4 bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-[#1A1F24]">{ig.name}</h4>
                    <span className="text-[10px] font-bold text-[#15803D] bg-[#F0F7F1] px-2 py-0.5 rounded border border-[#D9EBDC]">
                      {ig.status} ({ig.ping})
                    </span>
                  </div>
                  <p className="text-xs font-mono text-[#5A646D]">Endpoint: {ig.url} | Provayder: {ig.provider}</p>
                </div>
                <Button variant="outline" size="sm" leftIcon={<RefreshCw className="w-3.5 h-3.5" />}>
                  Qayta ulanish
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Notifications & SMS */}
      {activeTab === 'notifications' && (
        <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs space-y-6">
          <div className="border-b border-[#E4E7EA] pb-3">
            <h3 className="font-bold text-base text-[#1A1F24] flex items-center gap-2">
              <Bell className="w-5 h-5 text-[#2E7D4F]" /> Xabarnomalar & SMS Gateway
            </h3>
            <p className="text-xs text-[#5A646D]">Arizachilarga SMS, Telegram Bot va Email xabarnomalar yuborish kanallari</p>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-[#1A1F24]">E-GOV SMS Gateway Servisi</h4>
                <p className="text-xs text-[#5A646D]">Arizachiga ruxsatnoma tayyor boʻlganda avtomatik SMS yuborish</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={smsGatewayActive}
                  onChange={() => setSmsGatewayActive(!smsGatewayActive)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2E7D4F]" />
              </label>
            </div>

            <div className="p-4 bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-[#1A1F24]">Telegram Bot Bildirishnomalar Servisi</h4>
                <p className="text-xs text-[#5A646D]">Inspektor va xodimlarga yangi arizalar boʻyicha push-xabar yuborish</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={telegramBotActive}
                  onChange={() => setTelegramBotActive(!telegramBotActive)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2E7D4F]" />
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Backup & Maintenance */}
      {activeTab === 'backup' && (
        <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs space-y-6">
          <div className="border-b border-[#E4E7EA] pb-3">
            <h3 className="font-bold text-base text-[#1A1F24] flex items-center gap-2">
              <Database className="w-5 h-5 text-[#2E7D4F]" /> Backup Schedule & Maintenance Mode
            </h3>
            <p className="text-xs text-[#5A646D]">Maʼlumotlar bazasining zaxira nusxasini olish va tizim profilaktika rejimi</p>
          </div>

          <div className="space-y-4">
            <div className="p-5 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-amber-900 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-700" /> Tizim Profilaktika Rejimi (Maintenance Mode)
                </h4>
                <p className="text-xs text-amber-800 mt-1">
                  Yoqilganda: Arizachilar va tashqi foydalanuvchilar uchun kirish vaqtincha cheklanadi.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={maintenanceMode}
                  onChange={() => setMaintenanceMode(!maintenanceMode)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600" />
              </label>
            </div>

            <div className="p-4 bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl space-y-2">
              <h4 className="font-bold text-sm text-[#1A1F24]">Avto-Backup Cron Jadvali:</h4>
              <div className="flex items-center gap-3 font-mono text-xs text-[#5A646D]">
                <span className="bg-white px-3 py-1.5 rounded-lg border border-[#E4E7EA] text-[#1A1F24] font-bold">
                  Cron: 0 3 * * * (Har kuni 03:00 da)
                </span>
                <span>Saqlash muddati: <b>30 kunlik arxiv</b></span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
