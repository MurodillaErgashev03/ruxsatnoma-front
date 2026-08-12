import React, { useState } from 'react';
import { MousePointer, Edit3, Ruler, Upload, RotateCcw } from 'lucide-react';
import { Button } from '../../../components/ui/button';

export interface MapToolsPanelProps {
  onResetPolygon?: () => void;
}

export const MapToolsPanel: React.FC<MapToolsPanelProps> = ({ onResetPolygon }) => {
  const [activeTool, setActiveTool] = useState<'select' | 'draw' | 'measure' | 'import'>('select');

  const tools = [
    { id: 'select', title: 'Tanlash (Выбрать)', sub: 'Konturni bosish', icon: <MousePointer className="w-4 h-4" /> },
    { id: 'draw', title: 'Chizish (Нарисовать)', sub: 'Shaxsiy poligon', icon: <Edit3 className="w-4 h-4" /> },
    { id: 'measure', title: 'Oʻlchash (Измерить)', sub: 'Uzunlik va maydon', icon: <Ruler className="w-4 h-4" /> },
    { id: 'import', title: 'Yuklash (Импорт)', sub: 'SHP, GeoJSON, KML', icon: <Upload className="w-4 h-4" /> },
  ];

  return (
    <div className="bg-white border border-[#E4E7EA] rounded-2xl p-4 shadow-xs font-sans space-y-3">
      <div className="flex items-center justify-between border-b border-[#E4E7EA] pb-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#5A646D]">
          Xarita asboblari (Инструменты)
        </h3>
        <span className="text-xs text-[#2E7D4F] font-bold">
          Faol: {activeTool === 'select' ? 'Tanlash' : activeTool === 'draw' ? 'Chizish' : activeTool === 'measure' ? 'Oʻlchash' : 'Yuklash'}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {tools.map((t) => {
          const isActive = activeTool === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTool(t.id as any)}
              className={`p-3 rounded-xl border text-left transition-all flex flex-col gap-1 cursor-pointer ${
                isActive
                  ? 'bg-[#F0F7F1] border-[#2E7D4F] text-[#123522] font-bold shadow-xs'
                  : 'bg-white border-[#767F87] text-[#1A1F24] hover:bg-[#F8F9FA]'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={isActive ? 'text-[#2E7D4F]' : 'text-[#5A646D]'}>{t.icon}</span>
                <span className="text-xs font-bold truncate">{t.title}</span>
              </div>
              <span className="text-[11px] text-[#5A646D] truncate">{t.sub}</span>
            </button>
          );
        })}
      </div>

      <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
        <span className="text-[#5A646D] flex-1 min-w-[240px]">
          Geometriya serverda tekshiriladi: toʻgʻriligi, oʻrmon fondi ichidaligi va kesishuvlar.
        </span>

        <Button
          variant="outline"
          size="sm"
          leftIcon={<RotateCcw className="w-3.5 h-3.5 text-[#B91C1C]" />}
          onClick={onResetPolygon}
          className="border-[#B91C1C] text-[#B91C1C] hover:bg-[#FEF2F2] font-bold cursor-pointer text-xs shrink-0"
        >
          Shtrixlangan joyni tiklash
        </Button>
      </div>
    </div>
  );
};
