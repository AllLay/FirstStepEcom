'use client';

import AuthForm from "@/components/AuthForm";

export default function AuthPage() {
  return (
    <main
      className="relative min-h-screen w-full bg-cover bg-center"
      style={{
        backgroundImage: 'url("/img/background/SignIn-BG.png")',
      }}
    >
      <div className="absolute top-30 left-1/2 -translate-x-1/2 backdrop-blur-md bg-white/20 border border-white/30 rounded-2xl shadow-lg p-16 max-w-md w-full">
        <AuthForm />
      </div>
    </main>
  );
}