import React from "react";
import { redirect } from "next/navigation";
import Drawer from "../components/Drawer";
import { createServerSupabaseClient } from "../serverSupabaseClient";
import Home from "./Home";

export default async function Page() {
  const supabase = createServerSupabaseClient()

  const { data: { user } } = await supabase.auth.getUser();


  let { data: teams, error } = await supabase
    .from("teams")
    .select("*")
    .or(`team_admin.eq.${user?.id},players.cs.{${user?.id}}`);


  if (!user) {
    redirect("/auth/sign-in");
  }
  return (
    <Drawer user={user} >
      <Home user={user} myTeams={teams} />
    </Drawer>
  )
}
