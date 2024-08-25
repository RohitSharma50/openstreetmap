import L from 'leaflet';
import startIconImage from '../assets/startIcon.png';
import endIconImage from '../assets/endIcon.png';
import vessel from '../assets/vessel.png';

export const createStartIcon = () => {
  return L.icon({
    iconUrl: startIconImage,
    iconSize: [25, 25],
    iconAnchor: [12, 25],
  });
};

export const createEndIcon = () => {
  return L.icon({
    iconUrl: endIconImage,
    iconSize: [25, 25],
    iconAnchor: [12, 25],
  });
};

export const createVesselIcon = (angle) => {
  return L.divIcon({
    html: `<img src="${vessel}" style="transform: rotate(${angle}deg); width: 10px; height: 50px;">`,
    className: 'vessel-icon',
  });
};
