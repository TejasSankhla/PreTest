import { PhoneOff, Check, AlertTriangle } from "lucide-react";
import { Theme } from "../../../utils";

interface EndConfirmationModalProps {
  isOpen: boolean;
  stageName: string;
  stageNumber: number;
  totalStages: number;
  onContinue: () => void;
  onEnd: () => void;
  theme: Theme;
}

export function EndConfirmationModal({
  isOpen,
  stageName,
  stageNumber,
  totalStages,
  onContinue,
  onEnd,
  theme,
}: EndConfirmationModalProps) {
  if (!isOpen) return null;
  const isLight = theme === "light";

  return (
    <div className={`fixed inset-0 ${isLight ? "bg-black/40" : "bg-black/70"} backdrop-blur-sm flex items-center justify-center z-50 p-4`}>
      <div className={`${isLight ? "bg-white border-gray-200" : "bg-[#242438] border-white/10"} border rounded-2xl max-w-md w-full p-6 shadow-2xl`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
            <PhoneOff className="w-5 h-5 text-red-500" />
          </div>
          <h2 className={`${isLight ? "text-gray-900" : "text-white"} text-xl font-semibold`}>Leave Interview?</h2>
        </div>

        <p className={`${isLight ? "text-gray-500" : "text-white/60"} mb-4`}>
          You&apos;re currently in Stage {stageNumber} of {totalStages} ({stageName})
        </p>

        <div className={`${isLight ? "bg-yellow-50 border-yellow-200" : "bg-yellow-500/10 border-yellow-500/20"} border rounded-xl p-4 mb-6`}>
          <p className={`${isLight ? "text-yellow-700" : "text-yellow-400"} text-sm font-medium mb-3`}>If you leave now:</p>
          <ul className="space-y-2">
            <li className={`flex items-center gap-3 ${isLight ? "text-gray-600" : "text-white/70"} text-sm`}>
              <Check className="w-4 h-4 text-green-500" />
              Your progress will be saved
            </li>
            <li className={`flex items-center gap-3 ${isLight ? "text-gray-600" : "text-white/70"} text-sm`}>
              <Check className="w-4 h-4 text-green-500" />
              You&apos;ll receive partial feedback
            </li>
            <li className={`flex items-center gap-3 ${isLight ? "text-gray-600" : "text-white/70"} text-sm`}>
              <AlertTriangle className={`w-4 h-4 ${isLight ? "text-yellow-600" : "text-yellow-400"}`} />
              Interview marked as incomplete
            </li>
          </ul>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onContinue}
            className={`flex-1 px-4 py-3 rounded-xl ${isLight ? "bg-gray-100 hover:bg-gray-200 text-gray-700" : "bg-white/10 hover:bg-white/20 text-white"} font-medium transition-colors`}
          >
            Stay in Interview
          </button>
          <button
            onClick={onEnd}
            className="flex-1 px-4 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-medium transition-colors"
          >
            Leave & Get Feedback
          </button>
        </div>
      </div>
    </div>
  );
}
