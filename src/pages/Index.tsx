
import React, { useState, useEffect } from 'react';
import StepIndicator from '@/components/StepIndicator';
import ConfigStep, { ConfigData } from '@/components/ConfigStep';
import FilterStep from '@/components/FilterStep';
import { Toaster } from '@/components/ui/sonner';
import { Button } from '@/components/ui/button';
import { Download, FileDown } from 'lucide-react';
import { toast } from 'sonner';

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [visitedSteps, setVisitedSteps] = useState<number[]>([1]);
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
    const nextStep = Math.min(currentStep + 1, totalSteps);
    setCurrentStep(nextStep);
    updateVisitedSteps(nextStep);
  };

  const goToPrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const goToStep = (step: number) => {
    setCurrentStep(Math.max(1, Math.min(step, totalSteps)));
    updateVisitedSteps(step);
  };

  const updateVisitedSteps = (step: number) => {
    if (!visitedSteps.includes(step)) {
      setVisitedSteps(prev => [...prev, step]);
    }
  };

  const handleDownload = (isEmpty: boolean = false) => {
    // In a real app, this would call an API to generate the Excel file
    const authorityName = {
      fda: "FDA",
      ema: "EMA",
      pmda: "PMDA",
      anvisa: "ANVISA",
      nmpa: "NMPA",
    }[config.authority] || "Unknown";
    
    const templateName = {
      template1: "UDI-DI Template",
      template2: "Basic Device Information",
      template3: "Full Device Details",
      template4: "Package Labeling Template",
    }[config.template] || "Unknown";
    
    toast.success(`${isEmpty ? 'Empty' : ''} Excel template downloaded`, {
      description: `${authorityName} - ${templateName}`,
    });
    
    // Automatically go to step 3 after download
    goToStep(3);
  };

  return (
    <div className="flex-1 py-6 px-4">
      <h1 className="text-2xl font-bold mb-6">Download UDI Device Data</h1>
      
      <StepIndicator 
        currentStep={currentStep} 
        totalSteps={totalSteps} 
        stepLabels={stepLabels}
        onStepClick={goToStep}
        visitedSteps={visitedSteps}
      />
      
      {currentStep === 1 && (
        <ConfigStep 
          onNext={goToNext} 
          onConfigChange={handleConfigChange}
          config={config}
        />
      )}
      
      {currentStep === 2 && (
        <>
          <div className="flex justify-center gap-3 mb-6">
            <Button onClick={() => handleDownload(false)}>
              <Download className="h-4 w-4 mr-2" />
              Download Excel Template
            </Button>
            <Button variant="outline" onClick={() => handleDownload(true)}>
              <FileDown className="h-4 w-4 mr-2" />
              Download Empty Sheet
            </Button>
          </div>
          
          <FilterStep 
            onPrev={goToPrev}
            onNext={goToNext} 
            config={config}
          />
        </>
      )}
      
      {currentStep === 3 && (
        <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
          <h2 className="text-xl font-medium mb-4">Download UDI Data</h2>
          <p className="mb-4">Your UDI data is ready for download.</p>
          <div className="mb-4">
            <p className="font-medium">Configuration:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>Authority: {config.authority.toUpperCase()}</li>
              <li>Template: {config.template}</li>
              <li>Selected Devices: {currentStep === 3 ? "Ready to download" : "None selected"}</li>
            </ul>
          </div>
          
          <div className="flex flex-wrap gap-3 mb-6">
            <Button onClick={() => handleDownload(false)}>
              <Download className="h-4 w-4 mr-2" />
              Download Excel Template
            </Button>
            <Button variant="outline" onClick={() => handleDownload(true)}>
              <FileDown className="h-4 w-4 mr-2" />
              Download Empty Sheet
            </Button>
          </div>
          
          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={() => goToStep(2)}>
              Back to Select Devices
            </Button>
            <Button variant="outline" onClick={() => goToStep(1)}>
              Back to Select Sheet
            </Button>
          </div>
        </div>
      )}
      
      <Toaster />
    </div>
  );
};

export default Index;
