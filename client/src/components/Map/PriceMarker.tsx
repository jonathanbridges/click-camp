import { divIcon } from 'leaflet';
import { renderToString } from 'react-dom/server';

export const createPriceMarker = (price: number) => {
  const html = renderToString(
    <div
      style={{
        background: '#3f3f3f',
        color: 'white',
        padding: '4px 12px',
        borderRadius: '16px',
        fontSize: '14px',
        fontWeight: 'bold',
        display: 'inline-block',
        whiteSpace: 'nowrap',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        transform: 'translate(-50%, -50%)',
      }}
    >
      ${price}
    </div>
  );

  return divIcon({
    html,
    className: 'price-marker',
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
}; 