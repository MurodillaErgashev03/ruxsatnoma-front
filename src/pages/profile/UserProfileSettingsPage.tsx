import React, { useState } from 'react';
import {
  ShieldCheck,
  Key,
  Globe,
  Smartphone,
  Mail,
  Building2,
  CheckCircle2,
  Save,
  FileCheck,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/FormControls';
import { Tabs } from '../../components/ui/Navigation';
import { MOCK_USERS, type MockUser } from '../../data/mockUsers';

export interface UserProfileSettingsPageProps {
  onNavigate?: (page: string, params?: any) => void;
  userRole?: string;
  userName?: string;
  user?: MockUser;
}

export const UserProfileSettingsPage: React.FC<UserProfileSettingsPageProps> = ({
  onNavigate,
  userRole,
  userName,
  user,
}) => {
  const [activeTab, setActiveTab] = useState('personal');
  const [language, setLanguage] = useState<'uz' | 'ru'>('uz');
  const [smsNotify, setSmsNotify] = useState(true);
  const [telegramNotify, setTelegramNotify] = useState(true);

  const activeUser: MockUser =
    user ||
    MOCK_USERS.find(
      (u) =>
        u.fullName === userName ||
        u.role === userRole ||
        u.roleNameUz === userRole
    ) ||
    MOCK_USERS[0];

  const initials = activeUser.fullName
    ? activeUser.fullName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'U';

  const defaultEmails: Record<string, string> = {
    'usr-001': 's.ergashov@uzmon.uz',
    'usr-002': 'j.karimov@urmon.gov.uz',
    'usr-003': 'n.tashpulatova@urmon.gov.uz',
    'usr-004': 'j.rahimov@bostonliq-urmon.uz',
    'usr-005': 'b.yusupov@urmonloyiha.uz',
    'usr-006': 'd.mirzayev@bostonliq-urmon.uz',
    'usr-007': 'a.abdullayev@urmon.gov.uz',
    'usr-008': 'm.umarova@urmon.gov.uz',
    'usr-009': 'o.saidov@burchmulla.uz',
    'usr-010': 'u.xalilov@prokuratura.uz',
  };

  const profileData = {
    fullName: activeUser.fullName,
    roleTitle: `${activeUser.roleNameUz} / ${activeUser.position}`,
    organization: activeUser.organization,
    pinfl: activeUser.jshshir,
    inn: activeUser.id === 'usr-009' ? '304918234' : '200891234',
    phone: `+998 (71) 207-88-${activeUser.id.replace('usr-0', '1')}`,
    email: defaultEmails[activeUser.id] || `${activeUser.role}@urmon.gov.uz`,
    oneIdStatus: 'VERIFIED',
    eimzoStatus: 'ACTIVE',
    eimzoSerial: '1A2B3C4D5E6F7890',
    eimzoValidTo: '2027-06-15',
    eimzoDaysRemaining: 305,
  };

  const handleSaveSettings = () => {
    alert('Shaxsiy sozlamalar muvaffaqiyatli saqlandi!');
  };

  return (
    <div className="space-y-6 font-sans pb-16">
      {/* 1. Header Card */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#2E7D4F] text-white flex items-center justify-center font-bold text-xl shadow-xs shrink-0 uppercase">
            {initials}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#2E7D4F] bg-[#F0F7F1] px-2.5 py-0.5 rounded border border-[#D9EBDC]">
                SHAXSIY PROFIL
              </span>
              <span className="text-[11px] font-bold text-[#15803D] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> OneID Tasdiqlangan
              </span>
            </div>
            <h1 className="text-lg md:text-xl font-bold text-[#1A1F24] mt-1">
              {profileData.fullName}
            </h1>
            <p className="text-xs text-[#5A646D]">
              {profileData.roleTitle} · {profileData.organization}
            </p>
          </div>
        </div>

        <Button
          variant="primary"
          size="sm"
          leftIcon={<Save className="w-4 h-4" />}
          onClick={handleSaveSettings}
          className="bg-[#2E7D4F] hover:bg-[#23653F] text-white font-bold text-xs h-9 cursor-pointer shadow-xs"
        >
          Sozlamalarni Saqlash
        </Button>
      </div>

      {/* 2. Status Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-[#E4E7EA] rounded-2xl p-4 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase text-[#5A646D]">Identifikatsiya (OneID)</span>
            <div className="text-base font-bold text-[#15803D] mt-0.5 font-mono">JSHSHIR: {profileData.pinfl}</div>
            <span className="text-[11px] text-[#5A646D]">Davlat Yagona Identifikatsiya Tizimi</span>
          </div>
          <div className="p-2.5 bg-[#F0F7F1] rounded-xl text-[#2E7D4F]">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-[#E4E7EA] rounded-2xl p-4 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase text-[#5A646D]">E-IMZO Kaliti Statusi</span>
            <div className="text-base font-bold text-[#2E7D4F] mt-0.5 font-mono">FAOL (Oʻz DSt 1092)</div>
            <span className="text-[11px] text-[#15803D]">Amal qilish muddati: {profileData.eimzoValidTo} ({profileData.eimzoDaysRemaining} kun)</span>
          </div>
          <div className="p-2.5 bg-emerald-50 rounded-xl text-[#15803D]">
            <Key className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-[#E4E7EA] rounded-2xl p-4 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase text-[#5A646D]">Biriktirilgan Tashkilot</span>
            <div className="text-base font-bold text-[#1A1F24] mt-0.5">Oʻrmon Agentligi</div>
            <span className="text-[11px] text-[#5A646D]">STIR: {profileData.inn}</span>
          </div>
          <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600">
            <Building2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 3. Navigation Tabs */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-4 shadow-xs space-y-6">
        <Tabs
          tabs={[
            { id: 'personal', label: 'Shaxsiy Maʼlumotlar (OneID)' },
            { id: 'eimzo', label: 'E-IMZO Kaliti va Sertifikat' },
            { id: 'preferences', label: 'Tizim va Bildirishnoma Sozlamalari' },
          ]}
          activeTabId={activeTab}
          onChange={setActiveTab}
        />

        {/* Tab 1: Personal Data */}
        {activeTab === 'personal' && (
          <div className="space-y-4 pt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-[#5A646D] block mb-1">F.I.SH (Toʻliq ism):</label>
                <Input value={profileData.fullName} readOnly className="bg-[#F8F9FA]" />
              </div>

              <div>
                <label className="text-xs font-bold text-[#5A646D] block mb-1">Tashkilot va Lavozim:</label>
                <Input value={profileData.roleTitle} readOnly className="bg-[#F8F9FA]" />
              </div>

              <div>
                <label className="text-xs font-bold text-[#5A646D] block mb-1">JSHSHIR (14 xonali kodi):</label>
                <Input value={profileData.pinfl} readOnly className="bg-[#F8F9FA] font-mono" />
              </div>

              <div>
                <label className="text-xs font-bold text-[#5A646D] block mb-1">Tashkilot STIR (INN):</label>
                <Input value={profileData.inn} readOnly className="bg-[#F8F9FA] font-mono" />
              </div>

              <div>
                <label className="text-xs font-bold text-[#5A646D] block mb-1">Xizmat Telefoni:</label>
                <Input defaultValue={profileData.phone} leftIcon={<Smartphone className="w-4 h-4 text-[#767F87]" />} />
              </div>

              <div>
                <label className="text-xs font-bold text-[#5A646D] block mb-1">Rasmiy Elektron Pochtasi (Email):</label>
                <Input defaultValue={profileData.email} leftIcon={<Mail className="w-4 h-4 text-[#767F87]" />} />
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: E-IMZO Details */}
        {activeTab === 'eimzo' && (
          <div className="space-y-4 pt-2">
            <div className="p-4 bg-[#F0F7F1] border border-[#D9EBDC] rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileCheck className="w-6 h-6 text-[#2E7D4F]" />
                <div>
                  <div className="font-bold text-[#1A1F24] text-xs">Aktiv E-IMZO Kaliti Mavjud</div>
                  <div className="text-[11px] text-[#5A646D]">Kalit seriya raqami: <span className="font-mono font-bold">{profileData.eimzoSerial}</span></div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate?.('profile_eimzo')}
                className="border-[#2E7D4F] text-[#2E7D4F] hover:bg-white font-bold text-xs"
              >
                E-IMZO Profiliga Oʻtish
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-[#E4E7EA] rounded-xl space-y-2">
                <span className="text-xs font-bold text-[#5A646D]">Kriptografiya Standarti:</span>
                <div className="text-sm font-bold text-[#1A1F24]">Oʻz DSt 1092:2009 Davlat Sertifikati</div>
                <div className="text-xs text-[#5A646D]">Soliq Qoʻmitasi Yagona E-IMZO Markazi tomonidan berilgan</div>
              </div>

              <div className="p-4 border border-[#E4E7EA] rounded-xl space-y-2">
                <span className="text-xs font-bold text-[#5A646D]">Sertifikat Amal Qilish Muddati:</span>
                <div className="text-sm font-bold text-[#15803D] font-mono">{profileData.eimzoValidTo} ({profileData.eimzoDaysRemaining} kun qoldi)</div>
                <div className="text-xs text-[#5A646D]">CRL va OCSP orqali real-vaqtda tekshiriladi</div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: System & Notification Preferences */}
        {activeTab === 'preferences' && (
          <div className="space-y-6 pt-2">
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#5A646D]">Tizim Tili (Язык интерфейса)</h3>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setLanguage('uz')}
                  className={`px-4 py-2 text-xs font-bold rounded-xl border flex items-center gap-2 transition-all cursor-pointer ${
                    language === 'uz'
                      ? 'bg-[#2E7D4F] text-white border-[#2E7D4F]'
                      : 'bg-white text-[#1A1F24] border-[#E4E7EA] hover:bg-[#F8F9FA]'
                  }`}
                >
                  <Globe className="w-4 h-4" /> Oʻzbekcha (UZ)
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('ru')}
                  className={`px-4 py-2 text-xs font-bold rounded-xl border flex items-center gap-2 transition-all cursor-pointer ${
                    language === 'ru'
                      ? 'bg-[#2E7D4F] text-white border-[#2E7D4F]'
                      : 'bg-white text-[#1A1F24] border-[#E4E7EA] hover:bg-[#F8F9FA]'
                  }`}
                >
                  <Globe className="w-4 h-4" /> Русский (RU)
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E4E7EA] space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#5A646D]">Bildirishnoma Kanallari</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-3 text-xs font-semibold text-[#1A1F24] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={smsNotify}
                    onChange={(e) => setSmsNotify(e.target.checked)}
                    className="w-4 h-4 accent-[#2E7D4F] rounded"
                  />
                  <span>SMS orqali shoshilinch bildirishnomalarni olish (Muddati oʻtayotgan hisobotlar va arizalar)</span>
                </label>

                <label className="flex items-center gap-3 text-xs font-semibold text-[#1A1F24] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={telegramNotify}
                    onChange={(e) => setTelegramNotify(e.target.checked)}
                    className="w-4 h-4 accent-[#2E7D4F] rounded"
                  />
                  <span>Telegram Bot (@urmon_ruxsatnoma_bot) orqali bildirishnoma va risk-indikator xabarlarini olish</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
