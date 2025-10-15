import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdatePassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");
        try {
            const res = await axios.put("http://localhost:4000/users/password", {
                email,
                newPassword
            });
            setSuccess("Password updated successfully!");
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update password. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[url('/Login_image.png')] bg-cover bg-center flex flex-col justify-center items-center py-12 px-4">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white/80 backdrop-blur-md py-8 px-6 shadow-2xl rounded-2xl">
                    <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-2">
                        Update Your Password
                    </h2>
                    <p className="text-center text-gray-500 mb-6">
                        Enter your email and new password
                    </p>

                    {error && <div className="text-sm text-red-700 bg-red-100 p-3 rounded-md mb-4">{error}</div>}
                    {success && <div className="text-sm text-green-700 bg-green-100 p-3 rounded-md mb-4">{success}</div>}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                                New Password
                            </label>
                            <input
                                id="newPassword"
                                name="newPassword"
                                type="password"
                                autoComplete="new-password"
                                required
                                value={newPassword}
                                onChange={e => setNewPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-200 disabled:opacity-60"
                        >
                            {loading ? "Updating..." : "Update Password"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdatePassword;
