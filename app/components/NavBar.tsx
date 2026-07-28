"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import NavLink from "./NavLink";

export default function NavBar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex items-center gap-4">
      <NavLink href="/">home</NavLink>
      {" | "}
      <NavLink href="/blogs">blogs</NavLink>
      {" | "}
      <Link href="/users" className="hover:text-gray-300">
        users
      </Link>
      {" | "}
      <div className="ml-auto flex items-center gap-4">
        {session ? (
          <>
            <Link href="/blogs/new" className="hover:text-gray-300">
              create new
            </Link>
            {" | "}
            <NavLink href="/me">me</NavLink>
            <button
              onClick={() => signOut()}
              className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded text-sm"
            >
              logout
            </button>
          </>
        ) : (
          <>
            <NavLink href="/login">login</NavLink>
            {" | "}
            <NavLink href="/register">register</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}
