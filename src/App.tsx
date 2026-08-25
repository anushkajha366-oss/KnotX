import { useState, useCallback } from "react";
import type { Page } from "./types";
import { computeTeamState, CANDIDATES } from "./data/mock";
import Background from "./components/Background";
import Navbar from "./components/Navbar";
import Toast from "./components/Toast";
import MatchWorkspace from "./pages/MatchWorkspace";
import Discover from "./pages/Discover";
import CreateSearch, { type FormState } from "./pages/CreateSearch";
import MyTeam from "./pages/MyTeam";

export default function App() {
  const [page, setPage] = useState<Page>("match");
  const [knottedIds, setKnottedIds] = useState<string[]>([]);
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [activeProject, setActiveProject] = useState<FormState | null>(null);
  const [toast, setToast] = useState<{ visible: boolean; message: string }>({
    visible: false,
    message: "",
  });

  const teamState = computeTeamState(knottedIds);

  const showToast = useCallback((message: string) => {
    setToast({ visible: true, message });
  }, []);

  const hideToast = useCallback(() => {
    setToast((t) => ({ ...t, visible: false }));
  }, []);

  const handleSkip = useCallback(() => {
    setCandidateIndex((i) => i + 1);
  }, []);

  const handleKnot = useCallback(
    (id: string) => {
      if (!knottedIds.includes(id)) {
        setKnottedIds((prev) => [...prev, id]);
        const candidate = CANDIDATES.find((c) => c.id === id);
        const firstName = candidate ? candidate.name.split(" ")[0] : id;
        showToast(`${firstName} is now tied into your team.`);
      }
      setCandidateIndex((i) => i + 1);
    },
    [knottedIds, showToast]
  );

  const handleReset = useCallback(() => {
    setKnottedIds([]);
    setCandidateIndex(0);
  }, []);

  const handleAnalyze = useCallback((project: FormState) => {
    setActiveProject(project);
    setPage("match");
  }, []);

  return (
    <div className="relative min-h-screen" style={{ background: "#171321" }}>
      <Background />

      <Navbar page={page} setPage={setPage} memberCount={teamState.members.length} />

      <main>
        {page === "match" && (
          <MatchWorkspace
            teamState={teamState}
            candidateIndex={candidateIndex}
            onSkip={handleSkip}
            onKnot={handleKnot}
            onReset={handleReset}
            onViewTeam={() => setPage("team")}
          />
        )}
        {page === "discover" && <Discover />}
        {page === "create" && <CreateSearch onAnalyze={handleAnalyze} />}
        {page === "team" && <MyTeam teamState={teamState} />}
      </main>

      <Toast
        message={toast.message}
        visible={toast.visible}
        onDone={hideToast}
      />
    </div>
  );
}
