import { useState, useEffect } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import Footer from "@/components/Footer";
import {
  Clock,
  CheckCircle,
  XCircle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Code,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

// ------------------- Question Bank -------------------
const questionsBank: Record<string, any[]> = {
  "react-fundamentals": [
    {
      id: 1,
      type: "mcq",
      question: "What is the correct way to initialize state in a functional component?",
      options: [
        "const [count, setCount] = useState(0);",
        "const count = useState(0);",
        "this.state = { count: 0 };",
        "const [count] = useState(0);",
      ],
      correct: 0,
      explanation: "useState hook returns an array with the state value and a setter function.",
    },
    {
      id: 2,
      type: "mcq",
      question: "Which hook is used for side effects in React?",
      options: ["useState", "useEffect", "useContext", "useReducer"],
      correct: 1,
      explanation: "useEffect hook is used to perform side effects like API calls, subscriptions, etc.",
    },
    {
      id: 3,
      type: "coding",
      question: "Write a React component that displays a counter with increment and decrement buttons.",
      placeholder: "// Write your component here\nfunction Counter() {\n  // Your code\n}",
      solution: `function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  );
}`,
      explanation: "This component uses useState to manage the counter state and provides buttons to modify it.",
    },
  ],
  "javascript-essentials": [
    {
      id: 1,
      type: "mcq",
      question: "Which of the following is NOT a JavaScript data type?",
      options: ["String", "Number", "Boolean", "Character"],
      correct: 3,
      explanation: "JavaScript doesn’t have a Character type, strings represent characters.",
    },
  ],
  "html-css": [
    {
      id: 1,
      type: "mcq",
      question: "Which HTML tag is used to define an unordered list?",
      options: ["<ul>", "<ol>", "<li>", "<list>"],
      correct: 0,
      explanation: "The <ul> tag defines an unordered (bulleted) list.",
    },
  ],
  "node-backend": [
    {
      id: 1,
      type: "mcq",
      question: "Which method is used to create a new Express application?",
      options: ["express.create()", "express()", "new Express()", "app.init()"],
      correct: 1,
      explanation: "Calling express() initializes a new Express app.",
    },
  ],
};

// ------------------- Tests List -------------------
const tests = [
  {
    id: "react-fundamentals",
    title: "React Fundamentals",
    description: "Covers hooks, state, props, and component lifecycle.",
    module: "Module 4: State Management",
  },
  {
    id: "javascript-essentials",
    title: "JavaScript Essentials",
    description: "Covers ES6+, closures, promises, and event loop.",
    module: "Module 2: Core JS",
  },
  {
    id: "html-css",
    title: "HTML & CSS Basics",
    description: "Covers semantic HTML, Flexbox, Grid, and responsive design.",
    module: "Module 1: Frontend Basics",
  },
  {
    id: "node-backend",
    title: "Node.js & Express",
    description: "Covers APIs, middleware, and database integration.",
    module: "Module 5: Backend Development",
  },
];

const AssessmentPage = () => {
  const [selectedTest, setSelectedTest] = useState<string | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Timer
  useEffect(() => {
    if (timeLeft > 0 && !isCompleted && selectedTest) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleSubmit();
    }
  }, [timeLeft, isCompleted, selectedTest]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Select test
  const handleTestSelect = (testId: string) => {
    setSelectedTest(testId);
    setQuestions(questionsBank[testId]);
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setIsCompleted(false);
    setTimeLeft(1800);
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = selectedAnswer;
      setAnswers(newAnswers);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(newAnswers[currentQuestion + 1] || null);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1] || null);
    }
  };

  const handleSubmit = () => {
    const finalAnswers = [...answers];
    finalAnswers[currentQuestion] = selectedAnswer || "";
    setAnswers(finalAnswers);

    let correctAnswers = 0;
    questions.forEach((question, index) => {
      if (
        question.type === "mcq" &&
        parseInt(finalAnswers[index]) === question.correct
      ) {
        correctAnswers++;
      }
    });

    const calculatedScore = Math.round(
      (correctAnswers / questions.length) * 100
    );
    setScore(calculatedScore);
    setIsCompleted(true);
    setShowFeedback(true);
  };

  // ------------------- Render -------------------
  if (!selectedTest) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-primary/5">
        <DashboardHeader />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold mb-6">Recommended Assessments</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tests.map((test) => (
              <div
                key={test.id}
                className="bg-background/80 backdrop-blur-sm border border-border/50 rounded-2xl shadow p-6 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-xl font-semibold">{test.title}</h2>
                  <p className="text-muted-foreground text-sm mb-2">
                    {test.module}
                  </p>
                  <p className="text-muted-foreground mb-4">
                    {test.description}
                  </p>
                </div>
                <Button className="btn-hero w-full" onClick={() => handleTestSelect(test.id)}>
                  Start Assessment
                </Button>
              </div>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  // Results
  if (showFeedback) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-primary/5">
        <DashboardHeader />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <div
              className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${
                score >= 70 ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
              }`}
            >
              {score >= 70 ? (
                <CheckCircle className="h-10 w-10" />
              ) : (
                <XCircle className="h-10 w-10" />
              )}
            </div>
            <h1 className="text-3xl font-bold mb-2">
              {score >= 70 ? "Assessment Completed!" : "Needs Improvement"}
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Score: {score}% | Passing: 70%
            </p>

            <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-6 mb-8 text-left">
              <h3 className="font-semibold mb-2">🤖 AI Feedback</h3>
              {score >= 70 ? (
                <p>
                  Great job! You’re ready for the next module. Try advancing to
                  more complex projects.
                </p>
              ) : (
                <p>
                  You need to review some concepts. Revisit the fundamentals and
                  retake this test.
                </p>
              )}
            </div>

            <div className="flex justify-center gap-4">
              <Button onClick={() => setSelectedTest(null)} className="btn-hero-outline">
                Back to Tests
              </Button>
              {score < 70 && (
                <Button className="btn-hero" onClick={() => handleTestSelect(selectedTest)}>
                  Retake Test
                </Button>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Assessment UI
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-primary/5">
      <DashboardHeader />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-background/80 backdrop-blur-sm rounded-3xl p-6 border mb-8">
            <div className="flex justify-between">
              <div>
                <h1 className="text-2xl font-bold">{tests.find(t => t.id === selectedTest)?.title}</h1>
                <p className="text-muted-foreground">
                  {tests.find(t => t.id === selectedTest)?.module}
                </p>
              </div>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="font-mono font-semibold">
                    {formatTime(timeLeft)}
                  </span>
                </div>
                <div className="text-sm">
                  Q {currentQuestion + 1} / {questions.length}
                </div>
              </div>
            </div>
            {/* Progress */}
            <div className="mt-4">
              <div className="w-full bg-accent/50 rounded-full h-2">
                <div
                  className="h-2 bg-gradient-to-r from-primary to-primary-glow rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Question */}
          <div className="bg-gradient-to-br from-background/80 to-accent/30 p-6 rounded-3xl border mb-8">
            <h2 className="text-xl font-semibold mb-6">{currentQ.question}</h2>

            {currentQ.type === "mcq" ? (
              <div className="space-y-3">
                {currentQ.options?.map((option: string, index: number) => (
                  <label
                    key={index}
                    className={`block p-4 rounded-2xl border-2 cursor-pointer ${
                      selectedAnswer === index.toString()
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="answer"
                      value={index}
                      checked={selectedAnswer === index.toString()}
                      onChange={() => handleAnswerSelect(index.toString())}
                      className="sr-only"
                    />
                    {option}
                  </label>
                ))}
              </div>
            ) : (
              <textarea
                value={selectedAnswer || ""}
                onChange={(e) => handleAnswerSelect(e.target.value)}
                placeholder={currentQ.placeholder}
                className="w-full h-48 p-4 rounded-2xl border bg-background/50 font-mono text-sm"
              />
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Previous
            </Button>

            {currentQuestion === questions.length - 1 ? (
              <Button onClick={handleSubmit} disabled={selectedAnswer === null}>
                Submit Assessment
              </Button>
            ) : (
              <Button onClick={handleNext} disabled={selectedAnswer === null}>
                Next <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AssessmentPage;
