/**
 * @deprecated This button component is deprecated.
 * Please use `import { Button } from "@/components/atoms"` instead.
 *
 * The new Button component offers:
 * - Better variants: primary, secondary, outline, ghost, danger, danger-ghost
 * - More sizes: xs, sm, md, lg, xl, icon, icon-sm
 * - Border radius control: default, full, lg
 * - Loading state support
 * - Icon integration (leftIcon, rightIcon)
 */

// Re-export from atoms for backwards compatibility
export { Button, buttonVariants } from "@/components/atoms/Button";
export type { ButtonProps } from "@/components/atoms/Button";
