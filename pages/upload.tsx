import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import useAuthStore from "../store/authStore";
import { client } from "@/utils/client";
import { SanityAssetDocument } from "@sanity/client";
import { topics } from "@/utils/constants";

const upload = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [videoAsset, setVideoAsset] = useState<
    SanityAssetDocument | undefined
  >();
  const [wrongFileType, setWrongFileType] = useState(false);
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState(topics[0].name);
  const [savingPost, setSavingPost] = useState(false);
  const { userProfile }: { userProfile: any } = useAuthStore();

  const uploadVideo = async (e: any) => {
    const selectedFile = e.target.files[0];
    const fileTypes = ["video/mp4", "video/webm", "video/ogg"];

    if (fileTypes.includes(selectedFile.type)) {
      client.assets
        .upload("file", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((asset) => {
          setVideoAsset(asset);
          setWrongFileType(false);
          setIsLoading(false);
          console.log(asset);
        });
    } else {
      setIsLoading(false);
      setWrongFileType(true);
    }
  };

  const handlePost = async () => {
    setSavingPost(true);

    if (caption && videoAsset?._id && category) {
      setSavingPost(true);
      const document = {
        _type: "post",
        caption,
        video: {
          _type: "file",
          asset: {
            _type: "reference",
            _ref: videoAsset?._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: "postedBy",
          _ref: userProfile?._id,
        },
        topic: category,
      };

      await axios.post("https://tiktik-web-app.vercel.app/api/post", document);
      router.push("/");
    }
  };

  return (
    <div className="flex absolute w-full h-full left-0 top-[60px] mb-10 pt-[5px] bg-[#F8F8F8] justify-center">
      <div className="bg-white xl:h-screen flex gap-6 justify-between items-center flex-wrap p-14 pt-6 rounded-lg w-[80%]">
        <div>
          <div>
            <p className="text-2xl font-bold">Upload Video</p>
            <p className="text-md text-gray-400 mt-1">
              Post a video to your account
            </p>
          </div>
          <div className="border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[360px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100">
            {isLoading ? (
              <p>Uploading...</p>
            ) : (
              <div>
                {videoAsset ? (
                  <div>
                    <video
                      src={videoAsset?.url}
                      loop
                      controls
                      className="rounded-xl h-[450px] w-full p-2 bg-black"
                    ></video>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <div className="flex flex-col justify-center items-center h-full">
                      <div className="flex flex-col justify-center items-center">
                        <p className="font-bold text-xl">
                          <FaCloudUploadAlt className="text-gray-300 text-6xl" />
                        </p>
                        <p className="text-xl font-semibold">
                          Select a video to upload
                        </p>
                      </div>
                      <p className="text-gray-400 text-center mt-10 text-sm leading-10">
                        MP4 or WebM or ogg <br /> 720x1280 or higher <br /> up
                        to 10 minutes <br /> Less then 2 GB
                      </p>
                      <p className="bg-[#f51997] text-center mt-10 rounded text-white text-md font-medium p-2 w-52 outline-none">
                        Select File
                      </p>
                    </div>
                    <input
                      type="file"
                      name="upload-video"
                      className="w-0 h-0"
                      onChange={uploadVideo}
                    />
                  </label>
                )}
              </div>
            )}
            {wrongFileType && (
              <p className="text-center text-xl text-red-400 font-semibold mt-4 w-[250px]">
                Please Select a video file
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3 pb-10">
          <label className="text-md font-medium">Caption</label>
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="rounded outline-none text-md border-2 border-gray-200 p-2"
          />

          <label className="text-md font-medium">Choose A Category</label>
          <select
            className="outline-none border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer"
            onChange={(e) => setCategory(e.target.value)}
          >
            {topics.map((topic) => (
              <option
                key={topic.name}
                className="outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300"
                value={topic.name}
              >
                {topic.name}
              </option>
            ))}
          </select>
          <div className="flex gap-6 mt-10">
            <button
              className="border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
              type="button"
            >
              Discard
            </button>
            <button
              className="bg-[#f51997] text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
              onClick={handlePost}
              type="button"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default upload;
