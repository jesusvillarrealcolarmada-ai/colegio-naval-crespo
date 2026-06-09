"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import QuestionCard from "@/components/QuestionCard";
import ProgressBar from "@/components/ProgressBar";
import ExamTimer from "@/components/ExamTimer";
import SecurityGuard from "@/components/SecurityGuard";

import { db } from "@/lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

import { windowsQuestions } from "@/data/windowsQuestions";
import { shuffleArray } from "@/lib/shuffle";

import { Question } from "@/types/question";

interface StudentData {
  nombre: string;
  curso: string;
  identificacion: string;
}

export default function ExamenPage() {
  const router = useRouter();

  const [student, setStudent] = useState<StudentData | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = localStorage.getItem("student");

    if (!data) {
      router.push("/");
      return;
    }

    try {
      setStudent(JSON.parse(data));
    } catch {
      router.push("/");
      return;
    }

    const shuffled = shuffleArray(windowsQuestions).slice(0, 10);
    setQuestions(shuffled);

    setLoading(false);
  }, [router]);

  const saveAnswer = (index: number) => {
    const copy = [...answers];
    copy[currentQuestion] = index;
    setAnswers(copy);
  };

  const nextQuestion = () => {
    if (answers[currentQuestion] === undefined) {
      alert("Debes responder antes de continuar");
      return;
    }

    setCurrentQuestion((prev) => prev + 1);
  };

  const finishExam = async () => {
    if (!student || questions.length === 0) return;

    let correct = 0;

    questions.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) {
        correct++;
      }
    });

    const total = questions.length;
   const score = Number(((correct / total) * 4 + 1).toFixed(1));

    const result = {
      student: {
        nombre: student.nombre || "",
        curso: student.curso || "",
        identificacion: student.identificacion || "",
      },
      answers,
      correct,
      incorrect: total - correct,
      score,
      date: new Date().toLocaleString(),
      createdAt: serverTimestamp(),
    };

    try {
      const id =
        student.identificacion ||
        crypto.randomUUID();

      console.log("📤 Guardando en Firebase...");

      await setDoc(doc(db, "exam_results", id), result);

      console.log("✅ Guardado correcto");

      localStorage.setItem("exam_result", JSON.stringify(result));

      router.push("/resultado");
    } catch (err) {
      console.error("❌ Firebase error:", err);
      alert("Error guardando resultados");
    }
  };

  // 🔥 PROTECCIÓN ANTI CRASH
  if (loading || !student || questions.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-100">
        <h2>Cargando examen...</h2>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  if (!currentQ) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h2>Error cargando pregunta</h2>
      </div>
    );
  }

  return (
    <main className="h-screen bg-slate-100 overflow-hidden">

      <SecurityGuard onFinish={finishExam} />

      <div className="h-full flex flex-col">

        {/* HEADER */}
        <header className="bg-blue-900 text-white px-8 py-4">
          <div className="flex justify-between">
            <div>
              <h1>Colegio Naval Crespo</h1>
              <p>Tecnología e Informática</p>
            </div>

            <div>
              <p>{student.nombre}</p>
              <p>{student.curso}</p>
            </div>
          </div>
        </header>

        {/* CONTENIDO */}
        <div className="flex-1 flex items-center justify-center p-4">

          <div className="w-full max-w-4xl bg-white p-6 rounded-xl">

            <div className="flex justify-between mb-4">
              <h2>Pregunta {currentQuestion + 1}</h2>

              <ExamTimer duration={1200} onFinish={finishExam} />
            </div>

            <ProgressBar
              current={currentQuestion + 1}
              total={questions.length}
            />

            <QuestionCard
              question={currentQ}
              selectedAnswer={answers[currentQuestion]}
              onAnswer={saveAnswer}
            />

            <div className="flex justify-end mt-6">
              {currentQuestion === questions.length - 1 ? (
                <button
                  onClick={finishExam}
                  className="bg-green-600 text-white px-6 py-2 rounded"
                >
                  Finalizar
                </button>
              ) : (
                <button
                  onClick={nextQuestion}
                  className="bg-blue-600 text-white px-6 py-2 rounded"
                >
                  Siguiente
                </button>
              )}
            </div>

          </div>

        </div>
      </div>

    </main>
  );
}