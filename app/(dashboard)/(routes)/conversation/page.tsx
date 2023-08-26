import { HeadingContext } from "@/components/heading";
import { ConversationForm } from "./_components/conversation-form";

export default function ConversationPage() {
  return (
    <div>
      <HeadingContext id="conversation" />

      <div className="px-4 lg:px-8">
        <ConversationForm />
      </div>
    </div>
  );
}
