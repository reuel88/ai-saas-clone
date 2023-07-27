import { ReactNode } from "react";

type LandingLayoutProps = {
  children: ReactNode;
};

const LandingLayout = ({ children }: LandingLayoutProps) => {
  return (
    <main className="h-full overflow-auto bg-[#111827]">
      <div className="mx-auto h-full w-full max-w-screen-xl">{children}</div>
    </main>
  );
};

export default LandingLayout;
