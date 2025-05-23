"use client";

import { supabase } from "@/utils/supabaseClient";
import { useEffect } from "react";
import ChatInnerLayout from "@/components/layout-chat";
export default function Page() {

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      console.log(session?.user);
    };
    getUser();
  }, []);
  return <ChatInnerLayout />;
}
