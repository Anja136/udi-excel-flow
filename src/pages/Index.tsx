
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StepIndicator from '@/components/StepIndicator';
import ConfigStep, { ConfigData } from '@/components/ConfigStep';
import FilterStep from '@/components/FilterStep';
import DownloadStep from '@/components/DownloadStep';
import { Toaster } from '@/components/ui/sonner';
import { Button } from '@/components/ui/button';
import { History } from 'lucide-react';
import { useDownloadHistory } from '@/hooks/useDownloadHistory';

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [visitedSteps, setVisitedSteps] = useState<number[]>([1]);
  const [config, setConfig] = useState<ConfigData>({
    authority: '',
    template: '',
    dataSource: ''
  });
  const [downloadableInfo, setDownloadableInfo] = useState<{ total: number, downloadable: number } | undefined>();
  
  const navigate = useNavigate();
  const { downloadHistory, addDownloadRecord } = useDownloadHistory();

  const stepLabels = [
    "Select Sheet",
    "Select Devices",
    "Download Sheet"
  ];
  
  const totalSteps = stepLabels.length;

  const handleConfigChange = (newConfig: ConfigData) => {
    setConfig(newConfig);
  };

  const goToNext = (info?: { total: number, downloadable: number }) => {
    if (info) {
      setDownloadableInfo(info);
    }
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
    addDownloadRecord(config, isEmpty);
    goToStep(3);
  };

  const viewDownloadHistory = () => {
    navigate('/download-history');
  };

  return (
    <div className="flex-1 py-6 px-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Download UDI Device Data</h1>
        {downloadHistory.length > 0 && (
          <Button variant="outline" onClick={viewDownloadHistory}>
            <History className="h-4 w-4 mr-2" />
            View Download History
          </Button>
        )}
      </div>
      
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
        <FilterStep 
          onPrev={goToPrev}
          onNext={goToNext} 
          config={config}
        />
      )}
      
      {currentStep === 3 && (
        <DownloadStep 
          config={config}
          onPrevStep={goToStep}
          onDownload={handleDownload}
          hasDownloadHistory={downloadHistory.length > 0}
          onViewHistory={viewDownloadHistory}
          downloadableInfo={downloadableInfo}
        />
      )}
      
      <Toaster />
    </div>
  );
};

export default Index;
