import React from "react";
interface StudentGroupCardProps {
  color: "green" | "yellow" | "red";
  avatar: React.ReactNode;
  count: number;
  percent: number;
  gradeAvg: number;
  label: string;
  subtitle?: string;
}

const colorMap = {
  green: "bg-green-400",
  yellow: "bg-yellow-300",
  red: "bg-red-400",
};

export default function StudentGroupCard({
  color,
  avatar,
  count,
  percent,
  gradeAvg,
  label,
  subtitle,
}: StudentGroupCardProps) {
  return (
    <div
      className={`relative rounded-2xl shadow flex flex-col justify-end p-4 w-28 h-40 ${colorMap[color]}`}
    >
      {/* Label and subtitle */}
      <div className="absolute top-2 left-3">
        <div className="text-xs font-bold uppercase tracking-wide text-gray-700 mb-0.5">
          {label}
        </div>
        {subtitle && (
          <div className="text-[10px] text-gray-600 font-medium">
            {subtitle}
          </div>
        )}
      </div>
      {/* Avatar */}
      <div className="absolute -top-4 right-3">{avatar}</div>
      {/* Count */}
      <span className="text-3xl font-bold text-gray-800 mt-10">{count}</span>
      {/* Percent and grade avg */}
      <span className="text-xs text-gray-700 mt-1">{percent}% of class</span>
      <span className="text-xs text-gray-600">grade avg: {gradeAvg}%</span>
    </div>
  );
}
