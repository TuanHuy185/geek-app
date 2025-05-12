import React, { useState } from 'react';
import { HiX, HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import { BiZoomIn, BiZoomOut, BiRotateRight, BiRotateLeft } from 'react-icons/bi';
import { RiFlipHorizontalFill, RiFlipVerticalFill } from 'react-icons/ri';

export default function ImageViewer({ 
  isOpen, 
  onClose, 
  currentImage, 
  onNext, 
  onPrev,
  totalImages,
  currentIndex
}) {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [flipHorizontal, setFlipHorizontal] = useState(false);
  const [flipVertical, setFlipVertical] = useState(false);
  const [fitVertical, setFitVertical] = useState(false);
  const [fitHorizontal, setFitHorizontal] = useState(false);
  const minScale = 1;
  const maxScale = 3;
  const scaleStep = 0.2;

  if (!isOpen) return null;

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const zoomIn = () => {
    if (scale < maxScale) {
      setScale(prev => Math.min(maxScale, prev + scaleStep));
    }
  };

  const zoomOut = () => {
    if (scale > minScale) {
      setScale(prev => Math.max(minScale, prev - scaleStep));
    }
  };

  const resetZoom = () => {
    setScale(1);
  };
  
  const rotateLeft = () => {
    setRotation(prev => (prev - 90) % 360);
  };
  
  const rotateRight = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const toggleFlipHorizontal = () => {
    setFlipHorizontal(prev => !prev);
  };

  const toggleFlipVertical = () => {
    setFlipVertical(prev => !prev);
  };
  

  return (
    <div className="fixed inset-0 z-50 bg-black/40" onClick={handleBackgroundClick}>
      <div className="absolute right-4 top-4">
        <button onClick={onClose} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
          <HiX className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-white/80">
        {currentIndex + 1} / {totalImages}
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/30 px-4 py-2 rounded-full">
        <button 
          onClick={toggleFlipHorizontal} 
          className={`p-2 rounded-full transition-colors ${
            flipHorizontal ? 'bg-white/30' : 'hover:bg-white/20'
          }`}
        >
          <RiFlipHorizontalFill className="w-5 h-5 text-white" />
        </button>
        <button 
          onClick={toggleFlipVertical} 
          className={`p-2 rounded-full transition-colors ${
            flipVertical ? 'bg-white/30' : 'hover:bg-white/20'
          }`}
        >
          <RiFlipVerticalFill className="w-5 h-5 text-white" />
        </button>
        <button 
          onClick={rotateLeft} 
          className="p-2 rounded-full hover:bg-white/20 transition-colors"
        >
          <BiRotateLeft className="w-5 h-5 text-white" />
        </button>
        <button 
          onClick={rotateRight} 
          className="p-2 rounded-full hover:bg-white/20 transition-colors"
        >
          <BiRotateRight className="w-5 h-5 text-white" />
        </button>
        <button 
          onClick={zoomOut} 
          disabled={scale <= minScale}
          className={`p-2 rounded-full transition-colors ${
            scale <= minScale ? 'cursor-not-allowed opacity-50' : 'hover:bg-white/20'
          }`}
        >
          <BiZoomOut className="w-5 h-5 text-white" />
        </button>
        <button 
          onClick={zoomIn}
          disabled={scale >= maxScale}
          className={`p-2 rounded-full transition-colors ${
            scale >= maxScale ? 'cursor-not-allowed opacity-50' : 'hover:bg-white/20'
          }`}
        >
          <BiZoomIn className="w-5 h-5 text-white" />
        </button>

      </div>

      <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between">
        <button 
          onClick={onPrev}
          disabled={currentIndex === 0}
          className={`p-2 rounded-full transition-colors ${
            currentIndex === 0 
              ? 'bg-white/5 cursor-not-allowed' 
              : 'bg-white/10 hover:bg-white/20'
          }`}
        >
          <HiArrowLeft className={`w-6 h-6 ${currentIndex === 0 ? 'text-white/40' : 'text-white'}`} />
        </button>
        <button 
          onClick={onNext}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <HiArrowRight className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className="flex items-center justify-center h-full">
        <img
          src={currentImage}
          alt="Preview"
          className={`transition-all duration-200 ${
            fitVertical ? 'h-[85vh] w-auto' : 
            fitHorizontal ? 'w-[85vw] h-auto' : 
            'max-h-[85vh] max-w-[85vw] object-contain'
          }`}
          style={{ 
            transform: `scale(${flipHorizontal ? '-' : ''}${scale}, ${flipVertical ? '-' : ''}${scale}) rotate(${rotation}deg)`,
            transformOrigin: 'center'
          }}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
}
