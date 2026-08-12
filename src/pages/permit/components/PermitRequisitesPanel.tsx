import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export const PermitRequisitesPanel: React.FC = () => {
  return (
    <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs font-sans space-y-4">
      <div className="flex items-center justify-between border-b border-[#E4E7EA] pb-3">
        <h2 className="text-base font-bold text-[#1A1F24]">Hujjat Rekvizitlari (Реквизиты)</h2>
        <span className="text-xs text-[#5A646D]">
          VMQ 689-son qarori ilovasi · Maydon va GIS ID konturdan avto-olindi
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#1A1F24]">
        {/* Applicant */}
        <div className="md:col-span-2 space-y-1">
          <span className="text-[#5A646D] font-medium block">Arizachi — Yuridik shaxs:</span>
          <strong className="text-sm font-bold block text-[#1A1F24]">«Chorvador-Sardor» fermer xoʻjaligi</strong>
          <p className="text-[#5A646D] font-mono">
            STIR: <strong className="text-[#1A1F24]">305718842</strong> · Toshkent viloyati, Zangiota tumani, Nazarbek MFY, Bogʻishamol koʻchasi, 14
          </p>
        </div>

        {/* Director */}
        <div className="space-y-1">
          <span className="text-[#5A646D] font-medium block">Rahbar va imzolagich:</span>
          <strong className="text-sm font-bold block text-[#1A1F24]">Yuldoshev Rustam Normatovich</strong>
          <p className="text-[#5A646D] font-mono">
            JSHSHIR: <strong className="text-[#1A1F24]">31708860250017</strong>
          </p>
        </div>

        {/* Agency */}
        <div className="space-y-1">
          <span className="text-[#5A646D] font-medium block">Vakolatli organ:</span>
          <strong className="font-bold block text-[#1A1F24]">Toshkent viloyati davlat oʻrmon xoʻjaligi</strong>
          <p className="text-[#5A646D]">Oʻrmon xoʻjaligi agentligi, kod <span className="font-mono text-[#1A1F24]">ORG-14-021</span></p>
        </div>

        {/* Lesnichestvo */}
        <div className="space-y-1">
          <span className="text-[#5A646D] font-medium block">Oʻrmonchilik, aylanma, kvartal:</span>
          <strong className="font-bold block text-[#1A1F24]">Zangiota oʻrmonchiligi</strong>
          <p className="text-[#5A646D]">aylanma № 3 · kvartal (boʻlak) 14</p>
        </div>

        {/* Activity Type */}
        <div className="space-y-1">
          <span className="text-[#5A646D] font-medium block">Faoliyat turi:</span>
          <strong className="font-bold block text-[#2E7D4F] text-sm">Chorva mollarini boqish</strong>
          <p className="text-[#5A646D]">Выпас скота</p>
        </div>

        {/* Contour */}
        <div className="space-y-1">
          <span className="text-[#5A646D] font-medium block">Kontur va subkontur:</span>
          <strong className="font-mono font-bold block text-[#1A1F24]">KT-14-03-217 / 217-2</strong>
          <p className="text-[#5A646D]">kontur versiyasi 4, nashr etilgan 02.04.2026</p>
        </div>

        {/* Area */}
        <div className="space-y-1">
          <span className="text-[#5A646D] font-medium block">Avariya qilingan maydon:</span>
          <strong className="font-mono font-bold block text-sm text-[#123522]">42,6 ha</strong>
          <p className="text-[#5A646D]">GIS geometriyadan oʻlchandi</p>
        </div>

        {/* Usage period */}
        <div className="space-y-1">
          <span className="text-[#5A646D] font-medium block">Foydalanish davri:</span>
          <strong className="font-mono font-bold block text-[#1A1F24]">01.08.2026 — 31.10.2026</strong>
          <p className="text-[#5A646D]">92 kun, VMQ 689-son mavsumiy kalendar</p>
        </div>

        {/* Livestock count */}
        <div className="space-y-1">
          <span className="text-[#5A646D] font-medium block">Jami chorva soni:</span>
          <strong className="font-mono font-bold block text-[#1A1F24]">198 bosh</strong>
          <p className="text-[#5A646D]">4 ta guruh boʻyicha hisob-kitob pastda</p>
        </div>

        {/* Load SB */}
        <div className="space-y-1">
          <span className="text-[#5A646D] font-medium block">Haqiqiy yuklama:</span>
          <strong className="font-mono font-bold block text-[#15803D] text-sm">49,1 SB (shartli bosh)</strong>
          <p className="text-[#5A646D]">qolgan zaxira limit: 55,4 SB</p>
        </div>

        {/* Payment Status */}
        <div className="space-y-1">
          <span className="text-[#5A646D] font-medium block">Toʻlov holati:</span>
          <strong className="font-bold block text-[#15803D] flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" /> Toʻliq toʻlangan (Оплачено)
          </strong>
          <p className="text-[#5A646D]">26.07.2026, 100% oldindan toʻlov (VMQ 278-son)</p>
        </div>
      </div>
    </div>
  );
};
