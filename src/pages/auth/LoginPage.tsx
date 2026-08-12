import React, { useState } from 'react';
import {
  Trees,
  UserCheck,
  FileKey,
  KeyRound,
  ArrowRight,
  AlertCircle,
  CheckCircle,
  HelpCircle,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input, FormField } from '../../components/ui/FormControls';
import { MOCK_USERS, authenticateUser, type MockUser } from '../../data/mockUsers';

export interface LoginPageProps {
  onSuccessLogin?: (user: MockUser) => void;
  onNavigate?: (page: string, params?: any) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onSuccessLogin, onNavigate }) => {
  const [authMethod, setAuthMethod] = useState<'oneid' | 'eimzo' | 'password'>('password');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [selectedCert, setSelectedCert] = useState('cert1');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showMockHelper, setShowMockHelper] = useState(false);

  const mockCerts = [
    { id: 'cert1', owner: 'ABDULLAYEV ALISHER NABIYEVICH', tin: '77777777777777', role: 'usr-007' },
    { id: 'cert2', owner: 'SAIDOV OTABEK SHAVKATOVICH', tin: '30491823410019', role: 'usr-009' },
  ];

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      if (authMethod === 'password') {
        const result = authenticateUser(login, password);
        if (!result.success || !result.user) {
          setErrorMessage(result.error || 'JSHSHIR/STIR yoki parol xato!');
          return;
        }
        onSuccessLogin?.(result.user);
      } else if (authMethod === 'oneid') {
        // Default to Applicant mock for OneID demo
        const defaultUser = MOCK_USERS.find((u) => u.role === 'applicant') || MOCK_USERS[8];
        onSuccessLogin?.(defaultUser);
      } else if (authMethod === 'eimzo') {
        const cert = mockCerts.find((c) => c.id === selectedCert);
        const user = MOCK_USERS.find((u) => u.jshshir === cert?.tin) || MOCK_USERS[6];
        onSuccessLogin?.(user);
      }
    }, 600);
  };

  const handleSelectMockUser = (user: MockUser) => {
    setLogin(user.jshshir);
    setPassword(user.password);
    setAuthMethod('password');
    setErrorMessage(null);
  };

  return (
    <div className="max-w-lg mx-auto py-8 space-y-6 font-sans">
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-[#2E7D4F] text-white flex items-center justify-center font-bold mx-auto shadow-md">
          <Trees className="w-7 h-7" />
        </div>
        <h1 className="text-2xl font-bold text-[#1A1F24]">Tizimga Kirish</h1>
        <p className="text-xs text-[#5A646D]">
          Ruxsatnoma axborot tizimiga kirish uchun autentifikatsiya usulini tanlang.
        </p>
      </div>

      {/* Auth Method Selector Tabs */}
      <div className="grid grid-cols-3 gap-1 bg-[#F8F9FA] p-1 border border-[#767F87] rounded-xl text-xs font-semibold">
        <button
          onClick={() => { setAuthMethod('password'); setErrorMessage(null); }}
          className={`py-2 px-1 rounded-lg transition-colors flex flex-col items-center gap-1 ${
            authMethod === 'password' ? 'bg-[#2E7D4F] text-white shadow-xs' : 'text-[#5A646D] hover:text-[#1A1F24]'
          }`}
        >
          <KeyRound className="w-4 h-4" /> Login/Parol
        </button>

        <button
          onClick={() => { setAuthMethod('oneid'); setErrorMessage(null); }}
          className={`py-2 px-1 rounded-lg transition-colors flex flex-col items-center gap-1 ${
            authMethod === 'oneid' ? 'bg-[#2E7D4F] text-white shadow-xs' : 'text-[#5A646D] hover:text-[#1A1F24]'
          }`}
        >
          <UserCheck className="w-4 h-4" /> OneID
        </button>

        <button
          onClick={() => { setAuthMethod('eimzo'); setErrorMessage(null); }}
          className={`py-2 px-1 rounded-lg transition-colors flex flex-col items-center gap-1 ${
            authMethod === 'eimzo' ? 'bg-[#2E7D4F] text-white shadow-xs' : 'text-[#5A646D] hover:text-[#1A1F24]'
          }`}
        >
          <FileKey className="w-4 h-4" /> E-IMZO
        </button>
      </div>

      {/* Error Alert Message */}
      {errorMessage && (
        <div className="p-4 bg-[#FDEDED] border border-[#F5C2C2] rounded-xl text-xs text-[#B91C1C] flex items-start gap-3 animate-in fade-in duration-200">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold block">Autentifikatsiya xatoligi!</span>
            <p>{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Auth Form Container */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-sm space-y-6">
        {/* METHOD 1: Standard Login / Password */}
        {authMethod === 'password' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <FormField label="Login (JSHSHIR / STIR)" required>
              <Input
                placeholder="Masalan: 30491823410019"
                value={login}
                onChange={(e) => { setLogin(e.target.value); setErrorMessage(null); }}
                touchSize
              />
            </FormField>

            <FormField label="Parol" required>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setErrorMessage(null); }}
                touchSize
              />
            </FormField>

            <Button type="submit" variant="primary" fullWidth size="lg" isLoading={isLoading}>
              Kirish
            </Button>
          </form>
        )}

        {/* METHOD 2: OneID Auth */}
        {authMethod === 'oneid' && (
          <div className="space-y-4 text-center">
            <div className="p-4 bg-[#F0F7F1] border border-[#D9EBDC] rounded-xl text-xs text-[#123522] space-y-2">
              <span className="font-bold block text-sm">Yagona Identifikatsiya Tizimi (OneID)</span>
              <p className="leading-relaxed">
                Jismoniy va yuridik shaxslar uchun OneID davlat portali orqali tezkor va xavfsiz autentifikatsiya.
              </p>
            </div>

            <Button
              variant="primary"
              fullWidth
              size="lg"
              isLoading={isLoading}
              onClick={handleLoginSubmit}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              OneID Orqali Kirish
            </Button>
          </div>
        )}

        {/* METHOD 3: E-IMZO Digital Key Auth */}
        {authMethod === 'eimzo' && (
          <div className="space-y-4">
            <span className="text-xs font-semibold text-[#5A646D] uppercase tracking-wider block">
              E-IMZO Kalitini Tanlang
            </span>

            <div className="space-y-2">
              {mockCerts.map((cert) => (
                <label
                  key={cert.id}
                  className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                    selectedCert === cert.id
                      ? 'border-[#2E7D4F] bg-[#F0F7F1]/60'
                      : 'border-[#767F87] bg-white hover:bg-[#F8F9FA]'
                  }`}
                >
                  <input
                    type="radio"
                    name="cert"
                    value={cert.id}
                    checked={selectedCert === cert.id}
                    onChange={() => setSelectedCert(cert.id)}
                    className="mt-1 accent-[#2E7D4F]"
                  />
                  <div className="text-xs space-y-0.5">
                    <span className="font-bold text-[#1A1F24] block">{cert.owner}</span>
                    <span className="text-[#5A646D] block">STIR/PINFL: {cert.tin}</span>
                  </div>
                </label>
              ))}
            </div>

            <Button
              variant="success"
              fullWidth
              size="lg"
              isLoading={isLoading}
              onClick={handleLoginSubmit}
            >
              E-IMZO Kaliti Bilan Kirish
            </Button>
          </div>
        )}
      </div>

      {/* Quick Mock Users Helper Card */}
      <div className="bg-[#F8F9FA] border border-[#E4E7EA] rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-[#123522]">
            <HelpCircle className="w-4 h-4 text-[#2E7D4F]" />
            <span>Test Loginlar (10 ta Rol uchun Mock Data)</span>
          </div>
          <button
            type="button"
            onClick={() => setShowMockHelper(!showMockHelper)}
            className="text-xs text-[#2E7D4F] hover:underline font-semibold"
          >
            {showMockHelper ? 'Yashirish' : 'Roʻyxatni koʻrish'}
          </button>
        </div>

        {showMockHelper && (
          <div className="space-y-2 pt-2 border-t border-[#E4E7EA] max-h-72 overflow-y-auto text-xs">
            <p className="text-[11px] text-[#5A646D]">
              Quyidagi rollardan birini tanlab, login va parolni avtomatik toʻldiring:
            </p>
            <div className="grid grid-cols-1 gap-1.5">
              {MOCK_USERS.map((user) => (
                <button
                  key={user.id}
                  type="button"
                  onClick={() => handleSelectMockUser(user)}
                  className="p-2.5 rounded-xl border border-[#D1D5DB] bg-white hover:border-[#2E7D4F] hover:bg-[#F0F7F1] text-left transition-all flex items-center justify-between group"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#1A1F24] group-hover:text-[#2E7D4F]">
                        {user.roleNameUz}
                      </span>
                      <span className="text-[10px] bg-[#E4E7EA] text-[#5A646D] px-1.5 py-0.5 rounded font-mono">
                        {user.role}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#5A646D]">
                      JSHSHIR: <code className="font-bold text-[#1A1F24]">{user.jshshir}</code> | Parol: <code className="font-bold text-[#1A1F24]">{user.password}</code>
                    </div>
                    <div className="text-[10px] text-[#767F87] truncate">
                      {user.fullName} ({user.organization})
                    </div>
                  </div>
                  {login === user.jshshir && (
                    <CheckCircle className="w-4 h-4 text-[#2E7D4F] shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Navigation link */}
      <div className="text-center text-xs text-[#5A646D]">
        Hisobingiz yoʻqmi?{' '}
        <button
          type="button"
          onClick={() => onNavigate?.('auth_register')}
          className="font-bold text-[#2E7D4F] hover:underline"
        >
          Roʻyxatdan oʻtish
        </button>
      </div>
    </div>
  );
};
