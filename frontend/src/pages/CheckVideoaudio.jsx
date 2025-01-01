import { useState, useRef } from "react";
import Webcam from "react-webcam";
import RecordRTC from "recordrtc";

export const CheckVideoAudio = () => {
  const webcamRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [videoURL, setVideoURL] = useState(null);
  const [recorder, setRecorder] = useState(null);

  const startRecording = () => {
    if (webcamRef.current && webcamRef.current.stream) {
      const videoStream = webcamRef.current.stream;
      const newRecorder = new RecordRTC(videoStream, {
        type: "video",
        mimeType: "video/webm",
        canvas: { width: 640, height: 480 },
      });

      newRecorder.startRecording();
      setRecorder(newRecorder);
      setIsRecording(true);
      console.log("Recording started");
    }
  };

  const stopRecording = () => {
    if (recorder) {
      recorder.stopRecording(() => {
        const blob = recorder.getBlob();
        const videoUrl = URL.createObjectURL(blob);
        setVideoURL(videoUrl);
        setIsRecording(false);
        console.log("Recording stopped");
      });
    }
  };

  return (
    <div>
      <h2>Check Video and Audio</h2>
      <Webcam
        ref={webcamRef}
        audio={true}
        video="true"
        width="640"
        height="480"
        videoConstraints={{ facingMode: "user" }}
      />
      <div>
        {!isRecording ? (
          <button onClick={startRecording}>Start Recording</button>
        ) : (
          <button onClick={stopRecording}>Stop Recording</button>
        )}
      </div>
      {videoURL && (
        <div>
          <video controls src={videoURL} />
        </div>
      )}
    </div>
  );
};
