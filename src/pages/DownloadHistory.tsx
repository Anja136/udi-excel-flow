
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, FileDown, Calendar, Building, User, DownloadCloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface DownloadRecord {
  id: string;
  authority: string;
  template: string;
  date: string;
  isEmpty: boolean;
  user: string;
}

const DownloadHistory = () => {
  // Comprehensive dummy data for download history
  const [downloadHistory, setDownloadHistory] = React.useState<DownloadRecord[]>(() => {
    const mockDownloads: DownloadRecord[] = [
      {
        id: '1',
        authority: 'fda',
        template: 'template1',
        date: '2025-04-15',
        isEmpty: false,
        user: 'John Doe'
      },
      {
        id: '2',
        authority: 'ema',
        template: 'template2',
        date: '2025-04-14',
        isEmpty: true,
        user: 'Jane Smith'
      },
      {
        id: '3',
        authority: 'pmda',
        template: 'template3',
        date: '2025-04-13',
        isEmpty: false,
        user: 'Alex Johnson'
      },
      {
        id: '4',
        authority: 'anvisa',
        template: 'template4',
        date: '2025-04-12',
        isEmpty: false,
        user: 'Maria Rodriguez'
      },
      {
        id: '5',
        authority: 'nmpa',
        template: 'template1',
        date: '2025-04-11',
        isEmpty: true,
        user: 'David Kim'
      },
      {
        id: '6',
        authority: 'fda',
        template: 'template2',
        date: '2025-04-10',
        isEmpty: false,
        user: 'Sarah Lee'
      },
      {
        id: '7',
        authority: 'ema',
        template: 'template3',
        date: '2025-04-09',
        isEmpty: true,
        user: 'Michael Chen'
      },
      {
        id: '8',
        authority: 'pmda',
        template: 'template4',
        date: '2025-04-08',
        isEmpty: false,
        user: 'Emily Watson'
      },
      {
        id: '9',
        authority: 'anvisa',
        template: 'template1',
        date: '2025-04-07',
        isEmpty: true,
        user: 'Carlos Mendes'
      },
      {
        id: '10',
        authority: 'nmpa',
        template: 'template2',
        date: '2025-04-06',
        isEmpty: false,
        user: 'Anna Petrova'
      }
    ];

    // Store in localStorage
    localStorage.setItem('downloadHistory', JSON.stringify(mockDownloads));
    return mockDownloads;
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

  const getFormattedAuthorityName = (authorityCode: string) => {
    return {
      fda: "FDA",
      ema: "EMA",
      pmda: "PMDA",
      anvisa: "ANVISA",
      nmpa: "NMPA",
    }[authorityCode] || "Unknown";
  };

  const getFormattedTemplateName = (templateCode: string) => {
    return {
      template1: "UDI-DI Template",
      template2: "Basic Device Information",
      template3: "Full Device Details",
      template4: "Package Labeling Template",
    }[templateCode] || "Unknown";
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

      {downloadHistory.length > 0 ? (
        <div className="rounded-md border">
          <Table>
            <TableCaption>A list of your recently downloaded templates.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Template</TableHead>
                <TableHead>Agency</TableHead>
                <TableHead>Downloaded By</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {downloadHistory.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">
                    {getFormattedTemplateName(record.template)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      {getFormattedAuthorityName(record.authority)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {record.user}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {record.date}
                    </div>
                  </TableCell>
                  <TableCell>{record.isEmpty ? 'Empty Sheet' : 'Template with Data'}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDownload(record)}
                    >
                      {record.isEmpty ? (
                        <><FileDown className="h-4 w-4 mr-2" /> Download</>
                      ) : (
                        <><Download className="h-4 w-4 mr-2" /> Download</>
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-8 bg-muted/50 rounded-lg">
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

      {downloadHistory.length > 0 && (
        <div className="mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default DownloadHistory;
