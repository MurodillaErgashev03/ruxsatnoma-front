import React from 'react';
import { Trees } from 'lucide-react';

export interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col justify-between font-sans text-[#1A1F24]">
      {/* Header */}
      <header className="bg-[#17331B] border-b border-white/10 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2E7D4F] text-white flex items-center justify-center font-bold shadow-md border border-white/20">
              <Trees className="w-5.5 h-5.5" />
            </div>
            <div>
              <span className="block text-base font-bold text-white leading-tight tracking-tight">
                Ruxsatnoma — Davlat Tizimi
              </span>
              <span className="block text-[11px] text-gray-200">
                Yagona idoraviy va foydalanuvchilar boshqaruv portali
              </span>
            </div>
          </div>
          <div className="text-xs text-emerald-100/80 hidden sm:block">
            Xavfsiz ulanish (SSL / E-IMZO)
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-lg">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[#E4E7EA] py-4 text-center text-xs text-[#5A646D]">
        <div className="max-w-7xl mx-auto px-4">
          © 2026 Oʻzbekiston Respublikasi Oʻrmon xoʻjaligi agentligi. Barcha huquqlar himoyalangan.
        </div>
      </footer>
    </div>
  );
};
