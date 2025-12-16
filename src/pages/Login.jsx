import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { ArrowRight, Lock, Mail, Loader2, LogIn } from "lucide-react";
import Logo from "../components/Logo";

const LoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        // Simple Validation
        if (!formData.email || !formData.password) {
            setError("Please enter your credentials to continue.");
            return;
        }

        setIsLoading(true);

        // Simulate Network Request
        setTimeout(() => {
            setIsLoading(false);

            // Admin Logic Check
            if (formData.email === "admin@example.com" && formData.password === "admin123") {
                login({ name: "Admin User", email: formData.email, role: "admin" });
                navigate("/admin");
            } else {
                // Default User Logic
                login({ name: "Crypto King", email: formData.email, role: "user" });
                navigate("/dashboard");
            }
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
            {/* Background Elements */}
            <div className="absolute top-0 center w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-background to-background pointer-events-none" />
            <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-primary/20 rounded-full blur-[128px] pointer-events-none animate-pulse-glow" />
            <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-blue-500/10 rounded-full blur-[128px] pointer-events-none" />

            <div className="w-full max-w-md p-1 relative z-10 transition-all duration-300">
                {/* Glowing Border Effect Container */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-blue-500/50 rounded-2xl blur-sm opacity-75" />

                <div className="relative bg-surface/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
                    <div className="flex flex-col items-center mb-8">
                        <Logo className="w-12 h-12 rounded-xl mb-4" />
                        <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                        <p className="text-gray-400 text-sm">Sign in to access your account</p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="email"
                                    placeholder="name@example.com"
                                    className="w-full pl-12 pr-4 py-3.5 bg-black/50 border border-white/10 rounded-xl text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-300 ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-4 py-3.5 bg-black/50 border border-white/10 rounded-xl text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center font-medium animate-pulse">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 text-white font-bold rounded-xl transition transform active:scale-[0.98] flex items-center justify-center gap-2 group bg-primary hover:bg-primary-glow shadow-glow hover:scale-[1.02]"
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <LogIn className="w-5 h-5" /> Login to Account <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-gray-500 text-sm">
                            Don't have an account? <Link to="/register" className="text-primary hover:text-primary-glow font-bold transition">Create Account</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;


