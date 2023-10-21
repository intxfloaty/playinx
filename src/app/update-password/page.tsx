import { createServerSupabaseClient } from "../../serverSupabaseClient";
import { redirect } from 'next/navigation';
import UpdatePassword from './UpdatePassword';

export default async function UpdatePasswordPage() {
  const supabase = createServerSupabaseClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/sign-in');
  }

  return <UpdatePassword />;
}