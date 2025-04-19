import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileDown, RefreshCw, CircleDot } from 'lucide-react';
import { ConfigData } from './ConfigStep';
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { DeviceFilters } from './devices/DeviceFilters';
import { DeviceTable } from './devices/DeviceTable';
import { DeviceData } from '@/types/device';
import { generateMockDevices, isDeviceDownloadable } from '@/utils/deviceUtils';

interface FilterStepProps {
  onPrev: () => void;
  config: ConfigData;
  onNext: (downloadableInfo?: { total: number, downloadable: number }) => void;
}

const convertDeviceForTable = (device: DeviceData) => {
  return {
    ...device,
    status: device.srvStatus === 'completed' ? 'Submitted' : 
            device.srvStatus === 'in progress' ? 'Processed' : 
            device.srvStatus === 'started' ? 'Created' : 'Needs Update',
    agencies: [device.manufacturerName], // Add a placeholder agency
  };
};

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
    const mockDevices = generateMockDevices(config);
    setDevices(mockDevices);
  }, []);

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
    
    const matchesSrvStatus = srvFilter === "all" || device.srvStatus === srvFilter;
    
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
  
  const filteredDevicesForTable = filteredDevices.map(convertDeviceForTable);
  const selectedDeviceIds = devices.filter(d => d.selected).map(d => d.id);
  
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
    
    onNext({
      total: selectedDevices.length,
      downloadable: downloadableDevices.length
    });
  };
  
  const handleRefreshData = () => {
    setIsRefreshing(true);
    
    setTimeout(() => {
      const updatedDevices = generateMockDevices(config).map(newDevice => {
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

  const totalFilteredDevices = filteredDevices.length;
  const downloadableFilteredDevices = filteredDevices.filter(d => d.isDownloadable).length;

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
              disabled={!devices.some(d => d.selected)}
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
              <AlertDescription>
                Some selected devices cannot be downloaded because their SRV calculation is not completed.
                Only devices with completed SRV calculation will be included in the download.
              </AlertDescription>
            </Alert>
          )}
        </CardHeader>
        
        <CardContent>
          <DeviceFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            deviceFilter={deviceFilter}
            setDeviceFilter={setDeviceFilter}
            materialFilter={materialFilter}
            setMaterialFilter={setMaterialFilter}
            deviceGroupFilter={deviceGroupFilter}
            setDeviceGroupFilter={setDeviceGroupFilter}
            srvFilter={srvFilter}
            setSrvFilter={setSrvFilter}
            totalFilteredDevices={totalFilteredDevices}
            downloadableFilteredDevices={downloadableFilteredDevices}
          />
          
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
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
          
          <DeviceTable
            filteredDevices={filteredDevicesForTable}
            selectAll={selectAll}
            onSelectAll={handleSelectAll}
            onSelectDevice={handleSelectDevice}
            showCheckboxes={true}
            isAgencyAccessible={true}
            selectedDevices={selectedDeviceIds}
          />
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
