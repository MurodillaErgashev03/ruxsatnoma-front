import { useState } from 'react';
import { CabinetLayout } from './components/layouts/CabinetLayout';
import { AuthLayout } from './components/layouts/AuthLayout';

// Auth Pages
import { LoginPage, RegisterPage } from './pages/auth';

// 10 Role Specific Pages
import {
  AdminSettingsPage,
  AdminRolesPage,
  AdminAnnouncementsPage,
  AdminSystemSettingsPage,
  AdminBackupsPage,
  AdminHelpPage,
} from './pages/roles/sys_admin';
import { CentralAdminDashboardPage } from './pages/roles/central_admin';
import { ExecutorHeadDashboardPage } from './pages/roles/executor_head';
import { LeskhozReviewPage, ExecutorStaffDashboardPage } from './pages/roles/executor_staff';
import { GisImportPage, GisSpecialistDashboardPage } from './pages/roles/gis_specialist';
import { InspectorTasksPage, InspectorScanPage, InspectorInspectionPage } from './pages/roles/inspector';
import { ApplicantDashboard, PermitWizardPage, ApplicationDetailPage, ApplicantHelpPage } from './pages/roles/applicant';
import { ApplicantBillingPage } from './pages/roles/applicant/ApplicantBillingPage';
import { ProsecutorPortalPage } from './pages/roles/prosecutor';

// Profile pages
import { UserProfileSettingsPage, EimzoProfilePage, AdminNotificationsPage } from './pages/profile';

// Pages more than one role opens — kept out of any single role folder
import {
  ApplicationCardPage,
  PermitDocumentPage,
  ArchivePage,
  InspectionActsRegistryPage,
  DashboardPage,
  WorklistPage,
  PermitsRegistryPage,
  ReportsPage,
  GisMapPage,
  NormsPage,
  PaymentsPage,
  OrganizationsPage,
  ClassifiersPage,
  UsersPage,
  AuditLogsPage,
} from './pages/shared';

import { UIKitShowcase } from './components/ui-kit/UIKitShowcase';
import { MOCK_USERS, type MockUser } from './data/mockUsers';

export function App() {
  const [currentUser, setCurrentUser] = useState<MockUser | null>(() => {
    const savedUser = localStorage.getItem('auth_user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch {
        // Fall through
      }
    }
    // Default fallback to Admin for convenient development or restore saved page
    const savedPage = localStorage.getItem('active_page');
    if (savedPage && !['auth_login', 'auth_register', 'uikit'].includes(savedPage)) {
      const defaultAdmin = MOCK_USERS.find((u) => u.role === 'sys_admin') || MOCK_USERS[0];
      localStorage.setItem('auth_user', JSON.stringify(defaultAdmin));
      return defaultAdmin;
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
        return u.defaultPage || 'admin_settings';
      } catch {
        return 'auth_login';
      }
    }
    return 'auth_login';
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
    handleNavigate('auth_login');
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
      currentPage === 'archive' ||
      currentPage === 'inspection_acts' ||
      currentPage.startsWith('profile_') ||
      currentPage.startsWith('user_profile') ||
      currentPage.startsWith('prosecutor_') ||
      currentPage === 'worklist');

  return (
    <div className="relative min-h-screen bg-[#F8F9FA] text-[#1A1F24]">
      {isCabinetRoute ? (
        <CabinetLayout
          userName={currentUser?.fullName || 'Ergashov Sardor'}
          userRole={currentUser?.roleNameUz || 'Tizim administrator'}
          userRoleCode={currentUser?.role}
          onNavSelect={(page) => handleNavigate(page)}
          onLogout={handleLogout}
          activeNavId={currentPage}
        >
          {/* sys_admin pages */}
          {currentPage === 'admin_settings' && (
            <AdminSettingsPage onNavigate={handleNavigate} />
          )}
          {currentPage === 'admin_users' && (
            <UsersPage onNavigate={handleNavigate} userRole={currentUser?.role} />
          )}
          {currentPage === 'admin_roles' && (
            <AdminRolesPage onNavigate={handleNavigate} />
          )}
          {currentPage === 'admin_announcements' && (
            <AdminAnnouncementsPage onNavigate={handleNavigate} />
          )}
          {currentPage === 'admin_orgs' && (
            <OrganizationsPage onNavigate={handleNavigate} userRole={currentUser?.roleNameUz || currentUser?.role} />
          )}
          {currentPage === 'admin_classifiers' && (
            <ClassifiersPage onNavigate={handleNavigate} userRole={currentUser?.roleNameUz || currentUser?.role} />
          )}
          {currentPage === 'admin_system_settings' && (
            <AdminSystemSettingsPage onNavigate={handleNavigate} />
          )}
          {currentPage === 'admin_audit_logs' && (
            <AuditLogsPage onNavigate={handleNavigate} userRole={currentUser?.role} />
          )}
          {currentPage === 'admin_backups' && (
            <AdminBackupsPage onNavigate={handleNavigate} />
          )}
          {currentPage === 'admin_help' && (
            <AdminHelpPage onNavigate={handleNavigate} />
          )}

          {/* applicant pages */}
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
            <PermitsRegistryPage onNavigate={handleNavigate} userRole={currentUser?.roleNameUz || currentUser?.role} />
          )}
          {currentPage === 'applicant_help' && (
            <ApplicantHelpPage onNavigate={handleNavigate} />
          )}
          {/* TZ C9, C14 — Mening to'lovlarim va invoyslarim */}
          {currentPage === 'applicant_billing' && (
            <ApplicantBillingPage onNavigate={handleNavigate} userName={currentUser?.fullName} />
          )}

          {/* gis specialist */}
          {currentPage === 'gis_dashboard' && (
            <GisSpecialistDashboardPage onNavigate={handleNavigate} />
          )}
          {currentPage === 'gis_editor' && (
            <GisMapPage onNavigate={handleNavigate} userRole={currentUser?.roleNameUz || currentUser?.role} />
          )}
          {currentPage === 'gis_import' && (
            <GisImportPage onNavigate={handleNavigate} />
          )}
          {currentPage === 'normative_norms' && (
            <NormsPage onNavigate={handleNavigate} userRole={currentUser?.role} />
          )}

          {/* executor staff / head */}
          {currentPage === 'leskhoz_dashboard' && (
            <ExecutorStaffDashboardPage onNavigate={handleNavigate} />
          )}
          {(currentPage === 'leskhoz_inbox' || currentPage === 'worklist' || currentPage === 'leskhoz_worklist') && (
            <WorklistPage onNavigate={handleNavigate} userRole={currentUser?.roleNameUz || currentUser?.role} />
          )}
          {currentPage === 'leskhoz_review' && (
            <LeskhozReviewPage onNavigate={handleNavigate} />
          )}
          {currentPage === 'application_card' && (
            <ApplicationCardPage applicationId={pageParams?.id || 'А-00042'} onNavigate={handleNavigate} userRole={currentUser?.role} />
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
              <DashboardPage onNavigate={handleNavigate} userRole={currentUser?.roleNameUz || currentUser?.role} />
            )
          )}

          {/* inspector */}
          {currentPage === 'field_tasks' && (
            <InspectorTasksPage onNavigate={handleNavigate} />
          )}
          {currentPage === 'field_scan' && (
            <InspectorScanPage onNavigate={handleNavigate} />
          )}
          {(currentPage === 'field_inspection' || currentPage === 'inspection_act') && (
            <InspectorInspectionPage permitNo={pageParams?.permitNo || 'RX-2026-0089'} onNavigate={handleNavigate} />
          )}
          {currentPage === 'inspection_acts' && (
            <InspectionActsRegistryPage onNavigate={handleNavigate} userRole={currentUser?.role} />
          )}

          {/* accountant & reports & archive */}
          {(currentPage === 'reports' || currentPage === 'reports_management') && (
            <ReportsPage onNavigate={handleNavigate} userRole={currentUser?.roleNameUz || currentUser?.role} />
          )}
          {currentPage === 'accountant_reconciliation' && (
            <PaymentsPage onNavigate={handleNavigate} userRole={currentUser?.role} />
          )}
          {currentPage === 'archive' && (
            <ArchivePage onNavigate={handleNavigate} userRole={currentUser?.role} />
          )}

          {/* profile */}
          {(currentPage === 'user_profile' || currentPage === 'profile_settings') && (
            <UserProfileSettingsPage onNavigate={handleNavigate} user={currentUser || undefined} userName={currentUser?.fullName} userRole={currentUser?.roleNameUz || currentUser?.role} />
          )}
          {(currentPage === 'profile_eimzo' || currentPage === 'applicant_eimzo') && (
            <EimzoProfilePage onNavigate={handleNavigate} user={currentUser || undefined} userName={currentUser?.fullName} userRole={currentUser?.roleNameUz || currentUser?.role} />
          )}
          {currentPage === 'profile_notifications' && (
            <AdminNotificationsPage onNavigate={handleNavigate} />
          )}

          {/* prosecutor */}
          {currentPage === 'prosecutor_portal' && (
            <ProsecutorPortalPage onNavigate={handleNavigate} />
          )}
        </CabinetLayout>
      ) : (
        <>
          {currentPage === 'uikit' ? (
            <UIKitShowcase />
          ) : (
            <AuthLayout>
              {currentPage === 'auth_register' ? (
                <RegisterPage
                  onSuccessRegister={() => handleNavigate('auth_login')}
                  onNavigate={handleNavigate}
                />
              ) : (
                <LoginPage
                  onSuccessLogin={(user) => {
                    setCurrentUser(user);
                    localStorage.setItem('auth_user', JSON.stringify(user));
                    handleNavigate(user.defaultPage || 'admin_settings');
                  }}
                  onNavigate={handleNavigate}
                />
              )}
            </AuthLayout>
          )}
        </>
      )}
    </div>
  );
}

export default App;
