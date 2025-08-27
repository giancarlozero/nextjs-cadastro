'use client'

import Link from "next/link";

export default function SessionNav(){
  return(
    <>
      <div className="btn-group">
        <Link href="#" className="btn btn-dark btn-sm">Perfil</Link>
        <Link href="/" className="btn btn-dark btn-sm">Logout</Link>
      </div>
      <img src="https://placehold.co/64x64?text=Foto" alt=""></img>
    </>
  );
}