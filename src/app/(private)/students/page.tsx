import StudentsTable from "./components/StudentsTable";export default async function StudentsPage() {
  return (
    <div className="">
      <h1 className="text-2xl font-extrabold py-6">Students</h1>
      <StudentsTable />
    </div>
  );
}
