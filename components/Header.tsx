import { authOptions } from "@/lib/authConfig";
import { getServerSession } from "next-auth";
import Button from "./Button";

const Header = async () => {
  const session = await getServerSession(authOptions);
  const formatName = (name: string) => {
    return name.split("")[0].toUpperCase();
  };
  const userName = session.user.name;
  return (
    <div className="relative">
      <div className="absolute right-0 w-8 h-8 flex items-center justify-center rounded-full bg-[#751f9a] text-white">
        {formatName(userName)}
      </div>
      <Button />
    </div>
  );
};

export default Header;
