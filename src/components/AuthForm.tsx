"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import axios, { AxiosError } from "axios";

interface AuthFormProps {
  onSuccess?: () => void;
}

type Mode = "login" | "register" | "verifyEmail";

export default function AuthForm({ onSuccess }: AuthFormProps) {
  const { login } = useAuth();
  const router = useRouter();

  const [authMode, setAuthMode] = useState<Mode>("login");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(""); 
    setError("");
    setLoading(true);

    try {
      if (authMode === "login") {
  const trimmedEmail = email.trim();
  const trimmedPassword = password.trim();

  await login(trimmedEmail, trimmedPassword);
  setMessage("Login successful!");
  router.push("/AccountCenter");
  if (onSuccess) onSuccess();
}


      else if (authMode === "register") {
        if (password !== confirmPassword) {
          setError("Passwords do not match");
          return;
        }

        await api.post("/auth/send-code", { email });
        setMessage("Verification code sent to your email.");
        setAuthMode("verifyEmail");

      }

      else if (authMode === "verifyEmail") {
        await api.post("/auth/verify-code", {
          email,
          code: verificationCode,
        });

        await api.post("/auth/register", {
          name,
          email,
          password,
        });

        setMessage("Email verified and account created! You can now log in.");
        setAuthMode("login");
        setVerificationCode("");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<{ message?: string; errors?: string[] }>;
        if (axiosError.response?.data?.message) {
          setError(axiosError.response.data.message);
        } else if (axiosError.response?.data?.errors) {
          setError(axiosError.response.data.errors.join(", "));
        } else {
          setError("An unexpected error occurred.");
        }
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold">
        {authMode === "login"
          ? "Login"
          : authMode === "register"
          ? "Register"
          : "Verify Email"}
      </h2>

      {authMode === "register" && (
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 border rounded"
          disabled={loading}
        />
      )}

      {(authMode === "login" ||
        authMode === "register" ||
        authMode === "verifyEmail") && (
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded"
          disabled={loading || authMode === "verifyEmail"}
          readOnly={authMode === "verifyEmail"}
        />
      )}

      {(authMode === "login" || authMode === "register") && (
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 border rounded"
          disabled={loading}
        />
      )}

      {authMode === "register" && (
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full p-2 border rounded"
          disabled={loading}
        />
      )}

      {authMode === "verifyEmail" && (
        <input
          type="text"
          placeholder="Verification Code"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          required
          className="w-full p-2 border rounded"
          disabled={loading}
        />
      )}

      <button
        type="submit"
        className="w-full bg-black text-white py-2 px-4 rounded hover:bg-opacity-90"
        disabled={loading}
      >
        {loading
          ? authMode === "login"
            ? "Logging in..."
            : authMode === "register"
            ? "Sending Code..."
            : "Verifying..."
          : authMode === "login"
          ? "Login"
          : authMode === "register"
          ? "Register"
          : "Verify Email"}
      </button>

      <div className="text-sm text-center text-gray-600 mt-2">
        {authMode === "login" ? (
          <>
            Don’t have an account?{" "}
            <button
              type="button"
              className="text-blue-600 hover:underline"
              onClick={() => {
                setAuthMode("register");
                setMessage("");
                setError("");
              }}
              disabled={loading}
            >
              Register
            </button>
          </>
        ) : authMode === "register" ? (
          <>
            Already have an account?{" "}
            <button
              type="button"
              className="text-blue-600 hover:underline"
              onClick={() => {
                setAuthMode("login");
                setMessage("");
                setError("");
              }}
              disabled={loading}
            >
              Login
            </button>
          </>
        ) : (
          <>
            Didn’t receive a code?{" "}
            <button
              type="button"
              className="text-blue-600 hover:underline"
              onClick={async () => {
                setLoading(true);
                setError("");
                setMessage("");
                try {
                  await api.post("/auth/send-code", { email });
                  setMessage("Verification code resent. Please check your email.");
                } catch (e) {
                  setError("Failed to resend code. Please try again later.");
                } finally {
                  setLoading(false);
                }
              }}
              disabled={loading}
            >
              Resend Code
            </button>
          </>
        )}
      </div>

      {message && <p className="text-green-600 text-center">{message}</p>}
      {error && <p className="text-red-600 text-center">{error}</p>}
    </form>
  );
}