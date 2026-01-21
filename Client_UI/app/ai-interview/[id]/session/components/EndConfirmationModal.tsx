import { PhoneOff, Check, AlertTriangle } from "lucide-react";

interface EndConfirmationModalProps {
  isOpen: boolean;
  stageName: string;
  stageNumber: number;
  totalStages: number;
  onContinue: () => void;
  onEnd: () => void;
}

export function EndConfirmationModal({
  isOpen,
  stageName,
  stageNumber,
  totalStages,
  onContinue,
  onEnd,
}: EndConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-background border border-border rounded-2xl max-w-md w-full p-6 shadow-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-error/20 flex items-center justify-center">
            <PhoneOff className="w-5 h-5 text-error" />
          </div>
          <h2 className="text-text-primary text-heading-md">Leave Interview?</h2>
        </div>

        <p className="text-text-secondary text-body-md mb-4">
          You&apos;re currently in Stage {stageNumber} of {totalStages} ({stageName})
        </p>

        <div className="bg-warning-light border border-warning/30 rounded-xl p-4 mb-6">
          <p className="text-warning text-body-sm font-medium mb-3">If you leave now:</p>
          <ul className="space-y-2">
            <li className="flex items-center gap-3 text-text-secondary text-body-sm">
              <Check className="w-4 h-4 text-success" />
              Your progress will be saved
            </li>
            <li className="flex items-center gap-3 text-text-secondary text-body-sm">
              <Check className="w-4 h-4 text-success" />
              You&apos;ll receive partial feedback
            </li>
            <li className="flex items-center gap-3 text-text-secondary text-body-sm">
              <AlertTriangle className="w-4 h-4 text-warning" />
              Interview marked as incomplete
            </li>
          </ul>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onContinue}
            className="flex-1 px-4 py-3 rounded-xl bg-background-subtle hover:bg-border text-text-secondary font-medium transition-colors"
          >
            Stay in Interview
          </button>
          <button
            onClick={onEnd}
            className="flex-1 px-4 py-3 rounded-xl bg-error hover:bg-error/90 text-white font-medium transition-colors"
          >
            Leave & Get Feedback
          </button>
        </div>
      </div>
    </div>
  );
}
