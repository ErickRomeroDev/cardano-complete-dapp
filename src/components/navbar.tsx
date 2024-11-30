import { UserButton } from "@/features/auth/components/user-button";
import { MobileSidebar } from "./mobile-sidebar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import Image from "next/image";

type IconsType = {
  src: string;
  alt: string;
};

const icons: IconsType[] = [
  { src: "/brush.svg", alt: "ui" },
  { src: "/next-icon.svg", alt: "next" },
  { src: "/database.svg", alt: "database" },
  { src: "/code.svg", alt: "code" },
  { src: "/layers.svg", alt: "layers" },
  { src: "/proof.svg", alt: "proof" },
  { src: "/lock.svg", alt: "lock" },
  { src: "/midnight-icon.svg", alt: "compact" },
];

export const Navbar = () => {
  return (
    <nav className="inset-0 fixed z-20 bg-[#151518] px-6 flex items-center justify-between border-b-[1px] h-[60px] border-[#E5E7EB]">
      <div className="flex-col hidden lg:flex">
        {/* <h1 className="text-2xl font-semibold ">Home</h1>
        <p className="text-muted-foreground">
          Monitor all of your projects and tasks here
        </p> */}

        <Popover>
          <PopoverTrigger asChild>
            <button className="flex items-center gap-x-2 ">
              <Image src="/info.svg" alt="info" width={14} height={14} />
              <p>Features</p>
            </button>
          </PopoverTrigger>
          <PopoverContent>
            <div className=" h-60 flex gap-x-4 w-60  ">
              <div className="flex flex-col justify-between ">
                {icons.map((item, index) => (
                  <div key={index} className="py-1">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      height={13}
                      width={13}
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col justify-between text-[13px] py-0.5 font-medium">
                <p>UI: Animations & React</p>
                <p>Next.js 14 App router</p>
                <p>Reactive Database</p>
                <p>Reactive Programming</p>
                <p>Reactive Blockchain indexer</p>
                <p>Proof Server</p>
                <p>Zero Knowledge circuits</p>
                <p>Compact Smart Contracts</p>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <MobileSidebar />
      <UserButton />
    </nav>
  );
};
