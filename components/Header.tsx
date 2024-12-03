import { authOptions } from "@/lib/authConfig";
import { getServerSession } from "next-auth";
import Button from "./Button";

const Header = async () => {
  const session = await getServerSession(authOptions);
  const formatName = (name: string) => {
    return name.split("")[0].toUpperCase();
  };
  const userName = session.user.name;
  const userRole = session.user.role;

  return (
    <div className="flex items-center justify-between p-4 bg-gray-100">
      <div className="flex items-center space-x-4">
        <p className="text-gray-600">{userRole} Mode</p>
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#751f9a] text-white">
          {formatName(userName)}
        </div>
      </div>
      <Button />
    </div>
  );
};

export default Header;
