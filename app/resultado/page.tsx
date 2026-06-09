"use client";

import { useEffect, useState } from "react";

interface ExamResult {
  score: number;
  correct: number;
  incorrect: number;
  totalQuestions: number;
  date: string;
  // Opcional: para futura revisión
  answers?: number[];
  questions?: {
    question: string;
    options: string[];
    correctAnswer: number;
  }[];
}

export default function ResultadoPage() {
  const [result, setResult] = useState<ExamResult | null>(null);

  useEffect(() => {
    try {
      const data = localStorage.getItem("exam_result");
      if (data) {
        setResult(JSON.parse(data));
      }
    } catch (error) {
      console.error("Error cargando resultados:", error);
      setResult(null);
    }
  }, []);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
        <div className="text-white/70 text-sm animate-pulse">
          Cargando resultados...
        </div>
      </div>
    );
  }

  const passed = result.score >= 3.0;

  return (
    <main className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">

      {/* Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[400px] h-[400px] bg-blue-500/20 blur-3xl rounded-full" />
        <div className="absolute top-20 -right-40 w-[400px] h-[400px] bg-indigo-500/20 blur-3xl rounded-full" />
      </div>

      {/* Card */}
      <div className="relative w-full max-w-lg">
        <div className="overflow-hidden rounded-[28px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.25)]">

          {/* Header */}
          <div
            className={`h-24 ${
              passed
                ? "bg-gradient-to-r from-emerald-600 to-green-500"
                : "bg-gradient-to-r from-red-600 to-rose-500"
            }`}
          />

          <div className="relative px-6 pb-6">

            {/* Nota */}
            <div className="flex justify-center -mt-14">
              <div
                className={`w-28 h-28 rounded-full bg-white shadow-lg border-[6px]
                flex flex-col items-center justify-center
                ${passed ? "border-emerald-500" : "border-red-500"}`}
              >
                <span className="text-[10px] uppercase tracking-wider text-slate-500">
                  Nota
                </span>
                <span className="text-3xl font-bold text-slate-900">
                  {Number(result.score).toFixed(1)}
                </span>
                <span className="text-xs text-slate-400">
                  / 5.0
                </span>
              </div>
            </div>

            {/* Título */}
            <div className="text-center mt-5">
              <h1 className="text-2xl font-bold text-slate-900">
                Resultado de Evaluación
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Colegio Naval Crespo
              </p>
              <div
                className={`inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full text-xs font-semibold
                ${passed ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}
              >
                <span className="w-2 h-2 rounded-full bg-current" />
                {passed ? "APROBADO" : "NO APROBADO"}
              </div>
            </div>

            {/* Estadísticas */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 text-center">
                <div className="text-lg">✅</div>
                <p className="text-[11px] text-slate-500 mt-1">Correctas</p>
                <p className="text-2xl font-bold text-emerald-600">{result.correct}</p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 text-center">
                <div className="text-lg">❌</div>
                <p className="text-[11px] text-slate-500 mt-1">Incorrectas</p>
                <p className="text-2xl font-bold text-red-600">{result.incorrect}</p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 text-center">
                <div className="text-lg">📚</div>
                <p className="text-[11px] text-slate-500 mt-1">Total</p>
                <p className="text-2xl font-bold text-slate-800">{result.totalQuestions}</p>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-slate-200 flex justify-between items-center">
              <div>
                <p className="text-[11px] text-slate-400">Fecha</p>
                <p className="text-sm font-medium text-slate-700">{result.date}</p>
              </div>
              <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Finalizado
              </div>
            </div>

          </div>
        </div>
      </div>

    </main>
  );
}