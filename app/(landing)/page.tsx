import { NextPage } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const LandingPage: NextPage = () => {
  return (
    <div>
      Landing Page
      <div>
        <Link href="/sign-in">
          <Button type="button">Login</Button>
        </Link>

        <Link href="/sign-up">
          <Button type="button">Register</Button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
