
import { useState, useEffect } from 'react';
import { DeviceData } from '@/types/device';
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

  // Define regions and map authorities to regions
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
      // Generate mock devices for different authorities
      const fdaDevices = generateMockDevices({ authority: 'fda', count: 40 });
      const emaDevices = generateMockDevices({ authority: 'ema', count: 35 });
      const pmdaDevices = generateMockDevices({ authority: 'pmda', count: 20 });
      const mhraDevices = generateMockDevices({ authority: 'mhra', count: 15 });
      const tgaDevices = generateMockDevices({ authority: 'tga', count: 10 });
      const healthCanadaDevices = generateMockDevices({ authority: 'health-canada', count: 15 });
      const anvisaDevices = generateMockDevices({ authority: 'anvisa', count: 8 });
      const mfdsDevices = generateMockDevices({ authority: 'mfds', count: 7 });
      
      // Combine all devices
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

      // Add region information to each device
      const devicesWithRegion = allDevices.map(device => {
        const authority = device.deviceIdentifier.split('-')[0];
        return {
          ...device,
          region: regionMap[authority] || 'Other',
          authority: authority
        };
      });
      
      // Calculate summary data
      const byStatus: Record<string, number> = {};
      const byRegion: Record<string, number> = {};
      const byAuthority: Record<string, number> = {};
      
      let errorsCount = 0;
      let pendingCount = 0;
      let completedCount = 0;
      let submittedToday = 0;
      
      const today = new Date().toISOString().split('T')[0];
      
      devicesWithRegion.forEach(device => {
        // Count by status
        byStatus[device.status] = (byStatus[device.status] || 0) + 1;
        
        // Count by region
        byRegion[device.region] = (byRegion[device.region] || 0) + 1;
        
        // Count by authority
        byAuthority[device.authority] = (byAuthority[device.authority] || 0) + 1;
        
        // Count errors
        if (device.status === 'Needs Update') {
          errorsCount++;
        }
        
        // Count pending and completed
        if (device.srvStatus === 'in progress') {
          pendingCount++;
        } else if (device.srvStatus === 'completed') {
          completedCount++;
        }
        
        // Count submitted today
        if (device.lastUpdated.startsWith(today)) {
          submittedToday++;
        }
      });
      
      // Generate recent activity
      const recentActivity = devicesWithRegion.slice(0, 20).map(device => {
        const actions = ['Submitted', 'Updated', 'Approved', 'Rejected', 'Validated'];
        return {
          id: `${device.id}-${Date.now()}`,
          action: actions[Math.floor(Math.random() * actions.length)],
          timestamp: device.lastUpdated,
          status: device.status,
          deviceId: device.deviceIdentifier,
          deviceName: device.name,
          region: device.region
        };
      }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      
      // Set devices and summary
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
