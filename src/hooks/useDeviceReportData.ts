
import { useState, useEffect } from 'react';
import { DeviceData } from '@/types/device';
import { generateMockDevices } from '@/utils/deviceUtils';

export const useDeviceReportData = () => {
  const [devices, setDevices] = useState<DeviceData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      // Get data for multiple authorities to show more varied data
      const fdaDevices = generateMockDevices({ authority: 'fda' });
      const emaDevices = generateMockDevices({ authority: 'ema' });
      const pmdaDevices = generateMockDevices({ authority: 'pmda' });
      
      // Combine all devices
      const allDevices = [...fdaDevices, ...emaDevices, ...pmdaDevices];
      
      setDevices(allDevices);
      setIsLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error loading device data'));
      setIsLoading(false);
    }
  }, []);

  return { devices, isLoading, error };
};
