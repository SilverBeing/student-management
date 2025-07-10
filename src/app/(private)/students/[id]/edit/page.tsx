import { getStudentById } from "@/app/api/students/data";
import Link from "next/link";
import { notFound } from "next/navigation";
import StudentForm from "../../components/StudentForm";

export default function EditStudentPage({ params }: { params: { id: string } }) {
  const paramId = params;
  const student = getStudentById(paramId.id);

  if (!student) {
    notFound();
  }

  const { id, ...initialValues } = student;

  return (
    <div className="min-h-[75vh] flex items-center justify-center">
      <div className="w-full max-w-lg bg-white rounded-xl shadow p-4 md:p-8">
        <Link
          href="/students"
          className="text-blue-600 hover:underline flex items-center mb-4"
        >
          ← Back
        </Link>
        <h1 className="text-2xl font-bold mb-6">Edit Student</h1>
        <StudentForm initialValues={initialValues} mode="edit" studentId={id} />
      </div>
    </div>
  );
}
