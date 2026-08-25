# Build KnotX — Intelligent Team Formation Platform

Build a complete, polished, responsive frontend web application named **KnotX**.

KnotX is an intelligent team-building platform for hackathons, college projects, startups, open-source projects, and creative collaborations.

The core idea is simple:

> **Don’t just find teammates. Find what your team is missing.**

KnotX does not simply match people with similar skills. It analyzes the current team's skill coverage, identifies the biggest gaps, and recommends candidates who will make the team more complete.

Its core intelligence is called:

# SCI — Skill Complementarity Index

KnotX should answer:

> **“Who will make this team stronger?”**

rather than:

> “Who is most similar to this project?”

---

# 1. IMPORTANT IMPLEMENTATION RULES

This is a **frontend MVP**.

Do NOT require:

* Authentication
* Supabase
* Firebase
* A database
* External APIs
* Backend services
* Real-time services

Use:

* React
* TypeScript
* Tailwind CSS
* Local component/state management
* Realistic seeded mock data

The application should be fully interactive using local state.

All important interactions must actually work.

Do not create fake buttons that do nothing.

Do not use lorem ipsum.

Do not use generic dashboard layouts.

Do not create unnecessary pages or features.

Do not overbuild secondary functionality before the core matching experience is polished.

---

# 2. IMPLEMENTATION PRIORITY

Build in this order:

### Priority 1 — MUST BE EXCELLENT

1. Smart Matching Workspace
2. SCI calculation
3. Team skill-gap visualization
4. Candidate matching
5. Skip interaction
6. Knot interaction
7. Dynamic team updates
8. Ripple Effect

### Priority 2

9. Discover
10. Create a Search
11. My Team

### Priority 3 — visual placeholders only if needed

12. Generate Team Deck
13. Advanced Proof-of-Work integrations
14. Bench & Switch

Do NOT sacrifice the Smart Matching Workspace or Ripple Effect to implement secondary features.

The core matching experience is the heart of KnotX.

---

# 3. DEMO-FIRST DEFAULT STATE

The app should load immediately into a realistic demo state.

Do not show an empty dashboard.

Default project:

**Neural Nexus**

Project type:

**Hackathon**

Project description:

> An AI-powered accessibility platform for visually impaired students.

Default team:

* Rahul — Frontend
* Aryan — Backend
* Anushka — AI/ML

Current Team SCI:

**68 / 100**

Current skill coverage:

* Frontend — 80%
* Backend — 90%
* AI / ML — 40%
* Design — 0%

The biggest skill gap should immediately be:

**Design & User Research**

The first recommended candidate should be:

**Ananya Shah**

This should make the application ready for a live 2–3 minute hackathon demo immediately after loading.

The ideal demo flow is:

**68 SCI → Biggest Gap → Ananya 94% → View Ripple → 68 → 91 → Knot → Team Updated**

---

# 4. SCI ENGINE

SCI is the core intelligence of KnotX.

Use this scoring model consistently:

### SCI Formula

* Skill Gap Coverage — **40%**
* Required Skill Match — **25%**
* Availability Compatibility — **15%**
* Experience Fit — **10%**
* Interest Alignment — **10%**

Total:

**100%**

Candidate scores must be deterministic.

Do NOT randomly generate SCI values.

Use the mock candidate data to produce believable scores.

When a candidate is added to the team:

* Recalculate team skill coverage
* Recalculate Team SCI
* Update the biggest skill gap
* Update the team member count
* Update the candidate state

The UI should make it clear that the candidate's value comes from **complementarity**, not similarity.

---

# 5. VISUAL IDENTITY

Create a bold, premium, futuristic visual system based on glassmorphism and fluid modular composition.

## Exact colors

### Main background

Deep Aubergine:

`#171321`

### Secondary surfaces

Dark Plum:

`#251B32`

### Primary brand accent

Electric Coral:

`#FF5F5F`

### Secondary accent

Hot Lilac:

`#C084FC`

### Main text

Warm Cream:

`#FFF7E8`

### Muted text

Dusty Lavender:

`#9B91A8`

### Success / positive outcome

Mint:

`#7EF0C5`

---

# 6. DESIGN LANGUAGE

The interface should feel like:

* Premium creative technology
* Sophisticated
* Expressive
* Slightly experimental
* Futuristic without being cyberpunk
* Elegant enough for startup founders
* Approachable enough for college students and hackathon creators

Use:

* Glassmorphism
* Transparent deep-plum panels
* Background blur
* Thin semi-transparent cream/lilac borders
* Soft coral ambient glow
* Soft lilac ambient glow
* Mesh gradients
* Abstract translucent blobs
* Curved orbital lines
* Subtle network/node graphics
* Layered surfaces
* Soft shadows
* Smooth micro-interactions

Use effects carefully.

The interface must remain readable and functional.

Avoid:

* Generic SaaS dashboard styling
* Generic admin panels
* Excessive cards everywhere
* Stock photography
* Generic AI illustrations
* Neon cyberpunk styling
* Excessive gradients
* Huge glowing text
* Harsh square boxes everywhere
* Green as a primary brand color

Do not use random decorative elements that compete with the actual product.

---

# 7. TYPOGRAPHY

Use a modern expressive sans-serif such as:

* DM Sans
* Manrope
* Satoshi
* Inter

Use an elegant editorial serif italic font for selected large words.

Examples:

> Build the team your idea *needs.*

> Find the missing *piece.*

The serif italic should be used sparingly.

Typography should feel editorial, premium, and spacious.

---

# 8. GLOBAL NAVIGATION

Create a sleek top navigation bar.

### Left

Small abstract knot icon.

Brand:

**KnotX**

### Center

* Discover
* Create a Search
* My Team

### Right

* Notification icon
* Small circular avatar
* Initials: `RS`
* Team member count should update dynamically after Knot actions

The active navigation item should have:

* Soft coral underline
* Or subtle coral pill
* Or understated glow

Navigation must work.

---

# 9. SMART MATCHING WORKSPACE

This is the default page and the most important screen.

## Hero

Small label:

`YOUR ACTIVE SEARCH · HACKATHON`

Large headline:

**Build the team your idea *needs*.**

Supporting copy:

> KnotX finds the people who complete your team — not just people who look like it.

On the right, create a compact glowing glass insight orb/panel.

Label:

`SCI ENGINE`

Copy:

> We found a critical gap in your team.

Highlight:

**Design & user research**

Use subtle coral and lilac lighting.

---

# 10. MAIN WORKSPACE

Create a responsive two-column layout.

Desktop:

* Left: Team Intelligence
* Right: Candidate Matching

Mobile:

* Stack naturally
* Candidate experience remains prominent
* Maintain strong spacing and hierarchy

---

# 11. TEAM INTELLIGENCE PANEL

Create a large glassmorphism panel.

Small label:

`NEURAL NEXUS`

Heading:

**Team completeness**

Large score:

**68 / 100**

Supporting text:

`Your Skill Complementarity Index`

Display coverage bars:

### Frontend

80%

### Backend

90%

### AI / ML

40%

### Design

0%

Use:

* Warm cream/lavender for normal coverage
* Coral/lilac emphasis for missing or weak skills

Below the bars create an insight panel.

Label:

`BIGGEST OPPORTUNITY`

Heading:

**Bring design into the room.**

Copy:

> A designer will lift your SCI the most.

Use a subtle coral glow.

Include:

`View Team`

---

# 12. SMART CANDIDATE MATCHING

Create a large, visually striking glass card.

This is the visual center of the application.

Default candidate:

## Ananya Shah

Role:

**Product Designer**

Avatar:

Use an elegant abstract gradient/avatar with initials:

**AS**

Do NOT use stock photography.

Status:

**Active now**

SCI Match:

# 94%

Label:

`SCI MATCH`

Secondary label:

**Excellent fit**

Proof of Work:

`✓ Proof of Work 87`

Use mint for verification.

Skills:

* Figma
* UI/UX
* User Research

Availability:

**12 hrs / week**

Experience:

**2 hackathons**

Interest:

**Accessibility & EdTech**

The SCI score should be visually dominant.

Use coral/lilac accenting with a subtle animated halo.

---

# 13. WHY THEY FIT

Create a section:

**WHY THEY FIT**

Show:

✓ Fills your team's biggest skill gap

✓ Availability fits your project timeline

✓ Strong alignment with Accessibility & EdTech

Use small elegant icons/checkmarks.

Avoid excessive text.

---

# 14. CANDIDATE ACTIONS

Bottom of card:

Secondary glass button:

**Skip**

Primary coral button:

**🪢 Knot with Ananya**

The Knot button should have:

* Hover animation
* Slight glow
* Active state
* Subtle knot icon

When clicked:

1. Add candidate to team
2. Update team member count
3. Update team skill coverage
4. Update Team SCI
5. Update biggest skill gap
6. Show toast:

> ✓ Ananya is now tied into your team.

Do not reload the page.

---

# 15. MOCK CANDIDATES

Create exactly three main mock candidates.

## Candidate 1

**Ananya Shah**

Product Designer

SCI Match: **94%**

Skills:

* Figma
* UI/UX
* User Research

Proof Score:

87

Availability:

12 hrs/week

Experience:

2 hackathons

Interest:

Accessibility & EdTech

---

## Candidate 2

**Karan Mehta**

ML Engineer

SCI Match:

**82%**

Skills:

* Python
* TensorFlow
* Computer Vision

Proof Score:

91

Availability:

10 hrs/week

Experience:

3 hackathons

Interest:

AI & Accessibility

---

## Candidate 3

**Dev Arora**

Backend Developer

SCI Match:

**74%**

Skills:

* Node.js
* APIs
* PostgreSQL

Proof Score:

84

Availability:

8 hrs/week

Experience:

2 hackathons

Interest:

Developer Tools

Use believable mock data.

---

# 16. SKIP INTERACTION

When Skip is clicked:

* Move to the next candidate
* Animate the card transition
* Update candidate number
* Keep the team unchanged

When all candidates have been reviewed:

Show a polished completion state:

# You’ve met every match.

> Your team is stronger than when you began.

Button:

**Start over**

Start over should reset the candidate sequence and restore the default demo state.

---

# 17. RIPPLE EFFECT — SIGNATURE FEATURE

This is the most important visual interaction after Knot.

At the top-right of the candidate card add:

**View Ripple Effect**

Use a small wave/ripple icon.

When clicked:

* Expand the candidate card smoothly
* Reveal the Ripple Effect
* Animate the transition
* Preserve the surrounding layout

Section label:

`RIPPLE EFFECT`

Heading:

**One person. A stronger team.**

Supporting idea:

Show visually how one candidate improves the team.

---

# 18. RIPPLE VISUALIZATION

Show before → after coverage.

### Frontend

80% → 80%

### Backend

90% → 90%

### AI / ML

40% → 75%

### Design

0% → 100%

Changed categories should animate.

Use:

* Hot Lilac
* Mint for positive improvement
* Coral for important gaps

Use flowing connecting lines, subtle particle movement, or animated bars.

Do not make it look like a basic bar chart.

It should feel like a living network.

At the bottom:

Small label:

`TEAM SCI`

Large:

**68 → 91**

Then:

**+23 points**

Use mint only for the positive improvement.

The user should immediately understand:

> One new teammate changes the strength of the entire team.

---

# 19. DISCOVER PAGE

Navigation:

**Discover**

Heading:

**Find a team worth joining.**

Supporting copy:

> Explore projects looking for exactly what you bring.

Add:

Large glass search bar.

Filter chips:

* Project type
* Role needed
* Skills
* Availability
* Experience level

Create responsive project cards.

---

## Neural Nexus

Description:

AI accessibility platform

Needs:

**UI/UX Designer**

Current SCI:

**68**

Tags:

AI · Accessibility · EdTech

Button:

**View Match**

---

## GreenGrid

Description:

Climate tracking application

Needs:

**Backend Developer**

Current SCI:

**72**

Tags:

Climate · APIs · Data

Button:

**View Match**

---

## Campus Connect

Description:

Student community platform

Needs:

**React Developer**

Current SCI:

**64**

Tags:

Community · Mobile · React

Button:

**View Match**

Cards should have:

* Glass layers
* Elegant hover lift
* Subtle coral/lilac border animation
* Strong typography hierarchy

---

# 20. CREATE A SEARCH PAGE

Heading:

**What are you building?**

Supporting copy:

> Tell KnotX about your project. We’ll map the gaps.

Use either:

* A beautiful guided multi-step form

OR

* One spacious glass form divided into clear sections

Prefer whichever produces the more polished UX.

Fields:

### Project Name

Default:

`Neural Nexus`

### Project Type

Options:

* Hackathon
* Startup
* College Project
* Open Source
* Other

### Project Description

Default:

`An AI-powered accessibility platform for visually impaired students.`

### Roles Needed

Examples:

* Frontend Developer
* UI/UX Designer
* AI/ML Engineer

### Desired skills per role

Allow skill tags.

### Number of teammates needed

### Experience level

### Availability

### Project duration

### Existing team skills

Use selectable tags.

Primary button:

# Analyze my team →

Electric coral.

When submitted:

Navigate to Smart Matching Workspace.

The entered data should persist in local state.

---

# 21. MY TEAM PAGE

Create a polished team snapshot for:

**Neural Nexus**

Label:

`TEAM SNAPSHOT`

Title:

# Neural Nexus

Description:

> A product-minded team building accessible learning tools.

Show:

* Current Team SCI
* Skill coverage
* Current team members
* Candidates knotted during the session
* Team strengths
* Potential blind spots

The data must reflect the actual local state.

---

## Team Strength

Label:

`BIGGEST STRENGTH`

Text:

> Full-stack product development with strong AI capabilities.

---

## Blind Spot

Label:

`POTENTIAL BLIND SPOT`

Text:

> Limited cloud deployment experience.

---

## Team Deck

Add:

**Generate Team Deck**

Make it visually appealing but disabled/coming soon.

Label:

`COMING SOON`

Do not implement an external AI API.

---

# 22. PROOF OF WORK

Proof of Work is part of the visual product language but does not require real integrations.

Represent it with realistic mock verification.

Example:

`✓ GitHub Connected`

`✓ Figma Portfolio Connected`

`Proof Score: 87/100`

Use mint only for verified states.

Do not create fake external API calls.

---

# 23. TEAM STATE LOGIC

Use local state.

The team should begin with:

* Rahul
* Aryan
* Anushka

When Ananya is knotted:

* Add Ananya
* Increase team count
* Design coverage becomes 100%
* AI/ML may improve based on the defined candidate contribution
* Team SCI becomes 91
* Biggest gap changes

When Karan is knotted:

* AI/ML coverage increases further
* SCI updates

When Dev is knotted:

* Backend coverage increases

All values should be deterministic.

Do not randomly modify scores.

Create reusable functions/components for:

* SCI calculation
* Skill coverage
* Candidate scoring
* Team updates

---

# 24. RESPONSIVE DESIGN

Desktop:

* Wide immersive workspace
* Two-column matching layout
* Large typography
* Layered glass panels

Tablet:

* Reduce spacing
* Maintain two-column layout where practical

Mobile:

* Stack all panels
* Candidate card becomes full-width
* Ripple Effect becomes full-width
* Navigation should collapse elegantly
* Buttons should remain easy to tap
* Avoid horizontal scrolling
* Maintain premium visual hierarchy

Do not simply shrink the desktop layout.

Design the mobile experience intentionally.

---

# 25. ACCESSIBILITY

Maintain:

* Strong text contrast
* Visible focus states
* Keyboard accessible buttons
* Semantic headings
* Proper button labels
* Avoid relying only on color to communicate state
* Reasonable motion
* Respect reduced-motion preferences where possible

---

# 26. MICRO-INTERACTIONS

Use subtle motion throughout.

Examples:

* Candidate card transitions
* Button hover
* Knot interaction
* Ripple expansion
* SCI number transition
* Skill bar updates
* Toast notifications
* Navigation transitions
* Glass hover states

Motion should feel smooth and premium.

Avoid excessive animations.

The interface should feel alive, not distracting.

---

# 27. ICONS

Use a consistent icon library such as Lucide.

Use icons for:

* Search
* Notifications
* Checkmarks
* Availability
* Skills
* Ripple
* Knot
* Team
* Arrow navigation

Do not use random emoji as the primary UI iconography.

The Knot symbol can be custom-styled using CSS/SVG.

---

# 28. BACKGROUND ART DIRECTION

The background should subtly reinforce the KnotX concept.

Use:

* Very subtle curved orbital paths
* Abstract connected nodes
* Mesh gradients
* Translucent blobs
* Coral/lilac ambient lighting

The network elements should remain mostly in the background.

Do not make the page look like a cryptocurrency website.

---

# 29. COMPONENT ARCHITECTURE

Build reusable components.

Suggested structure:

* Navbar
* GlassCard
* SkillCoverage
* SCIIndicator
* CandidateCard
* CandidateActions
* ProofBadge
* SkillChip
* InsightCard
* RippleEffect
* ProjectCard
* FilterBar
* ProjectForm
* TeamMemberCard
* Toast
* PageTransition

Keep styling consistent across all pages.

Do not duplicate large chunks of UI.

---

# 30. IMPORTANT DESIGN GUARDRAIL

KnotX should NOT look like:

* An admin dashboard
* A CRM
* A generic AI chatbot
* A crypto dashboard
* A dating app clone
* A template website

The swipe-like candidate interaction can borrow the simplicity of swipe interfaces, but KnotX must feel like a **professional intelligent collaboration platform**.

The central visual metaphor is:

**People are nodes. Skills are connections. Missing skills are gaps. The right teammate creates a stronger network.**

---

# 31. FINAL PRODUCT FEEL

The finished website should feel:

**Premium**

**Intelligent**

**Human**

**Experimental**

**Memorable**

**Demo-ready**

The first 10 seconds should communicate:

> KnotX understands what my team is missing.

The first 30 seconds should communicate:

> KnotX can actually show me why this person is valuable.

The Ripple Effect should create the:

> “Oh, THAT'S the point of KnotX.”

moment.

---

# 32. FINAL QA BEFORE FINISHING

Before considering the build complete, verify:

* All navigation works
* Smart Matching loads by default
* SCI starts at 68
* Ananya appears first
* Candidate score is 94%
* Skip loads the next candidate
* Knot adds the candidate
* Team count updates
* Team skill coverage updates
* SCI updates
* Toast appears
* Ripple Effect expands and collapses
* Ripple shows 68 → 91 for Ananya
* Start Over resets the experience
* Discover filters/search are interactive locally
* Create Search form works
* Analyze My Team navigates to Smart Matching
* My Team reflects current session state
* Mobile layout works
* No horizontal overflow
* Buttons have hover/focus/active states
* No dead primary buttons
* No lorem ipsum
* No external API dependencies
* No authentication dependency
* No database dependency
* No random SCI values
* No placeholder-looking UI

Most importantly:

**Prioritize polish and coherence over adding more features.**

The Smart Matching Workspace + SCI + Ripple Effect should feel like the signature product experience of KnotX.
