'use client'

import Link from "next/link";
import { LogOut, User } from "@deemlol/next-icons";

export default function SessionNav(){
  return(
    <>
      <div className="btn-group">
        <Link href="#" className="btn btn-dark btn-sm"><User size={18} />Perfil</Link>
        <Link href="/" className="btn btn-dark btn-sm"><LogOut size={18} />Logout</Link>
      </div>
      <img src="https://placehold.co/64x64?text=Foto" alt=""></img>
    </>
  );
}