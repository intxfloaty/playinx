import React from "react";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "../../../serverSupabaseClient";
import Tournament from "./Tournament";

const page = async ({ params }: { params: { match: string } }) => {
  const supabase = createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/sign-in");
  }
  return <Tournament />;
};

export default page;
