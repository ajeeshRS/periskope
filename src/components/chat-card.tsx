import Image from "next/image";
import { useRouter } from "next/navigation";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoVolumeMute } from "react-icons/io5";
interface ChatCardProps {
  chatId: string;
  isGroup: boolean;
  groupName: string | null;
  users: {
    id: string;
    username: string;
    avatar?: string;
  }[];
}
export default function ChatCard({
  chatId,
  isGroup,
  groupName,
  users,
}: ChatCardProps) {
  const name = isGroup ? groupName : users[0]?.username || "Unknown User";
  const router = useRouter();

  return (
    <div
      className="w-full flex items-center hover:bg-neutral-100 p-3 space-x-3"
      onClick={() =>
        router.push(
          `/chat/${chatId}?username=${name}&isGroupChat=${isGroup}&avatar=${users[0].avatar}`
        )
      }
    >
      {/* Avatar */}
      <div className="flex w-fit h-full items-start">
        <Image
          src={users[0].avatar || ""}
          alt="User avatar"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full"
        />
      </div>
      <div className="flex-1 flex-col items-start h-full justify-between">
        {/* Chat name */}
        <div className="w-full flex items-center justify-between mb-1">
          <h3 className="font-bold">{name}</h3>
          <div className="flex items-center space-x-2">
            <span>
              <IoVolumeMute className="w-5 h-5 text-neutral-400" />
            </span>
            <span className="text-xs px-2 py-1.5 rounded-md bg-amber-700/5 text-amber-600 font-semibold">
              Demo
            </span>
            <span className="text-xs px-2 py-1.5 rounded-md bg-red-700/5 text-red-600 font-semibold">
              Demo
            </span>
          </div>
        </div>
        {/* last msg and unread count */}
        <div className={`w-full flex items-center justify-between`}>
          <p className="text-sm font-medium text-neutral-400">Recent message here</p>

          <span className="text-xs p-2 w-4 h-4 rounded-full bg-green-500 text-white font-semibold flex items-center justify-center">
            5
          </span>
        </div>
        {/* infos */}
        <div
          className={`w-full flex items-center ${
            isGroup ? "justify-between" : "justify-end"
          }`}
        >
          {isGroup && (
            <div className="flex items-center bg-neutral-100 text-neutral-400 w-fit h-fit px-2 py-1 mt-2 rounded-md text-[10px]">
              <BsFillTelephoneFill className="w-2 h-2 mr-1" />
              <span className="font-semibold">+91 9111111111 +1</span>
            </div>
          )}
          <p className="text-neutral-400 font-medium text-xs">Yesterday</p>
        </div>
      </div>
    </div>
  );
}
