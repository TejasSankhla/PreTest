import React from "react";

export interface LogoProps {
  /**
   * Logo variant to display
   * @default "variant1"
   */
  variant?: "variant1" | "variant2" | "variant3" | "variant4" | "variant5" | "variant6" | "variant7" | "variant8";

  /**
   * Size of the logo
   * @default "md"
   */
  size?: "sm" | "md" | "lg" | "xl";

  /**
   * Display mode
   * @default "full"
   */
  mode?: "icon" | "wordmark" | "full";

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Color theme (for variants that support it)
   * @default "default"
   */
  theme?: "default" | "white" | "dark";
}

const sizeMap = {
  sm: "w-5 h-5",
  md: "w-8 h-8",
  lg: "w-12 h-12",
  xl: "w-16 h-16",
};

const textSizeMap = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-xl",
  xl: "text-2xl",
};

export function Logo({
  variant = "variant1", // Default: Practice Target logo
  size = "md",
  mode = "full",
  className = "",
  theme = "default",
}: LogoProps) {
  const sizeClass = sizeMap[size];
  const textSizeClass = textSizeMap[size];

  const LogoIcon = () => {
    switch (variant) {
      case "variant1":
        return <LogoVariant1 theme={theme} />;
      case "variant2":
        return <LogoVariant2 theme={theme} />;
      case "variant3":
        return <LogoVariant3 theme={theme} />;
      case "variant4":
        return <LogoVariant4 theme={theme} />;
      case "variant5":
        return <LogoVariant5 theme={theme} />;
      case "variant6":
        return <LogoVariant6 theme={theme} />;
      case "variant7":
        return <LogoVariant7 theme={theme} />;
      case "variant8":
        return <LogoVariant8 theme={theme} />;
      default:
        return <LogoVariant1 theme={theme} />;
    }
  };

  if (mode === "icon") {
    return (
      <div className={`${sizeClass} ${className}`}>
        <LogoIcon />
      </div>
    );
  }

  if (mode === "wordmark") {
    return (
      <span className={`font-bold tracking-tight ${textSizeClass} ${theme === 'white' ? 'text-white' : 'text-text-primary'} ${className}`}>
        PreTest
      </span>
    );
  }

  // Full mode (icon + wordmark)
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={sizeClass}>
        <LogoIcon />
      </div>
      <span className={`font-semibold tracking-tight ${textSizeClass} ${theme === 'white' ? 'text-white' : 'text-text-primary'}`}>
        PreTest
      </span>
    </div>
  );
}

// Logo Variant Components

function LogoVariant1({ theme }: { theme: string }) {
  const strokeColor = theme === "white" ? "#ffffff" : "#f97316";
  const fillColor = theme === "white" ? "#ffffff" : "#f97316";
  const arrowColor = theme === "white" ? "#ffffff" : "#111827";

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <circle cx="50" cy="50" r="45" stroke={strokeColor} strokeWidth="3" fill="none" />
      <circle cx="50" cy="50" r="30" stroke={strokeColor} strokeWidth="3" fill="none" />
      <circle cx="50" cy="50" r="15" fill={fillColor} />
      <path d="M15 15 L50 50" stroke={arrowColor} strokeWidth="4" strokeLinecap="round" />
      <path
        d="M50 50 L45 40 M50 50 L40 45"
        stroke={arrowColor}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LogoVariant2({ theme }: { theme: string }) {
  const bgColor = theme === "white" ? "#ffffff" : "#f97316";
  const strokeColor = theme === "white" ? "#111827" : "#ffffff";

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <rect x="10" y="10" width="80" height="80" rx="20" fill={bgColor} />
      <path
        d="M30 70 L50 40 L70 50"
        stroke={strokeColor}
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M70 50 L65 60 M70 50 L60 55"
        stroke={strokeColor}
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LogoVariant3({ theme }: { theme: string }) {
  const primaryColor = theme === "white" ? "#ffffff" : "#f97316";
  const secondaryColor = theme === "white" ? "rgba(255,255,255,0.6)" : "rgba(17,24,39,0.2)";

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <path
        d="M20 30 C20 20 30 15 40 15 L60 15 C70 15 75 20 75 30 L75 45 C75 55 70 60 60 60 L35 60 L20 70 Z"
        fill={primaryColor}
      />
      <path
        d="M25 45 C25 40 30 35 40 35 L70 35 C80 35 85 40 85 50 L85 65 C85 75 80 80 70 80 L45 80 L30 90 L30 80 C25 75 25 70 25 65 Z"
        fill={secondaryColor}
      />
    </svg>
  );
}

function LogoVariant4({ theme }: { theme: string }) {
  const bgColor = theme === "white" ? "#1f2937" : "#fff7ed";
  const sunColor = theme === "white" ? "#ffffff" : "#f97316";
  const rayColor = theme === "white" ? "#ffffff" : "#f97316";

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <circle cx="50" cy="50" r="45" fill={bgColor} />
      <line x1="15" y1="60" x2="85" y2="60" stroke={sunColor} strokeWidth="2" opacity="0.3" />
      <circle cx="50" cy="60" r="18" fill={sunColor} />
      <circle cx="50" cy="60" r="18" stroke={sunColor} strokeWidth="2" fill="none" opacity="0.5" />
      <g opacity="0.8">
        <line x1="50" y1="30" x2="50" y2="20" stroke={rayColor} strokeWidth="3" strokeLinecap="round" />
        <line x1="68" y1="38" x2="74" y2="32" stroke={rayColor} strokeWidth="3" strokeLinecap="round" />
        <line x1="75" y1="55" x2="82" y2="55" stroke={rayColor} strokeWidth="3" strokeLinecap="round" />
        <line x1="32" y1="38" x2="26" y2="32" stroke={rayColor} strokeWidth="3" strokeLinecap="round" />
        <line x1="25" y1="55" x2="18" y2="55" stroke={rayColor} strokeWidth="3" strokeLinecap="round" />
      </g>
      <ellipse cx="50" cy="62" rx="20" ry="6" fill={sunColor} opacity="0.15" />
    </svg>
  );
}

function LogoVariant5({ theme }: { theme: string }) {
  const arrowColor = theme === "white" ? "#ffffff" : "#f97316";
  const centerColor = theme === "white" ? "#ffffff" : "#f97316";
  const bgColor = theme === "white" ? "#1f2937" : "white";

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <circle cx="50" cy="50" r="45" fill={bgColor} stroke="#e5e7eb" strokeWidth="1" />
      <path
        d="M 70 30 A 25 25 0 0 1 70 70"
        stroke={arrowColor}
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 70 70 L 75 65 M 70 70 L 65 65"
        stroke={arrowColor}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 30 70 A 25 25 0 0 1 30 30"
        stroke={arrowColor}
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 30 30 L 35 35 M 30 30 L 25 35"
        stroke={arrowColor}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="50" cy="50" r="8" fill={centerColor} />
      <circle cx="50" cy="50" r="12" stroke={centerColor} strokeWidth="2" fill="none" opacity="0.3" />
    </svg>
  );
}

function LogoVariant6({ theme }: { theme: string }) {
  const textColor = theme === "white" ? "#ffffff" : "#111827";
  const accentColor = theme === "white" ? "#ffffff" : "#f97316";

  return (
    <svg
      viewBox="0 0 200 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      preserveAspectRatio="xMinYMid meet"
    >
      <text
        x="10"
        y="70"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="56"
        fontWeight="700"
        fill={textColor}
        letterSpacing="-0.04em"
      >
        PreTest
      </text>
      <circle cx="140" cy="25" r="8" fill={accentColor} />
    </svg>
  );
}

function LogoVariant7({ theme }: { theme: string }) {
  const bgColor = theme === "white" ? "#ffffff" : "#f97316";
  const flameColor = theme === "white" ? "#111827" : "white";

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <rect x="10" y="10" width="80" height="80" rx="20" fill={bgColor} />
      <g fill={flameColor}>
        <path
          d="M 50 70 Q 42 60 45 50 Q 47 42 50 35 Q 53 42 55 50 Q 58 60 50 70 Z"
          opacity="0.9"
        />
        <path
          d="M 50 65 Q 46 58 48 52 Q 49 48 50 42 Q 51 48 52 52 Q 54 58 50 65 Z"
          opacity="0.6"
        />
        <circle cx="45" cy="32" r="2" opacity="0.7" />
        <circle cx="55" cy="28" r="2.5" opacity="0.8" />
        <circle cx="50" cy="24" r="1.5" opacity="0.6" />
      </g>
    </svg>
  );
}

function LogoVariant8({ theme }: { theme: string }) {
  const circleStroke = theme === "white" ? "#ffffff" : "#f97316";
  const circleFill = theme === "white" ? "#1f2937" : "white";
  const connectionColor = theme === "white" ? "#ffffff" : "#f97316";
  const bgColor = theme === "white" ? "#1f2937" : "#fafafa";

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <circle cx="50" cy="50" r="45" fill={bgColor} />
      <circle cx="35" cy="50" r="15" fill={circleFill} stroke={circleStroke} strokeWidth="3" />
      <circle cx="35" cy="50" r="8" fill={circleStroke} opacity="0.3" />
      <circle cx="65" cy="45" r="15" fill={circleFill} stroke={circleStroke} strokeWidth="3" />
      <circle cx="65" cy="45" r="8" fill={circleStroke} opacity="0.6" />
      <path
        d="M 48 48 Q 50 35 62 43"
        stroke={connectionColor}
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="52" cy="43" r="2" fill={connectionColor} opacity="0.8" />
      <circle cx="57" cy="40" r="2.5" fill={connectionColor} />
      <path
        d="M 48 48 Q 50 35 62 43"
        stroke={connectionColor}
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
        opacity="0.1"
      />
    </svg>
  );
}
