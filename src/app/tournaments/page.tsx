import React from "react";
import { redirect } from "next/navigation";
import Drawer from "../../components/Drawer";
import { createServerSupabaseClient } from "../../serverSupabaseClient";
import TournamentList from "./TournamentList";

async function page() {
  const supabase = createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/sign-in");
  }
  return (
    <Drawer user={user} TITLE="TOURNAMENTS">
      <TournamentList user={user} />
    </Drawer>
  );
}

export default page;
