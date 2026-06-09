"use client";

import { useState, useRef } from "react";
import { useExamSecurity } from "@/hooks/useExamSecurity";
import ExamAlert from "@/components/ExamAlert";

interface FraudLog {
  reason: string;
  date: string;
  attempt: number;
}

interface Props {
  onFinish: () => void;
}

export default function SecurityGuard({ onFinish }: Props) {
  const MAX_VIOLATIONS = 2;

  const [violations, setViolations] = useState(0);
  const violationsRef = useRef(0);
  const lastTrigger = useRef(0);

  // ALERT STATE
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertData, setAlertData] = useState({
    title: "",
    message: "",
    type: "warning" as "warning" | "error" | "success",
  });

  const showAlert = (
    title: string,
    message: string,
    type: "warning" | "error" | "success" = "warning"
  ) => {
    setAlertData({ title, message, type });
    setAlertOpen(true);
  };

  const registerFraud = (reason: string) => {
    const now = Date.now();

    // anti spam (mejor UX)
    if (now - lastTrigger.current < 2500) return;
    lastTrigger.current = now;

    const newCount = violationsRef.current + 1;
    violationsRef.current = newCount;
    setViolations(newCount);

    // LOGS
    const storedLogs = localStorage.getItem("fraud_logs");

    const fraudLogs: FraudLog[] = storedLogs ? JSON.parse(storedLogs) : [];

    fraudLogs.push({
      reason,
      date: new Date().toLocaleString(),
      attempt: newCount,
    });

    localStorage.setItem("fraud_logs", JSON.stringify(fraudLogs));

    // 🔴 BLOQUEO FINAL
    if (newCount > MAX_VIOLATIONS) {
      showAlert(
        "Examen finalizado",
        "Se ha alcanzado el límite máximo de intentos permitidos. El sistema ha bloqueado el acceso automáticamente.",
        "error"
      );

      setTimeout(() => {
        onFinish();
      }, 1800);

      return;
    }

    // ⚠️ ADVERTENCIA PROGRESIVA
    showAlert(
      "Control de integridad del examen",
      `Se ha detectado una acción no permitida: ${reason}

Intento ${newCount} de ${MAX_VIOLATIONS}.

Si se repite esta acción, el sistema finalizará el examen automáticamente.`,
      "warning"
    );
  };

  useExamSecurity(registerFraud);

  return (
    <>
      {/* ALERT SYSTEM */}
      <ExamAlert
        open={alertOpen}
        title={alertData.title}
        message={alertData.message}
        type={alertData.type}
        onClose={() => setAlertOpen(false)}
      />

      {/* INDICADOR SILENCIOSO (UI PRO) */}
      {violations > 0 && (
        <div className="fixed bottom-4 right-4 bg-slate-900 text-white text-xs px-3 py-2 rounded-lg shadow-lg opacity-80">
          Intentos de seguridad: {violations}/{MAX_VIOLATIONS}
        </div>
      )}
    </>
  );
}