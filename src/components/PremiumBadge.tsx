import { Crown, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface PremiumBadgeProps {
  variant?: "default" | "small" | "large";
  showIcon?: boolean;
  locked?: boolean;
  className?: string;
}

const PremiumBadge = ({
  variant = "default",
  showIcon = true,
  locked = false,
  className,
}: PremiumBadgeProps) => {
  const sizes = {
    small: "text-xs px-2 py-0.5",
    default: "text-sm px-3 py-1",
    large: "text-base px-4 py-2",
  };

  const iconSizes = {
    small: "w-3 h-3",
    default: "w-4 h-4",
    large: "w-5 h-5",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-semibold",
        locked
          ? "bg-muted text-muted-foreground border border-border"
          : "bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-md",
        sizes[variant],
        className
      )}
    >
      {showIcon && (
        <>
          {locked ? (
            <Lock className={iconSizes[variant]} />
          ) : (
            <Crown className={iconSizes[variant]} />
          )}
        </>
      )}
      <span>Premium</span>
    </div>
  );
};

export default PremiumBadge;
