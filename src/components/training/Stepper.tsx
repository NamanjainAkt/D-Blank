'use client';

import { m } from '@/components/providers/MotionProvider';

interface Step {
  title: string;
  description: string;
  icon?: string;
}

interface StepperProps {
  steps: Step[];
  currentStep?: number;
  className?: string;
}

export function Stepper({ steps, currentStep = 0, className = '' }: StepperProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Progress line */}
      <div className="absolute top-6 left-0 right-0 h-0.5 bg-white/10">
        <m.div
          className="h-full bg-laser-cyan shadow-[0_0_10px_var(--laser-cyan)]"
          initial={{ width: 0 }}
          animate={{ width: `${((currentStep) / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </div>

      <div className="flex justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;

          return (
            <div key={index} className="flex flex-col items-center relative">
              {/* Step circle */}
              <m.div
                initial={false}
                animate={{
                  scale: isActive ? 1.15 : 1,
                  backgroundColor: isCompleted
                    ? '#B026FF'
                    : isActive
                    ? '#00F0FF'
                    : 'rgba(255,255,255,0.05)',
                  borderColor: isCompleted
                    ? '#B026FF'
                    : isActive
                    ? '#00F0FF'
                    : 'rgba(255,255,255,0.1)',
                }}
                className="relative z-10 w-14 h-14 rounded-none border-2 flex items-center justify-center text-lg font-bold transition-colors font-display shadow-lg"
              >
                {isCompleted ? (
                  <span className="text-white">&#10003;</span>
                ) : (
                  <span className={isActive ? 'text-black font-black' : 'text-white/50'}>
                    {index + 1}
                  </span>
                )}
              </m.div>

              {/* Step content */}
              <div className="absolute top-18 w-32 text-center mt-4">
                <h4 className={`text-sm font-display font-bold uppercase tracking-tight ${
                  isActive ? 'text-white' : 'text-white/50'
                }`}>
                  {step.title}
                </h4>
                <p className="text-xs text-white/40 mt-1">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Stepper;