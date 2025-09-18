import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import LearningPath from "./pages/LearningPath";
import Assessment from "./pages/Assessment";
import MockInterview from "./pages/MockInterview";
import PlannerView from "./pages/PlannerView";
import ELibrary from "./pages/ELibrary";
import InterviewSession from "./pages/InterviewSession";
import ProfileSetup from "./pages/ProfileSetup";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/learning-path" element={<LearningPath />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/mock-interview" element={<MockInterview />} />
            <Route path="/interview-session" element={<InterviewSession />} />
            <Route path="/planner" element={<PlannerView />} />
            <Route path="/library" element={<ELibrary />} />
            <Route path="/profile" element={<ProfileSetup />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
