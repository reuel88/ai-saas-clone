import { HeadingContext } from "@/components/heading";
import { CodeForm } from "./_components/code-form";

export default function CodePage() {
  return (
    <div>
      <HeadingContext id="code" />

      <div className="px-4 lg:px-8">
        <CodeForm />
      </div>
    </div>
  );
}
