'use client'

import Link from "next/link";
import { LogOut } from "@deemlol/next-icons";

export default function SessionNav(){
  return(
    <>
      <div className="btn-group">
        <Link href="#" className="btn btn-dark btn-sm">Perfil</Link>
        <Link href="/" className="btn btn-dark btn-sm">Logout</Link>
      </div>
      <img src="https://picsum.photos/64/64" alt=""></img>
    </>
  );
}