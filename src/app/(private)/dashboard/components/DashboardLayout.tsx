"use client";
import StudentAvatar from "../../components/StudentAvatar";
import type { Student } from "../../students/components/StudentsTable";
import StudentsTable from "../../students/components/StudentsTable";
import DashboardSummaryCard from "./DashboardSummaryCard";
import StudentGroupCard from "./StudentGroupCard";

export default function DashboardLayout({ students }: { students: Student[] }) {
  const total = students.length;
  const averageGPA = total
    ? students.reduce((sum, s) => sum + s.gpa, 0) / total
    : 0;
  const classSize = total;
  const numMajors = Array.from(
    new Set(students.map((s) => s.major.trim().toLowerCase()))
  ).length;
  const highestGPA = students.reduce((max, s) => Math.max(max, s.gpa), 0);

  const high = students.filter((s) => s.gpa >= 3.5);
  const mid = students.filter((s) => s.gpa < 3.5 && s.gpa >= 2.5);
  const low = students.filter((s) => s.gpa < 2.5);

  function avgGPA(arr: Student[]) {
    if (arr.length === 0) return 0;
    return (
      Math.round((arr.reduce((sum, s) => sum + s.gpa, 0) / arr.length) * 100) /
      100
    );
  }

  return (
    <>
      <div className="mb-8 flex flex-col gap-4">
        <div className="flex items-center gap-4  py-6">
          <div className="flex-1">
            <h1 className="text-3xl font-extrabold mb-1">Dashboard</h1>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-6 items-stretch">
          <DashboardSummaryCard
            averageGPA={averageGPA}
            classSize={classSize}
            numMajors={numMajors}
            highestGPA={highestGPA}
          />
          <div className="grid-cols-3 grid gap-2">
            <StudentGroupCard
              color="green"
              avatar={<StudentAvatar name={high[0]?.name || ""} size={32} />}
              count={high.length}
              percent={total ? Math.round((high.length / total) * 100) : 0}
              gradeAvg={avgGPA(high)}
              subtitle="GPA ≥ 3.5"
            />
            <StudentGroupCard
              color="yellow"
              avatar={<StudentAvatar name={mid[0]?.name || ""} size={32} />}
              count={mid.length}
              percent={total ? Math.round((mid.length / total) * 100) : 0}
              gradeAvg={avgGPA(mid)}
              subtitle="2.5 ≤ GPA < 3.5"
            />
            <StudentGroupCard
              color="red"
              avatar={<StudentAvatar name={low[0]?.name || ""} size={32} />}
              count={low.length}
              percent={total ? Math.round((low.length / total) * 100) : 0}
              gradeAvg={avgGPA(low)}
              subtitle="GPA < 2.5"
            />
          </div>
        </div>
      </div>

      <StudentsTable students={students} />
    </>
  );
}
