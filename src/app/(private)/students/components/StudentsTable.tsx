"use client";import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import ConfirmModal from "../../components/ConfirmModal";
import StudentAvatar from "../../components/StudentAvatar";

export interface Student {
  id: string;
  name: string;
  registrationNumber: string;
  major: string;
  dob: string;
  gpa: number;
}

interface StudentsTableProps {
  students: Student[];
  onDelete?: () => void;
}

export default function StudentsTable({
  students,
  onDelete,
}: StudentsTableProps) {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedMajor, setSelectedMajor] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const majors = useMemo(() => {
    const set = new Set(students.map((s) => s.major.trim()));
    return Array.from(set);
  }, [students]);

  const filtered = students.filter((s) => {
    const matchesMajor = selectedMajor
      ? s.major.trim() === selectedMajor
      : true;
    const matchesSearch = s.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesMajor && matchesSearch;
  });

  const sortedStudents = [...filtered];
  function handleDeleteClick(id: string) {
    setDeleteId(id);
    setModalOpen(true);
  }

  async function handleConfirmDelete() {
    if (!deleteId) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/students/${deleteId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        onDelete?.();
        setModalOpen(false);
        setDeleteId(null);
      } else {
        alert("Failed to delete student.");
      }
    } catch {
      alert("Failed to delete student.");
    } finally {
      setIsDeleting(false);
    }
  }

  function handleCancelDelete() {
    setModalOpen(false);
    setDeleteId(null);
  }

  return (
    <>
      <ConfirmModal
        open={modalOpen}
        message="Are you sure you want to delete this student?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        loading={isDeleting}
      />
      <div className=" card !px-4 md:!px-5 !shadow-none mt-6">
        <h2 className=" text-xl font-semibold mb-4">Student list</h2>
        <div className="flex flex-col md:flex-row w-full !items-center md:justify-between gap-4 mb-6">
          <div className="flex flex-col w-full md:flex-row gap-4 items-center ">
            <input
              type="text"
              placeholder="Search by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-[var(--border)] rounded px-3 py-1.5 text-sm focus:outline-none focus:border-[var(--accent)] w-full md:w-64"
            />
            <select
              value={selectedMajor}
              onChange={(e) => setSelectedMajor(e.target.value)}
              className="border border-[var(--border)] rounded px-3 py-1.5 text-sm focus:outline-none focus:border-[var(--accent)] w-full md:w-64"
            >
              <option value="">All Majors</option>
              {majors.map((major) => (
                <option key={major} value={major}>
                  {major}
                </option>
              ))}
            </select>
          </div>
          <Link
            href="/students/new"
            className="btn-primary w-full md:w-max truncate text-sm text-center justify-center flex items-center gap-2"
          >
            + Add Students
          </Link>
        </div>

        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full text-sm">
            <thead className="table-header">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">
                  <input type="checkbox" />
                </th>
                <th className="px-4 py-3 text-nowrap text-left font-semibold">
                  Name
                </th>
                <th className="px-4 py-3 text-nowrap text-left font-semibold">
                  Registration #
                </th>
                <th className="px-4 py-3 text-nowrap text-left font-semibold">
                  Major
                </th>
                <th className="px-4 py-3 text-nowrap text-left font-semibold">
                  Date of Birth
                </th>
                <th className="px-4 py-3 text-nowrap text-left font-semibold">
                  GPA
                </th>
                <th className="px-4 py-3 text-left text-nowrap font-semibold">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedStudents.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-8 text-[var(--text-secondary)]"
                  >
                    No students found.
                  </td>
                </tr>
              ) : (
                sortedStudents.map((student, idx) => (
                  <tr
                    key={student.id || idx}
                    className="table-row hover:bg-[var(--muted)] transition"
                  >
                    <td className="px-4 py-3">
                      <input type="checkbox" />
                    </td>
                    <td className="px-4 py-3 text-nowrap font-medium flex items-center gap-3">
                      <StudentAvatar name={student.name} size={32} />
                      {student.name}
                    </td>
                    <td className="px-4  py-3">{student.registrationNumber}</td>
                    <td className="px-4 py-3">{student.major}</td>
                    <td className="px-4 py-3">{student.dob}</td>
                    <td className="px-4 py-3">{student.gpa}</td>
                    <td className="px-4 py-3 h-full items-center flex gap-2">
                      <button
                        className="p-1 hover:text-[var(--accent)]"
                        title="View"
                        onClick={() => router.push(`/students/${student.id}`)}
                      >
                        <svg
                          width="16"
                          height="16"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeWidth="2"
                            d="M1.5 12S5 5 12 5s10.5 7 10.5 7-3.5 7-10.5 7S1.5 12 1.5 12z"
                          />
                          <circle
                            cx="12"
                            cy="12"
                            r="3"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                        </svg>
                      </button>
                      <button
                        className="p-1 hover:text-[var(--accent)]"
                        title="Edit"
                        onClick={() =>
                          router.push(`/students/${student.id}/edit`)
                        }
                      >
                        <svg
                          width="16"
                          height="16"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeWidth="2"
                            d="M16.475 5.408l2.117 2.117a2 2 0 010 2.828l-8.486 8.486a2 2 0 01-1.414.586H6v-2.121a2 2 0 01.586-1.415l8.486-8.485a2 2 0 012.828 0z"
                          />
                        </svg>
                      </button>
                      <button
                        className="p-1 hover:text-red-500"
                        title="Delete"
                        onClick={() => handleDeleteClick(student.id)}
                      >
                        <svg
                          width="16"
                          height="16"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeWidth="2"
                            d="M6 7h12M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2m2 0v12a2 2 0 01-2 2H8a2 2 0 01-2-2V7h12z"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
