import { rightSidebarItems } from "@/constants/sidebar.constants";

export default function RightSidebar() {
  return (
    <aside className="w-[60px] h-[calc(100vh-56px)] border-l border-neutral-300 flex flex-col justify-between items-center absolute right-0 bottom-0 py-4 px-3 bg-white">
      <nav>
        <ul className="pt-7 space-y-3 w-full flex flex-col items-center">
          {rightSidebarItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <li
                key={index}
                className="p-2 hover:bg-neutral-100 rounded-lg ease"
              >
                <Icon className={`w-5 h-5 text-neutral-400`} />
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
