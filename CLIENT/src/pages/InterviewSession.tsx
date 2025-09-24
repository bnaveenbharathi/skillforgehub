import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  MessageSquare, 
  StickyNote,
  ExternalLink,
  Clock,
  Brain,
  ChevronDown,
  ChevronUp,
  Send,
  Star,
  Volume2,
  VolumeX,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Trophy
} from "lucide-react";

const InterviewSession = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [totalQuestions] = useState(10);
  const [sessionTime, setSessionTime] = useState(0);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

  // Mock interview data
  const currentQuestionData = {
    id: 1,
    type: "Technical",
    question: "Can you explain the difference between React hooks and class components? When would you choose one over the other?",
    duration: "3 minutes",
    difficulty: "Intermediate",
    context: "This question tests your understanding of React fundamentals and decision-making skills."
  };

  const chatHistory = [
    {
      id: 1,
      type: "ai",
      message: "Hello! I'm your AI interviewer. I'll be conducting a technical interview with you today. Are you ready to begin?",
      timestamp: "09:00 AM"
    },
    {
      id: 2,
      type: "user", 
      message: "Yes, I'm ready to start!",
      timestamp: "09:00 AM"
    },
    {
      id: 3,
      type: "ai",
      message: currentQuestionData.question,
      timestamp: "09:01 AM"
    }
  ];

  const feedbackData = {
    score: 8.5,
    confidence: 85,
    strengths: ["Clear communication", "Good technical understanding", "Structured response"],
    improvements: ["Provide more specific examples", "Consider edge cases"],
    nextTip: "Great answer! For the next question, try to include a practical example."
  };

  // Initialize webcam
  useEffect(() => {
    const initializeCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: true, 
          audio: true 
        });
        setMediaStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };

    initializeCamera();

    // Cleanup function
    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Session timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Toggle video
  const toggleVideo = () => {
    if (mediaStream) {
      const videoTrack = mediaStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoOn(videoTrack.enabled);
      }
    }
  };

  // Toggle microphone
  const toggleMic = () => {
    if (mediaStream) {
      const audioTrack = mediaStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMicOn(audioTrack.enabled);
      }
    }
  };

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle next question
  const handleNextQuestion = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(prev => prev + 1);
      setShowFeedback(false);
    } else {
      // Interview complete
      navigate("/mock-interview");
    }
  };

  // Handle end interview
  const handleEndInterview = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
    }
    navigate("/mock-interview");
  };

  const progressPercentage = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-accent/20">
      {/* Header */}
      <header className="border-b border-border/30 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary-glow/20 rounded-xl flex items-center justify-center">
                <Brain className="h-6 w-6 text-primary animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">AI Mock Interview</h1>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Badge variant="outline" className="text-xs">
                    {currentQuestionData.type}
                  </Badge>
                  <span>•</span>
                  <span>{currentQuestionData.difficulty}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-mono">{formatTime(sessionTime)}</span>
              </div>
              <Button variant="outline" onClick={handleEndInterview}>
                <ExternalLink className="h-4 w-4 mr-2" />
                Exit Interview
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* Video Panel */}
          <div className="lg:col-span-2 space-y-4">
            {/* Progress Tracker */}
            <div className="bg-gradient-to-br from-background/80 to-accent/30 backdrop-blur-sm rounded-2xl p-4 border border-primary/10 shadow-[var(--shadow-soft)]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Question Progress</span>
                <span className="text-sm text-muted-foreground">{currentQuestion}/{totalQuestions}</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>

            {/* Video Call Area */}
            <div className="bg-gradient-to-br from-background/80 to-accent/30 backdrop-blur-sm rounded-2xl p-6 border border-primary/10 shadow-[var(--shadow-soft)] flex-1">
              <div className="relative h-full min-h-[300px] bg-muted/30 rounded-xl overflow-hidden">
                {/* User Video */}
                <div className="relative w-full h-full">
                  {isVideoOn ? (
                    <video
                      ref={videoRef}
                      autoPlay
                      muted
                      playsInline
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted/50 rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <VideoOff className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Camera is off</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* AI Interviewer Avatar */}
                <div className="absolute top-4 right-4 w-24 h-24 bg-gradient-to-br from-primary/20 to-primary-glow/20 rounded-xl border-2 border-primary/30 flex items-center justify-center">
                  <div className="relative">
                    <Brain className={`h-8 w-8 text-primary ${isSpeaking ? 'animate-pulse' : ''}`} />
                    {isSpeaking && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                    )}
                  </div>
                </div>

                {/* Controls Overlay */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <div className="flex items-center space-x-2 bg-background/80 backdrop-blur-sm rounded-full p-2 border border-border/30">
                    <Button
                      size="sm"
                      variant={isMicOn ? "default" : "destructive"}
                      onClick={toggleMic}
                      className="rounded-full w-10 h-10 p-0"
                    >
                      {isMicOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                    </Button>
                    
                    <Button
                      size="sm"
                      variant={isVideoOn ? "default" : "destructive"}
                      onClick={toggleVideo}
                      className="rounded-full w-10 h-10 p-0"
                    >
                      {isVideoOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                    </Button>

                    <Button
                      size="sm"
                      variant={isAudioEnabled ? "default" : "outline"}
                      onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                      className="rounded-full w-10 h-10 p-0"
                    >
                      {isAudioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full w-10 h-10 p-0"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="lg:col-span-2 space-y-4">
            <Tabs defaultValue="question" className="h-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="question">Current Question</TabsTrigger>
                <TabsTrigger value="chat">Chat</TabsTrigger>
                <TabsTrigger value="feedback">Feedback</TabsTrigger>
              </TabsList>

              <TabsContent value="question" className="space-y-4 mt-4">
                <div className="bg-gradient-to-br from-background/80 to-accent/30 backdrop-blur-sm rounded-2xl p-6 border border-primary/10 shadow-[var(--shadow-soft)]">
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-primary/10 text-primary">
                        Question {currentQuestion}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{currentQuestionData.duration}</span>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Current Question</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-background/50 rounded-xl border border-border/30">
                      <p className="text-sm text-foreground">{currentQuestionData.question}</p>
                    </div>

                    <div className="p-3 bg-primary/5 rounded-xl border border-primary/10">
                      <p className="text-xs text-muted-foreground">
                        <strong>Context:</strong> {currentQuestionData.context}
                      </p>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        onClick={() => setShowFeedback(true)}
                        className="flex-1"
                      >
                        Submit Answer
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setIsSpeaking(!isSpeaking)}
                      >
                        {isSpeaking ? "Stop" : "Repeat"}
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="chat" className="mt-4">
                <div className="bg-gradient-to-br from-background/80 to-accent/30 backdrop-blur-sm rounded-2xl border border-primary/10 shadow-[var(--shadow-soft)] h-[400px] flex flex-col">
                  <div className="p-4 border-b border-border/30">
                    <h3 className="font-semibold text-foreground">AI Interviewer Chat</h3>
                  </div>

                  <div className="flex-1 p-4 overflow-y-auto space-y-3">
                    {chatHistory.map((chat) => (
                      <div key={chat.id} className={`flex ${chat.type === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                          chat.type === "user" 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-background/50 border border-border/30"
                        }`}>
                          <p>{chat.message}</p>
                          <p className="text-xs opacity-70 mt-1">{chat.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 border-t border-border/30">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Type your response..."
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        className="flex-1"
                      />
                      <Button>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="feedback" className="mt-4">
                {showFeedback ? (
                  <div className="bg-gradient-to-br from-background/80 to-accent/30 backdrop-blur-sm rounded-2xl p-6 border border-primary/10 shadow-[var(--shadow-soft)]">
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-foreground">AI Feedback</h3>
                        <Badge className="bg-green-500/10 text-green-700">
                          <Trophy className="h-3 w-3 mr-1" />
                          {feedbackData.score}/10
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-primary/5 rounded-xl">
                          <p className="text-2xl font-bold text-primary">{feedbackData.score}</p>
                          <p className="text-xs text-muted-foreground">Overall Score</p>
                        </div>
                        <div className="text-center p-3 bg-blue-500/5 rounded-xl">
                          <p className="text-2xl font-bold text-blue-600">{feedbackData.confidence}%</p>
                          <p className="text-xs text-muted-foreground">Confidence</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-foreground mb-2 flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          Strengths
                        </h4>
                        <ul className="space-y-1">
                          {feedbackData.strengths.map((strength, index) => (
                            <li key={index} className="text-sm text-muted-foreground">• {strength}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium text-foreground mb-2 flex items-center">
                          <AlertCircle className="h-4 w-4 text-orange-500 mr-2" />
                          Areas for Improvement
                        </h4>
                        <ul className="space-y-1">
                          {feedbackData.improvements.map((improvement, index) => (
                            <li key={index} className="text-sm text-muted-foreground">• {improvement}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-3 bg-gradient-to-r from-primary/5 via-primary-glow/5 to-primary/5 rounded-xl border border-primary/10">
                        <p className="text-sm text-foreground">
                          <strong>Next Question Tip:</strong> {feedbackData.nextTip}
                        </p>
                      </div>

                      <Button onClick={handleNextQuestion} className="w-full">
                        {currentQuestion < totalQuestions ? "Next Question" : "Complete Interview"}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gradient-to-br from-background/80 to-accent/30 backdrop-blur-sm rounded-2xl p-6 border border-primary/10 shadow-[var(--shadow-soft)] text-center">
                    <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                    <h3 className="font-semibold text-foreground mb-2">AI Feedback</h3>
                    <p className="text-sm text-muted-foreground">
                      Complete your answer to receive detailed AI feedback and suggestions.
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Notes Panel */}
        <div className={`mt-6 transition-all duration-300 ${showNotes ? 'max-h-96' : 'max-h-16'} overflow-hidden`}>
          <div className="bg-gradient-to-br from-background/80 to-accent/30 backdrop-blur-sm rounded-2xl border border-primary/10 shadow-[var(--shadow-soft)]">
            <button
              onClick={() => setShowNotes(!showNotes)}
              className="w-full p-4 flex items-center justify-between text-left"
            >
              <div className="flex items-center space-x-3">
                <StickyNote className="h-5 w-5 text-primary" />
                <span className="font-semibold text-foreground">Interview Notes</span>
                <Badge variant="outline" className="text-xs">
                  {notes.length} characters
                </Badge>
              </div>
              {showNotes ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
            
            {showNotes && (
              <div className="px-4 pb-4">
                <Textarea
                  placeholder="Jot down key points, ideas, or reminders during the interview..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[150px] resize-none"
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-muted-foreground">
                    Notes are automatically saved
                  </span>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Export Notes
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default InterviewSession;