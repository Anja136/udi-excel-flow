
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Download, Filter, FileDown } from "lucide-react";
import { ConfigData } from './ConfigStep';
import { toast } from "sonner";

interface FilterStepProps {
  onPrev: () => void;
  config: ConfigData;
  onNext: () => void;
}

interface DeviceData {
  id: string;
  name: string;
  deviceIdentifier: string;
  manufacturerName: string;
  deviceModel: string;
  lastUpdated: string;
  selected: boolean;
}

const FilterStep: React.FC<FilterStepProps> = ({ onPrev, config, onNext }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [devices, setDevices] = useState<DeviceData[]>(generateMockDevices());
  const [selectAll, setSelectAll] = useState(false);
  
  // Generate mock data based on the selected authority
  function generateMockDevices(): DeviceData[] {
    const prefixes: Record<string, string> = {
      fda: "US-",
      ema: "EU-",
      pmda: "JP-",
      anvisa: "BR-",
      nmpa: "CN-",
    };
    
    const prefix = prefixes[config.authority] || "XX-";
    
    return Array.from({ length: 20 }, (_, i) => ({
      id: `${i + 1}`,
      name: `Medical Device ${i + 1}`,
      deviceIdentifier: `${prefix}${100000 + i}`,
      manufacturerName: `MedTech Corp ${i % 3 ? "Inc." : "LLC"}`,
      deviceModel: `Model ${String.fromCharCode(65 + (i % 26))}-${i % 10}`,
      lastUpdated: new Date(Date.now() - i * 86400000 * (i % 10 + 1)).toISOString().split('T')[0],
      selected: false
    }));
  }

  const filteredDevices = devices.filter((device) => {
    const matchesSearch = searchTerm === "" || 
      device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.deviceIdentifier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.manufacturerName.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedFilter === "all") return matchesSearch;
    if (selectedFilter === "recent") {
      const lastUpdateDate = new Date(device.lastUpdated);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return matchesSearch && lastUpdateDate >= thirtyDaysAgo;
    }
    return matchesSearch;
  });
  
  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    setDevices(devices.map(device => ({
      ...device,
      selected: checked
    })));
  };
  
  const handleSelectDevice = (id: string, checked: boolean) => {
    const updatedDevices = devices.map(device => 
      device.id === id ? { ...device, selected: checked } : device
    );
    setDevices(updatedDevices);
    setSelectAll(updatedDevices.every(d => d.selected));
  };
  
  const handleDownload = (isEmpty: boolean = false) => {
    if (!isEmpty && !devices.some(d => d.selected)) {
      toast.error("Please select at least one device to download");
      return;
    }
    
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
    
    const selectedCount = isEmpty ? 0 : devices.filter(d => d.selected).length;
    
    toast.success(`${isEmpty ? 'Empty' : ''} Excel template downloaded${!isEmpty ? ` for ${selectedCount} devices` : ''}`, {
      description: `${authorityName} - ${templateName}`,
    });
    
    // Proceed to next step
    onNext();
  };
  
  return (
    <div className="max-w-5xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Filter Device Data</CardTitle>
          <CardDescription>
            Select devices to include in your {config.authority.toUpperCase()} submission
          </CardDescription>
          <div className="flex flex-wrap gap-3 mt-4">
            <Button onClick={() => handleDownload(false)} disabled={!devices.some(d => d.selected)}>
              <Download className="h-4 w-4 mr-2" />
              Download Excel Template
            </Button>
            <Button variant="outline" onClick={() => handleDownload(true)}>
              <FileDown className="h-4 w-4 mr-2" />
              Download Empty Sheet
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search devices..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedFilter === "all" ? "default" : "outline"}
                onClick={() => setSelectedFilter("all")}
              >
                All Devices
              </Button>
              <Button
                variant={selectedFilter === "recent" ? "default" : "outline"}
                onClick={() => setSelectedFilter("recent")}
              >
                <Filter className="h-4 w-4 mr-2" />
                Recent Updates
              </Button>
            </div>
          </div>
          
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox 
                      checked={selectAll} 
                      onCheckedChange={handleSelectAll}
                      id="select-all"
                    />
                  </TableHead>
                  <TableHead>Device Name</TableHead>
                  <TableHead>UDI Identifier</TableHead>
                  <TableHead>Manufacturer</TableHead>
                  <TableHead>Last Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDevices.length > 0 ? (
                  filteredDevices.map((device) => (
                    <TableRow key={device.id}>
                      <TableCell>
                        <Checkbox 
                          checked={device.selected} 
                          onCheckedChange={(checked) => handleSelectDevice(device.id, !!checked)}
                          id={`device-${device.id}`}
                        />
                      </TableCell>
                      <TableCell>{device.name}</TableCell>
                      <TableCell>{device.deviceIdentifier}</TableCell>
                      <TableCell>{device.manufacturerName}</TableCell>
                      <TableCell>{device.lastUpdated}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No devices match your filter criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onPrev}>
            Previous Step
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FilterStep;
