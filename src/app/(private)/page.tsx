import { redirect } from "next/navigation";

export default function PrivateRoot() {
  redirect("/dashboard");
}
