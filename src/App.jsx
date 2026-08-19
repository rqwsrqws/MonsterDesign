import { useState } from "react";
import Hero from "./components/Hero.jsx";

export default function App() {
  const [runId, setRunId] = useState(0);

  return (
    <div className="app">
      <Hero replayKey={runId} onReplay={() => setRunId((n) => n + 1)} />
    </div>
  );
}
