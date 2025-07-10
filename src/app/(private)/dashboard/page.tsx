import DashboardLayout from "./components/DashboardLayout";import { getStudents } from "@/app/api/students/data";
export default async function page() {
  const students = await getStudents();
  return <DashboardLayout students={students} />;
}
