import Link from "next/link";
import { redirect } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export default function Home(params) {

  const cookieStore = cookies()
  const token = cookieStore.get('token')
  const decoded = jwtDecode(token.value)
  const role = decoded.role


  if (role) {
    switch (role) {
      case "KEPALA_BAGIAN":
        redirect("/head");
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
