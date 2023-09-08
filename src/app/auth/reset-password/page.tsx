import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import ResetPassword from "./ResetPassword";
import { createServerSupabaseClient } from "../../../serverSupabaseClient";

export default async function ResetPasswordPage() {
  const supabase = createServerSupabaseClient()
  const { data } = await supabase.auth.getSession();

  if (data?.session) {
    redirect("/");
  }

  return <ResetPassword />;
}
