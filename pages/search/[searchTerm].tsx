import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { BASE_URL } from "@/utils";
import { GoVerified } from "react-icons/go";
import { IUser, Video } from "@/types";
import NoResults from "@/components/NoResults";
import VideoCard from "@/components/VideoCard";
import useAuthStore from "@/store/authStore";
const Search = ({ videos }: { videos: Video[] }) => {
  const [isAccounts, setIsAccounts] = useState(false);
  const router = useRouter();
  const { searchTerm }: any = router.query;
  const { allUsers } = useAuthStore();

  const accounts = isAccounts ? "border-b-2 border-black" : "text-gray-400";
  const isVideos = !isAccounts ? "border-b-2 border-black" : "text-gray-400";

  const searchAccounts = allUsers?.filter((user: IUser) =>
    user?.userName?.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  console.log(searchAccounts);

  return (
    <div className="w-full">
      <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${accounts}`}
          onClick={() => setIsAccounts(true)}
        >
          Accounts
        </p>
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${isVideos}`}
          onClick={() => setIsAccounts(false)}
        >
          Videos
        </p>
      </div>

      {isAccounts ? (
        <div className="flex flex-col gap-6 md:justify-start md:mt-16">
          {searchAccounts?.length ? (
            searchAccounts?.map((user: IUser, idx: number) => (
              <Link href={`/profile/${user._id}`} key={idx}>
                <div className="flex gap-3 p-2 font-semibold rounded border-b-2 border-gray-200 cursor-pointer">
                  <div>
                    <Image
                      src={user?.image}
                      width={50}
                      height={50}
                      className="rounded-full"
                      alt="user Profile"
                    />
                  </div>
                  <div className="block">
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
            ))
          ) : (
            <NoResults text={`No accounts found for ${searchTerm}`} />
          )}
        </div>
      ) : (
        <div className="md:mt-16 flex flex-wrap gap-6 md:justify-start">
          {videos?.length ? (
            videos?.map((video: Video, idx) => (
              <VideoCard key={idx} post={video} />
            ))
          ) : (
            <NoResults text={`No video results for ${searchTerm}`} />
          )}
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

  return {
    props: {
      videos: res.data,
    },
  };
};

export default Search;
