import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="text-3xl">
      Hello
      <div>
        <Link href={"/dashboard"}>
          <Button variant={"destructive"}>Click</Button>
        </Link>
        <UserButton />
      </div>
    </div>
  );
}
