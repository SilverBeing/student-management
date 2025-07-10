"use client";
import LoginForm from "./LoginForm";
export default function LoginPage() {
  return (
    <div className="h-screen bg-[var(--secondary-background)] flex w-full items-center  justify-center p-8">
      <div className="w-full">
        <div className="flex w-max mx-auto mb-4 items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-[#ffd166]" />
          <span className="w-3 h-3 relative left-[-10px] rounded-full bg-[#6dd47e]" />
          <span className="w-3 h-3 relative left-[-20px] rounded-full bg-[#4f8cff]" />
          <span className="w-3 h-3 relative left-[-30px] rounded-full bg-[#ff6b6b]" />
        </div>
        <div className="w-full max-w-sm mx-auto bg-white rounded-xl shadow p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
