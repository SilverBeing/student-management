import { Metadata } from "next";import ClientLayout from "../ClientLayout";
import "../globals.css";
export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientLayout>{children}</ClientLayout>;
}
