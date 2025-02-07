import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { IoVideocamOutline } from "react-icons/io5";
import { BiMessageAltEdit } from "react-icons/bi";
import CheckVideoaudio from "./CheckVideoaudio";

const FeedbackPage = () => {
    const { spaceId } = useParams();
    const [spaceDetails, setSpaceDetails] = useState(null);
    const [error, setError] = useState("");
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => setIsPopupOpen(false);

    useEffect(() => {
        if (spaceId) {
            axiosInstance
                .get(`/api/get-space-details-for-feedback/${spaceId}`)
                .then((response) => {
                    setSpaceDetails(response.data.space);
                })
                .catch((err) => {
                    setError(err.response?.data?.message || "An error occurred while fetching details.");
                });
        }
    }, [spaceId]);

    if (error) {
        return <div className="text-red-600 text-center mt-4">{error}</div>;
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen text-center pt-16">
            {spaceDetails ? (
                <div className="flex flex-col items-center">
                    <img
                        src={spaceDetails.spaceImage}
                        alt={spaceDetails.spaceImage || "Default Space Avatar"}
                        className="w-60 h-32 rounded-lg border-4 border-gray-300 shadow-md object-cover"
                    />
                    <h2 className="text-4xl text-gray-600 font-bold mb-4 mx-5 my-5">{spaceDetails.headerName}</h2>
                    <p className="text-gray-500 mb-4 mx-20 font-semibold text-lg">{spaceDetails.description}</p>
                    <h3 className="text-gray-500 mb-4 mx-20 font-semibold text-lg text-left">
                        <span className="text-purple-500">Questions:</span>
                        <p>[ {spaceDetails.question1} ]</p>
                        <p>[ {spaceDetails.question2} ]</p>
                    </h3>

                    <div className="flex flex-wrap gap-4 text-gray-200 p-2 justify-center">
                        <button
                            onClick={openPopup}
                            className="flex items-center gap-2 bg-blue-500 hover:bg-purple-500 text-white py-2 px-4 rounded"
                        >
                            <IoVideocamOutline />
                            <span>Record a Video</span>
                        </button>
                        <button className="flex items-center gap-2 bg-gray-500 hover:bg-gray-800 text-white py-2 px-4 rounded">
                            <BiMessageAltEdit />
                            <span>Write Feedback as Text</span>
                        </button>
                    </div>

                    {isPopupOpen && (
                        <div className="relative inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                            <div className="w-1/2 h-1/2 bg-white p-4 rounded-lg shadow-lg">
                                <button
                                    onClick={closePopup}
                                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                                >
                                    ✖
                                </button>
                                <h2 className="text-center text-lg font-semibold mb-4">Video Recorder</h2>
                                <CheckVideoaudio onClose={closePopup} />
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <p>Loading space details...</p>
            )}
        </div>
    );
};

export default FeedbackPage;
