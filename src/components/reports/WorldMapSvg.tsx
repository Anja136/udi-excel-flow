
import React from 'react';
import { UdiRegion } from '@/types/udiRegion';

interface WorldMapSvgProps {
  regions: UdiRegion[];
  onRegionClick: (region: UdiRegion) => void;
}

const WorldMapSvg = ({ regions, onRegionClick }: WorldMapSvgProps) => {
  return (
    <svg
      viewBox="0 0 1000 500"
      className="w-full h-full"
      style={{ background: '#0b1628' }}
    >
      {/* Base world map with simplified continent outlines */}
      <g className="world-base">
        {/* North America */}
        <path
          d="M148,120 L216,120 L270,170 L280,220 L260,230 L250,280 L235,290 L220,310 L200,310 L180,330 L165,320 L158,280 L130,270 L125,250 L145,230 L140,200 L120,180 L105,160 L105,140 L115,130 Z"
          fill="#3f4d5e" stroke="#1d2939" strokeWidth="1"
        />
        
        {/* South America */}
        <path
          d="M235,310 L250,330 L270,350 L280,375 L275,395 L260,410 L250,415 L235,430 L218,430 L210,420 L225,400 L220,380 L225,360 L220,340 L225,325 Z"
          fill="#3f4d5e" stroke="#1d2939" strokeWidth="1"
        />
        
        {/* Europe */}
        <path
          d="M430,125 L490,115 L515,140 L490,160 L480,190 L450,195 L445,180 L425,170 L420,155 L435,140 Z"
          fill="#3f4d5e" stroke="#1d2939" strokeWidth="1"
        />
        
        {/* Africa */}
        <path
          d="M445,200 L485,195 L520,195 L545,230 L550,260 L535,280 L520,310 L490,330 L470,330 L465,310 L450,300 L430,290 L410,255 L420,230 L435,210 Z"
          fill="#3f4d5e" stroke="#1d2939" strokeWidth="1"
        />
        
        {/* Asia */}
        <path
          d="M515,140 L545,120 L580,110 L630,115 L670,130 L700,155 L720,160 L740,175 L760,175 L750,200 L735,220 L720,240 L710,250 L680,245 L660,240 L645,235 L610,260 L590,260 L570,255 L560,230 L545,230 L520,195 L485,195 L480,190 L490,160 Z"
          fill="#3f4d5e" stroke="#1d2939" strokeWidth="1"
        />
        
        {/* Australia */}
        <path
          d="M780,330 L825,330 L845,345 L850,370 L830,385 L800,390 L775,370 L775,345 Z"
          fill="#3f4d5e" stroke="#1d2939" strokeWidth="1"
        />
      </g>

      {/* Highlighted regions */}
      {regions.map((region) => {
        // Get regional path data
        const getRegionPath = (id: string) => {
          switch (id) {
            case 'us':
              return "M148,120 L216,120 L270,170 L280,220 L260,230 L250,280 L235,290 L220,310 L200,310 L180,330 L165,320 L158,280 L130,270 L125,250 L145,230 L140,200 L120,180 L105,160 L105,140 L115,130 Z";
            case 'eu':
              return "M430,125 L490,115 L515,140 L490,160 L480,190 L450,195 L445,180 L425,170 L420,155 L435,140 Z";
            case 'cn':
              return "M610,170 L650,160 L670,170 L680,190 L670,210 L645,220 L620,215 L610,195 Z";
            case 'kr':
              return "M735,185 L745,185 L750,195 L740,200 L735,195 Z";
            case 'tw':
              return "M735,215 L740,220 L737,228 L730,225 L730,220 Z";
            case 'sa':
              return "M510,220 L530,220 L540,235 L530,250 L510,240 Z";
            case 'au':
              return "M780,330 L825,330 L845,345 L850,370 L830,385 L800,390 L775,370 L775,345 Z";
            default:
              return "";
          }
        };

        const path = getRegionPath(region.id);
        if (!path) return null;

        return (
          <g key={region.id} onClick={() => onRegionClick(region)} style={{ cursor: 'pointer' }}>
            {/* Country shape */}
            <path
              d={path}
              fill={region.status === 'IN_PROCESS' ? '#b8b8b8' : '#63e0c7'}
              stroke="#fff"
              strokeWidth="1"
            />
            
            {/* Flag circle marker */}
            {region.flagCode && (
              <g>
                <circle 
                  cx={region.coordinates[0]} 
                  cy={region.coordinates[1]} 
                  r="18" 
                  fill="#fff" 
                  stroke="#fff" 
                  strokeWidth="1"
                />
                
                <foreignObject 
                  x={region.coordinates[0] - 15} 
                  y={region.coordinates[1] - 15} 
                  width="30" 
                  height="30"
                >
                  <div
                    className="flex items-center justify-center w-full h-full overflow-hidden rounded-full"
                  >
                    <span className={`fi fi-${region.flagCode.toLowerCase()} text-3xl`}></span>
                  </div>
                </foreignObject>
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
};

export default WorldMapSvg;
