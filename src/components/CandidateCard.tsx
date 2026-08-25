import { useState } from "react";
import { Clock, Layers, Star, CheckCircle2, Waves } from "lucide-react";
import type { Candidate } from "../types";
import type { TeamState } from "../types";
import RippleEffect from "./RippleEffect";

interface CandidateCardProps {
  candidate: Candidate;
  matchScore: number;
  teamState: TeamState;
  total: number;
  current: number;
  onSkip: () => void;
  onKnot: () => void;
  animating?: boolean;
}

export default function CandidateCard({
  candidate,
  matchScore,
  teamState,
  total,
  current,
  onSkip,
  onKnot,
  animating,
}: CandidateCardProps) {
  const [rippleOpen, setRippleOpen] = useState(false);
  const [knotPressed, setKnotPressed] = useState(false);

  const handleKnot = () => {
    setKnotPressed(true);
    setTimeout(() => {
      setKnotPressed(false);
      onKnot();
    }, 400);
  };

  const alreadyKnotted = teamState.knottedIds.includes(candidate.id);

  return (
    <div
      className="flex flex-col h-full"
      style={{
        animation: animating ? "slide-in-right 0.35s ease-out forwards" : undefined,
      }}
    >
      <div
        className="glass-lilac rounded-2xl p-6 flex flex-col gap-5 h-full"
        style={{ border: "1px solid rgba(192,132,252,0.15)" }}
      >
        {/* Top: candidate count + ripple toggle */}
        <div className="flex items-center justify-between">
          <span className="text-xs" style={{ color: "#9B91A8" }}>
            {current + 1} / {total}
          </span>
          <button
            onClick={() => setRippleOpen((v) => !v)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C084FC]"
            style={{
              background: rippleOpen ? "rgba(192,132,252,0.15)" : "rgba(192,132,252,0.07)",
              border: "1px solid rgba(192,132,252,0.2)",
              color: "#C084FC",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(192,132,252,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = rippleOpen ? "rgba(192,132,252,0.15)" : "rgba(192,132,252,0.07)";
            }}
            aria-expanded={rippleOpen}
          >
            <Waves size={12} />
            {rippleOpen ? "Close Ripple" : "View Ripple Effect"}
          </button>
        </div>

        {/* Ripple panel */}
        {rippleOpen && (
          <RippleEffect
            candidate={candidate}
            teamState={teamState}
            onClose={() => setRippleOpen(false)}
          />
        )}

        {/* Avatar + identity */}
        {!rippleOpen && (
          <>
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div
                className="relative flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-lg font-bold animate-halo-pulse"
                style={{
                  background: `linear-gradient(135deg, ${candidate.gradientFrom}, ${candidate.gradientTo})`,
                  color: "#FFF7E8",
                }}
                aria-label={`${candidate.name} avatar`}
              >
                {candidate.initials}
                {/* Active indicator */}
                <span
                  className="absolute -bottom-1 -right-1 flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold"
                  style={{
                    background: "rgba(23,19,33,0.9)",
                    border: "1px solid rgba(126,240,197,0.4)",
                    color: "#7EF0C5",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7EF0C5] animate-pulse" />
                  Active
                </span>
              </div>

              {/* Name + role */}
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-bold leading-tight" style={{ color: "#FFF7E8" }}>
                  {candidate.name}
                </h2>
                <p className="text-sm mt-0.5" style={{ color: "#9B91A8" }}>
                  {candidate.role}
                </p>

                {/* Proof badges */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {candidate.proofBadges.map((badge) => (
                    <span
                      key={badge}
                      className="flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full"
                      style={{
                        background: "rgba(126,240,197,0.08)",
                        border: "1px solid rgba(126,240,197,0.2)",
                        color: "#7EF0C5",
                      }}
                    >
                      <CheckCircle2 size={9} />
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* SCI Score */}
            <div
              className="rounded-xl px-5 py-4 flex items-center justify-between"
              style={{
                background: "rgba(255,95,95,0.06)",
                border: "1px solid rgba(255,95,95,0.15)",
              }}
            >
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: "#FF5F5F" }}>
                  SCI Match
                </p>
                <div className="flex items-end gap-2">
                  <span className="text-5xl font-bold tabular-nums leading-none" style={{ color: "#FF5F5F" }}>
                    {matchScore}
                  </span>
                  <span className="text-xl pb-0.5" style={{ color: "rgba(255,95,95,0.5)" }}>%</span>
                </div>
              </div>
              <div className="text-right space-y-2">
                <div
                  className="text-sm font-semibold px-3 py-1 rounded-full"
                  style={{
                    background: "rgba(255,95,95,0.1)",
                    color: "#FF5F5F",
                    border: "1px solid rgba(255,95,95,0.2)",
                  }}
                >
                  Excellent fit
                </div>
                <div className="text-xs" style={{ color: "#9B91A8" }}>
                  Proof Score{" "}
                  <span className="font-bold" style={{ color: "#7EF0C5" }}>
                    {candidate.proofScore}
                  </span>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase mb-2.5" style={{ color: "#9B91A8" }}>
                Skills
              </p>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      background: "rgba(255,247,232,0.06)",
                      border: "1px solid rgba(255,247,232,0.1)",
                      color: "#FFF7E8",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Clock, label: "Availability", value: candidate.availability },
                { icon: Layers, label: "Experience", value: candidate.experience },
                { icon: Star, label: "Interest", value: candidate.interest },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="rounded-xl p-3 text-center"
                  style={{
                    background: "rgba(255,247,232,0.03)",
                    border: "1px solid rgba(255,247,232,0.07)",
                  }}
                >
                  <Icon size={13} style={{ color: "#9B91A8", margin: "0 auto 4px" }} />
                  <p className="text-[9px] font-medium uppercase tracking-wide mb-0.5" style={{ color: "#9B91A8" }}>
                    {label}
                  </p>
                  <p className="text-xs font-semibold leading-tight" style={{ color: "#FFF7E8" }}>
                    {value}
                  </p>
                </div>
              ))}
            </div>

            {/* Why they fit */}
            <div
              className="rounded-xl p-4 space-y-2"
              style={{
                background: "rgba(192,132,252,0.05)",
                border: "1px solid rgba(192,132,252,0.12)",
              }}
            >
              <p className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: "#C084FC" }}>
                Why They Fit
              </p>
              {candidate.whyTheyFit.map((reason) => (
                <div key={reason} className="flex items-start gap-2">
                  <CheckCircle2 size={13} style={{ color: "#7EF0C5", flexShrink: 0, marginTop: 1 }} />
                  <span className="text-xs" style={{ color: "#FFF7E8" }}>
                    {reason}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Actions */}
        <div className="flex gap-3 mt-auto pt-2">
          <button
            onClick={onSkip}
            disabled={alreadyKnotted}
            className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9B91A8]"
            style={{
              background: "rgba(255,247,232,0.05)",
              border: "1px solid rgba(255,247,232,0.1)",
              color: "#9B91A8",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,247,232,0.1)";
              e.currentTarget.style.color = "#FFF7E8";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,247,232,0.05)";
              e.currentTarget.style.color = "#9B91A8";
            }}
          >
            Skip
          </button>
          <button
            onClick={handleKnot}
            disabled={alreadyKnotted}
            className="flex-[2] py-3 rounded-xl text-sm font-bold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5F5F] flex items-center justify-center gap-2"
            style={{
              background: alreadyKnotted
                ? "rgba(126,240,197,0.15)"
                : knotPressed
                ? "rgba(255,95,95,0.5)"
                : "rgba(255,95,95,0.9)",
              border: alreadyKnotted
                ? "1px solid rgba(126,240,197,0.3)"
                : "1px solid rgba(255,95,95,0.3)",
              color: alreadyKnotted ? "#7EF0C5" : "#FFF7E8",
              boxShadow: alreadyKnotted ? "none" : "0 4px 20px rgba(255,95,95,0.25)",
              transform: knotPressed ? "scale(0.97)" : "scale(1)",
            }}
            onMouseEnter={(e) => {
              if (!alreadyKnotted)
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(255,95,95,0.4)";
            }}
            onMouseLeave={(e) => {
              if (!alreadyKnotted)
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(255,95,95,0.25)";
            }}
          >
            {alreadyKnotted ? (
              <>
                <CheckCircle2 size={15} />
                Knotted
              </>
            ) : (
              <>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                  <path
                    d="M4 7.5 C4 5 5.5 4 7.5 4 C9.5 4 11 5 11.5 6.5 C12 8 11 10 9.5 10.5 C8 11 6.5 10 6 8.5 C5.5 7 6.5 5 8 4.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
                Knot with {candidate.name.split(" ")[0]}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
