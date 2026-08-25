import type { SkillKey } from "../types";

interface SkillBarProps {
  skill: SkillKey;
  value: number;
  animate?: boolean;
  variant?: "normal" | "before" | "after";
  previousValue?: number;
}

const skillColors: Record<SkillKey, { bar: string; glow: string }> = {
  Frontend: { bar: "rgba(192,132,252,0.8)", glow: "rgba(192,132,252,0.3)" },
  Backend: { bar: "rgba(126,240,197,0.8)", glow: "rgba(126,240,197,0.2)" },
  "AI / ML": { bar: "rgba(255,247,232,0.8)", glow: "rgba(255,247,232,0.15)" },
  Design: { bar: "rgba(255,95,95,0.8)", glow: "rgba(255,95,95,0.2)" },
};

const gapColor = "rgba(255,95,95,0.6)";
const gapGlow = "rgba(255,95,95,0.2)";

export default function SkillBar({ skill, value, animate = false, variant = "normal" }: SkillBarProps) {
  const isGap = value < 30;
  const colors = isGap ? { bar: gapColor, glow: gapGlow } : skillColors[skill];
  const isAfter = variant === "after";

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span
          className="text-xs font-medium"
          style={{ color: isGap ? "#FF5F5F" : "#9B91A8" }}
        >
          {skill}
        </span>
        <span
          className="text-xs font-bold tabular-nums"
          style={{ color: isAfter ? "#7EF0C5" : isGap ? "#FF5F5F" : "#FFF7E8" }}
        >
          {value}%
        </span>
      </div>
      <div
        className="relative h-1.5 rounded-full overflow-hidden"
        style={{ background: "rgba(255,247,232,0.08)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${value}%`,
            background: isAfter
              ? "linear-gradient(90deg, #C084FC, #7EF0C5)"
              : `linear-gradient(90deg, ${colors.bar}, ${colors.bar.replace("0.8", "0.5")})`,
            boxShadow: `0 0 8px ${colors.glow}`,
            animation: animate ? "bar-grow 0.8s ease-out" : undefined,
          }}
        />
      </div>
    </div>
  );
}
