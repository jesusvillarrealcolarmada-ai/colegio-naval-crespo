interface FinishModalProps {
  score: number;
}

export default function FinishModal({
  score,
}: FinishModalProps) {

  return (

    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">

      <div className="bg-white rounded-2xl p-10 shadow-xl text-center">

        <h2 className="text-3xl font-bold text-green-600">

          Examen Finalizado

        </h2>

        <p className="mt-4">

          Calificación obtenida

        </p>

        <p className="text-5xl font-bold mt-4">

          {score}
        </p>

      </div>

    </div>

  );
}