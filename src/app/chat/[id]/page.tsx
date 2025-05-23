"use client";
import AvatarGroup from "@/components/avatar-group";
import ChatInnerLayout from "@/components/layout-chat";
import MessageInput from "@/components/message-input";
import { supabase } from "@/utils/supabaseClient";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BsStars } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import { BiCheckDouble } from "react-icons/bi";

interface Message {
  id: string;
  chatId: string;
  content: string;
  createdAt: string;
  senderId: string;
  senderName: string;
  isGroupChat?: boolean;
  seen?: boolean;
}

export default function Page() {
  const { id: chatId } = useParams();
  const searchParams = useSearchParams();
  const username = searchParams.get("username");
  const isGroup = searchParams.get("isGroup");
  const avatar = searchParams.get("avatar");
  const [userId, setUserId] = useState("");

  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  // send message fn
  const sendMessage = async () => {
    const newMessage = {
      id: "",
      content: messageInput,
      createdAt: new Date().toISOString(),
      senderName: username ?? "",
      senderId: userId,
      chatId: chatId as string,
      isGroupChat: isGroup === "true",
      seen: false,
    };

    setMessages((prevMsgs) => [...prevMsgs, newMessage]);

    const { error } = await supabase.from("messages").insert([
      {
        chat_id: chatId,
        content: messageInput,
        sender_id: userId,
      },
    ]);

    if (error) {
      alert("some error occured during sending message");
      setMessages((prev) =>
        [...prev].filter((msg) => msg.content !== messageInput)
      );
      console.error("Couldn't send message");
    }

    setMessageInput("");
  };

  // getting the user id
  useEffect(() => {
    const getUserId = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user?.id) setUserId(user.id);
    };

    getUserId();
  }, []);

  // getting existing messages on page load
  useEffect(() => {
    const getMessages = async () => {
      const { data } = await supabase
        .from("messages")
        .select(
          `
              id,
              chat_id,
              content,
              created_at,
              sender_id,
              users:sender_id (
                id,
                username
              )
            `
        )
        .eq("chat_id", chatId);

      if (data) {
        const existingMessages = data.map((msg) => {
          const user = msg.users as unknown as { id: string; username: string };

          return {
            id: msg.id,
            content: msg.content,
            createdAt: new Date(msg.created_at).toISOString(),
            senderName: user.username,
            senderId: user.id,
            chatId: msg.chat_id,
            isGroupChat: isGroup === "true",
          };
        });

        setMessages(existingMessages);
      }
    };
    getMessages();
  }, []);

  // listening for real time updates
  useEffect(() => {
    if (!userId || !chatId) return;

    const channel = supabase
      .channel("realtime-messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `chat_id=eq.${chatId}`,
        },
        async (payload) => {
          const newMsg = payload.new;

          if (newMsg.sender_id === userId) {
            console.log("I'm the sender, ignoring realtime message.");
            return;
          }

          const { data } = await supabase
            .from("users")
            .select("username")
            .eq("id", newMsg.sender_id)
            .single();

          const message = {
            id: newMsg.id,
            content: newMsg.content,
            createdAt: new Date(newMsg.created_at).toISOString(),
            senderName: data?.username || "Unknown",
            senderId: newMsg.sender_id,
            chatId: newMsg.chat_id,
            isGroupChat: isGroup === "true",
          };

          setMessages((prev) => [...prev, message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [chatId, userId]);

  // useeffect for scroll into view when new message comes
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <ChatInnerLayout>
      {/* Chat top bar */}
      <div className="w-full h-14 flex items-center justify-between p-1.5 px-3 border-b border-b-neutral-300">
        <div className="w-1/2 flex items-center justify-start space-x-2.5">
          {avatar ? (
            <Image
              src={avatar}
              alt="User avatar"
              width={40}
              height={40}
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <span className="w-8 h-8 bg-neutral-300 rounded-full text-white flex items-center justify-center">
              {username?.charAt(0).toUpperCase()}
            </span>
          )}
          <div className="flex flex-col items-start">
            <h3 className="font-semibold text-md">{username}</h3>
            {isGroup && (
              <p className="text-neutral-400 text-xs font-medium">
                Participant details...
              </p>
            )}
          </div>
        </div>
        <div className="w-1/2 flex items-center justify-end space-x-5">
          <AvatarGroup />
          <button>
            <BsStars className="w-4 h-4 rotate-180" />
          </button>
          <button>
            <IoSearch className="w-4 h-4" />
          </button>
        </div>
      </div>
      {/* chat area */}
      <div className="w-full h-[calc(100vh-240px)] flex flex-col gap-2 p-4 bg-[url('/bg-chat.png')] bg-cover overflow-y-scroll">
        {messages.map((msg, index) => {
          const isSender = msg.senderId === userId;

          return (
            <div
              key={index}
              className={`max-w-[50%] px-4 py-2 rounded-lg ${
                isSender ? "rounded-tr-none" : "rounded-tl-none"
              }  shadow-md ${
                isSender
                  ? "bg-[#E0F5CA] text-black self-end"
                  : "bg-white text-gray-900 self-start"
              }`}
            >
              {msg.isGroupChat && !isSender && (
                <p className="text-xs font-semibold text-green-500 mb-1">
                  {msg.senderName}
                </p>
              )}
              <p>{msg.content}</p>
              <div className="flex items-center justify-end mt-1">
                <p className="text-xs text-gray-400 text-right">
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                {!msg.isGroupChat && isSender && (
                  <BiCheckDouble
                    className={`w-4 h-4 ml-1 ${
                      msg.seen ? "text-neutral-500" : "text-blue-500"
                    }`}
                  />
                )}
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Message input */}
      <MessageInput
        message={messageInput}
        setMessage={setMessageInput}
        sendMessage={sendMessage}
      />
    </ChatInnerLayout>
  );
}
