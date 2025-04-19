
import React from 'react';
import { Button } from "@/components/ui/button";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Download, FileDown } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

interface DownloadSectionProps {
  showDownloadWarning: boolean;
  onDownload: (isEmpty: boolean) => void;
  hasSelectedDevices: boolean;
  authority: string;
}

export const DownloadSection: React.FC<DownloadSectionProps> = ({
  showDownloadWarning,
  onDownload,
  hasSelectedDevices,
  authority
}) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <CardTitle>Filter Device Data</CardTitle>
          <CardDescription>
            Select devices to include in your {authority.toUpperCase()} submission
          </CardDescription>
        </div>
      </div>
      
      <div className="flex gap-3 mt-4">
        <Button 
          onClick={() => onDownload(false)} 
          disabled={!hasSelectedDevices}
        >
          <Download className="h-4 w-4 mr-2" />
          Download Excel Template
        </Button>
        <Button 
          variant="outline" 
          onClick={() => onDownload(true)}
        >
          <FileDown className="h-4 w-4 mr-2" />
          Download Empty Sheet
        </Button>
      </div>
      
      {showDownloadWarning && (
        <Alert variant="destructive" className="mt-4">
          <AlertDescription>
            Some selected devices cannot be downloaded because their SRV calculation is not completed.
            Only devices with completed SRV calculation will be included in the download.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

