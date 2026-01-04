"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Container from "@/components/Container";
import { login } from "@/actions/auth";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(false);

    const result = await login(formData);

    if (result.success) {
      router.push("/dashboard");
      router.refresh();
    } else {
      setError(true);
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Container>
        <div className="flex flex-col items-center gap-3">
          <p className="text-3xl">A3AP</p>

          <form action={handleSubmit} className="flex flex-col w-64">
            <label className="text-sm text-neutral-400" htmlFor="passwd">
              Password:
            </label>

            <input
              id="passwd"
              name="password"
              type="password"
              onChange={() => setError(false)}
              className={`px-2 py-1 border-2 bg-transparent rounded-md outline-none transition-colors ${
                error
                  ? "border-red-500"
                  : "border-white/20 focus:border-white/50"
              }`}
            />

            {error && (
              <span className="text-red-500 text-xs mt-1">
                Incorrect password
              </span>
            )}

            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-white/20 px-2 py-1 mt-3 hover:bg-white/30 transition-all cursor-pointer disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Log in"}
            </button>
          </form>
        </div>
      </Container>
    </div>
  );
}
