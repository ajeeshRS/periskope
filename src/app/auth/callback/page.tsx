"use client";

import { handleAuthCallback } from "@/libs/actions";
import { supabase } from "@/utils/supabaseClient";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleLogin = async () => {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session) {
        console.error("Failed to get session", sessionError);
        return;
      }

      const user = session.user;

      await handleAuthCallback({
        id: user.id,
        email: user.email ?? "",
        username: user.user_metadata.full_name ?? "",
        avatar: user.user_metadata.avatar_url ?? "",
        accessToken: session.access_token ?? "",
      });

      router.push("/");
    };

    handleLogin();
  }, []);
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <p className="font-semibold text-neutral-600 text-xl">
        Logging you in...
      </p>
    </div>
  );
}
