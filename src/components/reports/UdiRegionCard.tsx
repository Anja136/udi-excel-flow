
import React from 'react';
import { UdiRegion } from '@/types/udiRegion';
import { getStatusText } from '@/data/udiRegionsData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Globe } from 'lucide-react';

interface UdiRegionCardProps {
  region: UdiRegion;
  onClick: (region: UdiRegion) => void;
}

const UdiRegionCard = ({ region, onClick }: UdiRegionCardProps) => {
  return (
    <Card 
      className="cursor-pointer hover:border-primary/50 transition-colors"
      onClick={() => onClick(region)}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-md flex items-center gap-2">
          {region.flagCode && (
            <span className={`fi fi-${region.flagCode.toLowerCase()} mr-1`}></span>
          )}
          {region.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Database:</span>
            <span className="text-sm">{region.database}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Required:</span>
            <Badge 
              variant={region.status === 'REQUIRED' ? 'default' : 'secondary'}
              style={{ backgroundColor: region.status === 'REQUIRED' ? region.color : undefined }}
            >
              {getStatusText(region.status)}
            </Badge>
          </div>
          {region.implementationDate && (
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Since:</span>
              <span className="text-sm">{region.implementationDate}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UdiRegionCard;
