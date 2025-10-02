import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, createContext, useContext } from "react";

// Pages
import SplashScreen from "./pages/SplashScreen";
import LoginScreen from "./pages/LoginScreen";
import Dashboard from "./pages/Dashboard";
import PhishingDetector from "./pages/PhishingDetector";
import PasswordChecker from "./pages/PasswordChecker";
import SafetyMode from "./pages/SafetyMode";
import GamesHub from "./pages/GamesHub";
import AlertsHistory from "./pages/AlertsHistory";
import Settings from "./pages/Settings";
import ProfileDemo from "./pages/ProfileDemo";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// User Context for authentication state
interface UserContextType {
  user: { name: string; xp: number } | null;
  login: (name: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  login: () => {},
  logout: () => {}
});

export const useUser = () => useContext(UserContext);

const App = () => {
  const [user, setUser] = useState<{ name: string; xp: number } | null>(null);

  const login = (name: string) => {
    setUser({ name, xp: 245 }); // Starting XP
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={{ user, login, logout }}>
        <div>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<SplashScreen />} />
              <Route path="/splash" element={<SplashScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/phishing-detector" element={<PhishingDetector />} />
              <Route path="/password-checker" element={<PasswordChecker />} />
              <Route path="/safety-mode" element={<SafetyMode />} />
              <Route path="/games-hub" element={<GamesHub />} />
              <Route path="/alerts" element={<AlertsHistory />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile-demo" element={<ProfileDemo />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </UserContext.Provider>
    </QueryClientProvider>
  );
};

export default App;