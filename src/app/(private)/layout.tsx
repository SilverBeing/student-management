import ClientLayout from "../ClientLayout";import "../globals.css";
import Header from "./components/Header";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Student Management System",
  description: "Student Management System",
};

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientLayout>
      <Header />
      <main className=" min-h-screen px-6">
        <div className="max-w-6xl mt-10 mx-auto">{children}</div>
      </main>
    </ClientLayout>
  );
}
