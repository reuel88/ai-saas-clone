import { Chapter, Unit } from "@prisma/client";

type Props = {
  chapter: Chapter;
  unit: Unit;
  unitIndex: number;
  chapterIndex: number;
};

export const MainVideoSummary = ({
  unit,
  unitIndex,
  chapter,
  chapterIndex,
}: Props) => {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm uppercase text-muted-foreground">
          Unit {unitIndex + 1} &bull; Chapter {chapterIndex + 1}
        </h4>
        <h1 className="text-4xl font-bold">{chapter.name}</h1>
      </div>

      <iframe
        title="chapter video"
        className="aspect-video w-full"
        src={`https://www.youtube.com/embed/${chapter.videoId}`}
        allowFullScreen
      />
      <div className="space-y-2">
        <h3 className="text-3xl font-semibold">Summary</h3>
        <p className="text-secondary-foreground/80">{chapter.summary}</p>
      </div>
    </div>
  );
};
