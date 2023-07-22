import Image from "next/image";

type EmptyProps = {
  label: string;
};

const Empty: FC<EmptyProps> = ({ label }) => {
  return (
    <div className="flex h-full flex-col items-center justify-center p-20">
      <div className="relative h-72 w-72">
        <Image src="/images/empty.png" fill alt="Empty" />
      </div>
      <p className="text-center text-sm text-muted-foreground">{label}</p>
    </div>
  );
};

export default Empty;
