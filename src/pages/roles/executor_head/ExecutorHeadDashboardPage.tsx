import React from 'react';
import { ExecutiveDashboardPage } from '../management/ExecutiveDashboardPage';

export interface ExecutorHeadDashboardPageProps {
  onNavigate?: (page: string, params?: any) => void;
}

export const ExecutorHeadDashboardPage: React.FC<ExecutorHeadDashboardPageProps> = ({ onNavigate }) => {
  return <ExecutiveDashboardPage userRole="executor_head" onNavigate={onNavigate} />;
};

export default ExecutorHeadDashboardPage;
