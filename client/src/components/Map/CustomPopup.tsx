import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useMap } from 'react-leaflet';
import { LatLng } from 'leaflet';
import { motion, AnimatePresence } from 'framer-motion';

interface CustomPopupProps {
  position: LatLng;
  children: React.ReactNode;
  isOpen: boolean;
}

export default function CustomPopup({ position, children, isOpen }: CustomPopupProps) {
  const map = useMap();
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updatePosition = () => {
      const el = popupRef.current;
      if (!el) return;

      // Convert lat/lng to pixel coordinates
      const point = map.latLngToContainerPoint(position);
      
      // Get popup dimensions
      const rect = el.getBoundingClientRect();
      
      // Calculate position to keep popup in view
      const mapRect = map.getContainer().getBoundingClientRect();
      let left = point.x - rect.width / 2;
      let top = point.y - rect.height - 20; // 20px above marker
      
      // Adjust if popup would be cut off
      if (left < 10) left = 10;
      if (left + rect.width > mapRect.width - 10) {
        left = mapRect.width - rect.width - 10;
      }
      if (top < 10) {
        top = point.y + 30; // Show below marker if would be cut off at top
      }
      
      // Apply position
      el.style.transform = `translate(${left}px, ${top}px)`;
    };

    // Update position immediately and on map changes
    if (isOpen) {
      updatePosition();
      map.on('zoom move', updatePosition);
    }

    return () => {
      map.off('zoom move', updatePosition);
    };
  }, [map, position, isOpen]);

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          ref={popupRef}
          key={`${position.lat}-${position.lng}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'absolute',
            zIndex: 1000,
            pointerEvents: 'auto',
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>,
    map.getContainer()
  );
} 