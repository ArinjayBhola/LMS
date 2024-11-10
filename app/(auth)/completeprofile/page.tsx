import ProfileForm from "@/components/ProfileForm";
import { authOptions } from "@/lib/authConfig";
import { getServerSession } from "next-auth";

const Page = async () => {
  const session = await getServerSession(authOptions);

  return <ProfileForm session={session} />;
};

export default Page;
