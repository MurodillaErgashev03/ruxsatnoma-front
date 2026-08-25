import React from 'react';
import { OccupancyAlert } from '../components/OccupancyAlert';
import { GisMapCanvas } from '../components/GisMapCanvas';
import { MapToolsPanel } from '../components/MapToolsPanel';
import { SelectedContourPanel } from '../components/SelectedContourPanel';
import { MapLayersPanel } from '../components/MapLayersPanel';
import { NormCalculationPanel } from '../components/NormCalculationPanel';

export interface Step2GisMapStepProps {
  hasConflict: boolean;
  requestedArea: string;
  onRequestedAreaChange: (val: string) => void;
  onExcludeOverlap: () => void;
  onResetPolygon: () => void;
}

export const Step2GisMapStep: React.FC<Step2GisMapStepProps> = ({
  hasConflict,
  requestedArea,
  onRequestedAreaChange,
  onExcludeOverlap,
  onResetPolygon,
}) => {
  return (
    <div className="space-y-6 font-sans">
      {/* Occupancy Conflict Alert Banner (If conflict active) */}
      {hasConflict && (
        <OccupancyAlert
          contourId="04-12-007"
          totalArea={21.7}
          overlapArea={3.2}
          onExcludeOverlap={onExcludeOverlap}
          onShowOnMap={() => {
            const mapEl = document.getElementById('wizard-map-section');
            if (mapEl) mapEl.scrollIntoView({ behavior: 'smooth' });
          }}
          onChangeContour={() => alert('Boshqa konturlar roʻyxati ochilmoqda...')}
        />
      )}

      {/* Two-Column Working Area: GIS Map + Contour & Layer Panels */}
      <div id="wizard-map-section" className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">
        {/* Left Column: GIS Vector Canvas & Map Tools */}
        <div className="space-y-6 min-w-0">
          <GisMapCanvas
            selectedContourId="04-12-007"
            totalArea={21.7}
            overlapArea={3.2}
            hasConflict={hasConflict}
          />

          <MapToolsPanel onResetPolygon={onResetPolygon} />
        </div>

        {/* Right Column: Selected Contour Details & Layer Switches */}
        <div className="space-y-6">
          <SelectedContourPanel
            contourId="04-12-007"
            totalArea={21.7}
            overlapArea={3.2}
            requestedArea={requestedArea}
            onRequestedAreaChange={onRequestedAreaChange}
            hasConflict={hasConflict}
          />

          <MapLayersPanel />
        </div>
      </div>

      {/* VMQ 689 Norm Calculation Transparency Panel */}
      <NormCalculationPanel
        freeArea={hasConflict ? 18.5 : 18.5}
        hasConflict={hasConflict}
      />
    </div>
  );
};
