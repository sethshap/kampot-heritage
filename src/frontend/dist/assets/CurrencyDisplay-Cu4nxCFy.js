import { j as jsxRuntimeExports, f as formatKhr, T as formatUsd } from "./index-DzwzmQd8.js";
const khrSizeClasses = {
  sm: "text-base font-semibold",
  md: "text-xl font-semibold",
  lg: "text-3xl font-bold"
};
const usdSizeClasses = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base"
};
function CurrencyDisplay({
  khr,
  usd,
  size = "md",
  className = ""
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-baseline gap-1.5 ${className}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-foreground ${khrSizeClasses[size]}`, children: formatKhr(khr) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-muted-foreground ${usdSizeClasses[size]}`, children: formatUsd(usd) })
  ] });
}
export {
  CurrencyDisplay as C
};
