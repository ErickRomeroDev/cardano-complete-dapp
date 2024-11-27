"use client"

import { cn } from "@/lib/utils";
import { SettingsIcon, UsersIcon, CircuitBoardIcon } from "lucide-react";
import Link from "next/link";
import {
  GoCheckCircle,
  GoCheckCircleFill,
  GoHome,
  GoHomeFill,
} from "react-icons/go";

import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { usePathname } from "next/navigation";

const routes = [
  {
    label: "Home",
    href: "",
    icon: GoHome,
    activeIcon: GoHomeFill,
  },
  // {
  //   label: "My Tasks",
  //   href: "/tasks",
  //   icon: GoCheckCircle,
  //   activeIcon: GoCheckCircleFill,
  // },
  {
    label: "Settings",
    href: "/settings",
    icon: SettingsIcon,
    activeIcon: SettingsIcon,
  },
  {
    label: "Members",
    href: "/members",
    icon: UsersIcon,
    activeIcon: UsersIcon,
  },
  {
    label: "Quetions",
    href: "/boards",
    icon: CircuitBoardIcon,
    activeIcon: CircuitBoardIcon,
  },
];

export const Navigation = () => {
  const workspaceId = useWorkspaceId();
  const pathname = usePathname();
  return (
    <div className="flex flex-col">
      {routes.map((item) => {
        const fullHref = (item.href !== "/boards") ? `/workspaces/${workspaceId}${item.href}` : item.href
        const isActive = pathname === fullHref;
        const Icon = isActive ? item.activeIcon : item.icon;
        return (
          <Link key={item.href} href={fullHref}>
            <div
              className={cn(
                "flex item-center gap-2.5 p-2.5 rounded-md font-medium hover:text-primary transition text-neutral-500",
                isActive && "bg-white shadow-sm hover:opacity-100 text-primary"
              )}
            >
              <Icon className="size-5 text-neutral-500" />
              {item.label}
            </div>
          </Link>
        );
      })}
    </div>
  );
};
