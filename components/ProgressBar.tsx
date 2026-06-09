interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({
  current,
  total,
}: ProgressBarProps) {

  const progress =
    (current / total) * 100;

  return (

    <div className="w-full">

      <div className="flex justify-between mb-2">

        <span className="font-medium">

          Pregunta {current} de {total}

        </span>

        <span>

          {Math.round(progress)}%

        </span>

      </div>

      <div className="w-full bg-slate-200 rounded-full h-3">

        <div
          className="bg-blue-600 h-3 rounded-full transition-all duration-500"
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

    </div>

  );
}