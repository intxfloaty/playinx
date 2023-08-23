import React from "react";
import ProfileWorkflow from "./components/ProfileWorkflow";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function page() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const getProfile = async () => {
    const myUserId = user.id;
    let { data: profiles, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", `${myUserId}`);

    if (profiles && error === null) {
      return profiles;
    }
  };

  const profiles = await getProfile();

  if (!user) {
    redirect("/auth/sign-in");
  }

  if (profiles.length !== 0) {
    redirect("/");
  }

  return <ProfileWorkflow />;
}

export default page;
