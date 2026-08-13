import React from 'react';
import {
  Shield,
  Server,
  Users,
  Activity,
  CheckCircle2,
  Building2,
  Database,
  Lock,
  Sliders,
  Megaphone,
  ChevronRight,
  AlertTriangle,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '../../../components/ui/button';

export interface AdminSettingsPageProps {
  onNavigate?: (page: string, params?: any) => void;
}

export const AdminSettingsPage: React.FC<AdminSettingsPageProps> = ({ onNavigate }) => {
  // Head-count and organisation figures follow TZ 4.1.3 and the 84-leskhoz registry.
  const systemMetrics = [
    {
      label: 'Server holati',
      value: '100% onlayn',
      change: 'API, MBBT, GIS, E-IMZO faol',
      icon: <Server className="w-5 h-5 text-[#2E7D4F]" />,
    },
    {
      label: 'Roʻyxatdan oʻtgan foydalanuvchi',
      value: '10 457 ta',
      change: '268 nafar hozir onlayn',
      icon: <Users className="w-5 h-5 text-[#2E7D4F]" />,
    },
    {
      label: 'Tashqi integratsiyalar',
      value: '12 / 12 ulanish',
      change: 'OneID, E-IMZO, «Raqamli nazorat», billing',
      icon: <Activity className="w-5 h-5 text-[#2E7D4F]" />,
    },
    {
      label: 'Audit jurnali',
      value: 'WORM append-only',
      change: '0 ta xavfsizlik hodisasi',
      icon: <Lock className="w-5 h-5 text-[#2E7D4F]" />,
    },
  ];

  /** Modules of the administration subsystem — TZ 4.2.1.1 … 4.2.1.7. */
  const adminModules = [
    {
      page: 'admin_users',
      tzCode: '4.2.1.1',
      title: 'Foydalanuvchilar',
      description: 'Akkaunt yaratish, rol biriktirish, parolni tiklash va kirishni toʻxtatish',
      metric: '10 457 ta akkaunt',
      icon: <Users className="w-5 h-5" />,
    },
    {
      page: 'admin_roles',
      tzCode: '4.2.1.2',
      title: 'Rollar va huquqlar',
      description: 'Rol yaratish, nusxalash, funksiyalar toʻplami va oylik qayta koʻrib chiqish',
      metric: '10 ta rol',
      icon: <Shield className="w-5 h-5" />,
    },
    {
      page: 'admin_orgs',
      tzCode: '4.2.1.3',
      title: 'Tashkilotlar ierarxiyasi',
      description: 'Agentlik, viloyat boshqarmalari, DЎX, oʻrmonchilik, obxod va kvartallar',
      metric: '84 ta DЎX',
      icon: <Building2 className="w-5 h-5" />,
    },
    {
      page: 'admin_classifiers',
      tzCode: '4.2.1.4',
      title: 'Klassifikatorlar (NSI)',
      description: 'Versiyalash, amal qilish davri, cs.egov.uz bilan sinxronlash, import va eksport',
      metric: '14 ta klassifikator',
      icon: <Sliders className="w-5 h-5" />,
    },
    {
      page: 'admin_backups',
      tzCode: '4.2.1.5',
      title: 'Zahiraviy nusxalash',
      description: 'Jadval boʻyicha va qoʻlda nusxa olish, xavfsiz tiklash, tashqi eltuvchiga eksport',
      metric: '42 ta nusxa',
      icon: <Database className="w-5 h-5" />,
    },
    {
      page: 'admin_audit_logs',
      tzCode: '4.2.1.6',
      title: 'Monitoring va jurnallar',
      description: '9 turdagi jurnal, davr boʻyicha filtr va eksport; oʻzgartirib boʻlmaydi',
      metric: '9 ta jurnal turi',
      icon: <Shield className="w-5 h-5" />,
    },
    {
      page: 'admin_announcements',
      tzCode: '4.2.1.7',
      title: 'Eʼlon va xabarnomalar',
      description: 'Eʼlon yaratish, eʼlon qilish davri, fayl biriktirish va toifalarga yoʻnaltirish',
      metric: '4 ta faol eʼlon',
      icon: <Megaphone className="w-5 h-5" />,
    },
    {
      page: 'admin_system_settings',
      tzCode: '4.2.1',
      title: 'Tizim sozlamalari',
      description: 'BHM, reglament muddatlari, seans taym-auti, E-IMZO va integratsiya parametrlari',
      metric: 'BHM 375 000 soʻm',
      icon: <Sliders className="w-5 h-5" />,
    },
  ];

  const recentAudit = [
    { time: '13:08:42', user: 'Ergashov Sardor', role: 'sys_admin', action: 'Tizim sozlamalari yangilandi', ip: '172.16.4.12' },
    { time: '12:45:10', user: 'Yusupov Bobur', role: 'gis_specialist', action: 'Boʻstonliq 14-kontur GIS qatlami yuklandi', ip: '172.16.4.45' },
    { time: '11:30:05', user: 'Zahira demoni', role: 'SYSTEM', action: 'Toshkent-Node01 MBBT zaxira nusxasi olindi', ip: '127.0.0.1' },
    { time: '10:15:22', user: 'Abdullayev Alisher', role: 'inspector', action: 'ACT-2026-088 dalolatnomasi E-IMZO bilan imzolandi', ip: '172.16.8.99' },
  ];

  const attentionItems = [
    { text: 'Huquqlarni oylik qayta koʻrib chiqish 01.09.2026 gacha bajarilishi kerak', page: 'admin_roles' },
    { text: '«Rad etish sabablari» klassifikatorining amal qilish muddati 30 kundan soʻng tugaydi', page: 'admin_classifiers' },
  ];

  return (
    <div className="space-y-6 font-sans">
      {/* System health KPIs */}
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

      {/* Page header */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#2E7D4F] bg-[#F0F7F1] px-3 py-1 rounded-full border border-[#D9EBDC]">
            Maʼmurlash subtizimi (4.2.1)
          </span>
          <h1 className="text-lg font-bold text-[#1A1F24] mt-1.5">Tizim Boshqaruvi Paneli</h1>
          <p className="text-xs text-[#5A646D] mt-0.5">
            Maʼmurlash subtizimining 7 ta moduli, tizim holati va oxirgi audit hodisalari
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Database className="w-4 h-4" />}
            onClick={() => onNavigate?.('admin_backups')}
          >
            Zahiraviy nusxalar
          </Button>
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Users className="w-4 h-4" />}
            onClick={() => onNavigate?.('admin_users')}
            className="bg-[#2E7D4F] hover:bg-[#23653F] font-bold shadow-sm"
          >
            Foydalanuvchilar
          </Button>
        </div>
      </div>

      {/* Items needing attention */}
      {attentionItems.length > 0 && (
        <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-2xl p-5 space-y-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-[#B45309]" />
            <h3 className="font-bold text-sm text-[#B45309]">Eʼtibor talab qiladi</h3>
          </div>
          <div className="space-y-1.5">
            {attentionItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => onNavigate?.(item.page)}
                className="w-full text-left text-xs text-[#92400E] hover:text-[#B45309] flex items-center justify-between gap-3 p-2 rounded-lg hover:bg-white/60 transition-colors"
              >
                <span>{item.text}</span>
                <ChevronRight className="w-4 h-4 shrink-0" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Administration modules */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-[#1A1F24] px-1">Maʼmurlash modullari</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {adminModules.map((mod) => (
            <button
              key={mod.page}
              onClick={() => onNavigate?.(mod.page)}
              className="bg-white border border-[#E4E7EA] p-5 rounded-2xl shadow-xs space-y-3 hover:border-[#7FB98A] hover:shadow-md transition-all text-left group"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="p-2.5 bg-[#F0F7F1] rounded-xl text-[#2E7D4F] group-hover:scale-105 transition-transform">
                  {mod.icon}
                </div>
                <span className="text-[10px] font-mono font-bold text-[#767F87] bg-[#F8F9FA] px-2 py-0.5 rounded border border-[#E4E7EA]">
                  {mod.tzCode}
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-sm text-[#1A1F24]">{mod.title}</h3>
                <p className="text-xs text-[#5A646D] leading-relaxed">{mod.description}</p>
              </div>
              <div className="pt-2 border-t border-[#E4E7EA] flex items-center justify-between">
                <span className="text-xs font-bold text-[#2E7D4F] font-mono">{mod.metric}</span>
                <ChevronRight className="w-4 h-4 text-[#9AA3AB] group-hover:text-[#2E7D4F] transition-colors" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Administrator boundary reminder */}
      <div className="bg-[#F8F9FA] border border-[#E4E7EA] rounded-2xl p-5 flex items-start gap-3">
        <div className="p-2.5 bg-white border border-[#D9EBDC] rounded-xl text-[#2E7D4F] shrink-0">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div className="text-xs text-[#5A646D] leading-relaxed space-y-1">
          <span className="font-bold text-[#1A1F24] block">Administrator vakolatlari chegarasi</span>
          <p>
            Tizim administratori foydalanuvchilar, rollar, tashkilotlar, klassifikatorlar, sozlamalar va zahiraviy nusxalarni boshqaradi.
            Administrator <b className="text-[#1A1F24]">audit jurnalini oʻzgartira va oʻchira olmaydi</b>, ariza boʻyicha qaror qabul qilmaydi,
            hisobotni tasdiqlamaydi va hujjatlarni ERI bilan imzolamaydi — bu boshqa rollarning vakolati.
          </p>
        </div>
      </div>

      {/* Recent audit events */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#E4E7EA] pb-3">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#2E7D4F]" />
            <h3 className="font-bold text-base text-[#1A1F24]">Oxirgi audit hodisalari</h3>
          </div>
          <button
            onClick={() => onNavigate?.('admin_audit_logs')}
            className="text-xs font-bold text-[#2E7D4F] hover:underline inline-flex items-center gap-1"
          >
            Toʻliq jurnal <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-2 text-xs">
          {recentAudit.map((log, idx) => (
            <div key={idx} className="p-3 bg-[#F8F9FA] border border-[#E4E7EA] rounded-lg flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-[#767F87] font-mono font-bold shrink-0">{log.time}</span>
                <span className="font-semibold text-[#1A1F24] shrink-0">{log.user}</span>
                <span className="text-[10px] font-mono text-[#2E7D4F] bg-[#F0F7F1] px-2 py-0.5 rounded border border-[#D9EBDC] shrink-0">
                  {log.role}
                </span>
                <span className="text-[#5A646D] truncate">{log.action}</span>
              </div>
              <span className="text-[#767F87] font-mono bg-white px-2 py-0.5 rounded border border-[#E4E7EA] shrink-0">
                {log.ip}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
