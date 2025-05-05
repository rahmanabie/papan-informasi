import React, { useState } from 'react';
import { Link, Youtube } from 'lucide-react';

const VideoWidget: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState("https://www.youtube.com/embed/dQw4w9WgXcQ");
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [inputValue, setInputValue] = useState("");

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
      <div className="p-3 bg-white/30 flex justify-between items-center">
        <h2 className="text-lg font-semibold flex items-center">
          <Youtube className="mr-2" /> Video
        </h2>
        <button 
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="bg-blue-500 text-white p-1 rounded-full hover:bg-blue-600 transition"
        >
          <Link className="w-5 h-5" />
        </button>
      </div>
      
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
      </div>
    </div>
  );
};

export default VideoWidget;
