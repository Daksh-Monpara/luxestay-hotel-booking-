
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageCarouselProps {
  images: string[];
  alt: string;
  className?: string;
  imageClassName?: string;
  onImageClick?: () => void;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ 
  images, 
  alt, 
  className = "", 
  imageClassName = "",
  onImageClick 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className={`relative group/carousel ${className}`}>
      <img 
        src={images[currentIndex]} 
        alt={alt} 
        className={`w-full h-full object-cover transition-transform duration-500 ${imageClassName}`}
        onClick={onImageClick}
      />
      
      {images.length > 1 && (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/carousel:opacity-100 transition-opacity pointer-events-none" />
          
          <button 
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2.5 bg-white/90 backdrop-blur-sm rounded-full text-teal-900 shadow-lg opacity-0 group-hover/carousel:opacity-100 transition-all hover:bg-white hover:scale-110 active:scale-95 z-10 border border-stone-100"
            aria-label="Previous image"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-white/90 backdrop-blur-sm rounded-full text-teal-900 shadow-lg opacity-0 group-hover/carousel:opacity-100 transition-all hover:bg-white hover:scale-110 active:scale-95 z-10 border border-stone-100"
            aria-label="Next image"
          >
            <ChevronRight size={20} />
          </button>
          
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                className={`h-1.5 rounded-full shadow-sm transition-all duration-300 ${idx === currentIndex ? 'bg-white w-6' : 'bg-white/40 w-2 hover:bg-white/80'}`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageCarousel;
