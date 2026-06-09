import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">

      {/* Fondo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[400px] h-[400px] bg-blue-500/20 blur-3xl rounded-full" />
        <div className="absolute top-20 -right-40 w-[400px] h-[400px] bg-indigo-500/20 blur-3xl rounded-full" />
        <div className="absolute bottom-0 left-1/2 w-[500px] h-[500px] bg-cyan-500/10 blur-3xl rounded-full -translate-x-1/2" />
      </div>

      {/* Card */}
      <div className="relative w-full max-w-sm px-4">

        <div className="overflow-hidden rounded-[28px] bg-white shadow-[0_25px_70px_rgba(0,0,0,0.30)]">

          {/* Barra Superior */}
          <div className="h-1.5 bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-500" />

          <div className="p-6">

            {/* Logo */}
            <div className="flex justify-center mb-5">

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 shadow-md">

                <Image
                  src="./colegio-naval.png"
                  alt="Colegio Naval Crespo"
                  width={90}
                  height={90}
                  className="object-contain"
                  priority
                />

              </div>

            </div>

            {/* Encabezado */}
            <div className="text-center">

              <h1 className="text-2xl font-bold text-slate-900">
                Colegio Naval Crespo
              </h1>

              <div className="w-20 h-1 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto mt-3" />

              <p className="text-slate-600 text-sm font-medium mt-3">
                Examen de Tecnología e Informática
              </p>

            </div>

            {/* Información */}
            <div className="mt-5 space-y-3">

              
              <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-xl p-3 text-center">

                <p className="text-[10px] tracking-widest uppercase text-blue-600 font-semibold">
                  Docente
                </p>

                <p className="font-bold text-slate-900 mt-1">
                  Ing. Jesús Villarreal Cuello
                </p>

              </div>

            </div>

            {/* Botón */}
            <Link
              href="/registro"
              className="
                mt-6
                flex
                items-center
                justify-center
                gap-2
                w-full
                py-3
                rounded-xl
                bg-gradient-to-r
                from-blue-700
                via-indigo-600
                to-cyan-600
                text-white
                font-semibold
                shadow-lg
                hover:shadow-xl
                hover:scale-[1.02]
                transition-all
                duration-300
              "
            >
              Iniciar Examen →
            </Link>

            {/* Pie */}
            <p className="text-center text-xs text-slate-500 mt-5">
              Año Lectivo 2026
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}