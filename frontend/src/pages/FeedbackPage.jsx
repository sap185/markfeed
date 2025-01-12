import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { IoVideocamOutline } from "react-icons/io5";
import { BiMessageAltEdit } from "react-icons/bi";
import { useReactMediaRecorder } from "react-media-recorder";

const FeedbackPage = () => {
    const { spaceId } = useParams();
    const [spaceDetails, setSpaceDetails] = useState(null);
    const [error, setError] = useState("");
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    // React Media Recorder Hooks
    const {
        startRecording,
        stopRecording,
        previewStream,
        mediaBlobUrl,
        clearBlobUrl,
    } = useReactMediaRecorder({ video: true, audio: true });

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
                            onClick={() => setIsPopupOpen(true)}
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

                    {/* Popup for Video Recording */}
                    {isPopupOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg p-6 w-11/12 md:w-2/3 lg:w-1/2 shadow-lg">
                                <h3 className="text-2xl font-bold text-gray-700 mb-4">Record Your Feedback</h3>

                                {/* Video Preview during Recording */}
                                {previewStream && (
                                    <video
                                        srcObject={previewStream}
                                        autoPlay
                                        controls={false}
                                        className="border-4 border-gray-300 rounded-lg shadow-md w-full"
                                    ></video>
                                )}

                                {/* Video Preview after Recording */}
                                {mediaBlobUrl && (
                                    <video
                                        src={mediaBlobUrl}
                                        controls
                                        className="border-4 border-gray-300 rounded-lg shadow-md w-full mt-4"
                                    ></video>
                                )}

                                <div className="flex justify-end gap-4 mt-4">
                                    {!mediaBlobUrl && (
                                        <button
                                            onClick={startRecording}
                                            className="bg-green-500 hover:bg-green-800 text-white py-2 px-4 rounded"
                                        >
                                            Start Recording
                                        </button>
                                    )}
                                    {!mediaBlobUrl && (
                                        <button
                                            onClick={stopRecording}
                                            className="bg-red-500 hover:bg-red-800 text-white py-2 px-4 rounded"
                                        >
                                            Stop Recording
                                        </button>
                                    )}
                                    {mediaBlobUrl && (
                                        <button
                                            onClick={() => {
                                                const a = document.createElement("a");
                                                a.href = mediaBlobUrl;
                                                a.download = "feedback-recording.webm";
                                                a.click();
                                                clearBlobUrl();
                                            }}
                                            className="bg-blue-500 hover:bg-blue-800 text-white py-2 px-4 rounded"
                                        >
                                            Download Recording
                                        </button>
                                    )}
                                    <button
                                        onClick={() => setIsPopupOpen(false)}
                                        className="bg-gray-500 hover:bg-gray-800 text-white py-2 px-4 rounded"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <p className="text-gray-600">Loading space details...</p>
            )}
        </div>
    );
};

export default FeedbackPage;
