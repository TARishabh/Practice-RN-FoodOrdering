import { createClient } from "https://esm.sh/@supabase/supabase-js@2.42.0";
import {stripe} from "./stripe.ts"


export const createOrRetrieveProfile = async (req: Request) => {
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    {
      global: {
        headers: { Authorization: req.headers.get("Authorization")! },
      },
    },
  );
  // Now we can get the session or user object
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  console.log(user?.id);
  if (!user) throw new Error("No user found");

  const { data: profile, error } = supabaseClient.from("profile")
    .select("*")
    .eq("id", user?.id)
    .single();
  if (error || !profile) {
    throw new Error("profile not found");
  }
  if (profile.stripe_customer_id){
    return profile.stripe_customer_id
  }

  const customer = await stripe.customers.create({
    email: user?.email,
    metadata: {uid: user?.id},
  })
  console.log(customer)
};
