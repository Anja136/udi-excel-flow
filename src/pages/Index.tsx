
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StepIndicator from '@/components/StepIndicator';
import ConfigStep, { ConfigData } from '@/components/ConfigStep';
import FilterStep from '@/components/FilterStep';
import { Toaster } from '@/components/ui/sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, FileDown, History } from 'lucide-react';
import { toast } from 'sonner';

interface DownloadRecord {
  id: string;
  authority: string;
  template: string;
  date: string;
  isEmpty: boolean;
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [visitedSteps, setVisitedSteps] = useState<number[]>([1]);
  const [config, setConfig] = useState<ConfigData>({
    authority: '',
    template: '',
    dataSource: ''
  });
  const [downloadHistory, setDownloadHistory] = useState<DownloadRecord[]>(() => {
    const storedHistory = localStorage.getItem('downloadHistory');
    return storedHistory ? JSON.parse(storedHistory) : [];
  });
  
  const navigate = useNavigate();

  // Save download history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('downloadHistory', JSON.stringify(downloadHistory));
  }, [downloadHistory]);

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
    
    // Add to download history (limit to 20 items)
    const newDownload: DownloadRecord = {
      id: Date.now().toString(),
      authority: config.authority,
      template: config.template,
      date: new Date().toLocaleDateString(),
      isEmpty
    };
    
    setDownloadHistory(prev => {
      const updatedHistory = [newDownload, ...prev].slice(0, 20);
      return updatedHistory;
    });
    
    // Automatically go to step 3 after download
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

          {downloadHistory.length > 0 && (
            <Card className="mt-6 bg-muted/30">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <History className="h-4 w-4 mr-2" />
                  Recent Downloads
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {downloadHistory.slice(0, 3).map((record) => (
                    <div key={record.id} className="flex justify-between items-center p-2 bg-background rounded border">
                      <div>
                        <div className="font-medium">{record.authority.toUpperCase()} - {record.template}</div>
                        <div className="text-xs text-muted-foreground">{record.date}</div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDownload(record.isEmpty)}
                      >
                        <Download className="h-3.5 w-3.5 mr-1" />
                        <span>Download</span>
                      </Button>
                    </div>
                  ))}
                </div>
                {downloadHistory.length > 3 && (
                  <Button 
                    variant="ghost" 
                    className="w-full mt-2" 
                    size="sm"
                    onClick={viewDownloadHistory}
                  >
                    View all {downloadHistory.length} downloads
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      )}
      
      <Toaster />
    </div>
  );
};

export default Index;
