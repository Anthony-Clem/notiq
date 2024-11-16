import { cn } from "@/lib/utils";
import { GiFeather } from "react-icons/gi";
import { Pacifico } from "next/font/google";

const pacifico = Pacifico({ subsets: ["latin"], weight: "400" });

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <GiFeather className="text-primary size-7 translate-x-2 scale-x-[-1] rotate-12" />
      <h1
        className={cn(
          "text-2xl -tracking-[2px] font-light",
          pacifico.className
        )}
      >
        Notiq
      </h1>
    </div>
  );
};

export default Logo;
