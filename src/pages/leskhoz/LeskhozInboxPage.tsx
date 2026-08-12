import React from 'react';
import { WorklistPage } from '../worklist/WorklistPage';

export interface LeskhozInboxPageProps {
  onNavigate?: (page: string, params?: any) => void;
}

export const LeskhozInboxPage: React.FC<LeskhozInboxPageProps> = ({ onNavigate }) => {
  return <WorklistPage onNavigate={onNavigate} />;
};

export default LeskhozInboxPage;
