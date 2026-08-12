import React, { useState, useRef, useEffect } from 'react';
import {
  Trees,
  Search,
  Bell,
  ChevronDown,
  LayoutDashboard,
  FileText,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  KeyRound,
  CheckCircle2,
  X,
  Mail,
  CreditCard,
  Map,
  Building2,
  Users,
  Shield,
  Sliders,
  Database,
} from 'lucide-react';

export interface CabinetLayoutProps {
  children: React.ReactNode;
  activeNavId?: string;
  userName?: string;
  userRole?: string;
  notificationCount?: number;
  onNavSelect?: (id: string) => void;
  onLogout?: () => void;
}

export const CabinetLayout: React.FC<CabinetLayoutProps> = ({
  children,
  activeNavId = 'dashboard',
  userName = 'Alisher Abdullayev',
  userRole = 'Tuman inspektori',
  notificationCount = 3,
  onNavSelect,
  onLogout,
}) => {
  const [lang, setLang] = useState<'uz' | 'ru'>('uz');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close popovers on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isSysAdmin =
    userRole?.includes('administrator') ||
    userRole?.includes('sys_admin') ||
    userRole?.includes('Tizim administrator');

  const isLeskhozStaff =
    userRole?.includes('Ijrochi') ||
    userRole?.includes('Сотрудник') ||
    userRole?.includes('Руководитель') ||
    userRole?.includes('Markaziy') ||
    userRole?.includes('Центральный') ||
    userRole?.includes('inspektor') ||
    userRole?.includes('Inspektor');

  let navItems: { group: string; items: { id: string; label: string; page: string; icon: React.ReactNode; count?: number; isWarning?: boolean }[] }[] = [];

  if (isSysAdmin) {
    navItems = [
      {
        group: '',
        items: [
          { id: 'admin_settings', label: 'Bosh sahifa (Maʻmurlash)', page: 'admin_settings', icon: <LayoutDashboard className="w-5 h-5" />, count: undefined },
        ],
      },
      {
        group: 'Tizim maʻmurlash',
        items: [
          { id: 'admin_users', label: 'Foydalanuvchilar va rollar', page: 'admin_users', icon: <Users className="w-5 h-5" />, count: 10 },
          { id: 'admin_orgs', label: 'Tashkilotlar ierarxiyasi', page: 'admin_orgs', icon: <Building2 className="w-5 h-5" />, count: 84 },
          { id: 'admin_classifiers', label: 'Klassifikatorlar', page: 'admin_classifiers', icon: <Sliders className="w-5 h-5" />, count: 14 },
          { id: 'admin_system_settings', label: 'Tizim sozlamalari', page: 'admin_system_settings', icon: <Settings className="w-5 h-5" />, count: undefined },
          { id: 'admin_audit', label: 'Audit va loglar', page: 'admin_audit_logs', icon: <Shield className="w-5 h-5" />, count: undefined },
          { id: 'admin_backups', label: 'Zahiraviy nusxalar', page: 'admin_backups', icon: <Database className="w-5 h-5" />, count: undefined },
        ],
      },
      {
        group: 'Mening profilim',
        items: [
          { id: 'e_imzo', label: 'Elektron raqamli imzo', page: 'profile_eimzo', icon: <KeyRound className="w-5 h-5" />, count: undefined },
          { id: 'notifications', label: 'Bildirishnomalar', page: 'profile_notifications', icon: <Bell className="w-5 h-5" />, count: 3 },
        ],
      },
      {
        group: 'Yordam',
        items: [
          { id: 'help', label: 'Yordam va savollar', page: 'admin_help', icon: <HelpCircle className="w-5 h-5" />, count: undefined },
        ],
      },
    ];
  } else if (isLeskhozStaff) {
    navItems = [
      {
        group: '',
        items: [
          { id: 'dashboard', label: 'Bosh sahifa', page: 'leskhoz_inbox', icon: <LayoutDashboard className="w-5 h-5" />, count: undefined },
        ],
      },
      {
        group: 'Hujjatlar va amallar',
        items: [
          { id: 'applications', label: 'Kelib tushgan arizalar', page: 'leskhoz_inbox', icon: <Mail className="w-5 h-5" />, count: 24 },
          { id: 'map', label: 'Uchastkalar xaritasi', page: 'gis_editor', icon: <Map className="w-5 h-5" />, count: undefined },
        ],
      },
      {
        group: 'Mening profilim',
        items: [
          { id: 'e_imzo', label: 'Elektron raqamli imzo', page: 'profile_eimzo', icon: <KeyRound className="w-5 h-5" />, count: undefined },
          { id: 'notifications', label: 'Bildirishnomalar', page: 'profile_notifications', icon: <Bell className="w-5 h-5" />, count: 3 },
        ],
      },
      {
        group: 'Yordam',
        items: [
          { id: 'help', label: 'Yordam va savollar', page: 'applicant_help', icon: <HelpCircle className="w-5 h-5" />, count: undefined },
        ],
      },
    ];
  } else {
    // Applicant (Ariza beruvchi)
    navItems = [
      {
        group: '',
        items: [
          { id: 'dashboard', label: 'Bosh sahifa', page: 'applicant_dashboard', icon: <LayoutDashboard className="w-5 h-5" />, count: undefined },
        ],
      },
      {
        group: 'Mening ishlarim',
        items: [
          { id: 'applications', label: 'Mening arizalarim', page: 'application_card', icon: <Mail className="w-5 h-5" />, count: 4 },
          { id: 'permits', label: 'Mening ruxsatnomalarim', page: 'applicant_permits', icon: <FileText className="w-5 h-5" />, count: 2 },
          { id: 'payments', label: 'Hisoblar va toʻlov', page: 'applicant_dashboard', icon: <CreditCard className="w-5 h-5" />, count: 1, isWarning: true },
          { id: 'map', label: 'Uchastkalar xaritasi', page: 'gis_editor', icon: <Map className="w-5 h-5" />, count: undefined },
        ],
      },
      {
        group: 'Mening profilim',
        items: [
          { id: 'farm_info', label: "Xoʻjalik ma'lumotlari", page: 'admin_settings', icon: <Building2 className="w-5 h-5" />, count: undefined },
          { id: 'e_imzo', label: 'Elektron raqamli imzo', page: 'profile_eimzo', icon: <KeyRound className="w-5 h-5" />, count: undefined },
          { id: 'notifications', label: 'Bildirishnomalar', page: 'profile_notifications', icon: <Bell className="w-5 h-5" />, count: 3 },
        ],
      },
      {
        group: 'Yordam',
        items: [
          { id: 'help', label: 'Yordam va savollar', page: 'applicant_help', icon: <HelpCircle className="w-5 h-5" />, count: undefined },
        ],
      },
    ];
  }

  const notifications = [
    { id: 1, title: 'Yangi ariza keldi №RX-2026-0094', time: '5 daqiqa oldin', unread: true },
    { id: 2, title: 'E-IMZO muhr muvaffaqiyatli qoʻyildi', time: '1 soat oldin', unread: true },
    { id: 3, title: 'Buxgalteriya toʻlovi tasdiqlandi (Payme)', time: '3 soat oldin', unread: false },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans">
      {/* Top Header Bar */}
      <header className="h-16 bg-white border-b border-[#E4E7EA] sticky top-0 z-40 flex items-center justify-between px-4 md:px-6 shadow-xs">
        {/* Brand & Sidebar Toggle */}
        <div className="flex items-center gap-3 w-72 shrink-0">
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-2 rounded-md hover:bg-[#F8F9FA] text-[#5A646D] md:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>

          <button
            onClick={() => {
              if (isSysAdmin) onNavSelect?.('admin_settings');
              else if (isLeskhozStaff) onNavSelect?.('leskhoz_inbox');
              else onNavSelect?.('applicant_dashboard');
            }}
            className="flex items-center gap-2.5 focus:outline-none text-left"
          >
            <div className="w-9 h-9 rounded-lg bg-[#2E7D4F] text-white flex items-center justify-center font-bold shadow-xs">
              <Trees className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-sm font-bold text-[#1A1F24] leading-tight">ruxsatnoma-urmon.uz</span>
              <span className="block text-[11px] text-[#5A646D]">Oʻrmon xoʻjaligi kabineti</span>
            </div>
          </button>
        </div>

        {/* Global Search Input */}
        <div className="hidden md:flex flex-1 max-w-md mx-6 relative">
          <Search className="w-4 h-4 text-[#9AA3AB] absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Ruxsatnoma №, F.I.SH. yoki joy nomi boʻyicha qidiruv..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-9 pr-4 bg-[#F8F9FA] border border-[#767F87] rounded-md text-sm text-[#1A1F24] placeholder-[#9AA3AB] focus:outline-none focus:border-[#2E7D4F] focus:ring-2 focus:ring-[#2E7D4F]/20 transition-all"
          />
        </div>

        {/* Header Actions: Language, Notifications, Profile Dropdown */}
        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <div className="flex border border-[#767F87] rounded-md overflow-hidden bg-white text-xs">
            <button
              onClick={() => setLang('uz')}
              className={`px-2.5 py-1.5 font-semibold transition-colors ${
                lang === 'uz' ? 'bg-[#2E7D4F] text-white' : 'text-[#5A646D] hover:bg-[#F8F9FA]'
              }`}
            >
              UZ
            </button>
            <button
              onClick={() => setLang('ru')}
              className={`px-2.5 py-1.5 font-semibold transition-colors ${
                lang === 'ru' ? 'bg-[#2E7D4F] text-white' : 'text-[#5A646D] hover:bg-[#F8F9FA]'
              }`}
            >
              RU
            </button>
          </div>

          {/* Notifications Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => { setIsNotifOpen(!isNotifOpen); setIsUserMenuOpen(false); }}
              className="relative w-10 h-10 rounded-md hover:bg-[#F8F9FA] flex items-center justify-center text-[#5A646D] transition-colors"
            >
              <Bell className="w-5 h-5" />
              {notificationCount > 0 && (
                <span className="absolute top-1.5 right-1.5 min-w-4 h-4 px-1 bg-[#B91C1C] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-[#E4E7EA] rounded-2xl shadow-xl z-50 p-4 space-y-3 animate-in fade-in duration-150">
                <div className="flex items-center justify-between border-b border-[#E4E7EA] pb-2">
                  <h4 className="font-bold text-sm text-[#1A1F24]">Bildirishnomalar</h4>
                  <button onClick={() => setIsNotifOpen(false)} className="text-[#767F87] hover:text-[#1A1F24]">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-2 text-xs">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-3 rounded-xl border ${
                        n.unread ? 'bg-[#F0F7F1] border-[#D9EBDC]' : 'bg-[#F8F9FA] border-[#E4E7EA]'
                      }`}
                    >
                      <div className="font-semibold text-[#1A1F24]">{n.title}</div>
                      <div className="text-[11px] text-[#767F87] mt-0.5">{n.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Dropdown */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => { setIsUserMenuOpen(!isUserMenuOpen); setIsNotifOpen(false); }}
              className="flex items-center gap-2.5 pl-2 border-l border-[#E4E7EA] py-1 px-2 rounded-lg hover:bg-[#F8F9FA] transition-all text-left focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full bg-[#D9EBDC] text-[#123522] font-bold flex items-center justify-center text-xs shadow-xs uppercase">
                {userName ? userName.split(' ').map(n => n[0]).join('').slice(0, 2) : 'U'}
              </div>
              <div className="hidden lg:block">
                <span className="block text-xs font-semibold text-[#1A1F24] leading-tight">{userName}</span>
                <span className="block text-[11px] text-[#5A646D]">{userRole}</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-[#767F87] transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Interactive Profile Dropdown Menu */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white border border-[#E4E7EA] rounded-2xl shadow-xl z-50 p-4 space-y-4 animate-in fade-in duration-150">
                {/* User Header Summary */}
                <div className="flex items-center gap-3 p-3 bg-[#F0F7F1] border border-[#D9EBDC] rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-[#2E7D4F] text-white font-bold flex items-center justify-center text-sm shadow-xs shrink-0 uppercase">
                    {userName ? userName.split(' ').map(n => n[0]).join('').slice(0, 2) : 'U'}
                  </div>
                  <div className="truncate">
                    <div className="font-bold text-xs text-[#1A1F24] truncate">{userName}</div>
                    <div className="text-[11px] text-[#5A646D]">{userRole}</div>
                    <div className="text-[10px] font-mono text-[#2E7D4F] flex items-center gap-1 mt-0.5">
                      <CheckCircle2 className="w-3 h-3 text-[#15803D]" /> OneID Tasdiqlangan
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="space-y-1 text-xs">
                  <button
                    onClick={() => { onNavSelect?.('admin_settings'); setIsUserMenuOpen(false); }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-[#1A1F24] hover:bg-[#F8F9FA] hover:text-[#2E7D4F] transition-colors text-left"
                  >
                    <Settings className="w-4 h-4 text-[#5A646D]" />
                    <span>Profil va Sozlamalar</span>
                  </button>

                  <button
                    onClick={() => { onNavSelect?.('applicant_wizard'); setIsUserMenuOpen(false); }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-[#1A1F24] hover:bg-[#F8F9FA] hover:text-[#2E7D4F] transition-colors text-left"
                  >
                    <KeyRound className="w-4 h-4 text-[#5A646D]" />
                    <span>E-IMZO Kalitlari</span>
                  </button>

                  <button
                    onClick={() => { onNavSelect?.('applicant_help'); setIsUserMenuOpen(false); }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-[#1A1F24] hover:bg-[#F8F9FA] hover:text-[#2E7D4F] transition-colors text-left"
                  >
                    <HelpCircle className="w-4 h-4 text-[#5A646D]" />
                    <span>Yordam va Yoʻriqnoma</span>
                  </button>
                </div>

                {/* Logout Divider & Button */}
                <div className="pt-2 border-t border-[#E4E7EA]">
                  <button
                    onClick={() => {
                      if (onLogout) onLogout();
                      else onNavSelect?.('home');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-[#B91C1C] hover:bg-[#FEF2F2] transition-colors font-bold text-xs text-left"
                  >
                    <LogOut className="w-4 h-4 text-[#B91C1C]" />
                    <span>Tizimdan Chiqish</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Shell Body: Sidebar + Main Content */}
      <div className="flex flex-1">
        {/* Left Sidebar */}
        <aside
          className={`bg-white border-r border-[#E4E7EA] transition-all duration-200 flex flex-col justify-between shrink-0 ${
            isSidebarCollapsed ? 'w-16' : 'w-72'
          }`}
        >
          <div className="p-3 space-y-4">
            {navItems.map((group, idx) => (
              <div key={idx}>
                {!isSidebarCollapsed && (
                  <div className="px-3 text-[11px] font-semibold uppercase tracking-wider text-[#9AA3AB] mb-1">
                    {group.group}
                  </div>
                )}
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const isActive = item.id === activeNavId || item.page === activeNavId;
                    return (
                      <button
                        key={item.id}
                        onClick={() => onNavSelect?.(item.page)}
                        title={item.label}
                        className={`w-full flex items-center gap-3 h-10 px-3 rounded-md text-xs font-semibold transition-all ${
                          isActive
                            ? 'bg-[#F0F7F1] text-[#2E7D4F] font-bold border-l-4 border-[#2E7D4F]'
                            : 'text-[#1A1F24] hover:bg-[#F8F9FA]'
                        }`}
                      >
                        <span className={isActive ? 'text-[#2E7D4F]' : 'text-[#5A646D]'}>
                          {item.icon}
                        </span>
                        {!isSidebarCollapsed && (
                          <>
                            <span className="flex-1 text-left truncate leading-tight">{item.label}</span>
                            {item.count !== undefined && (
                              <span
                                className={`text-[11px] px-2 py-0.5 rounded-full font-bold shrink-0 ${
                                  item.isWarning
                                    ? 'bg-[#B45309] text-white'
                                    : isActive
                                    ? 'bg-[#D9EBDC] text-[#123522]'
                                    : 'bg-[#E4E7EA] text-[#5A646D]'
                                }`}
                              >
                                {item.count}
                              </span>
                            )}
                          </>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar Footer */}
          <div className="p-3 border-t border-[#E4E7EA]">
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="w-full flex items-center gap-3 h-10 px-3 rounded-md text-xs font-semibold text-[#5A646D] hover:bg-[#F8F9FA] transition-colors"
            >
              <Menu className="w-4 h-4" />
              {!isSidebarCollapsed && <span>Menyuni yigʻish</span>}
            </button>
            <button
              onClick={() => onNavSelect?.('home')}
              className="w-full flex items-center gap-3 h-10 px-3 rounded-md text-xs font-semibold text-[#B91C1C] hover:bg-[#FEF2F2] transition-colors mt-1"
            >
              <LogOut className="w-4 h-4" />
              {!isSidebarCollapsed && <span>Tizimdan chiqish</span>}
            </button>
          </div>
        </aside>

        {/* Main Application Area */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
};
