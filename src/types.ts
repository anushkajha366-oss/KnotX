export type Page = "match" | "discover" | "create" | "team";

export type SkillKey = "Frontend" | "Backend" | "AI / ML" | "Design";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  initials: string;
}

export interface Candidate {
  id: string;
  name: string;
  initials: string;
  role: string;
  sci: number;
  proofScore: number;
  skills: string[];
  availability: string;
  experience: string;
  interest: string;
  gradientFrom: string;
  gradientTo: string;
  proofBadges: string[];
  whyTheyFit: string[];
  ripple: {
    coverageAfter: Partial<Record<SkillKey, number>>;
    sciAfter: number;
  };
}

export interface TeamState {
  members: TeamMember[];
  coverage: Record<SkillKey, number>;
  sci: number;
  knottedIds: string[];
}
