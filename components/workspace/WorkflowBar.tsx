"use client";

type WorkflowStep = "input" | "script" | "edit" | "audition" | "export";

interface WorkflowBarProps {
  currentStep: WorkflowStep;
  onStepChange: (step: WorkflowStep) => void;
}

const steps: { key: WorkflowStep; label: string; icon: string }[] = [
  { key: "input", label: "创作输入", icon: "✏️" },
  { key: "script", label: "生成文稿", icon: "📝" },
  { key: "edit", label: "编辑文本", icon: "✂️" },
  { key: "audition", label: "试听音频", icon: "🎧" },
  { key: "export", label: "导出", icon: "💾" },
];

export default function WorkflowBar({ currentStep, onStepChange }: WorkflowBarProps) {
  const currentIndex = steps.findIndex(s => s.key === currentStep);

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        {steps.map((step, index) => (
          <div key={step.key} className="flex items-center flex-1">
            <button
              onClick={() => onStepChange(step.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                currentStep === step.key
                  ? "bg-purple-100 text-purple-700 font-semibold"
                  : index <= currentIndex
                  ? "text-gray-700 hover:bg-gray-100"
                  : "text-gray-400 cursor-not-allowed"
              }`}
              disabled={index > currentIndex}
            >
              <span className="text-xl">{step.icon}</span>
              <span className="text-sm">{step.label}</span>
            </button>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 ${
                  index < currentIndex ? "bg-purple-500" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

