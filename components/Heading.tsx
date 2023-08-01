import { LucideIcon } from "lucide-react";
import { FC } from "react";
import { cn } from "@/lib/utils";

type HeadingProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
  bgColor?: string;
};

const Heading: FC<HeadingProps> = ({
  title,
  description,
  icon: Icon,
  iconColor,
  bgColor,
}) => {
  return (
    <div className="my-8 flex items-center gap-x-3 px-4 lg:px-8">
      <div className={cn("w-fit rounded-md p-2", bgColor)}>
        <Icon className={cn("h-10 w-10", iconColor)} />
      </div>
      <div>
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default Heading;
