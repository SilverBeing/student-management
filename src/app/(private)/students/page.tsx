import { getStudents } from "../../api/students/data";import type { Student } from "./components/StudentsTable";
import StudentsTable from "./components/StudentsTable";

export default async function StudentsPage() {
  const students: Student[] = await getStudents();
  return (
    <div className="">
      <h1 className="text-2xl font-extrabold py-6">Students</h1>
      <StudentsTable students={students} />
    </div>
  );
}
