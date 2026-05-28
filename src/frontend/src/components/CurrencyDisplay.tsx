import { formatKhr, formatUsd } from "@/types";

interface CurrencyDisplayProps {
  khr: number;
  usd: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const khrSizeClasses: Record<
  NonNullable<CurrencyDisplayProps["size"]>,
  string
> = {
  sm: "text-base font-semibold",
  md: "text-xl font-semibold",
  lg: "text-3xl font-bold",
};

const usdSizeClasses: Record<
  NonNullable<CurrencyDisplayProps["size"]>,
  string
> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

export function CurrencyDisplay({
  khr,
  usd,
  size = "md",
  className = "",
}: CurrencyDisplayProps) {
  return (
    <span className={`inline-flex items-baseline gap-1.5 ${className}`}>
      <span className={`text-foreground ${khrSizeClasses[size]}`}>
        {formatKhr(khr)}
      </span>
      <span className={`text-muted-foreground ${usdSizeClasses[size]}`}>
        {formatUsd(usd)}
      </span>
    </span>
  );
}
