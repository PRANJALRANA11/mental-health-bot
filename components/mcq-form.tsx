// @ts-nocheck
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

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

interface AssessmentResponse {
  id: string;
  timestamp: string;
  answers: FormAnswers;
}

const questions: Question[] = [
  {
    id: 1,
    question: "How are you feeling today?",
    options: [
      { value: "calm", label: "😌 Calm and content" },
      { value: "anxious", label: "😰 Anxious or stressed" },
      { value: "sad", label: "😢 Sad or low" },
      { value: "angry", label: "😠 Angry or frustrated" },
      { value: "overwhelmed", label: "😫 Overwhelmed" },
      { value: "other", label: "✍️ Something else...", hasTextInput: true },
    ],
  },
  {
    id: 2,
    question: "What brings you here today?",
    options: [
      { value: "stress", label: "🧘‍♀️ Managing stress or anxiety" },
      { value: "relationships", label: "❤️ Improving relationships" },
      { value: "understanding", label: "🤔 Understanding myself better" },
      { value: "confidence", label: "💪 Building confidence" },
      { value: "challenges", label: "🎯 Dealing with specific challenges" },
      { value: "other", label: "✍️ Something else...", hasTextInput: true },
    ],
  },
  {
    id: 3,
    question: "What's your biggest challenge right now?",
    options: [
      { value: "work", label: "💼 Work or career-related stress" },
      { value: "relationships", label: "👥 Relationship or family issues" },
      { value: "motivation", label: "🔋 Feeling stuck or unmotivated" },
      { value: "emotions", label: "🎭 Managing difficult emotions" },
      { value: "confidence", label: "🌱 Building self-confidence" },
      { value: "other", label: "✍️ Something else...", hasTextInput: true },
    ],
  },
  {
    id: 4,
    question: "How often do you feel overwhelmed?",
    options: [
      { value: "daily", label: "📅 Almost every day" },
      { value: "weekly", label: "📆 A few times a week" },
      { value: "monthly", label: "🗓️ Once or twice a month" },
      { value: "rarely", label: "⭐ Rarely" },
      { value: "never", label: "🌟 Never" },
    ],
  },
  {
    id: 5,
    question: "How's your energy level today?",
    options: [
      { value: "high", label: "⚡ High - Full of energy" },
      { value: "moderate", label: "🔋 Moderate - Getting by okay" },
      { value: "low", label: "🪫 Low - Feeling tired" },
      { value: "veryLow", label: "😴 Very low - Completely drained" },
    ],
  },
  {
    id: 6,
    question: "How do you usually handle difficult moments?",
    options: [
      { value: "talking", label: "💭 Talk with friends or family" },
      { value: "exercise", label: "🏃‍♀️ Exercise or physical activity" },
      { value: "selfCare", label: "🧘‍♀️ Meditation or self-reflection" },
      { value: "hobbies", label: "🎨 Creative activities or hobbies" },
      { value: "avoidance", label: "🙈 Try to avoid thinking about it" },
      { value: "other", label: "✍️ Something else...", hasTextInput: true },
    ],
  },
  {
    id: 7,
    question: "What does your typical day look like?",
    options: [
      { value: "productive", label: "✨ Balanced and productive" },
      { value: "busy", label: "🌪️ Hectic and stressful" },
      { value: "unstructured", label: "🎲 Unpredictable or chaotic" },
      { value: "relaxed", label: "🌅 Calm but unmotivated" },
      { value: "other", label: "✍️ Something else...", hasTextInput: true },
    ],
  },
  {
    id: 8,
    question: "How do you feel about sharing your emotions?",
    options: [
      { value: "veryComfortable", label: "🗣️ Very comfortable opening up" },
      {
        value: "somewhatComfortable",
        label: "👥 Comfortable with trusted people",
      },
      { value: "notComfortable", label: "🤐 Prefer keeping things private" },
      { value: "uncomfortable", label: "🔒 Very private about feelings" },
    ],
  },
];

const IntroScreen = ({ onStart }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="min-h-screen flex flex-col justify-center items-center px-4 text-center bg-[#1e3470]"
  >
    <div className="max-w-2xl w-full space-y-8">
      <h1 className="text-4xl font-bold text-white">
        Let's Personalise Your Support
      </h1>

      <h2 className="text-2xl text-gray-400">
        Answer A Few Questions to Get Started
      </h2>

      <p className="text-lg text-slate-300 mt-6 leading-relaxed">
        To provide you with the most meaningful and empathetic support, we need
        to understand how you're feeling and what you're going through. These
        quick questions help your therapist tailor the conversation to your
        unique needs, ensuring you get the best response possible experience.
        Your answers are safe, private, and only used to guide your journey.
      </p>

      <button
        onClick={onStart}
        className="mt-8 px-8 py-4 bg-white text-[#1e3470] text-lg rounded-[20rem] hover:bg-slate-300 transition-colors w-full max-w-md mx-auto"
      >
        Begin Assessment
      </button>
    </div>
  </motion.div>
);

const TypeformQuestion = ({
  question,
  onAnswer,
  answer,
  isVisible,
  onNext,
}) => {
  const [otherText, setOtherText] = useState(answer?.otherText || "");

  const handleOptionClick = (value) => {
    onAnswer(question.id, value, otherText);
    if (value !== "other") {
      setTimeout(onNext, 500);
    }
  };

  const handleOtherSubmit = (e) => {
    e.preventDefault();
    if (otherText.trim()) {
      onAnswer(question.id, "other", otherText);
      onNext();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen flex flex-col justify-center items-center px-4"
    >
      <div className="max-w-2xl w-full space-y-8">
        <h2 className="text-3xl font-bold mb-8 text-white">
          {question.question}
        </h2>

        <div className="space-y-4">
          {question.options.map((option) => (
            <div key={option.value}>
              <button
                onClick={() => handleOptionClick(option.value)}
                className={`w-full text-left p-4  transition-all duration-200  text-[#1E3470]  rounded-[20rem]
                  ${
                    answer?.selectedOption === option.value
                      ? "bg-[#1E3470] text-white"
                      : "bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900"
                  } border border-gray-200 hover:border-gray-300`}
              >
                {option.label}
              </button>

              {option.hasTextInput && answer?.selectedOption === "other" && (
                <form onSubmit={handleOtherSubmit} className="mt-4">
                  <input
                    type="text"
                    value={otherText}
                    onChange={(e) => setOtherText(e.target.value)}
                    placeholder="Please specify..."
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="mt-4 w-full bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Continue
                  </button>
                </form>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const TypeformProgressBar = ({ currentQuestion, totalQuestions }) => (
  <div className="fixed top-14 left-0 w-full h-1 bg-gray-200">
    <motion.div
      className="h-full bg-green-500"
      initial={{ width: 0 }}
      animate={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
      transition={{ duration: 0.3 }}
    />
  </div>
);

const TypeformMentalHealth = () => {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  const handleAnswer = (questionId, selectedOption, otherText) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: {
        selectedOption,
        ...(selectedOption === "other" && { otherText }),
      },
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((current) => current + 1);
    }
  };

  const saveAssessment = (answers) => {
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

    return newResponse;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const savedResponse = saveAssessment(answers);
      await new Promise((resolve) => setTimeout(resolve, 500));
      router.push("/start-call");
    } catch (error) {
      console.error("Error saving assessment:", error);
      alert("There was an error saving your responses. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (
      currentQuestion === questions.length - 1 &&
      answers[questions[currentQuestion].id]?.selectedOption
    ) {
      handleSubmit();
    }
  }, [answers, currentQuestion]);

  if (showIntro) {
    return <IntroScreen onStart={() => setShowIntro(false)} />;
  }

  return (
    <div className=" bg-[#1E3470]">
      <TypeformProgressBar
        currentQuestion={currentQuestion + 1}
        totalQuestions={questions.length}
      />

      <AnimatePresence mode="wait">
        <TypeformQuestion
          key={currentQuestion}
          question={questions[currentQuestion]}
          answer={answers[questions[currentQuestion].id]}
          onAnswer={handleAnswer}
          onNext={handleNext}
          isVisible={true}
        />
      </AnimatePresence>

      {isSubmitting && (
        <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-xl font-semibold text-gray-800">
              Saving your responses...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TypeformMentalHealth;
