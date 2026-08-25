import React, { useState } from 'react';
import { 
  FileText, 
  UploadCloud, 
  CheckCircle2, 
  Trash2, 
  Eye, 
  Paperclip,
  FileCheck
} from 'lucide-react';

export interface UploadedFileItem {
  id: string;
  name: string;
  size: string;
  type: string;
  uploadDate: string;
  category: string;
}

export interface Step4DocumentsProps {
  files: UploadedFileItem[];
  onAddFile: (file: UploadedFileItem) => void;
  onRemoveFile: (id: string) => void;
}

export const Step4Documents: React.FC<Step4DocumentsProps> = ({
  files,
  onAddFile,
  onRemoveFile,
}) => {
  const [dragActive, setDragActive] = useState(false);

  const handleSimulatedUpload = (category: string) => {
    const newFile: UploadedFileItem = {
      id: `doc_${Date.now()}`,
      name: `${category.toLowerCase().replace(/\s+/g, '_')}_tasdiq.pdf`,
      size: `${(Math.random() * 2 + 0.5).toFixed(1)} MB`,
      type: 'PDF',
      uploadDate: new Date().toLocaleDateString('uz-UZ'),
      category: category,
    };
    onAddFile(newFile);
  };

  const hasMandatoryVetDoc = files.some(
    (f) => f.category === 'Veterinariya ma’lumotnomasi' || f.name.includes('vet')
  );

  return (
    <div className="space-y-6 font-sans">
      {/* 1. Header Guide */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-5 shadow-2xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F0F7F1] border border-[#2E7D4F]/20 flex items-center justify-center text-[#2E7D4F]">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#1A1F24]">
                4-bosqich: Ilova qilinadigan hujjatlar va ma’lumotnomalar
              </h2>
              <p className="text-xs text-[#5A646D]">
                VMQ 689 va idoralararo talablar bo‘yicha majburiy veterinariya xulosasi va vakillik hujjatlari
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F8F9FA] text-[#767F87] text-xs font-semibold border border-[#E4E7EA]">
            <Paperclip className="w-3.5 h-3.5" />
            <span>Yuklangan: {files.length} ta hujjat</span>
          </div>
        </div>
      </div>

      {/* 2. Mandatory & Optional Document Slots */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Slot 1: Veterinary Certificate (Mandatory) */}
        <div className="p-5 bg-white rounded-2xl border-2 border-[#2E7D4F]/30 shadow-2xs relative space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#DCFCE7] text-[#15803D] flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-bold text-[#1A1F24]">Veterinariya ma’lumotnomasi</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FEF2F2] text-[#B91C1C] border border-[#FCA5A5]">
                    Majburiy
                  </span>
                </div>
                <p className="text-[11px] text-[#5A646D] mt-0.5">Chorva mollarining emlanganligi va sog‘lomligi haqida dalolatnoma</p>
              </div>
            </div>
          </div>

          <div className="p-3 bg-[#F0F7F1] rounded-xl border border-[#86EFAC] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0" />
              <span className="font-semibold text-[#15803D]">
                {hasMandatoryVetDoc ? 'Hujjat biriktirilgan' : 'Veterinariya AT orqali avto-bog‘langan'}
              </span>
            </div>
            <button
              onClick={() => handleSimulatedUpload('Veterinariya ma’lumotnomasi')}
              className="text-[#2E7D4F] font-bold hover:underline cursor-pointer text-xs"
            >
              Yangilash
            </button>
          </div>
        </div>

        {/* Slot 2: Representative Power of Attorney (Optional) */}
        <div className="p-5 bg-white rounded-2xl border border-[#E4E7EA] shadow-2xs space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#F8F9FA] text-[#5A646D] flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-bold text-[#1A1F24]">Ishonchnoma (Vakillik hujjati)</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#F8F9FA] text-[#767F87] border border-[#E4E7EA]">
                    Ixtiyoriy
                  </span>
                </div>
                <p className="text-[11px] text-[#5A646D] mt-0.5">Yuridik shaxs yoki vakil nomidan topshirilayotgan bo‘lsa</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-[#F8F9FA] rounded-xl border border-[#E4E7EA] text-xs">
            <span className="text-[#767F87]">Hujjat biriktirilmagan</span>
            <button
              onClick={() => handleSimulatedUpload('Ishonchnoma')}
              className="text-[#2E7D4F] font-bold hover:underline cursor-pointer"
            >
              + Fayl yuklash
            </button>
          </div>
        </div>
      </div>

      {/* 3. Drag and Drop File Upload Area */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          handleSimulatedUpload('Qo‘shimcha ilova');
        }}
        className={`bg-white border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
          dragActive
            ? 'border-[#2E7D4F] bg-[#F0F7F1]'
            : 'border-[#CAD0D6] hover:border-[#2E7D4F]/50 hover:bg-[#F8F9FA]'
        }`}
      >
        <div className="max-w-md mx-auto space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#F0F7F1] text-[#2E7D4F] flex items-center justify-center mx-auto shadow-2xs">
            <UploadCloud className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#1A1F24]">Fayllarni shu yerga sudrab olib keling yoki tanlang</h4>
            <p className="text-xs text-[#767F87] mt-1">
              Qo‘llab-quvvatlanadigan formatlar: <strong>PDF, JPG, PNG, DOCX</strong> (Maksimal hajm: 10 MB gacha)
            </p>
          </div>
          <div>
            <button
              type="button"
              onClick={() => handleSimulatedUpload('Qo‘shimcha ilova')}
              className="px-4 py-2 rounded-xl bg-[#2E7D4F] text-white text-xs font-bold hover:bg-[#23653F] transition-all cursor-pointer shadow-xs"
            >
              Faylni tanlash (Kompyuterdan)
            </button>
          </div>
        </div>
      </div>

      {/* 4. Uploaded Files List */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-2xs">
        <h3 className="text-sm font-bold text-[#1A1F24] mb-4 flex items-center gap-2">
          <Paperclip className="w-4 h-4 text-[#2E7D4F]" />
          Yuklangan fayllar ro‘yxati ({files.length})
        </h3>

        {files.length === 0 ? (
          <div className="text-center py-6 text-xs text-[#767F87]">
            Hozircha hech qanday fayl ilova qilinmagan.
          </div>
        ) : (
          <div className="divide-y divide-[#F1F3F5]">
            {files.map((item) => (
              <div key={item.id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-[#F0F7F1] text-[#2E7D4F] flex items-center justify-center font-bold text-xs shrink-0">
                    {item.type}
                  </div>
                  <div className="min-w-0">
                    <span className="font-bold text-xs text-[#1A1F24] truncate block">
                      {item.name}
                    </span>
                    <span className="text-[11px] text-[#767F87]">
                      {item.category} • {item.size} • {item.uploadDate}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="hidden sm:inline text-[11px] font-bold text-[#15803D] bg-[#DCFCE7] px-2.5 py-0.5 rounded-full">
                    Tekshirildi (Antivirus)
                  </span>
                  <button
                    onClick={() => alert(`Fayl ochilmoqda: ${item.name}`)}
                    className="p-2 text-[#5A646D] hover:text-[#1A1F24] hover:bg-[#F1F3F5] rounded-lg cursor-pointer"
                    title="Ko‘rish"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onRemoveFile(item.id)}
                    className="p-2 text-[#B91C1C] hover:bg-[#FEF2F2] rounded-lg cursor-pointer"
                    title="O‘chirish"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
