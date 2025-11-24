import React, { useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Camera, X } from 'lucide-react';

interface WebcamCaptureProps {
    onCapture: (file: File) => void;
    onCancel: () => void;
}

const WebcamCapture: React.FC<WebcamCaptureProps> = ({ onCapture, onCancel }) => {
    const webcamRef = useRef<Webcam>(null);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
            fetch(imageSrc)
                .then(res => res.blob())
                .then(blob => {
                    const file = new File([blob], "webcam-capture.jpg", { type: "image/jpeg" });
                    onCapture(file);
                });
        }
    }, [webcamRef, onCapture]);

    return (
        <div className="relative bg-black rounded-xl overflow-hidden shadow-lg group">
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="w-full h-64 object-cover"
                videoConstraints={{
                    width: 1280,
                    height: 720,
                    facingMode: "user"
                }}
            />

            {/* Overlay Controls */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                <div className="flex justify-center gap-4 items-center">
                    <button
                        onClick={onCancel}
                        className="p-3 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm transition"
                        title="Cancel"
                    >
                        <X size={20} />
                    </button>

                    <button
                        onClick={capture}
                        className="p-4 rounded-full bg-white text-primary-600 hover:bg-neutral-100 shadow-lg transition transform active:scale-95 border-4 border-primary-500/30"
                        title="Capture Photo"
                    >
                        <Camera size={28} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WebcamCapture;
