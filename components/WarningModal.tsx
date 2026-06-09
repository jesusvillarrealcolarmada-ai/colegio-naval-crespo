interface WarningModalProps {
  reason: string;
  attempt?: number;
  maxAttempts?: number;
  onClose?: () => void;
}

export default function WarningModal({
  reason,
  attempt = 1,
  maxAttempts = 2,
  onClose,
}: WarningModalProps) {

  const remaining = maxAttempts - attempt;
  const isLastWarning = remaining <= 0;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">

      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 animate-fadeIn">

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-4">

          <div className={`w-11 h-11 rounded-full flex items-center justify-center text-xl ${
            isLastWarning ? "bg-red-100" : "bg-yellow-100"
          }`}>
            {isLastWarning ? "⛔" : "⚠️"}
          </div>

          <div>
            <h2 className={`text-lg font-bold ${
              isLastWarning ? "text-red-600" : "text-yellow-600"
            }`}>
              {isLastWarning ? "Examen en riesgo" : "Advertencia de seguridad"}
            </h2>

            <p className="text-xs text-slate-500">
              Sistema de supervisión automática
            </p>
          </div>

        </div>

        {/* MOTIVO */}
        <div className="text-slate-700 text-sm leading-relaxed">
          {reason}
        </div>

        {/* BLOQUE INTENTOS */}
        <div className="mt-4 bg-slate-50 border rounded-xl p-4 text-sm">

          <p className="font-semibold text-slate-700">
            Control de integridad del examen
          </p>

          <p className="text-slate-600 mt-1">
            Intento detectado: <b>{attempt}</b> / {maxAttempts}
          </p>

          <p className={`mt-2 font-bold ${
            isLastWarning ? "text-red-600" : "text-yellow-600"
          }`}>
            {isLastWarning
              ? "Se ha alcanzado el límite. El examen será finalizado automáticamente."
              : `Te queda ${remaining} intento antes de la finalización del examen`}
          </p>

        </div>

        {/* ACCIÓN */}
        <div className="mt-6 flex justify-end">

          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-lg text-white font-medium transition ${
              isLastWarning
                ? "bg-red-600 hover:bg-red-700"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Entendido
          </button>

        </div>

      </div>

    </div>
  );
}