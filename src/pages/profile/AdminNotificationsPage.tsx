import React, { useState } from 'react';
import {
  Bell,
  CheckCircle2,
  AlertOctagon,
  Shield,
  Database,
  RefreshCw,
  Mail,
  Check,
  Trash2,
  Filter,
  SlidersHorizontal,
  Info,
  Clock,
  Send,
  Smartphone,
  ExternalLink,
  MessageSquare,
  ShieldCheck,
  X,
  Plus,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/FormControls';

export interface AdminNotificationsPageProps {
  onNavigate?: (page: string, params?: any) => void;
}

export const AdminNotificationsPage: React.FC<AdminNotificationsPageProps> = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'security' | 'system'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState(false);

  // Broadcast Notification Form State (TZ 4.2.1.7)
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [broadcastCategory, setBroadcastCategory] = useState('ANNOUNCEMENT');

  // TZ Compliant Notifications Mock Data (SysAdmin context)
  const [notificationsList, setNotificationsList] = useState([
    {
      id: 'NOTIF-2026-9045',
      title: 'Tizim Avto-Backup Muvaffaqiyatli Olindi',
      message: 'PostgreSQL Toshkent-Node01 toʻliq DB zaxirasi (BCK-2026-0812-01, 42.8 GB) Hot Storage xotirasiga saqlandi.',
      timestamp: '10 daqiqa oldin (13:45)',
      category: 'BACKUP_ALERT',
      categoryLabel: 'Zahiraviy Nusxa',
      severity: 'INFO',
      read: false,
      mandatory: false,
      channel: 'In-App + Email',
    },
    {
      id: 'NOTIF-2026-9044',
      title: 'RI-06 Xavfsizlik Ogohlantirishi Bloklandi',
      message: 'Audit logini oʻchirishga boʻlgan ruxsatsiz 194.26.29.110 IP urinishi WORM rejimi va SOC tomonidan qaytarildi.',
      timestamp: '1 soat oldin (12:50)',
      category: 'SYSTEM_SECURITY',
      categoryLabel: 'Xavfsizlik (SOC)',
      severity: 'CRITICAL',
      read: false,
      mandatory: true,
      channel: 'In-App + SMS + Bosh Prokuratura Direct',
    },
    {
      id: 'NOTIF-2026-9043',
      title: 'Raqamli Nazorat Outbox Sinxronizatsiyasi 100%',
      message: 'Bosh Prokuratura 11-serveriga oxirgi 1,240 ta audit yozuvlari va ruxsatnomalar paketi toʻliq uzatildi.',
      timestamp: '3 soat oldin (10:30)',
      category: 'INTEGRATION_STATUS',
      categoryLabel: 'Prokuratura Sync',
      severity: 'INFO',
      read: false,
      mandatory: false,
      channel: 'In-App Portal',
    },
    {
      id: 'NOTIF-2026-9042',
      title: 'E-IMZO CRL/OCSP Sertifikatlar Roʻyxati Yangilandi',
      message: 'Soliq Qoʻmitasi Yagona E-IMZO markazidan bekor qilingan kalitlar (CRL) bazasi muvaffaqiyatli yuklandi.',
      timestamp: 'Kecha 18:00',
      category: 'INTEGRATION_STATUS',
      categoryLabel: 'E-IMZO Modul',
      severity: 'INFO',
      read: true,
      mandatory: false,
      channel: 'In-App Portal',
    },
    {
      id: 'NOTIF-2026-9041',
      title: 'SLA Muddati Ogohlantirishi (Boʻstonliq DЎX)',
      message: '№RX-2026-0088 sonli ruxsatnoma arizasini koʻrib chiqish 5 kunlik SLA muddatiga yetib bormoqda (1 kun qoldi).',
      timestamp: '11 Avgust 09:15',
      category: 'SLA_WARNING',
      categoryLabel: 'SLA Taymer',
      severity: 'WARNING',
      read: true,
      mandatory: true,
      channel: 'In-App + Telegram Bot',
    },
  ]);

  const handleMarkAllAsRead = () => {
    setNotificationsList(notificationsList.map((n) => ({ ...n, read: true })));
  };

  const handleMarkSingleAsRead = (id: string) => {
    setNotificationsList(notificationsList.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const handleDeleteNotification = (id: string) => {
    setNotificationsList(notificationsList.filter((n) => n.id !== id));
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle || !broadcastMessage) return;

    const newNotif = {
      id: `NOTIF-2026-${Date.now().toString().slice(-4)}`,
      title: broadcastTitle,
      message: broadcastMessage,
      timestamp: 'Hozirgina',
      category: broadcastCategory,
      categoryLabel: broadcastCategory === 'ANNOUNCEMENT' ? 'Tizim Eʻloni' : 'Texnik Xabar',
      severity: 'INFO',
      read: false,
      mandatory: false,
      channel: 'Barcha Foydalanuvchilar (In-App + Broadcast)',
    };

    setNotificationsList([newNotif, ...notificationsList]);
    setIsBroadcastModalOpen(false);
    setBroadcastTitle('');
    setBroadcastMessage('');
  };

  const filteredNotifications = notificationsList.filter((n) => {
    const matchesSearch =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.id.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === 'unread') return matchesSearch && !n.read;
    if (activeTab === 'security') return matchesSearch && n.category === 'SYSTEM_SECURITY';
    if (activeTab === 'system') return matchesSearch && n.category !== 'SYSTEM_SECURITY';

    return matchesSearch;
  });

  const unreadCount = notificationsList.filter((n) => !n.read).length;

  return (
    <div className="space-y-6 font-sans">
      {/* Top Header & Delivery Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-white to-[#F0F7F1]/50 border border-[#E4E7EA] p-5 rounded-2xl shadow-xs hover:shadow-md transition-all flex items-center justify-between group">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-[#5A646D] uppercase tracking-wider block">Jami Bildirishnomalar</span>
            <div className="text-xl font-extrabold text-[#1A1F24] tracking-tight">{notificationsList.length} ta</div>
            <span className="text-xs text-[#15803D] font-bold flex items-center gap-1">
              <Bell className="w-3.5 h-3.5" /> Tarixiy arxiv saqlangan
            </span>
          </div>
          <div className="p-3 bg-[#2E7D4F]/10 text-[#2E7D4F] rounded-2xl group-hover:scale-110 transition-transform">
            <Bell className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-amber-50/40 border border-[#E4E7EA] p-5 rounded-2xl shadow-xs hover:shadow-md transition-all flex items-center justify-between group">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-[#5A646D] uppercase tracking-wider block">Oʻqilmagan Xabarlar</span>
            <div className="text-xl font-extrabold text-amber-800 tracking-tight">{unreadCount} ta yangi</div>
            <span className="text-xs text-amber-700 font-bold flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Diqqat talab etadi
            </span>
          </div>
          <div className="p-3 bg-amber-500/10 text-amber-700 rounded-2xl group-hover:scale-110 transition-transform">
            <MessageSquare className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-blue-50/40 border border-[#E4E7EA] p-5 rounded-2xl shadow-xs hover:shadow-md transition-all flex items-center justify-between group">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-[#5A646D] uppercase tracking-wider block">Yetkazib Berish Standarti</span>
            <div className="text-xl font-extrabold text-[#1A1F24] tracking-tight">99.8% Delivered</div>
            <span className="text-xs text-blue-700 font-bold flex items-center gap-1">
              <Send className="w-3.5 h-3.5" /> SMS, In-App, Telegram, Email
            </span>
          </div>
          <div className="p-3 bg-blue-500/10 text-blue-600 rounded-2xl group-hover:scale-110 transition-transform">
            <Send className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-purple-50/40 border border-[#E4E7EA] p-5 rounded-2xl shadow-xs hover:shadow-md transition-all flex items-center justify-between group">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-[#5A646D] uppercase tracking-wider block">Yuridik Majburiy (Mandatory)</span>
            <div className="text-xl font-extrabold text-[#1A1F24] tracking-tight">100% In-App</div>
            <span className="text-xs text-purple-700 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Har doim yetkaziladi (TZ)
            </span>
          </div>
          <div className="p-3 bg-purple-500/10 text-purple-600 rounded-2xl group-hover:scale-110 transition-transform">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#2E7D4F] bg-[#F0F7F1] px-3 py-1 rounded-full border border-[#D9EBDC]">
            MODUL 4.2.8 — BILDIRISHNOMALAR QONUNYATI (С19)
          </span>
          <h1 className="text-2xl font-black text-[#1A1F24] tracking-tight mt-2">Tizim Bildirishnomalari va Xabarlar</h1>
          <p className="text-xs text-[#5A646D] mt-0.5">
            Xavfsizlik signallari, avto-backup statuslari, SLA ogohlantirishlari va barcha kanallar boʻyicha yetkazish jurnali
          </p>
        </div>
        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <Button
              onClick={handleMarkAllAsRead}
              variant="outline"
              size="sm"
              leftIcon={<Check className="w-4 h-4" />}
              className="border-[#E4E7EA] text-[#1A1F24] font-bold hover:bg-gray-50"
            >
              Barchasini oʻqilgan qilish ({unreadCount})
            </Button>
          )}
          <Button
            onClick={() => setIsBroadcastModalOpen(true)}
            variant="primary"
            size="sm"
            leftIcon={<Plus className="w-4 h-4" />}
            className="bg-[#2E7D4F] hover:bg-[#23653F] font-bold shadow-sm"
          >
            Yangi Tizim Eʻloni Yuborish
          </Button>
        </div>
      </div>

      {/* Mandatory Notification Delivery Policy Banner (TZ Scenario C19 & п. 4.2.8) */}
      <div className="bg-gradient-to-r from-[#0A1C0E] to-[#1E3A27] text-white rounded-2xl p-5 shadow-sm border border-[#2E7D4F]/30 flex items-start gap-4">
        <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl shrink-0 mt-0.5 border border-emerald-500/30">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-emerald-400 uppercase tracking-wider text-[11px]">
              🚨 YURIDIK MAJBURIY YETKAZISH REGLAMENTI (TZ С19, 526-SATR)
            </span>
            <span className="text-[10px] font-mono bg-emerald-950/80 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">
              ALWAYS IN-APP
            </span>
          </div>
          <p className="text-emerald-100/90 leading-relaxed font-sans">
            Foydalanuvchi SMS yoki Telegram bildirishnomalarini oʻchirib qoʻygan taqdirda ham, <b className="text-white">Yuridik ahamiyatga ega bildirishnomalar (Ruxsatnoma, SOC Alert, SLA)</b> in-app portal kabinetiga majburiy ravishda yetkaziladi hamda uning tarixi va SHA-256 xeshi audit jurnalida saqlanadi.
          </p>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'all' ? 'bg-[#2E7D4F] text-white shadow-xs' : 'text-[#5A646D] hover:bg-[#F8F9FA]'
            }`}
          >
            Barchasi ({notificationsList.length})
          </button>
          <button
            onClick={() => setActiveTab('unread')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'unread' ? 'bg-[#2E7D4F] text-white shadow-xs' : 'text-[#5A646D] hover:bg-[#F8F9FA]'
            }`}
          >
            Oʻqilmaganlar
            {unreadCount > 0 && (
              <span className="bg-amber-500 text-white text-[10px] px-1.5 py-0.2 rounded-full font-black">
                {unreadCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'security' ? 'bg-[#2E7D4F] text-white shadow-xs' : 'text-[#5A646D] hover:bg-[#F8F9FA]'
            }`}
          >
            Xavfsizlik (SOC)
          </button>
          <button
            onClick={() => setActiveTab('system')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'system' ? 'bg-[#2E7D4F] text-white shadow-xs' : 'text-[#5A646D] hover:bg-[#F8F9FA]'
            }`}
          >
            Tizim Statusi
          </button>
        </div>

        <div className="w-full md:w-80 relative">
          <Input
            placeholder="Bildirishnoma sarlavhasi yoki matni..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Mail className="w-4 h-4 text-[#5A646D]" />}
            touchSize
          />
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="bg-white border border-[#E4E7EA] rounded-2xl p-12 text-center text-[#767F87] font-medium shadow-xs">
            Ushbu filtr boʻyicha bildirishnomalar mavjud emas.
          </div>
        ) : (
          filteredNotifications.map((n) => (
            <div
              key={n.id}
              className={`bg-white border rounded-2xl p-5 shadow-xs transition-all hover:shadow-md flex flex-col md:flex-row items-start justify-between gap-4 ${
                !n.read ? 'border-l-4 border-l-[#2E7D4F] bg-gradient-to-r from-emerald-50/20 to-white' : 'border-[#E4E7EA]'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-3 rounded-2xl shrink-0 mt-0.5 ${
                    n.severity === 'CRITICAL'
                      ? 'bg-rose-100 text-rose-700'
                      : n.severity === 'WARNING'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-[#F0F7F1] text-[#2E7D4F]'
                  }`}
                >
                  {n.severity === 'CRITICAL' ? (
                    <AlertOctagon className="w-6 h-6" />
                  ) : n.category === 'BACKUP_ALERT' ? (
                    <Database className="w-6 h-6" />
                  ) : (
                    <Bell className="w-6 h-6" />
                  )}
                </div>

                <div className="space-y-1 font-sans">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono font-extrabold text-[#2E7D4F] bg-[#F0F7F1] px-2.5 py-0.5 rounded border border-[#D9EBDC]">
                      {n.categoryLabel}
                    </span>
                    {n.mandatory && (
                      <span className="text-[10px] font-extrabold text-purple-800 bg-purple-100 px-2 py-0.5 rounded border border-purple-200">
                        YURIDIK MAJBURIY
                      </span>
                    )}
                    {!n.read && (
                      <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                    )}
                    <span className="text-[11px] text-[#767F87] font-mono flex items-center gap-1 ml-auto md:ml-0">
                      <Clock className="w-3 h-3" /> {n.timestamp}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-[#1A1F24] leading-snug">{n.title}</h3>
                  <p className="text-xs text-[#5A646D] leading-relaxed max-w-3xl">{n.message}</p>

                  <div className="pt-2 text-[10px] text-[#767F87] font-mono flex items-center gap-2">
                    <span>Yetkazilgan kanal: <b>{n.channel}</b></span>
                    <span>• ID: <b>{n.id}</b></span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                {!n.read && (
                  <button
                    onClick={() => handleMarkSingleAsRead(n.id)}
                    title="Oʻqilgan deb belgilash"
                    className="p-2 text-[#2E7D4F] hover:bg-[#F0F7F1] rounded-xl transition-colors"
                  >
                    <Check className="w-5 h-5" />
                  </button>
                )}
                <button
                  onClick={() => handleDeleteNotification(n.id)}
                  title="Oʻchirish"
                  className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Broadcast Announcement Modal (TZ 4.2.1.7 Rule) */}
      {isBroadcastModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-[#E4E7EA]">
            <div className="flex items-center justify-between border-b border-[#E4E7EA] pb-3">
              <h3 className="text-lg font-bold text-[#1A1F24] flex items-center gap-2">
                <Send className="w-5 h-5 text-[#2E7D4F]" /> Yangi Tizim Eʻloni Yuborish
              </h3>
              <button onClick={() => setIsBroadcastModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendBroadcast} className="space-y-4">
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-[#2E7D4F] flex items-start gap-2">
                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  <b>TZ Qoidasi (п. 4.2.1.7):</b> Eʻlonlar va tizim xabarlari barcha foydalanuvchilar toifasiga yoki alohida guruhlarga portal va push kanallari orqali yuboriladi.
                </span>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1A1F24]">Bildirishnoma Sarlavhasi:</label>
                <Input
                  placeholder="Masalan: Tizimda rejalashtirilgan profillaktika xabari..."
                  value={broadcastTitle}
                  onChange={(e) => setBroadcastTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1A1F24]">Kategoriya:</label>
                <select
                  value={broadcastCategory}
                  onChange={(e) => setBroadcastCategory(e.target.value)}
                  className="w-full bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-xs p-3 text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
                >
                  <option value="ANNOUNCEMENT">Tizim Eʻloni (Barcha foydalanuvchilar)</option>
                  <option value="MAINTENANCE">Texnik Profilaktika</option>
                  <option value="POLICY_UPDATE">Qonunchilik Yangilanishi</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1A1F24]">Xabar Matni:</label>
                <textarea
                  rows={4}
                  placeholder="Tizim foydalanuvchilariga yetkazilishi kerak boʻlgan batafsil xabar matnini kiriting..."
                  value={broadcastMessage}
                  onChange={(e) => setBroadcastMessage(e.target.value)}
                  className="w-full bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-xs p-3 text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
                  required
                />
              </div>

              <div className="pt-3 border-t border-[#E4E7EA] flex items-center justify-end gap-3">
                <Button variant="outline" type="button" onClick={() => setIsBroadcastModalOpen(false)}>
                  Bekor qilish
                </Button>
                <Button type="submit" variant="primary" className="bg-[#2E7D4F] hover:bg-[#23653F] font-bold">
                  Eʻlonni Yuborish
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
