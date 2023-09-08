import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import MatchOfficial from "./components/MatchOfficial";
import { createServerSupabaseClient } from "../../serverSupabaseClient";

const page = async ({ params }: { params: { team: string } }) => {
  const supabase = createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/sign-in");
  }
  return <MatchOfficial />;
};

export default page;
