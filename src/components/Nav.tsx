import Link from "next/link";
import Image from "next/image";
import { SidebarNavItem } from "@/types";

export function NavBar({ items, user }: any) {
  if (!Object.keys(items).length) {
    return null;
  }

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <a className="btn btn-ghost normal-case text-xl font-bold">
          <img src="/logo.png" alt="logo" className="h-8 w-8" />
          <span className="hidden lg:inline">DSC Recruitments</span>
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Learn more about us!</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost">
              <div className="avatar">
                <div className="rounded-full w-10 h-10 m-1">
                  <img src={user.image} />
                </div>
              </div>
              <div className="">
                <div className="text-base-content">{user.name}</div>
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-lg w-52"
            >
              <Link href="/api/auth/signout">
                <li className="btn btn-ghost btn-outline w-full">Sign out</li>
              </Link>
            </ul>
          </div>
        ) : (
          <Link href="/login">
            <a className="btn btn-ghost">Login</a>
          </Link>
        )}
      </div>
    </div>
  );
}
