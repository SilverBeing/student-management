export interface Student {
  id: string;
  name: string;
  registrationNumber: string;
  major: string;
  dob: string;
  gpa: number;
}

// Simple in-memory database using Map
declare global {
  var studentsMap: Map<string, Student> | undefined;
}

// Initialize the in-memory database
function getStudentsMap(): Map<string, Student> {
  if (!global.studentsMap) {
    global.studentsMap = new Map();
  }
  return global.studentsMap;
}

// Convert Map to array for API responses
function mapToArray(): Student[] {
  return Array.from(getStudentsMap().values());
}

// Convert array to Map for storage
function arrayToMap(students: Student[]): Map<string, Student> {
  const map = new Map();
  students.forEach((student) => map.set(student.id, student));
  return map;
}

export async function getStudents(): Promise<Student[]> {
  try {
    return mapToArray();
  } catch (error) {
    console.error("Error reading students data:", error);
    return [];
  }
}

export async function saveStudents(students: Student[]): Promise<void> {
  try {
    global.studentsMap = arrayToMap(students);
  } catch (error) {
    console.error("Error saving students data:", error);
    throw new Error("Failed to save students data");
  }
}

export async function getStudentById(id: string): Promise<Student | undefined> {
  return getStudentsMap().get(id);
}

export async function addStudent(student: Student): Promise<void> {
  getStudentsMap().set(student.id, student);
}

export async function updateStudent(
  id: string,
  data: Partial<Student>
): Promise<Student | undefined> {
  const existingStudent = getStudentsMap().get(id);
  if (!existingStudent) return undefined;

  const updatedStudent = { ...existingStudent, ...data };
  getStudentsMap().set(id, updatedStudent);
  return updatedStudent;
}

export async function deleteStudent(id: string): Promise<Student | undefined> {
  const student = getStudentsMap().get(id);
  if (student) {
    getStudentsMap().delete(id);
  }
  return student;
}
