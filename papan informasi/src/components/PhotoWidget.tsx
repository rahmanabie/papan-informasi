import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Image } from 'lucide-react';

const defaultImages = [
  'https://images.unsplash.com/photo-1579389083046-e3df9c2b3325?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1611348586804-61bf6c080437?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80'
];

const PhotoWidget: React.FC = () => {
  const [images, setImages] = useState<string[]>(() => {
    const savedImages = localStorage.getItem('infoboard-images');
    return savedImages ? JSON.parse(savedImages) : defaultImages;
  });
  
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    // Auto-rotate images every 5 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [images.length]);
  
  useEffect(() => {
    localStorage.setItem('infoboard-images', JSON.stringify(images));
  }, [images]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          const newImages = [...images, e.target.result.toString()];
          setImages(newImages);
          setCurrentIndex(newImages.length - 1);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white/30 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
      <div className="p-3 bg-white/30 flex justify-between items-center">
        <h2 className="text-lg font-semibold flex items-center">
          <Image className="mr-2" /> Galeri Foto
        </h2>
        <div>
          <label htmlFor="image-upload" className="bg-purple-500 text-white p-1 rounded-full hover:bg-purple-600 transition cursor-pointer inline-block">
            <Image className="w-5 h-5" />
            <input 
              id="image-upload" 
              type="file" 
              accept="image/*" 
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>
        </div>
      </div>
      
      <div className="aspect-video relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {images.length > 0 ? (
            <img 
              src={images[currentIndex]} 
              alt="Gallery Image" 
              className="w-full h-full object-cover transition-opacity duration-500"
            />
          ) : (
            <div className="text-gray-400 flex flex-col items-center">
              <Image className="w-12 h-12 mb-2" />
              <p>No images available</p>
            </div>
          )}
        </div>
        
        {images.length > 1 && (
          <>
            <button 
              onClick={handlePrevious}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={handleNext}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
        
        {images.length > 1 && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
            {images.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full ${idx === currentIndex ? 'bg-white' : 'bg-white/50'}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoWidget;
