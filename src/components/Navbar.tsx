import { Bell } from "lucide-react";
import type { Page } from "../types";

interface NavbarProps {
  page: Page;
  setPage: (p: Page) => void;
  memberCount: number;
}

const NAV_ITEMS: { label: string; value: Page }[] = [
  { label: "Discover", value: "discover" },
  { label: "Create a Search", value: "create" },
  { label: "My Team", value: "team" },
];

export default function Navbar({ page, setPage, memberCount }: NavbarProps) {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "rgba(23, 19, 33, 0.85)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(255,247,232,0.06)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        {/* Left: Logo */}
        <button
          onClick={() => setPage("match")}
          className="flex items-center gap-2.5 group focus:outline-none"
          aria-label="KnotX home"
        >
          <div
            className="relative w-7 h-7 flex items-center justify-center"
            style={{ transition: "transform 0.2s" }}
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <circle cx="14" cy="14" r="13" stroke="#FF5F5F" strokeWidth="1" strokeOpacity="0.4" />
              <path
                d="M8 14 C8 10 11 8 14 8 C17 8 19 10 20 12 C21 14 20 17 18 18 C16 19 14 18 13 16 C12 14 13 11 15 10 C17 9 19 10 20 12"
                stroke="#FF5F5F"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>
          <span
            className="text-base font-bold tracking-tight"
            style={{ color: "#FFF7E8", letterSpacing: "-0.02em" }}
          >
            KnotX
          </span>
        </button>

        {/* Center: Nav items (hidden on small mobile) */}
        <div className="hidden sm:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const active = page === item.value;
            return (
              <button
                key={item.value}
                onClick={() => setPage(item.value)}
                className="relative px-3.5 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5F5F]"
                style={{
                  color: active ? "#FFF7E8" : "#9B91A8",
                  background: active ? "rgba(255,95,95,0.08)" : "transparent",
                }}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
                {active && (
                  <span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full"
                    style={{ background: "#FF5F5F" }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Right: icons + avatar */}
        <div className="flex items-center gap-3">
          <button
            className="relative p-2 rounded-lg transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5F5F]"
            style={{ color: "#9B91A8" }}
            aria-label="Notifications"
            onMouseEnter={(e) => (e.currentTarget.style.color = "#FFF7E8")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#9B91A8")}
          >
            <Bell size={17} />
          </button>

          <button
            className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5F5F] rounded-full"
            aria-label="Profile"
            onClick={() => setPage("team")}
          >
            <div
              className="relative w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-transform duration-200 group-hover:scale-110"
              style={{
                background: "linear-gradient(135deg, #FF5F5F, #C084FC)",
                color: "#FFF7E8",
              }}
            >
              RS
              <span
                className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full border"
                style={{ background: "#7EF0C5", borderColor: "#171321" }}
                title={`${memberCount} team members`}
              />
            </div>
            <span
              className="hidden md:block text-xs font-semibold tabular-nums transition-all duration-500"
              style={{ color: "#9B91A8" }}
            >
              {memberCount}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="sm:hidden flex items-center gap-1 px-4 pb-2 overflow-x-auto">
        {NAV_ITEMS.map((item) => {
          const active = page === item.value;
          return (
            <button
              key={item.value}
              onClick={() => setPage(item.value)}
              className="flex-shrink-0 px-3 py-1 text-xs font-medium rounded-full transition-all duration-200"
              style={{
                color: active ? "#FFF7E8" : "#9B91A8",
                background: active ? "rgba(255,95,95,0.12)" : "rgba(255,247,232,0.05)",
                border: active ? "1px solid rgba(255,95,95,0.3)" : "1px solid rgba(255,247,232,0.06)",
              }}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
