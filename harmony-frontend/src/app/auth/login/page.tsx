"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await login(username, password);
      router.push("/c/harmony-hq/general");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-discord-primary">
      <div className="w-full max-w-md rounded-lg bg-discord-secondary p-8 shadow-lg">
        <h1 className="mb-2 text-center text-2xl font-bold text-white">
          Welcome back!
        </h1>
        <p className="mb-6 text-center text-sm text-discord-muted">
          We&apos;re so excited to see you again!
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-xs font-bold uppercase text-discord-muted"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded bg-discord-tertiary p-2.5 text-white placeholder-discord-muted outline-none focus:ring-2 focus:ring-discord-accent"
              placeholder="Enter your username"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-xs font-bold uppercase text-discord-muted"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded bg-discord-tertiary p-2.5 text-white placeholder-discord-muted outline-none focus:ring-2 focus:ring-discord-accent"
              placeholder="Enter your password"
              disabled={isSubmitting}
            />
          </div>

          {error && (
            <p className="text-sm text-red-400" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded bg-discord-accent py-2.5 font-medium text-white transition-colors hover:bg-discord-accent/80 disabled:opacity-50"
          >
            {isSubmitting ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
}
