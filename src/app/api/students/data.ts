export interface Student {
  id: string;
  name: string;
  registrationNumber: string;
  major: string;
  dob: string;
  gpa: number;
}

// Use global variable that persists across requests
declare global {
  var studentsData: Student[];
}

// Initialize global data if it doesn't exist
if (!global.studentsData) {
  global.studentsData = [];
}

export const generateId = (): string => {
  // Create ID with timestamp prefix for proper sorting
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2, 9);
  return `${timestamp}-${random}`;
};

export const getStudents = (): Student[] => {
  // Return students sorted with latest on top
  const sortedStudents = [...global.studentsData].sort((a, b) => {
    // Handle both old format (just random string) and new format (timestamp-random)
    let timestampA: number;
    let timestampB: number;

    // Check if ID has timestamp format (contains dash)
    if (a.id.includes("-")) {
      timestampA = parseInt(a.id.split("-")[0]);
    } else {
      // For old format, use a default timestamp (put them at the end)
      timestampA = 0;
    }

    if (b.id.includes("-")) {
      timestampB = parseInt(b.id.split("-")[0]);
    } else {
      // For old format, use a default timestamp (put them at the end)
      timestampB = 0;
    }

    return timestampB - timestampA; // Descending order (newest first)
  });

  console.log(
    "Current students:",
    sortedStudents.map((s) => ({ id: s.id, name: s.name }))
  );
  return sortedStudents;
};

export const getStudentById = (id: string): Student | undefined => {
  return global.studentsData.find((s) => s.id === id);
};

export const createStudent = (student: Omit<Student, "id">): Student => {
  const newStudent = { ...student, id: generateId() };
  console.log("Creating new student with ID:", newStudent.id);
  global.studentsData.push(newStudent);
  return newStudent;
};

export const updateStudent = (
  id: string,
  updatedStudent: Partial<Student>
): Student | undefined => {
  const index = global.studentsData.findIndex((s) => s.id === id);
  if (index !== -1) {
    global.studentsData[index] = {
      ...global.studentsData[index],
      ...updatedStudent,
    };
    return global.studentsData[index];
  }
  return undefined;
};

export const deleteStudent = (id: string): Student | undefined => {
  const index = global.studentsData.findIndex((s) => s.id === id);
  if (index !== -1) {
    const [removed] = global.studentsData.splice(index, 1);
    return removed;
  }
  return undefined;
};
