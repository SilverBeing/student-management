import { NextRequest, NextResponse } from "next/server";import { createStudent, getStudents } from "./data";

export async function GET() {
  // getStudents() is synchronous, no await needed
  const students = getStudents();
  return NextResponse.json(students);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  // createStudent() is synchronous, no await needed
  const newStudent = createStudent(data);
  return NextResponse.json(newStudent, { status: 201 });
}
