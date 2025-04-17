
import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabels?: string[];
  onStepClick?: (step: number) => void;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ 
  currentStep, 
  totalSteps,
  stepLabels = [],
  onStepClick
}) => {
  const handleStepClick = (step: number) => {
    // Only allow clicking on previous steps or the current step
    if (step <= currentStep && onStepClick) {
      onStepClick(step);
    }
  };

  return (
    <div className="flex flex-col w-full my-6">
      <div className="flex items-center justify-center">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <React.Fragment key={index}>
            <div 
              className={`h-10 w-10 rounded-full flex items-center justify-center border-2 
                ${index < currentStep ? 'bg-primary border-primary text-primary-foreground' : 'bg-background border-muted-foreground text-muted-foreground'}
                ${index < currentStep ? 'cursor-pointer hover:opacity-80' : index === currentStep ? 'cursor-default' : 'cursor-not-allowed'}`}
              onClick={() => handleStepClick(index + 1)}
              role="button"
              tabIndex={index < currentStep ? 0 : -1}
              aria-label={`Go to step ${index + 1}`}
            >
              {index + 1}
            </div>
            {index < totalSteps - 1 && (
              <div 
                className={`h-1 flex-1 mx-2 
                  ${index < currentStep - 1 ? 'bg-primary' : 'bg-muted-foreground'}`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
      
      {stepLabels.length > 0 && (
        <div className="flex items-center justify-between mt-2 px-2">
          {stepLabels.map((label, index) => (
            <div 
              key={index} 
              className={`text-xs font-medium ${index < currentStep ? 'text-primary cursor-pointer hover:underline' : 'text-muted-foreground'}`}
              style={{
                width: `${100 / totalSteps}%`,
                textAlign: index === 0 ? 'left' : index === totalSteps - 1 ? 'right' : 'center'
              }}
              onClick={() => index < currentStep ? handleStepClick(index + 1) : null}
              role={index < currentStep ? "button" : undefined}
              tabIndex={index < currentStep ? 0 : -1}
            >
              {label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StepIndicator;
