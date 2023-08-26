import { HeadingContext } from "@/components/heading";
import { MusicForm } from "./_components/music-form";

export default function MusicPage() {
  return (
    <div>
      <HeadingContext id="music" />

      <div className="px-4 lg:px-8">
        <MusicForm />
      </div>
    </div>
  );
}
