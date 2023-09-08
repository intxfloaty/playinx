import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import SignIn from "./SignIn";
import { createServerSupabaseClient } from "../../../serverSupabaseClient";

export default async function SignInPage() {
  const supabase = createServerSupabaseClient()
  const { data } = await supabase.auth.getSession();

  if (data?.session) {
    redirect("/");
  }

  return <SignIn />;
}
