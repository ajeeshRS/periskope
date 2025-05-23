import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { supabase } from "@/utils/supabaseClient";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TbMessageCirclePlus } from "react-icons/tb";

export interface UserProfile {
  id: string;
  email: string;
  username: string;
  avatar: string;
  created_at: string;
  updated_at: string;
}

export default function NewChatDialog() {
  const [inputValue, setInputValue] = useState("");
  const [searchResult, setSearchResult] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSearch = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .or(`username.ilike.%${inputValue}%,email.ilike.%${inputValue}%`);

      if (error) {
        console.error("Error searching the user");
      }
      console.log({ searchData: data });
      setSearchResult(data ?? []);
    } catch (err) {
      console.error("error searching user : ", err);
    } finally {
      setLoading(false);
    }
  };

  const handleMessage = async (otherUserId: string) => {
    try {
      const currentUser = (await supabase.auth.getUser()).data.user;
      if (!currentUser) return;

      const currentUserId = currentUser.id;

      const { data: existingChats, error } = await supabase
        .from("chat_users")
        .select("chat_id")
        .eq("user_id", currentUserId);

      if (error) {
        console.error("Error checking existing chats", error);
        return;
      }

      const chatIds = existingChats.map((c) => c.chat_id);

      const { data: mutualChat } = await supabase
        .from("chat_users")
        .select("chat_id")
        .in("chat_id", chatIds)
        .eq("user_id", otherUserId)
        .single();

      if (mutualChat) {
        return router.push(`/chat/${mutualChat.chat_id}`);
      }

      const { data: newChat, error: chatError } = await supabase
        .from("chats")
        .insert({
          chat_name: null,
          is_group_chat: false,
        })
        .select()
        .single();

      if (chatError || !newChat) {
        console.error("Error creating chat", chatError);
        return;
      }

      const chatId = newChat.id;

      const { error: chatUsersError } = await supabase
        .from("chat_users")
        .insert([
          { user_id: currentUserId, chat_id: chatId },
          { user_id: otherUserId, chat_id: chatId },
        ]);

      if (chatUsersError) {
        console.error("Error adding users to chat", chatUsersError);
        return;
      }

      await supabase.from("user_contacts").upsert([
        { user_id: currentUserId, contact_id: otherUserId },
        { user_id: otherUserId, contact_id: currentUserId },
      ]);

      router.push(`/chat/${chatId}`);
    } catch (err) {
      console.log("Error messaging the user : ", err);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="flex items-center justify-center bg-green-600 hover:bg-green-700 ease text-white rounded-full w-12 h-12 absolute  bottom-4 right-6">
        <TbMessageCirclePlus className="w-6 h-6" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Search for users</DialogTitle>
          <div className="flex items-center space-x-2 py-5">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="enter user email.."
              className="w-full text-gray-700 placeholder-gray-400 bg-transparent border-none outline-none text-base font-normal"
            />
            <button
              onClick={handleSearch}
              className="bg-green-600 hover:bg-green-700 ease text-white rounded-md px-2 py-1 transition-colors"
            >
              {loading ? "searching..." : "search"}
            </button>
          </div>
          {searchResult && (
            <div className="w-full px-5 flex flex-col items-start space-y-2">
              {searchResult.map((user, index) => (
                <div
                  key={index}
                  className="w-full flex items-center justify-between"
                >
                  <div className="flex items-center space-x-2">
                    <Image
                      src={user.avatar}
                      alt="user-avatar"
                      width={40}
                      height={40}
                      className="rounded-full w-10 h-10"
                    />
                    <p className="text-sm text-neutral-500 font-medium">
                      {user.username}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <button className="border-2 border-neutral-300 hover:border-green-500 text-black ease text-sm rounded-md px-2 py-1 transition-colors">
                      Add
                    </button>
                    <button
                      onClick={() => handleMessage(user.id)}
                      className="border-2 border-neutral-300 hover:border-green-500 text-black ease text-sm rounded-md px-2 py-1 transition-colors"
                    >
                      Message
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
