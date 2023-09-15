import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Tournament from "./components/Tournament";

const page = async ({ params }: { params: { team: string } }) => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({cookies: () => cookieStore  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/sign-in");
  }
  return <Tournament user = {user} />;
};

export default page;
