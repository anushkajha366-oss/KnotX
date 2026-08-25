import { useState } from "react";
import { ArrowRight, Compass, Search, Sparkles, Users } from "lucide-react";
import type { Page } from "../types";

interface HomeProps {
  onNavigate: (page: Page) => void;
}

const ACTIONS: Array<{
  page: Extract<Page, "discover" | "create" | "team">;
  title: string;
  description: string;
  icon: typeof Compass;
  color: string;
}> = [
  {
    page: "discover",
    title: "Discover Projects",
    description: "Explore teams looking for your strengths.",
    icon: Compass,
    color: "#C084FC",
  },
  {
    page: "create",
    title: "Create a Team Search",
    description: "Map your team gaps and find the right people.",
    icon: Search,
    color: "#FF5F5F",
  },
  {
    page: "team",
    title: "My Team",
    description: "See your team’s skills and complementarity.",
    icon: Users,
    color: "#7EF0C5",
  },
];

export default function Home({ onNavigate }: HomeProps) {
  const [showActions, setShowActions] = useState(false);

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 flex items-center">
      <div className="max-w-5xl mx-auto w-full">
        <div className="max-w-3xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase mb-6"
            style={{
              color: "#C084FC",
              background: "rgba(192,132,252,0.09)",
              border: "1px solid rgba(192,132,252,0.2)",
            }}
          >
            <Sparkles size={12} />
            Complementary teams, by design
          </div>

          <div className="flex items-center justify-center gap-3 mb-6">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, rgba(255,95,95,0.25), rgba(192,132,252,0.25))",
                border: "1px solid rgba(255,247,232,0.12)",
              }}
            >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                <circle cx="14" cy="14" r="13" stroke="#FF5F5F" strokeWidth="1" strokeOpacity="0.5" />
                <path
                  d="M8 14 C8 10 11 8 14 8 C17 8 19 10 20 12 C21 14 20 17 18 18 C16 19 14 18 13 16 C12 14 13 11 15 10 C17 9 19 10 20 12"
                  stroke="#FF5F5F"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </div>
            <span className="text-2xl font-bold tracking-tight" style={{ color: "#FFF7E8" }}>
              KnotX
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold leading-tight tracking-tight" style={{ color: "#FFF7E8" }}>
            Build teams that{" "}
            <em className="font-serif-italic" style={{ color: "#C084FC" }}>
              complete each other.
            </em>
          </h1>

          <p className="mt-6 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: "#9B91A8" }}>
            KnotX matches people around complementary skills and the gaps a team needs to close—not simply the skills they already share.
          </p>

          {!showActions ? (
            <button
              onClick={() => setShowActions(true)}
              className="inline-flex items-center gap-2 mt-9 px-6 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5F5F]"
              style={{
                background: "#FF5F5F",
                border: "1px solid rgba(255,95,95,0.45)",
                color: "#FFF7E8",
                boxShadow: "0 8px 30px rgba(255,95,95,0.25)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 12px 36px rgba(255,95,95,0.38)")}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 8px 30px rgba(255,95,95,0.25)")}
            >
              Get Started
              <ArrowRight size={16} />
            </button>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 text-left">
              {ACTIONS.map(({ page, title, description, icon: Icon, color }) => (
                <button
                  key={page}
                  onClick={() => onNavigate(page)}
                  className="glass rounded-2xl p-5 text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C084FC]"
                  style={{ border: "1px solid rgba(255,247,232,0.08)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.borderColor = "rgba(192,132,252,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.borderColor = "rgba(255,247,232,0.08)";
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `color-mix(in srgb, ${color} 14%, transparent)`, border: `1px solid color-mix(in srgb, ${color} 30%, transparent)` }}
                  >
                    <Icon size={18} style={{ color }} />
                  </div>
                  <h2 className="text-sm font-bold mb-1.5" style={{ color: "#FFF7E8" }}>
                    {title}
                  </h2>
                  <p className="text-xs leading-relaxed" style={{ color: "#9B91A8" }}>
                    {description}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
