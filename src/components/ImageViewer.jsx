import React from 'react';
import { HiX, HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import { BiZoomIn, BiZoomOut, BiReset, BiRotateRight, BiExpandVertical, BiExpandHorizontal } from 'react-icons/bi';

export default function ImageViewer({ 
  isOpen, 
  onClose, 
  currentImage, 
  onNext, 
  onPrev,
  totalImages,
  currentIndex
}) {
  if (!isOpen) return null;

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
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
        <button className="p-2 rounded-full hover:bg-white/20 transition-colors">
          <BiZoomOut className="w-5 h-5 text-white" />
        </button>
        <button className="p-2 rounded-full hover:bg-white/20 transition-colors">
          <BiZoomIn className="w-5 h-5 text-white" />
        </button>
        <button className="p-2 rounded-full hover:bg-white/20 transition-colors">
          <BiReset className="w-5 h-5 text-white" />
        </button>
        <button className="p-2 rounded-full hover:bg-white/20 transition-colors">
          <BiRotateRight className="w-5 h-5 text-white" />
        </button>
        <button className="p-2 rounded-full hover:bg-white/20 transition-colors">
          <BiExpandHorizontal className="w-5 h-5 text-white" />
        </button>
        <button className="p-2 rounded-full hover:bg-white/20 transition-colors">
          <BiExpandVertical className="w-5 h-5 text-white" />
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
          className="max-h-[85vh] max-w-[85vw] object-contain"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
}
