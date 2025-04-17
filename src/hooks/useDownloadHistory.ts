
import { useState, useEffect } from 'react';
import { ConfigData } from '@/components/ConfigStep';
import { toast } from 'sonner';

export interface DownloadRecord {
  id: string;
  authority: string;
  template: string;
  date: string;
  isEmpty: boolean;
}

export const useDownloadHistory = () => {
  const [downloadHistory, setDownloadHistory] = useState<DownloadRecord[]>(() => {
    const storedHistory = localStorage.getItem('downloadHistory');
    return storedHistory ? JSON.parse(storedHistory) : [];
  });

  useEffect(() => {
    localStorage.setItem('downloadHistory', JSON.stringify(downloadHistory));
  }, [downloadHistory]);

  const addDownloadRecord = (config: ConfigData, isEmpty: boolean) => {
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
  };

  return {
    downloadHistory,
    addDownloadRecord,
  };
};
