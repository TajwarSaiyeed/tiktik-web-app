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
  return (
    <>
      <h1>Profile</h1>
    </>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: {
    id: string;
  };
}) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${id}`);

  return {
    props: {
      data: res.data,
    },
  };
};

export default Profile;
