import { useState } from 'react';
import { PublicLayout } from './components/layouts/PublicLayout';
import { CabinetLayout } from './components/layouts/CabinetLayout';

// Public & Auth Pages (Landing)
import { HomePage, VerifyPage, TariffsPage, ServicesPage, DocumentsPage, OpenDataPage, FaqPage } from './pages/web';
import { LoginPage, RegisterPage } from './pages/auth';

// 10 Role Specific Pages
import {
  AdminSettingsPage,
  AdminUsersPage,
  AdminRolesPage,
  AdminOrganizationsPage,
  AdminClassifiersPage,
  AdminAnnouncementsPage,
  AdminSystemSettingsPage,
  AdminAuditLogsPage,
  AdminBackupsPage,
  AdminReportsPage,
  AdminHelpPage,
} from './pages/roles/sys_admin';
import { CentralAdminDashboardPage } from './pages/roles/central_admin';
import { ExecutiveDashboardPage } from './pages/roles/management';
import { ExecutorHeadDashboardPage } from './pages/roles/executor_head';
import { WorklistPage, LeskhozReviewPage } from './pages/roles/executor_staff';
import { GisEditorPage, GisImportPage, GeobotanicNormsPage } from './pages/roles/gis_specialist';
import { InspectorTasksPage, InspectorScanPage, InspectorInspectionPage } from './pages/roles/inspector';
import { AccountantReconciliationPage } from './pages/roles/accountant';
import { ApplicantDashboard, PermitWizardPage, ApplicationDetailPage, MyPermitsPage, ApplicantHelpPage } from './pages/roles/applicant';
import { ProsecutorPortalPage } from './pages/roles/prosecutor';

// Profile & Shared Pages
import { UserProfileSettingsPage, EimzoProfilePage, AdminNotificationsPage } from './pages/profile';
import { ApplicationCardPage, PermitDocumentPage } from './pages/shared';

import { UIKitShowcase } from './components/ui-kit/UIKitShowcase';
import { MOCK_USERS, type MockUser } from './data/mockUsers';

export function App() {
  const [currentUser, setCurrentUser] = useState<MockUser | null>(() => {
    const savedUser = localStorage.getItem('auth_user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch {
        // Stored value is not valid JSON — fall through to the checks below.
      }
    }
    // If a cabinet route was saved, restore applicant user as fallback
    const savedPage = localStorage.getItem('active_page');
    if (
      savedPage &&
      !['home', 'services', 'tariffs', 'documents', 'opendata', 'faq', 'verify', 'auth_login', 'auth_register', 'uikit'].includes(savedPage)
    ) {
      const defaultApplicant = MOCK_USERS.find((u) => u.role === 'applicant') || MOCK_USERS[8];
      localStorage.setItem('auth_user', JSON.stringify(defaultApplicant));
      return defaultApplicant;
    }
    return null;
  });

  const [currentPage, setCurrentPage] = useState<string>(() => {
    const savedPage = localStorage.getItem('active_page');
    if (savedPage) return savedPage;
    const savedUser = localStorage.getItem('auth_user');
    if (savedUser) {
      try {
        const u = JSON.parse(savedUser);
        return u.defaultPage || 'applicant_dashboard';
      } catch {
        return 'home';
      }
    }
    return 'home';
  });

  const [pageParams, setPageParams] = useState<any>({});

  const handleNavigate = (page: string, params?: any) => {
    setCurrentPage(page);
    localStorage.setItem('active_page', page);
    if (params) setPageParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('auth_user');
    localStorage.removeItem('active_page');
    handleNavigate('home');
  };

  const isCabinetRoute =
    currentUser !== null &&
    (currentPage === 'dashboard' ||
      currentPage === 'executive_dashboard' ||
      currentPage === 'application_card' ||
      currentPage === 'permit_detail' ||
      currentPage === 'permit' ||
      currentPage.startsWith('permit') ||
      currentPage.startsWith('applicant_') ||
      currentPage.startsWith('gis_') ||
      currentPage.startsWith('normative_') ||
      currentPage.startsWith('leskhoz_') ||
      currentPage.startsWith('manager_') ||
      currentPage.startsWith('field_') ||
      currentPage.startsWith('accountant_') ||
      currentPage.startsWith('admin_') ||
      currentPage.startsWith('reports') ||
      currentPage.startsWith('profile_') ||
      currentPage.startsWith('user_profile') ||
      currentPage.startsWith('prosecutor_'));

  return (
    <div className="relative min-h-screen bg-[#F8F9FA] text-[#1A1F24]">
      {/* Render Selected View */}
      {isCabinetRoute ? (
        <CabinetLayout
          userName={currentUser?.fullName || 'Alisher Abdullayev'}
          userRole={currentUser?.roleNameUz || 'Tuman inspektori'}
          userRoleCode={currentUser?.role}
          onNavSelect={(page) => handleNavigate(page)}
          onLogout={handleLogout}
          activeNavId={currentPage}
        >
          {currentPage === 'applicant_dashboard' && (
            <ApplicantDashboard
              userName={currentUser?.fullName}
              userOrg={currentUser?.organization}
              onNavigate={handleNavigate}
            />
          )}
          {currentPage === 'applicant_wizard' && (
            <PermitWizardPage onNavigate={handleNavigate} />
          )}
          {currentPage === 'applicant_application_detail' && (
            <ApplicationDetailPage applicationId={pageParams?.id || 1} onNavigate={handleNavigate} />
          )}
          {currentPage === 'applicant_permits' && (
            <MyPermitsPage onNavigate={handleNavigate} userRole={currentUser?.roleNameUz || currentUser?.role} />
          )}
          {currentPage === 'applicant_help' && (
            <ApplicantHelpPage onNavigate={handleNavigate} />
          )}
          {currentPage === 'gis_editor' && (
            <GisEditorPage onNavigate={handleNavigate} userRole={currentUser?.roleNameUz || currentUser?.role} />
          )}
          {currentPage === 'gis_import' && (
            <GisImportPage onNavigate={handleNavigate} />
          )}
          {currentPage === 'normative_norms' && (
            <GeobotanicNormsPage onNavigate={handleNavigate} />
          )}
          {currentPage === 'leskhoz_inbox' && (
            <WorklistPage onNavigate={handleNavigate} userRole={currentUser?.roleNameUz || currentUser?.role} />
          )}
          {(currentPage === 'worklist' || currentPage === 'leskhoz_worklist') && (
            <WorklistPage onNavigate={handleNavigate} userRole={currentUser?.roleNameUz || currentUser?.role} />
          )}
          {currentPage === 'leskhoz_review' && (
            <LeskhozReviewPage onNavigate={handleNavigate} />
          )}
          {currentPage === 'application_card' && (
            <ApplicationCardPage applicationId={pageParams?.id || 'А-00042'} onNavigate={handleNavigate} />
          )}
          {(currentPage === 'permit_detail' || currentPage === 'permit') && (
            <PermitDocumentPage onNavigate={handleNavigate} userRole={currentUser?.role} />
          )}
          {(currentPage === 'manager_decision' || currentPage === 'dashboard' || currentPage === 'executive_dashboard') && (
            currentUser?.role === 'central_admin' ? (
              <CentralAdminDashboardPage onNavigate={handleNavigate} />
            ) : currentUser?.role === 'executor_head' ? (
              <ExecutorHeadDashboardPage onNavigate={handleNavigate} />
            ) : (
              <ExecutiveDashboardPage onNavigate={handleNavigate} userRole={currentUser?.roleNameUz || currentUser?.role} />
            )
          )}
          {currentPage === 'field_tasks' && (
            <InspectorTasksPage onNavigate={handleNavigate} />
          )}
          {currentPage === 'field_scan' && (
            <InspectorScanPage onNavigate={handleNavigate} />
          )}
          {(currentPage === 'field_inspection' || currentPage === 'inspection_act') && (
            <InspectorInspectionPage permitNo={pageParams?.permitNo || 'RX-2026-0089'} onNavigate={handleNavigate} />
          )}
          {(currentPage === 'reports' || currentPage === 'reports_management') && (
            <AdminReportsPage onNavigate={handleNavigate} userRole={currentUser?.roleNameUz || currentUser?.role} />
          )}
          {currentPage === 'accountant_reconciliation' && (
            <AccountantReconciliationPage onNavigate={handleNavigate} />
          )}
          {currentPage === 'admin_settings' && (
            <AdminSettingsPage onNavigate={handleNavigate} />
          )}
          {currentPage === 'admin_users' && (
            <AdminUsersPage onNavigate={handleNavigate} />
          )}
          {currentPage === 'admin_roles' && (
            <AdminRolesPage onNavigate={handleNavigate} />
          )}
          {currentPage === 'admin_announcements' && (
            <AdminAnnouncementsPage onNavigate={handleNavigate} />
          )}
          {currentPage === 'admin_orgs' && (
            <AdminOrganizationsPage onNavigate={handleNavigate} userRole={currentUser?.roleNameUz || currentUser?.role} />
          )}
          {currentPage === 'admin_classifiers' && (
            <AdminClassifiersPage onNavigate={handleNavigate} userRole={currentUser?.roleNameUz || currentUser?.role} />
          )}
          {currentPage === 'admin_system_settings' && (
            <AdminSystemSettingsPage onNavigate={handleNavigate} />
          )}
          {currentPage === 'admin_audit_logs' && (
            <AdminAuditLogsPage onNavigate={handleNavigate} />
          )}
          {currentPage === 'admin_backups' && (
            <AdminBackupsPage onNavigate={handleNavigate} />
          )}
          {(currentPage === 'user_profile' || currentPage === 'profile_settings') && (
            <UserProfileSettingsPage onNavigate={handleNavigate} user={currentUser || undefined} userName={currentUser?.fullName} userRole={currentUser?.roleNameUz || currentUser?.role} />
          )}
          {(currentPage === 'profile_eimzo' || currentPage === 'applicant_eimzo') && (
            <EimzoProfilePage onNavigate={handleNavigate} user={currentUser || undefined} userName={currentUser?.fullName} userRole={currentUser?.roleNameUz || currentUser?.role} />
          )}
          {currentPage === 'profile_notifications' && (
            <AdminNotificationsPage onNavigate={handleNavigate} />
          )}
          {(currentPage === 'admin_help' || currentPage === 'applicant_help') && (
            <AdminHelpPage onNavigate={handleNavigate} />
          )}
          {currentPage === 'prosecutor_portal' && (
            <ProsecutorPortalPage onNavigate={handleNavigate} />
          )}
        </CabinetLayout>
      ) : (
        <>
          {currentPage === 'uikit' ? (
            <UIKitShowcase />
          ) : (
            <PublicLayout
              onNavigate={handleNavigate}
              activeNav={currentPage}
              onCheckPermit={(no) => handleNavigate('verify', { query: no })}
            >
              {currentPage === 'home' && (
                <HomePage onNavigate={handleNavigate} />
              )}
              {currentPage === 'services' && (
                <ServicesPage onNavigate={handleNavigate} />
              )}
              {currentPage === 'tariffs' && (
                <TariffsPage />
              )}
              {currentPage === 'documents' && (
                <DocumentsPage onNavigate={handleNavigate} />
              )}
              {currentPage === 'opendata' && (
                <OpenDataPage onNavigate={handleNavigate} />
              )}
              {currentPage === 'faq' && (
                <FaqPage onNavigate={handleNavigate} />
              )}
              {currentPage === 'verify' && (
                <VerifyPage initialQuery={pageParams?.query || 'RX-2026-0089'} />
              )}
              {currentPage === 'auth_login' && (
                <LoginPage
                  onSuccessLogin={(user) => {
                    setCurrentUser(user);
                    localStorage.setItem('auth_user', JSON.stringify(user));
                    handleNavigate(user.defaultPage || 'applicant_dashboard');
                  }}
                  onNavigate={handleNavigate}
                />
              )}
              {currentPage === 'auth_register' && (
                <RegisterPage
                  onSuccessRegister={() => handleNavigate('auth_login')}
                  onNavigate={handleNavigate}
                />
              )}
            </PublicLayout>
          )}
        </>
      )}
    </div>
  );
}

export default App;
