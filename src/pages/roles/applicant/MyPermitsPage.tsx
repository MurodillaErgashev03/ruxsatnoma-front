import React, { useState } from 'react';
import {
  QrCode,
  Download,
  Search,
  FileText,
  AlertTriangle,
  MapPin,
  Trees,
} from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/FormControls';
import { Tabs } from '../../../components/ui/Navigation';
import { StatusBadge } from '../../../components/ui/StatusBadge';
import { Modal } from '../../../components/ui/Overlay';

export interface MyPermitsPageProps {
  onNavigate?: (page: string, params?: any) => void;
  userRole?: string;
}

export interface PermitCardItem {
  id: number;
  permitNo: string;
  applicantName: string;
  applicantId: string;
  activity: string;
  forestZone: string;
  region: string;
  contour: string;
  areaHa: number;
  livestock: string;
  issueDate: string;
  expiryDate: string;
  status: 'approved' | 'warning' | 'rejected';
  daysLeft: number;
}

export const MyPermitsPage: React.FC<MyPermitsPageProps> = ({ onNavigate, userRole = '' }) => {
  const isCentralAdmin =
    userRole.includes('central_admin') ||
    userRole.includes('Markaziy') ||
    userRole.includes('Центральный');

  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedActivity, _setSelectedActivity] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedQrPermit, setSelectedQrPermit] = useState<PermitCardItem | null>(null);

  const permits: PermitCardItem[] = [
    {
      id: 1,
      permitNo: 'RX-2026-0089',
      applicantName: '«Burchmulla Agro» MCHJ',
      applicantId: 'STIR 304918234',
      activity: 'Chorva mollarini boqish',
      forestZone: 'Burchmulla DЎX, 4-boʻlim',
      region: 'tashkent',
      contour: 'Boʻstonliq 14-2',
      areaHa: 41.0,
      livestock: '45 bosh qoramol',
      issueDate: '10.08.2026',
      expiryDate: '10.08.2027',
      status: 'approved',
      daysLeft: 365,
    },
    {
      id: 2,
      permitNo: 'RX-2026-0091',
      applicantName: 'Karimov Jamshid B.',
      applicantId: 'JSHSHIR 22222222222222',
      activity: 'Asalarichilik va in qoʻyish',
      forestZone: 'Kitob baland togʻ DЎX',
      region: 'kashkadarya',
      contour: 'Kitob 8-1',
      areaHa: 12.5,
      livestock: '50 ari oilasi',
      issueDate: '05.08.2025',
      expiryDate: '15.08.2026',
      status: 'warning',
      daysLeft: 5,
    },
    {
      id: 3,
      permitNo: 'RX-2026-0104',
      applicantName: '«Ipak Yoʻli Agroservis» MCHJ',
      applicantId: 'STIR 306148912',
      activity: 'Chorva mollarini boqish',
      forestZone: 'Zomin DЎX, 2-boʻlim',
      region: 'jizzakh',
      contour: 'Zomin 5-3',
      areaHa: 85.0,
      livestock: '120 bosh qoʻy',
      issueDate: '01.07.2026',
      expiryDate: '01.07.2027',
      status: 'approved',
      daysLeft: 320,
    },
    {
      id: 4,
      permitNo: 'RX-2026-0112',
      applicantName: '«Namangan Eco Tour» MCHJ',
      applicantId: 'STIR 308912456',
      activity: 'Ratsional dam olish (Rekreatsiya)',
      forestZone: 'Pop DЎX, Chorkesar boʻlimi',
      region: 'namangan',
      contour: 'Pop 12-4',
      areaHa: 3.2,
      livestock: 'Eko-lager 12 ta konstruksiya',
      issueDate: '15.06.2026',
      expiryDate: '15.06.2027',
      status: 'approved',
      daysLeft: 305,
    },
    {
      id: 5,
      permitNo: 'RX-2026-0118',
      applicantName: 'Saidov Otabek Shavkatovich',
      applicantId: 'JSHSHIR 30491823410019',
      activity: 'Pichan oʻrish',
      forestZone: 'Oxan-Garan DЎX',
      region: 'tashkent',
      contour: 'Ohangaron 3-1',
      areaHa: 18.0,
      livestock: 'Pichan oʻrish maydoni',
      issueDate: '20.05.2026',
      expiryDate: '20.08.2026',
      status: 'warning',
      daysLeft: 8,
    },
    {
      id: 6,
      permitNo: 'RX-2026-0125',
      applicantName: '«Samarqand Asal» UK',
      applicantId: 'STIR 201456987',
      activity: 'Asalarichilik va in qoʻyish',
      forestZone: 'Oqdaryo DЎX',
      region: 'samarkand',
      contour: 'Oqdaryo 9-2',
      areaHa: 5.0,
      livestock: '80 ari oilasi',
      issueDate: '10.04.2026',
      expiryDate: '10.04.2027',
      status: 'approved',
      daysLeft: 240,
    },
  ];

  const filteredPermits = permits.filter((p) => {
    if (activeTab === 'approved' && p.status !== 'approved') return false;
    if (activeTab === 'warning' && p.status !== 'warning') return false;
    if (selectedActivity !== 'all' && !p.activity.toLowerCase().includes(selectedActivity.toLowerCase())) return false;
    if (selectedRegion !== 'all' && p.region !== selectedRegion) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matches =
        p.permitNo.toLowerCase().includes(q) ||
        p.applicantName.toLowerCase().includes(q) ||
        p.applicantId.toLowerCase().includes(q) ||
        p.forestZone.toLowerCase().includes(q);
      if (!matches) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 font-sans pb-16">
      {/* Page Title & Top Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E4E7EA] pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#2E7D4F] bg-[#F0F7F1] px-2.5 py-1 rounded border border-[#D9EBDC]">
            {isCentralAdmin ? 'RESPUBLIKA RUXSATNOMALAR REYESTRI' : 'Rasmiy Hujjatlar'}
          </span>
          <h1 className="text-lg md:text-xl font-bold text-[#1A1F24] mt-1.5">
            {isCentralAdmin ? 'Respublika Ruxsatnomalar Reyestri' : 'Mening Ruxsatnomalarim'}
          </h1>
          <p className="text-xs text-[#5A646D] mt-0.5">
            {isCentralAdmin
              ? 'Oʻrmon fondi yerlarida faoliyat yuritish uchun berilgan 18 ta elektron ruxsatnoma va QR-kodli rasmiy hujjatlar reyestri'
              : 'Berilgan elektron ruxsatnomalarni yuklab olish va tekshirish'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isCentralAdmin ? (
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Download className="w-4 h-4 text-[#15803D]" />}
              onClick={() => alert('Respublika ruxsatnomalar reyestri XLSX formatida yuklab olindi!')}
              className="border-[#767F87] text-[#1A1F24] hover:bg-[#F8F9FA] font-bold text-xs h-9 cursor-pointer"
            >
              Vigruzka XLSX
            </Button>
          ) : (
            <Button
              variant="primary"
              size="sm"
              onClick={() => onNavigate?.('applicant_wizard')}
              className="bg-[#2E7D4F] hover:bg-[#23653F] text-white font-bold text-xs h-9"
            >
              Yangi Ariza
            </Button>
          )}
        </div>
      </div>

      {/* Controls & Multi-Filter Bar */}
      <div className="bg-white border border-[#E4E7EA] rounded-2xl p-4 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <Tabs
            tabs={[
              { id: 'all', label: 'Barchasi', count: permits.length },
              { id: 'approved', label: 'Faol ruxsatnomalar', count: permits.filter((p) => p.status === 'approved').length },
              { id: 'warning', label: 'Muddati tugayotganlar', count: permits.filter((p) => p.status === 'warning').length },
            ]}
            activeTabId={activeTab}
            onChange={setActiveTab}
          />

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            {isCentralAdmin && (
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="h-10 px-3 text-xs bg-[#F8F9FA] border border-[#767F87] rounded-lg text-[#1A1F24] font-medium focus:ring-2 focus:ring-[#2E7D4F] focus:outline-none"
              >
                <option value="all">Respublika — Barcha viloyatlar</option>
                <option value="tashkent">Toshkent viloyati (Boʻstonliq DЎX)</option>
                <option value="kashkadarya">Qashqadaryo viloyati (Kitob DЎX)</option>
                <option value="jizzakh">Jizzax viloyati (Zomin DЎX)</option>
                <option value="namangan">Namangan viloyati (Pop DЎX)</option>
                <option value="samarkand">Samarqand viloyati (Oqdaryo DЎX)</option>
              </select>
            )}

            <div className="w-full sm:w-64">
              <Input
                placeholder="Ruxsatnoma №, Arizachi yoki STIR..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search className="w-4 h-4 text-[#9AA3AB]" />}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Central Admin Republic Table View vs Applicant Card View */}
      {isCentralAdmin ? (
        <div className="bg-white border border-[#E4E7EA] rounded-2xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8F9FA] border-b border-[#E4E7EA] text-[#5A646D] font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Ruxsatnoma №</th>
                  <th className="py-3.5 px-4">Arizachi / STIR</th>
                  <th className="py-3.5 px-4">Faoliyat turi</th>
                  <th className="py-3.5 px-4">Oʻrmon Xoʻjaligi (Hudud)</th>
                  <th className="py-3.5 px-4">Kontur / Maydon</th>
                  <th className="py-3.5 px-4">Amal qilish muddati</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4E7EA]">
                {filteredPermits.map((p) => (
                  <tr key={p.id} className="hover:bg-[#F8F9FA]/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#1A1F24] whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Trees className="w-4 h-4 text-[#2E7D4F]" />
                        <span>{p.permitNo}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#1A1F24]">{p.applicantName}</div>
                      <div className="text-[11px] text-[#5A646D] font-mono">{p.applicantId}</div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-[#1A1F24]">
                      <div>{p.activity}</div>
                      <div className="text-[11px] text-[#5A646D]">{p.livestock}</div>
                    </td>
                    <td className="py-3.5 px-4 text-[#5A646D] font-medium whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#2E7D4F]" />
                        <span>{p.forestZone}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[#1A1F24] whitespace-nowrap">
                      <div>{p.contour}</div>
                      <div className="text-[11px] text-[#2E7D4F] font-bold">{p.areaHa} ga</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono whitespace-nowrap">
                      <div className="text-[#1A1F24] font-semibold">{p.issueDate} — {p.expiryDate}</div>
                      {p.status === 'warning' && (
                        <div className="text-[10px] text-[#B91C1C] font-bold flex items-center gap-0.5 mt-0.5">
                          <AlertTriangle className="w-3 h-3" /> {p.daysLeft} kun qoldi
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <StatusBadge status={p.status} size="sm" />
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-1">
                      <button
                        type="button"
                        onClick={() => setSelectedQrPermit(p)}
                        className="p-1.5 hover:bg-[#E4E7EA] rounded-lg text-[#5A646D] hover:text-[#1A1F24] transition-colors"
                        title="QR-Kod koʻrish"
                      >
                        <QrCode className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => alert(`Ruxsatnoma ${p.permitNo} PDF fayli yuklab olindi!`)}
                        className="p-1.5 hover:bg-[#E4E7EA] rounded-lg text-[#5A646D] hover:text-[#1A1F24] transition-colors"
                        title="PDF Yuklab olish"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onNavigate?.('permit_detail', { id: p.id })}
                        className="border-[#767F87] text-[#2E7D4F] font-bold hover:bg-[#F0F7F1]"
                      >
                        Koʻrish
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Applicant Card View */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPermits.map((p) => (
            <div
              key={p.id}
              className="bg-white border border-[#E4E7EA] rounded-2xl p-6 shadow-xs hover:shadow-md transition-shadow space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold font-mono text-[#1A1F24]">{p.permitNo}</span>
                  <StatusBadge status={p.status} size="sm" />
                </div>

                <div className="space-y-1">
                  <h3 className="font-bold text-base text-[#1A1F24]">{p.activity}</h3>
                  <p className="text-xs text-[#5A646D]">{p.forestZone}</p>
                  <p className="text-xs text-[#767F87]">Parametr: <b className="text-[#1A1F24]">{p.livestock}</b></p>
                </div>

                <div className="p-3 bg-[#F8F9FA] rounded-xl border border-[#E4E7EA] flex items-center justify-between text-xs font-mono">
                  <span className="text-[#5A646D]">Amal qilish muddati:</span>
                  <b className="text-[#1A1F24]">{p.issueDate} — {p.expiryDate}</b>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#E4E7EA] flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<QrCode className="w-4 h-4" />}
                    onClick={() => setSelectedQrPermit(p)}
                  >
                    QR-Kod
                  </Button>
                  <Button variant="secondary" size="sm" leftIcon={<Download className="w-4 h-4" />}>
                    PDF
                  </Button>
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  leftIcon={<FileText className="w-4 h-4" />}
                  onClick={() => onNavigate?.('permit_detail', { id: p.id })}
                  className="bg-[#2E7D4F] hover:bg-[#23653F] text-white font-bold"
                >
                  Ruxsatnomani koʻrish (A № 004182)
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* QR Code Viewer Modal */}
      {selectedQrPermit && (
        <Modal
          isOpen={!!selectedQrPermit}
          onClose={() => setSelectedQrPermit(null)}
          title={`Ruxsatnoma ${selectedQrPermit.permitNo}`}
          subtitle="QR-kod orqali tekshirish va autentifikatsiya"
          footer={
            <Button variant="primary" size="sm" onClick={() => setSelectedQrPermit(null)}>
              Yopish
            </Button>
          }
        >
          <div className="text-center space-y-4 py-4">
            <div className="w-48 h-48 bg-white border-4 border-[#2E7D4F] rounded-2xl mx-auto flex items-center justify-center p-4 shadow-sm">
              <QrCode className="w-36 h-36 text-[#1A1F24]" />
            </div>
            <div className="font-mono text-sm font-bold text-[#2E7D4F]">{selectedQrPermit.permitNo}</div>
            <p className="text-xs text-[#5A646D]">
              Davlat inspektorlari va Bosh Prokuratura nazoratchilari uchun verifikatsiya kodi
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
};
