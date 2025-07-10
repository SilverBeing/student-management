export interface Student {  id: string;
  name: string;
  registrationNumber: string;
  major: string;
  dob: string;
  gpa: number;
}

// Use global variable that persists across requests
declare global {
  var studentsData: Student[];
}

// Initialize global data if it doesn't exist
if (!global.studentsData) {
  global.studentsData = [];
}

export async function getStudents(): Promise<Student[]> {
  return global.studentsData;
}

export async function saveStudents(newStudents: Student[]): Promise<void> {
  global.studentsData = newStudents;
}

export async function getStudentById(id: string): Promise<Student | undefined> {
  return global.studentsData.find((s) => s.id === id);
}

export async function addStudent(student: Student): Promise<void> {
  global.studentsData.push(student);
}

export async function updateStudent(
  id: string,
  data: Partial<Student>
): Promise<Student | undefined> {
  const index = global.studentsData.findIndex((s) => s.id === id);
  if (index === -1) return undefined;

  global.studentsData[index] = { ...global.studentsData[index], ...data };
  return global.studentsData[index];
}

export async function deleteStudent(id: string): Promise<Student | undefined> {
  const index = global.studentsData.findIndex((s) => s.id === id);
  if (index === -1) return undefined;

  const [removed] = global.studentsData.splice(index, 1);
  return removed;
}
