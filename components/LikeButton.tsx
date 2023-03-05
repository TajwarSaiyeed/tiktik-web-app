import React, { useState, useEffect } from "react";
import { MdFavorite } from "react-icons/md";
import useAuthStore from "@/store/authStore";

interface IProps {
  handleLike: () => void;
  handleDislike: () => void;
  likes: any[];
}

const LikeButton = ({ handleLike, handleDislike, likes }: IProps) => {
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const { userProfile }: any = useAuthStore();
  const filterLikes = likes?.filter((like) => like._ref === userProfile?._id);

  useEffect(() => {
    filterLikes?.length > 0 ? setAlreadyLiked(true) : setAlreadyLiked(false);
  }, [likes, filterLikes]);

  return (
    <div className="flex gap-6">
      <div className="flex mt-4 flex-col justify-center items-center cursor-pointer">
        {alreadyLiked ? (
          <div
            onClick={handleDislike}
            className="bg-primary rounded-full p-2 md:p-4 text-[#F51997]"
          >
            <MdFavorite className="text-lg md:text-2xl" />
          </div>
        ) : (
          <div
            onClick={handleLike}
            className="bg-primary rounded-full p-2 md:p-4"
          >
            <MdFavorite className="text-lg md:text-2xl" />
          </div>
        )}
        <p className="text-md font-semibold">{likes?.length || 0}</p>
      </div>
    </div>
  );
};

export default LikeButton;
