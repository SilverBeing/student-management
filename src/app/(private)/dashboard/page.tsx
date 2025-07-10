import { getStudents } from "@/app/api/students/data";import DashboardLayout from "./components/DashboardLayout";

export default function DashboardPage() {
  const students = getStudents();
  return <DashboardLayout students={students} />;
}
