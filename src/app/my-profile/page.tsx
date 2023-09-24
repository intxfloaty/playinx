import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Drawer from "../../components/Drawer";
import MyProfile from "./components/MyProfile";
import { createServerSupabaseClient } from "../../serverSupabaseClient";

async function page() {
  const supabase = createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/sign-in");
  }
  return (
    <Drawer user={user}>
      <MyProfile user={user} />
    </Drawer>
  );
}

export default page;
