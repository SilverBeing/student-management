"use client";
import Button from "@/app/(private)/components/Button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
      callbackUrl: "/students",
    });
    setLoading(false);
    if (res?.error) {
      setError("Invalid username or password");
    } else {
      router.push("/students");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 text-sm font-medium">Username</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border border-[var(--border)] rounded px-3 py-2 focus:outline-none focus:border-[var(--accent)]"
          required
        />
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-[var(--border)] rounded px-3 py-2 focus:outline-none focus:border-[var(--accent)]"
          required
        />
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <Button
        type="submit"
        className="btn-primary w-full mt-2"
        loading={loading}
        disabled={loading}
      >
        Sign In
      </Button>
    </form>
  );
}
