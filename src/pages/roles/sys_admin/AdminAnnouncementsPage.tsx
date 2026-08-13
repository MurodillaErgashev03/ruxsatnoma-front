import React, { useState } from 'react';
import {
  Megaphone,
  Plus,
  Search,
  Calendar,
  Paperclip,
  Edit,
  Trash2,
  Users,
  CheckCircle2,
  Clock,
  Archive,
  SlidersHorizontal,
  Info,
  AlertTriangle,
  FileText,
} from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/FormControls';
import { Modal } from '../../../components/ui/Overlay';

export interface AdminAnnouncementsPageProps {
  onNavigate?: (page: string, params?: any) => void;
}

/** Audience categories — TZ 4.2.1.7: announcements are addressed to user categories. */
const AUDIENCE_CATEGORIES = [
  { id: 'applicants', label: 'Jismoniy va yuridik shaxslar (ariza beruvchilar)' },
  { id: 'executors', label: 'Joylardagi ijrochilar (DЎX, oʻrmonchilik, inspektorlar)' },
  { id: 'central', label: 'Markaziy apparat va rahbariyat' },
  { id: 'admins', label: 'Tizim administratorlari' },
  { id: 'prosecutors', label: 'Prokuratura xodimlari' },
];

const CATEGORY_LABELS: Record<string, string> = {
  news: 'Yangilik',
  announcement: 'Eʼlon',
  maintenance: 'Profilaktika',
  legal: 'Meʼyoriy hujjat',
};

interface Announcement {
  id: string;
  title: string;
  titleRu?: string;
  body: string;
  category: keyof typeof CATEGORY_LABELS | string;
  audiences: string[];
  publishFrom: string;
  publishTo: string;
  attachments: { name: string; size: string }[];
  author: string;
  status: 'published' | 'scheduled' | 'expired' | 'draft';
}

const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ANN-2026-018',
    title: 'Tizim profilaktikasi: 20-avgust kuni 02:00 dan 04:00 gacha',
    titleRu: 'Профилактика системы: 20 августа с 02:00 до 04:00',
    body: 'Rejalashtirilgan texnik ishlar sababli portal va kabinetlarga kirish vaqtincha cheklanadi. Ariza topshirish va toʻlov amallarini oldindan yakunlashingizni soʻraymiz.',
    category: 'maintenance',
    audiences: ['applicants', 'executors', 'central'],
    publishFrom: '13.08.2026',
    publishTo: '21.08.2026',
    attachments: [],
    author: 'Ergashov Sardor Anvarovich',
    status: 'published',
  },
  {
    id: 'ANN-2026-017',
    title: 'Chorva boqish meʼyorlari boʻyicha yangi geobotanik jadval kuchga kirdi',
    body: 'Oʻrmon loyiha instituti tomonidan tasdiqlangan yangi meʼyorlar 01.09.2026 dan boshlab qoʻllaniladi. Ilgari berilgan ruxsatnomalar qayta hisoblanmaydi.',
    category: 'legal',
    audiences: ['applicants', 'executors'],
    publishFrom: '10.08.2026',
    publishTo: '30.09.2026',
    attachments: [
      { name: 'Geobotanik_meyorlar_2026.pdf', size: '2.4 MB' },
      { name: 'Qollanma_hisob-kitob.xlsx', size: '640 KB' },
    ],
    author: 'Ergashov Sardor Anvarovich',
    status: 'published',
  },
  {
    id: 'ANN-2026-016',
    title: 'Inspektorlar uchun mobil PWA ilovasining yangi versiyasi',
    body: 'Offline rejim va QR skaner yaxshilandi. Ilovani yangilash uchun kabinetdan qayta kiring.',
    category: 'news',
    audiences: ['executors'],
    publishFrom: '05.08.2026',
    publishTo: '05.09.2026',
    attachments: [{ name: 'PWA_yangilanish_qollanma.pdf', size: '1.1 MB' }],
    author: 'Ergashov Sardor Anvarovich',
    status: 'published',
  },
  {
    id: 'ANN-2026-019',
    title: 'Yangi hisobot formasi: III kvartal yigʻma hisoboti',
    body: 'III kvartal boʻyicha yangi hisobot shakli 01.09.2026 dan kabinetlarda ochiladi.',
    category: 'announcement',
    audiences: ['executors', 'central'],
    publishFrom: '25.08.2026',
    publishTo: '15.10.2026',
    attachments: [],
    author: 'Karimov Jamshid Botirovich',
    status: 'scheduled',
  },
  {
    id: 'ANN-2026-012',
    title: 'Yozgi yongʻin xavfi davrida faoliyat turlariga cheklov',
    body: 'Yuqori yongʻin xavfi eʼlon qilingan hududlarda rekreatsiya va oʻtin yigʻish vaqtincha toʻxtatiladi.',
    category: 'announcement',
    audiences: ['applicants', 'executors'],
    publishFrom: '01.06.2026',
    publishTo: '31.07.2026',
    attachments: [],
    author: 'Ergashov Sardor Anvarovich',
    status: 'expired',
  },
];

export const AdminAnnouncementsPage: React.FC<AdminAnnouncementsPageProps> = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [dateFrom, setDateFrom] = useState('');

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editedItem, setEditedItem] = useState<Announcement | null>(null);
  const [itemToDelete, setItemToDelete] = useState<Announcement | null>(null);

  const [formTitle, setFormTitle] = useState('');
  const [formTitleRu, setFormTitleRu] = useState('');
  const [formBody, setFormBody] = useState('');
  const [formCategory, setFormCategory] = useState('announcement');
  const [formAudiences, setFormAudiences] = useState<string[]>(['applicants']);
  const [formFrom, setFormFrom] = useState('');
  const [formTo, setFormTo] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const openCreateForm = () => {
    setEditedItem(null);
    setFormTitle('');
    setFormTitleRu('');
    setFormBody('');
    setFormCategory('announcement');
    setFormAudiences(['applicants']);
    setFormFrom('');
    setFormTo('');
    setFormError(null);
    setIsFormOpen(true);
  };

  const openEditForm = (item: Announcement) => {
    setEditedItem(item);
    setFormTitle(item.title);
    setFormTitleRu(item.titleRu ?? '');
    setFormBody(item.body);
    setFormCategory(item.category);
    setFormAudiences([...item.audiences]);
    setFormFrom(item.publishFrom);
    setFormTo(item.publishTo);
    setFormError(null);
    setIsFormOpen(true);
  };

  const toggleAudience = (id: string) => {
    setFormAudiences((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    if (!formTitle.trim()) {
      setFormError('Sarlavha davlat tilida kiritilishi shart.');
      return;
    }
    if (!formBody.trim()) {
      setFormError('Eʼlon matni kiritilishi shart.');
      return;
    }
    if (formAudiences.length === 0) {
      setFormError('Kamida bitta foydalanuvchi toifasi tanlanishi kerak.');
      return;
    }
    if (!formFrom || !formTo) {
      setFormError('Eʼlon qilish davri (boshlanish va tugash sanasi) belgilanishi shart.');
      return;
    }

    if (editedItem) {
      setAnnouncements((prev) =>
        prev.map((a) =>
          a.id === editedItem.id
            ? {
                ...a,
                title: formTitle,
                titleRu: formTitleRu || undefined,
                body: formBody,
                category: formCategory,
                audiences: formAudiences,
                publishFrom: formFrom,
                publishTo: formTo,
              }
            : a
        )
      );
    } else {
      setAnnouncements((prev) => [
        {
          id: `ANN-2026-${String(prev.length + 20).padStart(3, '0')}`,
          title: formTitle,
          titleRu: formTitleRu || undefined,
          body: formBody,
          category: formCategory,
          audiences: formAudiences,
          publishFrom: formFrom,
          publishTo: formTo,
          attachments: [],
          author: 'Ergashov Sardor Anvarovich',
          status: 'scheduled',
        },
        ...prev,
      ]);
    }

    setIsFormOpen(false);
  };

  const handleDelete = () => {
    if (!itemToDelete) return;
    setAnnouncements((prev) => prev.filter((a) => a.id !== itemToDelete.id));
    setItemToDelete(null);
  };

  const filtered = announcements.filter((a) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      a.title.toLowerCase().includes(query) ||
      a.body.toLowerCase().includes(query) ||
      a.id.toLowerCase().includes(query);
    const matchesStatus = statusFilter === 'all' || a.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || a.category === categoryFilter;
    // Date search compares dd.MM.yyyy strings converted to a sortable form.
    const toSortable = (d: string) => d.split('.').reverse().join('-');
    const matchesDate = !dateFrom || toSortable(a.publishTo) >= dateFrom;
    return matchesSearch && matchesStatus && matchesCategory && matchesDate;
  });

  const statusStyles: Record<Announcement['status'], string> = {
    published: 'bg-[#F0F7F1] text-[#15803D] border-[#D9EBDC]',
    scheduled: 'bg-blue-50 text-blue-700 border-blue-200',
    expired: 'bg-gray-100 text-gray-600 border-gray-200',
    draft: 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]',
  };

  const statusLabels: Record<Announcement['status'], string> = {
    published: 'Eʼlon qilingan',
    scheduled: 'Rejalashtirilgan',
    expired: 'Muddati tugagan',
    draft: 'Qoralama',
  };

  const publishedCount = announcements.filter((a) => a.status === 'published').length;
  const scheduledCount = announcements.filter((a) => a.status === 'scheduled').length;
  const expiredCount = announcements.filter((a) => a.status === 'expired').length;

  return (
    <div className="space-y-6 font-sans">
      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E4E7EA] p-5 rounded-2xl shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#5A646D] uppercase tracking-wider block">Faol eʼlonlar</span>
            <div className="text-xl font-bold text-[#1A1F24]">{publishedCount} ta</div>
            <span className="text-xs text-[#15803D] font-medium flex items-center gap-1 mt-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Hozir koʻrsatilmoqda
            </span>
          </div>
          <div className="p-3 bg-[#F0F7F1] rounded-xl text-[#2E7D4F]"><Megaphone className="w-6 h-6" /></div>
        </div>

        <div className="bg-white border border-[#E4E7EA] p-5 rounded-2xl shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#5A646D] uppercase tracking-wider block">Rejalashtirilgan</span>
            <div className="text-xl font-bold text-[#1A1F24]">{scheduledCount} ta</div>
            <span className="text-xs text-[#5A646D] font-medium block mt-1">Belgilangan sanada chiqadi</span>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Clock className="w-6 h-6" /></div>
        </div>

        <div className="bg-white border border-[#E4E7EA] p-5 rounded-2xl shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#5A646D] uppercase tracking-wider block">Muddati tugagan</span>
            <div className="text-xl font-bold text-[#1A1F24]">{expiredCount} ta</div>
            <span className="text-xs text-[#5A646D] font-medium block mt-1">Arxivda saqlanadi</span>
          </div>
          <div className="p-3 bg-gray-100 text-gray-600 rounded-xl"><Archive className="w-6 h-6" /></div>
        </div>

        <div className="bg-white border border-[#E4E7EA] p-5 rounded-2xl shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#5A646D] uppercase tracking-wider block">Qamrov</span>
            <div className="text-xl font-bold text-[#1A1F24]">{AUDIENCE_CATEGORIES.length} ta toifa</div>
            <span className="text-xs text-[#5A646D] font-medium block mt-1">Foydalanuvchi guruhlari</span>
          </div>
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl"><Users className="w-6 h-6" /></div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#2E7D4F] bg-[#F0F7F1] px-3 py-1 rounded-full border border-[#D9EBDC]">
            Eʼlon va xabarnomalar moduli (4.2.1.7)
          </span>
          <h1 className="text-lg font-bold text-[#1A1F24] mt-1.5">Eʼlonlar va Yangiliklar Boshqaruvi</h1>
          <p className="text-xs text-[#5A646D] mt-0.5">
            Tizim va Agentlik faoliyati boʻyicha eʼlon yaratish, eʼlon qilish davrini belgilash, fayl biriktirish va foydalanuvchi toifalariga yoʻnaltirish
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={openCreateForm}
          className="bg-[#2E7D4F] hover:bg-[#23653F] font-bold shadow-sm"
        >
          Yangi eʼlon
        </Button>
      </div>

      {/* Filters — TZ 4.2.1.7: search by date and text */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-4 shadow-xs space-y-3">
        <div className="w-full md:w-96">
          <Input
            placeholder="Eʼlon sarlavhasi, matni yoki ID boʻyicha qidirish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
            touchSize
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-1 border-t border-[#E4E7EA]">
          <SlidersHorizontal className="w-4 h-4 text-[#5A646D]" />

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-xs font-semibold px-3 py-2 text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
          >
            <option value="all">Barcha turlar</option>
            {Object.entries(CATEGORY_LABELS).map(([id, label]) => (
              <option key={id} value={id}>{label}</option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-xs font-semibold px-3 py-2 text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
          >
            <option value="all">Barcha statuslar</option>
            <option value="published">Eʼlon qilingan</option>
            <option value="scheduled">Rejalashtirilgan</option>
            <option value="expired">Muddati tugagan</option>
            <option value="draft">Qoralama</option>
          </select>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#5A646D]" />
            <span className="text-xs font-bold text-[#5A646D] whitespace-nowrap">Amal qiladi:</span>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-xs font-semibold px-3 py-2 text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
            />
          </div>

          <span className="text-xs text-[#767F87] ml-auto">
            Topildi: <b className="text-[#1A1F24] font-mono">{filtered.length}</b> ta
          </span>
        </div>
      </div>

      {/* Announcements list */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white border border-[#E4E7EA] rounded-2xl p-10 text-center text-sm text-[#767F87]">
            Filtr boʻyicha eʼlon topilmadi.
          </div>
        ) : (
          filtered.map((a) => (
            <div key={a.id} className="bg-white border border-[#E4E7EA] rounded-2xl p-5 shadow-xs space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-mono font-bold text-[#2E7D4F] bg-[#F0F7F1] px-2 py-0.5 rounded border border-[#D9EBDC]">
                      {a.id}
                    </span>
                    <span className="text-[11px] font-semibold text-[#5A646D] bg-[#F8F9FA] px-2 py-0.5 rounded border border-[#E4E7EA]">
                      {CATEGORY_LABELS[a.category] ?? a.category}
                    </span>
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${statusStyles[a.status]}`}>
                      {statusLabels[a.status]}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-[#1A1F24]">{a.title}</h3>
                  {a.titleRu && (
                    <p className="text-[11px] text-[#767F87] italic">{a.titleRu}</p>
                  )}
                  <p className="text-xs text-[#5A646D] leading-relaxed">{a.body}</p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => openEditForm(a)}
                    title="Tahrirlash"
                    className="p-1.5 text-[#5A646D] hover:text-[#2E7D4F] hover:bg-[#F0F7F1] rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setItemToDelete(a)}
                    title="Oʻchirish"
                    className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {a.attachments.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {a.attachments.map((file) => (
                    <span
                      key={file.name}
                      className="inline-flex items-center gap-1.5 text-[11px] bg-[#F8F9FA] border border-[#E4E7EA] px-2.5 py-1 rounded-lg text-[#1A1F24]"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#2E7D4F]" />
                      {file.name}
                      <span className="text-[#767F87]">({file.size})</span>
                    </span>
                  ))}
                </div>
              )}

              <div className="pt-3 border-t border-[#E4E7EA] flex flex-wrap items-center justify-between gap-3 text-[11px]">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[#5A646D]">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#9AA3AB]" />
                    Eʼlon davri: <b className="text-[#1A1F24] font-mono">{a.publishFrom} — {a.publishTo}</b>
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[#9AA3AB]" />
                    {a.audiences.length} ta toifa
                  </span>
                  {a.attachments.length > 0 && (
                    <span className="inline-flex items-center gap-1">
                      <Paperclip className="w-3.5 h-3.5 text-[#9AA3AB]" />
                      {a.attachments.length} ta fayl
                    </span>
                  )}
                </div>
                <span className="text-[#767F87]">Muallif: {a.author}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create / edit announcement */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editedItem ? `Eʼlonni tahrirlash — ${editedItem.id}` : 'Yangi eʼlon yaratish'}
        subtitle="Matn davlat tilida majburiy, boshqa tillarda ixtiyoriy"
        maxWidth="2xl"
        footer={
          <div className="flex items-center justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsFormOpen(false)}>
              Bekor qilish
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSubmit}
              className="bg-[#2E7D4F] hover:bg-[#23653F] font-bold"
            >
              {editedItem ? 'Oʻzgarishni saqlash' : 'Saqlash va rejalashtirish'}
            </Button>
          </div>
        }
      >
        <div className="space-y-4 py-1">
          {formError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 font-semibold flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" /> {formError}
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#1A1F24]">Sarlavha (oʻzbek tilida):</label>
            <Input
              placeholder="Masalan: Tizim profilaktikasi 20-avgust kuni"
              value={formTitle}
              onChange={(e) => { setFormTitle(e.target.value); setFormError(null); }}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#1A1F24]">Sarlavha (rus tilida, ixtiyoriy):</label>
            <Input
              placeholder="Например: Профилактика системы 20 августа"
              value={formTitleRu}
              onChange={(e) => setFormTitleRu(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#1A1F24]">Eʼlon matni:</label>
            <textarea
              rows={4}
              value={formBody}
              onChange={(e) => { setFormBody(e.target.value); setFormError(null); }}
              placeholder="Eʼlon mazmunini kiriting..."
              className="w-full bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-xs p-3 text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1A1F24]">Turi:</label>
              <select
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value)}
                className="w-full bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-sm p-3 text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
              >
                {Object.entries(CATEGORY_LABELS).map(([id, label]) => (
                  <option key={id} value={id}>{label}</option>
                ))}
              </select>
            </div>

            {/* TZ 4.2.1.7: publication period */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1A1F24]">Eʼlon qilish sanasi:</label>
              <Input
                placeholder="13.08.2026"
                value={formFrom}
                onChange={(e) => { setFormFrom(e.target.value); setFormError(null); }}
                className="font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1A1F24]">Tugash sanasi:</label>
              <Input
                placeholder="21.08.2026"
                value={formTo}
                onChange={(e) => { setFormTo(e.target.value); setFormError(null); }}
                className="font-mono"
              />
            </div>
          </div>

          {/* TZ 4.2.1.7: addressed to user categories */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#1A1F24]">Kimga koʻrsatilsin:</label>
            <div className="border border-[#E4E7EA] rounded-xl p-3 space-y-1">
              {AUDIENCE_CATEGORIES.map((cat) => (
                <label key={cat.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#F8F9FA] cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={formAudiences.includes(cat.id)}
                    onChange={() => { toggleAudience(cat.id); setFormError(null); }}
                    className="w-4 h-4 accent-[#2E7D4F] shrink-0"
                  />
                  <span className="text-[#1A1F24]">{cat.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* TZ 4.2.1.7: file attachments */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#1A1F24]">Biriktirilgan fayllar:</label>
            <div className="p-4 border-2 border-dashed border-[#E4E7EA] rounded-xl text-center space-y-2">
              <Paperclip className="w-6 h-6 text-[#9AA3AB] mx-auto" />
              <div className="text-xs text-[#767F87]">PDF, DOCX, XLSX — har biri 10 MB gacha</div>
              <Button variant="outline" size="sm" onClick={() => alert('Fayl tanlash oynasi ochiladi.')}>
                Fayl biriktirish
              </Button>
            </div>
          </div>

          <div className="p-3 bg-[#F0F7F1] border border-[#D9EBDC] rounded-xl text-[11px] text-[#2E7D4F] flex items-start gap-2">
            <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            <span>
              Eʼlon belgilangan davr davomida tanlangan toifalarning bosh sahifasida koʻrsatiladi.
              Yuridik ahamiyatga ega xabarnomalar foydalanuvchi kanalni oʻchirgan boʻlsa ham kabinet ichida yetkaziladi.
            </span>
          </div>
        </div>
      </Modal>

      {/* Delete confirmation */}
      <Modal
        isOpen={!!itemToDelete}
        onClose={() => setItemToDelete(null)}
        title="Eʼlonni oʻchirishni tasdiqlang"
        subtitle={itemToDelete?.title}
        footer={
          <div className="flex items-center justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setItemToDelete(null)}>
              Bekor qilish
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleDelete}
              className="bg-rose-700 hover:bg-rose-800 text-white font-bold"
            >
              Ha, oʻchirish
            </Button>
          </div>
        }
      >
        <div className="py-1 text-xs text-[#5A646D]">
          Eʼlon foydalanuvchilarga koʻrsatilishdan toʻxtaydi. Oʻchirish amali audit jurnaliga yoziladi.
        </div>
      </Modal>
    </div>
  );
};
