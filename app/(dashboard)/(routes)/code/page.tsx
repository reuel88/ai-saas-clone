import { Heading } from "@/components/heading";
import { routes } from "@/constants";

import { CodeForm } from "./_components/code-form";

export default function CodePage() {
  const headingData: any = routes.find((route) => route.id === "code");

  return (
    <div>
      <Heading
        title={headingData.label}
        description={headingData.description}
        icon={headingData.icon}
        iconColor={headingData.color}
        bgColor={headingData.bgColor}
      />

      <div className="px-4 lg:px-8">
        <CodeForm />
      </div>
    </div>
  );
}
