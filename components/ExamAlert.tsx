"use client";

interface Props {
  open: boolean;
  title: string;
  message: string;
  type?: "warning" | "error" | "success";
  onClose: () => void;
}

export default function ExamAlert({
  open,
  title,
  message,
  type = "warning",
  onClose,
}: Props) {

  if (!open) return null;

  const config = {
    warning: {
      box: "border-yellow-400 bg-yellow-50 text-yellow-900",
      icon: "⚠️",
      accent: "text-yellow-700",
      footer: "Este comportamiento queda registrado en el sistema de supervisión.",
    },
    error: {
      box: "border-red-500 bg-red-50 text-red-900",
      icon: "⛔",
      accent: "text-red-700",
      footer: "El sistema puede finalizar el examen si se repite esta acción.",
    },
    success: {
      box: "border-green-500 bg-green-50 text-green-900",
      icon: "✅",
      accent: "text-green-700",
      footer: "Acción registrada correctamente.",
    },
  };

  const c = config[type];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">

      <div className={`w-full max-w-md rounded-2xl p-6 shadow-2xl border ${c.box}`}>

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-3">

          <div className="text-2xl">
            {c.icon}
          </div>

          <h2 className="text-lg font-bold">
            {title}
          </h2>

        </div>

        {/* MENSAJE */}
        <p className="text-sm leading-relaxed whitespace-pre-line">
          {message}
        </p>

        {/* FOOTER INFO */}
        <div className={`mt-4 text-xs ${c.accent}`}>
          {c.footer}
        </div>

        {/* BOTÓN */}
        <button
          onClick={onClose}
          className="mt-5 w-full bg-slate-900 text-white py-2 rounded-lg hover:bg-slate-800 transition"
        >
          Entendido
        </button>

      </div>

    </div>
  );
}