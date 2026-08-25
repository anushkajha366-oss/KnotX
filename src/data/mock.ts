import type { Candidate, SCIPerson, SCIProject, TeamMember, TeamState, SkillKey } from "../types";
import { calculateSCI } from "../sci";

export const INITIAL_MEMBERS: TeamMember[] = [
  { id: "rahul", name: "Rahul", role: "Frontend", initials: "RS" },
  { id: "aryan", name: "Aryan", role: "Backend", initials: "AK" },
  { id: "anushka", name: "Anushka", role: "AI / ML", initials: "AN" },
];

export const INITIAL_COVERAGE: Record<SkillKey, number> = {
  Frontend: 80,
  Backend: 90,
  "AI / ML": 40,
  Design: 0,
};

export const INITIAL_SCI = 68;

const INITIAL_MEMBER_COVERAGE: Record<string, Partial<Record<SkillKey, number>>> = {
  rahul: { Frontend: 80 },
  aryan: { Backend: 90 },
  anushka: { "AI / ML": 40 },
};

export const CANDIDATES: Candidate[] = [
  {
    id: "ananya",
    name: "Ananya Shah",
    initials: "AS",
    role: "Product Designer",
    sci: 94,
    proofScore: 87,
    skills: ["Figma", "UI/UX", "User Research"],
    availability: "12 hrs / week",
    experience: "2 hackathons",
    interest: "Accessibility & EdTech",
    gradientFrom: "#FF5F5F",
    gradientTo: "#C084FC",
    proofBadges: ["GitHub Connected", "Figma Portfolio Connected"],
    whyTheyFit: [
      "Fills your team's biggest skill gap",
      "Availability fits your project timeline",
      "Strong alignment with Accessibility & EdTech",
    ],
    ripple: {
      coverageAfter: { Design: 100, "AI / ML": 75 },
      sciAfter: 91,
    },
  },
  {
    id: "karan",
    name: "Karan Mehta",
    initials: "KM",
    role: "ML Engineer",
    sci: 82,
    proofScore: 91,
    skills: ["Python", "TensorFlow", "Computer Vision"],
    availability: "10 hrs / week",
    experience: "3 hackathons",
    interest: "AI & Accessibility",
    gradientFrom: "#C084FC",
    gradientTo: "#7EF0C5",
    proofBadges: ["GitHub Connected", "Kaggle Profile Connected"],
    whyTheyFit: [
      "Doubles your AI/ML depth",
      "Proven track record across 3 hackathons",
      "Deep alignment with Accessibility use cases",
    ],
    ripple: {
      coverageAfter: { "AI / ML": 95 },
      sciAfter: 96,
    },
  },
  {
    id: "dev",
    name: "Dev Arora",
    initials: "DA",
    role: "Backend Developer",
    sci: 74,
    proofScore: 84,
    skills: ["Node.js", "APIs", "PostgreSQL"],
    availability: "8 hrs / week",
    experience: "2 hackathons",
    interest: "Developer Tools",
    gradientFrom: "#7EF0C5",
    gradientTo: "#FF5F5F",
    proofBadges: ["GitHub Connected", "LinkedIn Connected"],
    whyTheyFit: [
      "Reinforces your backend foundation",
      "API expertise accelerates your build",
      "Reliability under tight hackathon timelines",
    ],
    ripple: {
      coverageAfter: { Backend: 97 },
      sciAfter: 98,
    },
  },
];

export const CANDIDATE_MEMBERS: Record<string, TeamMember> = {
  ananya: { id: "ananya", name: "Ananya Shah", role: "Product Designer", initials: "AS" },
  karan: { id: "karan", name: "Karan Mehta", role: "ML Engineer", initials: "KM" },
  dev: { id: "dev", name: "Dev Arora", role: "Backend Developer", initials: "DA" },
};

function toSCIPerson(member: TeamMember): SCIPerson {
  const candidate = CANDIDATES.find((c) => c.id === member.id);
  if (!candidate) {
    return { role: member.role };
  }
  return {
    role: member.role,
    skills: candidate.skills,
    availability: candidate.availability,
    experience: candidate.experience,
    interest: candidate.interest,
  };
}

function toSCIProject(): SCIProject {
  const project = DISCOVER_PROJECTS.find((p) => p.id === "neural-nexus");
  if (!project) {
    return {};
  }
  return {
    requiredRoles: project.needs ? [project.needs] : [],
    tags: project.tags,
    description: project.description,
  };
}

export function computeTeamState(
  knottedIds: string[],
  project: SCIProject = toSCIProject(),
  initialMembers: TeamMember[] = INITIAL_MEMBERS
): TeamState {
  const coverage = {
    Frontend: 0,
    Backend: 0,
    "AI / ML": 0,
    Design: 0,
  } as Record<SkillKey, number>;

  for (const member of initialMembers) {
    for (const [skill, value] of Object.entries(INITIAL_MEMBER_COVERAGE[member.id] ?? {})) {
      coverage[skill as SkillKey] = Math.max(coverage[skill as SkillKey], value as number);
    }
  }

  for (const id of CANDIDATES.map((c) => c.id)) {
    if (!knottedIds.includes(id)) continue;
    const candidate = CANDIDATES.find((c) => c.id === id)!;
    for (const [skill, val] of Object.entries(candidate.ripple.coverageAfter)) {
      const k = skill as SkillKey;
      coverage[k] = Math.max(coverage[k], val as number);
    }
  }

  const members: TeamMember[] = [
    ...initialMembers,
    ...knottedIds.map((id) => CANDIDATE_MEMBERS[id]).filter(Boolean),
  ];

  const sci = calculateSCI(
    { members: members.map(toSCIPerson), coverage },
    project
  );

  return { members, coverage, sci, knottedIds };
}


export interface RankedCandidate {
  candidate: Candidate;
  matchScore: number;
}

export function rankCandidates(
  knottedIds: string[],
  project: SCIProject = toSCIProject()
): RankedCandidate[] {
  return CANDIDATES
    .filter((candidate) => !knottedIds.includes(candidate.id))
    .map((candidate) => ({
      candidate,
      matchScore: computeTeamState([...knottedIds, candidate.id], project).sci,
    }))
    .sort(
      (a, b) =>
        b.matchScore - a.matchScore ||
        b.candidate.proofScore - a.candidate.proofScore ||
        a.candidate.id.localeCompare(b.candidate.id)
    );
}

export interface ReserveCandidate extends RankedCandidate {
  resultingSCI: number;
  fillsRole: boolean;
  relevantSkills: string[];
}

export function rankReserveCandidates(
  unavailableMember: TeamMember,
  knottedIds: string[],
  initialMembers: TeamMember[],
  project: SCIProject = toSCIProject()
): ReserveCandidate[] {
  const remainingInitialMembers = initialMembers.filter((member) => member.id !== unavailableMember.id);
  const remainingKnottedIds = knottedIds.filter((id) => id !== unavailableMember.id);
  const teamIds = new Set([
    ...remainingInitialMembers.map((member) => member.id),
    ...remainingKnottedIds,
  ]);

  return CANDIDATES
    .filter((candidate) => candidate.id !== unavailableMember.id && !teamIds.has(candidate.id))
    .map((candidate) => {
      const nextState = computeTeamState(
        [...remainingKnottedIds, candidate.id],
        project,
        remainingInitialMembers
      );
      const relevantSkills = candidate.skills.filter((skill) =>
        (project.requiredSkills ?? []).some((required) => labelsMatch(skill, required)) ||
        (project.tags ?? []).some((tag) => labelsMatch(skill, tag))
      );

      return {
        candidate,
        matchScore: nextState.sci,
        resultingSCI: nextState.sci,
        fillsRole: reserveFillsRole(candidate, unavailableMember),
        relevantSkills,
      };
    })
    .sort(
      (a, b) =>
        b.resultingSCI - a.resultingSCI ||
        Number(b.fillsRole) - Number(a.fillsRole) ||
        b.relevantSkills.length - a.relevantSkills.length ||
        b.candidate.proofScore - a.candidate.proofScore ||
        a.candidate.id.localeCompare(b.candidate.id)
    );
}

function reserveFillsRole(candidate: Candidate, unavailableMember: TeamMember): boolean {
  if (labelsMatch(candidate.role, unavailableMember.role)) return true;

  const candidateLabel = `${candidate.role} ${candidate.skills.join(" ")}`.toLowerCase();
  const role = unavailableMember.role.toLowerCase();
  return (
    (role.includes("ai") || role.includes("ml")) &&
    (candidateLabel.includes("ai") || candidateLabel.includes("ml") || candidateLabel.includes("tensorflow"))
  );
}

function labelsMatch(a: string, b: string): boolean {
  const left = a.toLowerCase().trim();
  const right = b.toLowerCase().trim();
  return left === right || left.includes(right) || right.includes(left);
}

export function getCriticalGap(
  members: TeamMember[],
  coverage: Record<SkillKey, number>,
  project?: SCIProject
): { label: string; insight: string } {
  for (const role of project?.requiredRoles ?? []) {
    if (!members.some((member) => labelsMatch(role, member.role))) {
      return {
        label: role,
        insight: `This project needs a ${role}.`,
      };
    }
  }

  for (const skill of project?.requiredSkills ?? []) {
    const isCovered = members.some((member) => {
      const person = toSCIPerson(member);
      return (
        person.skills?.some((memberSkill) => labelsMatch(skill, memberSkill)) ||
        labelsMatch(skill, person.role)
      );
    });
    if (!isCovered) {
      return {
        label: skill,
        insight: `This project needs ${skill} expertise.`,
      };
    }
  }

  const gap = getBiggestGap(coverage);
  return { label: gap.label, insight: gap.insight };
}

export function getBiggestGap(coverage: Record<SkillKey, number>): {
  skill: SkillKey;
  value: number;
  label: string;
  insight: string;
} {
  const skills = Object.entries(coverage) as [SkillKey, number][];
  const [skill, value] = skills.reduce((a, b) => (a[1] < b[1] ? a : b));

  const insights: Record<SkillKey, string> = {
    Design: "A designer will lift your SCI the most.",
    "AI / ML": "Deeper ML expertise will accelerate your core product.",
    Backend: "More backend coverage will strengthen your infrastructure.",
    Frontend: "A skilled frontend engineer will complete your user layer.",
  };

  const labels: Record<SkillKey, string> = {
    Design: "Design & user research",
    "AI / ML": "AI / ML engineering",
    Backend: "Backend infrastructure",
    Frontend: "Frontend development",
  };

  return {
    skill,
    value,
    label: labels[skill],
    insight: insights[skill],
  };
}

export const DISCOVER_PROJECTS = [
  {
    id: "neural-nexus",
    name: "Neural Nexus",
    description: "AI accessibility platform",
    needs: "UI/UX Designer",
    sci: 68,
    tags: ["AI", "Accessibility", "EdTech"],
    type: "Hackathon",
  },
  {
    id: "greengrid",
    name: "GreenGrid",
    description: "Climate tracking application",
    needs: "Backend Developer",
    sci: 72,
    tags: ["Climate", "APIs", "Data"],
    type: "Startup",
  },
  {
    id: "campus-connect",
    name: "Campus Connect",
    description: "Student community platform",
    needs: "React Developer",
    sci: 64,
    tags: ["Community", "Mobile", "React"],
    type: "College Project",
  },
  {
    id: "opsync",
    name: "OpSync",
    description: "Remote team coordination tool",
    needs: "Product Designer",
    sci: 58,
    tags: ["Productivity", "SaaS", "Figma"],
    type: "Open Source",
  },
  {
    id: "dataspark",
    name: "DataSpark",
    description: "No-code analytics dashboard",
    needs: "ML Engineer",
    sci: 71,
    tags: ["Data", "Analytics", "Python"],
    type: "Startup",
  },
  {
    id: "leaflink",
    name: "LeafLink",
    description: "Sustainable marketplace for local farmers",
    needs: "Frontend Developer",
    sci: 65,
    tags: ["Sustainability", "E-commerce", "React"],
    type: "College Project",
  },
];
