
import { useState, useEffect } from 'react';
import { DeviceData } from '@/types/device';
import { generateMockDevices } from '@/utils/deviceUtils';
import { ConfigData } from '@/components/ConfigStep';

export const useDeviceFiltering = (config: ConfigData) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [deviceFilter, setDeviceFilter] = useState<string>("");
  const [materialFilter, setMaterialFilter] = useState<string>("");
  const [deviceGroupFilter, setDeviceGroupFilter] = useState<string>("");
  const [srvFilter, setSrvFilter] = useState<string>("all");
  const [devices, setDevices] = useState<DeviceData[]>([]);
  const [selectAll, setSelectAll] = useState(false);
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

  return {
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
  };
};

