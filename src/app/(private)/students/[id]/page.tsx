import { getStudentById } from "@/app/api/students/data";import Link from "next/link";
import StudentDetail from "../components/StudentDetail";
import type { Student } from "../components/StudentsTable";

interface StudentDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function StudentDetailPage({
  params,
}: StudentDetailPageProps) {
  const paramValue = await params;
  const student: Student | undefined = await getStudentById(paramValue.id);
  return (
    <div className="min-h-[75vh]   flex items-center justify-center">
      <div className="w-full max-w-lg bg-white rounded-xl shadow p-4 md:p-8">
        <Link
          href="/students"
          className="text-blue-600 hover:underline flex items-center mb-4"
        >
          ← Back
        </Link>
        <StudentDetail student={student ?? null} />
      </div>
    </div>
  );
}
