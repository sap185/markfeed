import { useState, useEffect } from "react";
import { ReactMediaRecorder } from "react-media-recorder";

const CheckVideoaudio = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaBlobUrl, setMediaBlobUrl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    console.log("Closing modal...");
    setIsModalOpen(false);
    setMediaBlobUrl(null);
    window.location.reload(); // Reload the page
  };

  const handleReRecord = (startRecording) => {
    closeModal(); // Close the modal and reload the page
    setTimeout(() => {
      startRecording(); // Start recording after reload
      setIsRecording(true);
    }, 100); // Small delay to ensure state updates
  };

  useEffect(() => {
    if (mediaBlobUrl) {
      openModal(); // Open modal when a recording is available
    }
  }, [mediaBlobUrl]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-500">
      <h1 className="text-xl font-semibold mb-4">Video & Audio Recorder</h1>
      <ReactMediaRecorder
        video
        audio
        render={({ status, startRecording, stopRecording, mediaBlobUrl, previewStream }) => (
          <div className="w-full max-w-md p-4 bg-white shadow-md rounded-md">
            <p className="text-center text-gray-600 mb-4">{`Status: ${status}`}</p>
            <div className="flex flex-col items-center mb-4">
              {previewStream && (
                <video
                  autoPlay
                  muted
                  ref={(video) => {
                    if (video) video.srcObject = previewStream; // Show live preview
                  }}
                  className="w-full h-auto rounded-md mb-4"
                />
              )}
              {isRecording ? (
                <button
                  onClick={() => {
                    stopRecording();
                    setIsRecording(false);
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600"
                >
                  Stop Recording
                </button>
              ) : (
                <button
                  onClick={() => {
                    startRecording();
                    setIsRecording(true);
                  }}
                  className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600"
                >
                  Start Recording
                </button>
              )}
            </div>
            {status === "stopped" && setMediaBlobUrl(mediaBlobUrl)}
          </div>
        )}
      />

      {isModalOpen && (
        <div className="relative inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-black rounded-lg shadow-lg w-1/2 h-1/2 p-4 relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>
            <h2 className="text-center text-lg font-semibold mb-4">Recorded Video</h2>
            {mediaBlobUrl ? (
              <video className="w-full h-auto rounded-md" src={mediaBlobUrl} controls style={{ maxHeight: "200px" }} />
            ) : (
              <p className="text-center text-gray-600">No video available.</p>
            )}
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => handleReRecord(() => setIsRecording(true))}
                className="px-3 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
              >
                Re-record
              </button>
              <button className="px-3 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600">Submit</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CheckVideoaudio;
