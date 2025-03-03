import { Toaster } from "@/components/ui/sonner";
import LandingPage from "./LandingPage";
import RecordingControls from "@/RecordingControls";

function App() {
  return (
    <>
      <div className="flex-1 flex flex-col w-full overflow-hidden">
        <LandingPage />
        <RecordingControls />
      </div>
      <Toaster />
    </>
  );
}

export default App;
