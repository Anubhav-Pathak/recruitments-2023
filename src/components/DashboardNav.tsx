"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SidebarNavItem } from "@/types";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/Icons";

interface DashboardNavProps {
  items: SidebarNavItem[];
}

export function DashboardNav({ items }: DashboardNavProps) {
  const path = usePathname();

  if (!Object.keys(items).length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2">
      {Object.entries(items).map((key, index, arr) => {
        const Icon = Icons[key[1].icon || "arrowRight"];
        return (
          <div key={index}>
            <div className="flex items-center text-md font-bold px-3 py-2">
              <span className="uppercase font-bold">{key[0]}</span>
            </div>
            <nav className="grid grid-flow-row auto-rows-max text-sm">
              {key[1].map((item, index) => {
                return (
                  item.href && (
                    <Link key={index} href={item.disabled ? "/" : item.href}>
                      <span
                        className={cn(
                          "btn btn-ghost w-full justify-start",
                          path === item.href ? "bg-dsc" : "transparent",
                          item.disabled && "cursor-not-allowed opacity-80"
                        )}
                      >
                        <Icon className="mr-2 h-4 w-4" />
                        <span>{item.title}</span>
                      </span>
                    </Link>
                  )
                );
              })}
            </nav>
            {index !== arr.length - 1 && <div className="divider"></div>}
          </div>
        );
      })}
    </nav>
  );
}
