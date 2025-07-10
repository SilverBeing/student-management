import React from "react";
interface StudentGroupCardProps {
  color: "green" | "yellow" | "red";
  avatar: React.ReactNode;
  count: number;
  percent: number;
  gradeAvg: number;
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
  subtitle,
}: StudentGroupCardProps) {
  return (
    <div
      className={`relative rounded-2xl shadow flex flex-col justify-end p-4 w-full h-full ${colorMap[color]}`}
    >
      {subtitle && (
        <div className="absolute top-5 left-3 text-[10px] text-gray-700 font-semibold">
          {subtitle}
        </div>
      )}

      <div className="absolute -top-4 right-3">{avatar}</div>

      <span className="text-3xl font-bold text-gray-800 mt-10">{count}</span>

      <span className="text-xs text-gray-700 mt-1">{percent}% of class</span>
      <span className="text-xs text-gray-600">grade avg: {gradeAvg}%</span>
    </div>
  );
}
