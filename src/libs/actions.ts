"use server";

import { createClient } from "@supabase/supabase-js";

export const handleAuthCallback = async (user: {
  id: string;
  email: string;
  avatar: string;
  username: string;
  accessToken: string;
}) => {
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      },
    }
  );

  // check if the user already exists
  const { data: existingUser, error: fetchError } = await supabase
    .from("users")
    .select("*", { head: false })
    .eq("id", user.id)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") {
    // PGRST116 - no rows found err code
    console.error("Error checking user:", fetchError.message);
    throw new Error("Failed to fetch user");
  }


  if (!existingUser) {
    const { error: insertError } = await supabase.from("users").insert({
      id: user.id,
      email: user.email,
      username: user.username,
      avatar: user.avatar,
    });

    if (insertError) {
      console.error("Error inserting user:", insertError.message);
      throw new Error("Failed to insert user");
    }
  }

  return { ok: true };
};
