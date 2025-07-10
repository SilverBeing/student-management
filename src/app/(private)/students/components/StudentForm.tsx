"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "../../components/Button";
import type { Student } from "./StudentsTable";

interface StudentFormProps {
  initialValues: Omit<Student, "id">;
  mode: "add" | "edit";
  studentId?: string;
}

export default function StudentForm({
  initialValues,
  mode,
  studentId,
}: StudentFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<Omit<Student, "id">>(initialValues);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const today = new Date().toISOString().split("T")[0];

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "gpa" ? Number(value) : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!form.name || !form.registrationNumber || !form.major || !form.dob) {
      setError("Please fill in all required fields.");
      return;
    }
    if (isNaN(form.gpa) || form.gpa < 0 || form.gpa > 4.0) {
      setError("GPA must be a number between 0 and 4.0");
      return;
    }
    setLoading(true);
    let res;
    if (mode === "add") {
      res = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else if (mode === "edit" && studentId) {
      res = await fetch(`/api/students/${studentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    setLoading(false);
    if (res?.ok) {
      router.push("/students");
    } else {
      setError("Failed to save student.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 text-sm font-medium">Name *</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border border-[var(--border)] rounded px-3 py-2 focus:outline-none focus:border-[var(--accent)]"
          required
        />
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium">
          Registration Number *
        </label>
        <input
          name="registrationNumber"
          value={form.registrationNumber}
          onChange={handleChange}
          className="w-full border border-[var(--border)] rounded px-3 py-2 focus:outline-none focus:border-[var(--accent)]"
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Major *</label>
        <input
          name="major"
          value={form.major}
          onChange={handleChange}
          className="w-full border border-[var(--border)] rounded px-3 py-2 focus:outline-none focus:border-[var(--accent)]"
          required
        />
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium">
          Date of Birth *
        </label>
        <input
          name="dob"
          type="date"
          value={form.dob}
          onChange={handleChange}
          max={today}
          className="w-full border border-[var(--border)] rounded px-3 py-2 focus:outline-none focus:border-[var(--accent)]"
          required
        />
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium">GPA *</label>
        <input
          name="gpa"
          type="number"
          step="0.01"
          min="0"
          max="4.0"
          value={form.gpa}
          onChange={handleChange}
          className="w-full border border-[var(--border)] rounded px-3 py-2 focus:outline-none focus:border-[var(--accent)]"
          required
        />
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <Button
        type="submit"
        className="btn-primary w-full mt-2"
        loading={loading}
        disabled={loading}
      >
        {mode === "add" ? "Add Student" : "Update Student"}
      </Button>
    </form>
  );
}
