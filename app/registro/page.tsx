"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { isStudentAllowed } from "@/lib/authStudent";

export default function RegistroPage() {
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [curso, setCurso] = useState("");
  const [accepted, setAccepted] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    setError(null);

    if (!nombre.trim() || !curso.trim()) {
      setError("Debe completar todos los campos.");
      return;
    }

    if (!accepted) {
      setError("Debe aceptar la declaración antes de continuar.");
      return;
    }

    // 🔒 validación contra lista autorizada
    const allowed = isStudentAllowed(nombre);

    if (!allowed) {
      setError("Acceso denegado. No estás registrado para este examen.");
      return;
    }

    localStorage.setItem(
      "student",
      JSON.stringify({
        nombre: nombre.trim(),
        curso,
        fechaRegistro: new Date().toISOString(),
      })
    );

    router.push("/examen");
  };

  return (
    <main className="h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-950 flex items-center justify-center p-4">

      <div className="w-full max-w-5xl">

        <div className="grid md:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-2xl">

          {/* PANEL IZQUIERDO */}
          <div className="bg-blue-900 text-white p-7 flex flex-col justify-center">

            <h1 className="text-3xl font-bold">
              Colegio Naval Crespo
            </h1>

            <div className="w-20 h-1 bg-yellow-400 my-4" />

            <p className="text-blue-100 text-sm">
              Sistema de Evaluación Segura
            </p>

            <p className="text-blue-100 text-sm mt-1">
              Tecnología e Informática
            </p>

            <p className="text-blue-100 text-sm">
              Grado 6°
            </p>

            <div className="mt-6 bg-blue-800 rounded-2xl p-4 text-sm">
              <h3 className="font-bold mb-2">Normas del examen</h3>
              <ul className="space-y-1 text-blue-100">
                <li>• Un solo intento</li>
                <li>• 10 preguntas aleatorias</li>
                <li>• No retroceso de preguntas</li>
                <li>• 2 infracciones máximo</li>
              </ul>
            </div>

            <p className="mt-6 text-xs text-blue-200">
              Ing. Jesús Villarreal Cuello
            </p>

          </div>

          {/* PANEL DERECHO */}
          <div className="p-6 md:p-8 flex flex-col justify-center">

            <h2 className="text-2xl font-bold mb-6 text-slate-800">
              Registro del Estudiante
            </h2>

            {/* ERROR */}
            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">

              {/* NOMBRE */}
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre completo"
                className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-400"
              />

              {/* CURSO */}
              <select
                value={curso}
                onChange={(e) => setCurso(e.target.value)}
                className="w-full border p-3 rounded-xl"
              >
                <option value="">Seleccione curso</option>
                <option value="6°">6°</option>
              </select>

              {/* CHECK */}
              <label className="flex gap-2 text-sm bg-yellow-50 p-3 rounded-xl border">
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={() => setAccepted(!accepted)}
                />
                Declaro que realizaré el examen sin ayuda externa
              </label>

              {/* BOTÓN */}
              <button
                onClick={handleSubmit}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-xl transition"
              >
                Ingresar al Examen
              </button>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}