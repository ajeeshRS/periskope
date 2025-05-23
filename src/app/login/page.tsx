"use client";

import { supabase } from "@/utils/supabaseClient";
import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

const signInWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${location.origin}/auth/callback`,
    },
  });

  if (error) {
    console.error("google login error : ", error);
  }
};

export default function Login() {
  return (
    <main className="w-screen h-screen flex items-center justify-center">
      <section className="md:w-2/8 w-5/6 flex flex-col items-center justify-start space-y-6">
        <header className="flex flex-col items-center space-y-6">
          <Image
            src={"/logo.svg"}
            alt="periskope-logo"
            width={50}
            height={50}
            className="w-20 h-20"
          />
          <h1 className="font-bold font-geist text-xl text-neutral-600">
            Log in to Periskope
          </h1>
        </header>
        <button
          className="w-full flex items-center justify-center border py-2 rounded-md border-neutral-300 hover:bg-neutral-50 cursor-pointer ease text-neutral-700 font-medium md:text-base text-sm"
          onClick={signInWithGoogle}
        >
          <FcGoogle className="md:w-6 w-5 md:h-6 h-5 mr-2" />
          Continue with Google
        </button>
        <hr className="w-full border-t-1 border-t-neutral-300" />
        <form className="w-full flex flex-col space-y-3">
          <input
            type="text"
            placeholder="Enter your email address"
            className="w-full border border-neutral-300 text-center py-3 rounded-md placeholder:text-slate-500 focus:ring-2 focus:ring-[#16803C] focus:outline-none placeholder:md:text-base placeholder:text-sm"
          />
          <button className="w-full border text-center py-3 rounded-md border-neutral-300 hover:bg-neutral-50 cursor-pointer ease text-neutral-700 font-semibold md:text-base text-sm">
            Continue with Email
          </button>
        </form>
        <p className="md:text-sm text-xs text-neutral-500 mt-10 text-center">
          By signing up, you agree to Periskope&apos;s <br />
          <Link href={""} className="underline">
            Terms of service
          </Link>{" "}
          and {""}
          <Link href={""} className="underline">
            Privacy Policy
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
