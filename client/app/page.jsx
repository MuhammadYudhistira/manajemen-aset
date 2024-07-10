"use client"
import Cookies from "js-cookie";
import Link from "next/link";
import { redirect } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export default function Home(params) {

  const token = Cookies.get("token");

  if (!token) {
    redirect("/login");
    return null; // Return null to avoid rendering the component
  }

  let decoded;
  try {
    decoded = jwtDecode(token)
  } catch (error) {
    console.error("Invalid token:", error);
    redirect("/login");
    return null; // Return null to avoid rendering the component
  }

  const role = decoded.role

  if (role) {
    switch (role) {
      case "USER":
        redirect("/user");
      case "ADMIN":
        redirect("/admin");
      case "STAFF":
        redirect("/staff");
      default:
        redirect("not-found");
    }
  }

  console.log("🚀 ~ Home ~ role:", role)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href={"/admin"}>dashboard</Link>
    </main>
  );
}
