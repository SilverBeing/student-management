"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import StudentForm from "./StudentForm";
import type { Student } from "./StudentsTable";

interface StudentEditWrapperProps {
  studentId: string;
}

export default function StudentEditWrapper({
  studentId,
}: StudentEditWrapperProps) {
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/students/${studentId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Student not found");
        }
        return res.json();
      })
      .then((data) => {
        setStudent(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [studentId]);

  if (loading) {
    return (
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p>Loading student...</p>
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Student not found</h2>
        <button
          onClick={() => router.back()}
          className="text-blue-600 hover:underline"
        >
          ← Back to Students
        </button>
      </div>
    );
  }

  const { id, ...initialValues } = student;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Edit Student</h1>
      <StudentForm initialValues={initialValues} mode="edit" studentId={id} />
    </div>
  );
}
