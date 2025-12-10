"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Palette, Check } from "lucide-react";

export type LandingVariant = "v1" | "v2";

interface VariantSwitcherProps {
  variant: LandingVariant;
  onVariantChange: (variant: LandingVariant) => void;
}

const variants = [
  {
    id: "v1" as const,
    name: "Original",
    description: "Orbital animation with gradient background",
  },
  {
    id: "v2" as const,
    name: "Minimal",
    description: "Clean bento grid with modern typography",
  },
];

export default function VariantSwitcher({
  variant,
  onVariantChange,
}: VariantSwitcherProps) {
  const currentVariant = variants.find((v) => v.id === variant);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-background/90 backdrop-blur-xl rounded-full shadow-lg border border-border hover:shadow-xl transition-all text-sm font-medium text-text-primary hover:text-text-primary group">
            <Palette className="w-4 h-4 text-secondary" />
            <span>Design: {currentVariant?.name}</span>
            <ChevronDown className="w-4 h-4 text-text-tertiary group-hover:text-text-secondary transition-colors" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-64 bg-background rounded-xl shadow-xl border border-border p-2"
        >
          {variants.map((v) => (
            <DropdownMenuItem
              key={v.id}
              onClick={() => onVariantChange(v.id)}
              className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                variant === v.id
                  ? "bg-secondary/5 text-secondary"
                  : "hover:bg-background-subtle"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  variant === v.id
                    ? "border-secondary bg-secondary"
                    : "border-border"
                }`}
              >
                {variant === v.id && <Check className="w-3 h-3 text-white" />}
              </div>
              <div className="flex flex-col">
                <span
                  className={`font-semibold text-sm ${
                    variant === v.id ? "text-secondary" : "text-text-primary"
                  }`}
                >
                  {v.name}
                </span>
                <span className="text-xs text-text-secondary mt-0.5">
                  {v.description}
                </span>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
