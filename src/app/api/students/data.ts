import { promises as fs } from "fs";import path from "path";

export interface Student {
  id: string;
  name: string;
  registrationNumber: string;
  major: string;
  dob: string;
  gpa: number;
}

declare global {
  var studentsData: Student[] | undefined;
}

const dataFile = path.join(process.cwd(), "src/app/api/students/students.json");

async function ensureDataFile(): Promise<void> {
  try {
    await fs.access(dataFile);
  } catch {
    const initialData: Student[] = [];
    await fs.writeFile(dataFile, JSON.stringify(initialData, null, 2), "utf-8");
  }
}

async function getStudentsData(): Promise<Student[]> {
  if (process.env.NODE_ENV === "production") {
    if (global.studentsData) {
      return global.studentsData;
    }

    try {
      const data = await fs.readFile(dataFile, "utf-8");
      const students = JSON.parse(data);
      global.studentsData = students;
      return students;
    } catch {
      console.log(
        "Could not read from file in production, starting with empty data"
      );
      global.studentsData = [];
      return [];
    }
  } else {
    await ensureDataFile();
    const data = await fs.readFile(dataFile, "utf-8");
    return JSON.parse(data);
  }
}

async function saveStudentsData(students: Student[]): Promise<void> {
  if (process.env.NODE_ENV === "production") {
    global.studentsData = students;

    try {
      await fs.writeFile(dataFile, JSON.stringify(students, null, 2), "utf-8");
    } catch {
      console.log(
        "Could not write to file in production, data stored in memory only"
      );
    }
  } else {
    await ensureDataFile();
    await fs.writeFile(dataFile, JSON.stringify(students, null, 2), "utf-8");
  }
}

export async function getStudents(): Promise<Student[]> {
  try {
    return await getStudentsData();
  } catch (error) {
    console.error("Error reading students data:", error);
    return [];
  }
}

export async function saveStudents(students: Student[]): Promise<void> {
  try {
    await saveStudentsData(students);
  } catch (error) {
    console.error("Error saving students data:", error);
    if (process.env.NODE_ENV === "development") {
      throw new Error("Failed to save students data");
    }
  }
}

export async function getStudentById(id: string): Promise<Student | undefined> {
  const students = await getStudents();
  return students.find((s) => s.id === id);
}

export async function addStudent(student: Student): Promise<void> {
  const students = await getStudents();
  students.push(student);
  await saveStudents(students);
}

export async function updateStudent(
  id: string,
  data: Partial<Student>
): Promise<Student | undefined> {
  const students = await getStudents();
  const idx = students.findIndex((s) => s.id === id);
  if (idx === -1) return undefined;
  students[idx] = { ...students[idx], ...data };
  await saveStudents(students);
  return students[idx];
}

export async function deleteStudent(id: string): Promise<Student | undefined> {
  const students = await getStudents();
  const idx = students.findIndex((s) => s.id === id);
  if (idx === -1) return undefined;
  const [removed] = students.splice(idx, 1);
  await saveStudents(students);
  return removed;
}
