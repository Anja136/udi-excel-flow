
import { UdiRegion } from '@/types/udiRegion';

export const udiRegionsData: UdiRegion[] = [
  {
    id: 'us',
    name: 'United States',
    code: 'US',
    database: 'GUDID',
    status: 'REQUIRED',
    color: '#63e0c7', // Teal
    coordinates: [-98.5795, 39.8283],
    description: 'FDA Global Unique Device Identification Database',
    implementationDate: '2013',
    flagCode: 'us'
  },
  {
    id: 'eu',
    name: 'Europe',
    code: 'EU',
    database: 'EUDAMED',
    status: 'UPCOMING',
    color: '#63e0c7',
    coordinates: [10.4515, 51.1657],
    description: 'European Database on Medical Devices',
    implementationDate: '2026',
    flagCode: 'eu'
  },
  {
    id: 'kr',
    name: 'South Korea',
    code: 'KR',
    database: 'IMDIS',
    status: 'REQUIRED',
    color: '#63e0c7',
    coordinates: [127.7669, 35.9078],
    description: 'Integrated Medical Device Information System',
    implementationDate: '2019',
    flagCode: 'kr'
  },
  {
    id: 'tw',
    name: 'Taiwan',
    code: 'TW',
    database: 'TUDID',
    status: 'REQUIRED',
    color: '#63e0c7',
    coordinates: [120.9605, 23.6978],
    description: 'Taiwan Unique Device Identification Database',
    implementationDate: '2021',
    flagCode: 'tw'
  },
  {
    id: 'cn',
    name: 'China',
    code: 'CN',
    database: 'CUDID',
    status: 'REQUIRED',
    color: '#63e0c7',
    coordinates: [104.1954, 35.8617],
    description: 'China Unique Device Identification Database',
    implementationDate: '2019',
    flagCode: 'cn'
  },
  {
    id: 'au',
    name: 'Australia',
    code: 'AU',
    database: 'AusUDID',
    status: 'IN_PROCESS',
    color: '#b8b8b8', // Gray for in process
    coordinates: [133.7751, -25.2744],
    description: 'Australian Unique Device Identification Database',
    implementationDate: 'In development',
    flagCode: 'au'
  },
  {
    id: 'sa',
    name: 'Saudi Arabia',
    code: 'SA',
    database: 'Saudi-DI',
    status: 'REQUIRED',
    color: '#63e0c7',
    coordinates: [45.0792, 23.8859],
    description: 'Saudi Arabia Device Identification System',
    implementationDate: '2020',
    flagCode: 'sa'
  }
];

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'REQUIRED':
      return '#63e0c7'; // Teal color for required
    case 'UPCOMING':
      return '#63a6e0'; // Blue for upcoming
    case 'IN_PROCESS':
      return '#b8b8b8'; // Gray for in process
    default:
      return '#4b5563'; // Dark gray for not required
  }
};

export const getStatusText = (status: string): string => {
  switch (status) {
    case 'REQUIRED':
      return 'Yes';
    case 'UPCOMING':
      return 'Yes (from 2026)';
    case 'IN_PROCESS':
      return 'In Process';
    default:
      return 'No';
  }
};
