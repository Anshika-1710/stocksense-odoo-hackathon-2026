import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios.js";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const requestOtp = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await api.post("/auth/forgot-password", { email });
      setMessage(data.message);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Could not send OTP");
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/auth/reset-password", { email, otp, newPassword });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Could not reset password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sage px-4">
      <div className="w-full max-w-sm bg-white rounded-lg border border-black/5 p-8">
        <p className="text-lg font-semibold text-ink">Reset your password</p>
        <p className="text-sm text-slate mt-1 mb-6">
          {step === 1 ? "We'll send a one-time code to your email." : "Enter the code and your new password."}
        </p>

        {step === 1 ? (
          <form onSubmit={requestOtp} className="space-y-4">
            <input
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-moss"
            />
            {error && <p className="text-sm text-signal">{error}</p>}
            <button className="w-full rounded-md bg-ink text-white py-2 text-sm font-medium hover:bg-slate transition-colors">
              Send OTP
            </button>
          </form>
        ) : (
          <form onSubmit={resetPassword} className="space-y-4">
            {message && <p className="text-sm text-moss">{message}</p>}
            <input
              required
              placeholder="6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-moss"
            />
            <input
              type="password"
              required
              minLength={6}
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-moss"
            />
            {error && <p className="text-sm text-signal">{error}</p>}
            <button className="w-full rounded-md bg-ink text-white py-2 text-sm font-medium hover:bg-slate transition-colors">
              Reset password
            </button>
          </form>
        )}

        <p className="mt-4 text-sm text-slate">
          <Link to="/login" className="text-moss hover:underline">Back to log in</Link>
        </p>
      </div>
    </div>
  );
}
