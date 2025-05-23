"use client";
import Image from "next/image";
import { TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";
import { TbStarsFilled } from "react-icons/tb";
import { leftSidebarItems } from "@/constants/sidebar.constants";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { supabase } from "@/utils/supabaseClient";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert("error logging out!");
      return;
    }

    router.push("/login");
  };
  return (
    <aside className="w-[60px] h-screen border-r border-neutral-300 flex flex-col justify-between items-center py-4 px-3 bg-white">
      <nav>
        {/* header with logo */}
        <header className="w-full h-fit flex items-center justify-center relative">
          <Image
            src={"/logo.svg"}
            alt="periskope-logo"
            width={30}
            height={30}
            className="w-8 h-8"
          />
          <span className="text-green-600 bg-white absolute z-10 -bottom-1 right-1 rounded-full font-bold text-xs text-center">
            2
          </span>
        </header>
        {/* control icons */}
        <ul className="pt-7 space-y-3 w-full flex flex-col items-center">
          {leftSidebarItems.map((item, index) => {
            if (item.type === "divider") {
              return (
                <hr
                  key={`divider-${index}`}
                  className="w-full border-t border-t-neutral-300"
                />
              );
            }

            const Icon = item.icon;
            return (
              <li
                key={`icon-${index}`}
                className="p-2 hover:bg-neutral-100 rounded-lg ease"
              >
                <Icon className={`w-5 h-5 ${item.className || ""}`} />
              </li>
            );
          })}
        </ul>
      </nav>
      {/* footer icons */}
      <footer className="flex flex-col items-center space-y-2">
        <div className="p-2 hover:bg-neutral-100 rounded-lg ease">
          <TbStarsFilled className="w-5 h-5 text-neutral-500" />
        </div>
        <div className="p-2 hover:bg-neutral-100 rounded-lg ease">
          <Dialog>
            <DialogTrigger>
              <TbLayoutSidebarLeftCollapseFilled className="w-5 h-5 text-neutral-500" />
            </DialogTrigger>
            <DialogContent className="p-10 flex flex-col items-center justify-center">
              <DialogHeader>
                <DialogTitle>Are you sure about logging out?</DialogTitle>
              </DialogHeader>

              <button
                onClick={signOut}
                className="px-2 py-1 w-fit h-fit rounded-lg text-white bg-green-500 my-2 hover:bg-green-600"
              >
                Logout
              </button>
            </DialogContent>
          </Dialog>
        </div>
      </footer>
    </aside>
  );
}
