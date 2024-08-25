export const calculateAngle = (start, end) => {
    const [lat1, lon1] = start;
    const [lat2, lon2] = end;
  
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const lat1Rad = (lat1 * Math.PI) / 180;
    const lat2Rad = (lat2 * Math.PI) / 180;
  
    const y = Math.sin(dLon) * Math.cos(lat2Rad);
    const x =
      Math.cos(lat1Rad) * Math.sin(lat2Rad) -
      Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLon);
  
    const angleRad = Math.atan2(y, x);
    const angleDeg = (angleRad * 180) / Math.PI;
  
    return (angleDeg + 360) % 360;
  };
  