import React, { useState } from 'react';
import { PauseCircle, XCircle, RotateCcw, AlertTriangle, Info, ShieldCheck } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Modal } from '../../../components/ui/Overlay';
import { hasRight } from '../../../lib/permissions';

export interface PermitLifecyclePanelProps {
  userRole?: string;
  permitNo?: string;
}

type PermitState = 'active' | 'suspended' | 'revoked';

const STATE_LABELS: Record<PermitState, string> = {
  active: 'Amal qilmoqda',
  suspended: 'Vaqtincha toʻxtatilgan',
  revoked: 'Bekor qilingan',
};

const STATE_STYLES: Record<PermitState, string> = {
  active: 'bg-[#F0F7F1] text-[#15803D] border-[#D9EBDC]',
  suspended: 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]',
  revoked: 'bg-[#FEF2F2] text-[#B91C1C] border-[#FCA5A5]',
};

/**
 * Suspending and revoking a permit — the fourth duty the TZ gives the head of
 * the executing organisation, alongside deciding, signing and approving. Both
 * acts are Т on the permit, so no other role sees the controls.
 */
export const PermitLifecyclePanel: React.FC<PermitLifecyclePanelProps> = ({
  userRole = '',
  permitNo = 'RX-2026-0089',
}) => {
  const canChangeState = hasRight(userRole, 'permit', 'approve');

  const [state, setState] = useState<PermitState>('active');
  const [pendingAction, setPendingAction] = useState<'suspend' | 'revoke' | 'restore' | null>(null);
  const [reason, setReason] = useState('');
  const [error, setError] = useState<string | null>(null);

  const history = [
    { at: '25.07.2026, 09:47', text: 'Ruxsatnoma berildi va ERI bilan imzolandi', by: 'Mirzayev D.A. (rahbar)' },
    { at: '24.07.2026, 15:08', text: 'Ijobiy xulosa qabul qilindi', by: 'Rahimov J.U. (mutaxassis)' },
  ];

  const confirm = () => {
    if (!reason.trim()) {
      setError('Sabab koʻrsatilishi shart — u ruxsatnoma tarixiga va audit jurnaliga yoziladi.');
      return;
    }
    if (pendingAction === 'suspend') setState('suspended');
    if (pendingAction === 'revoke') setState('revoked');
    if (pendingAction === 'restore') setState('active');
    setPendingAction(null);
    setReason('');
    setError(null);
  };

  return (
    <div className="bg-white border border-[#E4E7EA] rounded-2xl p-5 shadow-xs space-y-4 font-sans">
      <div className="flex items-center justify-between gap-3 border-b border-[#E4E7EA] pb-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#2E7D4F]" />
          <div>
            <h3 className="text-sm font-bold text-[#1A1F24]">Ruxsatnoma holati</h3>
            <p className="text-[11px] text-[#767F87] font-mono">{permitNo}</p>
          </div>
        </div>
        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${STATE_STYLES[state]}`}>
          {STATE_LABELS[state]}
        </span>
      </div>

      <div className="space-y-1.5">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#5A646D] block">Holat tarixi</span>
        {history.map((h) => (
          <div key={h.at} className="p-2.5 bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-xs">
            <div className="text-[#1A1F24] font-semibold">{h.text}</div>
            <div className="text-[11px] text-[#767F87] font-mono mt-0.5">{h.at} · {h.by}</div>
          </div>
        ))}
      </div>

      {canChangeState ? (
        <div className="pt-1 border-t border-[#E4E7EA] space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#5A646D] block">
            Rahbar vakolati
          </span>

          {state === 'active' && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                fullWidth
                leftIcon={<PauseCircle className="w-4 h-4" />}
                onClick={() => setPendingAction('suspend')}
                className="border-[#B45309] text-[#B45309] hover:bg-[#FFFBEB] font-bold"
              >
                Toʻxtatib turish
              </Button>
              <Button
                variant="outline"
                size="sm"
                fullWidth
                leftIcon={<XCircle className="w-4 h-4" />}
                onClick={() => setPendingAction('revoke')}
                className="border-[#B91C1C] text-[#B91C1C] hover:bg-[#FEF2F2] font-bold"
              >
                Bekor qilish
              </Button>
            </div>
          )}

          {state === 'suspended' && (
            <div className="flex items-center gap-2">
              <Button
                variant="primary"
                size="sm"
                fullWidth
                leftIcon={<RotateCcw className="w-4 h-4" />}
                onClick={() => setPendingAction('restore')}
                className="bg-[#2E7D4F] hover:bg-[#23653F] text-white font-bold"
              >
                Amalini tiklash
              </Button>
              <Button
                variant="outline"
                size="sm"
                fullWidth
                leftIcon={<XCircle className="w-4 h-4" />}
                onClick={() => setPendingAction('revoke')}
                className="border-[#B91C1C] text-[#B91C1C] hover:bg-[#FEF2F2] font-bold"
              >
                Bekor qilish
              </Button>
            </div>
          )}

          {state === 'revoked' && (
            <div className="p-3 bg-[#FEF2F2] border border-[#FCA5A5] rounded-xl text-xs text-[#B91C1C]">
              Ruxsatnoma bekor qilingan. Bekor qilingan hujjat qayta tiklanmaydi —
              arizachi yangi ariza topshirishi kerak.
            </div>
          )}
        </div>
      ) : (
        <div className="p-3 bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-[11px] text-[#5A646D] flex items-start gap-2">
          <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#2E7D4F]" />
          <span>
            Ruxsatnomani toʻxtatib turish va bekor qilish ijrochi tashkilot rahbari vakolatida.
          </span>
        </div>
      )}

      <Modal
        isOpen={!!pendingAction}
        onClose={() => { setPendingAction(null); setError(null); }}
        title={
          pendingAction === 'suspend'
            ? 'Ruxsatnomani toʻxtatib turish'
            : pendingAction === 'revoke'
            ? 'Ruxsatnomani bekor qilish'
            : 'Ruxsatnoma amalini tiklash'
        }
        subtitle={permitNo}
        footer={
          <div className="flex items-center justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => { setPendingAction(null); setError(null); }}>
              Bekor qilish
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={confirm}
              className={
                pendingAction === 'revoke'
                  ? 'bg-[#B91C1C] hover:bg-[#991B1B] text-white font-bold'
                  : 'bg-[#2E7D4F] hover:bg-[#23653F] text-white font-bold'
              }
            >
              Tasdiqlash
            </Button>
          </div>
        }
      >
        <div className="space-y-3 py-1 text-xs">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 font-semibold flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" /> {error}
            </div>
          )}

          {pendingAction === 'revoke' && (
            <div className="p-3 bg-[#FEF2F2] border border-[#FCA5A5] rounded-xl text-[#B91C1C]">
              Bekor qilish qaytarilmaydi. Arizachiga rasmiy bildirishnoma yuboriladi va
              kontur bandligi boʻshatiladi.
            </div>
          )}

          <div className="space-y-1">
            <label className="font-bold text-[#1A1F24]">Sabab va huquqiy asos:</label>
            <textarea
              rows={4}
              value={reason}
              onChange={(e) => { setReason(e.target.value); setError(null); }}
              placeholder="Masalan: inspeksiya dalolatnomasi ACT-2026-0087 boʻyicha kontur chegarasidan chiqish aniqlandi..."
              className="w-full bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl text-xs p-3 text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
            />
          </div>

          <div className="p-3 bg-[#F0F7F1] border border-[#D9EBDC] rounded-xl text-[#2E7D4F]">
            Qaror ERI bilan muhrlanadi, ruxsatnoma tarixiga yoziladi va audit jurnaliga tushadi.
          </div>
        </div>
      </Modal>
    </div>
  );
};
