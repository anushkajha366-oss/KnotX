import type { SCIProject, SkillKey, TeamState } from "../types";
import { getCriticalGap } from "./mock";

export const ASK_KNOTX_QUESTIONS = [
  "How can we improve this team?",
  "What skills are missing?",
  "What teammate should we add next?",
] as const;

export type AskKnotXQuestion = (typeof ASK_KNOTX_QUESTIONS)[number];

export interface PreparedKnotXContext {
  question: AskKnotXQuestion;
  project: {
    name: string;
    description: string;
    requiredRoles: string[];
    requiredSkills: string[];
  };
  team: {
    sci: number;
    coverage: Record<SkillKey, number>;
    members: Array<{ name: string; role: string; skills: string[] }>;
    biggestStrength: { skill: SkillKey; coverage: number };
    biggestRemainingGap: { label: string; insight: string };
  };
}

export function prepareKnotXContext(
  question: AskKnotXQuestion,
  teamState: TeamState,
  activeProject: SCIProject | undefined,
  memberSkills: Record<string, string[]>
): PreparedKnotXContext {
  const strongest = (Object.entries(teamState.coverage) as [SkillKey, number][]).reduce(
    (best, current) => (current[1] > best[1] ? current : best)
  );
  const gap = getCriticalGap(teamState.members, teamState.coverage, activeProject);

  return {
    question,
    project: {
      name: activeProject?.name ?? "Neural Nexus",
      description: activeProject?.description ?? "A product-minded team building accessible learning tools.",
      requiredRoles: [...(activeProject?.requiredRoles ?? [])],
      requiredSkills: [...(activeProject?.requiredSkills ?? [])],
    },
    team: {
      sci: teamState.sci,
      coverage: { ...teamState.coverage },
      members: teamState.members.map((member) => ({
        name: member.name,
        role: member.role,
        skills: [...(memberSkills[member.id] ?? [])],
      })),
      biggestStrength: { skill: strongest[0], coverage: strongest[1] },
      biggestRemainingGap: gap,
    },
  };
}
