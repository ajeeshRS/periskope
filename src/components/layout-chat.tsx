"use client";

import { ReactNode, useEffect, useState } from "react";
import ChatCard from "@/components/chat-card";
import SearchDialog from "@/components/search-dialog";
import NewChatDialog from "@/components/new-chat-dialog";
import { HiFolderArrowDown } from "react-icons/hi2";
import { IoClose, IoFilterSharp } from "react-icons/io5";
import { supabase } from "@/utils/supabaseClient";

export interface User {
  id: string;
  email: string;
  avatar: string;
  username: string;
}

export interface ChatUser {
  user_id: string;
  users: User;
}

export interface Chat {
  id: string;
  chat_name: string | null;
  chat_users: ChatUser[];
  is_group_chat: boolean;
}

export interface ChatResponse {
  chat_id: string;
  chats: Chat;
}

export default function ChatInnerLayout({
  children,
}: {
  children?: ReactNode;
}) {
  const [chats, setChats] = useState<ChatResponse[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const [loading, setLoading] = useState(true);

  // fetching chats for the user
  useEffect(() => {
    const fetchChats = async () => {
      setLoading(true);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        return console.error("Error getting user : ", userError);
      }
      setCurrentUserId(user?.id ?? "");

      const { data, error } = await supabase
        .from("chat_users")
        .select(
          `
            chat_id,
            chats (
              id,
              chat_name,
              is_group_chat,
              chat_users (
                user_id,
                users (
                  id,
                  username,
                  email,
                  avatar
                )
              )
            )
        `
        )
        .eq("user_id", user?.id);

      if (error) {
        console.error("error fetching chats : ", error);
      }

      console.log({ chatData: data });
      // @ts-expect-error: some type issue regarding chat  is object/arr
      setChats(data ?? []);
      setLoading(false);
    };
    fetchChats();
  }, []);

  return (
    <main className="w-full h-[calc(100vh-56px)] flex items-center relative">
      {/* Sidebar */}
      <section className="w-2/6 h-full overflow-y-scroll relative border-r border-r-neutral-300">
        {/* top section */}
        <div className="w-full flex items-center justify-between px-3 bg-neutral-50 h-14">
          <div className="flex items-center space-x-2">
            <button className="flex items-center text-green-600 font-semibold">
              <HiFolderArrowDown className="w-4 h-4 mr-1" />
              <span>Custom filter</span>
            </button>
            <button className="rounded border border-neutral-300 px-2 py-1 text-sm">
              Save
            </button>
          </div>
          <div className="flex items-center space-x-3">
            <SearchDialog />
            <div className="relative">
              <button className="rounded flex items-center border border-neutral-300 px-2 py-1 text-green-600 p-0.5 font-semibold text-sm">
                <IoFilterSharp className="w-4 h-4 mr-1" />
                <span>Filtered</span>
              </button>
              <IoClose className="text-white bg-green-600 p-0.5 rounded-full absolute -top-1.5 -right-1.5 w-4 h-4" />
            </div>
          </div>
        </div>
        {/* chats */}
        <div className="w-full h-[calc(100vh-112px)] flex flex-col items-start justify-start overflow-y-scroll scroll-smooth">
          {loading ? (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-sm text-neutral-400 font-medium">Loading...</p>
            </div>
          ) : chats.length > 0 ? (
            chats.map((chat) => {
              const otherUsers = chat.chats.chat_users
                .filter(
                  (cu: { user_id: string }) => cu.user_id !== currentUserId
                )
                .map(
                  (cu: {
                    users: {
                      id: string;
                      username: string;
                      email: string;
                      avatar: string;
                    };
                  }) => cu.users
                );

              return (
                <ChatCard
                  key={chat.chat_id}
                  chatId={chat.chat_id}
                  isGroup={chat.chats.is_group_chat}
                  groupName={chat.chats.chat_name}
                  users={otherUsers}
                />
              );
            })
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-sm text-neutral-400 font-medium">
                Start a new conversation to see here
              </p>
            </div>
          )}
        </div>

        <NewChatDialog />
      </section>

      {/* chat content */}
      <section className="w-[calc(4/6*100%-60px)]  h-full flex flex-col">
        {children ? (
          children
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-sm text-neutral-400 font-medium">
              Open a chat to see messages here
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
