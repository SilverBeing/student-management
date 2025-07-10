import Link from "next/link";import StudentDetail from "../components/StudentDetail";

export default async function StudentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="min-h-[75vh] flex items-center justify-center">
      <div className="w-full max-w-lg bg-white rounded-xl shadow p-4 md:p-8">
        <Link
          href="/students"
          className="text-blue-600 hover:underline flex items-center mb-4"
        >
          ← Back
        </Link>
        <StudentDetail studentId={id} />
      </div>
    </div>
  );
}
