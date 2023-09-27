import React from "react";
import { redirect } from "next/navigation";
import Drawer from "../../components/Drawer";
import { createServerSupabaseClient } from "../../serverSupabaseClient";
import Tournaments from "./Tournaments";

async function page() {
  const supabase = createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/sign-in");
  }
  return (
    <Drawer user={user} TITLE="Tournaments">
      <Tournaments user={user} />
    </Drawer>
  );
}

export default page;
