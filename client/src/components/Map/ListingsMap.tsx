import { Box, CircularProgress, Typography } from '@mui/material';
import { useIsFetching } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { latLng } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { DEFAULT_LAT, DEFAULT_LNG } from '../../lib/constants';
import { QueryKeys } from '../../lib/queryKeys';
import { AppRoutes } from '../../lib/routes';
import { listingsRoute } from '../../routes/Listings';
import type { Listing } from '../../types/listing';
import CustomPopup from './CustomPopup';
import ListingPopup from './ListingPopup';
import { createPriceMarker } from './PriceMarker';
import './map.css';

interface ListingsMapProps {
  listings: Listing[];
}

// This component handles map position and bounds updates
function MapUpdater() {
  const map = useMap();
  const navigate = useNavigate();
  const { originLat, originLng, mapZoomLevel } = listingsRoute.useSearch();
  const [userInteraction, setUserInteraction] = useState(false);

  // Set initial view based on URL params or default to San Francisco Bay Area
  useEffect(() => {
    const latitude = originLat ? parseFloat(decodeURIComponent(originLat).replace(/"/g, '')) : DEFAULT_LAT;
    const longitude = originLng ? parseFloat(decodeURIComponent(originLng).replace(/"/g, '')) : DEFAULT_LNG;
    const initialZoom = mapZoomLevel ? parseFloat(mapZoomLevel) : 9;

    // Reset view when parameters change or are missing
    map.setView([latitude, longitude], initialZoom);
    setUserInteraction(false);

    // If no parameters are present, set them to show the SF Bay Area
    if (!originLat && !originLng) {
      const bounds = map.getBounds();
      navigate({
        to: AppRoutes.LISTINGS,
        search: {
          originLat: latitude.toString(),
          originLng: longitude.toString(),
          neLat: bounds.getNorthEast().lat.toString(),
          neLng: bounds.getNorthEast().lng.toString(),
          swLat: bounds.getSouthWest().lat.toString(),
          swLng: bounds.getSouthWest().lng.toString(),
          mapZoomLevel: initialZoom.toString(),
        },
        replace: true,
      });
    }
  }, [map, originLat, originLng, mapZoomLevel, navigate]);

  useMapEvents({
    dragstart: () => setUserInteraction(true),
    zoomstart: () => setUserInteraction(true),
    moveend: () => {
      if (!userInteraction) return;
      
      const bounds = map.getBounds();
      const center = map.getCenter();
      
      navigate({
        to: AppRoutes.LISTINGS,
        search: {
          originLat: center.lat.toString(),
          originLng: center.lng.toString(),
          neLat: bounds.getNorthEast().lat.toString(),
          neLng: bounds.getNorthEast().lng.toString(),
          swLat: bounds.getSouthWest().lat.toString(),
          swLng: bounds.getSouthWest().lng.toString(),
          mapZoomLevel: map.getZoom().toString(),
        },
        replace: true,
      });
    },
  });

  return null;
}

// This component disables map interactions when popup is open
function MapInteractionBlocker({ isEnabled }: { isEnabled: boolean }) {
  const map = useMap();

  useEffect(() => {
    if (isEnabled) {
      map.dragging.disable();
      map.touchZoom.disable();
      map.doubleClickZoom.disable();
      map.scrollWheelZoom.disable();
      map.boxZoom.disable();
      map.keyboard.disable();
    } else {
      map.dragging.enable();
      map.touchZoom.enable();
      map.doubleClickZoom.enable();
      map.scrollWheelZoom.enable();
      map.boxZoom.enable();
      map.keyboard.enable();
    }
  }, [map, isEnabled]);

  return null;
}

export default function ListingsMap({ listings }: ListingsMapProps) {
  const { originLat, originLng, mapZoomLevel } = listingsRoute.useSearch();
  const isFetching = useIsFetching({ queryKey: [QueryKeys.LISTINGS] });
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  const handleListingClick = (listing: Listing) => {
    if (selectedListing) {
      setSelectedListing(null);
      setTimeout(() => {
        setSelectedListing(listing);
      }, 200);
    } else {
      setSelectedListing(listing);
    }
  };

  const center = originLat && originLng 
    ? [parseFloat(decodeURIComponent(originLat).replace(/"/g, '')), parseFloat(decodeURIComponent(originLng).replace(/"/g, ''))] 
    : [DEFAULT_LAT, DEFAULT_LNG];
  const zoom = mapZoomLevel ? parseFloat(mapZoomLevel) : 9;

  return (
    <Box sx={{ height: '100%', position: 'relative', borderRadius: 1, overflow: 'hidden' }}>
      <MapContainer
        center={center as [number, number]}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
        doubleClickZoom={false}
        dragging={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
        />
        {listings.map((listing) => (
          <Marker
            key={listing.id}
            position={[listing.lat, listing.lng]}
            icon={createPriceMarker(listing.price_per_night)}
            eventHandlers={{
              click: () => handleListingClick(listing),
            }}
          />
        ))}
        {selectedListing && (
          <CustomPopup
            position={latLng(selectedListing.lat, selectedListing.lng)}
            isOpen={true}
          >
            <ListingPopup 
              listing={selectedListing} 
              onClose={() => setSelectedListing(null)} 
            />
          </CustomPopup>
        )}
        <MapUpdater />
        <MapInteractionBlocker isEnabled={!!selectedListing} />
      </MapContainer>

      {isFetching > 0 && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            zIndex: 1000,
          }}
        >
          <Box
            sx={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              bgcolor: 'background.paper',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 2,
            }}
          >
            <CircularProgress size={32} />
          </Box>
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              bgcolor: 'background.paper', 
              px: 2, 
              py: 1, 
              borderRadius: 1, 
              boxShadow: 1 
            }}
          >
            Loading listings...
          </Typography>
        </Box>
      )}
    </Box>
  );
} 