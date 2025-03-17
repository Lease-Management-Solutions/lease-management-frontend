import React, { useState } from "react";

interface ModalStepperProps {
  isOpen: boolean;
  onClose: () => void;
  steps: StepConfig[];
  className?: string;
}

export interface StepConfig {
  title: string;
  content: React.ReactNode;
}

export default function ModalStepper({ isOpen, onClose, steps, className }: ModalStepperProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ${className}`}>
      <div className="bg-white w-[60%] h-[80%] flex rounded-lg text-black shadow-lg">
        {/* Stepper (30%) */}
        <div className="w-[30%] bg-gray-100 p-4">
          <ol className="relative border-s border-gray-300">
            {steps.map((step, index) => (
              <li key={index} className="mb-6 ms-6 flex items-center">
                <span
                  className={`absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ring-white ${
                    index <= currentStep ? "bg-green-500 text-white" : "bg-gray-300 text-gray-500"
                  }`}
                >
                  ✓
                </span>
                <h3 className="font-medium">{step.title}</h3>
              </li>
            ))}
          </ol>
        </div>

        {/* Conteúdo (70%) */}
        <div className="w-[70%] flex flex-col p-6">
          {/* Header */}
          <div className="h-[15%] flex justify-between items-center border-b pb-2">
            <h2 className="text-lg font-semibold">{steps[currentStep].title}</h2>
            <button onClick={onClose} className="text-red-500">Fechar</button>
          </div>

          {/* Body */}
          <div className="h-[70%] ">{steps[currentStep].content}</div>

          {/* Footer */}
          <div className="h-[15%] flex justify-between border-t pt-2">
            <button onClick={handlePrev} disabled={currentStep === 0} className="px-4 py-2 bg-gray-200 rounded">
              Anterior
            </button>

            {currentStep === steps.length - 1 ? (
              <button
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Salvar
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Próximo
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}