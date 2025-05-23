import Image from "next/image";
import {
  HiOutlineEmojiHappy,
  HiOutlineClock,
  HiOutlineRefresh,
  HiOutlineSparkles,
  HiMicrophone,
  HiOutlineSelector,
} from "react-icons/hi";
import { IoSend } from "react-icons/io5";
import { GrAttachment } from "react-icons/gr";
import { BsFillFileTextFill } from "react-icons/bs";

interface MessageProps {
  message: string;
  setMessage: (value: string) => void;
  sendMessage: () => void;
}

export default function MessageInput({
  message,
  setMessage,
  sendMessage,
}: MessageProps) {
  return (
    <div className="w-full bg-white border-t h-26 border-gray-100 border-r border-t-neutral-300">
      {/* message input */}
      <div className="w-full flex items-center justify-between px-5 py-4">
        <input
          type="text"
          placeholder="Message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full text-gray-700 placeholder-gray-400 bg-transparent border-none outline-none text-base font-normal"
        />
        <button
          onClick={sendMessage}
          className="text-green-600 hover:text-green-700 transition-colors"
        >
          <IoSend className="w-6 h-6" />
        </button>
      </div>
      {/* controllers */}
      <div className="w-full flex items-center justify-between px-5">
        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-gray-900 transition-colors">
            <GrAttachment className="w-5 h-5" />
          </button>
          <button className="text-gray-600 hover:text-gray-900 transition-colors">
            <HiOutlineEmojiHappy className="w-5 h-5" />
          </button>
          <button className="text-gray-600 hover:text-gray-900 transition-colors">
            <HiOutlineClock className="w-5 h-5" />
          </button>
          <button className="text-gray-600 hover:text-gray-900 transition-colors">
            <HiOutlineRefresh className="w-5 h-5" />
          </button>
          <button className="text-gray-600 hover:text-gray-900 transition-colors">
            <HiOutlineSparkles className="w-5 h-5" />
          </button>
          <button className="text-gray-600 hover:text-gray-900 transition-colors">
            <BsFillFileTextFill className="w-5 h-5" />
          </button>
          <button className="text-gray-600 hover:text-gray-900 transition-colors">
            <HiMicrophone className="w-5 h-5" />
          </button>
        </div>
        {/* option button - demo */}
        <button className="w-40 flex items-center justify-between border border-neutral-200 px-2 rounded py-1 text-sm font-medium hover:bg-neutral-100 ease">
          <div className="flex items-center space-x-1">
            <Image
              src={"/logo.svg"}
              width={16}
              height={16}
              alt="periskope logo"
            />
            <span>Periskope</span>
          </div>
          <HiOutlineSelector className="w-4 h-4 ml-2 text-neutral-500" />
        </button>
      </div>
    </div>
  );
}
