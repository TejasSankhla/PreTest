"use client";

import { useEffect, useState } from "react";

export type AuthVariant = "centered" | "split";

interface AuthVariantSwitcherProps {
  variant: AuthVariant;
  onVariantChange: (variant: AuthVariant) => void;
}

export function AuthVariantSwitcher({ variant, onVariantChange }: AuthVariantSwitcherProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-background/95 backdrop-blur-sm rounded-full shadow-lg border border-border px-4 py-2 flex items-center gap-2">
        <span className="text-xs text-text-tertiary font-medium">Design:</span>
        <select
          value={variant}
          onChange={(e) => onVariantChange(e.target.value as AuthVariant)}
          className="text-xs font-medium bg-transparent border-none outline-none cursor-pointer text-text-primary"
        >
          <option value="centered">Enhanced Centered</option>
          <option value="split">Split Layout</option>
        </select>
      </div>
    </div>
  );
}

export function useAuthVariant(): [AuthVariant, (variant: AuthVariant) => void] {
  const [variant, setVariant] = useState<AuthVariant>("split");

  useEffect(() => {
    const stored = localStorage.getItem("auth-variant") as AuthVariant | null;
    if (stored) {
      setVariant(stored);
    }
  }, []);

  const updateVariant = (newVariant: AuthVariant) => {
    setVariant(newVariant);
    localStorage.setItem("auth-variant", newVariant);
  };

  return [variant, updateVariant];
}
