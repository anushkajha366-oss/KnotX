import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { Candidate, SkillKey } from "../types";
import type { TeamState } from "../types";

interface RippleEffectProps {
  candidate: Candidate;
  teamState: TeamState;
  onClose: () => void;
}

const SKILLS: SkillKey[] = ["Frontend", "Backend", "AI / ML", "Design"];

export default function RippleEffect({ candidate, teamState, onClose }: RippleEffectProps) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(t);
  }, []);

  const coverageBefore = teamState.coverage;
  const coverageAfter = { ...coverageBefore, ...candidate.ripple.coverageAfter };
  const sciBefore = teamState.sci;
  const sciAfter = candidate.ripple.sciAfter;
  const sciDelta = sciAfter - sciBefore;

  return (
    <div
      className="relative rounded-2xl p-6 space-y-5 overflow-hidden"
      style={{
        background: "rgba(23, 19, 33, 0.8)",
        border: "1px solid rgba(192,132,252,0.2)",
        boxShadow: "0 0 60px rgba(192,132,252,0.1)",
        animation: "fade-in-up 0.4s ease-out",
      }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-1.5 rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C084FC]"
        style={{ background: "rgba(255,247,232,0.06)", color: "#9B91A8" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#FFF7E8")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#9B91A8")}
        aria-label="Close ripple effect"
      >
        <X size={14} />
      </button>

      {/* Header */}
      <div>
        <div className="flex items-center gap-1.5 mb-2">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <circle cx="7" cy="7" r="2" fill="#C084FC" />
            <circle cx="7" cy="7" r="4" stroke="#C084FC" strokeWidth="0.8" strokeOpacity="0.5" />
            <circle cx="7" cy="7" r="6.2" stroke="#C084FC" strokeWidth="0.5" strokeOpacity="0.25" />
          </svg>
          <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "#C084FC" }}>
            Ripple Effect
          </span>
        </div>
        <h3 className="text-base font-semibold" style={{ color: "#FFF7E8" }}>
          One person.{" "}
          <span className="font-serif-italic" style={{ color: "#C084FC" }}>
            A stronger team.
          </span>
        </h3>
      </div>

      {/* Network SVG divider */}
      <div className="relative h-6">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 24" preserveAspectRatio="none" aria-hidden="true">
          <line x1="0" y1="12" x2="400" y2="12" stroke="rgba(192,132,252,0.15)" strokeWidth="1" />
          {[40, 100, 180, 260, 340].map((x) => (
            <circle key={x} cx={x} cy="12" r="2" fill="#C084FC" fillOpacity="0.4" />
          ))}
        </svg>
      </div>

      {/* Coverage before/after */}
      <div className="space-y-3">
        {SKILLS.map((skill) => {
          const before = coverageBefore[skill];
          const after = coverageAfter[skill];
          const changed = after > before;
          const delta = after - before;

          return (
            <div key={skill} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium" style={{ color: "#9B91A8" }}>
                  {skill}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs tabular-nums" style={{ color: "#9B91A8" }}>
                    {before}%
                  </span>
                  {changed && (
                    <>
                      <span className="text-xs" style={{ color: "rgba(255,247,232,0.3)" }}>→</span>
                      <span
                        className="text-xs font-bold tabular-nums"
                        style={{ color: "#7EF0C5" }}
                      >
                        {after}%
                      </span>
                      <span
                        className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                        style={{ background: "rgba(126,240,197,0.1)", color: "#7EF0C5" }}
                      >
                        +{delta}
                      </span>
                    </>
                  )}
                </div>
              </div>
              {/* Dual bar: before (ghost) + after (filled) */}
              <div className="relative h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,247,232,0.06)" }}>
                {/* Before bar */}
                <div
                  className="absolute top-0 left-0 h-full rounded-full"
                  style={{
                    width: `${before}%`,
                    background: "rgba(255,247,232,0.15)",
                  }}
                />
                {/* After bar animated */}
                <div
                  className="absolute top-0 left-0 h-full rounded-full transition-all ease-out"
                  style={{
                    width: animated ? `${after}%` : `${before}%`,
                    transitionDuration: "1000ms",
                    background: changed
                      ? "linear-gradient(90deg, #C084FC, #7EF0C5)"
                      : "rgba(255,247,232,0.25)",
                    boxShadow: changed ? "0 0 8px rgba(126,240,197,0.4)" : "none",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Network connecting dots visual */}
      <div className="relative h-12 my-2" aria-hidden="true">
        <svg className="w-full h-full" viewBox="0 0 400 48" preserveAspectRatio="xMidYMid meet">
          {/* Nodes for each skill */}
          {SKILLS.map((skill, i) => {
            const x = 40 + i * 106;
            const after = coverageAfter[skill];
            const changed = after > coverageBefore[skill];
            return (
              <g key={skill}>
                <circle
                  cx={x}
                  cy="24"
                  r={changed ? "8" : "5"}
                  fill={changed ? "rgba(126,240,197,0.2)" : "rgba(192,132,252,0.12)"}
                  stroke={changed ? "#7EF0C5" : "#C084FC"}
                  strokeWidth="1"
                  strokeOpacity={changed ? "0.8" : "0.4"}
                />
                {i < SKILLS.length - 1 && (
                  <line
                    x1={x + (changed ? 8 : 5)}
                    y1="24"
                    x2={40 + (i + 1) * 106 - 5}
                    y2="24"
                    stroke={changed ? "rgba(126,240,197,0.3)" : "rgba(192,132,252,0.15)"}
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                )}
              </g>
            );
          })}
          {/* Candidate node at center top */}
          <circle cx="200" cy="6" r="4" fill="#FF5F5F" fillOpacity="0.6" />
          {SKILLS.map((_, i) => (
            <line
              key={i}
              x1="200"
              y1="10"
              x2={40 + i * 106}
              y2="18"
              stroke="rgba(255,95,95,0.15)"
              strokeWidth="0.8"
              strokeDasharray="2 4"
            />
          ))}
        </svg>
      </div>

      {/* SCI delta */}
      <div
        className="rounded-xl p-4 flex items-center justify-between"
        style={{
          background: "rgba(126,240,197,0.05)",
          border: "1px solid rgba(126,240,197,0.2)",
        }}
      >
        <div>
          <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: "#7EF0C5" }}>
            Team SCI
          </p>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold tabular-nums" style={{ color: "#9B91A8" }}>
              {sciBefore}
            </span>
            <span className="text-xl" style={{ color: "rgba(255,247,232,0.3)" }}>→</span>
            <span
              className="text-3xl font-bold tabular-nums transition-all duration-1000"
              style={{ color: animated ? "#7EF0C5" : "#9B91A8" }}
            >
              {sciAfter}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div
            className="text-2xl font-bold tabular-nums"
            style={{ color: "#7EF0C5", opacity: animated ? 1 : 0, transition: "opacity 0.8s 0.6s" }}
          >
            +{sciDelta}
          </div>
          <p className="text-xs" style={{ color: "#7EF0C5" }}>points</p>
        </div>
      </div>

      <p className="text-xs text-center" style={{ color: "#9B91A8" }}>
        One new teammate changes the strength of the entire team.
      </p>
    </div>
  );
}
