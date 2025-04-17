
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, FileDown, Calendar, DownloadCloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

interface DownloadRecord {
  id: string;
  authority: string;
  template: string;
  date: string;
  isEmpty: boolean;
}

const DownloadHistory = () => {
  // In a real app, this would come from a database or persistent storage
  const [downloadHistory, setDownloadHistory] = React.useState<DownloadRecord[]>(() => {
    const storedHistory = localStorage.getItem('downloadHistory');
    return storedHistory ? JSON.parse(storedHistory) : [];
  });
  
  const navigate = useNavigate();

  const handleDownload = (record: DownloadRecord) => {
    const authorityName = {
      fda: "FDA",
      ema: "EMA",
      pmda: "PMDA",
      anvisa: "ANVISA",
      nmpa: "NMPA",
    }[record.authority] || "Unknown";
    
    const templateName = {
      template1: "UDI-DI Template",
      template2: "Basic Device Information",
      template3: "Full Device Details",
      template4: "Package Labeling Template",
    }[record.template] || "Unknown";
    
    toast.success(`${record.isEmpty ? 'Empty' : ''} Excel template downloaded`, {
      description: `${authorityName} - ${templateName}`,
    });
  };

  return (
    <div className="flex-1 py-6 px-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Download History</h1>
          <p className="text-muted-foreground">Your recent downloaded templates and sheets</p>
        </div>
        <Button onClick={() => navigate('/')}>
          <DownloadCloud className="h-4 w-4 mr-2" />
          Download New Template
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {downloadHistory.length > 0 ? (
          downloadHistory.map((record) => (
            <Card key={record.id} className="shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">
                    {record.authority.toUpperCase()}
                  </CardTitle>
                  <div className="text-xs flex items-center text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    {record.date}
                  </div>
                </div>
                <CardDescription>{record.template}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="text-sm text-muted-foreground">
                  {record.isEmpty ? 'Empty template' : 'Template with data'}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => handleDownload(record)}
                >
                  {record.isEmpty ? (
                    <><FileDown className="h-4 w-4 mr-2" /> Download Empty Sheet</>
                  ) : (
                    <><Download className="h-4 w-4 mr-2" /> Download Template</>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center p-8 bg-muted/50 rounded-lg">
            <DownloadCloud className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No download history</h3>
            <p className="text-muted-foreground text-center mt-2">
              Your downloaded templates will appear here.
              Start by downloading your first template.
            </p>
            <Button 
              className="mt-4" 
              onClick={() => navigate('/')}
            >
              Download Template
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DownloadHistory;
