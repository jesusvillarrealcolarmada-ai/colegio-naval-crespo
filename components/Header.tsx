interface HeaderProps {
  studentName?: string;
  course?: string;
  violations?: number;
}

export default function Header({
  studentName,
  course,
  violations = 0,
}: HeaderProps) {
  return (
    <header className="bg-slate-900 text-white shadow-lg">

      <div className="max-w-7xl mx-auto px-6 py-4">

        <div className="flex flex-col md:flex-row md:justify-between md:items-center">

          <div>
            <h1 className="text-3xl font-bold">
              Colegio Naval Crespo
            </h1>

            <p className="text-slate-300">
              Tecnología e Informática
            </p>

            <p className="text-slate-400 text-sm">
              Ing. Jesús Villarreal Cuello
            </p>
          </div>

          <div className="mt-4 md:mt-0 text-right">

            <p className="font-semibold">
              {studentName}
            </p>

            <p className="text-slate-300">
              {course}
            </p>

            <div className="mt-2">

              <span className="bg-red-600 px-3 py-1 rounded-full text-sm">

                Infracciones: {violations}/2

              </span>

            </div>

          </div>

        </div>

      </div>

    </header>
  );
}