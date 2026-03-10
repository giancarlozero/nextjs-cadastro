"use client"

import { useRouter } from "next/navigation"

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include"
    });

    router.push("/");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="px-2 py-1 bg-gray-800 hover:bg-gray-600 text-white rounded"
    >
      Logout
    </button>
  )
}
