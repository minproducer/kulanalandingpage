import { useState, useEffect } from 'react';
import type { Project } from '../data/projectsData';

interface ProjectDetailModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectDetailModal = ({ project, isOpen, onClose }: ProjectDetailModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);
  
  // Get all images (main image + gallery)
  const allImages = [project.image, ...(project.imageGallery || [])];

  useEffect(() => {
    // Reset to first image when modal opens
    if (isOpen) {
      setCurrentImageIndex(0);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLightboxOpen) {
        // Lightbox keyboard controls
        if (e.key === 'Escape') {
          setIsLightboxOpen(false);
        } else if (e.key === 'ArrowLeft') {
          setLightboxImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
        } else if (e.key === 'ArrowRight') {
          setLightboxImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
        }
      } else if (isOpen) {
        // Modal keyboard controls
        if (e.key === 'Escape') {
          onClose();
        } else if (e.key === 'ArrowLeft') {
          setCurrentImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
        } else if (e.key === 'ArrowRight') {
          setCurrentImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isLightboxOpen, allImages.length, onClose]);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  const openLightbox = (index: number) => {
    setLightboxImageIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const handleLightboxPrev = () => {
    setLightboxImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleLightboxNext = () => {
    setLightboxImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-navy/80 hover:bg-navy text-white rounded-full transition-all duration-200 backdrop-blur-sm"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[90vh] custom-scrollbar">
          {/* Image Gallery Section */}
          <div className="relative bg-gray-900">
            <div className="relative h-96">
              <img
                src={allImages[currentImageIndex]}
                alt={`${project.name} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover cursor-zoom-in"
                onClick={() => openLightbox(currentImageIndex)}
              />
              
              {/* Image Navigation Arrows */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/90 hover:bg-white text-navy rounded-full transition-all duration-200 shadow-lg"
                    aria-label="Previous image"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/90 hover:bg-white text-navy rounded-full transition-all duration-200 shadow-lg"
                    aria-label="Next image"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}

              {/* Image Counter */}
              {allImages.length > 1 && (
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-accent backdrop-blur-sm">
                  {currentImageIndex + 1} / {allImages.length}
                </div>
              )}
            </div>

            {/* Thumbnail Strip */}
            {allImages.length > 1 && (
              <div className="flex gap-2 p-4 overflow-x-auto bg-gray-800">
                {allImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      index === currentImageIndex
                        ? 'border-gold scale-105'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Lightbox for Full Size Images */}
          {isLightboxOpen && (
            <div 
              className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-sm"
              onClick={closeLightbox}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-200 backdrop-blur-sm"
                aria-label="Close lightbox"
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Image Container */}
              <div 
                className="relative max-w-7xl max-h-[90vh] w-full mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={allImages[lightboxImageIndex]}
                  alt={`${project.name} - Full Size Image ${lightboxImageIndex + 1}`}
                  className="w-full h-full object-contain"
                />

                {/* Navigation Arrows */}
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={handleLightboxPrev}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-200 backdrop-blur-sm"
                      aria-label="Previous image"
                    >
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={handleLightboxNext}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-200 backdrop-blur-sm"
                      aria-label="Next image"
                    >
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-accent backdrop-blur-sm">
                  {lightboxImageIndex + 1} / {allImages.length}
                </div>
              </div>

              {/* Click outside hint */}
              <div className="absolute bottom-6 right-6 text-white/60 text-sm font-accent">
                Press ESC or click outside to close
              </div>
            </div>
          )}

          {/* Project Details Section */}
          <div className="p-8">
            {/* Header */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="font-serif text-4xl font-bold text-text-primary mb-2">
                    {project.name}
                  </h2>
                  <div className="flex items-center gap-4 text-text-secondary">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="font-sans">{project.location}</span>
                    </div>
                    {project.completionDate && (
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="font-sans">{project.completionDate}</span>
                      </div>
                    )}
                  </div>
                </div>
                <span className={`px-4 py-2 rounded-full font-accent font-semibold text-sm ${
                  project.status === 'Completed' 
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {project.status}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="font-serif text-2xl font-bold text-text-primary mb-4">
                Project Overview
              </h3>
              <p className="font-sans text-lg text-text-secondary leading-relaxed">
                {project.detailDescription || project.description}
              </p>
            </div>

            {/* Project Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {project.clientName && (
                <div className="p-4 bg-ivory rounded-lg">
                  <h4 className="font-accent font-semibold text-sm text-gold mb-1">CLIENT</h4>
                  <p className="font-sans text-lg text-text-primary">{project.clientName}</p>
                </div>
              )}
              {project.size && (
                <div className="p-4 bg-ivory rounded-lg">
                  <h4 className="font-accent font-semibold text-sm text-gold mb-1">SIZE</h4>
                  <p className="font-sans text-lg text-text-primary">{project.size}</p>
                </div>
              )}
            </div>

            {/* Specifications */}
            {project.specifications && project.specifications.length > 0 && (
              <div className="mb-8">
                <h3 className="font-serif text-2xl font-bold text-text-primary mb-4">
                  Specifications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.specifications.map((spec, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <svg className="w-5 h-5 text-gold flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="font-accent font-semibold text-text-primary">{spec.key}</p>
                        <p className="font-sans text-text-secondary">{spec.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #bc934a;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a07b3a;
        }
      `}</style>
    </div>
  );
};

export default ProjectDetailModal;
