"use client";

import { useState } from "react";

import { loginAPI } from "../../actions/get-auth/get-login";

const LoginPage = () => {
  const [form, setForm] = useState({ id: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (await loginAPI(form)) {
        console.log("로그인 성공:", form.id);
      } else {
        throw new Error("아이디와 비밀번호를 확인하세요.");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "로그인 오류가 발생했습니다.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 p-6">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg transition-transform duration-300 hover:scale-105">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          🚀 Y-Edu Admin
        </h1>
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="relative">
            <input
              type="text"
              name="id"
              value={form.id}
              onChange={handleChange}
              placeholder="아이디 입력"
              className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-3 text-gray-900 transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="비밀번호 입력"
              className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-3 text-gray-900 transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              autoComplete="off"
            />
          </div>
          {error && (
            <p className="animate-fade-in text-center text-sm text-red-500 transition-opacity duration-300">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-lg py-3 font-bold text-white shadow-md transition-all duration-300 ${
              loading
                ? "cursor-not-allowed bg-gray-400"
                : "bg-blue-600 hover:scale-105 hover:bg-blue-700 active:scale-95"
            }`}
          >
            {loading ? "로그인 중..." : "로그인"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
