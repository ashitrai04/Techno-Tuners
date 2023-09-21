// // // mapboxgl.accessToken = 'pk.eyJ1Ijoibmlsb2ZvdDcyNCIsImEiOiJjbG1yc3Fpc24wNG5sMnNwN3IyMTl4ZmE1In0.ReAop4YtrYhBA6bHqmK96w';

// import React, { useEffect, useRef } from 'react';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
// import 'leaflet-routing-machine';
// import 'leaflet-routing-machine/dist/leaflet-routing-machine.js';

// const Map2 = () => {
//   const mapRef = useRef(null); // Store a reference to the map

//   useEffect(() => {
//     // Initialize the map
//     const map = L.map('map').setView([30.731462531392232, 76.76650713491699], 13);
//     mapRef.current = map; // Assign the map to the ref

//     // Add the base map layer
//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       maxZoom: 19,
//     }).addTo(map);

//     // Define the start and end coordinates
//     const startCoords = L.latLng(30.73871325817076, 76.77229176295839);
//     const endCoords = L.latLng(30.724211804613702, 76.76072250687558);

//     // Create a routing control
//     const control = L.Routing.control({
//       waypoints: [
//         L.Routing.waypoint(startCoords),
//         L.Routing.waypoint(endCoords),
//       ],
//       routeWhileDragging: true,
//     }).addTo(map);

//     control.on('routesfound', async (e) => {
//       const route = e.routes[0];
//       L.geoJSON(route.route_geometry, {
//         style: { color: '#0074D9', weight: 5 },
//       }).addTo(map);

//       // Fetch speed limit data using Mapbox Directions API
//       const apiKey = 'pk.eyJ1Ijoibmlsb2ZvdDcyNCIsImEiOiJjbG1yc3Fpc24wNG5sMnNwN3IyMTl4ZmE1In0.ReAop4YtrYhBA6bHqmK96w'; // Replace with your Mapbox API key
//       const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${route.coordinates
//         .map(coord => coord.join(','))
//         .join(';')}?steps=true&access_token=${apiKey}`;

//       try {
//         const response = await fetch(url);
//         const data = await response.json();

//         if (data.routes && data.routes.length > 0) {
//           const steps = data.routes[0].legs[0].steps;
//           const speedLimits = steps.map(step => step.speed);

//           console.log('Speed limits:', speedLimits);
//         }
//       } catch (error) {
//         console.error('Error fetching speed limit data:', error);
//       }
//     });

//     // Set up cleanup when the component unmounts
//     return () => {
//       // Check if the map exists before removing it
//       if (mapRef.current) {
//         mapRef.current.remove();
//       }
//     };
//   }, []);

//   return <div id="map" style={{ height: '100vh' }}></div>;
// };

// export default Map2;


import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import axios from 'axios';

function Map() {
  const [speedLimit, setSpeedLimit] = useState(null);

  useEffect(() => {
    const map = L.map('map').setView([51.505, -0.09], 13);

    // ...leaflet map setup code...

    // Example coordinates (replace with your desired coordinates)
    const coordinates = [51.505, -0.09];

    // Fetch speed limit data from the API
    axios
      .get(`YOUR_SPEED_LIMIT_API_ENDPOINT?lat=${coordinates[0]}&lng=${coordinates[1]}&apiKey=pk.eyJ1Ijoibmlsb2ZvdDcyNCIsImEiOiJjbG1yc3Fpc24wNG5sMnNwN3IyMTl4ZmE1In0.ReAop4YtrYhBA6bHqmK96w`)
      .then((response) => {
        const data = response.data;
        setSpeedLimit(data.speed); // Assuming the API returns the speed limit
      })
      .catch((error) => {
        console.error('Error fetching speed limit data', error);
      });
  }, []);

  return (
    <div>
      <div id="map" style={{ height: '500px' }}></div>
      {speedLimit && <p>Speed Limit: {speedLimit} mph</p>}
    </div>
  );
}

export default Map;



