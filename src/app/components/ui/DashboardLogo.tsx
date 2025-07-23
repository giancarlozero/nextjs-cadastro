'use client'

import Link from "next/link";

export default function DashboardLogo() {
  return(
    <Link href="/painel">
      <img src="https://placehold.co/150x80?text=Logo" alt="" />
    </Link>
  );
}