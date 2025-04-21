
import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { UdiRegion, RegionFilter } from '@/types/udiRegion';
import { getStatusColor, getStatusText } from '@/data/udiRegionsData';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from '@/components/ui/badge';
import { Globe, MapPin, Flag, Info } from 'lucide-react';

// Temporary token - in production, use environment variables
const MAPBOX_TOKEN = 'REPLACE_WITH_YOUR_MAPBOX_TOKEN';

interface WorldMapProps {
  regions: UdiRegion[];
  filter: RegionFilter;
}

const WorldMap = ({ regions, filter }: WorldMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<UdiRegion | null>(null);
  const [open, setOpen] = useState(false);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  const handleTokenInput = (token: string) => {
    localStorage.setItem('mapbox_token', token);
    window.location.reload();
  };

  useEffect(() => {
    const savedToken = localStorage.getItem('mapbox_token');
    const token = savedToken || MAPBOX_TOKEN;
    
    if (!token || token === 'REPLACE_WITH_YOUR_MAPBOX_TOKEN') {
      // Show token input prompt
      return;
    }

    if (!mapContainer.current) return;
    
    mapboxgl.accessToken = token;
    
    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [0, 20],
        zoom: 1.5,
        projection: 'globe',
        attributionControl: false
      });

      map.current.on('style.load', () => {
        map.current?.setFog({
          color: 'rgb(12, 12, 40)',
          'high-color': 'rgb(36, 36, 70)',
          'horizon-blend': 0.4
        });
      });

      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'bottom-right'
      );

      return () => {
        map.current?.remove();
        // Clear all markers
        markersRef.current.forEach(marker => marker.remove());
        markersRef.current = [];
      };
    } catch (error) {
      console.error("Error initializing map:", error);
    }
  }, []);

  // Add markers for filtered regions
  useEffect(() => {
    if (!map.current) return;

    // First clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Filter regions based on current filters
    const filteredRegions = regions.filter(region => {
      const statusMatch = filter.status.length === 0 || filter.status.includes(region.status);
      const regionMatch = filter.regions.length === 0 || filter.regions.includes(region.id);
      return statusMatch && regionMatch;
    });

    // Add new markers
    filteredRegions.forEach(region => {
      // Create a custom marker element
      const markerElement = document.createElement('div');
      markerElement.className = 'region-marker';
      markerElement.style.backgroundColor = region.color;
      markerElement.style.width = '24px';
      markerElement.style.height = '24px';
      markerElement.style.borderRadius = '50%';
      markerElement.style.border = '2px solid white';
      markerElement.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
      markerElement.style.cursor = 'pointer';

      const marker = new mapboxgl.Marker(markerElement)
        .setLngLat(region.coordinates)
        .addTo(map.current!);

      // Add click event to show details
      markerElement.addEventListener('click', () => {
        setSelectedRegion(region);
        setOpen(true);
      });

      // Create a popup for hover
      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        className: 'region-popup'
      });

      popup.setHTML(`
        <div class="bg-background border p-2 rounded-md shadow-lg">
          <div class="font-bold">${region.name}</div>
          <div class="text-sm">${region.database}</div>
        </div>
      `);

      // Add hover events
      markerElement.addEventListener('mouseenter', () => {
        marker.setPopup(popup);
        popup.addTo(map.current!);
      });

      markerElement.addEventListener('mouseleave', () => {
        popup.remove();
      });

      markersRef.current.push(marker);
    });
  }, [regions, filter, map.current]);

  // If token is not set, show input form
  if (!localStorage.getItem('mapbox_token') && MAPBOX_TOKEN === 'REPLACE_WITH_YOUR_MAPBOX_TOKEN') {
    return (
      <div className="flex flex-col items-center justify-center p-8 rounded-lg border bg-card text-card-foreground">
        <h3 className="text-lg font-medium mb-4">MapBox API Token Required</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Please enter your Mapbox public token to display the interactive map. 
          You can get it from <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline">mapbox.com</a> after creating an account.
        </p>
        <div className="flex w-full max-w-md gap-2">
          <input 
            type="text" 
            id="mapbox-token"
            placeholder="Enter your Mapbox token"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1"
          />
          <button 
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            onClick={() => {
              const tokenInput = document.getElementById('mapbox-token') as HTMLInputElement;
              handleTokenInput(tokenInput.value);
            }}
          >
            Save Token
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[600px] rounded-lg overflow-hidden border shadow-md">
      <div ref={mapContainer} className="absolute inset-0" />
      
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
  );
};

export default WorldMap;
