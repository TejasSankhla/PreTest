import { AlertTriangle, ArrowLeft } from "lucide-react";
import { ConnectionStatus, Theme } from "../../../utils";

interface ConnectionOverlayProps {
  status: ConnectionStatus;
  errorMessage?: string;
  onRetry: () => void;
  onGoBack: () => void;
  theme: Theme;
}

export function ConnectionOverlay({
  status,
  errorMessage,
  onRetry,
  onGoBack,
  theme,
}: ConnectionOverlayProps) {
  const isLight = theme === "light";

  if (status === "connecting") {
    return (
      <div className={`fixed inset-0 ${isLight ? "bg-white" : "bg-[#1a1a2e]"} flex items-center justify-center z-50`}>
        <div className="text-center">
          <div className="relative w-28 h-28 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping" />
            <div className="absolute inset-2 rounded-full bg-blue-500/10 animate-ping [animation-delay:0.3s]" />
            <div className="relative w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-2xl">
              <span className="text-white text-4xl font-bold">A</span>
            </div>
          </div>
          <p className={`${isLight ? "text-gray-900" : "text-white"} text-xl font-semibold mb-2`}>Joining Interview...</p>
          <p className={`${isLight ? "text-gray-500" : "text-white/60"} text-sm`}>Connecting you with Alex, your AI interviewer</p>
          <div className="flex items-center justify-center gap-1 mt-6">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.1s]" />
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]" />
          </div>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className={`fixed inset-0 ${isLight ? "bg-white" : "bg-[#1a1a2e]"} flex items-center justify-center z-50`}>
        <div className="text-center max-w-md px-4">
          <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-10 h-10 text-red-500" />
          </div>
          <h2 className={`${isLight ? "text-gray-900" : "text-white"} text-2xl font-semibold mb-3`}>Connection Failed</h2>
          <p className={`${isLight ? "text-gray-500" : "text-white/60"} mb-8`}>
            {errorMessage || "We couldn't connect to the interview. Please check your internet and microphone permissions."}
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={onGoBack}
              className={`px-6 py-3 rounded-xl ${isLight ? "bg-gray-100 hover:bg-gray-200 text-gray-700" : "bg-white/10 hover:bg-white/20 text-white"} font-medium transition-colors flex items-center gap-2`}
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>
            <button
              onClick={onRetry}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors"
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
        <div className={`${isLight ? "bg-yellow-100 border-yellow-300" : "bg-yellow-500/20 border-yellow-500/30"} backdrop-blur-sm border rounded-full px-4 py-2 flex items-center gap-2`}>
          <div className={`w-4 h-4 border-2 ${isLight ? "border-yellow-600" : "border-yellow-400"} border-t-transparent rounded-full animate-spin`} />
          <span className={`${isLight ? "text-yellow-700" : "text-yellow-400"} text-sm font-medium`}>Reconnecting...</span>
        </div>
      </div>
    );
  }

  return null;
}
