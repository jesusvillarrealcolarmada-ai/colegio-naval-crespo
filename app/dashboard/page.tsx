"use client";

import { useEffect, useMemo, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

interface ExamResult {
  id: string;
  student: {
    nombre: string;
    curso: string;
    identificacion: string;
  };
  score: number;
  correct: number;
  incorrect: number;
  totalQuestions: number;
  date: string;
}

function getNivel(score: number) {
  if (score >= 4.6) return "SUPERIOR";
  if (score >= 3.9) return "ALTO";
  if (score >= 3.6) return "BÁSICO";
  return "BAJO";
}

function getNivelStyle(nivel: string) {
  switch (nivel) {
    case "SUPERIOR":
      return "bg-purple-500/10 text-purple-300 border-purple-500/30";
    case "ALTO":
      return "bg-blue-500/10 text-blue-300 border-blue-500/30";
    case "BÁSICO":
      return "bg-yellow-500/10 text-yellow-300 border-yellow-500/30";
    default:
      return "bg-red-500/10 text-red-300 border-red-500/30";
  }
}

export default function DashboardPage() {
  const [results, setResults] = useState<ExamResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const q = query(
        collection(db, "exam_results"),
        orderBy("date", "desc")
      );

      const snap = await getDocs(q);

      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<ExamResult, "id">),
      }));

      setResults(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const stats = useMemo(() => {
    const total = results.length;
    const avg =
      total > 0
        ? (results.reduce((a, b) => a + b.score, 0) / total).toFixed(1)
        : "0.0";

    return { total, avg };
  }, [results]);

  const filtered = results.filter((r) =>
    r.student.nombre.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 to-slate-900 text-white">
        Cargando sistema académico...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">

      {/* HEADER */}
      <div className="border-b border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold tracking-tight">
            🏫 Dashboard Escolar
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Colegio Naval Crespo · Sistema de evaluación académica
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">

        {/* CARDS */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">

          <Card title="Estudiantes evaluados" value={stats.total} />
          <Card title="Promedio general" value={stats.avg} highlight />
          <Card title="Estado del sistema" value="ACTIVO" green />

        </div>

        {/* SEARCH */}
        <div className="mb-6">
          <input
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-blue-400 transition"
            placeholder="Buscar estudiante por nombre..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* TABLE */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">

          <table className="w-full text-sm">

            <thead className="text-slate-300 bg-white/5">
              <tr>
                <th className="p-4 text-left">Estudiante</th>
                <th className="p-4">Curso</th>
                <th className="p-4">Nota</th>
                <th className="p-4">Nivel</th>
                <th className="p-4">Fecha</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((r) => {
                const nivel = getNivel(r.score);

                return (
                  <tr
                    key={r.id}
                    className="border-t border-white/10 hover:bg-white/5 transition"
                  >
                    <td className="p-4 font-medium">
                      {r.student.nombre}
                    </td>

                    <td className="p-4 text-center text-slate-300">
                      {r.student.curso}
                    </td>

                    <td className="p-4 text-center font-bold">
                      <span
                        className={
                          r.score >= 3
                            ? "text-emerald-400"
                            : "text-red-400"
                        }
                      >
                        {r.score.toFixed(1)}
                      </span>
                    </td>

                    <td className="p-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs border ${getNivelStyle(
                          nivel
                        )}`}
                      >
                        {nivel}
                      </span>
                    </td>

                    <td className="p-4 text-center text-xs text-slate-400">
                      {r.date}
                    </td>
                  </tr>
                );
              })}
            </tbody>

          </table>

        </div>

      </div>
    </main>
  );
}

/* COMPONENTES */

function Card({
  title,
  value,
  highlight,
  green,
}: any) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
      <p className="text-slate-400 text-sm">{title}</p>
      <h2
        className={`text-2xl font-bold mt-2 ${
          highlight
            ? "text-blue-400"
            : green
            ? "text-emerald-400"
            : "text-white"
        }`}
      >
        {value}
      </h2>
    </div>
  );
}