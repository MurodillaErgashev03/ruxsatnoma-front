import React from 'react';
import { InspectionActPage } from './inspection-act/InspectionActPage';

export interface InspectorInspectionPageProps {
  permitNo?: string;
  onNavigate?: (page: string, params?: any) => void;
}

export const InspectorInspectionPage: React.FC<InspectorInspectionPageProps> = ({ onNavigate }) => {
  return <InspectionActPage onNavigate={onNavigate} />;
};

export default InspectorInspectionPage;
