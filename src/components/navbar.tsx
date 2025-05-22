import { BsChatDotsFill } from "react-icons/bs";
import { LuRefreshCcwDot } from "react-icons/lu";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { FaListUl } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { BiSolidBellOff } from "react-icons/bi";
import { MdInstallDesktop } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { HiOutlineSelector } from "react-icons/hi";

export default function Navbar() {
  return (
    <header className="h-14 py-3 w-full border-b border-neutral-300 flex items-center justify-between px-4 bg-white">
      <div className="flex items-center gap-3">
        <BsChatDotsFill className="w-4 h-4 text-neutral-500 cursor-pointer" />
        <h1 className="text-sm font-bold text-neutral-500">Chats</h1>
      </div>

      {/* control buttons */}
      <div className="flex items-center gap-4">
        <button className="w-fit flex items-center border border-neutral-300 px-3 rounded py-2 text-sm font-medium hover:bg-neutral-100 ease">
          <LuRefreshCcwDot className="w-4 h-4 mr-1" />
          Refresh
        </button>
        <button className="w-fit flex items-center border border-neutral-300 px-3 rounded py-2 text-sm font-medium hover:bg-neutral-100 ease">
          <IoMdHelpCircleOutline className="w-4 h-4 mr-1" />
          Help
        </button>
        <button className="w-fit flex items-center border border-neutral-300 px-3 rounded py-2 text-sm font-medium hover:bg-neutral-100 ease">
          <GoDotFill className="w-4 h-4 mr-1 text-yellow-300" />
          5/6 Phones
          <HiOutlineSelector className="w-4 h-4 ml-2 text-neutral-500" />
        </button>
        <button className="w-fit flex items-center border border-neutral-300 px-3 rounded py-2 text-sm font-medium hover:bg-neutral-100 ease">
          <MdInstallDesktop className="w-4 h-4" />
        </button>
        <button className="w-fit flex items-center border border-neutral-300 px-3 rounded py-2 text-sm font-medium hover:bg-neutral-100 ease">
          <BiSolidBellOff className="w-4 h-4 text-neutral-500" />
        </button>
        <button className="w-fit flex items-center border border-neutral-300 px-3 rounded py-2 text-sm font-medium hover:bg-neutral-100 ease">
          <BsStars className="w-4 h-4 mr-1 text-yellow-300" />
          <FaListUl className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
