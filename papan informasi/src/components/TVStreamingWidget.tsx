import React, { useState, useEffect } from 'react';
import { Link } from 'lucide-react';

interface TVStreamingWidgetProps {
  defaultStreamUrl: string;
  showControls: boolean;
}

const TVStreamingWidget: React.FC<TVStreamingWidgetProps> = ({ 
  defaultStreamUrl, 
  showControls 
}) => {
  const [streamUrl, setStreamUrl] = useState(defaultStreamUrl);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // Function to convert YouTube watch URLs to embed URLs
  const formatYouTubeUrl = (url: string): string => {
    // Check if it's a YouTube URL
    if (url.includes('youtube.com/watch') || url.includes('youtu.be/')) {
      let videoId = '';
      
      // Extract video ID from youtube.com/watch?v=ID format
      if (url.includes('youtube.com/watch')) {
        const urlObj = new URL(url);
        videoId = urlObj.searchParams.get('v') || '';
      } 
      // Extract video ID from youtu.be/ID format
      else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1]?.split('?')[0] || '';
      }
      
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }
    
    // Return original URL if not a YouTube URL or couldn't extract ID
    return url;
  };

  useEffect(() => {
    setStreamUrl(formatYouTubeUrl(defaultStreamUrl));
  }, [defaultStreamUrl]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue) {
      setStreamUrl(formatYouTubeUrl(inputValue));
      setShowUrlInput(false);
      setInputValue("");
    }
  };

  return (
    <div className="rounded-xl shadow-lg overflow-hidden">
      {/* Control button positioned absolutely in the corner */}
      {showControls && (
        <button 
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="absolute top-2 right-2 z-10 bg-blue-500 text-white p-1 rounded-full hover:bg-blue-600 transition"
        >
          <Link className="w-5 h-5" />
        </button>
      )}
      
      <div className="aspect-video relative">
        {showUrlInput ? (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center p-4">
            <form onSubmit={handleSubmit} className="w-full max-w-md">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Enter streaming URL (HLS, DASH, etc.)"
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
          streamUrl.includes('.m3u8') ? (
            // HLS Stream
            <video 
              className="w-full h-full" 
              controls 
              autoPlay
              playsInline
            >
              <source src={streamUrl} type="application/x-mpegURL" />
              Your browser does not support HLS streaming.
            </video>
          ) : (
            // Iframe for YouTube and other streaming services
            <iframe
              src={streamUrl}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="TV Streaming"
            />
          )
        )}
      </div>
    </div>
  );
};

export default TVStreamingWidget;
