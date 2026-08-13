import React, { useState } from 'react';
import {
  HelpCircle,
  BookOpen,
  Video,
  FileText,
  Search,
  MessageSquare,
  ShieldCheck,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Database,
  Lock,
  Phone,
  LifeBuoy,
  X,
  Play,
} from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/FormControls';

export interface AdminHelpPageProps {
  onNavigate?: (page: string, params?: any) => void;
}

export const AdminHelpPage: React.FC<AdminHelpPageProps> = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

  // Ticket form state
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState('INTEGRATION');
  const [ticketDescription, setTicketDescription] = useState('');

  // SysAdmin Specific FAQ Items (TZ Compliant)
  const faqList = [
    {
      q: "Yangi foydalanuvchiga rol va tashkilot huquqini qanday biriktirish va boshqarish mumkin?",
      a: "Tizim Administratori `Foydalanuvchilar va rollar` (/admin/users) boʻlimiga kirib, foydalanuvchini JSHSHIR boʻyicha izlaydi yoki '+ Yangi Foydalanuvchi' tugmasini bosadi. Tizimda 10 ta belgilangan rol (RBAC/ABAC) va 84 ta oʻrmon xoʻjaligi tashkiloti mavjud boʻlib, kerakli rol va lesxoz kodi tanlanib saqlanadi.",
    },
    {
      q: "WORM Append-only Audit loglarini oʻchirishga urinish boʻlganda nima sodir boʻladi?",
      a: "TZ 4.2.4 talabiga koʻra audit jurnali append-only rejimida saqlanadi. Tizim administratori ham jurnalni oʻzgartira yoki oʻchira olmaydi. Oʻchirishga boʻlgan har bir urinish zudlik bilan RI-06 kritik risk-indikatori sifatida Bosh prokuraturaning «Raqamli nazorat» tizimiga avtomatik signal yuboradi.",
    },
    {
      q: "Zahiraviy nusxadan tiklashda xavfsizlik qoidasi qanday ishlaydi?",
      a: "TZ 4.2.1.5 talabiga binoan tiklash tugmasi bosilganda tizim avval joriy holatning avtomatik zaxira nusxasini yaratadi va jurnalga yozadi. Shundan soʻnggina tiklash amali bajariladi. Tiklanadigan elementlar alohida tanlanadi.",
    },
    {
      q: "Raqamli Nazorat (Bosh Prokuratura) va Soliq E-IMZO integratsiyasi uzilib qolsa nima qilish kerak?",
      a: "`Tizim sozlamalari` (/admin/system-settings) -> 'Integratsiyalar' varagʻiga oʻtib, 'Qayta Aloqa Oʻrnatish (Retry Sync)' tugmasi bosiladi. Tizim avtomatik ravishda mTLS va PKCS#7 sertifikatlarini qayta tekshiradi va Outbox navbatidagi xabarlarni qayta uzatadi.",
    },
    {
      q: "cs.egov.uz 14 ta davlat klassifikatorlarini yangilash tartibi qanday?",
      a: "`Klassifikatorlar` (/admin/classifiers) sahifasida 'cs.egov.uz bilan sinxronlash' tugmasi mavjud. Amaldagi klassifikatorlar ishlatilayotgan boʻlsa, TZ qoidasiga koʻra oʻchirib tashlanmaydi, balki arxivlangan statusiga oʻtkaziladi.",
    },
  ];

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject || !ticketDescription) return;

    alert(`Texnik qoʻllab-quvvatlash chiptasi yaratildi! ID: TICKET-2026-${Math.floor(Math.random() * 9000 + 1000)}`);
    setIsTicketModalOpen(false);
    setTicketSubject('');
    setTicketDescription('');
  };

  const filteredFaqs = faqList.filter(
    (item) =>
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 font-sans">
      {/* Top Header & Support Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-white to-[#F0F7F1]/50 border border-[#E4E7EA] p-5 rounded-2xl shadow-xs hover:shadow-md transition-all flex items-center justify-between group">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-[#5A646D] uppercase tracking-wider block">Tizim Yoʻriqnomalari</span>
            <div className="text-base font-bold text-[#1A1F24] tracking-tight">12 ta Hujjat</div>
            <span className="text-xs text-[#15803D] font-bold flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" /> Administrator Standarti
            </span>
          </div>
          <div className="p-3 bg-[#2E7D4F]/10 text-[#2E7D4F] rounded-2xl group-hover:scale-110 transition-transform">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-blue-50/40 border border-[#E4E7EA] p-5 rounded-2xl shadow-xs hover:shadow-md transition-all flex items-center justify-between group">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-[#5A646D] uppercase tracking-wider block">Video darsliklar</span>
            <div className="text-base font-bold text-[#1A1F24] tracking-tight">6 ta video dars</div>
            <span className="text-xs text-blue-700 font-bold flex items-center gap-1">
              <Video className="w-3.5 h-3.5" /> TZ 4.2.12 kontekst yordami
            </span>
          </div>
          <div className="p-3 bg-blue-500/10 text-blue-600 rounded-2xl group-hover:scale-110 transition-transform">
            <Video className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-purple-50/40 border border-[#E4E7EA] p-5 rounded-2xl shadow-xs hover:shadow-md transition-all flex items-center justify-between group">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-[#5A646D] uppercase tracking-wider block">Texnik Qoʻllab-quvvatlash</span>
            <div className="text-base font-bold text-[#1A1F24] tracking-tight">24/7 SOC Line</div>
            <span className="text-xs text-purple-700 font-bold flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" /> +998 (71) 200-00-99
            </span>
          </div>
          <div className="p-3 bg-purple-500/10 text-purple-600 rounded-2xl group-hover:scale-110 transition-transform">
            <LifeBuoy className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-emerald-50/40 border border-[#E4E7EA] p-5 rounded-2xl shadow-xs hover:shadow-md transition-all flex items-center justify-between group">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-[#5A646D] uppercase tracking-wider block">Maʼlumotlar bazasi SLA</span>
            <div className="text-base font-bold text-[#1A1F24] tracking-tight">99.9% Uptime</div>
            <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Standart TZ 12-NFR
            </span>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-600 rounded-2xl group-hover:scale-110 transition-transform">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#2E7D4F] bg-[#F0F7F1] px-3 py-1 rounded-full border border-[#D9EBDC]">
            KABINET YORDAM VA MAʻMURLASH MARKAZI (ПОДСИСТЕМА №12)
          </span>
          <h1 className="text-lg font-bold text-[#1A1F24] tracking-tight mt-1.5">Maʼmurlash Yoʻriqnomalari va Texnik Qoʻllab-quvvatlash</h1>
          <p className="text-xs text-[#5A646D] mt-0.5">
            Tizim administratorlari uchun texnik yoʻriqnomalar, video darsliklar va prokuratura/SOC qoʻllab-quvvatlash liniyasi
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={() => setIsTicketModalOpen(true)}
            variant="primary"
            size="sm"
            leftIcon={<MessageSquare className="w-4 h-4" />}
            className="bg-[#2E7D4F] hover:bg-[#23653F] font-bold shadow-sm"
          >
            + Texnik Chipta (Ticket) Yaratish
          </Button>
        </div>
      </div>

      {/* Admin Manuals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white border border-[#E4E7EA] rounded-2xl p-5 shadow-xs space-y-3 hover:shadow-md transition-all">
          <div className="w-10 h-10 rounded-xl bg-[#F0F7F1] text-[#2E7D4F] flex items-center justify-center font-bold">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#5A646D] uppercase tracking-wider">Tizim Qoʻllanmasi</span>
            <h3 className="font-extrabold text-[#1A1F24] text-sm mt-0.5">Tizim administratori yoʻriqnomasi v2.4</h3>
            <p className="text-xs text-[#5A646D] mt-1 leading-relaxed">
              10 ta rol boʻyicha RBAC/ABAC huquqlar matratsasini sozlash va 84 ta lesxoz ierarxiyasi yoʻriqnomasi.
            </p>
          </div>
          <button className="text-xs font-bold text-[#2E7D4F] hover:underline flex items-center gap-1 pt-1">
            Hujjatni oʻqish (PDF) <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="bg-white border border-[#E4E7EA] rounded-2xl p-5 shadow-xs space-y-3 hover:shadow-md transition-all">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#5A646D] uppercase tracking-wider">Xavfsizlik Standarti</span>
            <h3 className="font-extrabold text-[#1A1F24] text-sm mt-0.5">Audit va RI-06 xavfsizlik qoʻllanmasi</h3>
            <p className="text-xs text-[#5A646D] mt-1 leading-relaxed">
              Oʻzgarmas WORM Append-Only audit jurnali, RI-06 signalizatsiyasi va SOC markazi integratsiyasi.
            </p>
          </div>
          <button className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 pt-1">
            Hujjatni oʻqish (PDF) <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="bg-white border border-[#E4E7EA] rounded-2xl p-5 shadow-xs space-y-3 hover:shadow-md transition-all">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#5A646D] uppercase tracking-wider">Disaster Recovery</span>
            <h3 className="font-extrabold text-[#1A1F24] text-sm mt-0.5">Zahiraviy nusxalash va tiklash qoʻllanmasi</h3>
            <p className="text-xs text-[#5A646D] mt-1 leading-relaxed">
              RPO ≤ 15 minut, RTO ≤ 4 soat reglamenti va tiklashdan oldin avtomatik safety snapshot yaratish yoʻriqnomasi.
            </p>
          </div>
          <button className="text-xs font-bold text-purple-600 hover:underline flex items-center gap-1 pt-1">
            Hujjatni oʻqish (PDF) <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Interactive Video Tutorials Section (TZ 12-nfr.md, line 211) */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#E4E7EA] pb-3">
          <div className="flex items-center gap-2">
            <Video className="w-5 h-5 text-[#2E7D4F]" />
            <h3 className="font-bold text-base text-[#1A1F24]">Tizim administratorlari uchun video darsliklar</h3>
          </div>
          <span className="text-xs text-[#5A646D]">Kontekst video yordami</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-sans">
          <div className="bg-[#F8F9FA] border border-[#E4E7EA] rounded-2xl overflow-hidden group">
            <div className="h-36 bg-gradient-to-br from-[#0A1C0E] to-[#1E3A27] relative flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-xs text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 fill-white ml-1" />
              </div>
              <span className="absolute bottom-2 right-2 bg-black/70 text-white font-mono text-[10px] px-2 py-0.5 rounded">
                04:15
              </span>
            </div>
            <div className="p-4 space-y-1">
              <h4 className="font-bold text-[#1A1F24] text-xs">Zahiraviy nusxa olish va tiklash</h4>
              <p className="text-[11px] text-[#5A646D]">Zahiraviy nusxadan tiklash va avto-snapshot olish videodarsi</p>
            </div>
          </div>

          <div className="bg-[#F8F9FA] border border-[#E4E7EA] rounded-2xl overflow-hidden group">
            <div className="h-36 bg-gradient-to-br from-[#0A1C0E] to-[#1E3A27] relative flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-xs text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 fill-white ml-1" />
              </div>
              <span className="absolute bottom-2 right-2 bg-black/70 text-white font-mono text-[10px] px-2 py-0.5 rounded">
                03:40
              </span>
            </div>
            <div className="p-4 space-y-1">
              <h4 className="font-bold text-[#1A1F24] text-xs">SOC Markaziga RI-06 Alert Signalini Tekshirish</h4>
              <p className="text-[11px] text-[#5A646D]">Bosh Prokuratura Raqamli Nazorat portali bilan sinxronlash</p>
            </div>
          </div>

          <div className="bg-[#F8F9FA] border border-[#E4E7EA] rounded-2xl overflow-hidden group">
            <div className="h-36 bg-gradient-to-br from-[#0A1C0E] to-[#1E3A27] relative flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-xs text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 fill-white ml-1" />
              </div>
              <span className="absolute bottom-2 right-2 bg-black/70 text-white font-mono text-[10px] px-2 py-0.5 rounded">
                05:10
              </span>
            </div>
            <div className="p-4 space-y-1">
              <h4 className="font-bold text-[#1A1F24] text-xs">cs.egov.uz 14 ta Klassifikatorini Yangilash</h4>
              <p className="text-[11px] text-[#5A646D]">E-Gov API orqali klassifikatorlarni sinxronlash videodarsi</p>
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions (SysAdmin FAQ) */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E4E7EA] pb-4">
          <div>
            <h3 className="text-lg font-extrabold text-[#1A1F24]">Koʻp beriladigan texnik savollar</h3>
            <p className="text-xs text-[#5A646D] mt-0.5">Tizim administratorlari uchun rasmiy texnik savol-javoblar</p>
          </div>
          <div className="w-full sm:w-72">
            <Input
              placeholder="Savollardan izlash..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-4 h-4 text-[#5A646D]" />}
              touchSize
            />
          </div>
        </div>

        <div className="space-y-3">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="border border-[#E4E7EA] rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full p-4 text-left font-bold text-sm text-[#1A1F24] bg-[#F8F9FA] hover:bg-gray-100 flex items-center justify-between gap-4 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#2E7D4F] shrink-0" />
                    {faq.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#5A646D] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#5A646D] shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="p-4 text-xs text-[#5A646D] bg-white leading-relaxed border-t border-[#E4E7EA]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Support Ticket Creation Modal */}
      {isTicketModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-[#E4E7EA]">
            <div className="flex items-center justify-between border-b border-[#E4E7EA] pb-3">
              <h3 className="text-lg font-bold text-[#1A1F24] flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#2E7D4F]" /> Texnik Chipta (Ticket) Yaratish
              </h3>
              <button onClick={() => setIsTicketModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTicket} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1A1F24]">Mavzu Sarlavhasi:</label>
                <Input
                  placeholder="Masalan: Raqamli Nazorat mTLS sertifikati yangilanishi muammosi..."
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1A1F24]">Kategoriya:</label>
                <select
                  value={ticketCategory}
                  onChange={(e) => setTicketCategory(e.target.value)}
                  className="w-full bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-xs p-3 text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
                >
                  <option value="INTEGRATION">Tashqi Integratsiyalar (OneID / Soliq / Prokuratura)</option>
                  <option value="DATABASE">Maʼlumotlar bazasi va zaxira muammosi</option>
                  <option value="SECURITY">Xavfsizlik & E-IMZO Sertifikat</option>
                  <option value="GIS">GIS Qatlamlari & Geoserver</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1A1F24]">Batafsil Muammo Tavsifi:</label>
                <textarea
                  rows={4}
                  placeholder="Muammo tavsifi, xatolik kodi va qadamlarni bayon eting..."
                  value={ticketDescription}
                  onChange={(e) => setTicketDescription(e.target.value)}
                  className="w-full bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-xs p-3 text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
                  required
                />
              </div>

              <div className="pt-3 border-t border-[#E4E7EA] flex items-center justify-end gap-3">
                <Button variant="outline" type="button" onClick={() => setIsTicketModalOpen(false)}>
                  Bekor qilish
                </Button>
                <Button type="submit" variant="primary" className="bg-[#2E7D4F] hover:bg-[#23653F] font-bold">
                  Chiptani Yuborish
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
