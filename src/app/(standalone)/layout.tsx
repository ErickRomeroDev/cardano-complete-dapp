import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UserButton } from "@/features/auth/components/user-button";
import Image from "next/image";
import Link from "next/link";

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

interface StandAloneLayoutProps {
  children: React.ReactNode;
}

const StandAloneLayout = ({ children }: StandAloneLayoutProps) => {
  return (
    <main className="bg-neutral-100 min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex justify-between items-center h-[73px]">
          <Link href="/">
            <Image
              src="/midnight-logo-black.svg"
              alt="logo"
              width={164}
              height={48}
            />
          </Link>
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
          <UserButton />
        </nav>
        <div className="flex flex-col items-center justify-center py-4">
          {children}
        </div>
      </div>
    </main>
  );
};

export default StandAloneLayout;
