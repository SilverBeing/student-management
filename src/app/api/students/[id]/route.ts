import { NextRequest, NextResponse } from "next/server";import { deleteStudent, getStudentById, updateStudent } from "../data";
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const paramValue = await params;
  const student = getStudentById(paramValue.id);

  if (!student) {
    return NextResponse.json({ error: "Student not found" }, { status: 404 });
  }

  return NextResponse.json(student);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const paramValue = await params;
  const data = await req.json();
  const updated = updateStudent(paramValue.id, data);

  if (!updated) {
    return NextResponse.json({ error: "Student not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const paramValue = await params;
  const removed = deleteStudent(paramValue.id);

  if (!removed) {
    return NextResponse.json({ error: "Student not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Student deleted successfully" });
}
