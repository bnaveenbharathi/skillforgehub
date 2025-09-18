import { useState, useEffect } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import Footer from "@/components/Footer";
import { Clock, CheckCircle, XCircle, ArrowLeft, ArrowRight, BookOpen, Code, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const Assessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes in seconds
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const assessment = {
    title: "React Fundamentals Assessment",
    module: "Module 4: State Management",
    totalQuestions: 10,
    timeLimit: 3600,
    passingScore: 70
  };

  const questions = [
    {
      id: 1,
      type: "mcq",
      question: "What is the correct way to initialize state in a functional component?",
      options: [
        "const [count, setCount] = useState(0);",
        "const count = useState(0);",
        "this.state = { count: 0 };",
        "const [count] = useState(0);"
      ],
      correct: 0,
      explanation: "useState hook returns an array with the state value and a setter function."
    },
    {
      id: 2,
      type: "mcq",
      question: "Which hook is used for side effects in React?",
      options: [
        "useState",
        "useEffect",
        "useContext",
        "useReducer"
      ],
      correct: 1,
      explanation: "useEffect hook is used to perform side effects like API calls, subscriptions, etc."
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
      explanation: "This component uses useState to manage the counter state and provides buttons to modify it."
    }
  ];

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !isCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleSubmit();
    }
  }, [timeLeft, isCompleted]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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
    
    // Calculate score
    let correctAnswers = 0;
    questions.forEach((question, index) => {
      if (question.type === "mcq" && parseInt(finalAnswers[index]) === question.correct) {
        correctAnswers++;
      }
    });
    
    const calculatedScore = Math.round((correctAnswers / questions.length) * 100);
    setScore(calculatedScore);
    setIsCompleted(true);
    setShowFeedback(true);
  };

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showFeedback) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-primary/5">
        <DashboardHeader />
        
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto">
            
            {/* Results Header */}
            <div className="text-center mb-8">
              <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${
                score >= assessment.passingScore 
                  ? 'bg-green-100 text-green-600' 
                  : 'bg-red-100 text-red-600'
              }`}>
                {score >= assessment.passingScore ? 
                  <CheckCircle className="h-10 w-10" /> : 
                  <XCircle className="h-10 w-10" />
                }
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Assessment {score >= assessment.passingScore ? 'Completed!' : 'Needs Improvement'}
              </h1>
              <p className="text-lg text-muted-foreground">
                {assessment.title}
              </p>
            </div>

            {/* Score Card */}
            <div className="bg-gradient-to-br from-background/80 to-accent/30 backdrop-blur-sm rounded-3xl p-8 border border-primary/10 shadow-[var(--shadow-medium)] mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gradient mb-2">{score}%</div>
                  <p className="text-muted-foreground">Your Score</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">{assessment.passingScore}%</div>
                  <p className="text-muted-foreground">Passing Score</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-foreground mb-2">{questions.length}</div>
                  <p className="text-muted-foreground">Total Questions</p>
                </div>
              </div>
            </div>

            {/* AI Feedback */}
            <div className="bg-gradient-to-r from-primary/5 via-primary-glow/5 to-primary/5 rounded-3xl p-6 border border-primary/10 mb-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🤖</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">AI Feedback & Recommendations</h3>
                  {score >= assessment.passingScore ? (
                    <div className="space-y-2">
                      <p className="text-muted-foreground">
                        Excellent work! You've demonstrated a strong understanding of React fundamentals.
                      </p>
                      <p className="text-muted-foreground">
                        <strong>Next Steps:</strong> Consider advancing to "Advanced React Patterns" or start working on the "E-commerce Platform" project.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-muted-foreground">
                        You're making progress, but there are some areas that need more practice.
                      </p>
                      <p className="text-muted-foreground">
                        <strong>Recommendations:</strong> Review the useState and useEffect concepts, then retake this assessment.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-hero-outline">
                <BookOpen className="h-4 w-4 mr-2" />
                Review Materials
              </Button>
              {score < assessment.passingScore && (
                <Button className="btn-hero">
                  Retake Assessment
                </Button>
              )}
              {score >= assessment.passingScore && (
                <Button className="btn-hero">
                  Continue to Next Module
                </Button>
              )}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-primary/5">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Assessment Header */}
          <div className="bg-background/80 backdrop-blur-sm rounded-3xl p-6 border border-border/50 shadow-[var(--shadow-soft)] mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground mb-2">{assessment.title}</h1>
                <p className="text-muted-foreground">{assessment.module}</p>
              </div>
              <div className="flex items-center space-x-6 mt-4 lg:mt-0">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="font-mono text-lg font-semibold text-foreground">
                    {formatTime(timeLeft)}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Question {currentQuestion + 1} of {questions.length}
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Progress</span>
                <span className="text-sm font-medium">{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-accent/50 rounded-full h-2">
                <div 
                  className="h-2 bg-gradient-to-r from-primary to-primary-glow rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-gradient-to-br from-background/80 to-accent/30 backdrop-blur-sm rounded-3xl p-8 border border-primary/10 shadow-[var(--shadow-medium)] mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                {currentQ.type === 'mcq' ? <FileText className="h-5 w-5 text-primary" /> : <Code className="h-5 w-5 text-primary" />}
              </div>
              <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                {currentQ.type === 'mcq' ? 'Multiple Choice' : 'Coding Challenge'}
              </span>
            </div>

            <h2 className="text-xl font-semibold text-foreground mb-6">
              {currentQ.question}
            </h2>

            {currentQ.type === 'mcq' ? (
              <div className="space-y-3">
                {currentQ.options?.map((option, index) => (
                  <label
                    key={index}
                    className={`block p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                      selectedAnswer === index.toString()
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50 hover:bg-accent/30'
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
                    <div className="flex items-center space-x-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedAnswer === index.toString()
                          ? 'border-primary bg-primary'
                          : 'border-border'
                      }`}>
                        {selectedAnswer === index.toString() && (
                          <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                        )}
                      </div>
                      <span className="text-foreground">{option}</span>
                    </div>
                  </label>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <textarea
                  value={selectedAnswer || ''}
                  onChange={(e) => handleAnswerSelect(e.target.value)}
                  placeholder={currentQ.placeholder}
                  className="w-full h-64 p-4 rounded-2xl border border-border bg-background/50 backdrop-blur-sm font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                />
                <p className="text-sm text-muted-foreground">
                  Write your React component code above. Include all necessary imports and exports.
                </p>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="btn-hero-outline"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <div className="flex space-x-4">
              {currentQuestion === questions.length - 1 ? (
                <Button
                  onClick={handleSubmit}
                  disabled={selectedAnswer === null}
                  className="btn-hero"
                >
                  Submit Assessment
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={selectedAnswer === null}
                  className="btn-hero"
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Assessment;