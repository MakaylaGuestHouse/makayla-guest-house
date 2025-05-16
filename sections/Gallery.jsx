"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useAnimateInView } from '@/hooks/useAnimateInView';
import { animateVariants, staggerContainer } from '@/lib/constants/animation';
import { X, ChevronLeft, ChevronRight, ZoomIn, Info } from "lucide-react";

// Gallery data - Replace with your actual luxury guest house images
const galleryImages = [
  {
    id: 1,
    src: "/room11.jpg",
    alt: "Luxury Master Suite",
    category: "Suites",
    width: "wide", // wide, tall, square
    featured: true,
    description: "Our signature Presidential Suite featuring panoramic mountain views and custom furnishings"
  },
  {
    id: 2,
    src: "/room10.jpg",
    alt: "Infinity Pool",
    category: "Amenities",
    width: "square",
    featured: false,
    description: "Infinity edge pool overlooking the valley with private cabanas"
  },
  {
    id: 3,
    src: "/room12.jpg",
    alt: "Fine Dining",
    category: "Dining",
    width: "tall",
    featured: false,
    description: "Intimate dining area with locally-sourced gourmet cuisine"
  },
  {
    id: 4,
    src: "/room14.jpg",
    alt: "Garden Terrace",
    category: "Outdoor",
    width: "wide",
    featured: false,
    description: "Private garden terrace perfect for morning yoga or evening cocktails"
  },
  {
    id: 5,
    src: "/room11.jpg",
    alt: "Spa Treatment",
    category: "Wellness",
    width: "square",
    featured: true,
    description: "Holistic spa treatments using organic ingredients in a serene setting"
  },
  {
    id: 6,
    src: "/room13.jpg",
    alt: "Deluxe Suite",
    category: "Suites",
    width: "tall",
    featured: false,
    description: "Deluxe suite with king-sized canopy bed and private balcony"
  },
  {
    id: 7,
    src: "/room10.jpg",
    alt: "Lounge Area",
    category: "Common Areas",
    width: "wide",
    featured: false,
    description: "Sophisticated lounge area with fireplace and curated art collection"
  },
  {
    id: 8,
    src:"/room14.jpg",
    alt: "Breakfast View",
    category: "Dining",
    width: "square",
    featured: true,
    description: "Enjoy a gourmet breakfast with breathtaking sunrise views"
  },
  {
    id: 9,
    src: "/room13.jpg",
    alt: "Luxury Bathroom",
    category: "Suites",
    width: "square",
    featured: false,
    description: "Marble bathroom with freestanding soaking tub and premium amenities"
  }
];

const categories = ["All", ...new Set(galleryImages.map(img => img.category))];

// Lightbox component
const Lightbox = ({ image, onClose, onNext, onPrevious, currentIndex, totalImages }) => {
  useEffect(() => {
    // Disable body scroll when lightbox is open
    document.body.style.overflow = "hidden";
    
    // Handle keyboard navigation
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrevious();
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, onNext, onPrevious]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900 bg-opacity-95 p-4 backdrop-blur-sm"
    >
      {/* Close button - Made more visible for all devices */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white text-stone-900 transition-all hover:bg-amber-400 shadow-lg"
        aria-label="Close gallery"
      >
        <X size={24} />
      </button>
      
      {/* Navigation counter */}
      <div className="absolute top-6 left-6 text-white font-light tracking-widest bg-stone-800 bg-opacity-60 px-3 py-1 rounded">
        <span className="text-amber-400">{currentIndex + 1}</span>
        <span className="mx-2">/</span>
        <span>{totalImages}</span>
      </div>
      
      {/* Previous button - Enhanced visibility */}
      <button 
        onClick={onPrevious}
        className="absolute left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-white text-stone-900 transition-all hover:bg-amber-400 shadow-lg"
        aria-label="Previous image"
      >
        <ChevronLeft size={28} />
      </button>
      
      {/* Next button - Enhanced visibility */}
      <button 
        onClick={onNext}
        className="absolute right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-white text-stone-900 transition-all hover:bg-amber-400 shadow-lg"
        aria-label="Next image"
      >
        <ChevronRight size={28} />
      </button>
      
      {/* Image container */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative max-h-[85vh] max-w-[85vw]"
      >
        <img 
          src={image.src} 
          alt={image.alt} 
          className="max-h-[85vh] max-w-[85vw] rounded-lg object-contain shadow-2xl"
        />
        
        {/* Image caption */}
        <div className="absolute -bottom-16 left-0 right-0 text-center px-4">
          <h3 className="font-serif text-xl text-white mb-2">{image.alt}</h3>
          <p className="text-stone-300 max-w-2xl mx-auto">
            {image.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Gallery image component with mobile-friendly details
const GalleryImage = ({ image, onClick, index, isMobile }) => {
  const { ref, controls } = useAnimateInView();
  const [showDetails, setShowDetails] = useState(false);
  
  // Determine the span class based on image width type (adjusted for mobile)
  const getSpanClass = () => {
    if (isMobile) {
      return "col-span-1"; // On mobile, all images are the same width
    }
    
    switch (image.width) {
      case "wide":
        return "col-span-2 row-span-1";
      case "tall":
        return "col-span-1 row-span-2";
      default:
        return "col-span-1 row-span-1";
    }
  };

  // Toggle image details on mobile
  const toggleDetails = (e) => {
    if (isMobile) {
      e.stopPropagation();
      setShowDetails(!showDetails);
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={animateVariants.fadeIn}
      initial="hidden"
      animate={controls}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative overflow-hidden rounded-lg ${getSpanClass()}`}
      style={isMobile ? { aspectRatio: "1/1" } : {}}
    >
      <div className="relative h-full w-full overflow-hidden group">
        {/* Image */}
        <motion.img
          src={image.src}
          alt={image.alt}
          className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
          loading="lazy"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.8 }}
        />
        
        {/* Featured badge */}
        {image.featured && (
          <div className="absolute top-4 left-4 bg-amber-400 bg-opacity-90 text-stone-900 px-3 py-1 text-xs font-medium uppercase tracking-wider rounded z-10">
            Featured
          </div>
        )}
        
        {/* Info button for mobile */}
        {isMobile && (
          <button 
            onClick={toggleDetails}
            className="absolute top-4 right-4 z-10 bg-white bg-opacity-80 text-stone-900 rounded-full p-2 shadow-md"
            aria-label="Show image details"
          >
            <Info size={20} />
          </button>
        )}
        
        {/* Overlay with details - different behavior for mobile vs desktop */}
        <div 
          className={`absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/70 to-transparent 
            ${isMobile 
              ? showDetails ? 'opacity-100' : 'opacity-0' 
              : 'opacity-0 group-hover:opacity-100'} 
            transition-opacity duration-500 flex flex-col justify-end p-6`}
        >
          <div className={`transform ${isMobile ? (showDetails ? 'translate-y-0' : 'translate-y-full') : 'translate-y-8 group-hover:translate-y-0'} transition-transform duration-500`}>
            <p className="text-amber-400 text-sm uppercase tracking-wider font-light mb-1">
              {image.category}
            </p>
            <h3 className="text-white font-serif text-xl mb-2">{image.alt}</h3>
            <p className="text-stone-200 text-sm mb-4 line-clamp-2">
              {image.description}
            </p>
            <button 
              onClick={() => onClick(image)}
              className="mt-2 inline-flex items-center text-white bg-amber-700 bg-opacity-80 hover:bg-opacity-100 px-4 py-2 rounded-sm transition-colors duration-300"
            >
              <ZoomIn size={16} className="mr-2" />
              View
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Parallax background elements
const ParallaxBackground = () => {
  const { scrollY } = useScroll();
  
  const topRightY = useTransform(scrollY, [0, 1000], [0, -150]);
  const bottomLeftY = useTransform(scrollY, [0, 1000], [0, 150]);
  const centerBlobY = useTransform(scrollY, [0, 500], [0, -50]);
  
  return (
    <>
      <motion.div 
        style={{ y: topRightY }}
        className="absolute top-0 right-0 w-1/2 h-1/2 bg-stone-100 opacity-40 -z-10 rounded-bl-full" 
      />
      <motion.div 
        style={{ y: bottomLeftY }}
        className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-amber-50 opacity-30 -z-10 rounded-tr-full" 
      />
      <motion.div 
        style={{ y: centerBlobY }}
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-100 opacity-10 -z-10 rounded-full blur-3xl" 
      />
    </>
  );
};

// Main Gallery component
export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredImages, setFilteredImages] = useState(galleryImages);
  const [isMobile, setIsMobile] = useState(false);
  const { ref, controls } = useAnimateInView();
  const sectionRef = useRef(null);
  
  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Filter images by category
  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredImages(galleryImages);
    } else {
      setFilteredImages(galleryImages.filter(img => img.category === activeCategory));
    }
  }, [activeCategory]);

  // Open lightbox for an image
  const openLightbox = (image) => {
    const index = galleryImages.findIndex(img => img.id === image.id);
    setSelectedImage(image);
    setSelectedIndex(index);
  };

  // Close lightbox
  const closeLightbox = () => {
    setSelectedImage(null);
  };

  // Navigate to next image
  const showNextImage = () => {
    const nextIndex = (selectedIndex + 1) % galleryImages.length;
    setSelectedImage(galleryImages[nextIndex]);
    setSelectedIndex(nextIndex);
  };

  // Navigate to previous image
  const showPreviousImage = () => {
    const prevIndex = selectedIndex === 0 ? galleryImages.length - 1 : selectedIndex - 1;
    setSelectedImage(galleryImages[prevIndex]);
    setSelectedIndex(prevIndex);
  };

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden bg-stone-50">
      {/* Parallax background elements */}
      <ParallaxBackground />
      
      <div className="container mx-auto max-w-7xl px-4">
        {/* Section header */}
        <motion.div 
          ref={ref}
          variants={animateVariants.fadeIn}
          initial="hidden"
          animate={controls}
          className="text-center mb-16"
           >
              <span className="text-sm font-light uppercase tracking-widest text-amber-700">Gallery</span>
          <h3 className="font-serif text-4xl md:text-5xl text-stone-800 mb-4">
            Experience Luxury
          </h3>
          <div className="mx-auto w-20 h-px bg-amber-400 mb-6"></div>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Immerse yourself in the refined elegance of our meticulously designed spaces
          </p>
        </motion.div>
        
        {/* Category filters - Scrollable on mobile */}
        <motion.div 
          className="flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-4 mb-16 overflow-x-auto pb-4 md:pb-0 scrollbar-hide"
          variants={staggerContainer}
          initial="hidden"
          animate={controls}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              variants={animateVariants.fadeIn}
              className={`px-6 py-2 rounded-sm transition-all duration-300 whitespace-nowrap
                ${activeCategory === category 
                  ? 'bg-stone-800 text-white' 
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>
        
        {/* Gallery grid - Adjusted for mobile */}
        <motion.div 
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {filteredImages.map((image, index) => (
            <GalleryImage 
              key={image.id} 
              image={image} 
              onClick={openLightbox} 
              index={index}
              isMobile={isMobile}
            />
          ))}
        </motion.div>
        
        {/* Mobile info helper text */}
        {isMobile && filteredImages.length > 0 && (
          <motion.p 
            className="text-center text-stone-500 italic mt-6 text-sm"
            variants={animateVariants.fadeIn}
            initial="hidden"
            animate={controls}
          >
            Tap the <Info size={14} className="inline mb-1" /> icon to see image details
          </motion.p>
        )}
        
        {/* "Book Your Stay" CTA */}
        <motion.div 
          className="mt-20 text-center"
          variants={animateVariants.scaleIn}
          initial="hidden"
          animate={controls}
        >
          <div className="relative inline-block">
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-20 h-20 border-t-2 border-r-2 border-amber-400 opacity-60"></div>
            <div className="absolute -bottom-10 -left-10 w-20 h-20 border-b-2 border-l-2 border-amber-400 opacity-60"></div>
            
            <button className="bg-stone-800 hover:bg-amber-700 text-white font-light tracking-wide py-4 px-8 text-lg transition-colors duration-300 uppercase">
              Book Your Luxury Stay
            </button>
          </div>
          <p className="mt-6 text-stone-600 italic">
            Experience unparalleled luxury and create memories that will last a lifetime
          </p>
        </motion.div>
      </div>
      
      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <Lightbox 
            image={selectedImage}
            onClose={closeLightbox}
            onNext={showNextImage}
            onPrevious={showPreviousImage}
            currentIndex={selectedIndex}
            totalImages={galleryImages.length}
          />
        )}
      </AnimatePresence>
    </section>
  );
}