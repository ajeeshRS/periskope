"use client";

import { supabase } from "@/utils/supabaseClient";
import { useEffect } from "react";
import ChatInnerLayout from "@/components/layout-chat";
import { useRouter } from "next/navigation";
export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      console.log(session?.user);
      if (!session?.user) {
        router.push("/login");
      }
    };
    getUser();
  }, []);
  return <ChatInnerLayout />;
}
