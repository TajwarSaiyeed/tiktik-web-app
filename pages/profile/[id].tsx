import { useState, useEffect } from "react";
import { GoVerified } from "react-icons/go";
import { IUser, Video } from "@/types";
import { BASE_URL } from "@/utils";
import Image from "next/image";
import NoResults from "@/components/NoResults";
import axios from "axios";

interface IProps {
  data: {
    user: IUser;
    userVideos: Video[];
    userLikedVideos: Video[];
  };
}

const Profile = ({ data }: IProps) => {
  const { user, userLikedVideos, userVideos } = data;

  return (
    <div className="w-full">
      <div className="flex gap-6 md:gap-10 mb-4 bg-white w-full">
        <div className="w-16 h-16 md:w-32 md:h-32 ">
          <Image
            src={user?.image || "/assets/person/noAvatar.png"}
            width={120}
            height={120}
            className="rounded-full"
            layout="responsive"
            alt="user Profile"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="gap-1 flex items-center justify-center text-md font-bold text-primary lowercase md:text-2xl tracking-wider">
            {user?.userName?.replaceAll(" ", "")}
            <GoVerified className="text-blue-400" />
          </p>
          <p className="text-gray-400 md:text-xl text-xs capitalize">
            {user?.userName}
          </p>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${id}`);

  return {
    props: {
      data: res.data,
    },
  };
};

export default Profile;
