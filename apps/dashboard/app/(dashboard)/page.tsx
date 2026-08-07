import { createClient } from "@repo/supabase/server";
import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Heading,
} from "@repo/ui";
import { Activity, Database, Users } from "@repo/ui/icons";

export default async function OverviewPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const displayName =
    user?.user_metadata.full_name ?? user?.email?.split("@")[0] ?? "there";

  const stats = [
    { label: "Team members", value: "—", icon: Users },
    { label: "Databases", value: "—", icon: Database },
    { label: "Active services", value: "—", icon: Activity },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <Heading level={1} className="capitalize">
            Welcome, {displayName}
          </Heading>
          <p className="mt-2 text-slate-600">
            Here&apos;s what&apos;s happening across Ti Kloud.
          </p>
        </div>
        <Badge variant="success">Active</Badge>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        {stats.map(({ label, value, icon: Icon }) => (
          <Card key={label}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Icon className="size-4 text-brand-600" />
                {label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold text-slate-900">{value}</p>
              <p className="mt-1 text-sm text-slate-500">
                Waiting for your first data.
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
