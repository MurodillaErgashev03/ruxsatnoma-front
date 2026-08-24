import React, { useState } from 'react';
import {
  Calculator,
  History,
  Plus,
  Download,
  Search,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { hasRight } from '../../lib/permissions';
import { Input } from '../../components/ui/FormControls';
import { DataTable, type Column } from '../../components/ui/DataTable';
import { NormFormModal, type GeobotanicNormFormData } from './components/NormFormModal';

export interface NormsPageProps {
  onNavigate?: (page: string, params?: any) => void;
  userRole?: string;
}

export interface GeobotanicNormItem {
  id: string;
  contourNo: string;
  leskhoz: string;
  activityType?: string;
  geobotanicDoc: string;
  geobotanicDocFile?: string;
  yieldPerHa: string; // e.g. "4.5 sentner/ga"
  rotationSeason: string;
  maxSB: number; // Maximum sustainable capacity
  ruleVersion: string;
  status: 'active' | 'archived';
  lastAuditDate: string;
}

export const NormsPage: React.FC<NormsPageProps> = ({ userRole = '' }) => {
  /**
   * TZ appendix 4: entering and versioning a norm is Я+Ў for the GIS/normative
   * specialist alone. Monitoring roles read the calculation and export it.
   */
  const canEditNorms = hasRight(userRole, 'usage_norm', 'edit');
  const canExport = hasRight(userRole, 'calculation', 'export');

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNormForEdit, setSelectedNormForEdit] = useState<GeobotanicNormFormData | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [normsList, setNormsList] = useState<GeobotanicNormItem[]>([
    {
      id: 'NRM-001',
      contourNo: 'Kontur №42',
      leskhoz: 'Burchmulla davlat oʻrmon xoʻjaligi',
      activityType: 'Chorva boqish (Yaylov foydalanishi)',
      geobotanicDoc: 'OʻzR Fanlar Akademiyasi Xulosasi №14/2025',
      yieldPerHa: '4.5 sentner/ga',
      rotationSeason: 'Bahor-Yoz (Aprel-Sentyabr)',
      maxSB: 500,
      ruleVersion: 'v2.4 (2026)',
      status: 'active',
      lastAuditDate: '10.01.2026',
    },
    {
      id: 'NRM-002',
      contourNo: 'Kontur №15',
      leskhoz: 'Zomin davlat qoʻriqxonasi',
      activityType: 'Pichan oʻrish maydoni',
      geobotanicDoc: 'Ekologik Geobotanika Hujjati №89',
      yieldPerHa: '3.8 sentner/ga',
      rotationSeason: 'Kuz-Qish (Oktyabr-Mart)',
      maxSB: 200,
      ruleVersion: 'v2.1 (2025)',
      status: 'active',
      lastAuditDate: '15.12.2025',
    },
    {
      id: 'NRM-003',
      contourNo: 'Kontur №88',
      leskhoz: 'Kitob davlat oʻrmon xoʻjaligi',
      activityType: 'Chorva boqish (Yaylov foydalanishi)',
      geobotanicDoc: 'NHA Qarori №402-2024',
      yieldPerHa: '5.1 sentner/ga',
      rotationSeason: 'Yoz (Iyun-Avgust)',
      maxSB: 350,
      ruleVersion: 'v1.8 (2024)',
      status: 'archived',
      lastAuditDate: '01.06.2024',
    },
  ]);

  const bhmAuditLogs = [
    {
      date: '01.08.2026',
      oldBhm: '330,000 UZS',
      newBhm: '340,000 UZS',
      changedBy: 'Normativ Mutaxassis Karimov B.',
      makerCheckerStatus: 'Tasdiqlangan (RI-04 Aylanib oʻtildi)',
    },
    {
      date: '01.12.2024',
      oldBhm: '300,000 UZS',
      newBhm: '330,000 UZS',
      changedBy: 'Moliya Vazirligi Avto-Sync',
      makerCheckerStatus: 'Tasdiqlangan',
    },
  ];

  const handleOpenCreateModal = () => {
    setSelectedNormForEdit(null);
    setIsModalOpen(true);
  };

  const handleSaveNorm = (data: GeobotanicNormFormData) => {
    const newItem: GeobotanicNormItem = {
      id: data.id,
      contourNo: data.contourNo,
      leskhoz: data.leskhoz,
      activityType: data.activityType,
      geobotanicDoc: data.geobotanicDoc,
      geobotanicDocFile: data.geobotanicDocFile,
      yieldPerHa: `${data.yieldPerHa} sentner/ga`,
      rotationSeason: data.rotationSeason,
      maxSB: data.maxSB,
      ruleVersion: data.ruleVersion,
      status: data.status,
      lastAuditDate: new Date().toLocaleDateString('ru-RU'),
    };

    setNormsList((prev) => [newItem, ...prev]);
    setToastMessage(`"${data.contourNo}" uchun yangi geobotanik meʼyor va MaxSB (${data.maxSB} bosh) muvaffaqiyatli saqlandi!`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const filteredNorms = normsList.filter((n) =>
    n.contourNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.leskhoz.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.geobotanicDoc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns: Column<GeobotanicNormItem>[] = [
    { key: 'contourNo', header: 'Kontur №', sortable: true, width: '130px' },
    { key: 'leskhoz', header: 'Oʻrmon Xoʻjaligi', sortable: true },
    { key: 'geobotanicDoc', header: 'Geobotanik Hujjat Basis', sortable: true },
    { key: 'yieldPerHa', header: 'Hosildorlik', sortable: true, width: '130px' },
    { key: 'rotationSeason', header: 'Mavsumiy Rotatsiya', sortable: true },
    {
      key: 'maxSB',
      header: 'Sigʻim (MaxSB)',
      sortable: true,
      width: '140px',
      accessor: (row) => <b className="font-mono text-[#2E7D4F]">{row.maxSB} bosh</b>,
    },
    { key: 'ruleVersion', header: 'Versiya', sortable: true, width: '110px' },
  ];

  return (
    <div className="space-y-8 font-sans pb-16">
      {/* Toast Banner */}
      {toastMessage && (
        <div className="p-4 bg-[#F0F7F1] border border-[#D9EBDC] text-[#2E7D4F] rounded-2xl shadow-sm flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-[#2E7D4F] shrink-0" />
            <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-xs font-bold underline hover:opacity-75 cursor-pointer"
          >
            Yopish
          </button>
        </div>
      )}

      {/* Header */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#2E7D4F] bg-[#F0F7F1] px-2.5 py-1 rounded">
            {canEditNorms ? 'Meʼyoriy subtizim (4.2.10, 10.3 / VMQ 689)' : 'Meʼyor va tariflar (faqat koʻrish)'}
          </span>
          <h1 className="text-2xl font-bold text-[#1A1F24] mt-1">Geobotanik Meʼyorlar va BHM Reyestri</h1>
          <p className="text-xs text-[#5A646D]">
            Har bir oʻrmon konturiga oid geobotanik hosildorlik, rotatsiya mavsumlari va MaxSB formulalari.
          </p>
        </div>
        {canEditNorms ? (
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={handleOpenCreateModal}
            className="bg-[#2E7D4F] hover:bg-[#23653F] text-white font-bold cursor-pointer"
          >
            Yangi meʼyor biriktirish
          </Button>
        ) : canExport ? (
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Download className="w-4 h-4" />}
            onClick={() => alert('Meʼyorlar va hisob-kitob reyestri Excel formatida tayyorlanmoqda.')}
          >
            Excelga eksport
          </Button>
        ) : null}
      </div>

      {/* Formula Calculation Logic Explanation Box */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-3 border-b border-[#E4E7EA] pb-3">
          <Calculator className="w-6 h-6 text-[#2E7D4F]" />
          <h2 className="text-base font-bold text-[#1A1F24]">Yaylov Sigʻimi (MaxSB) VMQ 689 Avto-Hisoblash Zanjiri</h2>
        </div>

        <div className="p-4 bg-[#F0F7F1] border border-[#D9EBDC] rounded-xl font-mono text-xs text-[#123522] space-y-2">
          <div className="font-bold text-sm">
            Oz = Yield × Area × Season_share &nbsp;|&nbsp; Oz_eff = Oz × 0.85 &nbsp;|&nbsp; MaxSB = floor(Oz_eff / 3.74)
          </div>
          <div className="text-[11px] text-[#5A646D] font-sans pt-1">
            * <b>Oz</b> — umumiy ozuqa zaxirasi (tsentner); <b>0.85</b> — 15% sugʻurta zaxirasi zaxirasi chiqarilgach samarali zaxira; <b>3.74</b> — 1 shartli bosh chorva uchun mavsumiy ozuqa birligi.
          </div>
        </div>
      </div>

      {/* Norms Table */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-[#1A1F24]">Faol Geobotanik Normalar Reestri</h2>
            <p className="text-xs text-[#5A646D]">Published konturlarga biriktirilgan hosildorlik va MaxSB qoidalari</p>
          </div>
          <div className="w-full sm:w-64">
            <Input
              placeholder="Kontur boʻyicha izlash..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
            />
          </div>
        </div>

        <DataTable columns={columns} data={filteredNorms} selectable />
      </div>

      {/* BHM Retroactive Change Audit Log (RI-04 Detector) */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-[#767F87] uppercase">
          <History className="w-4 h-4 text-[#B45309]" />
          <span>BHM (БҲМ) Tarixi va Retroaktiv Audit Jurnali (Maker-Checker Nazorati)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-[#F8F9FA] border-b border-[#E4E7EA]">
              <tr>
                <th className="p-3 font-semibold text-[#5A646D]">Oʻzgarish Sanasi</th>
                <th className="p-3 font-semibold text-[#5A646D]">Eski БҲМ</th>
                <th className="p-3 font-semibold text-[#5A646D]">Yangi БҲМ</th>
                <th className="p-3 font-semibold text-[#5A646D]">Masʼul Shaxs</th>
                <th className="p-3 font-semibold text-[#5A646D]">Maker-Checker Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E7EA]">
              {bhmAuditLogs.map((log, idx) => (
                <tr key={idx} className="hover:bg-[#F8F9FA]">
                  <td className="p-3 font-mono font-bold">{log.date}</td>
                  <td className="p-3 font-mono text-[#767F87]">{log.oldBhm}</td>
                  <td className="p-3 font-mono font-bold text-[#2E7D4F]">{log.newBhm}</td>
                  <td className="p-3 font-semibold text-[#1A1F24]">{log.changedBy}</td>
                  <td className="p-3 text-[#15803D] font-semibold">{log.makerCheckerStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Geobotanic Norm Form Modal */}
      <NormFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveNorm}
        initialData={selectedNormForEdit}
      />
    </div>
  );
};

