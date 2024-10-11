import { Button } from "@/components/ui/button";
import type { eventWithTime } from "@rrweb/types";
import { useRef, useState } from "react";
import { record } from "rrweb";

function RecordingControls() {
  const [isRecording, setIsRecording] = useState(false);
  // const [stopCallback, setStopCallback] = useState<() => void>(() => {});
  const stopRecording = useRef<() => void>(() => {});
  const [events, setEvents] = useState<eventWithTime[]>([]);
  const recordingEvents = useRef<eventWithTime[]>([]);
  const startRecording = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("Recording started", new Date().toLocaleString());
    setIsRecording(true);
    recordingEvents.current = [];
    const cb = record({
      emit(event) {
        recordingEvents.current.push(event);
        // store.setItem(String(index++), event);
        // console.log("Event pushed");
      },
    });
    if (cb) {
      stopRecording.current = () => {
        console.log("Recording stopped", new Date().toLocaleString());
        setIsRecording(false);
        setEvents(recordingEvents.current);
        console.log(
          "%c💣️ events",
          "background: aliceblue; color: dodgerblue; font-weight: bold",
          recordingEvents.current
        );
        cb();
      };
      // setStopCallback(stop);
    }
  };
  return (
    <div className="flex-none flex flex-col w-full overflow-hidden bg-slate-400 p-2">
      {isRecording && stopRecording.current ? (
        <Button onClick={stopRecording.current}>Stop recording</Button>
      ) : (
        <Button onClick={startRecording}>Start recording</Button>
      )}
    </div>
  );
}

export default RecordingControls;
