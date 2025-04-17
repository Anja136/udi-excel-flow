
import React, { useState } from 'react';
import StepIndicator from '@/components/StepIndicator';
import ConfigStep, { ConfigData } from '@/components/ConfigStep';
import FilterStep from '@/components/FilterStep';
import { Toaster } from '@/components/ui/sonner';

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [config, setConfig] = useState<ConfigData>({
    authority: '',
    template: '',
    dataSource: ''
  });

  const stepLabels = [
    "Select Sheet",
    "Select Devices",
    "Download Sheet"
  ];
  
  const totalSteps = stepLabels.length;

  const handleConfigChange = (newConfig: ConfigData) => {
    setConfig(newConfig);
  };

  const goToNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  };

  const goToPrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  return (
    <div className="flex-1 py-6 px-4">
      <h1 className="text-2xl font-bold mb-6">Download UDI Device Data</h1>
      
      <StepIndicator 
        currentStep={currentStep} 
        totalSteps={totalSteps} 
        stepLabels={stepLabels}
      />
      
      {currentStep === 1 && (
        <ConfigStep 
          onNext={goToNext} 
          onConfigChange={handleConfigChange}
          config={config}
        />
      )}
      
      {currentStep === 2 && (
        <FilterStep 
          onPrev={goToPrev} 
          config={config}
        />
      )}
      
      {currentStep === 3 && (
        <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
          <h2 className="text-xl font-medium mb-4">Download UDI Data</h2>
          <p className="mb-4">Your UDI data is ready for download.</p>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Excel Sheet
          </button>
        </div>
      )}
      
      <Toaster />
    </div>
  );
};

export default Index;
