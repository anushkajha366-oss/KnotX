import { useState } from "react";
import { ArrowLeft, Printer, Shield, TrendingUp, AlertTriangle, Sparkles, UserRoundX, ArrowRightLeft, MessageCircle, CheckCircle2 } from "lucide-react";
import type { SCIProject, TeamState, SkillKey, TeamMember } from "../types";
import { computeTeamState, getBiggestGap, getCriticalGap, rankReserveCandidates } from "../data/mock";
import { ASK_KNOTX_QUESTIONS, prepareKnotXContext, type AskKnotXQuestion, type PreparedKnotXContext } from "../data/askKnotX";
import SkillBar from "../components/SkillBar";

interface MyTeamProps {
  teamState: TeamState;
  activeProject?: SCIProject;
  initialMembers: TeamMember[];
  onSwitch: (unavailableId: string, reserveId: string) => void;
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

export default function MyTeam({ teamState, activeProject, initialMembers, onSwitch }: MyTeamProps) {
  const [deckOpen, setDeckOpen] = useState(false);
  const [benchOpen, setBenchOpen] = useState(false);
  const [unavailableId, setUnavailableId] = useState<string | null>(null);
  const gap = getBiggestGap(teamState.coverage);
  const projectName = activeProject?.name ?? "Neural Nexus";
  const projectDescription = activeProject?.description ?? "A product-minded team building accessible learning tools.";
  const sci = teamState.sci;
  const sciColor = sci >= 90 ? "#7EF0C5" : sci >= 75 ? "#C084FC" : "#FF5F5F";
  const knotted = teamState.knottedIds;
  const unavailableMember = teamState.members.find((member) => member.id === unavailableId);
  const stateWithoutMember = unavailableMember
    ? computeTeamState(
        knotted.filter((id) => id !== unavailableMember.id),
        activeProject,
        initialMembers.filter((member) => member.id !== unavailableMember.id)
      )
    : null;
  const coverageDrops = stateWithoutMember
    ? SKILL_KEYS.filter((skill) => stateWithoutMember.coverage[skill] < teamState.coverage[skill])
    : [];
  const reserves = unavailableMember
    ? rankReserveCandidates(unavailableMember, knotted, initialMembers, activeProject)
    : [];

  if (deckOpen) {
    return (
      <TeamDeck
        teamState={teamState}
        activeProject={activeProject}
        onClose={() => setDeckOpen(false)}
      />
    );
  }

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
{projectName}
          </h1>
          <p className="text-base max-w-xl" style={{ color: "#9B91A8" }}>
{projectDescription}
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

            <div
              className="rounded-2xl p-6 space-y-3"
              style={{ background: "rgba(255,95,95,0.05)", border: "1px solid rgba(255,95,95,0.16)" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,95,95,0.1)", color: "#FF5F5F" }}>
                  <UserRoundX size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold" style={{ color: "#FFF7E8" }}>Bench &amp; Switch</h3>
                  <p className="text-xs" style={{ color: "#9B91A8" }}>Replace an unavailable teammate with the best reserve fit.</p>
                </div>
              </div>
              <button
                onClick={() => setBenchOpen(true)}
                className="w-full py-2.5 rounded-xl text-xs font-bold transition-colors"
                style={{ background: "rgba(255,95,95,0.12)", border: "1px solid rgba(255,95,95,0.25)", color: "#FF5F5F" }}
              >
                Open Bench &amp; Switch
              </button>
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

            <div
              className="rounded-2xl p-6 text-center space-y-3"
              style={{
                background: "rgba(37,27,50,0.4)",
                border: "1px solid rgba(255,247,232,0.06)",
              }}
            >
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
                Create a live, shareable summary of your project, team strengths, and SCI.
              </p>
              <button
                onClick={() => setDeckOpen(true)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C084FC]"
                style={{
                  background: "rgba(192,132,252,0.14)",
                  border: "1px solid rgba(192,132,252,0.28)",
                  color: "#C084FC",
                }}
              >
                Generate Team Deck
              </button>
            </div>
          </div>
        </div>
      </div>

      {benchOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-8" style={{ background: "rgba(12,9,18,0.82)", backdropFilter: "blur(8px)" }}>
          <div className="max-w-3xl mx-auto rounded-3xl p-6 sm:p-8 space-y-6" style={{ background: "#211A2D", border: "1px solid rgba(192,132,252,0.25)" }}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: "#FF5F5F" }}>Team continuity</p>
                <h2 className="text-2xl font-bold" style={{ color: "#FFF7E8" }}>Bench &amp; Switch</h2>
                <p className="text-sm mt-2" style={{ color: "#9B91A8" }}>Choose who is unavailable, then switch in a ranked reserve candidate.</p>
              </div>
              <button onClick={() => { setBenchOpen(false); setUnavailableId(null); }} className="text-sm font-semibold" style={{ color: "#9B91A8" }}>Close</button>
            </div>

            <div>
              <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#9B91A8" }}>1. Current team — select unavailable member</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {teamState.members.map((member) => (
                  <button
                    key={member.id}
                    onClick={() => setUnavailableId(member.id)}
                    className="text-left rounded-xl p-4 transition-colors"
                    style={{ background: unavailableId === member.id ? "rgba(255,95,95,0.13)" : "rgba(255,247,232,0.04)", border: `1px solid ${unavailableId === member.id ? "rgba(255,95,95,0.45)" : "rgba(255,247,232,0.08)"}` }}
                  >
                    <p className="text-sm font-bold" style={{ color: "#FFF7E8" }}>{member.name}</p>
                    <p className="text-xs mt-1" style={{ color: "#9B91A8" }}>{member.role}</p>
                  </button>
                ))}
              </div>
            </div>

            {unavailableMember && stateWithoutMember && (
              <>
                <div className="rounded-2xl p-5" style={{ background: "rgba(255,95,95,0.07)", border: "1px solid rgba(255,95,95,0.2)" }}>
                  <p className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: "#FF5F5F" }}>2. Gap opened</p>
                  <p className="text-sm font-semibold" style={{ color: "#FFF7E8" }}>{unavailableMember.role} is now an open role.</p>
                  <p className="text-xs mt-1" style={{ color: "#9B91A8" }}>
                    {coverageDrops.length > 0 ? `${coverageDrops.join(" and ")} coverage would drop without this teammate.` : "Review the reserve pool to protect project coverage and SCI."}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#9B91A8" }}>3. Reserve pool — ranked for this switch</p>
                  <div className="space-y-3">
                    {reserves.map(({ candidate, resultingSCI, fillsRole, relevantSkills }) => (
                      <div key={candidate.id} className="rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4" style={{ background: "rgba(255,247,232,0.04)", border: "1px solid rgba(255,247,232,0.09)" }}>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="text-base font-bold" style={{ color: "#FFF7E8" }}>{candidate.name}</p>
                            {fillsRole && <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: "rgba(126,240,197,0.1)", color: "#7EF0C5" }}>Role match</span>}
                          </div>
                          <p className="text-xs mt-1" style={{ color: "#9B91A8" }}>{candidate.role} · {candidate.availability}</p>
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {candidate.skills.map((skill) => <span key={skill} className="px-2 py-0.5 rounded-full text-[10px]" style={{ background: relevantSkills.includes(skill) ? "rgba(192,132,252,0.16)" : "rgba(255,247,232,0.06)", color: relevantSkills.includes(skill) ? "#C084FC" : "#9B91A8" }}>{skill}</span>)}
                          </div>
                          <p className="text-xs mt-3" style={{ color: "#7EF0C5" }}>Resulting team SCI: <strong>{resultingSCI}</strong> / 100</p>
                        </div>
                        <button
                          onClick={() => { onSwitch(unavailableMember.id, candidate.id); setBenchOpen(false); setUnavailableId(null); }}
                          className="shrink-0 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold"
                          style={{ background: "rgba(192,132,252,0.16)", border: "1px solid rgba(192,132,252,0.3)", color: "#C084FC" }}
                        >
                          <ArrowRightLeft size={14} /> Switch In
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


interface TeamDeckProps {
  teamState: TeamState;
  activeProject?: SCIProject;
  onClose: () => void;
}

function TeamDeck({ teamState, activeProject, onClose }: TeamDeckProps) {
  const [askOpen, setAskOpen] = useState(false);
  const [preparedContext, setPreparedContext] = useState<PreparedKnotXContext | null>(null);
  const projectName = activeProject?.name ?? "Neural Nexus";
  const projectDescription = activeProject?.description;
  const requirements = [
    ...(activeProject?.requiredRoles ?? []),
    ...(activeProject?.requiredSkills ?? []),
  ];
  const strongest = (Object.entries(teamState.coverage) as [SkillKey, number][]).reduce(
    (best, current) => (current[1] > best[1] ? current : best)
  );
  const gap = getCriticalGap(teamState.members, teamState.coverage, activeProject);
  const summary = `${projectName} is supported by ${teamState.members.length} team member${teamState.members.length === 1 ? "" : "s"} with strongest coverage in ${strongest[0]}. With an SCI of ${teamState.sci}, the next focus is ${gap.label}.`;
  const prepareQuestion = (question: AskKnotXQuestion) => {
    setPreparedContext(prepareKnotXContext(question, teamState, activeProject, MEMBER_SKILLS));
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 print:hidden">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C084FC]"
            style={{ background: "rgba(255,247,232,0.06)", color: "#FFF7E8", border: "1px solid rgba(255,247,232,0.1)" }}
          >
            <ArrowLeft size={15} />
            Back to Team
          </button>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C084FC]"
            style={{ background: "rgba(192,132,252,0.14)", color: "#C084FC", border: "1px solid rgba(192,132,252,0.28)" }}
          >
            <Printer size={15} />
            Print / Save as PDF
          </button>
          <button
            onClick={() => { setPreparedContext(null); setAskOpen(true); }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7EF0C5]"
            style={{ background: "rgba(126,240,197,0.12)", color: "#7EF0C5", border: "1px solid rgba(126,240,197,0.28)" }}
          >
            <MessageCircle size={15} />
            Ask KnotX
          </button>
        </div>

        <section
          className="glass rounded-3xl overflow-hidden"
          style={{ border: "1px solid rgba(192,132,252,0.2)", boxShadow: "0 0 60px rgba(192,132,252,0.08)" }}
        >
          <div className="p-7 sm:p-10" style={{ background: "linear-gradient(135deg, rgba(192,132,252,0.12), rgba(255,95,95,0.06))" }}>
            <div className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase mb-5" style={{ color: "#C084FC" }}>
              <Sparkles size={12} />
              KnotX Team Deck
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold mb-3" style={{ color: "#FFF7E8" }}>
              {projectName}
            </h1>
            {projectDescription && (
              <p className="text-base max-w-2xl" style={{ color: "#C9C1D2" }}>
                {projectDescription}
              </p>
            )}
            {requirements.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {requirements.map((requirement) => (
                  <span key={requirement} className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: "rgba(255,247,232,0.08)", color: "#FFF7E8", border: "1px solid rgba(255,247,232,0.12)" }}>
                    {requirement}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="p-7 sm:p-10 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <DeckMetric label="Team SCI" value={String(teamState.sci)} suffix="/ 100" color="#C084FC" />
              <DeckMetric label="Biggest Strength" value={strongest[0]} suffix={`${strongest[1]}% coverage`} color="#7EF0C5" />
              <DeckMetric label="Next Focus" value={gap.label} suffix={gap.insight} color="#FF5F5F" />
            </div>

            <div>
              <h2 className="text-sm font-bold tracking-widest uppercase mb-4" style={{ color: "#9B91A8" }}>
                Skill Coverage
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SKILL_KEYS.map((skill) => (
                  <div key={skill} className="rounded-xl p-4" style={{ background: "rgba(255,247,232,0.04)", border: "1px solid rgba(255,247,232,0.08)" }}>
                    <div className="flex justify-between text-xs mb-2">
                      <span style={{ color: "#FFF7E8" }}>{skill}</span>
                      <span className="font-bold" style={{ color: "#C084FC" }}>{teamState.coverage[skill]}%</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,247,232,0.08)" }}>
                      <div className="h-full rounded-full" style={{ width: `${teamState.coverage[skill]}%`, background: "linear-gradient(90deg, #FF5F5F, #C084FC, #7EF0C5)" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-sm font-bold tracking-widest uppercase mb-4" style={{ color: "#9B91A8" }}>
                Team Members
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {teamState.members.map((member) => {
                  const skills = MEMBER_SKILLS[member.id] ?? [];
                  const proof = MEMBER_PROOF[member.id] ?? ["GitHub Connected"];
                  return (
                    <div key={member.id} className="rounded-2xl p-5" style={{ background: "rgba(255,247,232,0.04)", border: "1px solid rgba(255,247,232,0.08)" }}>
                      <p className="text-base font-bold" style={{ color: "#FFF7E8" }}>{member.name}</p>
                      <p className="text-xs mt-1 mb-4" style={{ color: "#9B91A8" }}>{member.role}</p>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {skills.map((skill) => (
                          <span key={skill} className="px-2 py-1 rounded-full text-[10px]" style={{ background: "rgba(192,132,252,0.1)", color: "#C084FC" }}>{skill}</span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {proof.map((item) => (
                          <span key={item} className="px-2 py-1 rounded-full text-[10px]" style={{ background: "rgba(126,240,197,0.08)", color: "#7EF0C5" }}>✓ {item}</span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl p-5" style={{ background: "rgba(192,132,252,0.06)", border: "1px solid rgba(192,132,252,0.16)" }}>
              <p className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: "#C084FC" }}>
                Team Summary
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "#FFF7E8" }}>{summary}</p>
            </div>
          </div>
        </section>
      </div>

      {askOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-8" style={{ background: "rgba(12,9,18,0.82)", backdropFilter: "blur(8px)" }}>
          <div className="max-w-4xl mx-auto rounded-3xl p-6 sm:p-8 space-y-6" style={{ background: "#211A2D", border: "1px solid rgba(126,240,197,0.25)", boxShadow: "0 0 60px rgba(126,240,197,0.08)" }}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase mb-3" style={{ color: "#7EF0C5" }}>
                  <MessageCircle size={12} />
                  Team analysis workspace
                </div>
                <h2 className="text-2xl font-bold" style={{ color: "#FFF7E8" }}>Ask KnotX</h2>
                <p className="text-sm mt-2" style={{ color: "#9B91A8" }}>Review the live context KnotX will analyze, then prepare a question for a future AI connection.</p>
              </div>
              <button onClick={() => setAskOpen(false)} className="text-sm font-semibold" style={{ color: "#9B91A8" }}>Close</button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <ContextCard label="Active project">
                <p className="font-bold" style={{ color: "#FFF7E8" }}>{projectName}</p>
                <p className="mt-1" style={{ color: "#9B91A8" }}>{projectDescription}</p>
              </ContextCard>
              <ContextCard label="Current Team SCI">
                <p className="text-3xl font-bold" style={{ color: "#C084FC" }}>{teamState.sci}<span className="text-base" style={{ color: "#9B91A8" }}> / 100</span></p>
                <p className="mt-1" style={{ color: "#9B91A8" }}>Live Skill Complementarity Index</p>
              </ContextCard>
              <ContextCard label="Requirements">
                <ContextTags label="Required roles" values={activeProject?.requiredRoles ?? []} />
                <ContextTags label="Required skills" values={activeProject?.requiredSkills ?? []} />
              </ContextCard>
              <ContextCard label="Team outlook">
                <p style={{ color: "#7EF0C5" }}>Strength: {strongest[0]} ({strongest[1]}% coverage)</p>
                <p className="mt-2" style={{ color: "#FF5F5F" }}>Remaining gap: {gap.label}</p>
                <p className="mt-1" style={{ color: "#9B91A8" }}>{gap.insight}</p>
              </ContextCard>
            </div>

            <div className="rounded-2xl p-5" style={{ background: "rgba(255,247,232,0.04)", border: "1px solid rgba(255,247,232,0.08)" }}>
              <p className="text-[10px] font-bold tracking-widest uppercase mb-4" style={{ color: "#9B91A8" }}>Live skill coverage</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {SKILL_KEYS.map((skill) => (
                  <div key={skill} className="rounded-xl p-3" style={{ background: "rgba(192,132,252,0.07)" }}>
                    <p className="text-xs" style={{ color: "#9B91A8" }}>{skill}</p>
                    <p className="text-lg font-bold mt-1" style={{ color: "#FFF7E8" }}>{teamState.coverage[skill]}%</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase mb-3" style={{ color: "#9B91A8" }}>Current team</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {teamState.members.map((member) => (
                  <div key={member.id} className="rounded-xl p-4" style={{ background: "rgba(255,247,232,0.04)", border: "1px solid rgba(255,247,232,0.08)" }}>
                    <p className="text-sm font-bold" style={{ color: "#FFF7E8" }}>{member.name}</p>
                    <p className="text-xs mt-1" style={{ color: "#9B91A8" }}>{member.role}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {(MEMBER_SKILLS[member.id] ?? []).map((skill) => <span key={skill} className="px-2 py-0.5 rounded-full text-[10px]" style={{ background: "rgba(192,132,252,0.12)", color: "#C084FC" }}>{skill}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase mb-3" style={{ color: "#9B91A8" }}>Choose an analysis action</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {ASK_KNOTX_QUESTIONS.map((question) => (
                  <button key={question} onClick={() => prepareQuestion(question)} className="text-left rounded-xl p-4 transition-colors" style={{ background: preparedContext?.question === question ? "rgba(126,240,197,0.12)" : "rgba(255,247,232,0.04)", border: `1px solid ${preparedContext?.question === question ? "rgba(126,240,197,0.4)" : "rgba(255,247,232,0.08)"}`, color: "#FFF7E8" }}>
                    <p className="text-sm font-semibold">{question}</p>
                  </button>
                ))}
              </div>
            </div>

            {preparedContext && (
              <div className="rounded-2xl p-5 flex items-start gap-3" style={{ background: "rgba(126,240,197,0.07)", border: "1px solid rgba(126,240,197,0.22)" }}>
                <CheckCircle2 size={18} style={{ color: "#7EF0C5", flexShrink: 0, marginTop: 1 }} />
                <div>
                  <p className="text-sm font-bold" style={{ color: "#FFF7E8" }}>Analysis context prepared</p>
                  <p className="text-xs mt-1" style={{ color: "#9B91A8" }}>“{preparedContext.question}” is ready with this live project and team snapshot. AI analysis is not connected yet.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ContextCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-5" style={{ background: "rgba(255,247,232,0.04)", border: "1px solid rgba(255,247,232,0.08)" }}>
      <p className="text-[10px] font-bold tracking-widest uppercase mb-3" style={{ color: "#9B91A8" }}>{label}</p>
      <div className="text-xs leading-relaxed">{children}</div>
    </div>
  );
}

function ContextTags({ label, values }: { label: string; values: readonly string[] }) {
  return (
    <div className="mb-3 last:mb-0">
      <p className="text-xs mb-1.5" style={{ color: "#9B91A8" }}>{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {values.length > 0 ? values.map((value) => <span key={value} className="px-2 py-0.5 rounded-full text-[10px]" style={{ background: "rgba(192,132,252,0.12)", color: "#C084FC" }}>{value}</span>) : <span style={{ color: "#FFF7E8" }}>None specified</span>}
      </div>
    </div>
  );
}

function DeckMetric({
  label,
  value,
  suffix,
  color,
}: {
  label: string;
  value: string;
  suffix: string;
  color: string;
}) {
  return (
    <div className="rounded-2xl p-5" style={{ background: "rgba(255,247,232,0.04)", border: "1px solid rgba(255,247,232,0.08)" }}>
      <p className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: "#9B91A8" }}>{label}</p>
      <p className="text-xl font-bold mb-1" style={{ color }}>{value}</p>
      <p className="text-xs leading-relaxed" style={{ color: "#9B91A8" }}>{suffix}</p>
    </div>
  );
}
