import axiosInstance from "../api/axios";
import HomeNav from "../components/HomeNav";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";


const SpacePage = () => {
    const [spaceImage, setSpaceImage] = useState("");
    const [spaceHeading, setSpaceHeading] = useState("");
    const [spaceCreationTime, setSpaceCreationTime] = useState("");

    useEffect(() => {
        const fetchSpaceImage = async () => {
            const response = await axiosInstance.get(`/api/get-space-details?userId=${Cookies.get("userId")}`);
            // response.data.spaceImage && setSpaceImage(response.data.spaceImage);
            if (response.data.space.spaceImage) {
                const fixedSpaceImage = response.data.space.spaceImage.split("https://res.cloudinary.com")[1];
                setSpaceImage(`https://res.cloudinary.com${fixedSpaceImage}`);
            }
            // console.log(response.data);
            response.data.space.headerName && setSpaceHeading(response.data.space.headerName);
            response.data.space.createdAt && setSpaceCreationTime(response.data.space.createdAt.split("T")[0]);
        }
        fetchSpaceImage();
    }, [])


    return (
        <div className="flex flex-col bg-gray-50 min-h-screen">
            <HomeNav />
            <div className="flex flex-col items-center py-10 px-6">
                <div className="flex flex-col md:flex-row items-center gap-6 bg-white shadow-md rounded-lg p-6 w-full max-w-4xl">
                    <img
                        src={spaceImage}
                        alt="Space Avatar"
                        className="float-left w-32 h-32 rounded-lg border-4 border-gray-300 shadow-md"
                    />
                    <div className="text-left">
                        <h2 className="text-3xl font-bold text-gray-800">
                            {spaceHeading || "Space Name"}
                        </h2>
                        <p className="text-sm text-gray-500 mt-2">
                            Created on: <span className="font-medium">{spaceCreationTime || "DD-MM-YYYY"}</span>
                        </p>
                    </div>
                </div>

                <hr className="border-2 border-gray-300 my-8 w-full max-w-4xl" />
                <div className="text-center px-4 max-w-4xl">
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Welcome to your space! Here you can explore and manage your saved content.
                    </p>
                    <hr className="border-2 border-purple-300 mx-auto my-5 w-1/3" />
                    <div className="flex justify-center gap-4 mt-5">
                        <button className="bg-purple-500 text-white px-5 py-2 rounded-lg hover:bg-purple-600 transition-all">
                            All
                        </button>
                        <button className="bg-purple-500 text-white px-5 py-2 rounded-lg hover:bg-purple-600 transition-all">
                            Liked
                        </button>
                        <button className="bg-purple-500 text-white px-5 py-2 rounded-lg hover:bg-purple-600 transition-all">
                            Spam
                        </button>
                    </div>
                </div>

                {/* user's feedback collection or Routing to the userlinked space to give feedback */}
                <div className="border-4 border-dashed border-purple-500 rounded-lg w-full max-w-4xl mt-10 bg-white shadow-sm p-6">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col md:flex-row items-center bg-gray-100 shadow-lg rounded-lg p-6">
                            <div className="flex flex-col text-left">
                                <h3 className="text-2xl font-bold text-gray-800">
                                    Hero Card Title
                                </h3>
                                <p className="text-gray-600 mt-2">
                                    This is a detailed description of the hero card. It spans the entire width of the container and includes an image on the left.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default SpacePage;