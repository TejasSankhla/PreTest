import { AlertTriangle, ArrowLeft } from "lucide-react";
import { ConnectionStatus } from "../../../utils";

interface ConnectionOverlayProps {
  status: ConnectionStatus;
  errorMessage?: string;
  onRetry: () => void;
  onGoBack: () => void;
}

export function ConnectionOverlay({
  status,
  errorMessage,
  onRetry,
  onGoBack,
}: ConnectionOverlayProps) {
  if (status === "connecting") {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
        <div className="text-center">
          <div className="relative w-28 h-28 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
            <div className="absolute inset-2 rounded-full bg-primary/10 animate-ping [animation-delay:0.3s]" />
            <div className="relative w-full h-full rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-2xl">
              <span className="text-white text-4xl font-bold">A</span>
            </div>
          </div>
          <p className="text-text-primary text-heading-md mb-2">Joining Interview...</p>
          <p className="text-text-secondary text-body-sm">Connecting you with Alex, your AI interviewer</p>
          <div className="flex items-center justify-center gap-1 mt-6">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.1s]" />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
          </div>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
        <div className="text-center max-w-md px-4">
          <div className="w-20 h-20 rounded-full bg-error/20 flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-10 h-10 text-error" />
          </div>
          <h2 className="text-text-primary text-heading-lg mb-3">Connection Failed</h2>
          <p className="text-text-secondary text-body-md mb-8">
            {errorMessage || "We couldn't connect to the interview. Please check your internet and microphone permissions."}
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={onGoBack}
              className="px-6 py-3 rounded-xl bg-background-subtle hover:bg-border text-text-secondary font-medium transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>
            <button
              onClick={onRetry}
              className="px-6 py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-medium transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (status === "reconnecting") {
    return (
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
        <div className="bg-warning-light backdrop-blur-sm border border-warning/30 rounded-full px-4 py-2 flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-warning border-t-transparent rounded-full animate-spin" />
          <span className="text-warning text-body-sm font-medium">Reconnecting...</span>
        </div>
      </div>
    );
  }

  return null;
}
