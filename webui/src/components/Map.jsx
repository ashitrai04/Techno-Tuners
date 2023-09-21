import React, { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import customMarkerIcon from '../assets/myCar.png';
import customMarkerIcon2 from '../assets/car.png';
import customMarkerIcon3 from '../assets/amb.png';
import CustomAlert from './CustomAlert';
import axios from 'axios';

const Map = () => {
  const [yourVehicle, setYourVehicle] = useState(null);
  const [specialVehicle, setSpecialVehicle] = useState(null);
  const [nearbyVehicles, setNearbyVehicles] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [temp, setTemp] = useState(0);
  const [visibilty, setVisibility] = useState(0);

  const mapRef = useRef(null);
  const yourCarMarker = useRef(null); // Separate ref for your vehicle marker
  const specialCarMarker = useRef(null); // Separate ref for special vehicle marker
  const nearbyMarkers = useRef([]);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([37.7749, -122.4194], 10);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);
    }

    const updateInterval = setInterval(fetchVehicleData, 1000);

    return () => {
      clearInterval(updateInterval);
    };
  }, []);

  const fetchVehicleData = async () => {
    try {
      const response = await fetch('/vehicleData.json');
      const data = await response.json();

      setSpeed(data.yourVehicle.speed);
      const yourVehicleData = data.yourVehicle;
      setYourVehicle(yourVehicleData);
      updateYourVehicleMarker(yourVehicleData);

      const yourSpecialVehicleData = data.specialVehicle;
      setSpecialVehicle(yourSpecialVehicleData);
      updateSpecialVehicleMarker(yourSpecialVehicleData);

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${yourVehicleData.latitude}&lon=${yourVehicleData.longitude}&units=metric&appid=9f2b85b4088ffce7c3a66a8f628a2a50`
      axios.get(`${url}`).then(function (response) {
        setTemp(response.data.main.temp);
        setVisibility(response.data.visibility);
      })

      const nearby = data.vehicles.filter((vehicle) =>
        calculateDistance(yourVehicleData.latitude, yourVehicleData.longitude, vehicle.latitude, vehicle.longitude) <= 0.5
      );

      setNearbyVehicles(nearby);
      updateNearbyVehicleMarkers(nearby);
    } catch (error) {
      console.error('Error fetching vehicle data', error);
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
  };

  useEffect(() => {
    if (specialVehicle && nearbyVehicles.length > 0) {
      const within100Meters = nearbyVehicles.some((vehicle) =>
        calculateDistance(specialVehicle.latitude, specialVehicle.longitude, vehicle.latitude, vehicle.longitude) <= 0.03
      );

      setShowAlert(within100Meters);
    } else {
      setShowAlert(false);
    }
  }, [specialVehicle, nearbyVehicles]);

  const updateYourVehicleMarker = (vehicleData) => {
    if (mapRef.current) {
      const map = mapRef.current;

      // Remove existing your car marker
      if (yourCarMarker.current) {
        map.removeLayer(yourCarMarker.current);
      }

      const customIcon = L.icon({
        iconUrl: customMarkerIcon2,
        iconSize: [30, 48],
        iconAnchor: [15, 24],
      });

      // Add new your car marker
      const marker = L.marker([vehicleData.latitude, vehicleData.longitude], { icon: customIcon }).addTo(map);
      yourCarMarker.current = marker;

      mapRef.current.setView([vehicleData.latitude, vehicleData.longitude], 18);
    }
  };

  const updateSpecialVehicleMarker = (vehicleData) => {
    if (mapRef.current) {
      const map = mapRef.current;

      // Remove existing special car marker
      if (specialCarMarker.current) {
        map.removeLayer(specialCarMarker.current);
      }

      const customIcon3 = L.icon({
        iconUrl: customMarkerIcon3,
        iconSize: [20, 48],
        iconAnchor: [15, 24],
      });

      // Add new special car marker
      const marker = L.marker([vehicleData.latitude, vehicleData.longitude], { icon: customIcon3 }).addTo(map);
      specialCarMarker.current = marker;
    }
  };

  const updateNearbyVehicleMarkers = (vehicles) => {
    if (mapRef.current) {
      const map = mapRef.current;

      // Remove existing nearby markers
      nearbyMarkers.current.forEach((marker) => map.removeLayer(marker));
      nearbyMarkers.current = [];

      // Add new nearby markers
      vehicles.forEach((vehicle) => {
        const customIcon = L.icon({
          iconUrl: customMarkerIcon,
          iconSize: [30, 48],
          iconAnchor: [15, 24],
        });

        const marker = L.marker([vehicle.latitude, vehicle.longitude], { icon: customIcon }).addTo(map);
        nearbyMarkers.current.push(marker);
      });
    }
  };

  return (
    <>
      <div id="map" style={{ height: '100vh' }} className='z-10 w-screen' />
      <div className="speedUi absolute bg-white shadow-xl p-4 rounded-xl z-20 bottom-5 lg:left-5">
        Speed : <span className='font-bold'>{speed} KM/h</span>
      </div>
      <div className="flex flex-col justify-center absolute bg-white shadow-xl p-5 rounded-xl z-20 top-2 lg:left-2">
        <p>
          Temp : <span className='font-bold'>{temp}&deg;C</span>
        </p>
        <p>
          Visibility : <span className='font-bold'>{visibilty / 1000}&nbsp;KM</span>
        </p>
      </div>
      <div className='absolute top-2 lg:left-80 z-20'>
        {showAlert && <CustomAlert />}
      </div>
    </>
  );

}

export default Map
