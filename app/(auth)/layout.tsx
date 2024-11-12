// import { authOptions } from "@/lib/authConfig";
// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";

const layout = async ({ children }: { children: React.ReactNode }) => {
  // const session = await getServerSession(authOptions);
  // if (session?.user) redirect("/");
  return <div>{children}</div>;
};

export default layout;
