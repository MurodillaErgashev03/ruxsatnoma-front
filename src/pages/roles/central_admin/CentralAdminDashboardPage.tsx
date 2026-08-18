import React from 'react';
import { DashboardPage } from '../../shared/DashboardPage';

export interface CentralAdminDashboardPageProps {
  onNavigate?: (page: string, params?: any) => void;
}

export const CentralAdminDashboardPage: React.FC<CentralAdminDashboardPageProps> = ({ onNavigate }) => {
  return <DashboardPage userRole="central_admin" onNavigate={onNavigate} />;
};

export default CentralAdminDashboardPage;
