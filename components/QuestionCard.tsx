import { Question } from "@/types/question";

interface QuestionCardProps {
  question: Question;
  selectedAnswer?: number | null;
  onAnswer: (answerIndex: number) => void;
}

export default function QuestionCard({
  question,
  selectedAnswer,
  onAnswer,
}: QuestionCardProps) {
  return (
    <div className="w-full max-w-3xl mx-auto">

      {/* PREGUNTA */}
      <div className="mb-4">
        <h2 className="text-sm md:text-lg font-semibold text-slate-800 leading-snug">
          {question.question}
        </h2>
      </div>

      {/* OPCIONES */}
      <div className="space-y-2">

        {question.options.map((option, index) => {
          const active = selectedAnswer === index;

          return (
            <div
              key={index}
              onClick={() => onAnswer(index)}
              className={`
                flex items-center gap-3 px-3 py-2 rounded-lg border cursor-pointer text-sm
                select-none transition-all
                ${
                  active
                    ? "border-blue-600 bg-blue-50 shadow-sm scale-[1.01]"
                    : "border-slate-200 hover:bg-slate-50"
                }
              `}
            >

              <input
                type="radio"
                checked={active}
                readOnly
                className="accent-blue-600"
              />

              <span className="leading-snug">
                {option}
              </span>

            </div>
          );
        })}

      </div>

    </div>
  );
}