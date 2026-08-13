import React from 'react';
import { CheckSquare, UserPlus, HelpCircle, Download, RotateCcw } from 'lucide-react';
import { Button } from '../../../components/ui/button';

export interface WorklistBulkActionBarProps {
  selectedCount: number;
  onClearSelection: () => void;
  onAcceptSelected?: () => void;
  onAssignExecutor?: () => void;
  onRequestInfo?: () => void;
  onExportSelected?: () => void;
  onReturnSelected?: () => void;
  /**
   * Monitoring roles (central apparatus, management, prosecutor) hold К and Э on
   * applications — they may export a selection but never act on it (TZ appendix 4).
   */
  isReadOnly?: boolean;
}

export const WorklistBulkActionBar: React.FC<WorklistBulkActionBarProps> = ({
  selectedCount,
  onClearSelection,
  onAcceptSelected,
  onAssignExecutor,
  onRequestInfo,
  onExportSelected,
  onReturnSelected,
  isReadOnly = false,
}) => {
  if (selectedCount === 0) return null;

  return (
    <div className="bg-[#F0F7F1] border border-[#7FB98A] rounded-t-2xl p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs font-sans shadow-xs">
      <div className="flex items-center gap-3">
        <span className="font-extrabold text-[#123522] flex items-center gap-1.5 text-sm">
          <CheckSquare className="w-4 h-4 text-[#2E7D4F]" /> Tanlangan: {selectedCount} ta
        </span>
        <button
          type="button"
          onClick={onClearSelection}
          className="text-[#5A646D] hover:text-[#1A1F24] underline cursor-pointer font-medium"
        >
          Belgilashni bekor qilish
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        {!isReadOnly && (
          <>
            <Button
              variant="primary"
              size="sm"
              onClick={onAcceptSelected || (() => alert(`${selectedCount} ta ariza ishga qabul qilindi!`))}
              className="bg-[#2E7D4F] hover:bg-[#23653F] text-white text-xs font-bold h-8"
            >
              Ishga qabul qilish
            </Button>

            <Button
              variant="outline"
              size="sm"
              leftIcon={<UserPlus className="w-3.5 h-3.5" />}
              onClick={onAssignExecutor || (() => alert('Ijrochi tayinlash dialogi'))}
              className="border-[#767F87] text-[#1A1F24] text-xs font-bold h-8 bg-white"
            >
              Ijrochi tayinlash
            </Button>

            <Button
              variant="outline"
              size="sm"
              leftIcon={<HelpCircle className="w-3.5 h-3.5" />}
              onClick={onRequestInfo || (() => alert('Maʼlumot soʻrash yuborildi!'))}
              className="border-[#767F87] text-[#1A1F24] text-xs font-bold h-8 bg-white"
            >
              Maʼlumot soʻrash
            </Button>
          </>
        )}

        <Button
          variant="outline"
          size="sm"
          leftIcon={<Download className="w-3.5 h-3.5" />}
          onClick={onExportSelected || (() => alert('Tanlanganlar XLSX faylga yuklandi!'))}
          className="border-[#767F87] text-[#1A1F24] text-xs font-bold h-8 bg-white"
        >
          XLSX
        </Button>

        {!isReadOnly && (
          <Button
            variant="danger"
            size="sm"
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
            onClick={onReturnSelected || (() => alert('Arizachiga qaytarildi!'))}
            className="border-[#B91C1C] text-[#B91C1C] hover:bg-[#FEE2E2] text-xs font-bold h-8 bg-white"
          >
            Arizachiga qaytarish
          </Button>
        )}
      </div>
    </div>
  );
};
