import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { createStartIcon, createEndIcon, createVesselIcon } from './MarkerIcons';
import { haversineDistance } from '../utils/haversine';
import { calculateAngle } from '../utils/calculateAngle';
import InfoPanel from './InfoPanel';

const MapComponent = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const map = L.map(mapRef.current).setView([22.1696, 91.4996], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {   
      maxZoom: 10.1, 
      minZoom:9.9,
    }).addTo(map);

    const startCoordinates = [22.1696, 91.4996];
    const endCoordinates = [22.2637, 91.7159];

    const startIcon = createStartIcon();
    const endIcon = createEndIcon();
    L.marker(startCoordinates, { icon: startIcon }).addTo(map);
    L.marker(endCoordinates, { icon: endIcon }).addTo(map);

    const angle = calculateAngle(startCoordinates, endCoordinates);
    const vesselIcon = createVesselIcon(angle);

    const start = [22.226, 91.530];
    const marker = L.marker(start, { icon: vesselIcon }).addTo(map);

    const speed = 2000; // choose speed=2000, insted of 20 so that movement can be seen easily
    const distance = haversineDistance(startCoordinates, endCoordinates);
    const totalTime = (distance / speed)*3600;

    let progress = 0;
    const intervalTime = 0.5;
    const end=[22.2920, 91.690];
    const interval = setInterval(() => {
      progress += intervalTime / totalTime;
      if (progress >= 1) {
        clearInterval(interval);
        marker.setLatLng(end);
        return;
      }
      
      const newLat = start[0] + (end[0] - start[0]) * progress;
      const newLng = start[1] + (end[1] - start[1]) * progress;

      marker.setLatLng([newLat, newLng]);
      map.setView([newLat, newLng]);
    }, intervalTime * 1000);

    return () => {
      clearInterval(interval);
      map.remove();
    };
  }, []);

  return (
    <div>
      <InfoPanel />
      <div id="map" ref={mapRef} style={{ height: '500px', width: '100%' }}></div>
    </div>
  );
};

export default MapComponent;
