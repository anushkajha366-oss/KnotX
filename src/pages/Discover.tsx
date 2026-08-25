import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { DISCOVER_PROJECTS } from "../data/mock";

const PROJECT_TYPES = ["All", "Hackathon", "Startup", "College Project", "Open Source"];
const ROLES = ["All Roles", "UI/UX Designer", "Backend Developer", "React Developer", "Product Designer", "ML Engineer", "Frontend Developer"];

export default function Discover() {
  const [query, setQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedRole, setSelectedRole] = useState("All Roles");

  const filtered = DISCOVER_PROJECTS.filter((p) => {
    const matchesQuery =
      query === "" ||
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));
    const matchesType = selectedType === "All" || p.type === selectedType;
    const matchesRole = selectedRole === "All Roles" || p.needs === selectedRole;
    return matchesQuery && matchesType && matchesRole;
  });

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Hero */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: "#FFF7E8" }}>
            Find a team worth{" "}
            <em className="font-serif-italic" style={{ color: "#C084FC" }}>
              joining.
            </em>
          </h1>
          <p className="text-base" style={{ color: "#9B91A8" }}>
            Explore projects looking for exactly what you bring.
          </p>
        </div>

        {/* Search bar */}
        <div className="relative mb-5">
          <Search
            size={17}
            className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: "#9B91A8" }}
          />
          <input
            type="text"
            placeholder="Search projects, skills, or tags..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-2xl pl-11 pr-4 py-3.5 text-sm transition-all duration-200 focus:outline-none"
            style={{
              background: "rgba(37,27,50,0.7)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,247,232,0.08)",
              color: "#FFF7E8",
            }}
            onFocus={(e) => (e.target.style.border = "1px solid rgba(192,132,252,0.3)")}
            onBlur={(e) => (e.target.style.border = "1px solid rgba(255,247,232,0.08)")}
            aria-label="Search projects"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          {/* Type filter */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <SlidersHorizontal size={13} style={{ color: "#9B91A8" }} />
            {PROJECT_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5F5F]"
                style={{
                  background: selectedType === type ? "rgba(255,95,95,0.12)" : "rgba(255,247,232,0.04)",
                  border: selectedType === type ? "1px solid rgba(255,95,95,0.3)" : "1px solid rgba(255,247,232,0.07)",
                  color: selectedType === type ? "#FF5F5F" : "#9B91A8",
                }}
              >
                {type}
              </button>
            ))}
          </div>
          {/* Role filter */}
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="sm:ml-auto px-3 py-1.5 rounded-full text-xs font-medium focus:outline-none cursor-pointer"
            style={{
              background: "rgba(37,27,50,0.8)",
              border: "1px solid rgba(255,247,232,0.07)",
              color: "#9B91A8",
            }}
            aria-label="Filter by role"
          >
            {ROLES.map((r) => (
              <option key={r} value={r} style={{ background: "#251B32" }}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* Results count */}
        <p className="text-xs mb-5" style={{ color: "#9B91A8" }}>
          {filtered.length} project{filtered.length !== 1 ? "s" : ""} found
        </p>

        {/* Project cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-16">
              <p className="text-base font-semibold mb-2" style={{ color: "#FFF7E8" }}>
                No projects match your search.
              </p>
              <p className="text-sm" style={{ color: "#9B91A8" }}>
                Try adjusting your filters or search terms.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: (typeof DISCOVER_PROJECTS)[0] }) {
  const [hovered, setHovered] = useState(false);

  const sciColor = project.sci >= 70 ? "#7EF0C5" : project.sci >= 60 ? "#C084FC" : "#FF5F5F";

  return (
    <div
      className="glass rounded-2xl p-5 flex flex-col gap-4 transition-all duration-300 cursor-pointer"
      style={{
        border: hovered ? "1px solid rgba(192,132,252,0.25)" : "1px solid rgba(255,247,232,0.07)",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hovered ? "0 8px 30px rgba(192,132,252,0.1)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold mb-0.5" style={{ color: "#FFF7E8" }}>
            {project.name}
          </h3>
          <p className="text-xs" style={{ color: "#9B91A8" }}>
            {project.description}
          </p>
        </div>
        <span
          className="text-[10px] font-bold px-2 py-1 rounded-full flex-shrink-0"
          style={{
            background: "rgba(255,247,232,0.05)",
            border: "1px solid rgba(255,247,232,0.08)",
            color: "#9B91A8",
          }}
        >
          {project.type}
        </span>
      </div>

      {/* Needs */}
      <div
        className="px-3 py-2 rounded-xl"
        style={{
          background: "rgba(255,95,95,0.06)",
          border: "1px solid rgba(255,95,95,0.12)",
        }}
      >
        <p className="text-[10px] font-bold tracking-wider uppercase mb-0.5" style={{ color: "#FF5F5F" }}>
          Needs
        </p>
        <p className="text-xs font-semibold" style={{ color: "#FFF7E8" }}>
          {project.needs}
        </p>
      </div>

      {/* SCI */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold tracking-wider uppercase mb-0.5" style={{ color: "#9B91A8" }}>
            Team SCI
          </p>
          <p className="text-xl font-bold tabular-nums" style={{ color: sciColor }}>
            {project.sci}
          </p>
        </div>
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 justify-end">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-full"
              style={{
                background: "rgba(192,132,252,0.08)",
                border: "1px solid rgba(192,132,252,0.15)",
                color: "#C084FC",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <button
        className="w-full py-2.5 rounded-xl text-xs font-bold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5F5F]"
        style={{
          background: hovered ? "rgba(255,95,95,0.15)" : "rgba(255,247,232,0.05)",
          border: hovered ? "1px solid rgba(255,95,95,0.3)" : "1px solid rgba(255,247,232,0.08)",
          color: hovered ? "#FF5F5F" : "#9B91A8",
        }}
      >
        View Match
      </button>
    </div>
  );
}
