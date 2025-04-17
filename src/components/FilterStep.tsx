import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Download, Filter, FileDown, CircleDot, AlertCircle, Info, RefreshCw } from "lucide-react";
import { ConfigData } from './ConfigStep';
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface FilterStepProps {
  onPrev: () => void;
  config: ConfigData;
  onNext: (downloadableInfo?: { total: number, downloadable: number }) => void;
}

interface DeviceData {
  id: string;
  name: string;
  deviceIdentifier: string;
  manufacturerName: string;
  deviceModel: string;
  lastUpdated: string;
  material: string;
  materialDescription: string;
  deviceGroup: string;
  deviceGroupName: string;
  srvStatus: 'started' | 'in progress' | 'completed' | 'none';
  selected: boolean;
  isDownloadable: boolean;
}

const FilterStep: React.FC<FilterStepProps> = ({ onPrev, config, onNext }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [deviceFilter, setDeviceFilter] = useState<string>("");
  const [materialFilter, setMaterialFilter] = useState<string>("");
  const [deviceGroupFilter, setDeviceGroupFilter] = useState<string>("");
  const [srvFilter, setSrvFilter] = useState<string>("all");
  const [devices, setDevices] = useState<DeviceData[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showDownloadWarning, setShowDownloadWarning] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  useEffect(() => {
    const mockDevices = generateMockDevices();
    setDevices(mockDevices);
  }, []);
  
  function generateMockDevices(): DeviceData[] {
    const prefixes: Record<string, string> = {
      fda: "US-",
      ema: "EU-",
      pmda: "JP-",
      anvisa: "BR-",
      nmpa: "CN-",
    };
    
    const prefix = prefixes[config.authority] || "XX-";
    const srvStatuses: Array<'started' | 'in progress' | 'completed' | 'none'> = [
      'started', 'in progress', 'completed', 'none'
    ];
    
    return Array.from({ length: 20 }, (_, i) => {
      const srvStatus = srvStatuses[i % 4];
      return {
        id: `${i + 1}`,
        name: `Medical Device ${i + 1}`,
        deviceIdentifier: `${prefix}${100000 + i}`,
        manufacturerName: `MedTech Corp ${i % 3 ? "Inc." : "LLC"}`,
        deviceModel: `Model ${String.fromCharCode(65 + (i % 26))}-${i % 10}`,
        lastUpdated: new Date(Date.now() - i * 86400000 * (i % 10 + 1)).toISOString().split('T')[0],
        material: `MAT-${1000 + i * 2}`,
        materialDescription: `Medical grade material ${['A', 'B', 'C', 'D'][i % 4]}`,
        deviceGroup: `DG-${100 + i % 5}`,
        deviceGroupName: `${['Implantable', 'Disposable', 'Reusable', 'Electronic', 'Diagnostic'][i % 5]} Devices`,
        srvStatus,
        selected: false,
        isDownloadable: srvStatus === 'completed'
      };
    });
  }

  const isDeviceDownloadable = (device: DeviceData) => {
    return device.srvStatus === 'completed';
  };

  const filteredDevices = devices.filter((device) => {
    const matchesSearch = searchTerm === "" || 
      device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.deviceIdentifier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.manufacturerName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDeviceId = deviceFilter === "" || 
      device.deviceIdentifier.toLowerCase().includes(deviceFilter.toLowerCase());
    
    const matchesMaterial = materialFilter === "" || 
      device.material.toLowerCase().includes(materialFilter.toLowerCase()) || 
      device.materialDescription.toLowerCase().includes(materialFilter.toLowerCase());
    
    const matchesDeviceGroup = deviceGroupFilter === "" || 
      device.deviceGroup.toLowerCase().includes(deviceGroupFilter.toLowerCase()) || 
      device.deviceGroupName.toLowerCase().includes(deviceGroupFilter.toLowerCase());
    
    const matchesSrvStatus = srvFilter === "all" || 
      device.srvStatus === srvFilter;
    
    let matchesTimeFilter = true;
    if (selectedFilter === "recent") {
      const lastUpdateDate = new Date(device.lastUpdated);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      matchesTimeFilter = lastUpdateDate >= thirtyDaysAgo;
    }
    
    return matchesSearch && matchesDeviceId && matchesMaterial && 
           matchesDeviceGroup && matchesSrvStatus && matchesTimeFilter;
  });
  
  useEffect(() => {
    const selectedDevices = devices.filter(d => d.selected);
    const nonDownloadableSelected = selectedDevices.some(d => !d.isDownloadable);
    setShowDownloadWarning(nonDownloadableSelected && selectedDevices.length > 0);
  }, [devices]);
  
  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    setDevices(devices.map(device => ({
      ...device,
      selected: checked && device.isDownloadable
    })));
  };
  
  const handleSelectDevice = (id: string, checked: boolean) => {
    const device = devices.find(d => d.id === id);
    
    if (device && !device.isDownloadable && checked) {
      toast.error("Cannot select device with incomplete SRV calculation", {
        description: "Only devices with completed SRV calculation can be downloaded"
      });
      return;
    }
    
    const updatedDevices = devices.map(device => 
      device.id === id ? { ...device, selected: checked } : device
    );
    setDevices(updatedDevices);
    
    const allDownloadableDevices = updatedDevices.filter(d => d.isDownloadable);
    const allDownloadableSelected = allDownloadableDevices.every(d => d.selected);
    setSelectAll(allDownloadableSelected && allDownloadableDevices.length > 0);
  };
  
  const handleDownload = (isEmpty: boolean = false) => {
    if (!isEmpty && !devices.some(d => d.selected)) {
      toast.error("Please select at least one device to download");
      return;
    }
    
    const selectedDevices = devices.filter(d => d.selected);
    const downloadableDevices = selectedDevices.filter(d => d.isDownloadable);
    
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
    
    const selectedCount = isEmpty ? 0 : downloadableDevices.length;
    
    toast.success(`${isEmpty ? 'Empty' : ''} Excel template downloaded${!isEmpty ? ` for ${selectedCount} devices` : ''}`, {
      description: `${authorityName} - ${templateName}`,
    });
    
    onNext({
      total: selectedDevices.length,
      downloadable: downloadableDevices.length
    });
  };
  
  const handleRefreshData = () => {
    setIsRefreshing(true);
    
    setTimeout(() => {
      const updatedDevices = generateMockDevices().map(newDevice => {
        const existingDevice = devices.find(d => d.id === newDevice.id);
        if (existingDevice) {
          return {
            ...newDevice,
            selected: existingDevice.selected && newDevice.isDownloadable,
          };
        }
        return newDevice;
      });
      
      setDevices(updatedDevices);
      setIsRefreshing(false);
      
      const allDownloadableDevices = updatedDevices.filter(d => d.isDownloadable);
      const allDownloadableSelected = allDownloadableDevices.every(d => d.selected);
      setSelectAll(allDownloadableSelected && allDownloadableDevices.length > 0);
      
      toast.success("Device data refreshed", {
        description: "The table has been updated with the latest device information"
      });
    }, 1000);
  };
  
  const hasSelectedDevices = devices.some(d => d.selected);
  const totalFilteredDevices = filteredDevices.length;
  const downloadableFilteredDevices = filteredDevices.filter(d => d.isDownloadable).length;

  const getSrvStatusIcon = (status: string, isDownloadable: boolean) => {
    switch(status) {
      case 'started':
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center">
                  <CircleDot className="h-4 w-4 text-yellow-500" />
                  <span className="ml-1 capitalize">Started</span>
                  {!isDownloadable && <AlertCircle className="h-3 w-3 ml-1 text-amber-500" />}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>SRV calculation started - Not downloadable</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      case 'in progress':
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center">
                  <CircleDot className="h-4 w-4 text-blue-500" />
                  <span className="ml-1 capitalize">In Progress</span>
                  {!isDownloadable && <AlertCircle className="h-3 w-3 ml-1 text-amber-500" />}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>SRV calculation in progress - Not downloadable</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      case 'completed':
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center">
                  <CircleDot className="h-4 w-4 text-green-500" />
                  <span className="ml-1 capitalize">Completed</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>SRV calculation completed - Ready for download</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      default:
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center">
                  <CircleDot className="h-4 w-4 text-gray-300" />
                  <span className="ml-1">—</span>
                  {!isDownloadable && <AlertCircle className="h-3 w-3 ml-1 text-amber-500" />}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>No SRV calculation - Not downloadable</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
    }
  };
  
  return (
    <div className="max-w-5xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Filter Device Data</CardTitle>
              <CardDescription>
                Select devices to include in your {config.authority.toUpperCase()} submission
              </CardDescription>
            </div>
          </div>
          
          <div className="flex gap-3 mt-4">
            <Button 
              onClick={() => handleDownload(false)} 
              disabled={!hasSelectedDevices}
            >
              <Download className="h-4 w-4 mr-2" />
              Download Excel Template
            </Button>
            <Button 
              variant="outline" 
              onClick={() => handleDownload(true)}
            >
              <FileDown className="h-4 w-4 mr-2" />
              Download Empty Sheet
            </Button>
          </div>
          
          {showDownloadWarning && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Some selected devices cannot be downloaded because their SRV calculation is not completed.
                Only devices with completed SRV calculation will be included in the download.
              </AlertDescription>
            </Alert>
          )}
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
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
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
              <div>
                <Label htmlFor="device-identifier" className="text-sm">Device Identifier</Label>
                <Input
                  id="device-identifier"
                  placeholder="Filter by identifier..."
                  value={deviceFilter}
                  onChange={(e) => setDeviceFilter(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="material" className="text-sm">Material/Description</Label>
                <Input
                  id="material"
                  placeholder="Filter by material..."
                  value={materialFilter}
                  onChange={(e) => setMaterialFilter(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="device-group" className="text-sm">Device Group</Label>
                <Input
                  id="device-group"
                  placeholder="Filter by device group..."
                  value={deviceGroupFilter}
                  onChange={(e) => setDeviceGroupFilter(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2 mt-2">
              <Label htmlFor="srv-filter" className="text-sm whitespace-nowrap">SRV Status:</Label>
              <Select value={srvFilter} onValueChange={setSrvFilter}>
                <SelectTrigger id="srv-filter" className="w-[180px]">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="started">Started</SelectItem>
                  <SelectItem value="in progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="ml-4 flex items-center gap-2">
                <span className="flex items-center gap-1 text-xs">
                  <CircleDot className="h-3 w-3 text-yellow-500" /> Started
                </span>
                <span className="flex items-center gap-1 text-xs">
                  <CircleDot className="h-3 w-3 text-blue-500" /> In Progress
                </span>
                <span className="flex items-center gap-1 text-xs">
                  <CircleDot className="h-3 w-3 text-green-500" /> Completed
                </span>
              </div>
            </div>
            
            <div className="flex items-center mt-2">
              <div className="flex items-center gap-1 text-xs bg-amber-50 border border-amber-200 rounded p-1">
                <Info className="h-3 w-3 text-amber-500" />
                <span>Devices with incomplete SRV calculations cannot be selected for download</span>
              </div>
              <div className="ml-2 text-xs">
                Downloadable devices: {downloadableFilteredDevices} of {totalFilteredDevices}
              </div>
            </div>
          </div>
          
          {/* New section for refresh button right above the table */}
          <div className="flex justify-between items-center mb-4">
            <div className="text-xs text-muted-foreground">
              Downloadable devices: {downloadableFilteredDevices} of {totalFilteredDevices}
            </div>
            <Button 
              variant="outline" 
              onClick={handleRefreshData}
              disabled={isRefreshing}
              className="flex items-center"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh Data
              {isRefreshing && <span className="ml-2 text-xs">Updating...</span>}
            </Button>
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
                  <TableHead>Material</TableHead>
                  <TableHead>Device Group</TableHead>
                  <TableHead>Manufacturer</TableHead>
                  <TableHead>SRV Calculation</TableHead>
                  <TableHead>Last Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDevices.length > 0 ? (
                  filteredDevices.map((device) => (
                    <TableRow 
                      key={device.id}
                      className={!device.isDownloadable ? "opacity-60" : ""}
                    >
                      <TableCell>
                        <Checkbox 
                          checked={device.selected} 
                          onCheckedChange={(checked) => handleSelectDevice(device.id, !!checked)}
                          id={`device-${device.id}`}
                          disabled={!device.isDownloadable}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div>
                            <div>{device.name}</div>
                            <div className="text-xs text-muted-foreground">{device.deviceModel}</div>
                          </div>
                          {!device.isDownloadable && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <AlertCircle className="h-4 w-4 ml-2 text-amber-500" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>This device is not downloadable</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{device.deviceIdentifier}</TableCell>
                      <TableCell>
                        <div>{device.material}</div>
                        <div className="text-xs text-muted-foreground">{device.materialDescription}</div>
                      </TableCell>
                      <TableCell>
                        <div>{device.deviceGroup}</div>
                        <div className="text-xs text-muted-foreground">{device.deviceGroupName}</div>
                      </TableCell>
                      <TableCell>{device.manufacturerName}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {getSrvStatusIcon(device.srvStatus, device.isDownloadable)}
                        </div>
                      </TableCell>
                      <TableCell>{device.lastUpdated}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
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
          <Button onClick={() => onNext()}>
            Next Step
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FilterStep;
