
import React from 'react';
import { UdiRegion, RegionFilter } from '@/types/udiRegion';
import WorldMapSvg from './WorldMapSvg';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from '@/components/ui/badge';
import { Flag, Globe, MapPin, Info } from 'lucide-react';
import { getStatusText } from '@/data/udiRegionsData';

interface StaticWorldMapProps {
  regions: UdiRegion[];
  filter: RegionFilter;
}

const StaticWorldMap = ({ regions, filter }: StaticWorldMapProps) => {
  const [selectedRegion, setSelectedRegion] = React.useState<UdiRegion | null>(null);
  const [open, setOpen] = React.useState(false);
  
  // Filter regions based on current filters
  const filteredRegions = regions.filter(region => {
    const statusMatch = filter.status.length === 0 || filter.status.includes(region.status);
    const regionMatch = filter.regions.length === 0 || filter.regions.includes(region.id);
    return statusMatch && regionMatch;
  });

  return (
    <div className="relative w-full h-[600px] rounded-lg overflow-hidden border shadow-md bg-[#1A1F2C]">
      <WorldMapSvg 
        regions={filteredRegions} 
        onRegionClick={(region) => {
          setSelectedRegion(region);
          setOpen(true);
        }}
      />
      
      {selectedRegion && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {selectedRegion.flagCode && (
                  <span className={`fi fi-${selectedRegion.flagCode.toLowerCase()} mr-2`} />
                )}
                {selectedRegion.name} - {selectedRegion.database}
              </DialogTitle>
              <DialogDescription>
                <div className="mt-4 space-y-3">
                  <div className="flex items-start gap-2">
                    <Flag className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">UDI Database</div>
                      <div className="text-sm text-muted-foreground">{selectedRegion.database}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Info className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">Registration Required</div>
                      <div className="text-sm text-muted-foreground">
                        <Badge 
                          variant={selectedRegion.status === 'REQUIRED' ? 'default' : 'secondary'}
                          className="mt-1"
                        >
                          {getStatusText(selectedRegion.status)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  {selectedRegion.implementationDate && (
                    <div className="flex items-start gap-2">
                      <Globe className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium">Implementation Date</div>
                        <div className="text-sm text-muted-foreground">
                          {selectedRegion.implementationDate}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {selectedRegion.description && (
                    <div className="flex items-start gap-2">
                      <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium">Description</div>
                        <div className="text-sm text-muted-foreground">
                          {selectedRegion.description}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default StaticWorldMap;
