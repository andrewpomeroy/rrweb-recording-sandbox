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

  const getRecordingLength = (events: eventWithTime[]) => {
    const firstTimestamp = events[0].timestamp;
    const lastTimestamp = events[events.length - 1].timestamp;
    return lastTimestamp - firstTimestamp;
  };

  const getFormattedDuration = (duration: number) => {
    const seconds = Math.floor(duration / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds =
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const recordingDuration = events.length
    ? getFormattedDuration(getRecordingLength(events))
    : 0;

  const downloadRecording = () => {
    const blob = new Blob([JSON.stringify(recordingEvents.current)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "recording.json";
    a.click();
    URL.revokeObjectURL(url);
  };
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
    <div className="flex-none flex flex-wrap justify-center gap-4 w-full overflow-hidden bg-slate-400 p-2">
      {isRecording && stopRecording.current ? (
        <Button onClick={stopRecording.current}>🛑 Stop recording</Button>
      ) : (
        <Button onClick={startRecording} className="bg-red-900 text-white">
          {events?.length ? "↪️ Restart recording" : "🔴 Start new recording"}
        </Button>
      )}
      {/* {!isRecording && events?.length > 0 && (
            <Button
              onClick={() => {
                console.log(
                  "%c💣️ events",
                  "background: aliceblue; color: dodgerblue; font-weight: bold",
                  events
                );
                playRecording();
              }}
            >
              ▶️ Play
            </Button>
          )} */}
      {!isRecording && events?.length > 1 && (
        <Button
          variant="secondary"
          onClick={() => {
            console.log(
              "%c💣️ events",
              "background: aliceblue; color: dodgerblue; font-weight: bold",
              events
            );
            downloadRecording();
          }}
        >
          Export ({recordingDuration})
        </Button>
      )}
    </div>
  );
}

export default RecordingControls;
