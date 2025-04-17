
import React, { useState } from 'react';
import Header from '@/components/Header';
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

  const handleConfigChange = (newConfig: ConfigData) => {
    setConfig(newConfig);
  };

  const goToNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  const goToPrev = () => {
    setCurrentStep(prev => prev - 1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto py-6 px-4">
        <StepIndicator currentStep={currentStep} totalSteps={2} />
        
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
      </main>
      
      <footer className="py-4 px-6 bg-muted text-muted-foreground text-center text-sm">
        UDI Device Data Manager &copy; {new Date().getFullYear()}
      </footer>
      
      <Toaster />
    </div>
  );
};

export default Index;
