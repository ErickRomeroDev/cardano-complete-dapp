"use client";

import { cn } from "@/lib/utils";
import { SettingsIcon, UsersIcon, CircuitBoardIcon, Scale } from "lucide-react";
import Link from "next/link";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { usePathname } from "next/navigation";

const routes = [
  {
    label: "Voting Tool",
    href: "",
    icon: Scale,
    activeIcon: Scale,
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
        const fullHref =
          item.href !== "/boards"
            ? `/workspaces/${workspaceId}${item.href}`
            : item.href;
        const isActive = pathname === fullHref;
        const Icon = isActive ? item.activeIcon : item.icon;
        return (
          <Link key={item.href} href={fullHref}>
            <div
              className={cn(
                "flex item-center gap-x-3 p-2.5 rounded-md font-medium hover:text-white transition text-neutral-500",
                isActive && " hover:opacity-100 text-white"
              )}
            >
              <Icon className="size-5 text-neutral-500" />
              <p>{item.label}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
