import { useState, useEffect } from 'react';
import { DeviceData, DeviceStatus } from '@/types/device';
import { generateMockDevices } from '@/utils/deviceUtils';

export interface DeviceReportSummary {
  totalDevices: number;
  byStatus: Record<string, number>;
  byRegion: Record<string, number>;
  byAuthority: Record<string, number>;
  errorsCount: number;
  pendingCount: number;
  completedCount: number;
  submittedToday: number;
  recentActivity: Array<{
    id: string;
    action: string;
    timestamp: string;
    status: string;
    deviceId: string;
    deviceName: string;
    region: string;
  }>;
}

export const useDeviceReportData = () => {
  const [devices, setDevices] = useState<DeviceData[]>([]);
  const [summary, setSummary] = useState<DeviceReportSummary>({
    totalDevices: 0,
    byStatus: {},
    byRegion: {},
    byAuthority: {},
    errorsCount: 0,
    pendingCount: 0,
    completedCount: 0,
    submittedToday: 0,
    recentActivity: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const regionMap: Record<string, string> = {
    'fda': 'North America',
    'health-canada': 'North America',
    'ema': 'Europe',
    'mhra': 'Europe',
    'pmda': 'Asia',
    'tga': 'Oceania',
    'anvisa': 'South America',
    'mfds': 'Asia',
    'sfda': 'Asia',
    'cdsco': 'Asia'
  };

  useEffect(() => {
    try {
      const generateDevicesForAuthority = (authority: string, count: number) => {
        return generateMockDevices({ authority })
          .slice(0, count);
      };

      const fdaDevices = generateDevicesForAuthority('fda', 40);
      const emaDevices = generateDevicesForAuthority('ema', 35);
      const pmdaDevices = generateDevicesForAuthority('pmda', 20);
      const mhraDevices = generateDevicesForAuthority('mhra', 15);
      const tgaDevices = generateDevicesForAuthority('tga', 10);
      const healthCanadaDevices = generateDevicesForAuthority('health-canada', 15);
      const anvisaDevices = generateDevicesForAuthority('anvisa', 8);
      const mfdsDevices = generateDevicesForAuthority('mfds', 7);

      const allDevices = [
        ...fdaDevices, 
        ...emaDevices, 
        ...pmdaDevices,
        ...mhraDevices,
        ...tgaDevices,
        ...healthCanadaDevices,
        ...anvisaDevices,
        ...mfdsDevices
      ];

      const devicesWithRegion = allDevices.map(device => {
        const authority = device.deviceIdentifier.split('-')[0];
        return {
          ...device,
          region: regionMap[authority] || 'Other',
          authority: authority
        };
      });

      const byStatus: Record<string, number> = {};
      const byRegion: Record<string, number> = {};
      const byAuthority: Record<string, number> = {};
      
      let errorsCount = 0;
      let pendingCount = 0;
      let completedCount = 0;
      let submittedToday = 0;
      
      const today = new Date().toISOString().split('T')[0];
      
      devicesWithRegion.forEach(device => {
        byStatus[device.status] = (byStatus[device.status] || 0) + 1;
        
        byRegion[device.region] = (byRegion[device.region] || 0) + 1;
        
        byAuthority[device.authority] = (byAuthority[device.authority] || 0) + 1;
        
        if (device.status === 'Needs Update') {
          errorsCount++;
        }
        
        if (device.srvStatus === 'in progress') {
          pendingCount++;
        } else if (device.srvStatus === 'completed') {
          completedCount++;
        }
        
        if (device.lastUpdated.startsWith(today)) {
          submittedToday++;
        }
      });

      const recentActivity = devicesWithRegion.slice(0, 20).map(device => ({
        id: `${device.id}-${Date.now()}`,
        action: ['Submitted', 'Updated', 'Approved', 'Rejected', 'Validated'][Math.floor(Math.random() * 5)],
        timestamp: device.lastUpdated,
        status: device.status,
        deviceId: device.deviceIdentifier,
        deviceName: device.name,
        region: device.region
      })).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

      setDevices(devicesWithRegion);
      setSummary({
        totalDevices: devicesWithRegion.length,
        byStatus,
        byRegion,
        byAuthority,
        errorsCount,
        pendingCount,
        completedCount,
        submittedToday,
        recentActivity
      });

      setIsLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error loading device data'));
      setIsLoading(false);
    }
  }, []);

  return { devices, summary, isLoading, error };
};
