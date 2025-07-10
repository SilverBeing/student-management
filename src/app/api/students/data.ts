import { promises as fs } from "fs";import path from "path";

export interface Student {
  id: string;
  name: string;
  registrationNumber: string;
  major: string;
  dob: string;
  gpa: number;
}

// In production, we'll use in-memory storage since file system is not persistent
let inMemoryStudents: Student[] = [];

const dataFile = path.join(process.cwd(), "src/app/api/students/students.json");

// Initialize data file if it doesn't exist
async function ensureDataFile(): Promise<void> {
  try {
    await fs.access(dataFile);
  } catch {
    // File doesn't exist, create it with empty data
    const initialData: Student[] = [];
    await fs.writeFile(dataFile, JSON.stringify(initialData, null, 2), "utf-8");
  }
}

export async function getStudents(): Promise<Student[]> {
  try {
    if (process.env.NODE_ENV === "production") {
      // In production, return in-memory data
      return inMemoryStudents;
    } else {
      // In development, read from file
      await ensureDataFile();
      const data = await fs.readFile(dataFile, "utf-8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error reading students data:", error);
    return [];
  }
}

export async function saveStudents(students: Student[]): Promise<void> {
  try {
    if (process.env.NODE_ENV === "production") {
      // In production, update in-memory data
      inMemoryStudents = students;
    } else {
      // In development, write to file
      await ensureDataFile();
      await fs.writeFile(dataFile, JSON.stringify(students, null, 2), "utf-8");
    }
  } catch (error) {
    console.error("Error saving students data:", error);
    throw new Error("Failed to save students data");
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
