import React from "react";
import { redirect } from "next/navigation";
import Drawer from "../../components/Drawer";
import { createServerSupabaseClient } from "../../serverSupabaseClient";
import EventsList from "./EventsList";

async function page() {
  const supabase = createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/sign-in");
  }
  return (
      <EventsList user={user} />
  );
}

export default page;
