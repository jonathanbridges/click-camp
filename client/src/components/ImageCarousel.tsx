import { Box, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { useState } from 'react';

interface ImageCarouselProps {
  images: string[];
  height?: number;
  onImageClick?: () => void;
}

const variants = {
  enter: (direction: number) => ({
    translateX: direction > 0 ? '100%' : '-100%',
  }),
  center: {
    translateX: 0,
  },
  exit: (direction: number) => ({
    translateX: direction > 0 ? '-100%' : '100%',
  }),
};

export default function ImageCarousel({ images, height = 200, onImageClick }: ImageCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const totalImages = images?.length || 0;

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const nextIndex = (currentImageIndex + 1) % totalImages;
    setDirection(nextIndex === 0 ? -1 : 1);
    setCurrentImageIndex(nextIndex);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const prevIndex = (currentImageIndex - 1 + totalImages) % totalImages;
    setDirection(prevIndex === totalImages - 1 ? 1 : -1);
    setCurrentImageIndex(prevIndex);
  };

  return (
    <Box sx={{ position: 'relative', height, overflow: 'hidden' }}>
      <AnimatePresence mode="sync" initial={false} custom={direction}>
        <motion.img
          key={currentImageIndex}
          src={images?.[currentImageIndex]}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onImageClick?.();
          }}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ 
            type: "tween",
            duration: 0.3,
            ease: "easeInOut"
          }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            cursor: onImageClick ? 'pointer' : 'default',
            willChange: 'transform',
          }}
        />
      </AnimatePresence>
      {totalImages > 1 && (
        <>
          <IconButton
            onClick={prevImage}
            sx={{
              position: 'absolute',
              left: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'rgba(255, 255, 255, 0.9)',
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 1)' },
            }}
            size="small"
          >
            <NavigateBeforeIcon />
          </IconButton>
          <IconButton
            onClick={nextImage}
            sx={{
              position: 'absolute',
              right: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'rgba(255, 255, 255, 0.9)',
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 1)' },
            }}
            size="small"
          >
            <NavigateNextIcon />
          </IconButton>
          <Box
            sx={{
              position: 'absolute',
              bottom: 8,
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: 0.5,
            }}
          >
            {Array.from({ length: totalImages }).map((_, index) => (
              <motion.div
                key={index}
                animate={{
                  scale: index === currentImageIndex ? 1.2 : 1,
                  opacity: index === currentImageIndex ? 1 : 0.5,
                }}
                transition={{ duration: 0.2 }}
              >
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    bgcolor: 'white',
                  }}
                />
              </motion.div>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
} 