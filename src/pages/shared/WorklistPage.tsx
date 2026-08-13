import React, { useState } from 'react';
import { hasRight } from '../../lib/permissions';
import { WorklistHeaderSection } from './worklist/WorklistHeaderSection';
import { WorklistTabs } from './worklist/WorklistTabs';
import { WorklistFiltersPanel, type WorklistFilterValues } from './worklist/WorklistFiltersPanel';
import { WorklistAppliedFiltersBar } from './worklist/WorklistAppliedFiltersBar';
import { WorklistBulkActionBar } from './worklist/WorklistBulkActionBar';
import { WorklistApplicationsTable, type WorklistApplicationRow } from './worklist/WorklistApplicationsTable';
import { WorklistEmptyState } from './worklist/WorklistEmptyState';

export interface WorklistPageProps {
  onNavigate?: (page: string, params?: any) => void;
  userRole?: string;
}

export const WorklistPage: React.FC<WorklistPageProps> = ({ onNavigate, userRole }) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  /**
   * Acting on an application is Я and Ў — staff of the executing organisation and
   * the applicant. Every other role reaching this registry, including the GIS
   * specialist and the inspector, reads and exports only (TZ appendix 4).
   */
  const canActOnApplications = hasRight(userRole, 'application', 'edit');
  const isCentralAdmin = !canActOnApplications;

  const [filters, setFilters] = useState<WorklistFilterValues>({
    status: 'under_review',
    activity: 'all',
    startDate: '2026-07-01',
    endDate: '2026-08-10',
    slaDeadline: 'all',
    preset: 'all_assigned',
    region: 'all',
  });

  const initialRows: WorklistApplicationRow[] = [
    {
      id: 'row-1',
      appNo: 'А-00031',
      applicantName: '«Ipak Yoʻli Agroservis» MCHJ',
      applicantId: 'STIR 306148912',
      activityType: 'Chorva mollarini boqish',
      contour: 'Boʻstonliq 14-2',
      contourLayer: '«Yaylovlar» qatlami',
      areaHa: 41.0,
      sumAmount: '4 100 000,00',
      statusText: 'Koʻrib chiqilmoqda',
      statusType: 'under_review',
      slaState: 'overdue',
      slaText: '4 kun muddati oʻtgan',
      slaSubtext: 'Muddati tugadi 06.08.2026',
      slaPercent: 100,
      riTag: 'RI-07',
    },
    {
      id: 'row-2',
      appNo: 'А-00040',
      applicantName: '«Chorvachilik Servis» MCHJ',
      applicantId: 'STIR 305718841',
      activityType: 'Pichan oʻrish',
      contour: 'Oqqoʻrgʻon 7-1',
      contourLayer: '«Pichanloqlar» qatlami',
      areaHa: 34.0,
      sumAmount: '3 400 000,00',
      statusText: 'Koʻrib chiqilmoqda',
      statusType: 'under_review',
      slaState: 'overdue',
      slaText: '1 kun muddati oʻtgan',
      slaSubtext: 'Muddati tugadi 09.08.2026, 18:00',
      slaPercent: 100,
      riTag: 'RI-07',
    },
    {
      id: 'row-3',
      appNo: 'А-00042',
      applicantName: 'Aziz Karimov',
      applicantId: 'JSHSHIR 3170886025218',
      activityType: 'Chorva mollarini boqish',
      contour: 'Boʻstonliq 14-2',
      contourLayer: '«Yaylovlar» qatlami',
      areaHa: 12.5,
      sumAmount: '1 207 324,80',
      statusText: 'Koʻrib chiqilmoqda',
      statusType: 'under_review',
      slaState: 'due_today',
      slaText: 'Bugun tugaydi',
      slaSubtext: '18:00 gacha, 8 soat 20 min qoldi',
      slaPercent: 97,
    },
    {
      id: 'row-4',
      appNo: 'А-00037',
      applicantName: 'Shoira Umarova',
      applicantId: 'JSHSHIR 4120993013391',
      activityType: 'Ratsional dam olish',
      contour: 'Boʻstonliq 21-6',
      contourLayer: '«Rekreatsiya» qatlami',
      areaHa: 8.0,
      sumAmount: '960 000,00',
      statusText: 'Koʻrib chiqilmoqda',
      statusType: 'under_review',
      slaState: 'due_today',
      slaText: 'Bugun tugaydi',
      slaSubtext: '18:00 gacha, 8 soat 20 min qoldi',
      slaPercent: 97,
    },
    {
      id: 'row-5',
      appNo: 'А-00038',
      applicantName: '«Oʻrmon Agro» MCHJ',
      applicantId: 'STIR 302198007',
      activityType: 'Otin va shox-shabba yigʻish',
      contour: 'Parkent 9-3',
      contourLayer: '«Parvarish parchalari»',
      areaHa: 5.2,
      sumAmount: '312 000,00',
      statusText: 'Koʻrib chiqilmoqda',
      statusType: 'under_review',
      slaState: 'normal',
      slaText: '5 kun qoldi',
      slaSubtext: 'Muddati: 15.08.2026',
      slaPercent: 30,
    },
    {
      id: 'row-6',
      appNo: 'А-00045',
      applicantName: 'Bobur Malikov',
      applicantId: 'JSHSHIR 3090882194012',
      activityType: 'Asalarichilik va in qoʻyish',
      contour: 'Zangiota 3-1',
      contourLayer: '«Asalarichilik» qatlami',
      areaHa: 2.0,
      sumAmount: '450 000,00',
      statusText: 'Koʻrib chiqilmoqda',
      statusType: 'under_review',
      slaState: 'normal',
      slaText: '8 kun qoldi',
      slaSubtext: 'Muddati: 18.08.2026',
      slaPercent: 15,
    },
  ];

  // Filter logic
  const filteredRows = initialRows.filter((r) => {
    if (activeTab === 'overdue' && r.slaState !== 'overdue') return false;
    if (activeTab === 'new' && r.appNo !== 'А-00045') return false;
    if (activeTab === 'waiting_info' && r.appNo !== 'А-00038') return false;
    if (filters.slaDeadline === 'overdue' && r.slaState !== 'overdue') return false;
    if (filters.slaDeadline === 'due_today' && r.slaState !== 'due_today') return false;
    return true;
  });

  const handleFilterChange = (key: keyof WorklistFilterValues, val: string) => {
    setFilters((prev) => ({ ...prev, [key]: val }));
  };

  const handleResetFilters = () => {
    setFilters({
      status: 'all',
      activity: 'all',
      startDate: '',
      endDate: '',
      slaDeadline: 'all',
      preset: 'all_assigned',
    });
  };

  const handleSelectPreset = (presetId: string) => {
    setFilters((prev) => ({ ...prev, preset: presetId }));
    if (presetId === 'urgent_sla') {
      setActiveTab('overdue');
    } else {
      setActiveTab('all');
    }
  };

  const handleToggleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAll = () => {
    if (selectedIds.length === filteredRows.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredRows.map((r) => r.id));
    }
  };

  /**
   * Staff of the executing organisation open the review screen, where an application
   * is rejected, sent to an inspector or passed to the head with a positive
   * conclusion. Every other role opens the read-only card (TZ appendix 4).
   */
  const handleRowClick = (appNo: string) => {
    if (hasRight(userRole, 'application', 'edit')) {
      onNavigate?.('leskhoz_review', { id: appNo });
    } else {
      onNavigate?.('application_card', { id: appNo });
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-sans pb-16">
      {/* Header Section */}
      <WorklistHeaderSection
        totalAssigned={24}
        overdueCount={2}
        onNavigate={onNavigate}
        userRole={userRole}
      />

      {/* Slicing Tabs */}
      <WorklistTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Filters Panel */}
      <WorklistFiltersPanel
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        onApplyFilters={() => alert('Filtrlar qoʻllandi!')}
        onSelectPreset={handleSelectPreset}
        isCentralAdmin={isCentralAdmin}
      />

      {/* Applied Filters & Results Bar */}
      <WorklistAppliedFiltersBar
        foundCount={filteredRows.length}
        onRemoveChip={(chipId) => alert(`Filtr olindi: ${chipId}`)}
      />

      {/* Main Table & Bulk Action Toolbar or Empty State */}
      {filteredRows.length > 0 ? (
        <div className="space-y-0">
          <WorklistBulkActionBar
            selectedCount={selectedIds.length}
            onClearSelection={() => setSelectedIds([])}
            isReadOnly={isCentralAdmin}
          />

          <WorklistApplicationsTable
            rows={filteredRows}
            selectedIds={selectedIds}
            onToggleSelectRow={handleToggleSelectRow}
            onToggleSelectAll={handleToggleSelectAll}
            onRowClick={handleRowClick}
          />
        </div>
      ) : (
        <WorklistEmptyState
          onShowAllOverdue={() => {
            setActiveTab('overdue');
            handleResetFilters();
          }}
          onResetFilters={handleResetFilters}
          onExpandPeriod={handleResetFilters}
        />
      )}
    </div>
  );
};

export default WorklistPage;
