"use client";
import { useEffect, useState } from "react";
import type { Student } from "./StudentsTable";
import StudentsTable from "./StudentsTable";

export default function StudentsPageWrapper() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = () => {
    fetch("/api/students")
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading students...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Students</h1>
      </div>
      <StudentsTable students={students} onDelete={fetchStudents} />
    </div>
  );
}
