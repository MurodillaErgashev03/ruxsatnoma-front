import React from 'react';
import { CheckCircle2, PauseCircle, Lock, ArrowRight, RotateCcw, Send, HelpCircle } from 'lucide-react';
import { hasRight } from '../../../lib/permissions';

export interface UnclaimedStatePanelProps {
  onTakeIntoWork?: () => void;
  onReturnToApplicant?: () => void;
  userRole?: string;
}

export const UnclaimedStatePanel: React.FC<UnclaimedStatePanelProps> = ({
  onTakeIntoWork,
  onReturnToApplicant,
  userRole = '',
}) => {
  /**
   * Taking an application into work and returning it are Я and Ў, held by the
   * staff of the executing organisation. Monitoring roles reach this card from a
   * registry with К+Э and must not see the action block (TZ 4.1.7).
   */
  const canWork = hasRight(userRole, 'application', 'edit');
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 items-stretch font-sans">
      {/* Left Column: Locked Card Sections Notice (Equal Height) */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-6">
        <div className="space-y-6">
          <div className="border-b border-[#E4E7EA] pb-4">
            <h2 className="text-xl font-bold text-[#1A1F24]">
              Kartochka boʻlimlari koʻrib chiqishga olinguncha cheklangan
            </h2>
            <p className="text-xs text-[#5A646D] mt-1">
              Разделы карточки заблокированы до принятия в работу. Ariza rasman qabul qilinmaguncha amallar cheklangan boʻladi.
            </p>
          </div>

          {/* 4 List Items */}
          <div className="space-y-4">
            {/* Item 1 */}
            <div className="p-4 rounded-xl border border-[#E4E7EA] bg-[#F8F9FA] flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#DCFCE7] text-[#15803D] border border-[#86EFAC] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-[#1A1F24]">
                  Umumiy maʼlumotlar va hujjatlar oʻqish uchun ochiq
                </h3>
                <p className="text-xs text-[#5A646D] leading-relaxed">
                  Oʻrmon xoʻjaligi xodimi aynan qanday ariza va hujjatlarni qabul qilayotganini koʻra olishi uchun oʻqish rejimida ochiq holda turadi.
                </p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="p-4 rounded-xl border border-[#E4E7EA] bg-[#F8F9FA] flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A] flex items-center justify-center shrink-0">
                <PauseCircle className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-[#1A1F24]">
                  Hisob-kitob dastlabki tarzda koʻrsatilgan
                </h3>
                <p className="text-xs text-[#5A646D] leading-relaxed">
                  Yakuniy rasmiy hisob-kitob va me'yoriy zanjir ariza <code className="bg-white px-1.5 py-0.5 rounded border border-[#E4E7EA] font-mono text-[11px]">IN_REVIEW</code> (Koʻrib chiqilmoqda) holatiga oʻtganida bajariladi.
                </p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="p-4 rounded-xl border border-[#E4E7EA] bg-[#F8F9FA] flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A] flex items-center justify-center shrink-0">
                <PauseCircle className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-[#1A1F24]">
                  Tashqi tizimlarga soʻrovlar yuborilmagan
                </h3>
                <p className="text-xs text-[#5A646D] leading-relaxed">
                  Kadastr va veterinariya axborot tizimlariga rasmiy soʻrovlar ijroga olingandan soʻng avtomatik yuboriladi (S5 ssenariysi).
                </p>
              </div>
            </div>

            {/* Item 4 */}
            <div className="p-4 rounded-xl border border-[#E4E7EA] bg-[#F8F9FA] flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#F3F4F6] text-[#767F87] border border-[#E4E7EA] flex items-center justify-center shrink-0">
                <Lock className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-[#1A1F24]">
                  Qarorlar cheklangan
                </h3>
                <p className="text-xs text-[#5A646D] leading-relaxed">
                  Ilova spetsifikatsiyasiga koʻra <code className="bg-white px-1.5 py-0.5 rounded border border-[#E4E7EA] font-mono text-[11px]">SUBMITTED</code> holatidan faqat <code className="bg-white px-1.5 py-0.5 rounded border border-[#E4E7EA] font-mono text-[11px]">IN_REVIEW</code>, <code className="bg-white px-1.5 py-0.5 rounded border border-[#E4E7EA] font-mono text-[11px]">RETURNED</code> va <code className="bg-white px-1.5 py-0.5 rounded border border-[#E4E7EA] font-mono text-[11px]">REJECTED</code> holatlariga oʻtish mumkin.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: SUBMITTED Status Action Rail (Equal Height) */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-6">
        <div className="space-y-5">
          <div className="border-b border-[#E4E7EA] pb-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#5A646D] block">
              Harakatlar — Status: SUBMITTED
            </span>
            <h3 className="text-base font-bold text-[#1A1F24] mt-0.5">
              {canWork ? 'Ijroga qabul qilish' : 'Koʻrish rejimi'}
            </h3>
          </div>

          {!canWork && (
            <div className="p-3 bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-xs text-[#5A646D] leading-relaxed">
              Ariza hali ijroga olinmagan. Uni koʻrib chiqishga olish ijrochi tashkilot
              xodimi vakolatida.
            </div>
          )}

          <div className={`space-y-3 ${canWork ? '' : 'hidden'}`}>
            {/* Active 1: Take Into Work */}
            <button
              type="button"
              onClick={onTakeIntoWork}
              className="w-full bg-[#2E7D4F] hover:bg-[#23653F] active:bg-[#1E5635] text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-between gap-3 shadow-md transition-all cursor-pointer group"
            >
              <div className="text-left leading-tight min-w-0 flex-1">
                <div className="text-sm font-bold truncate">Koʻrib chiqishga olish</div>
                <div className="text-[11px] font-normal text-white/85 truncate">Принять в работу</div>
              </div>
              <ArrowRight className="w-5 h-5 shrink-0 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Active 2: Return to Applicant */}
            <button
              type="button"
              onClick={onReturnToApplicant}
              className="w-full bg-white border border-[#767F87] hover:bg-gray-50 text-[#1A1F24] font-bold py-3 px-4 rounded-xl flex items-center gap-3 shadow-2xs transition-all cursor-pointer group"
            >
              <RotateCcw className="w-4 h-4 shrink-0 text-[#B45309]" />
              <div className="text-left leading-tight min-w-0 flex-1">
                <div className="text-sm font-bold truncate">Arizachiga qaytarish</div>
                <div className="text-[11px] font-normal text-[#5A646D] truncate">Вернуть заявителю</div>
              </div>
            </button>

            {/* Disabled 1: Send for Approval */}
            <button
              type="button"
              disabled
              className="w-full bg-[#F8F9FA] border border-[#E4E7EA] text-[#9AA3AB] font-bold py-2.5 px-4 rounded-xl flex items-center gap-3 cursor-not-allowed opacity-75"
            >
              <Send className="w-4 h-4 shrink-0 text-[#9AA3AB]" />
              <div className="text-left leading-tight min-w-0 flex-1">
                <div className="text-xs font-bold truncate">Tasdiqlashga yuborish</div>
                <div className="text-[10px] text-[#9AA3AB] truncate">Отправить на утверждение</div>
              </div>
            </button>

            {/* Disabled 2: Request Info */}
            <button
              type="button"
              disabled
              className="w-full bg-[#F8F9FA] border border-[#E4E7EA] text-[#9AA3AB] font-bold py-2.5 px-4 rounded-xl flex items-center gap-3 cursor-not-allowed opacity-75"
            >
              <HelpCircle className="w-4 h-4 shrink-0 text-[#9AA3AB]" />
              <div className="text-left leading-tight min-w-0 flex-1">
                <div className="text-xs font-bold truncate">Maʼlumot soʻrash</div>
                <div className="text-[10px] text-[#9AA3AB] truncate">Запросить информацию</div>
              </div>
            </button>
          </div>
        </div>

        {/* Explanatory Footnote */}
        <div className="pt-4 border-t border-[#E4E7EA] text-xs text-[#5A646D] leading-relaxed">
          Ikki harakat nofaol holatda — bu bir xil rang bilan emas, soʻz bilan tushuntirilgan.{' '}
          <strong className="text-[#1A1F24]">«Tasdiqlashga yuborish»</strong> va{' '}
          <strong className="text-[#1A1F24]">«Maʼlumot soʻrash»</strong> tugmalari ariza{' '}
          <code className="bg-[#F8F9FA] px-1.5 py-0.5 rounded border border-[#E4E7EA] font-mono text-[11px]">SUBMITTED → IN_REVIEW</code> holatiga oʻtganidan soʻng, ya'ni xodim arizani oʻz zimmasiga olganidan keyin faollashadi.
        </div>
      </div>
    </div>
  );
};
