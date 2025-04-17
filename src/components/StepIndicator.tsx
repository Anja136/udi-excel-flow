
import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabels?: string[];
  onStepClick?: (step: number) => void;
  visitedSteps?: number[];
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ 
  currentStep, 
  totalSteps,
  stepLabels = [],
  onStepClick,
  visitedSteps = []
}) => {
  const handleStepClick = (step: number) => {
    // Allow clicking on previous steps, current step, or previously visited steps
    if ((step <= currentStep || visitedSteps.includes(step)) && onStepClick) {
      onStepClick(step);
    }
  };

  return (
    <div className="flex flex-col w-full my-6">
      <div className="flex items-center justify-center">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isVisited = visitedSteps.includes(stepNumber) || index < currentStep;
          const isActive = stepNumber === currentStep;
          const isClickable = stepNumber <= currentStep || visitedSteps.includes(stepNumber);
          
          return (
            <React.Fragment key={index}>
              <div 
                className={`h-10 w-10 rounded-full flex items-center justify-center border-2 transition-all
                  ${isActive ? 'bg-[#091A36] border-[#091A36] text-white ring-4 ring-[#091A36]/20' : 
                    isVisited ? 'bg-[#091A36] border-[#091A36] text-white' : 
                    'bg-background border-muted-foreground text-muted-foreground'}
                  ${isClickable ? 'cursor-pointer hover:opacity-80' : 'cursor-not-allowed'}`}
                onClick={() => handleStepClick(stepNumber)}
                role="button"
                tabIndex={isClickable ? 0 : -1}
                aria-label={`Go to step ${stepNumber}`}
              >
                {stepNumber}
              </div>
              {index < totalSteps - 1 && (
                <div 
                  className={`h-1 flex-1 mx-2 transition-colors
                    ${index < currentStep - 1 ? 'bg-[#091A36]' : 'bg-muted-foreground'}`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
      
      {stepLabels.length > 0 && (
        <div className="flex items-center justify-between mt-2 px-2">
          {stepLabels.map((label, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === currentStep;
            const isVisited = visitedSteps.includes(stepNumber) || index < currentStep;
            const isClickable = stepNumber <= currentStep || visitedSteps.includes(stepNumber);
            
            return (
              <div 
                key={index} 
                className={`text-xs font-medium transition-colors 
                  ${isActive ? 'text-[#091A36] font-semibold' : 
                    isVisited ? 'text-[#091A36] cursor-pointer hover:underline' : 
                    'text-muted-foreground'}`}
                style={{
                  width: `${100 / totalSteps}%`,
                  textAlign: index === 0 ? 'left' : index === totalSteps - 1 ? 'right' : 'center'
                }}
                onClick={() => isClickable ? handleStepClick(stepNumber) : null}
                role={isClickable ? "button" : undefined}
                tabIndex={isClickable ? 0 : -1}
              >
                {label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StepIndicator;
