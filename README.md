# 🪢 KnotX

### Build teams that complete each other.

KnotX is an intelligent team-building platform designed for hackathons, college projects, startups, and collaborative work. Instead of matching people based on similarity, KnotX focuses on **skill complementarity** — identifying what a team is missing and finding the people who fill those gaps.

> Don't just find teammates. Find what your team is missing.

`React` `TypeScript` `Vite` `Gemini API`

---

## The Problem

Finding teammates for a hackathon, project, or startup usually comes down to:

- Existing friend groups
- Whoever's available in a Discord/WhatsApp chat
- People who happen to have similar skills to you

This creates skill imbalance. A team can easily end up with three frontend developers, no backend developer, and no designer — because nobody had visibility into what the team actually needed.

Most matching platforms answer the wrong question:

> "Who is similar to me?"

**KnotX asks a different question:**

> **"What does this team need next?"**

---

## The Core Idea: Skill Complementarity

A good team isn't made of individually similar people — it's made of people whose capabilities complement each other. Every new member should ideally reduce the team's biggest gap.

```text
Team:
Frontend ✓
Backend  ✓
AI/ML    ✓
Design   ✗

→ KnotX prioritizes candidates who improve the missing Design coverage.
```

**Traditional matching:** `Person → Similar Person`

**KnotX:** `Team Requirements → Missing Skills → Best Complementary Candidate`

---

## How KnotX Works

### Step 1 — Find or Create a Project
Users can discover existing projects looking for teammates, or create a custom team search defining required roles, skills, interests, availability, and experience.

### Step 2 — Analyze Team Requirements
KnotX identifies existing team coverage, missing roles, missing skills, current SCI, and critical gaps.

### Step 3 — Match Candidates
Rather than using a static candidate order, KnotX simulates adding each candidate to the current team, calculates the resulting team SCI, and ranks candidates by the improvement they'd create.

> Candidate ranking is based on the simulated state of the team **after** adding that candidate — not a fixed score assigned beforehand.

### Step 4 — Knot or Skip
Users evaluate candidates on swipeable cards and decide to **Knot** (add) or **Skip** them. When a candidate is added, team state, coverage, SCI, remaining gaps, and future candidate rankings all update live.

---

## 🧠 SCI — Skill Complementarity Index

SCI is the intelligence at the heart of KnotX. It evaluates how effectively a team covers what a project actually needs.

```text
SCI =
40% Skill Gap Coverage
+ 25% Required Skill Match
+ 15% Availability Compatibility
+ 10% Experience Fit
+ 10% Interest Alignment
```

| Factor | Weight | What it measures |
|---|---|---|
| Skill Gap Coverage | 40% | Does this person fill something the team currently lacks? |
| Required Skill Match | 25% | Does the candidate have the skills the project requires? |
| Availability Compatibility | 15% | Can the candidate realistically work with the team? |
| Experience Fit | 10% | Does their experience align with the project's needs? |
| Interest Alignment | 10% | Do their interests and project tags align? |

SCI is **recalculated dynamically** as the team changes — adding or replacing a member updates the team's state and can reorder every remaining candidate.

---

## 🌊 Ripple Effect

Ripple Effect is KnotX's "what happens if I add this person?" preview — the platform's signature visual feature.

Say your current team is Anushka + Rahul + Aryan, with:

```text
Frontend: 80%   Backend: 90%   AI/ML: 40%   Design: 0%   SCI: 68
```

You see a candidate — Ananya — whose skills fill some of those gaps. Clicking **View Ripple Effect** doesn't add her to the team. Instead, KnotX computes `current team → current team + Ananya` and shows the predicted impact before any commitment is made:

```text
BEFORE                 AFTER

Frontend    80%   →    80%
Backend     90%   →    90%
AI/ML       40%   →    75%   (+35)
Design       0%   →   100%   (+100)

SCI         68    →    82    (+14)
```

One new connection changes the strength of the entire team — not just the profile of the person joining.

**Under the hood:** Ripple and Knot both run through the same `computeTeamState()` calculation, so the preview always reflects what would actually happen — not a pre-written or hardcoded outcome.

```text
current team
     +
 candidate
     ↓
computeTeamState()
     ↓
new coverage + new SCI
```

---

## Key Features

### 🧩 Intelligent Complementarity Matching
Ranks candidates by how much they'd improve the current team, not by how closely they resemble it.

### 📊 Dynamic SCI
Recalculates whenever members are added, removed, or replaced.

### 🔄 Dynamic Candidate Ranking
For every candidate, KnotX simulates `Current Team + Candidate → New Team State → SCI → Rank`. Ties are broken using resulting SCI, proof score, and stable ordering.

### 🔍 Discover Projects
Browse available projects with their description, required roles, tags, project type, and match information. Selecting a project (**Find Teammates**) opens the matching workspace ranked specifically for that project's requirements — a design/UI-focused project surfaces design-strong candidates first, a backend-focused project surfaces backend-strong candidates first.

### ✨ Create a Team Search
Define a custom project with roles, required skills per role, preferences, and existing team members — which KnotX uses to detect what's already covered and what's missing.

### 🏆 Proof of Work
A proof score sits alongside self-reported skills as an additional credibility signal — because skills can be claimed, but proof of work is harder to fake.

### 🔁 Bench & Switch
For when a teammate becomes unavailable mid-project:

1. Select the unavailable member.
2. Identify the role and coverage gap it creates.
3. Rank eligible reserve candidates.
4. Simulate their effect on the team.
5. Replace the member.
6. Recalculate SCI and coverage.

This makes KnotX useful *after* team formation, not just before it.

### 📄 Generate Team Deck
A live, shareable snapshot of the team: project identity, required roles and skills, current SCI, coverage, strongest capabilities, remaining gaps, members, skills, and proof information — exportable as PDF.

---

## 🤖 Ask KnotX — AI Team Analysis

Ask KnotX uses AI to analyze the **live, current team state** — not a generic prompt.

The AI receives structured context: the active project, its requirements, current team members, their roles and skills, team SCI, coverage percentages, strengths, and remaining gaps. Users can ask things like:

- "How can we improve this team?"
- "What skills are missing?"
- "What teammate should we add next?"

```text
Frontend
   ↓
Prepared KnotX Context
   ↓
POST /api/ask-knotx
   ↓
AI Model
   ↓
Contextual Team Analysis
   ↓
KnotX UI
```

API credentials are kept server-side via environment variables and are never exposed to the browser or committed to the repository.

---

## Architecture

```text
src/
├── components/      # Reusable UI components
├── data/            # Candidate, project and ranking data
├── pages/           # Application views
├── sci.ts           # Skill Complementarity Index logic
├── types.ts         # Shared TypeScript types
├── App.tsx          # Application state and navigation
└── main.tsx         # Application entry point
```

**State flow:**

```text
Active Project
      ↓
Candidate Ranking
      ↓
Match Workspace
      ↓
Knot / Skip
      ↓
Team State
      ↓
SCI + Coverage Recalculation
      ↓
My Team / Team Deck / Bench & Switch / Ask KnotX
```

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React | Frontend UI |
| TypeScript | Type-safe application logic |
| Vite | Development and build tooling |
| CSS | Visual styling |
| Gemini API | AI-powered team analysis |
| GitHub | Version control and collaboration |

---

## The Development Journey 🚀

**Phase 1 — The Idea**
The founding question: why do most team-building platforms match similar people instead of complementary people? That became KnotX's foundation.

**Phase 2 — Defining the Intelligence**
We built the Skill Complementarity Index. Instead of a fixed match score per candidate, the system asks "what happens to the team if this candidate joins?" — leading to dynamic team-state simulation and ranking.

**Phase 3 — Building the Matching Experience**
The project moved from static project/candidate data to project-aware matching, live SCI recalculation, and critical-gap detection:

```text
Static candidate → Static score
```
became
```text
Candidate + Current Team + Project
              ↓
       Simulated Team State
              ↓
          Dynamic SCI
```

**Phase 4 — Expanding Beyond Matching**
KnotX grew into a broader team management system: My Team, Team Deck, Proof signals, Bench & Switch — answering what happens *after* a team is formed.

**Phase 5 — Adding AI**
The final evolution was Ask KnotX — not just an AI chatbox, but a system aware of the active project, live team, skills, SCI, coverage, strengths, and gaps, feeding a structured live context to the AI endpoint.

---

## Challenges We Faced

**Static vs. dynamic matching** — Candidate and project data initially held static values. Making matching respond to the selected project and current team required simulating every candidate against the live team and ranking by resulting SCI.

**Keeping team state consistent** — Match Workspace, My Team, Bench & Switch, Team Deck, and Ask KnotX all depend on the same team. Making all five features read from one consistent live team state was a core architectural challenge.

**Designing AI context** — Generic prompts produce generic advice. KnotX instead prepares a structured live project-and-team snapshot so the AI's recommendations are grounded in the actual current situation.

**API and usage constraints** — API configuration and model availability required iteration and testing before the AI-powered analysis flow was fully operational.

---

## What Makes KnotX Different?

**Most team matching:** Find someone similar to you.
**KnotX:** Find the person your team is missing.

- Team-first instead of individual-first matching
- Dynamic SCI instead of static scores
- Candidate ranking based on simulated team outcomes, not fixed profiles
- Bench & Switch for when teams change mid-project
- Live Team Deck
- AI-powered contextual analysis grounded in real team state

---

## Future Scope

- User authentication
- Persistent profiles and teams
- Database integration
- Real project listings
- Verified Proof of Work via GitHub/portfolio integration
- Real-time team collaboration
- AI-powered candidate recommendations
- Natural-language project creation
- Team chemistry and communication compatibility
- Calendar and availability integration
- Larger reserve/bench system
- Swipe-based matching experience

---

## Local Setup

```bash
git clone <repository-url>
cd KnotX
npm install
npm run dev
```

For Ask KnotX, create a `.env.local` file:

```env
GEMINI_API_KEY=your_api_key_here
```

Then run:

```bash
npm run dev
```

To build for production:

```bash
npm run build
```

---

## Security Note

> API keys are stored in environment variables and are not committed to the repository.
> Never expose `.env.local` files or API credentials in client-side code.

---

## Final Vision

KnotX is built around a simple idea: the best teams are not formed by finding more people like you. They are formed by finding the people who complete what you are missing.

text
Don't just build a team.
Build the right combination.

Knot it together. ✦
<img width="1920" height="1080" alt="Screenshot (344)" src="https://github.com/user-attachments/assets/6d96183a-4313-4f96-937d-6e69c85fc42c" />
