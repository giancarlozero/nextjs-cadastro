'use client'

import Link from "next/link";

export default function SessionNav(){
  return(
    <div className="flex flex-row items-center justify-center gap-1.5">
      <div className="flex flex-row gap-1.5">
        <Link className="px-2 py-1 bg-gray-800 hover:bg-gray-600 text-white rounded" href="#">Perfil</Link>
        <Link className="px-2 py-1 bg-gray-800 hover:bg-gray-600 text-white rounded" href="/">Logout</Link>
      </div>
      <img src="https://placehold.co/64x64?text=Foto" alt=""></img>
    </div>
  );
}