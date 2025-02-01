import { useVoice } from "@humeai/voice-react";
import { Mic, MicOff, Phone } from "lucide-react";
import MicFFT from "./MicFFT";

export default function Controls() {
  const { disconnect, status, isMuted, unmute, mute, micFft } = useVoice();

  if (status.value !== "connected") {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 w-full p-4 bg-white border-t">
      <div className="max-w-md mx-auto flex items-center justify-between gap-4">
        <button
          onClick={() => {
            if (isMuted) {
              unmute();
            } else {
              mute();
            }
          }}
          className="p-2 border rounded-lg hover:bg-gray-50"
        >
          {isMuted ? (
            <MicOff className="h-4 w-4" />
          ) : (
            <Mic className="h-4 w-4" />
          )}
        </button>

        <div className="w-48 h-8">
          <MicFFT fft={micFft} className="fill-current" />
        </div>

        <button
          onClick={disconnect}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center gap-2"
        >
          <Phone className="h-4 w-4" />
          <span>End Call</span>
        </button>
      </div>
    </div>
  );
}
