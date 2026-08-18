import React, { useState } from 'react';
import { Compass, CheckCircle2, AlertTriangle, Send, Info } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { hasRight } from '../../../lib/permissions';

export interface GisConclusionPanelProps {
  userRole?: string;
  contourId?: string;
  contourName?: string;
}

/**
 * The GIS conclusion the specialist attaches to an application — the third duty
 * of that role in the TZ ("выдача заключения по проверке"). The head of the
 * executing organisation reads it before deciding (TZ scenario S-13).
 *
 * Everyone else sees the conclusion once it exists, but cannot write one.
 */
export const GisConclusionPanel: React.FC<GisConclusionPanelProps> = ({
  userRole = '',
  contourId = 'K-042',
  contourName = 'Kontur №42 (Boʻstonliq 14-2)',
}) => {
  const canWriteConclusion = hasRight(userRole, 'gis_contour', 'edit');

  const [verdict, setVerdict] = useState<'positive' | 'negative' | null>(null);
  const [note, setNote] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const checks = [
    { label: 'Geometriya yaroqliligi (ST_IsValid)', ok: true, detail: 'Poligon yopiq, oʻz-oʻzini kesmaydi' },
    { label: 'Kontur ichida joylashuvi (ST_Within)', ok: true, detail: 'Soʻralgan uchastka kontur ichida' },
    { label: 'Kesishuvlar (ST_Overlaps)', ok: true, detail: 'Boshqa amaldagi ruxsatnoma bilan kesishmadi' },
    { label: 'Kontur holati', ok: true, detail: 'Eʼlon qilingan (Published)' },
    { label: 'Muhofaza zonasiga yaqinlik', ok: false, detail: 'Suv muhofaza zonasidan 120 m — meʼyor 100 m' },
  ];

  const failedCount = checks.filter((c) => !c.ok).length;

  return (
    <div className="bg-white border border-[#E4E7EA] rounded-2xl p-5 shadow-xs space-y-4 font-sans">
      <div className="flex items-center gap-2 border-b border-[#E4E7EA] pb-3">
        <Compass className="w-5 h-5 text-[#2E7D4F]" />
        <div>
          <h3 className="text-sm font-bold text-[#1A1F24]">GIS xulosasi</h3>
          <p className="text-[11px] text-[#767F87]">{contourName} · {contourId}</p>
        </div>
      </div>

      {/* Automatic topology checks — TZ module 10.2 */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#5A646D] block">
          Avtomatik topologik tekshiruvlar
        </span>
        {checks.map((c) => (
          <div
            key={c.label}
            className={`p-2.5 rounded-xl border flex items-start gap-2 text-xs ${
              c.ok ? 'bg-[#F0F7F1] border-[#D9EBDC]' : 'bg-[#FFFBEB] border-[#FDE68A]'
            }`}
          >
            {c.ok ? (
              <CheckCircle2 className="w-4 h-4 text-[#2E7D4F] shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-[#B45309] shrink-0 mt-0.5" />
            )}
            <div className="min-w-0">
              <div className={`font-semibold ${c.ok ? 'text-[#1A1F24]' : 'text-[#B45309]'}`}>{c.label}</div>
              <div className="text-[11px] text-[#5A646D]">{c.detail}</div>
            </div>
          </div>
        ))}
      </div>

      {isSubmitted ? (
        <div className="p-3 bg-[#F0F7F1] border border-[#D9EBDC] rounded-xl text-xs text-[#2E7D4F] flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
          <span>
            GIS xulosasi (<b>{verdict === 'positive' ? 'ijobiy' : 'salbiy'}</b>) arizaga biriktirildi
            va ijrochi tashkilot rahbariga yuborildi.
          </span>
        </div>
      ) : canWriteConclusion ? (
        <div className="space-y-3 pt-1 border-t border-[#E4E7EA]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#5A646D] block">
            Mutaxassis xulosasi
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setVerdict('positive')}
              className={`flex-1 px-3 py-2 rounded-xl text-xs font-bold border transition-colors ${
                verdict === 'positive'
                  ? 'bg-[#2E7D4F] text-white border-[#2E7D4F]'
                  : 'bg-white text-[#1A1F24] border-[#E4E7EA] hover:bg-[#F8F9FA]'
              }`}
            >
              Ijobiy xulosa
            </button>
            <button
              onClick={() => setVerdict('negative')}
              className={`flex-1 px-3 py-2 rounded-xl text-xs font-bold border transition-colors ${
                verdict === 'negative'
                  ? 'bg-[#B91C1C] text-white border-[#B91C1C]'
                  : 'bg-white text-[#1A1F24] border-[#E4E7EA] hover:bg-[#F8F9FA]'
              }`}
            >
              Salbiy xulosa
            </button>
          </div>

          <textarea
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Xulosa izohi — aniqlangan holat va asos..."
            className="w-full bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-xs p-3 text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
          />

          {failedCount > 0 && verdict === 'positive' && (
            <div className="p-2.5 bg-[#FFFBEB] border border-[#FDE68A] rounded-xl text-[11px] text-[#B45309] flex items-start gap-2">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span>{failedCount} ta tekshiruv oʻtmadi — ijobiy xulosa uchun izohda asos koʻrsating.</span>
            </div>
          )}

          <Button
            variant="primary"
            size="sm"
            fullWidth
            leftIcon={<Send className="w-4 h-4" />}
            onClick={() => {
              if (!verdict || !note.trim()) return;
              setIsSubmitted(true);
            }}
            className="bg-[#2E7D4F] hover:bg-[#23653F] text-white font-bold disabled:opacity-50"
          >
            Xulosani biriktirish
          </Button>
        </div>
      ) : (
        <div className="p-3 bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-[11px] text-[#5A646D] flex items-start gap-2">
          <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#2E7D4F]" />
          <span>
            GIS xulosasini GIS/meʼyoriy mutaxassis beradi. Bu yerda avtomatik tekshiruv
            natijalari koʻrinadi.
          </span>
        </div>
      )}
    </div>
  );
};
