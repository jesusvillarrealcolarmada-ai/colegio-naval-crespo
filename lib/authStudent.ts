import { studentsAllowed } from "@/data/studentsAllowed";

export function normalize(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");
}

export function isStudentAllowed(nombre: string) {
  const cleanInput = normalize(nombre);

  return studentsAllowed.some(
    (student) => normalize(student) === cleanInput
  );
}