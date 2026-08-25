import { useState } from "react";
import { ChevronRight, ChevronLeft, Plus, X, ArrowRight } from "lucide-react";

const PROJECT_TYPES = ["Hackathon", "Startup", "College Project", "Open Source", "Other"];
const SKILL_OPTIONS = [
  "React", "TypeScript", "Python", "Node.js", "Figma", "TensorFlow",
  "PostgreSQL", "GraphQL", "Flutter", "Swift", "Rust", "Go",
  "UI/UX", "User Research", "Data Analysis", "DevOps", "AWS", "Docker",
];
const EXPERIENCE_LEVELS = ["Beginner", "Intermediate", "Advanced", "Mixed"];
const AVAILABILITY_OPTIONS = ["< 5 hrs/week", "5–10 hrs/week", "10–20 hrs/week", "Full-time"];
const DURATION_OPTIONS = ["24–48 hours (Hackathon)", "1–4 weeks", "1–3 months", "3–6 months", "6+ months"];

export interface FormState {
  projectName: string;
  projectType: string;
  description: string;
  rolesNeeded: string[];
  skills: string[];
  teammates: number;
  experience: string;
  availability: string;
  duration: string;
  existingSkills: string[];
}

interface CreateSearchProps {
  onAnalyze: (form: FormState) => void;
}

export default function CreateSearch({ onAnalyze }: CreateSearchProps) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>({
    projectName: "Neural Nexus",
    projectType: "Hackathon",
    description: "An AI-powered accessibility platform for visually impaired students.",
    rolesNeeded: ["Frontend Developer", "UI/UX Designer", "AI/ML Engineer"],
    skills: ["React", "Figma", "Python"],
    teammates: 2,
    experience: "Mixed",
    availability: "10–20 hrs/week",
    duration: "24–48 hours (Hackathon)",
    existingSkills: ["React", "Node.js", "Python"],
  });
  const [roleInput, setRoleInput] = useState("");

  const toggleSkill = (skill: string, field: "skills" | "existingSkills") => {
    setForm((f) => ({
      ...f,
      [field]: f[field].includes(skill)
        ? f[field].filter((s) => s !== skill)
        : [...f[field], skill],
    }));
  };

  const addRole = () => {
    const trimmed = roleInput.trim();
    if (trimmed && !form.rolesNeeded.includes(trimmed)) {
      setForm((f) => ({ ...f, rolesNeeded: [...f.rolesNeeded, trimmed] }));
      setRoleInput("");
    }
  };

  const removeRole = (role: string) => {
    setForm((f) => ({ ...f, rolesNeeded: f.rolesNeeded.filter((r) => r !== role) }));
  };

  const STEPS = [
    { title: "Project basics", subtitle: "Tell us about what you're building" },
    { title: "Team needs", subtitle: "What roles and skills are you looking for?" },
    { title: "Preferences", subtitle: "Set your timeline and team size" },
  ];

  const inputStyle = {
    background: "rgba(37,27,50,0.7)",
    backdropFilter: "blur(20px)" as const,
    border: "1px solid rgba(255,247,232,0.08)",
    color: "#FFF7E8",
    borderRadius: 12,
    width: "100%",
    padding: "12px 16px",
    fontSize: 14,
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Hero */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: "#FFF7E8" }}>
            What are you{" "}
            <em className="font-serif-italic" style={{ color: "#FF5F5F" }}>
              building?
            </em>
          </h1>
          <p className="text-base" style={{ color: "#9B91A8" }}>
            Tell KnotX about your project. We'll map the gaps.
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-8">
          {STEPS.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <button
                onClick={() => setStep(i)}
                className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5F5F] rounded-full"
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
                  style={{
                    background:
                      i === step
                        ? "rgba(255,95,95,0.9)"
                        : i < step
                        ? "rgba(126,240,197,0.2)"
                        : "rgba(255,247,232,0.06)",
                    border:
                      i === step
                        ? "1px solid rgba(255,95,95,0.4)"
                        : i < step
                        ? "1px solid rgba(126,240,197,0.4)"
                        : "1px solid rgba(255,247,232,0.08)",
                    color: i === step ? "#FFF7E8" : i < step ? "#7EF0C5" : "#9B91A8",
                  }}
                >
                  {i < step ? "✓" : i + 1}
                </div>
                <span
                  className="hidden sm:block text-xs font-medium"
                  style={{ color: i === step ? "#FFF7E8" : "#9B91A8" }}
                >
                  {s.title}
                </span>
              </button>
              {i < STEPS.length - 1 && (
                <div className="h-px w-8 sm:w-12" style={{ background: "rgba(255,247,232,0.08)" }} />
              )}
            </div>
          ))}
        </div>

        {/* Form panel */}
        <div
          className="glass rounded-2xl p-6 sm:p-8 space-y-6"
          style={{ border: "1px solid rgba(255,247,232,0.08)" }}
        >
          <div>
            <h2 className="text-base font-bold mb-0.5" style={{ color: "#FFF7E8" }}>
              {STEPS[step].title}
            </h2>
            <p className="text-xs" style={{ color: "#9B91A8" }}>
              {STEPS[step].subtitle}
            </p>
          </div>

          {/* Step 0: Project basics */}
          {step === 0 && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#9B91A8" }}>
                  Project Name
                </label>
                <input
                  type="text"
                  value={form.projectName}
                  onChange={(e) => setForm((f) => ({ ...f, projectName: e.target.value }))}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(255,95,95,0.4)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,247,232,0.08)")}
                  placeholder="Neural Nexus"
                />
              </div>

              <div>
                <label className="block text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#9B91A8" }}>
                  Project Type
                </label>
                <div className="flex flex-wrap gap-2">
                  {PROJECT_TYPES.map((type) => (
                    <button
                      key={type}
                      onClick={() => setForm((f) => ({ ...f, projectType: type }))}
                      className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5F5F]"
                      style={{
                        background: form.projectType === type ? "rgba(255,95,95,0.12)" : "rgba(255,247,232,0.04)",
                        border: form.projectType === type ? "1px solid rgba(255,95,95,0.3)" : "1px solid rgba(255,247,232,0.07)",
                        color: form.projectType === type ? "#FF5F5F" : "#9B91A8",
                      }}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#9B91A8" }}>
                  Project Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  rows={3}
                  style={{ ...inputStyle, resize: "none" as const }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(255,95,95,0.4)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,247,232,0.08)")}
                  placeholder="Describe what you're building..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#9B91A8" }}>
                  Existing Team Skills
                </label>
                <div className="flex flex-wrap gap-2">
                  {SKILL_OPTIONS.slice(0, 12).map((skill) => (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill, "existingSkills")}
                      className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 focus:outline-none"
                      style={{
                        background: form.existingSkills.includes(skill)
                          ? "rgba(126,240,197,0.12)"
                          : "rgba(255,247,232,0.04)",
                        border: form.existingSkills.includes(skill)
                          ? "1px solid rgba(126,240,197,0.3)"
                          : "1px solid rgba(255,247,232,0.07)",
                        color: form.existingSkills.includes(skill) ? "#7EF0C5" : "#9B91A8",
                      }}
                    >
                      {form.existingSkills.includes(skill) ? "✓ " : ""}{skill}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Team needs */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#9B91A8" }}>
                  Roles Needed
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={roleInput}
                    onChange={(e) => setRoleInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addRole()}
                    style={{ ...inputStyle, flex: 1 }}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(255,95,95,0.4)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,247,232,0.08)")}
                    placeholder="Add a role..."
                    aria-label="Add a role"
                  />
                  <button
                    onClick={addRole}
                    className="px-3 py-2 rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5F5F]"
                    style={{
                      background: "rgba(255,95,95,0.12)",
                      border: "1px solid rgba(255,95,95,0.25)",
                      color: "#FF5F5F",
                    }}
                    aria-label="Add role"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {form.rolesNeeded.map((role) => (
                    <span
                      key={role}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                      style={{
                        background: "rgba(255,95,95,0.08)",
                        border: "1px solid rgba(255,95,95,0.2)",
                        color: "#FF5F5F",
                      }}
                    >
                      {role}
                      <button
                        onClick={() => removeRole(role)}
                        className="focus:outline-none"
                        aria-label={`Remove ${role}`}
                      >
                        <X size={11} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#9B91A8" }}>
                  Desired Skills
                </label>
                <div className="flex flex-wrap gap-2">
                  {SKILL_OPTIONS.map((skill) => (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill, "skills")}
                      className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 focus:outline-none"
                      style={{
                        background: form.skills.includes(skill) ? "rgba(192,132,252,0.12)" : "rgba(255,247,232,0.04)",
                        border: form.skills.includes(skill) ? "1px solid rgba(192,132,252,0.3)" : "1px solid rgba(255,247,232,0.07)",
                        color: form.skills.includes(skill) ? "#C084FC" : "#9B91A8",
                      }}
                    >
                      {form.skills.includes(skill) ? "✓ " : ""}{skill}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#9B91A8" }}>
                  Experience Level
                </label>
                <div className="flex flex-wrap gap-2">
                  {EXPERIENCE_LEVELS.map((level) => (
                    <button
                      key={level}
                      onClick={() => setForm((f) => ({ ...f, experience: level }))}
                      className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 focus:outline-none"
                      style={{
                        background: form.experience === level ? "rgba(192,132,252,0.12)" : "rgba(255,247,232,0.04)",
                        border: form.experience === level ? "1px solid rgba(192,132,252,0.3)" : "1px solid rgba(255,247,232,0.07)",
                        color: form.experience === level ? "#C084FC" : "#9B91A8",
                      }}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Preferences */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#9B91A8" }}>
                  Number of Teammates Needed
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setForm((f) => ({ ...f, teammates: Math.max(1, f.teammates - 1) }))}
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-lg font-bold transition-all duration-200 focus:outline-none"
                    style={{ background: "rgba(255,247,232,0.06)", border: "1px solid rgba(255,247,232,0.08)", color: "#FFF7E8" }}
                    aria-label="Decrease"
                  >
                    −
                  </button>
                  <span className="text-2xl font-bold w-8 text-center tabular-nums" style={{ color: "#FFF7E8" }}>
                    {form.teammates}
                  </span>
                  <button
                    onClick={() => setForm((f) => ({ ...f, teammates: Math.min(10, f.teammates + 1) }))}
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-lg font-bold transition-all duration-200 focus:outline-none"
                    style={{ background: "rgba(255,247,232,0.06)", border: "1px solid rgba(255,247,232,0.08)", color: "#FFF7E8" }}
                    aria-label="Increase"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#9B91A8" }}>
                  Availability
                </label>
                <div className="flex flex-wrap gap-2">
                  {AVAILABILITY_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setForm((f) => ({ ...f, availability: opt }))}
                      className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 focus:outline-none"
                      style={{
                        background: form.availability === opt ? "rgba(255,95,95,0.12)" : "rgba(255,247,232,0.04)",
                        border: form.availability === opt ? "1px solid rgba(255,95,95,0.3)" : "1px solid rgba(255,247,232,0.07)",
                        color: form.availability === opt ? "#FF5F5F" : "#9B91A8",
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#9B91A8" }}>
                  Project Duration
                </label>
                <div className="flex flex-col gap-2">
                  {DURATION_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setForm((f) => ({ ...f, duration: opt }))}
                      className="px-4 py-3 rounded-xl text-sm font-medium text-left transition-all duration-200 focus:outline-none"
                      style={{
                        background: form.duration === opt ? "rgba(192,132,252,0.1)" : "rgba(255,247,232,0.04)",
                        border: form.duration === opt ? "1px solid rgba(192,132,252,0.3)" : "1px solid rgba(255,247,232,0.07)",
                        color: form.duration === opt ? "#C084FC" : "#9B91A8",
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9B91A8]"
              style={{
                background: "rgba(255,247,232,0.04)",
                border: "1px solid rgba(255,247,232,0.07)",
                color: step === 0 ? "rgba(155,145,168,0.3)" : "#9B91A8",
                cursor: step === 0 ? "not-allowed" : "pointer",
              }}
              disabled={step === 0}
            >
              <ChevronLeft size={14} />
              Back
            </button>

            {step < STEPS.length - 1 ? (
              <button
                onClick={() => setStep((s) => s + 1)}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5F5F]"
                style={{
                  background: "rgba(255,95,95,0.9)",
                  border: "1px solid rgba(255,95,95,0.3)",
                  color: "#FFF7E8",
                  boxShadow: "0 4px 20px rgba(255,95,95,0.25)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 8px 30px rgba(255,95,95,0.4)")}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 4px 20px rgba(255,95,95,0.25)")}
              >
                Next
                <ChevronRight size={14} />
              </button>
            ) : (
              <button
                onClick={() => onAnalyze(form)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5F5F]"
                style={{
                  background: "rgba(255,95,95,0.9)",
                  border: "1px solid rgba(255,95,95,0.3)",
                  color: "#FFF7E8",
                  boxShadow: "0 4px 20px rgba(255,95,95,0.25)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 8px 30px rgba(255,95,95,0.4)")}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 4px 20px rgba(255,95,95,0.25)")}
              >
                Analyze my team
                <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
