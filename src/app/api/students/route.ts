import { NextRequest, NextResponse } from "next/server";import { addStudent, getStudents, Student } from "./data";

export async function GET() {
  const students = await getStudents();
  return NextResponse.json(students);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const newStudent: Student = { ...data, id: String(Date.now()) };
  await addStudent(newStudent);
  return NextResponse.json(newStudent, { status: 201 });
}
