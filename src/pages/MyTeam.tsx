import { Shield, TrendingUp, AlertTriangle, Sparkles, Lock } from "lucide-react";
import type { TeamState, SkillKey } from "../types";
import { getBiggestGap } from "../data/mock";
import SkillBar from "../components/SkillBar";

interface MyTeamProps {
  teamState: TeamState;
}

const SKILL_KEYS: SkillKey[] = ["Frontend", "Backend", "AI / ML", "Design"];

const AVATAR_GRADIENTS: Record<string, [string, string]> = {
  rahul: ["#FF5F5F", "#C084FC"],
  aryan: ["#C084FC", "#7EF0C5"],
  anushka: ["#7EF0C5", "#FF5F5F"],
  ananya: ["#FF5F5F", "#C084FC"],
  karan: ["#C084FC", "#7EF0C5"],
  dev: ["#7EF0C5", "#FF5F5F"],
};

const MEMBER_PROOF: Record<string, string[]> = {
  rahul: ["GitHub Connected", "LinkedIn Connected"],
  aryan: ["GitHub Connected", "Vercel Portfolio"],
  anushka: ["GitHub Connected", "Kaggle Profile"],
  ananya: ["GitHub Connected", "Figma Portfolio Connected"],
  karan: ["GitHub Connected", "Kaggle Profile Connected"],
  dev: ["GitHub Connected", "LinkedIn Connected"],
};

const MEMBER_SKILLS: Record<string, string[]> = {
  rahul: ["React", "TypeScript", "Tailwind"],
  aryan: ["Node.js", "PostgreSQL", "Docker"],
  anushka: ["Python", "TensorFlow", "NLP"],
  ananya: ["Figma", "UI/UX", "User Research"],
  karan: ["Python", "TensorFlow", "Computer Vision"],
  dev: ["Node.js", "APIs", "PostgreSQL"],
};

export default function MyTeam({ teamState }: MyTeamProps) {
  const gap = getBiggestGap(teamState.coverage);
  const sci = teamState.sci;
  const sciColor = sci >= 90 ? "#7EF0C5" : sci >= 75 ? "#C084FC" : "#FF5F5F";
  const knotted = teamState.knottedIds;

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div
            className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase mb-4 px-3 py-1.5 rounded-full"
            style={{
              color: "#9B91A8",
              background: "rgba(255,247,232,0.05)",
              border: "1px solid rgba(255,247,232,0.08)",
            }}
          >
            Team Snapshot
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: "#FFF7E8" }}>
            Neural{" "}
            <em className="font-serif-italic" style={{ color: "#C084FC" }}>
              Nexus
            </em>
          </h1>
          <p className="text-base max-w-xl" style={{ color: "#9B91A8" }}>
            A product-minded team building accessible learning tools.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6">
          {/* Left column */}
          <div className="space-y-5">
            {/* SCI Overview */}
            <div
              className="glass rounded-2xl p-6"
              style={{ border: "1px solid rgba(255,247,232,0.07)" }}
            >
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "#9B91A8" }}>
                    Team SCI
                  </p>
                  <div className="flex items-end gap-2">
                    <span className="text-5xl font-bold tabular-nums" style={{ color: sciColor }}>
                      {sci}
                    </span>
                    <span className="text-xl pb-1" style={{ color: "rgba(155,145,168,0.5)" }}>/ 100</span>
                  </div>
                  <p className="text-xs mt-1" style={{ color: "#9B91A8" }}>
                    Skill Complementarity Index
                  </p>
                </div>
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `rgba(${sci >= 90 ? "126,240,197" : sci >= 75 ? "192,132,252" : "255,95,95"},0.1)`,
                    border: `1px solid rgba(${sci >= 90 ? "126,240,197" : sci >= 75 ? "192,132,252" : "255,95,95"},0.2)`,
                  }}
                >
                  <Shield size={24} style={{ color: sciColor }} />
                </div>
              </div>
              <div
                className="h-1.5 rounded-full overflow-hidden mb-1"
                style={{ background: "rgba(255,247,232,0.06)" }}
              >
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{
                    width: `${sci}%`,
                    background: `linear-gradient(90deg, #FF5F5F, #C084FC, ${sciColor})`,
                  }}
                />
              </div>
            </div>

            {/* Skill coverage */}
            <div
              className="glass rounded-2xl p-6 space-y-4"
              style={{ border: "1px solid rgba(255,247,232,0.07)" }}
            >
              <h2 className="text-sm font-bold" style={{ color: "#FFF7E8" }}>
                Skill Coverage
              </h2>
              {SKILL_KEYS.map((skill) => (
                <SkillBar key={skill} skill={skill} value={teamState.coverage[skill]} animate />
              ))}
            </div>

            {/* Strengths + blind spots */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                className="rounded-2xl p-5 space-y-2"
                style={{
                  background: "rgba(126,240,197,0.05)",
                  border: "1px solid rgba(126,240,197,0.15)",
                }}
              >
                <div className="flex items-center gap-1.5 mb-3">
                  <TrendingUp size={13} style={{ color: "#7EF0C5" }} />
                  <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "#7EF0C5" }}>
                    Biggest Strength
                  </span>
                </div>
                <p className="text-sm font-medium" style={{ color: "#FFF7E8" }}>
                  Full-stack product development with strong AI capabilities.
                </p>
              </div>

              <div
                className="rounded-2xl p-5 space-y-2"
                style={{
                  background: "rgba(255,95,95,0.05)",
                  border: "1px solid rgba(255,95,95,0.15)",
                }}
              >
                <div className="flex items-center gap-1.5 mb-3">
                  <AlertTriangle size={13} style={{ color: "#FF5F5F" }} />
                  <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "#FF5F5F" }}>
                    Potential Blind Spot
                  </span>
                </div>
                <p className="text-sm font-medium" style={{ color: "#FFF7E8" }}>
                  {gap.value < 50
                    ? `Limited ${gap.skill} experience may slow progress.`
                    : "Limited cloud deployment experience."}
                </p>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-5">
            {/* Team members */}
            <div
              className="glass rounded-2xl p-6 space-y-4"
              style={{ border: "1px solid rgba(255,247,232,0.07)" }}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold" style={{ color: "#FFF7E8" }}>
                  Team Members
                </h2>
                <span
                  className="text-xs font-bold tabular-nums px-2.5 py-1 rounded-full"
                  style={{
                    background: "rgba(255,95,95,0.1)",
                    border: "1px solid rgba(255,95,95,0.2)",
                    color: "#FF5F5F",
                  }}
                >
                  {teamState.members.length}
                </span>
              </div>

              {teamState.members.map((member) => {
                const isKnotted = knotted.includes(member.id);
                const gradient = AVATAR_GRADIENTS[member.id] ?? ["#FF5F5F", "#C084FC"];
                const proof = MEMBER_PROOF[member.id] ?? ["GitHub Connected"];
                const skills = MEMBER_SKILLS[member.id] ?? [];

                return (
                  <div
                    key={member.id}
                    className="rounded-xl p-4 space-y-3"
                    style={{
                      background: isKnotted ? "rgba(126,240,197,0.04)" : "rgba(255,247,232,0.03)",
                      border: isKnotted ? "1px solid rgba(126,240,197,0.15)" : "1px solid rgba(255,247,232,0.07)",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0"
                        style={{
                          background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`,
                          color: "#FFF7E8",
                        }}
                      >
                        {member.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold" style={{ color: "#FFF7E8" }}>
                            {member.name}
                          </span>
                          {isKnotted && (
                            <span
                              className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                              style={{
                                background: "rgba(126,240,197,0.1)",
                                border: "1px solid rgba(126,240,197,0.25)",
                                color: "#7EF0C5",
                              }}
                            >
                              Knotted
                            </span>
                          )}
                        </div>
                        <p className="text-xs" style={{ color: "#9B91A8" }}>
                          {member.role}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {skills.map((s) => (
                        <span
                          key={s}
                          className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                          style={{
                            background: "rgba(255,247,232,0.05)",
                            border: "1px solid rgba(255,247,232,0.08)",
                            color: "#9B91A8",
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {proof.map((p) => (
                        <span
                          key={p}
                          className="flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full"
                          style={{
                            background: "rgba(126,240,197,0.06)",
                            border: "1px solid rgba(126,240,197,0.15)",
                            color: "#7EF0C5",
                          }}
                        >
                          ✓ {p}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Generate team deck — coming soon */}
            <div
              className="rounded-2xl p-6 text-center space-y-3 relative overflow-hidden"
              style={{
                background: "rgba(37,27,50,0.4)",
                border: "1px solid rgba(255,247,232,0.06)",
              }}
            >
              {/* Blur overlay */}
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: "rgba(23,19,33,0.5)",
                  backdropFilter: "blur(2px)",
                }}
              />
              <div className="relative z-10 space-y-3">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <Lock size={11} style={{ color: "#9B91A8" }} />
                  <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "#9B91A8" }}>
                    Coming Soon
                  </span>
                </div>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto"
                  style={{
                    background: "rgba(192,132,252,0.1)",
                    border: "1px solid rgba(192,132,252,0.15)",
                  }}
                >
                  <Sparkles size={20} style={{ color: "#C084FC" }} />
                </div>
                <h3 className="text-sm font-bold" style={{ color: "#FFF7E8" }}>
                  Generate Team Deck
                </h3>
                <p className="text-xs" style={{ color: "#9B91A8" }}>
                  Export a beautiful one-pager showcasing your team's skills and SCI for investors and hackathon judges.
                </p>
                <button
                  disabled
                  className="px-5 py-2.5 rounded-xl text-xs font-bold cursor-not-allowed"
                  style={{
                    background: "rgba(192,132,252,0.1)",
                    border: "1px solid rgba(192,132,252,0.2)",
                    color: "rgba(192,132,252,0.5)",
                  }}
                >
                  Generate Team Deck
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
