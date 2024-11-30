import Image from "next/image";
import Link from "next/link";
import { Navigation } from "./navigation";
import { WorkspaceSwitcher } from "./workspace-switcher";

export const Sidebar = () => {
  return (
    <aside className="h-full bg-[#151518] text-white border-r-[1px] border-[#E5E7EB] p-4 w-full">
      <div className="absolute w-full h-[1px] bg-[#E5E7EB] left-0 top-[59px]" />
      <Link href="/">
        <div className="flex gap-x-2 items-center">
          <Image src="/logo-mesh.svg" alt="logo" width={39} height={39} />
          <p className="font-medium text-[16px]">Multi-Sig Platform</p>
        </div>
      </Link>
      <div className="h-10" />
      <WorkspaceSwitcher />
      <div className="h-6" />
      <Navigation />
    </aside>
  );
};
