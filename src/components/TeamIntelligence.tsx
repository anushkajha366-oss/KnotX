import { Users, ChevronRight, Zap } from "lucide-react";
import type { TeamState, SkillKey } from "../types";
import SkillBar from "./SkillBar";
import { getBiggestGap } from "../data/mock";

interface TeamIntelligenceProps {
  teamState: TeamState;
  onViewTeam: () => void;
}

const SKILL_KEYS: SkillKey[] = ["Frontend", "Backend", "AI / ML", "Design"];

export default function TeamIntelligence({ teamState, onViewTeam }: TeamIntelligenceProps) {
  const gap = getBiggestGap(teamState.coverage);
  const sci = teamState.sci;
  const sciColor = sci >= 90 ? "#7EF0C5" : sci >= 75 ? "#C084FC" : "#FF5F5F";

  return (
    <div
      className="glass rounded-2xl p-6 space-y-6 h-full flex flex-col"
      style={{ border: "1px solid rgba(255,247,232,0.07)" }}
    >
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span
            className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
            style={{
              color: "#9B91A8",
              background: "rgba(255,247,232,0.05)",
              border: "1px solid rgba(255,247,232,0.08)",
            }}
          >
            Neural Nexus
          </span>
        </div>
        <h2 className="text-lg font-semibold mb-1" style={{ color: "#FFF7E8" }}>
          Team completeness
        </h2>

        {/* SCI Score */}
        <div className="flex items-end gap-3 mt-4 mb-2">
          <div
            className="text-5xl font-bold tabular-nums transition-all duration-700"
            style={{ color: sciColor, lineHeight: 1 }}
          >
            {sci}
          </div>
          <div className="pb-1">
            <span className="text-2xl font-light" style={{ color: "#9B91A8" }}>
              / 100
            </span>
          </div>
        </div>
        <p className="text-xs font-medium" style={{ color: "#9B91A8" }}>
          Your Skill Complementarity Index
        </p>
      </div>

      {/* SCI progress ring indicator */}
      <div
        className="relative h-1 rounded-full overflow-hidden"
        style={{ background: "rgba(255,247,232,0.08)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${sci}%`,
            background: `linear-gradient(90deg, #FF5F5F, #C084FC, ${sciColor})`,
          }}
        />
      </div>

      {/* Coverage bars */}
      <div className="space-y-4 flex-1">
        <h3 className="text-xs font-bold tracking-widest uppercase" style={{ color: "#9B91A8" }}>
          Skill Coverage
        </h3>
        {SKILL_KEYS.map((skill) => (
          <SkillBar
            key={skill}
            skill={skill}
            value={teamState.coverage[skill]}
            animate
          />
        ))}
      </div>

      {/* Team members */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Users size={13} style={{ color: "#9B91A8" }} />
          <span className="text-xs font-medium" style={{ color: "#9B91A8" }}>
            {teamState.members.length} members
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {teamState.members.map((m) => (
            <div
              key={m.id}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs"
              style={{
                background: "rgba(255,247,232,0.05)",
                border: "1px solid rgba(255,247,232,0.08)",
                color: "#FFF7E8",
              }}
            >
              <div
                className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold"
                style={{ background: "linear-gradient(135deg, #FF5F5F, #C084FC)" }}
              >
                {m.initials[0]}
              </div>
              {m.name}
            </div>
          ))}
        </div>
      </div>

      {/* Biggest gap insight */}
      <div
        className="rounded-xl p-4 space-y-2"
        style={{
          background: "rgba(255,95,95,0.06)",
          border: "1px solid rgba(255,95,95,0.15)",
          boxShadow: "0 0 20px rgba(255,95,95,0.05)",
        }}
      >
        <div className="flex items-center gap-1.5 mb-1">
          <Zap size={11} style={{ color: "#FF5F5F" }} />
          <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "#FF5F5F" }}>
            Biggest Opportunity
          </span>
        </div>
        <p className="text-sm font-semibold" style={{ color: "#FFF7E8" }}>
          Bring {gap.label} into the room.
        </p>
        <p className="text-xs" style={{ color: "#9B91A8" }}>
          {gap.insight}
        </p>
        <button
          onClick={onViewTeam}
          className="flex items-center gap-1 text-xs font-semibold mt-1 transition-colors duration-200 focus:outline-none focus-visible:underline"
          style={{ color: "#FF5F5F" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#FFF7E8")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#FF5F5F")}
        >
          View Team
          <ChevronRight size={12} />
        </button>
      </div>
    </div>
  );
}
