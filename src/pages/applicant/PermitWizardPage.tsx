import React from 'react';
import { ApplicationWizardPage } from '../application-wizard/ApplicationWizardPage';

export interface PermitWizardPageProps {
  onNavigate?: (page: string, params?: any) => void;
}

export const PermitWizardPage: React.FC<PermitWizardPageProps> = ({ onNavigate }) => {
  return <ApplicationWizardPage onNavigate={onNavigate} />;
};

export default PermitWizardPage;
