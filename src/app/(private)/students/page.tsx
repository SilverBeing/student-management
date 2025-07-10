import { getStudents } from "@/app/api/students/data";import StudentsTable from "./components/StudentsTable";

export default function StudentsPage() {
  const students = getStudents();
  return (
    <div className="">
      <h1 className="text-2xl font-extrabold py-6">Students</h1>
      <StudentsTable students={students} />
    </div>
  );
}
