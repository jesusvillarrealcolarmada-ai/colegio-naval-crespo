interface StudentInfoProps {
  name: string;
  course: string;
}

export default function StudentInfo({
  name,
  course,
}: StudentInfoProps) {

  return (

    <div className="bg-white rounded-xl shadow p-4">

      <h3 className="font-bold mb-2">

        Información del estudiante

      </h3>

      <p>
        Nombre:
        {" "}
        {name}
      </p>

      <p>
        Curso:
        {" "}
        {course}
      </p>

    </div>

  );
}