import React from 'react';
import { ArrowRight } from 'lucide-react';

export const HistoryTimelinePanel: React.FC = () => {
  const historyItems = [
    {
      id: 1,
      when: '22.07.2026, 10:12:04',
      fromStatus: 'Qoralama (Draft)',
      toStatus: 'Yuborildi',
      actor: 'Aziz Karimov',
      role: 'Arizachi (Jismoniy shaxs)',
      ip: '213.230.98.14',
      note: 'Ariza my.gov.uz portali orqali E-IMZO 5E:9A:C4:71 raqamli kalit bilan imzolandi va tizimga kelib tushdi.',
      dotColor: 'bg-[#2E7D4F] text-white',
    },
    {
      id: 2,
      when: '22.07.2026, 10:12:05',
      fromStatus: 'Yuborildi',
      toStatus: 'Avto-tekshiruvda',
      actor: 'Robot (Tizim avto-servis)',
      role: 'Tizim Avtomatik Integratsiyasi',
      ip: '127.0.0.1 (Internal BFF)',
      note: 'OneID, Solik.uz va Kadastr tizimlariga avtomatik integratsiya soʻrovlari yuborildi.',
      dotColor: 'bg-[#0369A1] text-white',
    },
    {
      id: 3,
      when: '22.07.2026, 10:13:00',
      fromStatus: 'Avto-tekshiruvda',
      toStatus: 'Ijrochiga biriktirildi',
      actor: 'Avto-marshrutizator Robot',
      role: 'Oʻrmon xoʻjaligi tizimi',
      ip: '127.0.0.1 (Internal BFF)',
      note: 'Boʻstonliq tumani Xumson oʻrmonchiligi boʻyicha masʼul xodim Dilnoza Abdullayevaga avtomatik biriktirildi.',
      dotColor: 'bg-[#2E7D4F] text-white',
    },
    {
      id: 4,
      when: '22.07.2026, 14:20:11',
      fromStatus: 'Ijrochiga biriktirildi',
      toStatus: 'Koʻrib chiqilmoqda',
      actor: 'Dilnoza Abdullayeva',
      role: 'Boʻstonliq DЎX Katta mutaxassisi',
      ip: '213.230.98.14',
      note: 'Hujjatlar va GIS kontur kesishuvlari oʻrganildi. Ijobiy xulosa loyihasi shakllantirildi.',
      dotColor: 'bg-[#B45309] text-white',
    },
  ];

  return (
    <section id="s-history" className="bg-white border border-[#E4E7EA] rounded-2xl shadow-xs font-sans overflow-hidden">
      {/* Panel Header */}
      <div className="p-6 border-b border-[#E4E7EA] flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-[#1A1F24]">6. Statuslar tarixi va audit lojasi</h2>
            <span className="text-xs font-semibold text-[#2E7D4F] bg-[#F0F7F1] px-2.5 py-0.5 rounded-full border border-[#D9EBDC]">
              4 ta harakat yozuvi
            </span>
          </div>
          <p className="text-xs text-[#5A646D] mt-0.5">Arizaning yaratilishidan hozirgacha boʻlgan barcha operatsiyalar va IP-manzillar auditi</p>
        </div>
      </div>

      {/* Panel Body */}
      <div className="p-6">
        <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E4E7EA]">
          {historyItems.map((item) => (
            <div key={item.id} className="relative space-y-1">
              {/* Timeline Dot */}
              <div
                className={`absolute -left-6 top-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ring-4 ring-white shadow-2xs ${item.dotColor}`}
              >
                {item.id}
              </div>

              {/* Event Content */}
              <div className="bg-white border border-[#E4E7EA] rounded-xl p-4 space-y-2 hover:border-[#2E7D4F] transition-all">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E4E7EA] pb-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#1A1F24]">
                    <span>{item.fromStatus}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#5A646D]" />
                    <span className="text-[#2E7D4F]">{item.toStatus}</span>
                  </div>
                  <span className="font-mono text-xs text-[#5A646D]">{item.when}</span>
                </div>

                <div className="text-xs text-[#1A1F24] font-semibold flex flex-wrap items-center gap-2">
                  <span>{item.actor}</span>
                  <span className="text-[#5A646D] font-normal">({item.role})</span>
                  <span className="ml-auto font-mono text-[11px] text-[#767F87]">IP: {item.ip}</span>
                </div>

                <p className="text-xs text-[#5A646D] bg-[#F8F9FA] p-2.5 rounded-lg border-l-2 border-l-[#2E7D4F] leading-relaxed">
                  {item.note}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
