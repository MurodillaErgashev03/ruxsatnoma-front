import React, { useState } from 'react';
import {
  CheckCircle2,
  RotateCcw,
  XCircle,
  Clock,
  AlertCircle,
  UserCheck,
  Calculator,
  ChevronRight,
  UserPlus,
} from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Modal } from '../../../components/ui/Overlay';

export interface ActionRailProps {
  onApprove?: () => void;
  onReturn?: () => void;
  onReject?: () => void;
}

export const ActionRail: React.FC<ActionRailProps> = ({
  onApprove,
  onReturn,
  onReject,
}) => {
  const [activeModal, setActiveModal] = useState<'approve' | 'return' | 'reject' | 'reassign' | null>(null);
  const [noteText, setNoteText] = useState('');
  const [newExecutor, setNewExecutor] = useState('Karimov Otabek');

  return (
    <div className="space-y-4 font-sans">
      {/* ── RAIL BLOCK 1: Primary Decision Actions & SLA ────────────────── */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-5 shadow-xs space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#5A646D] border-b border-[#E4E7EA] pb-2">
          Qaror qabul qilish va harakatlar
        </h3>

        <div className="space-y-2.5">
          <Button
            variant="primary"
            size="lg"
            leftIcon={<CheckCircle2 className="w-5 h-5" />}
            onClick={() => setActiveModal('approve')}
            className="w-full bg-[#2E7D4F] hover:bg-[#23653F] text-white font-bold h-12 rounded-xl justify-center cursor-pointer shadow-md"
          >
            Ijobiy xulosa / Tasdiqlash
          </Button>

          <Button
            variant="outline"
            size="lg"
            leftIcon={<RotateCcw className="w-5 h-5" />}
            onClick={() => setActiveModal('return')}
            className="w-full border-[#B45309] text-[#B45309] hover:bg-[#FFFBEB] font-bold h-12 rounded-xl justify-center cursor-pointer"
          >
            Tuzatishga qaytarish
          </Button>

          <Button
            variant="outline"
            size="lg"
            leftIcon={<XCircle className="w-5 h-5" />}
            onClick={() => setActiveModal('reject')}
            className="w-full border-[#B91C1C] text-[#B91C1C] hover:bg-[#FEF2F2] font-bold h-12 rounded-xl justify-center cursor-pointer"
          >
            Rad etish qarori
          </Button>
        </div>

        <div className="pt-3 border-t border-[#E4E7EA] text-xs text-[#5A646D] leading-relaxed">
          <strong>Izoh:</strong> Barcha qarorlar E-IMZO raqamli imzo bilan muhrlanadi va arizachining shaxsiy kabinetiga yuboriladi.
        </div>
      </div>

      {/* ── RAIL BLOCK 2: Key Numbers (Ключевые числа) ────────────────── */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-5 shadow-xs space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#5A646D] flex items-center justify-between border-b border-[#E4E7EA] pb-2">
          <span className="flex items-center gap-1.5">
            <Calculator className="w-4 h-4 text-[#2E7D4F]" /> Asosiy koʻrsatkichlar
          </span>
          <span className="font-mono text-[10px] text-[#767F87]">Ключевые числа</span>
        </h3>

        <dl className="grid grid-cols-2 gap-y-2 gap-x-3 text-xs">
          <dt className="text-[#5A646D]">MaxSB (Sigʻim):</dt>
          <dd className="font-mono font-bold text-[#1A1F24] text-right">29.00</dd>

          <dt className="text-[#5A646D]">ActivePermitsSB:</dt>
          <dd className="font-mono text-[#1A1F24] text-right">17.60</dd>

          <dt className="text-[#5A646D]">RemainingSB:</dt>
          <dd className="font-mono text-[#1A1F24] text-right">11.40</dd>

          <dt className="text-[#5A646D]">UsedSB (Ariza):</dt>
          <dd className="font-mono text-[#1A1F24] text-right">11.00</dd>

          <dt className="text-[#5A646D]">Ostatnesya (Qoladi):</dt>
          <dd className="font-mono font-bold text-[#B45309] text-right">0.40</dd>

          <dt className="text-[#5A646D]">S_available:</dt>
          <dd className="font-mono text-[#1A1F24] text-right">18.70 ha</dd>

          <dt className="text-[#5A646D] pt-1 border-t border-[#E4E7EA]">Summa:</dt>
          <dd className="font-mono font-bold text-[#2E7D4F] text-right pt-1 border-t border-[#E4E7EA]">
            1 207 324,80 UZS
          </dd>
        </dl>

        <div className="pt-2 text-[11px] text-[#B45309] bg-[#FFFBEB] p-2.5 rounded-lg border border-[#FDE68A] leading-tight">
          <strong>Zaxira: 0.40 SB.</strong> Tasdiqlashga yuborishdan oldin chorva boshini tekshiring —{' '}
          <a href="#s-calc" className="font-bold underline hover:text-[#92400E]">
            hisob-kitobga oʻtish
          </a>
        </div>
      </div>

      {/* ── RAIL BLOCK 3: Check Status Summary (Состояние проверок) ───── */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-5 shadow-xs space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#5A646D] border-b border-[#E4E7EA] pb-2">
          Tekshiruvlar holati (Состояние проверок)
        </h3>

        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2 text-[#15803D] font-semibold bg-[#DCFCE7]/50 p-2 rounded-lg border border-[#86EFAC]/50">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>8 ta avto-tekshiruv oʻtdi</span>
          </div>

          <div className="flex items-center gap-2 text-[#15803D] bg-[#F8F9FA] p-2 rounded-lg border border-[#E4E7EA]">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-[#15803D]" />
            <div>
              <span className="font-medium text-[#1A1F24] block">Kadastr javobi olindi</span>
              <span className="font-mono text-[10px] text-[#5A646D]">10.08.2026, 09:12</span>
            </div>
          </div>

          <div className="flex items-start gap-2 text-[#B45309] bg-[#FFFBEB] p-2 rounded-lg border border-[#FDE68A]">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold block">Veterinariya AT mavjud emas</span>
              <span className="text-[10px] text-[#5A646D]">Qoʻlda qaror berish, checker kutilmoqda</span>
            </div>
          </div>
        </div>

        <a
          href="#s-checks"
          className="text-xs font-bold text-[#2E7D4F] hover:underline flex items-center gap-1 pt-1"
        >
          <span>«Tekshiruvlar» boʻlimiga oʻtish</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* ── RAIL BLOCK 4: Reproducibility Trace (Воспроизводимость) ───── */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-5 shadow-xs space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#5A646D] border-b border-[#E4E7EA] pb-2">
          Qayta tiklanuvchanlik (Воспроизводимость)
        </h3>

        <dl className="grid grid-cols-2 gap-y-1.5 text-[11px]">
          <dt className="text-[#5A646D]">Rule_version:</dt>
          <dd className="font-mono font-bold text-[#1A1F24] text-right">NRM-14-2-2026-R3</dd>

          <dt className="text-[#5A646D]">Tariff_version:</dt>
          <dd className="font-mono font-bold text-[#1A1F24] text-right">TRF-278-2026-R1</dd>

          <dt className="text-[#5A646D]">Input_snapshot:</dt>
          <dd className="font-mono text-[#1A1F24] text-right">20260804T090014Z</dd>

          <dt className="text-[#5A646D]">SHA256 Hash:</dt>
          <dd className="font-mono text-[#1A1F24] text-right truncate">9f3c41e7..b280</dd>
        </dl>

        <div className="pt-2 border-t border-[#E4E7EA] text-[11px] text-[#5A646D] leading-tight">
          <strong>4.2.15-band:</strong> Hisob-kitob oʻtmishdagi maʼlumotlar bilan izohlanadi va me'yor oʻzgarganda qayta hisoblanmaydi.
        </div>
      </div>

      {/* ── RAIL BLOCK 5: Executor Information (Исполнитель) ──────────── */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-5 shadow-xs space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#5A646D] border-b border-[#E4E7EA] pb-2 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <UserCheck className="w-4 h-4 text-[#2E7D4F]" /> Masʼul ijrochi
          </span>
          <span className="font-mono text-[10px] text-[#767F87]">Исполнитель</span>
        </h3>

        <dl className="grid grid-cols-2 gap-y-1.5 text-xs">
          <dt className="text-[#5A646D]">Tayinlangan:</dt>
          <dd className="font-bold text-[#1A1F24] text-right">Dilnoza Abdullayeva</dd>

          <dt className="text-[#5A646D]">Qachon:</dt>
          <dd className="font-mono text-[#1A1F24] text-right">22.07.2026</dd>

          <dt className="text-[#5A646D]">Qanday:</dt>
          <dd className="text-[#5A646D] text-right">Avtomatik</dd>
        </dl>

        <Button
          variant="outline"
          size="sm"
          leftIcon={<UserPlus className="w-4 h-4" />}
          onClick={() => setActiveModal('reassign')}
          className="w-full border-[#767F87] text-[#1A1F24] hover:bg-gray-50 font-bold cursor-pointer text-xs mt-2"
        >
          Boshqa ijrochiga oʻtkazish
        </Button>
      </div>

      {/* SLA Quick Status Card */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-5 shadow-xs space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#5A646D] flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-[#B45309]" /> SLA va Ijro muddati
        </h3>

        <div className="space-y-1">
          <div className="text-sm font-bold text-[#1A1F24]">3 ish kuni ajratilgan</div>
          <div className="text-xs text-[#B45309] font-bold">10.08.2026 18:00 (Bugun tugaydi)</div>
          <div className="text-xs text-[#5A646D]">Qolgan vaqt: 8 soat 20 daqiqa</div>
        </div>

        <div className="w-full bg-[#E4E7EA] h-2 rounded-full overflow-hidden">
          <div className="bg-[#B45309] h-full rounded-full w-[85%]" />
        </div>
      </div>

      {/* Decision & Reassign Modal Overlays */}
      {activeModal && (
        <Modal
          isOpen={!!activeModal}
          onClose={() => setActiveModal(null)}
          title={
            activeModal === 'approve'
              ? 'Arizaga ijobiy xulosa berish'
              : activeModal === 'return'
              ? 'Arizani tuzatishga qaytarish'
              : activeModal === 'reject'
              ? 'Arizani rad etish'
              : 'Arizani boshqa ijrochiga oʻtkazish'
          }
        >
          <div className="space-y-4">
            {activeModal === 'reassign' ? (
              <div className="space-y-3">
                <p className="text-xs text-[#5A646D]">
                  Ushbu arizani koʻrib chiqishni oʻrmon xoʻjaligining boshqa xodimiga biriktiring.
                </p>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#1A1F24]">Yangi masʼul xodimni tanlang *</label>
                  <select
                    value={newExecutor}
                    onChange={(e) => setNewExecutor(e.target.value)}
                    className="w-full p-3 border border-[#767F87] rounded-xl text-xs bg-white outline-none focus:ring-2 focus:ring-[#2E7D4F]"
                  >
                    <option value="Karimov Otabek">Karimov Otabek (Katta inspektor)</option>
                    <option value="Yusupov Jasur">Yusupov Jasur (GIS mutaxassisi)</option>
                    <option value="Tashpulatova Nodira">Tashpulatova Nodira (Boʻlim boshligʻi)</option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-[#5A646D] leading-relaxed">
                  {activeModal === 'approve'
                    ? 'Arizaga ijobiy xulosa rasmiylashtirilmoqda. Toʻlov xabarnomasi shakllanadi va arizachiga yuboriladi.'
                    : activeModal === 'return'
                    ? 'Arizachiga aniq kamchiliklarni koʻrsatuvchi izoh yozing (masalan, maydonni kamaytirish yoki hujjat biriktirish).'
                    : 'Arizani rad etish sababini va VMQ moddasini koʻrsating.'}
                </p>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#1A1F24]">Rasmiy izoh / Asoslantirish *</label>
                  <textarea
                    rows={4}
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="Qaror izohini yozing..."
                    className="w-full p-3 border border-[#767F87] rounded-xl text-xs focus:ring-2 focus:ring-[#2E7D4F] outline-none"
                  />
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-3 border-t border-[#E4E7EA]">
              <Button variant="outline" onClick={() => setActiveModal(null)}>
                Bekor qilish
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  alert(
                    activeModal === 'reassign'
                      ? `Ariza muvaffaqiyatli ${newExecutor}ga oʻtkazildi`
                      : `Qaror tasdiqlandi: ${activeModal}`
                  );
                  setActiveModal(null);
                  if (activeModal === 'approve') onApprove?.();
                  if (activeModal === 'return') onReturn?.();
                  if (activeModal === 'reject') onReject?.();
                }}
                className={
                  activeModal === 'approve'
                    ? 'bg-[#2E7D4F] hover:bg-[#23653F]'
                    : activeModal === 'return'
                    ? 'bg-[#B45309] hover:bg-[#92400E]'
                    : activeModal === 'reject'
                    ? 'bg-[#B91C1C] hover:bg-[#991B1B]'
                    : 'bg-[#2E7D4F]'
                }
              >
                E-IMZO bilan tasdiqlash
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
