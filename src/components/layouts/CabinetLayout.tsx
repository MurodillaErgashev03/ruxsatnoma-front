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
  FileBarChart,
  QrCode,
  CheckSquare,
  Layers,
  Calculator,
  Eye,
  PlusCircle,
  Megaphone,
  ClipboardList,
  AlertTriangle,
  Archive,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Modal } from '../ui/Overlay';

export interface CabinetLayoutProps {
  children: React.ReactNode;
  activeNavId?: string;
  userName?: string;
  userRole?: string;
  userRoleCode?: string;
  notificationCount?: number;
  onNavSelect?: (id: string) => void;
  onLogout?: () => void;
}

type RoleCode =
  | 'sys_admin'
  | 'central_admin'
  | 'management'
  | 'executor_head'
  | 'executor_staff'
  | 'gis_specialist'
  | 'inspector'
  | 'accountant'
  | 'prosecutor'
  | 'applicant';

interface NavItem {
  id: string;
  label: string;
  page: string;
  icon: React.ReactNode;
  count?: number;
  isWarning?: boolean;
}

interface NavGroup {
  group: string;
  items: NavItem[];
}

const ICON = 'w-5 h-5';

/**
 * Display names that also identify a role, for callers that pass a label
 * instead of a role code. Checked in the order given by ROLE_MATCH_ORDER.
 */
const ROLE_ALIASES: Record<RoleCode, string[]> = {
  sys_admin: ['sys_admin', 'Tizim administrator'],
  central_admin: ['central_admin', 'Markaziy apparat'],
  management: ['management', 'Rahbariyat', 'Руководство'],
  executor_head: ['executor_head', 'Ijrochi tashkilot rahbari'],
  executor_staff: ['executor_staff', 'Ijrochi tashkilot xodimi'],
  gis_specialist: ['gis_specialist', 'GIS'],
  inspector: ['inspector', 'Inspektor'],
  accountant: ['accountant', 'Buxgalter'],
  prosecutor: ['prosecutor', 'Prokuror'],
  applicant: ['applicant', 'Ariza beruvchi'],
};

/** Narrower roles are tested first so a broader alias cannot swallow them. */
const ROLE_MATCH_ORDER: RoleCode[] = [
  'sys_admin',
  'central_admin',
  'management',
  'executor_head',
  'executor_staff',
  'gis_specialist',
  'inspector',
  'accountant',
  'prosecutor',
];

/** Applicant is the fallback: it is the only role granted by self-registration. */
const resolveRole = (roleCode?: string, roleLabel?: string): RoleCode => {
  const key = roleCode || roleLabel || '';
  const exact = ROLE_MATCH_ORDER.find((r) => r === key);
  if (exact) return exact;
  const byAlias = ROLE_MATCH_ORDER.find((r) =>
    ROLE_ALIASES[r].some((alias) => key.includes(alias) || roleLabel?.includes(alias))
  );
  return byAlias ?? 'applicant';
};

/** Landing page per role — used by the brand button and by each first nav item. */
const ROLE_HOME: Record<RoleCode, string> = {
  sys_admin: 'admin_settings',
  central_admin: 'manager_decision',
  management: 'manager_decision',
  executor_head: 'manager_decision',
  executor_staff: 'leskhoz_inbox',
  gis_specialist: 'gis_editor',
  inspector: 'field_tasks',
  accountant: 'accountant_reconciliation',
  prosecutor: 'prosecutor_portal',
  applicant: 'applicant_dashboard',
};

const homeGroup = (label: string, page: string): NavGroup => ({
  group: '',
  items: [{ id: 'dashboard', label, page, icon: <LayoutDashboard className={ICON} /> }],
});

const profileGroup = (extra: NavItem[] = []): NavGroup => ({
  group: 'Mening profilim',
  items: [
    ...extra,
    { id: 'e_imzo', label: 'Elektron raqamli imzo', page: 'profile_eimzo', icon: <KeyRound className={ICON} /> },
    { id: 'notifications', label: 'Bildirishnomalar', page: 'profile_notifications', icon: <Bell className={ICON} />, count: 3 },
  ],
});

const helpGroup = (label: string, page = 'admin_help'): NavGroup => ({
  group: 'Yordam',
  items: [{ id: 'help', label, page, icon: <HelpCircle className={ICON} /> }],
});

const NAV_BY_ROLE: Record<RoleCode, NavGroup[]> = {
  sys_admin: [
    homeGroup('Bosh sahifa (maʼmurlash)', 'admin_settings'),
    {
      group: 'Tizim maʼmurlash',
      items: [
        { id: 'admin_users', label: 'Foydalanuvchilar', page: 'admin_users', icon: <Users className={ICON} /> },
        { id: 'admin_roles', label: 'Rollar va huquqlar', page: 'admin_roles', icon: <Shield className={ICON} />, count: 10 },
        { id: 'admin_orgs', label: 'Tashkilotlar ierarxiyasi', page: 'admin_orgs', icon: <Building2 className={ICON} />, count: 84 },
        { id: 'admin_classifiers', label: 'Klassifikatorlar', page: 'admin_classifiers', icon: <Sliders className={ICON} />, count: 14 },
        { id: 'admin_announcements', label: 'Eʼlon va xabarnomalar', page: 'admin_announcements', icon: <Megaphone className={ICON} /> },
        { id: 'admin_system_settings', label: 'Tizim sozlamalari', page: 'admin_system_settings', icon: <Settings className={ICON} /> },
        { id: 'admin_audit', label: 'Audit va jurnallar', page: 'admin_audit_logs', icon: <FileBarChart className={ICON} /> },
        { id: 'admin_backups', label: 'Zahiraviy nusxalar', page: 'admin_backups', icon: <Database className={ICON} /> },
      ],
    },
    {
      group: 'Monitoring (faqat koʻrish)',
      items: [
        { id: 'reports', label: 'Hisobotlar', page: 'reports', icon: <ClipboardList className={ICON} /> },
        { id: 'dashboard_view', label: 'Dashboard va analitika', page: 'executive_dashboard', icon: <Eye className={ICON} /> },
      ],
    },
    profileGroup(),
    helpGroup('Yordam va savollar'),
  ],

  central_admin: [
    homeGroup('Bosh sahifa (analitika)', 'manager_decision'),
    {
      // The one object the central apparatus may create and approve (TZ appendix 4).
      group: 'Hisobotlar boshqaruvi',
      items: [
        { id: 'reports', label: 'Hisobot formalari va muddatlar', page: 'reports', icon: <FileBarChart className={ICON} />, count: 5 },
      ],
    },
    {
      group: 'Respublika monitoringi',
      items: [
        { id: 'applications', label: 'Arizalar reyestri', page: 'leskhoz_inbox', icon: <Mail className={ICON} />, count: 24 },
        { id: 'permits', label: 'Ruxsatnomalar reyestri', page: 'applicant_permits', icon: <FileText className={ICON} />, count: 18 },
        { id: 'payments', label: 'Toʻlovlar va taqsimot', page: 'accountant_reconciliation', icon: <CreditCard className={ICON} /> },
        { id: 'inspections', label: 'Inspeksiya dalolatnomalari', page: 'inspection_acts', icon: <CheckSquare className={ICON} /> },
        { id: 'normative', label: 'Meʼyor va tariflar', page: 'normative_norms', icon: <Calculator className={ICON} /> },
        { id: 'map', label: 'Uchastkalar xaritasi (GIS)', page: 'gis_editor', icon: <Map className={ICON} /> },
      ],
    },
    {
      group: 'Maʼlumotnomalar (faqat koʻrish)',
      items: [
        { id: 'admin_orgs', label: 'Tashkilotlar ierarxiyasi', page: 'admin_orgs', icon: <Building2 className={ICON} />, count: 84 },
        { id: 'admin_classifiers', label: 'Klassifikatorlar', page: 'admin_classifiers', icon: <Sliders className={ICON} />, count: 14 },
        { id: 'admin_users', label: 'Foydalanuvchilar va rollar', page: 'admin_users', icon: <Users className={ICON} /> },
        { id: 'admin_audit', label: 'Audit jurnali', page: 'admin_audit_logs', icon: <Shield className={ICON} /> },
        { id: 'archive', label: 'Arxiv', page: 'archive', icon: <Archive className={ICON} /> },
      ],
    },
    profileGroup(),
    helpGroup('Yordam va savollar'),
  ],

  // Monitoring and analysis only — the matrix grants management no write right
  // on any object, so every entry below is a read (and mostly export) view.
  management: [
    homeGroup('Bosh sahifa (analitika)', 'manager_decision'),
    {
      group: 'Respublika analitikasi',
      items: [
        { id: 'applications', label: 'Arizalar reyestri', page: 'leskhoz_inbox', icon: <Mail className={ICON} />, count: 24 },
        { id: 'permits', label: 'Ruxsatnomalar reyestri', page: 'applicant_permits', icon: <FileText className={ICON} />, count: 18 },
        { id: 'payments', label: 'Toʻlovlar va taqsimot', page: 'accountant_reconciliation', icon: <CreditCard className={ICON} /> },
        { id: 'inspections', label: 'Inspeksiya dalolatnomalari', page: 'inspection_acts', icon: <CheckSquare className={ICON} /> },
        { id: 'reports', label: 'Yigʻma hisobotlar', page: 'reports', icon: <FileBarChart className={ICON} />, count: 5 },
        { id: 'normative', label: 'Meʼyor va tariflar', page: 'normative_norms', icon: <Calculator className={ICON} /> },
        { id: 'map', label: 'Uchastkalar xaritasi (GIS)', page: 'gis_editor', icon: <Map className={ICON} /> },
      ],
    },
    {
      group: 'Maʼlumotnomalar (faqat koʻrish)',
      items: [
        { id: 'admin_orgs', label: 'Tashkilotlar ierarxiyasi', page: 'admin_orgs', icon: <Building2 className={ICON} />, count: 84 },
        { id: 'admin_classifiers', label: 'Klassifikatorlar', page: 'admin_classifiers', icon: <Sliders className={ICON} />, count: 14 },
        { id: 'admin_users', label: 'Foydalanuvchilar va rollar', page: 'admin_users', icon: <Users className={ICON} /> },
        { id: 'admin_audit', label: 'Audit jurnali', page: 'admin_audit_logs', icon: <Shield className={ICON} /> },
        { id: 'archive', label: 'Arxiv', page: 'archive', icon: <Archive className={ICON} /> },
      ],
    },
    profileGroup(),
    helpGroup('Yordam va savollar'),
  ],

  // Decides applications, signs permits, approves reports, suspends and revokes.
  executor_head: [
    homeGroup('Bosh sahifa (qarorlar)', 'manager_decision'),
    {
      group: 'Qaror va tasdiqlash',
      items: [
        { id: 'applications', label: 'Qaror kutayotgan arizalar', page: 'leskhoz_inbox', icon: <Mail className={ICON} />, count: 24 },
        { id: 'permits', label: 'Ruxsatnomalar reyestri', page: 'applicant_permits', icon: <FileText className={ICON} />, count: 18 },
        { id: 'reports', label: 'Hisobotlarni tasdiqlash', page: 'reports', icon: <FileBarChart className={ICON} />, count: 5 },
        { id: 'inspections', label: 'Inspeksiya dalolatnomalari', page: 'inspection_acts', icon: <CheckSquare className={ICON} /> },
        { id: 'payments', label: 'Toʻlovlar va taqsimot', page: 'accountant_reconciliation', icon: <CreditCard className={ICON} /> },
        { id: 'normative', label: 'Meʼyor va tariflar', page: 'normative_norms', icon: <Calculator className={ICON} /> },
        { id: 'map', label: 'Uchastkalar xaritasi', page: 'gis_editor', icon: <Map className={ICON} /> },
      ],
    },
    {
      group: 'Tashkilot boʻyicha (faqat koʻrish)',
      items: [
        { id: 'admin_users', label: 'Tashkilot xodimlari', page: 'admin_users', icon: <Users className={ICON} /> },
        { id: 'admin_audit', label: 'Audit jurnali', page: 'admin_audit_logs', icon: <Shield className={ICON} /> },
        { id: 'admin_classifiers', label: 'Klassifikatorlar', page: 'admin_classifiers', icon: <Sliders className={ICON} />, count: 14 },
        { id: 'archive', label: 'Arxiv', page: 'archive', icon: <Archive className={ICON} /> },
      ],
    },
    profileGroup(),
    helpGroup('Yordam va yoʻriqnoma'),
  ],

  // Receives and reviews applications, draws up documents and fills in reports.
  executor_staff: [
    homeGroup('Bosh sahifa (ish navbati)', 'leskhoz_inbox'),
    {
      group: 'Hujjatlar va amallar',
      items: [
        { id: 'applications', label: 'Kelib tushgan arizalar', page: 'leskhoz_inbox', icon: <Mail className={ICON} />, count: 24 },
        { id: 'permits', label: 'Ruxsatnomalarni rasmiylashtirish', page: 'applicant_permits', icon: <FileText className={ICON} />, count: 18 },
        { id: 'reports', label: 'Hisobotlarni toʻldirish', page: 'reports', icon: <FileBarChart className={ICON} />, count: 5 },
      ],
    },
    {
      group: 'Maʼlumot va nazorat (faqat koʻrish)',
      items: [
        { id: 'map', label: 'Uchastkalar xaritasi', page: 'gis_editor', icon: <Map className={ICON} /> },
        { id: 'normative', label: 'Geobotanik meʼyorlar', page: 'normative_norms', icon: <Calculator className={ICON} /> },
        { id: 'payments', label: 'Toʻlovlar holati', page: 'accountant_reconciliation', icon: <CreditCard className={ICON} /> },
        { id: 'inspections', label: 'Inspeksiya dalolatnomalari', page: 'inspection_acts', icon: <CheckSquare className={ICON} /> },
        { id: 'admin_classifiers', label: 'Klassifikatorlar', page: 'admin_classifiers', icon: <Sliders className={ICON} />, count: 14 },
        { id: 'archive', label: 'Arxiv', page: 'archive', icon: <Archive className={ICON} /> },
        { id: 'dashboard_view', label: 'Hudud boʻyicha dashboard', page: 'executive_dashboard', icon: <Eye className={ICON} /> },
      ],
    },
    profileGroup(),
    helpGroup('Yordam va yoʻriqnoma'),
  ],

  // Enters and versions GIS contours, enters norm, limit and tariff, and issues
  // the GIS conclusion on an application.
  gis_specialist: [
    homeGroup('Bosh sahifa (GIS modul)', 'gis_editor'),
    {
      group: 'GIS va meʼyoriy modul',
      items: [
        { id: 'map', label: 'Uchastkalar xaritasi (muharrir)', page: 'gis_editor', icon: <Map className={ICON} /> },
        { id: 'gis_import', label: 'Qatlamlarni import qilish', page: 'gis_import', icon: <Layers className={ICON} /> },
        { id: 'normative', label: 'Meʼyor, limit va tarif', page: 'normative_norms', icon: <Calculator className={ICON} /> },
        { id: 'applications', label: 'Arizalar — GIS xulosasi', page: 'leskhoz_inbox', icon: <Mail className={ICON} />, count: 24 },
      ],
    },
    {
      group: 'Maʼlumot (faqat koʻrish)',
      items: [
        { id: 'reports', label: 'Hisobotlar', page: 'reports', icon: <FileBarChart className={ICON} /> },
        { id: 'admin_classifiers', label: 'Klassifikatorlar', page: 'admin_classifiers', icon: <Sliders className={ICON} />, count: 14 },
        { id: 'archive', label: 'Arxiv', page: 'archive', icon: <Archive className={ICON} /> },
        { id: 'dashboard_view', label: 'Dashboard', page: 'executive_dashboard', icon: <Eye className={ICON} /> },
      ],
    },
    profileGroup(),
    helpGroup('Yordam va yoʻriqnoma'),
  ],

  inspector: [
    homeGroup('Bosh sahifa (dala topshiriqlari)', 'field_tasks'),
    {
      group: 'Inspeksiya va nazorat',
      items: [
        { id: 'field_tasks', label: 'Dala topshiriqlari', page: 'field_tasks', icon: <CheckSquare className={ICON} />, count: 7 },
        { id: 'field_scan', label: 'QR skaner / tekshirish', page: 'field_scan', icon: <QrCode className={ICON} /> },
        { id: 'field_inspection', label: 'Tekshiruv dalolatnomasi', page: 'field_inspection', icon: <FileText className={ICON} /> },
        { id: 'map', label: 'Uchastkalar xaritasi (GIS)', page: 'gis_editor', icon: <Map className={ICON} /> },
      ],
    },
    profileGroup(),
    helpGroup('Yordam va yoʻriqnoma'),
  ],

  accountant: [
    homeGroup('Bosh sahifa (moliya)', 'accountant_reconciliation'),
    {
      group: 'Moliya va hisob-kitob',
      items: [
        { id: 'accountant_reconciliation', label: 'Solishtirma dalolatnomalari', page: 'accountant_reconciliation', icon: <Calculator className={ICON} />, count: 12 },
        { id: 'permits', label: 'Ruxsatnomalar toʻlovlari', page: 'applicant_permits', icon: <CreditCard className={ICON} />, count: 18 },
        { id: 'reports', label: 'Moliya hisobotlari', page: 'reports', icon: <FileBarChart className={ICON} /> },
      ],
    },
    profileGroup(),
    helpGroup('Yordam va yoʻriqnoma'),
  ],

  prosecutor: [
    homeGroup('Bosh sahifa («Raqamli nazorat»)', 'prosecutor_portal'),
    {
      group: 'Prokuratura nazorati (faqat oʻqish)',
      items: [
        { id: 'prosecutor_portal', label: '«Raqamli nazorat» portali', page: 'prosecutor_portal', icon: <Eye className={ICON} /> },
        { id: 'admin_audit', label: 'Audit jurnallari', page: 'admin_audit_logs', icon: <Shield className={ICON} />, count: 156 },
        { id: 'applications', label: 'Arizalar reyestri', page: 'leskhoz_inbox', icon: <Mail className={ICON} />, count: 24 },
        { id: 'permits', label: 'Ruxsatnomalar reyestri', page: 'applicant_permits', icon: <FileText className={ICON} />, count: 18 },
        { id: 'reports', label: 'Hisobotlar va analitika', page: 'reports', icon: <FileBarChart className={ICON} /> },
        { id: 'map', label: 'Uchastkalar xaritasi (GIS)', page: 'gis_editor', icon: <Map className={ICON} /> },
      ],
    },
    profileGroup(),
    helpGroup('Yordam va yoʻriqnoma'),
  ],

  applicant: [
    homeGroup('Bosh sahifa', 'applicant_dashboard'),
    {
      group: 'Mening ishlarim',
      items: [
        { id: 'applicant_dashboard', label: 'Mening arizalarim', page: 'applicant_dashboard', icon: <Mail className={ICON} />, count: 4 },
        { id: 'applicant_wizard', label: 'Yangi ariza berish', page: 'applicant_wizard', icon: <PlusCircle className={ICON} /> },
        { id: 'permits', label: 'Mening ruxsatnomalarim', page: 'applicant_permits', icon: <FileText className={ICON} />, count: 2 },
        { id: 'payments', label: 'Hisoblar va toʻlov', page: 'applicant_dashboard', icon: <CreditCard className={ICON} />, count: 1, isWarning: true },
        { id: 'map', label: 'Uchastkalar xaritasi', page: 'gis_editor', icon: <Map className={ICON} /> },
      ],
    },
    profileGroup([
      { id: 'farm_info', label: 'Xoʻjalik maʼlumotlari', page: 'user_profile', icon: <Building2 className={ICON} /> },
    ]),
    helpGroup('Yordam va savollar', 'applicant_help'),
  ],
};

export const CabinetLayout: React.FC<CabinetLayoutProps> = ({
  children,
  activeNavId = 'dashboard',
  userName = 'Alisher Abdullayev',
  userRole = 'Tuman inspektori',
  userRoleCode,
  notificationCount = 3,
  onNavSelect,
  onLogout,
}) => {
  const [lang, setLang] = useState<'uz' | 'ru'>('uz');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  /** Logging out is never immediate — both exits go through a confirmation first. */
  const requestLogout = () => {
    setIsUserMenuOpen(false);
    setIsNotifOpen(false);
    setIsLogoutConfirmOpen(true);
  };

  const confirmLogout = () => {
    setIsLogoutConfirmOpen(false);
    if (onLogout) onLogout();
    else onNavSelect?.('home');
  };

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

  const role = resolveRole(userRoleCode, userRole);
  const navItems = NAV_BY_ROLE[role];

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
            onClick={() => onNavSelect?.(ROLE_HOME[role])}
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
                    onClick={() => { onNavSelect?.('user_profile'); setIsUserMenuOpen(false); }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-[#1A1F24] hover:bg-[#F8F9FA] hover:text-[#2E7D4F] transition-colors text-left cursor-pointer"
                  >
                    <Settings className="w-4 h-4 text-[#5A646D]" />
                    <span>Profil va Sozlamalar</span>
                  </button>

                  <button
                    onClick={() => { onNavSelect?.('profile_eimzo'); setIsUserMenuOpen(false); }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-[#1A1F24] hover:bg-[#F8F9FA] hover:text-[#2E7D4F] transition-colors text-left cursor-pointer"
                  >
                    <KeyRound className="w-4 h-4 text-[#5A646D]" />
                    <span>E-IMZO Kalitlari</span>
                  </button>

                  <button
                    onClick={() => { onNavSelect?.('admin_help'); setIsUserMenuOpen(false); }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-[#1A1F24] hover:bg-[#F8F9FA] hover:text-[#2E7D4F] transition-colors text-left cursor-pointer"
                  >
                    <HelpCircle className="w-4 h-4 text-[#5A646D]" />
                    <span>Yordam va Yoʻriqnoma</span>
                  </button>
                </div>

                {/* Logout Divider & Button */}
                <div className="pt-2 border-t border-[#E4E7EA]">
                  <button
                    onClick={requestLogout}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-[#B91C1C] hover:bg-[#FEF2F2] transition-colors font-bold text-xs text-left"
                  >
                    <LogOut className="w-4 h-4 text-[#B91C1C]" />
                    <span>Tizimdan chiqish</span>
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
        {/* Pinned under the 4rem header so the nav scrolls on its own, not with the page */}
        <aside
          className={`bg-white border-r border-[#E4E7EA] transition-all duration-200 flex flex-col shrink-0 sticky top-16 h-[calc(100vh-4rem)] ${
            isSidebarCollapsed ? 'w-16' : 'w-72'
          }`}
        >
          <div
            className={`sidebar-scroll flex-1 min-h-0 overflow-y-auto py-3 ${
              isSidebarCollapsed ? 'px-2 space-y-2' : 'px-3 space-y-4'
            }`}
          >
            {navItems.map((group, idx) => (
              <div key={idx}>
                {isSidebarCollapsed ? (
                  // Collapsed rail has no room for a caption, so groups are split by a rule.
                  idx > 0 && <div className="h-px bg-[#E4E7EA] mx-2 mb-2" />
                ) : (
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
                        className={`w-full flex items-center h-10 rounded-md text-xs font-semibold transition-colors relative ${
                          isSidebarCollapsed ? 'justify-center px-0' : 'gap-3 px-3'
                        } ${
                          isActive
                            ? 'bg-[#F0F7F1] text-[#2E7D4F] font-bold'
                            : 'text-[#1A1F24] hover:bg-[#F8F9FA]'
                        } ${
                          // The active marker is an inset bar so it never shifts the icon.
                          isActive && !isSidebarCollapsed
                            ? 'before:absolute before:left-0 before:top-1 before:bottom-1 before:w-1 before:rounded-r before:bg-[#2E7D4F]'
                            : ''
                        }`}
                      >
                        <span className={`shrink-0 ${isActive ? 'text-[#2E7D4F]' : 'text-[#5A646D]'}`}>
                          {item.icon}
                        </span>

                        {isSidebarCollapsed
                          ? // Only the unread marker survives the collapse; the number needs width.
                            item.count !== undefined && (
                              <span
                                className={`absolute top-1.5 right-1.5 w-2 h-2 rounded-full ${
                                  item.isWarning ? 'bg-[#B45309]' : 'bg-[#2E7D4F]'
                                }`}
                              />
                            )
                          : (
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

          {/* Sidebar Footer — stays pinned at the bottom while the nav above it scrolls */}
          <div className={`py-3 border-t border-[#E4E7EA] shrink-0 bg-white ${isSidebarCollapsed ? 'px-2' : 'px-3'}`}>
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              title={isSidebarCollapsed ? 'Menyuni yoyish' : 'Menyuni yigʻish'}
              className={`w-full flex items-center h-10 rounded-md text-xs font-semibold text-[#5A646D] hover:bg-[#F8F9FA] transition-colors ${
                isSidebarCollapsed ? 'justify-center px-0' : 'gap-3 px-3'
              }`}
            >
              <Menu className="w-4 h-4 shrink-0" />
              {!isSidebarCollapsed && <span>Menyuni yigʻish</span>}
            </button>
            <button
              onClick={requestLogout}
              title="Tizimdan chiqish"
              className={`w-full flex items-center h-10 rounded-md text-xs font-semibold text-[#B91C1C] hover:bg-[#FEF2F2] transition-colors mt-1 ${
                isSidebarCollapsed ? 'justify-center px-0' : 'gap-3 px-3'
              }`}
            >
              <LogOut className="w-4 h-4 shrink-0" />
              {!isSidebarCollapsed && <span>Tizimdan chiqish</span>}
            </button>
          </div>
        </aside>

        {/* Main Application Area */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>

      {/* Logout confirmation — reached from both the profile menu and the sidebar */}
      <Modal
        isOpen={isLogoutConfirmOpen}
        onClose={() => setIsLogoutConfirmOpen(false)}
        title="Tizimdan chiqishni tasdiqlang"
        subtitle={userName}
        maxWidth="sm"
        footer={
          <div className="flex items-center justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsLogoutConfirmOpen(false)}>
              Bekor qilish
            </Button>
            <Button
              variant="primary"
              size="sm"
              leftIcon={<LogOut className="w-4 h-4" />}
              onClick={confirmLogout}
              className="bg-[#B91C1C] hover:bg-[#991B1B] text-white font-bold"
            >
              Ha, chiqish
            </Button>
          </div>
        }
      >
        <div className="py-1 space-y-3 text-xs">
          <div className="flex items-start gap-3 p-3 bg-[#FEF2F2] border border-[#FCA5A5] rounded-xl">
            <AlertTriangle className="w-4 h-4 text-[#B91C1C] shrink-0 mt-0.5" />
            <p className="text-[#991B1B] leading-relaxed">
              Seans yakunlanadi va siz kirish sahifasiga qaytarilasiz.
              Saqlanmagan maʼlumotlar yoʻqoladi.
            </p>
          </div>
          <p className="text-[#5A646D] leading-relaxed">
            Kabinetga qayta kirish uchun JSHSHIR/STIR va parolni yoki ERI kalitini
            qaytadan kiritishingiz kerak boʻladi.
          </p>
        </div>
      </Modal>
    </div>
  );
};
