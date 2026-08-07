import type { Metadata } from "next";

import { createClient } from "@repo/supabase/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Heading,
} from "@repo/ui";

import { ProfileForm } from "@/components/profile-form";

export const metadata: Metadata = {
  title: "Settings",
};

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name")
    .eq("id", user?.id ?? "")
    .maybeSingle();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Heading level={1}>Settings</Heading>
        <p className="mt-2 text-slate-600">
          Manage your account details.
        </p>
      </div>

      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            How your name appears across Ti Kloud apps.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm initialName={profile?.display_name ?? ""} />
        </CardContent>
      </Card>
    </div>
  );
}
