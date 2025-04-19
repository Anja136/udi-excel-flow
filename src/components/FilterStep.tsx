import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from 'lucide-react';
import { toast } from "sonner";
import { ConfigData } from './ConfigStep';
import { DeviceFilters } from './devices/DeviceFilters';
import { DeviceTable } from './devices/DeviceTable';
import { useDeviceFiltering } from '@/hooks/useDeviceFiltering';
import { convertDeviceForTable } from '@/utils/deviceConversion';
import { DownloadSection } from './devices/DownloadSection';
import { StatusLegend } from './devices/StatusLegend';
import { generateMockDevices } from '@/utils/deviceUtils';

interface FilterStepProps {
  onPrev: () => void;
  config: ConfigData;
  onNext: (downloadableInfo?: { total: number, downloadable: number }) => void;
}

const FilterStep: React.FC<FilterStepProps> = ({ onPrev, config, onNext }) => {
  const {
    searchTerm,
    setSearchTerm,
    selectedFilter,
    setSelectedFilter,
    deviceFilter,
    setDeviceFilter,
    materialFilter,
    setMaterialFilter,
    deviceGroupFilter,
    setDeviceGroupFilter,
    srvFilter,
    setSrvFilter,
    devices,
    setDevices,
    selectAll,
    setSelectAll,
    isRefreshing,
    setIsRefreshing,
    filteredDevices
  } = useDeviceFiltering(config);

  const [showDownloadWarning, setShowDownloadWarning] = useState(false);
  
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
      const mockDevices = generateMockDevices(config).map(newDevice => {
        const existingDevice = devices.find(d => d.id === newDevice.id);
        if (existingDevice) {
          return {
            ...newDevice,
            selected: existingDevice.selected && newDevice.isDownloadable,
          };
        }
        return newDevice;
      });
      
      setDevices(mockDevices);
      setIsRefreshing(false);
      
      const allDownloadableDevices = mockDevices.filter(d => d.isDownloadable);
      const allDownloadableSelected = allDownloadableDevices.every(d => d.selected);
      setSelectAll(allDownloadableSelected && allDownloadableDevices.length > 0);
      
      toast.success("Device data refreshed", {
        description: "The table has been updated with the latest device information"
      });
    }, 1000);
  };

  const filteredDevicesForTable = filteredDevices.map(convertDeviceForTable);
  const selectedDeviceIds = devices.filter(d => d.selected).map(d => d.id);
  const totalFilteredDevices = filteredDevices.length;
  const downloadableFilteredDevices = filteredDevices.filter(d => d.isDownloadable).length;

  return (
    <div className="max-w-5xl mx-auto">
      <Card>
        <CardHeader>
          <DownloadSection
            showDownloadWarning={showDownloadWarning}
            onDownload={handleDownload}
            hasSelectedDevices={devices.some(d => d.selected)}
            authority={config.authority}
          />
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
            <StatusLegend />
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
            onSelectAllDevices={handleSelectAll}
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
