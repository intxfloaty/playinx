import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Input } from "./chakraExports";
import Drawer from "../components/Drawer";
import { createServerSupabaseClient } from "../serverSupabaseClient";

export default async function Page() {
  const supabase = createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/sign-in");
  }
  return (
    <Drawer>
      
    </Drawer>
  )
}
