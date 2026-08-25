import { useState } from "react";
import { RotateCcw, Sparkles } from "lucide-react";
import type { TeamState } from "../types";
import { CANDIDATES, getBiggestGap } from "../data/mock";
import TeamIntelligence from "../components/TeamIntelligence";
import CandidateCard from "../components/CandidateCard";

interface MatchWorkspaceProps {
  teamState: TeamState;
  candidateIndex: number;
  onSkip: () => void;
  onKnot: (id: string) => void;
  onReset: () => void;
  onViewTeam: () => void;
}

export default function MatchWorkspace({
  teamState,
  candidateIndex,
  onSkip,
  onKnot,
  onReset,
  onViewTeam,
}: MatchWorkspaceProps) {
  const [animating, setAnimating] = useState(false);
  const gap = getBiggestGap(teamState.coverage);
  const done = candidateIndex >= CANDIDATES.length;
  const candidate = done ? null : CANDIDATES[candidateIndex];

  const handleSkip = () => {
    setAnimating(true);
    setTimeout(() => {
      setAnimating(false);
      onSkip();
    }, 300);
  };

  const handleKnot = (id: string) => {
    setAnimating(true);
    setTimeout(() => {
      setAnimating(false);
      onKnot(id);
    }, 300);
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-6 mb-10">
          <div className="flex-1">
            <div
              className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase mb-4 px-3 py-1.5 rounded-full"
              style={{
                color: "#9B91A8",
                background: "rgba(255,247,232,0.05)",
                border: "1px solid rgba(255,247,232,0.08)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5F5F] animate-pulse" />
              Your Active Search · Hackathon
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-3" style={{ color: "#FFF7E8" }}>
              Build the team your idea{" "}
              <em className="font-serif-italic" style={{ color: "#C084FC", fontStyle: "italic" }}>
                needs.
              </em>
            </h1>
            <p className="text-sm sm:text-base max-w-lg" style={{ color: "#9B91A8" }}>
              KnotX finds the people who complete your team — not just people who look like it.
            </p>
          </div>

          {/* SCI insight orb */}
          <div
            className="lg:w-72 rounded-2xl p-5 animate-glow-lilac flex-shrink-0"
            style={{
              background: "rgba(37,27,50,0.7)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(192,132,252,0.2)",
              boxShadow: "0 0 40px rgba(192,132,252,0.08)",
            }}
          >
            <div className="flex items-center gap-1.5 mb-3">
              <Sparkles size={12} style={{ color: "#C084FC" }} />
              <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "#C084FC" }}>
                SCI Engine
              </span>
            </div>
            <p className="text-sm mb-2" style={{ color: "#9B91A8" }}>
              We found a critical gap in your team.
            </p>
            <p className="text-base font-bold" style={{ color: "#FFF7E8" }}>
              {gap.label}
            </p>
            <div className="mt-3 h-px" style={{ background: "rgba(192,132,252,0.15)" }} />
            <p className="text-xs mt-3" style={{ color: "#9B91A8" }}>
              {gap.insight}
            </p>
          </div>
        </div>

        {/* Main workspace: 2 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-6 items-start">
          {/* Left: Team Intelligence */}
          <TeamIntelligence teamState={teamState} onViewTeam={onViewTeam} />

          {/* Right: Candidate matching */}
          <div>
            {done ? (
              /* Completion state */
              <div
                className="glass-lilac rounded-2xl p-10 text-center space-y-5"
                style={{ border: "1px solid rgba(192,132,252,0.15)" }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
                  style={{ background: "linear-gradient(135deg, #FF5F5F, #C084FC)" }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M6 12 C6 8 8.5 6 12 6 C15.5 6 18 8 19 10.5 C20 13 18.5 16.5 16 17.5 C13.5 18.5 11 17 10 14.5 C9 12 10.5 9 13 8"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2" style={{ color: "#FFF7E8" }}>
                    You've met every{" "}
                    <em className="font-serif-italic" style={{ color: "#C084FC" }}>
                      match.
                    </em>
                  </h2>
                  <p className="text-sm" style={{ color: "#9B91A8" }}>
                    Your team is stronger than when you began.
                  </p>
                </div>
                <button
                  onClick={onReset}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5F5F]"
                  style={{
                    background: "rgba(255,95,95,0.12)",
                    border: "1px solid rgba(255,95,95,0.25)",
                    color: "#FF5F5F",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,95,95,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,95,95,0.12)";
                  }}
                >
                  <RotateCcw size={14} />
                  Start over
                </button>
              </div>
            ) : (
              candidate && (
                <div
                  style={{
                    opacity: animating ? 0 : 1,
                    transform: animating ? "translateX(-20px)" : "translateX(0)",
                    transition: "opacity 0.25s, transform 0.25s",
                  }}
                >
                  <CandidateCard
                    candidate={candidate}
                    teamState={teamState}
                    total={CANDIDATES.length}
                    current={candidateIndex}
                    onSkip={handleSkip}
                    onKnot={() => handleKnot(candidate.id)}
                    animating={animating}
                  />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
