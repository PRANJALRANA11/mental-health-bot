// @ts-nocheck
import { useVoice } from "@humeai/voice-react";
import Expressions from "./Expressions";
import { forwardRef } from "react";

const Messages = forwardRef(function Messages(_, ref) {
  const { messages } = useVoice();

  return (
    <div className="grow overflow-auto p-4" ref={ref}>
      <div className="max-w-2xl mx-auto w-full flex flex-col gap-4 pb-24">
        {messages.map((msg, index) => {
          if (msg.type === "user_message" || msg.type === "assistant_message") {
            const isUser = msg.type === "user_message";

            return (
              <div
                key={msg.type + index}
                className={`w-4/5 border rounded-lg ${
                  isUser ? "ml-auto bg-blue-50" : "bg-gray-50"
                }`}
              >
                <div className="text-xs font-medium text-gray-500 pt-3 px-3">
                  {isUser ? "You" : "AI"}
                </div>

                <div className="px-3 py-2">{msg.message.content}</div>

                {/* <Expressions values={msg.models.prosody?.scores ?? {}} /> */}
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
});

export default Messages;
