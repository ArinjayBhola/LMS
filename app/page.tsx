import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="text-3xl">
      Hello
      <div>
        <Button variant={"destructive"}>Click</Button>
        <UserButton />
      </div>
    </div>
  );
}
