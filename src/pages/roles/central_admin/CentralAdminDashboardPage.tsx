import React from 'react';
import { ExecutiveDashboardPage } from '../management/ExecutiveDashboardPage';

export interface CentralAdminDashboardPageProps {
  onNavigate?: (page: string, params?: any) => void;
}

export const CentralAdminDashboardPage: React.FC<CentralAdminDashboardPageProps> = ({ onNavigate }) => {
  return <ExecutiveDashboardPage userRole="central_admin" onNavigate={onNavigate} />;
};

export default CentralAdminDashboardPage;
