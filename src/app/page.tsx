import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Input } from "./chakraExports";
import Drawer from "../components/Drawer";
import { createServerSupabaseClient } from "../serverSupabaseClient";
import Home from "./Home";

export default async function Page() {
  const supabase = createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("name,phone")
    .eq("user_id", `${user?.id}`);

  const { data: teams } = await supabase
    .from("teams")
    .select("*")
    .or(`team_admin.eq.${user?.id},players.cs.{${user?.id}}`);


  if (!user) {
    redirect("/auth/sign-in");
  }
  return (
    <Drawer user={user} profiles={profiles} teams={teams}>
      <Home user={user} />
    </Drawer>
  )
}
