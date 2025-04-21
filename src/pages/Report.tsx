import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StaticWorldMap from '@/components/reports/StaticWorldMap';
import UdiRegionFilter from '@/components/reports/UdiRegionFilter';
import UdiRegionCard from '@/components/reports/UdiRegionCard';
import UdiMapLegend from '@/components/reports/UdiMapLegend';
import { udiRegionsData } from '@/data/udiRegionsData';
import { UdiRegion, RegionFilter, UdiRegistrationStatus } from '@/types/udiRegion';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from '@/components/ui/badge';
import { Flag, Info, Globe, MapPin } from 'lucide-react';
import { getStatusText } from '@/data/udiRegionsData';

const Report = () => {
  // Initialize with a proper empty array to avoid undefined values
  const [regions] = useState<UdiRegion[]>(udiRegionsData || []);
  const [selectedRegion, setSelectedRegion] = useState<UdiRegion | null>(null);
  const [filter, setFilter] = useState<RegionFilter>({
    regions: [],
    status: []
  });
  const [open, setOpen] = useState(false);

  // Filter regions based on selected filters
  const filteredRegions = regions.filter(region => {
    const statusMatch = filter.status.length === 0 || filter.status.includes(region.status);
    const regionMatch = filter.regions.length === 0 || filter.regions.includes(region.id);
    return statusMatch && regionMatch;
  });

  // Handle region selection
  const handleRegionSelect = (region: UdiRegion) => {
    setSelectedRegion(region);
    setOpen(true);
  };

  // Add flag icons CSS
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.11.0/css/flag-icons.min.css';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">UDI Global Registration Map</h1>
          <p className="text-muted-foreground">
            Interactive map of countries and regions where UDI registration is required
          </p>
        </div>

        <UdiRegionFilter 
          regions={regions} 
          filter={filter} 
          setFilter={setFilter} 
        />

        <Tabs defaultValue="map" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="map">Map View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="map" className="mt-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Global UDI Registration Map</CardTitle>
                <CardDescription>
                  Interactive map showing regions with UDI registration requirements
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 relative">
                <StaticWorldMap regions={regions} filter={filter} />
                <UdiMapLegend />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="list" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredRegions.map(region => (
                <UdiRegionCard 
                  key={region.id} 
                  region={region} 
                  onClick={handleRegionSelect} 
                />
              ))}
              
              {filteredRegions.length === 0 && (
                <div className="col-span-full p-8 text-center bg-muted rounded-lg">
                  <p className="text-muted-foreground">No regions match your current filters</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        {selectedRegion && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {selectedRegion.flagCode && (
                    <span className={`fi fi-${selectedRegion.flagCode.toLowerCase()} mr-2`}></span>
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
                          <div className="text-sm text-muted-foreground">{selectedRegion.implementationDate}</div>
                        </div>
                      </div>
                    )}
                    
                    {selectedRegion.description && (
                      <div className="flex items-start gap-2">
                        <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                        <div>
                          <div className="font-medium">Description</div>
                          <div className="text-sm text-muted-foreground">{selectedRegion.description}</div>
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
    </div>
  );
};

export default Report;
