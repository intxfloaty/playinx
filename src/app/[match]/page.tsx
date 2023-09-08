import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Match from "./components/Match";
import { createServerSupabaseClient } from "../../serverSupabaseClient";

const page = async ({ params }: { params: { match: string } }) => {
  const supabase = createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/sign-in");
  }
  return <Match user = {user} />;
};

export default page;
