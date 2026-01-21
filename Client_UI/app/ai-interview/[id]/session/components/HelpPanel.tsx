import { HelpCircle, X, Info, Lightbulb } from "lucide-react";

interface HelpPanelProps {
  isOpen: boolean;
  onClose: () => void;
  stages: string[];
  currentStageIndex: number;
}

export function HelpPanel({
  isOpen,
  onClose,
  stages,
  currentStageIndex,
}: HelpPanelProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-2xl max-w-lg w-full max-h-[80vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-info-light flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-info" />
            </div>
            <h2 className="text-text-primary text-heading-sm">Interview Guide</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-background-subtle text-text-tertiary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-[60vh]">
          {/* How it works */}
          <div className="mb-6">
            <h3 className="text-text-primary font-medium mb-3 flex items-center gap-2">
              <Info className="w-4 h-4 text-info" />
              How This Interview Works
            </h3>
            <div className="bg-background-subtle rounded-xl p-4 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-info-light text-info flex items-center justify-center text-body-xs font-bold flex-shrink-0">1</div>
                <div>
                  <p className="text-text-primary text-body-sm font-medium">Alex asks a question</p>
                  <p className="text-text-secondary text-body-xs">Listen carefully - the question will relate to the current stage</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-info-light text-info flex items-center justify-center text-body-xs font-bold flex-shrink-0">2</div>
                <div>
                  <p className="text-text-primary text-body-sm font-medium">You respond naturally</p>
                  <p className="text-text-secondary text-body-xs">Speak as you would in a real interview - take your time</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-info-light text-info flex items-center justify-center text-body-xs font-bold flex-shrink-0">3</div>
                <div>
                  <p className="text-text-primary text-body-sm font-medium">Alex follows up or moves on</p>
                  <p className="text-text-secondary text-body-xs">The AI adapts based on your responses</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interview stages */}
          <div className="mb-6">
            <h3 className="text-text-primary font-medium mb-3">Interview Stages</h3>
            <div className="space-y-2">
              {stages.map((stage, index) => (
                <div
                  key={stage}
                  className={`flex items-center gap-3 p-3 rounded-xl ${
                    index === currentStageIndex
                      ? "bg-info-light border border-info/30"
                      : index < currentStageIndex
                      ? "bg-success-light"
                      : "bg-background-subtle"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-body-xs font-bold ${
                      index === currentStageIndex
                        ? "bg-info text-white"
                        : index < currentStageIndex
                        ? "bg-success text-white"
                        : "bg-border text-text-tertiary"
                    }`}
                  >
                    {index < currentStageIndex ? "✓" : index + 1}
                  </div>
                  <span className={`text-body-sm ${
                    index === currentStageIndex
                      ? "text-info font-medium"
                      : index < currentStageIndex
                      ? "text-success"
                      : "text-text-tertiary"
                  }`}>
                    {stage}
                    {index === currentStageIndex && " (Current)"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div>
            <h3 className="text-text-primary font-medium mb-3 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-warning" />
              Pro Tips
            </h3>
            <div className="bg-warning-light rounded-xl p-4 space-y-2">
              <p className="text-warning text-body-sm flex items-start gap-2">
                <span>•</span>
                <span>Use the STAR method for behavioral questions (Situation, Task, Action, Result)</span>
              </p>
              <p className="text-warning text-body-sm flex items-start gap-2">
                <span>•</span>
                <span>It&apos;s okay to ask Alex to repeat or clarify a question</span>
              </p>
              <p className="text-warning text-body-sm flex items-start gap-2">
                <span>•</span>
                <span>If you need a moment to think, say &quot;Let me think about that&quot;</span>
              </p>
              <p className="text-warning text-body-sm flex items-start gap-2">
                <span>•</span>
                <span>Be concise but thorough - aim for 1-2 minute responses</span>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-medium transition-colors"
          >
            Got it, let&apos;s continue
          </button>
        </div>
      </div>
    </div>
  );
}
