import React from 'react';
import { DashboardPage } from '../../shared/DashboardPage';

export interface ExecutorHeadDashboardPageProps {
  onNavigate?: (page: string, params?: any) => void;
}

export const ExecutorHeadDashboardPage: React.FC<ExecutorHeadDashboardPageProps> = ({ onNavigate }) => {
  return <DashboardPage userRole="executor_head" onNavigate={onNavigate} />;
};

export default ExecutorHeadDashboardPage;
