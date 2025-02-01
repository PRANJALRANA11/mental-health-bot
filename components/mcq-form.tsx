// @ts-nocheck
"use client";

import React, { useState, useEffect } from "react";
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
      { value: "other", label: "other", hasTextInput: true },
    ],
  },
  {
    id: 2,
    question: "What brings you here today?",
    options: [
      { value: "stress", label: "stress" },
      { value: "relationships", label: "relationships" },
      { value: "understanding", label: "understanding" },
      { value: "confidence", label: "confidence" },
      { value: "challenges", label: "challenges" },
      { value: "other", label: "other", hasTextInput: true },
    ],
  },
  {
    id: 3,
    question: "What's your biggest challenge right now?",
    options: [
      { value: "work", label: "Work " },
      { value: "relationships", label: "relationships" },
      { value: "motivation", label: "motivation" },
      { value: "emotions", label: "emotions" },
      { value: "confidence", label: "confidence" },
      { value: "other", label: "other", hasTextInput: true },
    ],
  },
  {
    id: 4,
    question: "How often do you feel overwhelmed?",
    options: [
      { value: "daily", label: "daily" },
      { value: "weekly", label: "weekly" },
      { value: "monthly", label: "monthly" },
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
      { value: "talking", label: "Talking " },
      { value: "exercise", label: "excercise" },
      { value: "selfCare", label: "selfCare" },
      { value: "hobbies", label: "hobbies" },
      { value: "avoidance", label: "avoidance" },
      { value: "other", label: "other", hasTextInput: true },
    ],
  },
  {
    id: 7,
    question: "What does your typical day look like?",
    options: [
      { value: "productive", label: "productive" },
      { value: "busy", label: "busy" },
      { value: "unstructured", label: "Unstructured" },
      { value: "relaxed", label: "relaxed" },
      { value: "other", label: "other", hasTextInput: true },
    ],
  },
  {
    id: 8,
    question: "How do you feel about sharing your emotions?",
    options: [
      { value: "veryComfortable", label: "Very comfortable" },
      {
        value: "somewhatComfortable",
        label: "somewhat Comfortable",
      },
      { value: "notComfortable", label: "Not Comfortable" },
      { value: "uncomfortable", label: "uncomfortable" },
    ],
  },
];

const TypeformMentalHealth = () => {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [otherText, setOtherText] = useState("");

  const handleAnswer = (selectedOption) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestion].id]: {
        selectedOption,
        ...(selectedOption === "other" && { otherText }),
      },
    }));

    if (selectedOption !== "other") {
      handleNext();
    }
  };

  const handleOtherSubmit = (e) => {
    e.preventDefault();
    if (otherText.trim()) {
      handleAnswer("other");
      setOtherText("");
      handleNext();
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

    const existingData = localStorage.getItem("mentalHealthAssessments");
    const assessments = existingData ? JSON.parse(existingData) : [];
    assessments.push(newResponse);
    localStorage.setItem(
      "mentalHealthAssessments",
      JSON.stringify(assessments)
    );

    router.push("/start-call");
  };

  const currentQuestionData = questions[currentQuestion];
  const currentAnswer = answers[currentQuestionData.id];

  return (
    <div className="min-h-screen p-4 bg-[#1e3470] ">
      <div className="max-w-2xl mx-auto">
        <div className="mb-4 h-2 bg-gray-200 rounded">
          <div
            className="h-full bg-green-500 rounded"
            style={{
              width: `${((currentQuestion + 1) / questions.length) * 100}%`,
            }}
          />
        </div>

        <h2 className="text-xl font-semibold mb-4 text-white">
          {currentQuestionData.question}
        </h2>

        <div className="space-y-2">
          {currentQuestionData.options.map((option) => (
            <div key={option.value}>
              <button
                onClick={() => handleAnswer(option.value)}
                className={`w-full text-left p-3 rounded border bg-white ${
                  currentAnswer?.selectedOption === option.value
                    ? "bg-blue-50 border-blue-500"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                {option.label}
              </button>

              {option.hasTextInput &&
                currentAnswer?.selectedOption === "other" && (
                  <form onSubmit={handleOtherSubmit} className="mt-2">
                    <input
                      type="text"
                      value={otherText}
                      onChange={(e) => setOtherText(e.target.value)}
                      placeholder="Please specify..."
                      className="w-full p-2 border border-gray-300 rounded"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="mt-2 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
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
