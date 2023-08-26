import { HeadingContext } from "@/components/heading";
import { ImageForm } from "./_components/image-form";

export default function ImagePage() {
  return (
    <div>
      <HeadingContext id="image" />

      <div className="px-4 lg:px-8">
        <ImageForm />
      </div>
    </div>
  );
}
