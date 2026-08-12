import { useState } from 'react';
import { PublicLayout } from './components/layouts/PublicLayout';
import { CabinetLayout } from './components/layouts/CabinetLayout';
import { HomePage } from './pages/public/HomePage';
import { VerifyPage } from './pages/public/VerifyPage';
import { TariffsPage } from './pages/public/TariffsPage';
import { ServicesPage } from './pages/public/ServicesPage';
import { DocumentsPage } from './pages/public/DocumentsPage';
import { OpenDataPage } from './pages/public/OpenDataPage';
import { FaqPage } from './pages/public/FaqPage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { ApplicantDashboard } from './pages/applicant/ApplicantDashboard';
import { PermitWizardPage } from './pages/applicant/PermitWizardPage';
import { ApplicationDetailPage } from './pages/applicant/ApplicationDetailPage';
import { MyPermitsPage } from './pages/applicant/MyPermitsPage';
import { ApplicantHelpPage } from './pages/applicant/ApplicantHelpPage';
import { GisEditorPage } from './pages/gis/GisEditorPage';
import { GisImportPage } from './pages/gis/GisImportPage';
import { GeobotanicNormsPage } from './pages/normative/GeobotanicNormsPage';
import { LeskhozReviewPage } from './pages/leskhoz/LeskhozReviewPage';
import { ExecutiveDashboardPage } from './pages/dashboard/ExecutiveDashboardPage';
import { InspectorTasksPage } from './pages/field/InspectorTasksPage';
import { InspectorScanPage } from './pages/field/InspectorScanPage';
import { InspectorInspectionPage } from './pages/field/InspectorInspectionPage';
import { AccountantReconciliationPage } from './pages/accountant/AccountantReconciliationPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';
import { AdminUsersPage } from './pages/admin/AdminUsersPage';
import { AdminOrganizationsPage } from './pages/admin/AdminOrganizationsPage';
import { AdminClassifiersPage } from './pages/admin/AdminClassifiersPage';
import { AdminSystemSettingsPage } from './pages/admin/AdminSystemSettingsPage';
import { AdminAuditLogsPage } from './pages/admin/AdminAuditLogsPage';
import { AdminBackupsPage } from './pages/admin/AdminBackupsPage';
import { AdminReportsPage } from './pages/admin/AdminReportsPage';
import { EimzoProfilePage } from './pages/profile/EimzoProfilePage';
import { UserProfileSettingsPage } from './pages/profile/UserProfileSettingsPage';
import { AdminNotificationsPage } from './pages/profile/AdminNotificationsPage';
import { AdminHelpPage } from './pages/admin/AdminHelpPage';
import { ProsecutorPortalPage } from './pages/prosecutor/ProsecutorPortalPage';
import { ApplicationCardPage } from './pages/application-card/ApplicationCardPage';
import { PermitDocumentPage } from './pages/permit/PermitDocumentPage';
import { WorklistPage } from './pages/worklist/WorklistPage';
import { UIKitShowcase } from './components/ui-kit/UIKitShowcase';
import { MOCK_USERS, type MockUser } from './data/mockUsers';

export function App() {
  const [currentUser, setCurrentUser] = useState<MockUser | null>(() => {
    const savedUser = localStorage.getItem('auth_user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        return null;
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
      } catch (e) {
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
            <ExecutiveDashboardPage onNavigate={handleNavigate} />
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
            <AdminReportsPage onNavigate={handleNavigate} />
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
            <UserProfileSettingsPage onNavigate={handleNavigate} userName={currentUser?.fullName} userRole={currentUser?.roleNameUz || currentUser?.role} />
          )}
          {(currentPage === 'profile_eimzo' || currentPage === 'applicant_eimzo') && (
            <EimzoProfilePage onNavigate={handleNavigate} />
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
