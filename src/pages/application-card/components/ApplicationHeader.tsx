import React from 'react';
import { Clock, ShieldCheck, UserCheck, Calendar, Wallet } from 'lucide-react';
import { StatusBadge } from '../../../components/ui/StatusBadge';

export interface ApplicationHeaderProps {
  id?: string;
  activityName?: string;
  applicantName?: string;
  applicantType?: string;
  pinfl?: string;
  submittedAt?: string;
  channel?: string;
  isSigned?: boolean;
  executorName?: string;
  executorAssignedAt?: string;
  totalAmount?: string;
  ruleVersion?: string;
  slaDeadline?: string;
  slaRemaining?: string;
}

export const ApplicationHeader: React.FC<ApplicationHeaderProps> = ({
  id = 'А-00042',
  activityName = 'Chorva mollarini boqish',
  applicantName = 'Aziz Karimov',
  applicantType = 'Jismoniy shaxs',
  pinfl = '31207854315218',
  submittedAt = '22.07.2026, 10:12',
  channel = 'my.gov.uz · E-IMZO imzolangan',
  executorName = 'Dilnoza Abdullayeva',
  executorAssignedAt = 'Avtomatik biriktirilgan (22.07.2026)',
  totalAmount = '1 207 324,80 UZS',
  ruleVersion = 'R3 normasi boʻyicha hisob-kitob (04.08.2026)',
  slaDeadline = '10.08.2026, 18:00',
  slaRemaining = 'Bugun tugaydi (8 soat 20 daqiqa qoldi)',
}) => {
  return (
    <section className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs space-y-5 font-sans">
      {/* Top row: ID, Status, Activity */}
      <div className="flex flex-wrap items-center gap-4 border-b border-[#E4E7EA] pb-4">
        <h1 className="font-mono text-3xl font-extrabold text-[#1A1F24] tracking-tight">{id}</h1>
        
        <StatusBadge status="pending" label="Koʻrib chiqilmoqda (На рассмотрении)" />

        <div className="text-lg font-bold text-[#5A646D] flex items-center gap-2">
          <span>•</span>
          <span className="text-[#1A1F24]">{activityName}</span>
        </div>
      </div>

      {/* 5 Facts Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 pt-1">
        {/* Fact 1: Applicant */}
        <div className="space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#5A646D] flex items-center gap-1">
            <UserCheck className="w-3.5 h-3.5 text-[#2E7D4F]" /> Arizachi
          </span>
          <div className="text-sm font-semibold text-[#1A1F24]">{applicantName}</div>
          <div className="text-xs text-[#5A646D]">
            {applicantType} · JSHSHIR: <span className="font-mono font-bold text-[#1A1F24]">{pinfl}</span>
          </div>
        </div>

        {/* Fact 2: Submitted */}
        <div className="space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#5A646D] flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-[#2E7D4F]" /> Topshirilgan
          </span>
          <div className="text-sm font-mono font-semibold text-[#1A1F24]">{submittedAt}</div>
          <div className="text-xs text-[#5A646D] leading-tight">{channel}</div>
        </div>

        {/* Fact 3: Executor */}
        <div className="space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#5A646D] flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2E7D4F]" /> Masʼul ijrochi
          </span>
          <div className="text-sm font-semibold text-[#1A1F24]">{executorName}</div>
          <div className="text-xs text-[#5A646D] leading-tight">{executorAssignedAt}</div>
        </div>

        {/* Fact 4: Amount */}
        <div className="space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#5A646D] flex items-center gap-1">
            <Wallet className="w-3.5 h-3.5 text-[#2E7D4F]" /> Toʻlov summasi
          </span>
          <div className="text-sm font-mono font-bold text-[#1A1F24]">{totalAmount}</div>
          <div className="text-xs text-[#5A646D] leading-tight">{ruleVersion}</div>
        </div>

        {/* Fact 5: SLA Countdown */}
        <div className="space-y-1 bg-[#FFFBEB] p-3 rounded-xl border border-[#FDE68A]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#B45309] flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#B45309]" /> SLA Muddati
          </span>
          <div className="text-xs font-bold text-[#B45309] flex items-center gap-1">
            <span>▲</span> {slaRemaining}
          </div>
          <div className="text-[11px] text-[#5A646D]">Tugash vaqti: {slaDeadline}</div>
          
          {/* Progress bar */}
          <div className="w-full bg-[#E4E7EA] h-1.5 rounded-full overflow-hidden mt-1">
            <div className="bg-[#B45309] h-full rounded-full w-[85%]" />
          </div>
        </div>
      </div>
    </section>
  );
};
