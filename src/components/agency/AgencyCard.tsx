
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { type Agency } from '@/types/agency';
import StatusBadge from './StatusBadge';
import Image from './Image';

const AgencyCard = ({ agency }: { agency: Agency }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    if (agency.isAccessible !== false) {
      navigate(`/devices?agency=${agency.shortName}`);
    }
  };

  return (
    <div className={`p-6 bg-white rounded-lg border border-gray-200 hover:border-primary/50 transition-colors ${!agency.isAccessible ? 'opacity-75' : ''}`}>
      <div className="flex items-center justify-between mb-4">
        <button 
          className="text-sm text-gray-600 hover:text-primary flex items-center gap-1"
          onClick={handleViewDetails}
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
          </div>

          <div className="grid grid-cols-2 gap-2">
            <StatusBadge label="Created" count={agency.status.created} agency={agency.shortName} />
            <StatusBadge label="Processed" count={agency.status.processed} agency={agency.shortName} />
            <StatusBadge label="Submitted" count={agency.status.submitted} agency={agency.shortName} />
            <StatusBadge label="Needs Update" count={agency.status.needsUpdate} agency={agency.shortName} />
          </div>
        </>
      ) : (
        <p className="text-gray-500 italic mt-8 text-center">Contact administrator for access</p>
      )}
    </div>
  );
};

export default AgencyCard;
