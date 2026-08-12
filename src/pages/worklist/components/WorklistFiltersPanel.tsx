import React from 'react';
import { Filter, RotateCcw, Plus, Check } from 'lucide-react';
import { Button } from '../../../components/ui/button';

export interface WorklistFilterValues {
  status: string;
  activity: string;
  startDate: string;
  endDate: string;
  slaDeadline: string;
  preset: string;
}

export interface WorklistFiltersPanelProps {
  filters: WorklistFilterValues;
  onFilterChange: (key: keyof WorklistFilterValues, val: string) => void;
  onResetFilters: () => void;
  onApplyFilters: () => void;
  onSelectPreset: (presetId: string) => void;
}

export const WorklistFiltersPanel: React.FC<WorklistFiltersPanelProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  onApplyFilters,
  onSelectPreset,
}) => {
  const presets = [
    { id: 'all_assigned', label: 'Barcha biriktirilganlar', count: 24 },
    { id: 'urgent_sla', label: 'Muddati oʻtayotganlar (SLA)', count: 4 },
    { id: 'grazing_bostonliq', label: 'Chorva mollarini boqish (Boʻstonliq)', count: 9 },
    { id: 'waiting_applicant', label: 'Arizachi javobi kutilmoqda', count: 3 },
  ];

  return (
    <div className="bg-white border border-[#E4E7EA] rounded-2xl p-5 shadow-xs font-sans space-y-4">
      {/* Primary Filter Row */}
      <div className="flex flex-wrap gap-4 items-end justify-between">
        {/* Status Dropdown */}
        <div className="space-y-1 min-w-[160px] flex-1">
          <label className="text-xs font-bold text-[#5A646D] uppercase tracking-wider block truncate">
            Status (Статус)
          </label>
          <select
            value={filters.status}
            onChange={(e) => onFilterChange('status', e.target.value)}
            className="w-full h-10 px-3 text-xs bg-[#F8F9FA] border border-[#767F87] rounded-lg text-[#1A1F24] focus:ring-2 focus:ring-[#2E7D4F] focus:outline-none truncate"
          >
            <option value="all">Barchasi (Любой)</option>
            <option value="submitted">Topshirilgan (Отправлена)</option>
            <option value="under_review">Koʻrib chiqilmoqda (На рассмотрении)</option>
            <option value="info_requested">Ma'lumot soʻralgan (Запрошены сведения)</option>
            <option value="contract_prep">Shartnoma tayyorlanmoqda</option>
            <option value="returned">Qaytarilgan (Возвращена)</option>
            <option value="approved">Tasdiqlangan (Одобрена)</option>
          </select>
        </div>

        {/* Activity Type Dropdown */}
        <div className="space-y-1 min-w-[200px] flex-1">
          <label className="text-xs font-bold text-[#5A646D] uppercase tracking-wider block truncate">
            Faoliyat turi (Вид деятельности)
          </label>
          <select
            value={filters.activity}
            onChange={(e) => onFilterChange('activity', e.target.value)}
            className="w-full h-10 px-3 text-xs bg-[#F8F9FA] border border-[#767F87] rounded-lg text-[#1A1F24] focus:ring-2 focus:ring-[#2E7D4F] focus:outline-none truncate"
          >
            <option value="all">Barcha 6 ta faoliyat turi</option>
            <option value="grazing">Chorva mollarini boqish</option>
            <option value="mowing">Pichan oʻrish</option>
            <option value="beekeeping">Asalarichilik va in qoʻyish</option>
            <option value="recreation">Ratsional dam olish</option>
            <option value="firewood">Otin va shox-shabba yigʻish</option>
            <option value="research">Ilmiy-tadqiqot ishlari</option>
          </select>
        </div>

        {/* Submission Period Dates */}
        <div className="space-y-1 min-w-[280px] flex-1">
          <label className="text-xs font-bold text-[#5A646D] uppercase tracking-wider block truncate">
            Qabul davri (Период подачи)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => onFilterChange('startDate', e.target.value)}
              className="flex-1 min-w-0 h-10 px-2 text-[11px] font-mono bg-[#F8F9FA] border border-[#767F87] rounded-lg text-[#1A1F24]"
            />
            <span className="text-[#5A646D] text-xs shrink-0">—</span>
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => onFilterChange('endDate', e.target.value)}
              className="flex-1 min-w-0 h-10 px-2 text-[11px] font-mono bg-[#F8F9FA] border border-[#767F87] rounded-lg text-[#1A1F24]"
            />
          </div>
        </div>

        {/* SLA Urgency Filter */}
        <div className="space-y-1 min-w-[160px] flex-1">
          <label className="text-xs font-bold text-[#5A646D] uppercase tracking-wider block truncate">
            SLA muddati (Срок SLA)
          </label>
          <select
            value={filters.slaDeadline}
            onChange={(e) => onFilterChange('slaDeadline', e.target.value)}
            className="w-full h-10 px-3 text-xs bg-[#F8F9FA] border border-[#767F87] rounded-lg text-[#1A1F24] focus:ring-2 focus:ring-[#2E7D4F] focus:outline-none truncate"
          >
            <option value="all">Barchasi (Любой)</option>
            <option value="overdue">⚠️ Muddati oʻtgan (Просрочено)</option>
            <option value="due_today">▲ Bugun tugaydi (Истекает сегодня)</option>
            <option value="within_3days">3 kundan kam vaqt qoldi</option>
            <option value="paused">Timer toʻxtatilgan</option>
          </select>
        </div>

        {/* Filter Action Buttons */}
        <div className="flex items-center gap-2 shrink-0 ml-auto pt-2 sm:pt-0">
          <Button
            variant="outline"
            size="sm"
            onClick={onResetFilters}
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
            className="h-10 border-[#767F87] text-[#5A646D] hover:text-[#1A1F24] text-xs font-bold px-4"
          >
            Tiklash
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={onApplyFilters}
            leftIcon={<Filter className="w-3.5 h-3.5" />}
            className="h-10 bg-[#2E7D4F] hover:bg-[#23653F] text-white text-xs font-bold px-5 shadow-xs"
          >
            Qoʻllash
          </Button>
        </div>
      </div>

      {/* Saved Filter Profile Chips */}
      <div className="pt-3 border-t border-[#E4E7EA] flex flex-wrap items-center gap-2 text-xs">
        <span className="font-bold text-[#5A646D] uppercase text-[10px] tracking-wider mr-1">
          Mening podborkalarim:
        </span>

        {presets.map((p) => {
          const isSelected = filters.preset === p.id;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => onSelectPreset(p.id)}
              className={`px-3 py-1 rounded-full border text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-[#2E7D4F] text-white border-[#2E7D4F] font-bold shadow-xs'
                  : 'bg-[#F8F9FA] text-[#1A1F24] border-[#767F87] hover:bg-[#E4E7EA]'
              }`}
            >
              {isSelected && <Check className="w-3 h-3 text-white" />}
              <span>{p.label}</span>
              <span
                className={`text-[10px] font-mono rounded-full px-1.5 py-0.2 ${
                  isSelected ? 'bg-[#23653F] text-white' : 'bg-[#E4E7EA] text-[#5A646D]'
                }`}
              >
                {p.count}
              </span>
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => alert('Joriy filter profili saqlandi!')}
          className="px-3 py-1 rounded-full border border-dashed border-[#2E7D4F] text-[#2E7D4F] hover:bg-[#F0F7F1] text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
        >
          <Plus className="w-3.5 h-3.5" /> Saqlash
        </button>
      </div>
    </div>
  );
};
