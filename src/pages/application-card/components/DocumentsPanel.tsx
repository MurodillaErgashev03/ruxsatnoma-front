import React, { useState } from 'react';
import { FileText, Eye, Download, ShieldCheck } from 'lucide-react';
import { Button } from '../../../components/ui/button';

export const DocumentsPanel: React.FC = () => {
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);

  const docs = [
    {
      id: 1,
      name: 'Arizachining pasport skan nusxasi.pdf',
      size: '2.4 MB',
      date: '22.07.2026 10:12',
      type: 'PDF',
      signed: true,
    },
    {
      id: 2,
      title: 'Fermer xoʻjaligi guvohnomasi.pdf',
      name: 'Fermer_xoʻjaligi_guvohnoma_2026.pdf',
      size: '1.8 MB',
      date: '22.07.2026 10:12',
      type: 'PDF',
      signed: true,
    },
    {
      id: 3,
      name: 'Veterinariya maʼlumotnomasi (Chorva mollarini emlash va koʻrik).pdf',
      size: '3.1 MB',
      date: '22.07.2026 10:12',
      type: 'PDF',
      signed: true,
    },
    {
      id: 4,
      name: 'Kadastr yer uchastkasi xarita koʻchirmasi.pdf',
      size: '4.5 MB',
      date: '22.07.2026 10:12',
      type: 'PDF',
      signed: true,
    },
    {
      id: 5,
      name: 'E-IMZO raqamli imzo elektron kvitansiyasi.pkcs7',
      size: '14 KB',
      date: '22.07.2026 10:12',
      type: 'PKCS7',
      signed: true,
    },
    {
      id: 6,
      name: 'Avto-hisob kitob shakllangan protokoli.pdf',
      size: '890 KB',
      date: '22.07.2026 10:13',
      type: 'PDF',
      signed: true,
    },
  ];

  return (
    <section id="s-docs" className="bg-white border border-[#E4E7EA] rounded-2xl shadow-xs font-sans overflow-hidden">
      {/* Panel Header */}
      <div className="p-6 border-b border-[#E4E7EA] flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-[#1A1F24]">5. Ilova qilingan hujjatlar va fayllar</h2>
            <span className="text-xs font-semibold text-[#2E7D4F] bg-[#F0F7F1] px-2.5 py-0.5 rounded-full border border-[#D9EBDC]">
              6 ta fayl
            </span>
          </div>
          <p className="text-xs text-[#5A646D] mt-0.5">Arizaga biriktirilgan pasport, veterinariya xulosalari va E-IMZO fayllari</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          leftIcon={<Download className="w-4 h-4" />}
          onClick={() => alert('Barcha fayllar ZIP arxiv sifatida yuklanmoqda...')}
          className="cursor-pointer font-semibold text-xs"
        >
          Barcha fayllarni yuklab olish (ZIP)
        </Button>
      </div>

      {/* Panel Body */}
      <div className="p-6 space-y-3">
        {docs.map((doc) => (
          <div
            key={doc.id}
            className="p-4 border border-[#E4E7EA] rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-[#2E7D4F] transition-all bg-white hover:bg-gray-50/50"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-12 rounded bg-[#F8F9FA] border border-[#767F87] text-[#5A646D] font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                {doc.type}
              </div>
              <div className="space-y-0.5">
                <span className="text-sm font-bold text-[#1A1F24] block">{doc.name}</span>
                <span className="text-xs text-[#5A646D]">
                  Hajmi: <strong className="font-mono">{doc.size}</strong> · Yuklangan: <span className="font-mono">{doc.date}</span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#15803D] bg-[#DCFCE7] px-2.5 py-1 rounded border border-[#86EFAC] shrink-0">
                <ShieldCheck className="w-3.5 h-3.5" /> E-IMZO tasdiqlangan
              </span>
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Eye className="w-4 h-4" />}
                onClick={() => setSelectedDoc(doc.name)}
                className="cursor-pointer"
              >
                Koʻrish
              </Button>
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Download className="w-4 h-4" />}
                onClick={() => alert(`${doc.name} yuklab olinmoqda...`)}
                className="cursor-pointer"
              >
                Yuklash
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Simple Document Viewer Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-base text-[#1A1F24] flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#2E7D4F]" /> Hujjatni koʻrish: {selectedDoc}
              </h3>
              <button
                onClick={() => setSelectedDoc(null)}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="bg-[#F8F9FA] border rounded-xl p-8 text-center space-y-3">
              <FileText className="w-16 h-16 text-[#2E7D4F] mx-auto" />
              <div className="font-bold text-sm text-[#1A1F24]">{selectedDoc}</div>
              <p className="text-xs text-[#5A646D] max-w-md mx-auto">
                Hujjat elektron koʻrish tizimida ochildi. Fayl raqamli elektron imzo (E-IMZO) bilan tasdiqlangan va oʻzgartirishlardan himoyalangan.
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setSelectedDoc(null)}>
                Yopish
              </Button>
              <Button variant="primary" onClick={() => alert('Fayl yuklandi')}>
                Rasmiy yuklab olish
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
