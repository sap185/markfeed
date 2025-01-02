import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import RecordRTC from "recordrtc";

const CheckVideoaudio = () => {
  const webcamRef = useRef(null);
  const recorderRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setRecordedVideo(null); // Reset recorded video on close
  };

  const handleStartCaptureClick = useCallback(() => {
    if (webcamRef.current && webcamRef.current.video) {
      const stream = webcamRef.current.video.srcObject;
      setRecording(true);
      recorderRef.current = new RecordRTC(stream, {
        type: "video",
        mimeType: "video/webm",
      });
      recorderRef.current.startRecording();
    }
  }, []);

  const handleStopCaptureClick = useCallback(() => {
    if (recorderRef.current) {
      setRecording(false);
      recorderRef.current.stopRecording(() => {
        const blob = recorderRef.current.getBlob();
        const videoUrl = URL.createObjectURL(blob);
        setRecordedVideo(videoUrl);
        webcamRef.current.video.srcObject.getTracks().forEach((track) => track.stop()); // Stop webcam feed
      });
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <button
        onClick={openModal}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-200"
      >
        Record Video
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>

            {!recordedVideo ? (
              <div>
                <Webcam
                  className="w-full h-auto rounded-md"
                  audio={true}
                  mirrored={true}
                  ref={webcamRef}
                />
                <div className="flex justify-center space-x-4 mt-4">
                  {recording ? (
                    <button
                      onClick={handleStopCaptureClick}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-200"
                    >
                      Stop Recording
                    </button>
                  ) : (
                    <button
                      onClick={handleStartCaptureClick}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-200"
                    >
                      Start Recording
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <video
                  className="w-full h-auto rounded-md"
                  controls
                  src={recordedVideo}
                  autoPlay
                />
                <p className="text-center text-gray-600 mt-2">Recorded Video</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckVideoaudio;
