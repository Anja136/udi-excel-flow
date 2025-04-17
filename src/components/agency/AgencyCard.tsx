
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { type Agency } from '@/types/agency';
import StatusBadge from './StatusBadge';
import { Progress } from '@/components/ui/progress';

const AgencyCard = ({ agency }: { agency: Agency }) => {
  const total = agency.totalDevices;
  const progress = total > 0 ? (agency.status.processed + agency.status.submitted) / total * 100 : 0;

  return (
    <div className={`p-6 bg-white rounded-lg border border-gray-200 hover:border-primary/50 transition-colors ${!agency.isAccessible ? 'opacity-75' : ''}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="w-20 h-2 rounded" style={{ backgroundColor: agency.color }} />
        <button 
          className="text-sm text-gray-600 hover:text-primary flex items-center gap-1"
          onClick={() => console.log(`View details for ${agency.name}`)}
        >
          {agency.isAccessible !== false ? (
            <>View Details <ChevronRight size={16} /></>
          ) : (
            <>No Access <ChevronRight size={16} /></>
          )}
        </button>
      </div>

      <h3 className="text-xl font-bold mb-1">{agency.shortName}</h3>
      <p className="text-gray-600 mb-4 text-sm">{agency.description}</p>

      {agency.isAccessible !== false ? (
        <>
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">Total Devices</span>
              <span className="font-bold">{agency.totalDevices}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <StatusBadge label="Created" count={agency.status.created} />
            <StatusBadge label="Processed" count={agency.status.processed} />
            <StatusBadge label="Submitted" count={agency.status.submitted} />
            <StatusBadge label="Needs Update" count={agency.status.needsUpdate} />
          </div>
        </>
      ) : (
        <p className="text-gray-500 italic mt-8 text-center">Contact administrator for access</p>
      )}
    </div>
  );
};

export default AgencyCard;
