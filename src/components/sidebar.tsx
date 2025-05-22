import Image from "next/image";
import { TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";
import { TbStarsFilled } from "react-icons/tb";
import { leftSidebarItems } from "@/constants/sidebar.constants";

export default function Sidebar() {
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
          <TbLayoutSidebarLeftCollapseFilled className="w-5 h-5 text-neutral-500" />
        </div>
      </footer>
    </aside>
  );
}
