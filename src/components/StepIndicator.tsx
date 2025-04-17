
import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex items-center justify-center my-6">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <React.Fragment key={index}>
          <div 
            className={`step-indicator ${index < currentStep ? 'completed' : ''}`}
          >
            {index + 1}
          </div>
          {index < totalSteps - 1 && (
            <div 
              className={`step-line ${index < currentStep - 1 ? 'completed' : ''}`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepIndicator;
