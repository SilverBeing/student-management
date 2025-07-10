import { NextRequest, NextResponse } from "next/server";import { deleteStudent, getStudentById, updateStudent } from "../data";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const paramValue = await params;
  const student = await getStudentById(paramValue.id);
  if (!student)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(student);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const data = await req.json();
  const paramValue = await params;
  const updated = await updateStudent(paramValue.id, data);
  if (!updated)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const paramValue = await params;
  const removed = await deleteStudent(paramValue.id);
  if (!removed)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(removed);
}
