import React from 'react';
import { ExecutiveDashboardPage } from '../dashboard/ExecutiveDashboardPage';

export interface ManagerDecisionPageProps {
  onNavigate?: (page: string, params?: any) => void;
}

export const ManagerDecisionPage: React.FC<ManagerDecisionPageProps> = ({ onNavigate }) => {
  return <ExecutiveDashboardPage onNavigate={onNavigate} />;
};

export default ManagerDecisionPage;
