import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { topics } from "@/utils/constants";

const Discover = () => {
  const router = useRouter();

  const { topic } = router.query;

  const activeTopicStyle =
    "xl:border-2 hover:bg-primary xl:border-[#f51997] px-3 py-2 rounded cursor-pointer xl:rounded-full flex items-center justify-center gap-2 text-[#f51997]";
  const topicStyle =
    "xl:border-2 hover:bg-primary xl:border-gray-300 px-3 py-2 rounded cursor-pointer xl:rounded-full flex items-center justify-center gap-2 text-black";

  return (
    <div className="xl:border-b-2 xl:border-gray-200 pb-6">
      <p className="text-gray-500 font-semibold m-3 mt-4 hidden xl:block">
        Popular Topics
      </p>
      <div className="flex gap-3 flex-wrap">
        {topics?.map((item, _) => (
          <Link key={_} href={`/?topic=${item.name}`}>
            <div
              className={topic === item.name ? activeTopicStyle : topicStyle}
            >
              <span className="font-bold text-2xl xl:text-md">{item.icon}</span>
              <span className="font-medium hidden xl:block text-md capitalize">
                {item.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Discover;
