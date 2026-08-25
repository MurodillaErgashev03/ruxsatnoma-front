import React, { useState } from 'react';
import { WizardHeader } from './components/WizardHeader';
import { WizardStepper } from './components/WizardStepper';
import { WizardFooter } from './components/WizardFooter';
import { DesignDecisionsFootnote } from './components/DesignDecisionsFootnote';

// Import Modular Steps
import { Step1ActivitySelection } from './steps/Step1ActivitySelection';
import { Step2GisMapStep } from './steps/Step2GisMapStep';
import { Step3Parameters, type LivestockCounts } from './steps/Step3Parameters';
import { Step4Documents, type UploadedFileItem } from './steps/Step4Documents';
import { Step5Verifications } from './steps/Step5Verifications';
import { Step6SignSubmit } from './steps/Step6SignSubmit';

export interface ApplicationWizardPageProps {
  onNavigate?: (page: string, params?: any) => void;
}

export const ApplicationWizardPage: React.FC<ApplicationWizardPageProps> = ({
  onNavigate,
}) => {
  // Wizard Navigation State
  const [currentStep, setCurrentStep] = useState<number>(2);
  const [maxReachedStep, setMaxReachedStep] = useState<number>(2);
  const [lastSavedTime, setLastSavedTime] = useState<string>('14:32');

  // Step 1: Activity and Territory State
  const [selectedActivity, setSelectedActivity] = useState<string>('grazing');
  const [selectedRegion, setSelectedRegion] = useState<string>('tashkent_reg');
  const [selectedForestry, setSelectedForestry] = useState<string>('zangiota');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('chinoz_12');

  // Step 2: GIS Map & Conflict State
  const [hasConflict, setHasConflict] = useState<boolean>(true);
  const [requestedArea, setRequestedArea] = useState<string>('21,7');

  // Step 3: Parameters, Dates, and Livestock Counts
  const [startDate, setStartDate] = useState<string>('2026-04-01');
  const [endDate, setEndDate] = useState<string>('2026-10-31');
  const [livestockCounts, setLivestockCounts] = useState<LivestockCounts>({
    adultCattle: 5,  // 5 * 1.0 = 5.0 SB
    youngCattle: 4,  // 4 * 0.5 = 2.0 SB
    adultSheep: 20,  // 20 * 0.1 = 2.0 SB
    youngSheep: 20,  // 20 * 0.05 = 1.0 SB -> Total = 10.0 SB
  });

  // Step 4: Documents Upload State
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFileItem[]>([
    {
      id: 'vet_doc_1',
      name: 'veterinariya_dalolatnomasi_2026.pdf',
      size: '1.8 MB',
      type: 'PDF',
      uploadDate: '25.08.2026',
      category: 'Veterinariya ma’lumotnomasi',
    },
  ]);

  // Step 6: Submission State
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Handlers for Step 2 (GIS)
  const handleExcludeOverlap = () => {
    setHasConflict(false);
    setRequestedArea('18,5');
    updateSaveTimestamp();
  };

  const handleResetPolygon = () => {
    setHasConflict(true);
    setRequestedArea('21,7');
  };

  // Helper for autosave timestamp
  const updateSaveTimestamp = () => {
    const now = new Date();
    setLastSavedTime(
      `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
    );
  };

  // Step 3: Livestock count updater
  const handleLivestockCountChange = (key: keyof LivestockCounts, val: number) => {
    setLivestockCounts((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  // Step 4: Document updaters
  const handleAddFile = (file: UploadedFileItem) => {
    setUploadedFiles((prev) => [...prev, file]);
  };

  const handleRemoveFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  // Calculate UsedSB for Step 3 validation
  const calculatedUsedSB =
    livestockCounts.adultCattle * 1.0 +
    livestockCounts.youngCattle * 0.5 +
    livestockCounts.adultSheep * 0.1 +
    livestockCounts.youngSheep * 0.05;

  const remainingLimitSB = 10; // MaxSB for 18.5 ha
  const isLivestockOverLimit = calculatedUsedSB > remainingLimitSB;

  // Total amount calculation
  const totalAmount =
    livestockCounts.adultCattle * 75000 +
    livestockCounts.youngCattle * 37500 +
    livestockCounts.adultSheep * 15000 +
    livestockCounts.youngSheep * 7500;

  // Step validation rules for 'Next' button
  let isNextDisabled = false;
  let disabledReason = '';

  if (currentStep === 2 && hasConflict) {
    isNextDisabled = true;
    disabledReason = 'Kesishuvni (3.2 ha) bartaraf eting — shundan soʻng keyingi bosqichga oʻtish mumkin';
  } else if (currentStep === 3 && isLivestockOverLimit) {
    isNextDisabled = true;
    disabledReason = `Chorva soni ruxsat etilgan me’yordan (${remainingLimitSB} SB) oshib ketdi!`;
  } else if (currentStep === 3 && calculatedUsedSB === 0) {
    isNextDisabled = true;
    disabledReason = 'Kamida 1 ta toifadagi chorva bosh sonini kiriting!';
  }

  // Navigation handlers
  const handleNextStep = () => {
    if (isNextDisabled) return;
    if (currentStep < 6) {
      const next = currentStep + 1;
      setCurrentStep(next);
      setMaxReachedStep((prev) => Math.max(prev, next));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleStepClick = (stepNo: number) => {
    setCurrentStep(stepNo);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveDraft = () => {
    updateSaveTimestamp();
    alert('Qoralama muvaffaqiyatli saqlandi!');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-sans pb-16">
      {/* 1. Header with Progress & Draft Status */}
      <WizardHeader
        currentStep={currentStep}
        totalSteps={6}
        draftNo="RX-2026-004903"
        lastSavedTime={lastSavedTime}
        onExitWizard={() => onNavigate?.('applicant_dashboard')}
      />

      {/* 2. 6-Step Interactive Stepper Node Bar */}
      <WizardStepper
        currentStep={currentStep}
        maxReachedStep={maxReachedStep}
        onStepClick={handleStepClick}
      />

      {/* 3. Dynamic Step Content Renderer */}
      <div className="min-h-[500px]">
        {currentStep === 1 && (
          <Step1ActivitySelection
            selectedActivity={selectedActivity}
            onSelectActivity={setSelectedActivity}
            selectedRegion={selectedRegion}
            onSelectRegion={setSelectedRegion}
            selectedForestry={selectedForestry}
            onSelectForestry={setSelectedForestry}
            selectedDepartment={selectedDepartment}
            onSelectDepartment={setSelectedDepartment}
          />
        )}

        {currentStep === 2 && (
          <Step2GisMapStep
            hasConflict={hasConflict}
            requestedArea={requestedArea}
            onRequestedAreaChange={setRequestedArea}
            onExcludeOverlap={handleExcludeOverlap}
            onResetPolygon={handleResetPolygon}
          />
        )}

        {currentStep === 3 && (
          <Step3Parameters
            startDate={startDate}
            onStartDateChange={setStartDate}
            endDate={endDate}
            onEndDateChange={setEndDate}
            livestockCounts={livestockCounts}
            onLivestockCountChange={handleLivestockCountChange}
            remainingSB={remainingLimitSB}
          />
        )}

        {currentStep === 4 && (
          <Step4Documents
            files={uploadedFiles}
            onAddFile={handleAddFile}
            onRemoveFile={handleRemoveFile}
          />
        )}

        {currentStep === 5 && (
          <Step5Verifications
            onRevalidate={() => alert('Barcha idoralararo xizmatlar qayta so‘raldi va tasdiqlandi!')}
          />
        )}

        {currentStep === 6 && (
          <Step6SignSubmit
            draftNo="RX-2026-004903"
            applicantName="Saidov Otabek Shavkatovich"
            applicantId="31205901234567"
            selectedContour="04-12-007"
            freeArea={18.5}
            startDate={startDate}
            endDate={endDate}
            livestockCounts={livestockCounts}
            totalAmount={totalAmount}
            isSubmitted={isSubmitted}
            onSubmitSuccess={() => setIsSubmitted(true)}
            onNavigateToDashboard={() => onNavigate?.('applicant_dashboard')}
          />
        )}
      </div>

      {/* 4. Sticky Wizard Navigation Footer */}
      <WizardFooter
        currentStep={currentStep}
        totalSteps={6}
        isNextDisabled={isNextDisabled}
        disabledReason={disabledReason}
        lastSavedTime={lastSavedTime}
        onPrevStep={handlePrevStep}
        onNextStep={handleNextStep}
        onSaveDraft={handleSaveDraft}
        isSubmitted={isSubmitted}
      />

      {/* 5. Architecture & Design Decisions Footnote Card */}
      <DesignDecisionsFootnote />
    </div>
  );
};
