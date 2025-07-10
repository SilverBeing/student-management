"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import StudentAvatar from "../../components/StudentAvatar";
import type { Student } from "./StudentsTable";

interface StudentDetailProps {
  studentId: string;
}

export default function StudentDetail({ studentId }: StudentDetailProps) {
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
        <Link href="/students" className="text-blue-600 hover:underline">
          ← Back to Students
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <StudentAvatar name={student.name} size={64} />
        <div>
          <h1 className="text-2xl font-bold">{student.name}</h1>
          <p className="text-gray-600">
            Registration No: {student.registrationNumber}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Major
            </label>
            <p className="text-lg">{student.major}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth
            </label>
            <p className="text-lg">
              {new Date(student.dob).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              GPA
            </label>
            <p className="text-lg font-semibold">{student.gpa}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <Link href={`/students/${student.id}/edit`} className="btn-primary">
          Edit Student
        </Link>
      </div>
    </div>
  );
}
