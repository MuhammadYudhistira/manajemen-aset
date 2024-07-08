import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home(params) {
  const role = params.searchParams?.role;

  if (role) {
    switch (role) {
      case "user":
        redirect("/user");
      case "admin":
        redirect("/admin");
      case "staff":
        redirect("/staff");
      default:
        redirect("not-found");
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href={"/admin"}>dashboard</Link>
    </main>
  );
}
