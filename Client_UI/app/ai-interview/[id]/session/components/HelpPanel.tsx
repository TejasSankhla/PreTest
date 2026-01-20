import { HelpCircle, X, Info, Lightbulb } from "lucide-react";
import { Theme } from "../../../utils";

interface HelpPanelProps {
  isOpen: boolean;
  onClose: () => void;
  stages: string[];
  currentStageIndex: number;
  theme: Theme;
}

export function HelpPanel({
  isOpen,
  onClose,
  stages,
  currentStageIndex,
  theme,
}: HelpPanelProps) {
  if (!isOpen) return null;
  const isLight = theme === "light";

  return (
    <div className={`fixed inset-0 ${isLight ? "bg-black/40" : "bg-black/70"} backdrop-blur-sm flex items-center justify-center z-50 p-4`}>
      <div className={`${isLight ? "bg-white" : "bg-[#242438]"} rounded-2xl max-w-lg w-full max-h-[80vh] overflow-hidden shadow-2xl`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-4 border-b ${isLight ? "border-gray-100" : "border-white/10"}`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${isLight ? "bg-blue-100" : "bg-blue-500/20"} flex items-center justify-center`}>
              <HelpCircle className={`w-5 h-5 ${isLight ? "text-blue-600" : "text-blue-400"}`} />
            </div>
            <h2 className={`${isLight ? "text-gray-900" : "text-white"} text-lg font-semibold`}>Interview Guide</h2>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg ${isLight ? "hover:bg-gray-100 text-gray-500" : "hover:bg-white/10 text-white/60"} transition-colors`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-[60vh]">
          {/* How it works */}
          <div className="mb-6">
            <h3 className={`${isLight ? "text-gray-900" : "text-white"} font-medium mb-3 flex items-center gap-2`}>
              <Info className={`w-4 h-4 ${isLight ? "text-blue-600" : "text-blue-400"}`} />
              How This Interview Works
            </h3>
            <div className={`${isLight ? "bg-gray-50" : "bg-white/5"} rounded-xl p-4 space-y-3`}>
              <div className="flex items-start gap-3">
                <div className={`w-6 h-6 rounded-full ${isLight ? "bg-blue-100 text-blue-600" : "bg-blue-500/20 text-blue-400"} flex items-center justify-center text-xs font-bold flex-shrink-0`}>1</div>
                <div>
                  <p className={`${isLight ? "text-gray-800" : "text-white"} text-sm font-medium`}>Alex asks a question</p>
                  <p className={`${isLight ? "text-gray-500" : "text-white/60"} text-xs`}>Listen carefully - the question will relate to the current stage</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className={`w-6 h-6 rounded-full ${isLight ? "bg-blue-100 text-blue-600" : "bg-blue-500/20 text-blue-400"} flex items-center justify-center text-xs font-bold flex-shrink-0`}>2</div>
                <div>
                  <p className={`${isLight ? "text-gray-800" : "text-white"} text-sm font-medium`}>You respond naturally</p>
                  <p className={`${isLight ? "text-gray-500" : "text-white/60"} text-xs`}>Speak as you would in a real interview - take your time</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className={`w-6 h-6 rounded-full ${isLight ? "bg-blue-100 text-blue-600" : "bg-blue-500/20 text-blue-400"} flex items-center justify-center text-xs font-bold flex-shrink-0`}>3</div>
                <div>
                  <p className={`${isLight ? "text-gray-800" : "text-white"} text-sm font-medium`}>Alex follows up or moves on</p>
                  <p className={`${isLight ? "text-gray-500" : "text-white/60"} text-xs`}>The AI adapts based on your responses</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interview stages */}
          <div className="mb-6">
            <h3 className={`${isLight ? "text-gray-900" : "text-white"} font-medium mb-3`}>Interview Stages</h3>
            <div className="space-y-2">
              {stages.map((stage, index) => (
                <div
                  key={stage}
                  className={`flex items-center gap-3 p-3 rounded-xl ${
                    index === currentStageIndex
                      ? isLight ? "bg-blue-50 border border-blue-200" : "bg-blue-500/10 border border-blue-500/20"
                      : index < currentStageIndex
                      ? isLight ? "bg-green-50" : "bg-green-500/10"
                      : isLight ? "bg-gray-50" : "bg-white/5"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      index === currentStageIndex
                        ? "bg-blue-500 text-white"
                        : index < currentStageIndex
                        ? "bg-green-500 text-white"
                        : isLight ? "bg-gray-200 text-gray-500" : "bg-white/20 text-white/60"
                    }`}
                  >
                    {index < currentStageIndex ? "✓" : index + 1}
                  </div>
                  <span className={`text-sm ${
                    index === currentStageIndex
                      ? isLight ? "text-blue-700 font-medium" : "text-blue-400 font-medium"
                      : index < currentStageIndex
                      ? isLight ? "text-green-700" : "text-green-400"
                      : isLight ? "text-gray-500" : "text-white/50"
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
            <h3 className={`${isLight ? "text-gray-900" : "text-white"} font-medium mb-3 flex items-center gap-2`}>
              <Lightbulb className={`w-4 h-4 ${isLight ? "text-amber-500" : "text-amber-400"}`} />
              Pro Tips
            </h3>
            <div className={`${isLight ? "bg-amber-50" : "bg-amber-500/10"} rounded-xl p-4 space-y-2`}>
              <p className={`${isLight ? "text-amber-800" : "text-amber-200"} text-sm flex items-start gap-2`}>
                <span>•</span>
                <span>Use the STAR method for behavioral questions (Situation, Task, Action, Result)</span>
              </p>
              <p className={`${isLight ? "text-amber-800" : "text-amber-200"} text-sm flex items-start gap-2`}>
                <span>•</span>
                <span>It&apos;s okay to ask Alex to repeat or clarify a question</span>
              </p>
              <p className={`${isLight ? "text-amber-800" : "text-amber-200"} text-sm flex items-start gap-2`}>
                <span>•</span>
                <span>If you need a moment to think, say &quot;Let me think about that&quot;</span>
              </p>
              <p className={`${isLight ? "text-amber-800" : "text-amber-200"} text-sm flex items-start gap-2`}>
                <span>•</span>
                <span>Be concise but thorough - aim for 1-2 minute responses</span>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`p-4 border-t ${isLight ? "border-gray-100" : "border-white/10"}`}>
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors"
          >
            Got it, let&apos;s continue
          </button>
        </div>
      </div>
    </div>
  );
}
