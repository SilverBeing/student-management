"use client";import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ConfirmModal from "../../components/ConfirmModal";
import type { Student } from "./StudentsTable";

interface StudentDetailProps {
  student: Student | null;
}

export default function StudentDetail({ student }: StudentDetailProps) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  if (!student) {
    return (
      <div className="text-center py-8 text-red-500">Student not found.</div>
    );
  }

  async function handleDelete() {
    setDeleting(true);
    const res = await fetch(`/api/students/${student?.id}`, {
      method: "DELETE",
    });
    setDeleting(false);
    setModalOpen(false);
    if (res.ok) {
      router.push("/students");
    } else {
      alert("Failed to delete student.");
    }
  }

  return (
    <div className="w-full max-w-lg bg-white rounded-xl shadow p-4 md:p-8">
      <ConfirmModal
        open={modalOpen}
        message="Are you sure you want to delete this student?"
        onConfirm={handleDelete}
        onCancel={() => setModalOpen(false)}
        loading={deleting}
      />
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h1 className="text-lg md:text-2xl font-bold truncate">
          Student Profile
        </h1>
        <div className="flex gap-2">
          <Link
            href={`/students/${student.id}/edit`}
            className="text-blue-600 hover:underline font-medium px-3 py-1 rounded"
          >
            Edit
          </Link>
          <button
            onClick={() => setModalOpen(true)}
            disabled={deleting}
            className="text-red-600 hover:underline font-medium px-3 py-1 rounded disabled:opacity-50"
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <span className="font-semibold">Name:</span> {student.name}
        </div>
        <div>
          <span className="font-semibold">Registration Number:</span>{" "}
          {student.registrationNumber}
        </div>
        <div>
          <span className="font-semibold">Major:</span> {student.major}
        </div>
        <div>
          <span className="font-semibold">Date of Birth:</span> {student.dob}
        </div>
        <div>
          <span className="font-semibold">GPA:</span> {student.gpa}
        </div>
      </div>
    </div>
  );
}
