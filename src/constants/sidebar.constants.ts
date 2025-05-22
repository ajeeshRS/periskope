import { TbLayoutSidebarRightExpandFilled } from "react-icons/tb";
import { FiRefreshCcw } from "react-icons/fi";
import { LuPenLine } from "react-icons/lu";
import { CgMenuRightAlt } from "react-icons/cg";
import { TbListDetails } from "react-icons/tb";
import { FaHubspot, FaAt } from "react-icons/fa6";
import { MdPeople } from "react-icons/md";
import { RiFolderImageFill, RiListSettingsLine } from "react-icons/ri";

import { AiFillHome } from "react-icons/ai";
import { BsChatDotsFill } from "react-icons/bs";
import { IoTicket } from "react-icons/io5";
import { FaArrowTrendUp, FaListUl, FaCodeFork } from "react-icons/fa6";
import { HiSpeakerphone } from "react-icons/hi";
import { RiContactsBookFill, RiSettings5Fill } from "react-icons/ri";
import { MdOutlineChecklist } from "react-icons/md";

export const rightSidebarItems = [
  { icon: TbLayoutSidebarRightExpandFilled },
  { icon: FiRefreshCcw },
  { icon: LuPenLine },
  { icon: CgMenuRightAlt },
  { icon: TbListDetails },
  { icon: FaHubspot },
  { icon: MdPeople },
  { icon: FaAt },
  { icon: RiFolderImageFill },
  { icon: RiListSettingsLine },
];

type SidebarItem =
  | { type: "icon"; icon: React.ElementType; className?: string }
  | { type: "divider" };

export const leftSidebarItems: SidebarItem[] = [
  { type: "icon", icon: AiFillHome, className: "text-neutral-500" },

  { type: "divider" },

  { type: "icon", icon: BsChatDotsFill, className: "text-green-500" },
  { type: "icon", icon: IoTicket, className: "text-neutral-500" },
  { type: "icon", icon: FaArrowTrendUp, className: "text-neutral-500" },

  { type: "divider" },

  { type: "icon", icon: FaListUl, className: "text-neutral-500" },
  { type: "icon", icon: HiSpeakerphone, className: "text-neutral-500" },
  { type: "icon", icon: FaCodeFork, className: "rotate-180 text-neutral-500" },

  { type: "divider" },

  { type: "icon", icon: RiContactsBookFill, className: "text-neutral-500" },
  { type: "icon", icon: RiFolderImageFill, className: "text-neutral-500" },

  { type: "divider" },

  { type: "icon", icon: MdOutlineChecklist, className: "text-neutral-500" },
  { type: "icon", icon: RiSettings5Fill, className: "text-neutral-500" },
];
