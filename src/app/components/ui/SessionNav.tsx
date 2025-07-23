'use client'

import Link from "next/link";
import { LogOut } from "@deemlol/next-icons";

export default function SessionNav(){
  return(
    <Link className="btn btn-primary" href="/"><LogOut size={24} color="#FFFFFF" /> Encerrar sessão</Link>
  );
}