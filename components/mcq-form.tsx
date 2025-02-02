"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface Option {
  value: string;
  label: string;
  hasTextInput?: boolean;
}

interface Question {
  id: number;
  question: string;
  options: Option[];
}

interface FormAnswer {
  selectedOption: string;
  otherText?: string;
}

interface FormAnswers {
  [key: number]: FormAnswer;
}

const questions: Question[] = [
  {
    id: 1,
    question: "How are you feeling today?",
    options: [
      { value: "calm", label: "Calm" },
      { value: "anxious", label: "Anxious" },
      { value: "sad", label: "Sad" },
      { value: "angry", label: "Angry" },
      { value: "overwhelmed", label: "Overwhelmed" },
      { value: "other", label: "Other", hasTextInput: true },
    ],
  },
  {
    id: 2,
    question: "What brings you here today?",
    options: [
      { value: "stress", label: "Stress" },
      { value: "relationships", label: "Relationships" },
      { value: "understanding", label: "Self-reflection" },
      { value: "confidence", label: "Building confidence" },
      { value: "challenges", label: "Challenges" },
      { value: "other", label: "Other", hasTextInput: true },
    ],
  },
  {
    id: 3,
    question: "What's your biggest challenge right now?",
    options: [
      { value: "work", label: "Work" },
      { value: "relationships", label: "Relationships" },
      { value: "motivation", label: "Motivation" },
      { value: "emotions", label: "Managing emotions" },
      { value: "confidence", label: "Confidence" },
      { value: "other", label: "Other", hasTextInput: true },
    ],
  },
  {
    id: 4,
    question: "How often do you feel overwhelmed?",
    options: [
      { value: "daily", label: "Daily" },
      { value: "weekly", label: "Weekly" },
      { value: "monthly", label: "Monthly" },
      { value: "rarely", label: "Rarely" },
      { value: "never", label: "Never" },
    ],
  },
  {
    id: 5,
    question: "How's your energy level today?",
    options: [
      { value: "high", label: "High" },
      { value: "moderate", label: "Moderate" },
      { value: "low", label: "Low" },
      { value: "veryLow", label: "Very low" },
    ],
  },
  {
    id: 6,
    question: "How do you usually handle difficult moments?",
    options: [
      { value: "talking", label: "Talking" },
      { value: "exercise", label: "Exercise" },
      { value: "selfCare", label: "Self-care" },
      { value: "hobbies", label: "Hobbies" },
      { value: "avoidance", label: "Avoidance" },
      { value: "other", label: "Other", hasTextInput: true },
    ],
  },
  {
    id: 7,
    question: "What does your typical day look like?",
    options: [
      { value: "productive", label: "Productive" },
      { value: "busy", label: "Busy" },
      { value: "unstructured", label: "Unstructured" },
      { value: "relaxed", label: "Relaxed" },
      { value: "other", label: "Other", hasTextInput: true },
    ],
  },
  {
    id: 8,
    question: "How do you feel about sharing your emotions?",
    options: [
      { value: "veryComfortable", label: "Very comfortable" },
      { value: "somewhatComfortable", label: "Somewhat comfortable" },
      { value: "notComfortable", label: "Not comfortable" },
      { value: "uncomfortable", label: "Uncomfortable" },
    ],
  },
];

const TypeformMentalHealth = () => {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<FormAnswers>({});
  const [otherText, setOtherText] = useState("");

  const handleAnswer = (selectedOption: string) => {
    const questionId = questions[currentQuestion].id;

    setAnswers((prev) => ({
      ...prev,
      [questionId]: {
        selectedOption,
        ...(selectedOption === "other" && { otherText }),
      },
    }));

    if (selectedOption !== "other") {
      handleNext();
    }
  };

  const handleOtherSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otherText.trim()) {
      handleAnswer("other");
      setOtherText("");
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      saveAssessment();
    }
  };

  const saveAssessment = () => {
    const newResponse = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      answers,
    };

    try {
      const existingData = localStorage.getItem("mentalHealthAssessments");
      const assessments = existingData ? JSON.parse(existingData) : [];
      assessments.push(newResponse);
      localStorage.setItem(
        "mentalHealthAssessments",
        JSON.stringify(assessments)
      );
      router.push("/start-call");
    } catch (error) {
      console.error("Error saving assessment:", error);
      // You might want to add error handling UI here
    }
  };

  const currentQuestionData = questions[currentQuestion];
  const currentAnswer = answers[currentQuestionData.id];

  return (
    <div className="min-h-screen p-4 bg-gradient-to-r from-violet-400/90 via-purple-400/80 to-orange-500/90">
      <div className="max-w-2xl mx-auto">
        {/* Progress bar */}
        <div className="mb-4 h-2 bg-white/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-300 ease-in-out"
            style={{
              width: `${((currentQuestion + 1) / questions.length) * 100}%`,
            }}
          />
        </div>

        {/* Question */}
        <h2 className="text-2xl font-semibold mb-8 text-white">
          {currentQuestionData.question}
        </h2>

        {/* Options */}
        <div className="grid grid-cols-2 gap-4">
          {currentQuestionData.options.map((option) => (
            <div key={option.value} className="relative">
              <button
                onClick={() => handleAnswer(option.value)}
                className={`w-full px-6 py-3 rounded-full border-2 text-center transition-all duration-200
                  ${
                    currentAnswer?.selectedOption === option.value
                      ? "bg-purple-500 border-purple-600 text-white shadow-lg scale-105"
                      : "bg-white border-transparent text-gray-700 hover:bg-gray-50 hover:scale-102"
                  }`}
              >
                {option.label}
              </button>

              {option.hasTextInput &&
                currentAnswer?.selectedOption === "other" && (
                  <form onSubmit={handleOtherSubmit} className="mt-4 space-y-3">
                    <input
                      type="text"
                      value={otherText}
                      onChange={(e) => setOtherText(e.target.value)}
                      placeholder="Please specify..."
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:border-purple-500"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="w-full px-6 py-3 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors duration-200"
                    >
                      Continue
                    </button>
                  </form>
                )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TypeformMentalHealth;
