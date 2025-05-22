"use client";

import ChatCard from "@/components/chat-card";
import { supabase } from "@/utils/supabaseClient";
import { useEffect } from "react";
import { HiFolderArrowDown } from "react-icons/hi2";
import {
  IoSearchSharp,
  IoFilterSharp,
  IoSearch,
  IoClose,
} from "react-icons/io5";
import { BsStars } from "react-icons/bs";
import AvatarGroup from "@/components/avatar-group";
import MessageInput from "@/components/message-input";

export default function Home() {
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      console.log(session?.user);
    };
    getUser();
  }, []);

  return (
    <main className="w-full h-full flex items-center relative">
      <section className="w-2/6 h-full overflow-y-hidden">
        <div className="w-full flex items-center justify-between px-3 bg-neutral-50 h-14">
          <div className="flex items-center  space-x-2">
            <button className="flex items-center text-green-600 font-semibold">
              <HiFolderArrowDown className="w-4 h-4 mr-1 " />
              <span>Custom filter</span>
            </button>
            <button className="rounded border border-neutral-300 px-2 py-1 text-sm">
              Save
            </button>
          </div>
          <div className="flex items-center space-x-3">
            <button className="rounded flex items-center border border-neutral-300 px-2 py-1 text-sm">
              <IoSearchSharp className="w-4 h-4 mr-1" />
              <span>Search</span>
            </button>
            <div className="relative">
              <button className="rounded flex items-center border border-neutral-300 px-2 py-1 text-green-600 p-0.5 font-semibold text-sm">
                <IoFilterSharp className="w-4 h-4 mr-1" />
                <span>Filtered</span>
              </button>
              <IoClose className="text-white bg-green-600 p-0.5 rounded-full absolute -top-1.5 -right-1.5 w-4 h-4" />
            </div>
          </div>
        </div>
        <div className="w-full h-[calc(100vh-112px)] flex flex-col items-start justify-start overflow-y-scroll scroll-smooth">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 2, 2, 2, 2, 2, 2, 2].map(
            (chat, index) => (
              <ChatCard key={index} />
            )
          )}
        </div>
      </section>
      <section className="w-[calc(4/6*100%-60px)] h-full flex flex-col">
        {/* chat top bar */}
        <div className="w-full h-14  flex items-center justify-between p-1.5 px-3">
          <div className="w-1/2 flex items-center justify-start space-x-2.5">
            <span className="w-8 h-8 bg-neutral-300 rounded-full text-white flex items-center justify-center">
              A
            </span>
            <div className="flex flex-col items-start">
              <h3 className="font-semibold text-md">Test user</h3>
              <p className="text-neutral-400 text-xs font-medium">
                Rohan, Sree, Periskope, Bharath
              </p>
            </div>
          </div>
          <div className="w-1/2 flex items-center justify-end space-x-5">
            <AvatarGroup />
            <button>
              <BsStars className="w-4 h-w-4 rotate-180" />
            </button>
            <button>
              <IoSearch className="w-4 h-w-4" />
            </button>
          </div>
        </div>
        {/* chat area */}
        <div className="w-full h-full bg-[url('https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg')] object-fill"></div>
        {/* chat controllers */}
        <MessageInput />
      </section>
    </main>
  );
}
