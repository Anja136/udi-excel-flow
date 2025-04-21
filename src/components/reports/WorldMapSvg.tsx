
import React from 'react';
import { UdiRegion } from '@/types/udiRegion';

interface WorldMapSvgProps {
  regions: UdiRegion[];
  onRegionClick: (region: UdiRegion) => void;
}

const WorldMapSvg = ({ regions, onRegionClick }: WorldMapSvgProps) => {
  return (
    <svg
      viewBox="0 0 2000 1000"
      className="w-full h-full"
      style={{ background: '#1A1F2C' }}
    >
      {/* Base world map path - simplified version */}
      <path
        d="M1489.7 320.9l-31.6-7.1-22.2 10.7-36 .9-18.7-14.2-18.7 8.9-17.8-10.7-13.3 7.1-15.1-8.9-15.1 8.9-34.2-14.2-16-8.9-42.2-8.9-24 8.9-23.1-7.1-17.8 14.2-24 3.6-20.5-7.1-13.3 10.7-42.2-5.3-35.6 17.8-106.7-3.6-42.2 14.2-28.4-5.3-28.4 7.1-44.4-5.3-17.8 5.3-95.1-10.7-82.7-17.8-47.6 3.6-48.9-5.3-59.6-14.2-39.1 7.1-23.1-3.6-32.4-14.2L305.6 287l-44-8.9-48.9 1.8-40.9-7.1-44 5.3-25.8-5.3L77.3 287l-28.4 10.7-31.6 5.3v160l68.4 28.4 15.1 14.2 20.5 5.3 32.4 21.3 37.8 14.2 40 1.8 53.3 10.7 47.6 10.7 25.8 14.2 42.2 10.7 42.2 3.6 53.3 10.7 44 14.2 48.9 10.7 42.2 3.6 42.2 10.7 31.6 14.2 15.1 14.2 20.5 14.2 47.6 5.3 68.4 14.2 40 14.2 40 10.7 59.6 10.7 40 14.2 40 10.7 40 5.3 47.6 10.7 53.3 5.3 42.2 10.7 31.6 14.2 42.2 10.7 31.6 14.2 25.8 14.2 40 10.7 47.6 5.3 42.2 10.7 20.5 14.2 31.6 14.2 44 10.7 31.6 14.2 25.8 14.2 31.6 10.7 40 5.3 53.3 10.7 47.6 10.7 25.8 14.2 15.1 14.2 25.8 14.2 40 10.7 47.6 5.3v-640l-31.6-10.7z"
        fill="#2C3E50"
        stroke="#1A1F2C"
        strokeWidth="2"
      />
      
      {/* Highlighted regions */}
      {regions.map((region) => {
        // Define path data for each region (simplified)
        const regionPaths: Record<string, string> = {
          us: "M255.1 220.3l-42.2 10.7-40 1.8-53.3 10.7-47.6 10.7-25.8 14.2h400v-60l-31.6-10.7-40-5.3-44-8.9-48.9 1.8z",
          eu: "M950 200l-40 14.2-40 10.7-59.6 10.7-40 14.2-40 10.7-40 5.3h400v-80l-31.6-10.7-40-5.3z",
          cn: "M1300 250l-42.2 10.7-31.6 14.2-42.2 10.7-31.6 14.2h300v-60l-31.6-10.7-40-5.3-44-8.9z",
          kr: "M1450 270l-20.5 14.2-31.6 14.2h100v-40l-31.6-10.7z",
          tw: "M1400 350l-15.1 14.2-20.5 14.2h80v-40l-31.6-10.7z",
          sa: "M900 400l-31.6 14.2-25.8 14.2h120v-40l-31.6-10.7z",
          au: "M1400 600l-47.6 10.7-25.8 14.2-15.1 14.2h200v-50l-31.6-10.7-40-5.3z"
        };

        if (!regionPaths[region.id]) return null;

        return (
          <g key={region.id} onClick={() => onRegionClick(region)} style={{ cursor: 'pointer' }}>
            <path
              d={regionPaths[region.id]}
              fill={region.color}
              stroke="#fff"
              strokeWidth="1"
            />
            {/* Add flag marker */}
            {region.flagCode && (
              <text
                x={region.coordinates[0]}
                y={region.coordinates[1]}
                className="text-xs"
                fill="#fff"
              >
                🏳️
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
};

export default WorldMapSvg;
