"use client";

import { supabase } from "@/utils/supabaseClient";
import { useEffect } from "react";

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
    <div className="w-screen h-screen flex items-center justify-center">
      <p>Home page</p>
    </div>
  );
}
