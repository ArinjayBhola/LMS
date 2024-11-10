import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { authOptions } from "@/lib/authConfig";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2 border border-gray-300 border-r-4 p-4 shadow-lg">
        <Sidebar />
      </div>
      <div className="col-span-10">
        <div className="flex flex-col">
          <div className="border border-gray-300 border-b-4 p-4 shadow-lg">
            <Header />
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default layout;
