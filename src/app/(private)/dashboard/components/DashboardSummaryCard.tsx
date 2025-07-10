interface DashboardSummaryCardProps {
  averageGPA: number;
  classSize: number;
  numMajors: number;
  highestGPA: number;
}

export default function DashboardSummaryCard({
  averageGPA,
  classSize,
  numMajors,
  highestGPA,
}: DashboardSummaryCardProps) {
  return (
    <div className="flex flex-col sm:flex-row bg-white rounded-2xl  p-8 w-full max-w-3xl mx-auto items-stretch">
      <div className="flex-1 flex flex-col items-center justify-center gap-2">
        <div className="flex flex-col items-center mb-4">
          <svg
            width="56"
            height="56"
            viewBox="0 0 64 64"
            fill="none"
            className="mb-2"
          >
            <ellipse cx="32" cy="56" rx="20" ry="4" fill="#e0e0e0" />
            <path d="M16 12h32v12a16 16 0 01-32 0V12z" fill="#A3E635" />
            <path d="M24 44h16v4a8 8 0 01-16 0v-4z" fill="#A3E635" />
            <rect x="28" y="36" width="8" height="8" rx="2" fill="#A3E635" />
            <rect x="30" y="48" width="4" height="8" rx="2" fill="#A3E635" />
            <ellipse cx="32" cy="12" rx="16" ry="4" fill="#FDE68A" />
          </svg>
          <span className="text-4xl font-bold text-green-600">
            {averageGPA.toFixed(2)}
          </span>
          <span className="text-base font-semibold text-gray-700 mt-1">
            Average GPA
          </span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 10a4 4 0 100-8 4 4 0 000 8zM2 16a6 6 0 1112 0H2z"
              fill="#4f8cff"
            />
          </svg>
          <span className="text-sm text-gray-500 font-medium">Class Size</span>
          <span className="text-lg font-semibold text-blue-500 ml-1">
            {classSize}
          </span>
        </div>
      </div>

      <div className="hidden sm:block w-px bg-gray-200 mx-8" />

      <div className="flex-1 flex flex-col items-center justify-center gap-2 mt-8 sm:mt-0">
        <div className="flex flex-col items-center mb-4">
          <svg
            width="56"
            height="56"
            viewBox="0 0 64 64"
            fill="none"
            className="mb-2"
          >
            <rect x="10" y="16" width="16" height="32" rx="4" fill="#A3E635" />
            <rect x="28" y="12" width="16" height="40" rx="4" fill="#FDE68A" />
            <rect x="46" y="20" width="8" height="24" rx="4" fill="#4f8cff" />
          </svg>
          <span className="text-4xl font-bold text-yellow-500">
            {numMajors}
          </span>
          <span className="text-base font-semibold text-gray-700 mt-1">
            Majors
          </span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <polygon
              points="10,2 12,8 18,8 13,12 15,18 10,14 5,18 7,12 2,8 8,8"
              fill="#FFD700"
            />
          </svg>
          <span className="text-sm text-gray-500 font-medium">Highest GPA</span>
          <span className="text-lg font-semibold text-yellow-500 ml-1">
            {highestGPA.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
