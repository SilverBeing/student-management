import { NextRequest, NextResponse } from "next/server";import { createStudent, getStudents } from "./data";

export async function GET() {
  const students = getStudents();
  return NextResponse.json(students);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const newStudent = createStudent(data);
  return NextResponse.json(newStudent, { status: 201 });
}
