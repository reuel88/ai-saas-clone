import { HeadingContext } from "@/components/heading";
import { VideoForm } from "./_components/video-form";

export default function VideoPage() {
  return (
    <div>
      <HeadingContext id="video" />

      <div className="px-4 lg:px-8">
        <VideoForm />
      </div>
    </div>
  );
}
