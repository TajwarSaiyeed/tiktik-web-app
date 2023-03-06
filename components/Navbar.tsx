import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import Logo from "@/utils/tiktik-logo.png";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { createOrGetUser } from "@/utils";
import useAuthStore from "../store/authStore";
import { forwardRef } from "react";

const Navbar = forwardRef(() => {
  const { userProfile, addUser, removeUser } = useAuthStore();

  const handleSearch = () => {};

  return (
    <div className="w-full flex justify-between items-center border border-x-0 border-b-2 border-gray-200 py-2 px-4">
      <Link href="/">
        <div className="w-[100px] md:w-[130px]">
          <Image
            className="cursor-pointer"
            src={Logo}
            alt="tiktik"
            layout="responsive"
          />
        </div>
      </Link>
      <div className="relative hidden md:block">
        <form
          onSubmit={handleSearch}
          className="absolute md:static top-10 -left-20 bg-white"
        >
          <input
            type="text"
            onChange={() => {}}
            placeholder="Search accounts and videos"
            className="bg-primary md:text-md font-medium border-2 border-gray-100 p-3 rounded-full w-[300px] md:w-[350px] md:top-0 focus:outline-none focus:border-2 focus:border-gray-300"
          />
          <button
            onClick={handleSearch}
            className="absolute right-6 md:right-5 top-4 border-l-2 border-gray-300 pl-4 text-2xl"
          >
            <BiSearch />
          </button>
        </form>
      </div>
      <div>
        {userProfile ? (
          <div className="flex gap-5 md:gap-10">
            <Link href={"/upload"}>
              <button className="border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2 py-2 rounded-md hover:bg-primary hover:text-gray-600 duration-300 hover:border-black">
                <IoMdAdd className="text-2xl" />{" "}
                <span className="hidden md:block">Upload</span>
              </button>
            </Link>
            {userProfile?.image && (
              <Link href={`/profile/${userProfile?._id}`}>
                <Image
                  src={userProfile?.image}
                  width={40}
                  height={40}
                  className="rounded-full cursor-pointer"
                  alt="profile photo"
                />
              </Link>
            )}
            <button
              onClick={() => {
                googleLogout();
                removeUser();
              }}
              type="button"
              className="px-2 shadow rounded-full"
            >
              <AiOutlineLogout color="red" className="text-2xl" />
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(response) => createOrGetUser(response, addUser)}
            onError={() => console.log("error")}
          />
        )}
      </div>
    </div>
  );
});

export default Navbar;
