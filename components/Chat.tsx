// @ts-nocheck
"use client";
interface AssessmentResponse {
  id: string;
  timestamp: string;
  answers: {
    [key: number]: {
      selectedOption: string;
      otherText?: string;
    };
  };
}

import { VoiceProvider } from "@humeai/voice-react";
import Messages from "./Messages";
import Controls from "./Controls";
import StartCall from "./StartCall";
import { ComponentRef, useRef, useEffect, useState } from "react";

export default function ClientComponent({
  accessToken,
}: {
  accessToken: string;
}) {
  const timeout = useRef<number | null>(null);
  const ref = useRef<ComponentRef<typeof Messages> | null>(null);
  const [answers, setAnswers] = useState<{
    [key: number]: { selectedOption: string; otherText?: string };
  }>({});

  const getAssessments = (): AssessmentResponse[] => {
    const data = localStorage.getItem("mentalHealthAssessments");
    return data ? JSON.parse(data) : [];
  };

  const getLatestAssessment = (): AssessmentResponse | null => {
    const assessments = getAssessments();
    return assessments.length > 0 ? assessments[assessments.length - 1] : null;
  };

  useEffect(() => {
    const latestAssessment = getLatestAssessment();

    if (latestAssessment) {
      console.log("latest", latestAssessment.answers[1]?.selectedOption);
      setAnswers(latestAssessment.answers);
    }
  }, []);

  return (
    <div
      className={
        "relative min-h-screen bg-[#1e3470]  grow flex flex-col mx-auto w-full overflow-hidden h-[0px]"
      }
    >
      <VoiceProvider
        auth={{ type: "accessToken", value: accessToken }}
        configId="0fe5d4fe-0eaa-49a5-899e-b8f055e3a8d4"
        sessionSettings={{
          systemPrompt: `We have collected some survey from the current user treat him according to his conditions mentioned in survey Q1: How are you feeling today? Ans 1: ${answers[1]?.selectedOption}
          Q2: How are you feeling today? Ans 2: ${answers[2]?.selectedOption}
          Q3: How are you feeling today? Ans 3: ${answers[3]?.selectedOption}
          Q4: How are you feeling today? Ans 4: ${answers[4]?.selectedOption}
          Q5: How are you feeling today? Ans 5: ${answers[5]?.selectedOption}
          Q6: How are you feeling today? Ans 6: ${answers[6]?.selectedOption}
          Q7: How are you feeling today? Ans 7: ${answers[7]?.selectedOption}
          Q8: How are you feeling today? Ans 8: ${answers[8]?.selectedOption}
          Also  starts by talking about the answers user have already given to the survey
          `,
          type: "session_settings",
        }}
        onMessage={() => {
          if (timeout.current) {
            window.clearTimeout(timeout.current);
          }

          timeout.current = window.setTimeout(() => {
            if (ref.current) {
              const scrollHeight = ref.current.scrollHeight;

              ref.current.scrollTo({
                top: scrollHeight,
                behavior: "smooth",
              });
            }
          }, 200);
        }}
      >
        <Messages ref={ref} />
        <Controls />
        <StartCall />
      </VoiceProvider>
    </div>
  );
}
