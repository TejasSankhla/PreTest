/**
 * Toast Hook - Convenience wrapper around react-toastify
 *
 * Usage:
 * const { showSuccess, showError, showWarning, showInfo } = useToast();
 * showSuccess("Operation completed!");
 * showError("Something went wrong");
 */

import { toast, ToastOptions } from "react-toastify";

const defaultOptions: ToastOptions = {
  position: "top-right",
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

export function useToast() {
  const showSuccess = (message: string, options?: ToastOptions) => {
    toast.success(message, { ...defaultOptions, ...options });
  };

  const showError = (message: string, options?: ToastOptions) => {
    toast.error(message, { ...defaultOptions, ...options });
  };

  const showWarning = (message: string, options?: ToastOptions) => {
    toast.warning(message, { ...defaultOptions, ...options });
  };

  const showInfo = (message: string, options?: ToastOptions) => {
    toast.info(message, { ...defaultOptions, ...options });
  };

  const showLoading = (message: string, options?: ToastOptions) => {
    return toast.loading(message, { ...defaultOptions, ...options });
  };

  const dismiss = (toastId?: string | number) => {
    if (toastId) {
      toast.dismiss(toastId);
    } else {
      toast.dismiss();
    }
  };

  const update = (
    toastId: string | number,
    options: ToastOptions & { render?: string }
  ) => {
    toast.update(toastId, options);
  };

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showLoading,
    dismiss,
    update,
    // Also export raw toast for advanced use cases
    toast,
  };
}

export default useToast;
