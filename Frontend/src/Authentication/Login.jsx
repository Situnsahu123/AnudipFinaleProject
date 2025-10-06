import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Initialize navigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await axios.post('http://localhost:4000/login', { email, password });
            console.log("Login successful:", res.data);
            localStorage.setItem('token',res.data.token);
            localStorage.setItem('email', email);
            navigate('/home');
        } catch (err) {
            // Use the specific error message from the backend response
            if (err.response && err.response.data && err.response.data.error) {
                setError(err.response.data.error);
            } else {
                // Fallback for network errors or other issues
                setError("An unexpected error occurred. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[url('/Login_image.png')] bg-cover bg-center flex items-center justify-center">
            <div className="max-w-md w-full bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-10 space-y-8">
                <div className="text-center">
                    <img src="/Login_image.png" alt="Login" className="mx-auto w-20 h-20 rounded-full shadow-lg mb-4" />
                    <h2 className="text-3xl font-extrabold text-gray-800">Welcome Back!</h2>
                    <p className="text-sm text-gray-500 mt-2">Sign in to access your portal.</p>
                </div>

                {error && <div className="text-sm text-red-700 bg-red-100 p-3 rounded-md">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <div className="mt-1 relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent pr-10"
                                placeholder="Enter your password"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((s) => !s)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-600 hover:text-gray-800"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <Link to="/forgot-password" className="text-sm text-teal-600 hover:underline">Forgot password?</Link>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-4 inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 text-white rounded-md font-semibold shadow-lg transition-all duration-200 disabled:opacity-60"
                    >
                        {loading ? "Signing in..." : "Sign in"}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-teal-600 font-semibold hover:underline">Create one</Link>
                </p>
            </div>
        </div>
    );
}