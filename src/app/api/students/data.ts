export interface Student {
  id: string;
  name: string;
  registrationNumber: string;
  major: string;
  dob: string;
  gpa: number;
}

declare global {
  var studentsData: Student[];
}

if (!global.studentsData) {
  global.studentsData = [];
}

export const generateId = (): string => {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2, 9);
  return `${timestamp}-${random}`;
};

export const getStudents = (): Student[] => {
  const sortedStudents = [...global.studentsData].sort((a, b) => {
    let timestampA: number;
    let timestampB: number;

    if (a.id.includes("-")) {
      timestampA = parseInt(a.id.split("-")[0]);
    } else {
      timestampA = 0;
    }

    if (b.id.includes("-")) {
      timestampB = parseInt(b.id.split("-")[0]);
    } else {
      timestampB = 0;
    }

    return timestampB - timestampA;
  });

  return sortedStudents;
};

export const getStudentById = (id: string): Student | undefined => {
  return global.studentsData.find((s) => s.id === id);
};

export const createStudent = (student: Omit<Student, "id">): Student => {
  const newStudent = { ...student, id: generateId() };
  global.studentsData.push(newStudent);
  return newStudent;
};

export const updateStudent = (
  id: string,
  updatedStudent: Partial<Student>
): Student | undefined => {
  const index = global.studentsData.findIndex((s) => s.id === id);
  if (index !== -1) {
    global.studentsData[index] = {
      ...global.studentsData[index],
      ...updatedStudent,
    };
    return global.studentsData[index];
  }
  return undefined;
};

export const deleteStudent = (id: string): Student | undefined => {
  const index = global.studentsData.findIndex((s) => s.id === id);
  if (index !== -1) {
    const [removed] = global.studentsData.splice(index, 1);
    return removed;
  }
  return undefined;
};
