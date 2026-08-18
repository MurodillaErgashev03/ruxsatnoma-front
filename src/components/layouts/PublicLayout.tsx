import React, { useState } from 'react';
import { Trees, ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '../ui/button';
import landingBg from '../../assets/img/newbg.png';

export interface PublicLayoutProps {
  children?: React.ReactNode;
  onCheckPermit?: (permitNo: string) => void;
  onNavigate?: (page: string, params?: any) => void;
  activeNav?: string;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({
  children,
  onNavigate,
  activeNav = 'home',
}) => {
  const [lang, setLang] = useState<'uz' | 'ru'>('uz');

  const navLinks = [
    { id: 'home',        label: 'Bosh sahifa',         page: 'home' },
    { id: 'services',   label: 'Xizmatlar',             page: 'services' },
    { id: 'tariffs',    label: 'Tariflar',              page: 'tariffs' },
    { id: 'documents',  label: 'Hujjatlar',             page: 'documents' },
    { id: 'opendata',   label: 'Ochiq ma\u02bbumotlar', page: 'opendata' },
    { id: 'faq',        label: 'Savollar',              page: 'faq' },
  ];

  const handleNavClick = (page: string) => {
    if (page === 'contact') {
      const footerEl = document.getElementById('public-footer');
      if (footerEl) {
        footerEl.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      onNavigate?.(page);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-[#1A1F24]">
      {/* ── Top Header ─────────────────────────────────────────── */}
      <header className={`sticky top-0 z-50 backdrop-blur-md transition-all duration-300 ${
        activeNav === 'home'
          ? 'bg-[#17331B]/90 border-b border-white/15 text-white shadow-lg'
          : 'bg-[#17331B] border-b border-white/15 text-white shadow-md'
      }`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <button
            onClick={() => onNavigate?.('home')}
            className="flex items-center gap-3 text-left focus:outline-none shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-[#2E7D4F] text-white flex items-center justify-center font-bold shadow-md border border-white/20">
              <Trees className="w-5.5 h-5.5" />
            </div>
            <div>
              <span className="block text-base font-bold text-white leading-tight tracking-tight">
                ruxsatnoma-urmon.uz
              </span>
              <span className="block text-[11px] text-gray-200">
                Oʻrmon xoʻjaligi davlat portali
              </span>
            </div>
          </button>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = activeNav === link.id || (link.id === 'tariffs' && activeNav === 'tariffs');
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.page)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'text-white bg-[#237443] border border-white/30 shadow-sm'
                      : 'text-gray-200 hover:bg-white/15 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Language Switcher & Auth Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex rounded-xl overflow-hidden text-xs p-1 bg-black/30 border border-white/20 backdrop-blur-sm">
              <button
                onClick={() => setLang('uz')}
                className={`px-3 py-1 font-bold rounded-lg transition-all ${
                  lang === 'uz' ? 'bg-[#2E7D4F] text-white shadow-xs' : 'text-gray-300 hover:text-white'
                }`}
              >
                UZ
              </button>
              <button
                onClick={() => setLang('ru')}
                className={`px-3 py-1 font-bold rounded-lg transition-all ${
                  lang === 'ru' ? 'bg-[#2E7D4F] text-white shadow-xs' : 'text-gray-300 hover:text-white'
                }`}
              >
                RU
              </button>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate?.('auth_login')}
              className="bg-black/30 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2"
            >
              Kirish (OneID)
            </Button>
            <Button
              variant="success"
              size="sm"
              onClick={() => onNavigate?.('auth_login')}
              className="bg-[#2E7D4F] hover:bg-[#23653F] text-white shadow-md font-bold rounded-xl px-4 py-2"
            >
              Ariza topshirish
            </Button>
          </div>
        </div>
      </header>

      {/* ── Hero Banner Section (Only on Home Page) ──────────────── */}
      {activeNav === 'home' && (
        <section className="relative overflow-hidden border-b border-[#E4E7EA] text-white min-h-[calc(100vh-4rem)] flex items-center py-12 sm:py-16">
          {/* Background image container - Cropped to remove top & bottom black letterbox bars */}
          <div 
            className="absolute -inset-y-16 inset-x-0 z-0 bg-cover bg-center transform scale-115" 
            style={{ backgroundImage: `url(${landingBg})` }}
          />
          {/* Soft left gradient for text contrast */}
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#0A1C0E]/70 via-[#0A1C0E]/35 to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-3xl space-y-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-black/40 backdrop-blur-md text-white font-semibold text-xs rounded-full border border-white/30 shadow-lg">
                <Trees className="w-4 h-4 text-[#7FB98A]" />
                Oʻzbekiston Respublikasi Oʻrmon Xoʻjaligi Davlat Tizimi
              </span>

              <h1 className="text-3xl sm:text-6xl font-extrabold text-white leading-tight [text-shadow:_0_3px_14px_rgba(0,0,0,0.85)] tracking-tight">
                Oʻrmon fondi yerlaridan foydalanish uchun <span className="text-[#64D88C]">Elektron Ruxsatnoma</span>
              </h1>

              <p className="text-base sm:text-xl text-gray-100 leading-relaxed max-w-2xl font-medium [text-shadow:_0_2px_8px_rgba(0,0,0,0.8)]">
                Chorva mollarini boqish, pichan oʻrish, asalarichilik va dorivor oʻsimliklar yigʻish uchun ariza topshirish, QR-kodli hujjat olish va haqiqiyligini tekshirish yagona davlat portali.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <Button
                  variant="success"
                  size="lg"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                  onClick={() => onNavigate?.('auth_login')}
                  className="shadow-2xl hover:scale-105 active:scale-95 transition-transform bg-[#2E7D4F] hover:bg-[#23653F] px-8 py-4 text-base sm:text-lg font-bold rounded-xl"
                >
                  Ariza topshirish (OneID)
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => onNavigate?.('tariffs')}
                  className="bg-black/40 border-white/40 text-white hover:bg-black/60 backdrop-blur-md shadow-xl transition-all font-semibold rounded-xl px-7 py-4 text-base"
                >
                  Tariflar va kalkulyator
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-6 pt-6 text-xs sm:text-sm text-gray-200 font-medium border-t border-white/20 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#64D88C] animate-pulse" />
                  <span>Tezkor avtomatik koʻrib chiqish</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#64D88C]" />
                  <span>QR-kodli rasmiy hujjat</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#64D88C]" />
                  <span>100% Onlayn va xavfsiz</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Main Content Slot ───────────────────────────────────── */}
      {children && <main className="flex-1 max-w-7xl mx-auto px-6 py-10 w-full">{children}</main>}

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer id="public-footer" className="bg-[#123522] text-white pt-16 pb-8 mt-auto">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Col 1 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-[#2E7D4F] flex items-center justify-center">
                <Trees className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">ruxsatnoma-urmon.uz</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              Oʻzbekiston Respublikasi Oʻrmon xoʻjaligi davlat qoʻmitasining rasmiy ruxsatnomalar axborot tizimi.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#7FB98A] mb-4">Xizmatlar</h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <button onClick={() => onNavigate?.('applicant_wizard')} className="hover:text-white transition-colors text-left">
                  Ariza berish tartibi
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate?.('verify')} className="hover:text-white transition-colors text-left">
                  Ruxsatnoma tekshirish
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate?.('tariffs')} className="hover:text-white transition-colors text-left">
                  Toʻlov stavkalari va kalkulyator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate?.('gis_editor')} className="hover:text-white transition-colors text-left">
                  Oʻrmon zonalari GIS kartasi
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#7FB98A] mb-4">Hujjatlar</h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <button onClick={() => onNavigate?.('normative_norms')} className="hover:text-white transition-colors text-left">
                  Geobotanik normalar va qoidalar
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate?.('prosecutor_portal')} className="hover:text-white transition-colors text-left">
                  Raqamli Nazorat (Prokuratura Portali)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#7FB98A] mb-4">Aloqa</h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-[#7FB98A]" /> +998 (71) 200-00-00</li>
              <li className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-[#7FB98A]" /> info@urmon.gov.uz</li>
              <li className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-[#7FB98A]" /> Toshkent sh., Chilonzor t.</li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400 gap-4">
          <div>© 2026 Oʻrmon xoʻjaligi davlat qoʻmitasi. Barcha huquqlar himoyalangan.</div>
          <div>WCAG 2.2 AA Muvofiq dizayn-sistemasi</div>
        </div>
      </footer>
    </div>
  );
};
