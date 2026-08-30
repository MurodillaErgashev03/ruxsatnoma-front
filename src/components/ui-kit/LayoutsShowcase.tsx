import React, { useState } from 'react';
import { CabinetLayout } from '../layouts/CabinetLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { StatusBadge } from '../ui/StatusBadge';
import { Button } from '../ui/button';
import { FileText, Download, CheckCircle, Clock } from 'lucide-react';

export const LayoutsShowcase: React.FC = () => {
  const [activeLayout, setActiveLayout] = useState<'cabinet' | 'auth'>('cabinet');

  return (
    <div className="space-y-6">
      {/* Switcher Header */}
      <div className="bg-white border border-[#E4E7EA] p-4 rounded-xl shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-[#1A1F24]">Karkaslar (Layout Shells - `cabinet.html` & `auth.html`)</h2>
          <p className="text-xs text-[#5A646D]">Tizim interfeyslarining asosiy maket karkaslari</p>
        </div>
        <div className="flex bg-[#F8F9FA] p-1 border border-[#767F87] rounded-lg">
          <button
            onClick={() => setActiveLayout('cabinet')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              activeLayout === 'cabinet' ? 'bg-[#2E7D4F] text-white shadow-xs' : 'text-[#5A646D] hover:text-[#1A1F24]'
            }`}
          >
            Kabinet Karkasi (Cabinet Shell)
          </button>
          <button
            onClick={() => setActiveLayout('auth')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              activeLayout === 'auth' ? 'bg-[#2E7D4F] text-white shadow-xs' : 'text-[#5A646D] hover:text-[#1A1F24]'
            }`}
          >
            Avtorizatsiya Karkasi (Auth Shell)
          </button>
        </div>
      </div>

      {/* Render Active Layout Preview */}
      <div className="border border-[#E4E7EA] rounded-xl overflow-hidden shadow-md">
        {activeLayout === 'cabinet' ? (
          <CabinetLayout activeNavId="permits">
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-[#1A1F24]">Ruxsatnomalar boshqaruvi</h1>
                  <p className="text-sm text-[#5A646D]">Tuman boʻyicha barcha berilgan va koʻrib chiqilayotgan arizalar</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" leftIcon={<Download className="w-4 h-4" />}>
                    Hisobot (PDF)
                  </Button>
                  <Button variant="primary" size="sm" leftIcon={<FileText className="w-4 h-4" />}>
                    Yangi ruxsatnoma
                  </Button>
                </div>
              </div>

              {/* Sample Dashboard Content */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-5 border border-[#E4E7EA] rounded-xl flex items-center gap-4">
                  <div className="p-3 bg-[#F0F7F1] text-[#2E7D4F] rounded-lg">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs text-[#5A646D] font-semibold uppercase">Faol ruxsatnomalar</span>
                    <div className="text-2xl font-bold text-[#1A1F24]">31 ta</div>
                  </div>
                </div>

                <div className="bg-white p-5 border border-[#E4E7EA] rounded-xl flex items-center gap-4">
                  <div className="p-3 bg-[#E0F2FE] text-[#0369A1] rounded-lg">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs text-[#5A646D] font-semibold uppercase">Kutilayotgan arizalar</span>
                    <div className="text-2xl font-bold text-[#1A1F24]">7 ta</div>
                  </div>
                </div>

                <div className="bg-white p-5 border border-[#E4E7EA] rounded-xl flex items-center gap-4">
                  <div className="p-3 bg-[#FFFBEB] text-[#B45309] rounded-lg">
                    <StatusBadge status="warning" showIcon={false} size="sm" />
                  </div>
                  <div>
                    <span className="text-xs text-[#5A646D] font-semibold uppercase">Muddati tugayotgan</span>
                    <div className="text-2xl font-bold text-[#1A1F24]">4 ta</div>
                  </div>
                </div>
              </div>
            </div>
          </CabinetLayout>
        ) : (
          <AuthLayout>
            <div className="space-y-6 text-center bg-white p-6 rounded-2xl border border-[#E4E7EA] shadow-xs">
              <h3 className="text-lg font-bold text-[#1A1F24]">Tizimga kirish namunasi</h3>
              <p className="text-xs text-[#5A646D]">
                Davlat xodimlari va arizachilar uchun yagona kirish karkasi.
              </p>
              <Button variant="primary" fullWidth size="lg">
                Kirish tugmasi
              </Button>
            </div>
          </AuthLayout>
        )}
      </div>
    </div>
  );
};
