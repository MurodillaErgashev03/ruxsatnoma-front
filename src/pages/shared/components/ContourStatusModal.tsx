import React, { useState, useEffect } from 'react';
import {
  X,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  FileCheck2,
  UploadCloud,
  History,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Info,
  Archive,
  Send,
  Check,
} from 'lucide-react';
import { Button } from '../../../components/ui/button';
import type { ContourStatus } from './ContourFormModal';

export interface ContourStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (contourId: string, newStatus: ContourStatus, docId?: string, docName?: string, note?: string) => void;
  contour: {
    id: string;
    name: string;
    leskhoz: string;
    status: ContourStatus;
    approvalDocId?: string;
    approvalDocName?: string;
    areaHa: number;
    maxSB: number;
  } | null;
}

const LIFECYCLE_STEPS: { key: ContourStatus; label: string; desc: string; order: number }[] = [
  { key: 'draft', label: 'Qoralama', desc: 'Dastlabki chizma va parametrlar', order: 1 },
  { key: 'review', label: 'Koʻrib chiqishda', desc: 'Mutaxassis va rahbar ekspertizasi', order: 2 },
  { key: 'approved', label: 'Tasdiqlangan', desc: 'Rahbar tomonidan maʼqullangan', order: 3 },
  { key: 'published', label: 'Eʼlon qilingan', desc: 'Arizalar uchun ochiq va faol', order: 4 },
  { key: 'archived', label: 'Arxivlangan', desc: 'Amal qilish muddati tugagan', order: 5 },
];

export const ContourStatusModal: React.FC<ContourStatusModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  contour,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<ContourStatus>('review');
  const [approvalDocId, setApprovalDocId] = useState('');
  const [approvalDocFile, setApprovalDocFile] = useState<string | null>(null);
  const [transitionNote, setTransitionNote] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (contour) {
      // Suggest the natural next status in lifecycle
      let nextStatus: ContourStatus = 'review';
      if (contour.status === 'draft') nextStatus = 'review';
      else if (contour.status === 'review') nextStatus = 'approved';
      else if (contour.status === 'approved') nextStatus = 'published';
      else if (contour.status === 'published') nextStatus = 'archived';
      else if (contour.status === 'archived') nextStatus = 'review';

      setSelectedStatus(nextStatus);
      setApprovalDocId(contour.approvalDocId && contour.approvalDocId !== '—' ? contour.approvalDocId : '');
      setApprovalDocFile(contour.approvalDocName || null);
      setTransitionNote('');
      setErrorMsg(null);
    }
  }, [contour, isOpen]);

  if (!isOpen || !contour) return null;

  const currentStep = LIFECYCLE_STEPS.find((s) => s.key === contour.status) || LIFECYCLE_STEPS[0];
  const targetStep = LIFECYCLE_STEPS.find((s) => s.key === selectedStatus) || LIFECYCLE_STEPS[1];

  const handleSimulateUpload = () => {
    const fileName = `Qaror_${contour.id}_Tasdiqlash.pdf`;
    setApprovalDocFile(fileName);
    if (!approvalDocId) {
      setApprovalDocId(`TAS-2026-${Math.floor(100 + Math.random() * 900)}`);
    }
    setErrorMsg(null);
  };

  const handleSave = () => {
    // TZ Scenario C17, item 17.3 requirement:
    if (selectedStatus === 'published' && (!approvalDocId.trim() && !approvalDocFile)) {
      setErrorMsg('TZ 17.3-bandi qatʼiy talabi: Tasdiqlovchi hujjat (approval_doc_id yoki fayl) biriktirilmasdan konturni "Eʼlon qilingan (Published)" holatiga oʻtkazish taqiqlanadi!');
      return;
    }

    onConfirm(contour.id, selectedStatus, approvalDocId.trim() || undefined, approvalDocFile || undefined, transitionNote.trim() || undefined);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 font-sans">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl z-10 overflow-hidden animate-in zoom-in-95 duration-200 border border-[#E4E7EA] flex flex-col max-h-[92vh]"
        role="dialog"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#E4E7EA] bg-[#F8F9FA]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F0F7F1] text-[#2E7D4F] flex items-center justify-center border border-[#D9EBDC]">
              <History className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-[#1A1F24]">
                  Kontur Hayotiy Siklini Oʻzgartirish
                </h3>
                <span className="text-[11px] font-mono font-bold bg-[#E0F2FE] text-[#0369A1] px-2 py-0.5 rounded border border-[#BAE6FD]">
                  TZ 09 / С17
                </span>
              </div>
              <p className="text-xs text-[#5A646D] mt-0.5">
                {contour.id} · {contour.name} ({contour.leskhoz})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#767F87] hover:text-[#1A1F24] hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex-1 text-xs text-[#1A1F24] space-y-5">
          {/* Visual Lifecycle Stepper */}
          <div className="bg-[#F8F9FA] border border-[#E4E7EA] rounded-2xl p-4 space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#767F87] block">
              Hayotiy sikl bosqichlari (Draft → Review → Approved → Published → Archived)
            </span>

            <div className="grid grid-cols-5 gap-1.5 text-center">
              {LIFECYCLE_STEPS.map((step) => {
                const isCurrent = step.key === contour.status;
                const isTarget = step.key === selectedStatus;
                const isPast = step.order < currentStep.order;

                return (
                  <div
                    key={step.key}
                    onClick={() => setSelectedStatus(step.key)}
                    className={`p-2 rounded-xl border text-xs cursor-pointer transition-all ${
                      isTarget
                        ? 'bg-[#2E7D4F] text-white border-[#2E7D4F] shadow-xs font-bold'
                        : isCurrent
                        ? 'bg-[#1A1F24] text-white border-[#1A1F24] font-bold'
                        : isPast
                        ? 'bg-[#F0F7F1] text-[#2E7D4F] border-[#D9EBDC] font-semibold'
                        : 'bg-white text-[#5A646D] border-[#E4E7EA] hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1 mb-1">
                      {isCurrent ? (
                        <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping" />
                      ) : isPast ? (
                        <Check className="w-3 h-3 text-[#2E7D4F]" />
                      ) : null}
                      <span className="text-[10px] font-mono">0{step.order}</span>
                    </div>
                    <div className="truncate text-[11px]">{step.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Transition Action Cards */}
          <div className="space-y-3">
            <label className="font-bold text-xs text-[#1A1F24] block">
              Yangi Statusni Tanlang:
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {LIFECYCLE_STEPS.map((s) => {
                const isSelected = selectedStatus === s.key;
                const isCurrent = contour.status === s.key;

                return (
                  <label
                    key={s.key}
                    onClick={() => setSelectedStatus(s.key)}
                    className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#F0F7F1] border-[#2E7D4F] ring-1 ring-[#2E7D4F]'
                        : 'bg-white border-[#E4E7EA] hover:bg-[#F8F9FA]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="target_status"
                      checked={isSelected}
                      onChange={() => setSelectedStatus(s.key)}
                      className="mt-0.5 accent-[#2E7D4F]"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-[#1A1F24]">{s.label}</span>
                        {isCurrent && (
                          <span className="text-[10px] bg-gray-200 text-[#1A1F24] font-bold px-1.5 py-0.2 rounded">
                            Hozirgi
                          </span>
                        )}
                        {s.key === 'published' && (
                          <span className="text-[10px] bg-[#D9EBDC] text-[#2E7D4F] font-bold px-1.5 py-0.2 rounded">
                            Arizalar uchun
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#5A646D] mt-0.5">{s.desc}</p>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Mandatory Approval Document Box if moving to Published */}
          {selectedStatus === 'published' && (
            <div className="p-4 bg-[#FFFBEB] border border-[#FDE68A] rounded-2xl space-y-3 animate-in fade-in duration-200">
              <div className="flex items-start gap-2 text-[#B45309]">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-xs">
                    Tasdiqlovchi Hujjat Talabi (TZ 17.3-bandi):
                  </span>
                  <p className="text-[11px] text-[#92400E] mt-0.5">
                    Konturni 'Published' holatiga oʻtkazish faqat rasmiy tasdiqlovchi hujjat (Agentlik yoki Hokimlik qarori) asosida amalga oshiriladi.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block font-semibold text-[#92400E] mb-1">
                    Hujjat Raqami (approval_doc_id) *
                  </label>
                  <input
                    type="text"
                    value={approvalDocId}
                    onChange={(e) => {
                      setApprovalDocId(e.target.value);
                      setErrorMsg(null);
                    }}
                    placeholder="Masalan: TAS-2026-118"
                    className="w-full bg-white border border-[#FDE68A] rounded-xl px-3 py-2 text-xs font-mono font-bold text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#92400E] mb-1">
                    Tasdiqlovchi Fayl (PDF) *
                  </label>
                  {approvalDocFile ? (
                    <div className="flex items-center justify-between p-2 bg-white border border-[#D9EBDC] rounded-xl text-xs">
                      <span className="font-semibold text-[#2E7D4F] truncate max-w-[170px]">
                        {approvalDocFile}
                      </span>
                      <button
                        type="button"
                        onClick={() => setApprovalDocFile(null)}
                        className="text-[#B91C1C] hover:underline font-bold text-[11px]"
                      >
                        Oʻchirish
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSimulateUpload}
                      className="w-full py-2 px-3 rounded-xl border border-dashed border-[#B45309] bg-white text-[#B45309] font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#FFFBEB] transition-colors cursor-pointer"
                    >
                      <UploadCloud className="w-4 h-4" /> PDF Hujjat Yuklash
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Transition Audit Note */}
          <div>
            <label className="block font-semibold text-[#5A646D] mb-1">
              Oʻzgartirish Izohi / Asos (Audit Jurnali uchun)
            </label>
            <textarea
              rows={2}
              value={transitionNote}
              onChange={(e) => setTransitionNote(e.target.value)}
              placeholder="Holatni oʻzgartirish sababi yoki xulosa qisqacha mazmuni..."
              className="w-full bg-[#F8F9FA] border border-[#E4E7EA] rounded-xl p-2.5 text-xs text-[#1A1F24] focus:outline-none focus:border-[#2E7D4F]"
            />
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="p-3 bg-[#FEF2F2] border border-[#FCA5A5] rounded-xl flex items-start gap-2 text-[#991B1B]">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Impact Info */}
          <div className="p-3 bg-[#F0F7F1] border border-[#D9EBDC] rounded-xl text-[#123522] space-y-1">
            <div className="flex items-center gap-1.5 font-bold">
              <Sparkles className="w-4 h-4 text-[#2E7D4F]" />
              <span>Oqibatlar (TZ 09-boʻlim):</span>
            </div>
            <p className="text-[#5A646D]">
              {selectedStatus === 'published'
                ? 'Kontur faollashadi, meʼyor kiritish imkoni ochiladi va arizachilar portali reyestrida koʻrinadi.'
                : selectedStatus === 'archived'
                ? 'Kontur arxivlanadi, yangi arizalar qabul qilinmaydi. Avval berilgan ruxsatnomalar saqlanadi (TZ 17.4).'
                : 'Kontur navbatdagi ekspertiza va tasdiqlash bosqichiga yoʻnaltiriladi.'}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F8F9FA] border-t border-[#E4E7EA] flex items-center justify-between gap-3">
          <Button variant="outline" size="sm" onClick={onClose}>
            Bekor qilish
          </Button>

          <Button
            variant="primary"
            size="sm"
            leftIcon={<CheckCircle2 className="w-4 h-4" />}
            onClick={handleSave}
            className="bg-[#2E7D4F] hover:bg-[#23653F] text-white font-bold"
          >
            Holatni Saqlash ({targetStep.label})
          </Button>
        </div>
      </div>
    </div>
  );
};
