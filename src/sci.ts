import type { SCIPerson, SCIProject, SCITeam, SkillKey } from "./types";

/** Spec §4 SCI formula weights (must sum to 1). */
export const SCI_WEIGHTS = {
  skillGapCoverage: 0.4,
  requiredSkillMatch: 0.25,
  availabilityCompatibility: 0.15,
  experienceFit: 0.1,
  interestAlignment: 0.1,
} as const;

const SKILL_KEYS: SkillKey[] = ["Frontend", "Backend", "AI / ML", "Design"];

const GENERIC_ROLE_WORDS = new Set([
  "developer",
  "engineer",
  "designer",
  "specialist",
  "lead",
  "intern",
  "manager",
]);

const STOPWORDS = new Set([
  "a",
  "an",
  "and",
  "for",
  "the",
  "of",
  "to",
  "in",
  "on",
  "with",
  "our",
  "your",
  "this",
  "that",
  "from",
]);

const EXPERIENCE_RANK: Record<string, number> = {
  beginner: 1,
  intermediate: 2,
  mixed: 2,
  advanced: 3,
};

function clamp100(n: number): number {
  return Math.min(100, Math.max(0, n));
}

function normalizeLabel(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, "/")
    .replace(/\s*\/\s*/g, "/")
    .replace(/[^a-z0-9/+\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function roleTokens(role: string): string[] {
  return normalizeLabel(role)
    .split(/[\s/]+/)
    .filter((token) => token.length > 1 && !GENERIC_ROLE_WORDS.has(token));
}

function rolesMatch(a: string, b: string): boolean {
  const na = normalizeLabel(a);
  const nb = normalizeLabel(b);
  if (!na || !nb) return false;
  if (na === nb) return true;
  if (na.includes(nb) || nb.includes(na)) return true;
  const ta = roleTokens(a);
  const tb = roleTokens(b);
  return ta.some((token) => tb.includes(token));
}

function skillsMatch(skill: string, person: SCIPerson): boolean {
  const target = normalizeLabel(skill);
  if (!target) return false;
  if (person.skills?.some((s) => normalizeLabel(s) === target || normalizeLabel(s).includes(target) || target.includes(normalizeLabel(s)))) {
    return true;
  }
  return rolesMatch(skill, person.role);
}

function mean(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

function skillGapCoverage(team: SCITeam): number {
  const values = SKILL_KEYS.map((key) => clamp100(team.coverage[key] ?? 0));
  return mean(values);
}

function requiredSkillMatch(team: SCITeam, project: SCIProject): number {
  const roles = project.requiredRoles ?? [];
  const skills = project.requiredSkills ?? [];
  if (roles.length === 0 && skills.length === 0) return 100;

  const roleScores = roles.map((role) =>
    team.members.some((member) => rolesMatch(role, member.role)) ? 100 : 0
  );
  const skillScores = skills.map((skill) =>
    team.members.some((member) => skillsMatch(skill, member)) ? 100 : 0
  );

  return mean([...roleScores, ...skillScores]);
}

function parseHours(value: string | undefined): number | null {
  if (!value) return null;
  const normalized = value.toLowerCase().replace(/–/g, "-").replace(/—/g, "-");
  if (normalized.includes("full-time") || normalized.includes("full time")) return 40;
  const range = normalized.match(/(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)/);
  if (range) {
    return (Number(range[1]) + Number(range[2])) / 2;
  }
  const lessThan = normalized.match(/<\s*(\d+(?:\.\d+)?)/);
  if (lessThan) return Math.max(0, Number(lessThan[1]) - 1);
  const hours = normalized.match(/(\d+(?:\.\d+)?)\s*(?:hrs?|hours?)/);
  if (hours) return Number(hours[1]);
  const lone = normalized.match(/(\d+(?:\.\d+)?)/);
  if (lone) return Number(lone[1]);
  return null;
}

function availabilityCompatibility(team: SCITeam, project: SCIProject): number {
  const projectHours = parseHours(project.availability);
  const memberHours = team.members
    .map((member) => parseHours(member.availability))
    .filter((h): h is number => h !== null);

  if (projectHours === null && memberHours.length === 0) return 50;
  if (projectHours === null) return 100;
  if (memberHours.length === 0) return 50;

  const teamHours = mean(memberHours);
  if (projectHours <= 0) return 100;
  if (teamHours >= projectHours) return 100;
  return clamp100((teamHours / projectHours) * 100);
}

function parseExperienceRank(value: string | undefined): number | null {
  if (!value) return null;
  const normalized = normalizeLabel(value);
  if (normalized in EXPERIENCE_RANK) return EXPERIENCE_RANK[normalized];
  const hackathons = value.toLowerCase().match(/(\d+)\s*hackathon/);
  if (hackathons) return Math.min(3, Number(hackathons[1]));
  return null;
}

function experienceFit(team: SCITeam, project: SCIProject): number {
  const projectRank = parseExperienceRank(project.experience);
  const memberRanks = team.members
    .map((member) => parseExperienceRank(member.experience))
    .filter((r): r is number => r !== null);

  if (projectRank === null && memberRanks.length === 0) return 50;
  if (projectRank === null) return 100;
  if (memberRanks.length === 0) return 50;

  const teamRank = mean(memberRanks);
  return clamp100(100 - 25 * Math.abs(teamRank - projectRank));
}

function tokenizeInterest(...parts: Array<string | undefined>): Set<string> {
  const tokens = new Set<string>();
  for (const part of parts) {
    if (!part) continue;
    for (const raw of normalizeLabel(part).split(/[\s/]+/)) {
      if (raw.length > 2 && !STOPWORDS.has(raw)) tokens.add(raw);
    }
  }
  return tokens;
}

function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 && b.size === 0) return 50;
  if (a.size === 0 || b.size === 0) return 50;
  let intersection = 0;
  for (const token of a) {
    if (b.has(token)) intersection += 1;
  }
  const union = a.size + b.size - intersection;
  if (union === 0) return 50;
  return (intersection / union) * 100;
}

function interestAlignment(team: SCITeam, project: SCIProject): number {
  const projectTokens = tokenizeInterest(
    project.interest,
    project.description,
    ...(project.tags ?? [])
  );
  const teamTokens = tokenizeInterest(...team.members.map((member) => member.interest));
  return jaccard(projectTokens, teamTokens);
}

/**
 * Skill Complementarity Index from spec §4.
 * SCI = 40% skill-gap coverage + 25% required-skill match + 15% availability
 *     + 10% experience fit + 10% interest alignment.
 * Pure and deterministic: no I/O, no random, no candidate.sciAfter.
 */
export function calculateSCI(team: SCITeam, project: SCIProject): number {
  const sci =
    SCI_WEIGHTS.skillGapCoverage * skillGapCoverage(team) +
    SCI_WEIGHTS.requiredSkillMatch * requiredSkillMatch(team, project) +
    SCI_WEIGHTS.availabilityCompatibility * availabilityCompatibility(team, project) +
    SCI_WEIGHTS.experienceFit * experienceFit(team, project) +
    SCI_WEIGHTS.interestAlignment * interestAlignment(team, project);

  return Math.round(clamp100(sci));
}
