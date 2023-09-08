import React from "react";
import Team from "../components/Team";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const page = async ({ params }: { params: { team: string } }) => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({cookies: () => cookieStore  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/sign-in");
  }
  return <Team />;
};

export default page;
