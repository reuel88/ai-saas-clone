import { CreateCourseForm } from "./_components/create-course-form";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

export default async function CreatePage() {
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription("CreatePage")();

  return <CreateCourseForm apiLimitCount={apiLimitCount} isPro={isPro} />;
}
