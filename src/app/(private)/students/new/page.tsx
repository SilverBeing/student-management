import Link from "next/link";import StudentForm from "../components/StudentForm";

export default function AddStudentPage() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center">
      <div className="w-full max-w-lg bg-white rounded-xl shadow p-4 md:p-8">
        <Link
          href="/students"
          className="text-blue-600 hover:underline flex items-center mb-4"
        >
          ← Back
        </Link>
        <h1 className="text-2xl font-bold mb-6">Add Student</h1>
        <StudentForm
          initialValues={{
            name: "",
            registrationNumber: "",
            major: "",
            dob: "",
            gpa: 0,
          }}
          mode="add"
        />
      </div>
    </div>
  );
}
