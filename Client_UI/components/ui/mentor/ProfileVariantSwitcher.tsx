"use client";

import { useEffect, useState } from "react";
import { LayoutGrid, SplitSquareVertical } from "lucide-react";
import { cn } from "@/lib/utils";

export type ProfileVariant = "sidebar" | "split";

interface VariantOption {
  id: ProfileVariant;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
}

const variants: VariantOption[] = [
  { id: "sidebar", label: "Classic", icon: LayoutGrid, title: "Classic Layout" },
  { id: "split", label: "Hero", icon: SplitSquareVertical, title: "Hero Layout" },
];

interface ProfileVariantSwitcherProps {
  variant: ProfileVariant;
  onVariantChange: (variant: ProfileVariant) => void;
}

export function ProfileVariantSwitcher({ variant, onVariantChange }: ProfileVariantSwitcherProps) {
  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50">
      <div className="bg-background/95 backdrop-blur-sm rounded-xl shadow-lg border border-border p-1 flex items-center gap-1">
        {variants.map((v) => {
          const Icon = v.icon;
          const isActive = variant === v.id;
          return (
            <button
              key={v.id}
              onClick={() => onVariantChange(v.id)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all",
                isActive
                  ? "bg-secondary text-white shadow-sm"
                  : "text-text-secondary hover:text-text-primary hover:bg-background-subtle"
              )}
              title={v.title}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{v.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function useProfileVariant(): [ProfileVariant, (variant: ProfileVariant) => void] {
  const [variant, setVariant] = useState<ProfileVariant>("sidebar");

  useEffect(() => {
    const stored = localStorage.getItem("mentor-profile-variant") as ProfileVariant | null;
    if (stored && variants.some(v => v.id === stored)) {
      setVariant(stored);
    }
  }, []);

  const updateVariant = (newVariant: ProfileVariant) => {
    setVariant(newVariant);
    localStorage.setItem("mentor-profile-variant", newVariant);
  };

  return [variant, updateVariant];
}
