import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, LogIn, ArrowLeft, Mail } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

type TabType = "login" | "signup";
type ViewType = "auth" | "forgot" | "otp";

export function AuthForms() {
  const [activeTab, setActiveTab] = useState<TabType>("login");
  const [view, setView] = useState<ViewType>("auth");
  const [forgotEmail, setForgotEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  
  // Form states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  
  const { login, signup } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      toast({
        title: "Missing Fields",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
      return;
    }
    login(loginEmail, loginPassword);
    toast({
      title: "Welcome back!",
      description: "You have successfully logged in.",
    });
    navigate("/");
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupName || !signupEmail || !signupPassword) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    signup(signupName, signupEmail, signupPhone, signupPassword);
    toast({
      title: "Account created!",
      description: "Welcome to Rentify. You're now logged in.",
    });
    navigate("/");
  };

  const handleSendOtp = () => {
    if (!forgotEmail || !forgotEmail.includes("@")) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "OTP Sent!",
      description: `A 6-digit OTP has been sent to ${forgotEmail}`,
    });
    setView("otp");
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerifyOtp = () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter all 6 digits.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "OTP Verified!",
      description: "You can now reset your password.",
    });
    setView("auth");
    setOtp(["", "", "", "", "", ""]);
    setForgotEmail("");
  };

  return (
    <AnimatePresence mode="wait">
      {/* Forgot Password View */}
      {view === "forgot" && (
        <motion.div
          key="forgot"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="glass-card p-8"
        >
          <button
            onClick={() => setView("auth")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </button>
          
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-accent" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground">
              Forgot Password?
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
              Enter your email and we'll send you an OTP to reset your password.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="forgot-email">Email Address</Label>
              <Input
                id="forgot-email"
                type="email"
                placeholder="you@example.com"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
              />
            </div>
            <Button
              variant="accent"
              size="lg"
              className="w-full"
              onClick={handleSendOtp}
            >
              Send OTP
            </Button>
          </div>
        </motion.div>
      )}

      {/* OTP Verification View */}
      {view === "otp" && (
        <motion.div
          key="otp"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="glass-card p-8"
        >
          <button
            onClick={() => setView("forgot")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Change Email
          </button>
          
          <div className="text-center mb-6">
            <h2 className="font-display text-2xl font-bold text-foreground">
              Enter OTP
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
              We've sent a 6-digit code to <span className="text-accent">{forgotEmail}</span>
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="flex justify-center gap-2">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  className="w-12 h-12 text-center text-xl font-bold"
                />
              ))}
            </div>
            
            <Button
              variant="accent"
              size="lg"
              className="w-full"
              onClick={handleVerifyOtp}
            >
              Verify OTP
            </Button>
            
            <p className="text-center text-sm text-muted-foreground">
              Didn't receive the code?{" "}
              <button
                onClick={handleSendOtp}
                className="text-accent hover:underline"
              >
                Resend OTP
              </button>
            </p>
          </div>
        </motion.div>
      )}

      {/* Login/Signup View */}
      {view === "auth" && (
        <motion.div
          key="auth"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="glass-card p-8"
        >
          {/* Tabs */}
          <div className="flex mb-8">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 pb-3 text-sm font-semibold border-b-2 transition-colors ${
                activeTab === "login"
                  ? "border-accent text-accent"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab("signup")}
              className={`flex-1 pb-3 text-sm font-semibold border-b-2 transition-colors ${
                activeTab === "signup"
                  ? "border-accent text-accent"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Sign Up
            </button>
          </div>

          {activeTab === "login" ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
              <Button variant="accent" size="lg" className="w-full gap-2">
                <LogIn className="w-4 h-4" />
                Login
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                <button
                  type="button"
                  onClick={() => setView("forgot")}
                  className="text-accent hover:underline"
                >
                  Forgot password?
                </button>
              </p>
            </form>
          ) : (
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  type="text" 
                  placeholder="John Doe"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="you@example.com"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  placeholder="+91 98765 43210"
                  value={signupPhone}
                  onChange={(e) => setSignupPhone(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="••••••••"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                />
              </div>
              <Button variant="accent" size="lg" className="w-full gap-2">
                <User className="w-4 h-4" />
                Create Account
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                By signing up, you agree to our{" "}
                <a href="/terms" className="text-accent hover:underline">
                  Terms
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-accent hover:underline">
                  Privacy Policy
                </a>
              </p>
            </form>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
