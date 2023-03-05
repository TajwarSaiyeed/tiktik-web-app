import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import useAuthStore from "@/store/authStore";
import { IUser } from "@/types";

const SuggestedAccounts = () => {
  const { allUsers, fetchAllUsers } = useAuthStore();
  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);
  return (
    <div className="xl:border-b-2 border-gray-200 pb-4">
      <p className="text-gray-500 font-semibold hidden xl:block m-3 mt-4">
        Suggested Accounts
      </p>
      <div>
        {allUsers.slice(0, 5).map((user: IUser) => (
          <Link href={`/profile/${user?._id}`} key={user?._id}>
            <div className="flex gap-3 rounded p-2 hover:bg-primary cursor-pointer font-semibold">
              <div className="w-8 h-8">
                <Image
                  src={user?.image || "/assets/person/noAvatar.png"}
                  width={34}
                  height={34}
                  className="rounded-full"
                  layout="responsive"
                  alt="user Profile"
                />
              </div>
              <div className="hidden xl:block">
                <p className="gap-1 flex items-center text-md font-bold text-primary lowercase">
                  {user.userName.replaceAll(" ", "")}
                  <GoVerified className="text-blue-400" />
                </p>
                <p className="text-gray-400 text-xs capitalize">
                  {user.userName}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SuggestedAccounts;
