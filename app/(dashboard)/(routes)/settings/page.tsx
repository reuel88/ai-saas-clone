import { HeadingContext } from "@/components/heading";
import { CurrentSubscription } from "./_components/current-subscription";

export default async function SettingsPage() {
  return (
    <div>
      <HeadingContext id="settings" />
      <div className="px-4 lg:px-8">
        <CurrentSubscription />
      </div>
    </div>
  );
}
