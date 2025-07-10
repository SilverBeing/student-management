import { getStudentById } from "@/app/api/students/data";import Link from "next/link";
import { notFound } from "next/navigation";
import StudentDetail from "../components/StudentDetail";

export default function StudentPage({ params }: { params: { id: string } }) {
  const paramValue = params;
  const student = getStudentById(paramValue.id);

  if (!student) {
    notFound();
  }

  return (
    <div className="min-h-[75vh] flex items-center justify-center">
      <div className="w-full max-w-lg bg-white rounded-xl shadow p-4 md:p-8">
        <Link
          href="/students"
          className="text-blue-600 hover:underline flex items-center mb-4"
        >
          ← Back
        </Link>
        <StudentDetail student={student} />
      </div>
    </div>
  );
}
