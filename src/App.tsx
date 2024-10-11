import { useState } from "react";
import LandingPage from "./LandingPage";

function App() {
  return (
    <div className="flex-1 flex flex-col w-full overflow-hidden">
      <LandingPage />
      <div className="bg-slate-200 p-2">
        Recording controls panel placeholder
      </div>
    </div>
  );
}

export default App;
