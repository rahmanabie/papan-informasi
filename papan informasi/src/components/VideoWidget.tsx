import React, { useState, useEffect } from 'react';
import { Link } from 'lucide-react';

interface VideoWidgetProps {
  defaultVideoUrl: string;
  showControls: boolean;
}

const VideoWidget: React.FC<VideoWidgetProps> = ({ defaultVideoUrl, showControls }) => {
  const [videoUrl, setVideoUrl] = useState(defaultVideoUrl);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setVideoUrl(defaultVideoUrl);
  }, [defaultVideoUrl]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue) {
      // Convert YouTube watch URL to embed URL if needed
      if (inputValue.includes('youtube.com/watch?v=')) {
        const videoId = new URLSearchParams(new URL(inputValue).search).get('v');
        setVideoUrl(`https://www.youtube.com/embed/${videoId}`);
      } else {
        setVideoUrl(inputValue);
      }
      setShowUrlInput(false);
      setInputValue("");
    }
  };

  return (
    <div className="bg-white/30 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
      <div className="aspect-video relative">
        {showUrlInput ? (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center p-4">
            <form onSubmit={handleSubmit} className="w-full max-w-md">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Enter YouTube URL or embed URL"
                  className="flex-1 p-2 rounded-l border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <button 
                  type="submit"
                  className="bg-blue-500 text-white px-4 rounded-r hover:bg-blue-600"
                >
                  Set
                </button>
              </div>
            </form>
          </div>
        ) : (
          <iframe
            src={videoUrl}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Video Widget"
          />
        )}
        
        {showControls && (
          <button 
            onClick={() => setShowUrlInput(!showUrlInput)}
            className="absolute top-2 right-2 bg-blue-500 text-white p-1 rounded-full hover:bg-blue-600 transition z-10"
          >
            <Link className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoWidget;
