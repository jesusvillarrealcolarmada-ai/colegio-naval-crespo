export const saveStudent = (data: unknown) => {
  localStorage.setItem("student", JSON.stringify(data));
};

export const getStudent = () => {
  const data = localStorage.getItem("student");
  return data ? JSON.parse(data) : null;
};

// 🔒 CONTROL DE INTENTO ÚNICO
export const hasTakenExam = (name: string) => {
  return localStorage.getItem(`exam_done_${name}`) === "true";
};

export const markExamDone = (name: string) => {
  localStorage.setItem(`exam_done_${name}`, "true");
};