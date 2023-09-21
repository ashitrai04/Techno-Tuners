import React, { useState, useEffect } from 'react';
import Map from '../components/Map';
import SpeedoMeter from '../components/SpeedoMeter';
import SpeedoMeterMobile from '../components/SpeedoMeterMobile';
import Sidebar from '../components/Sidebar';

const Home = () => {
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error(error);
          setLocation(null);
        }
      );
    } else {
      console.error('Geolocation is not supported by your browser.');
      setLocation(null);
    }
  }, []);

  const sendLocationToFirebase = () => {
    if (location) {
      // Replace 'your_device_id' with a unique identifier for the device
      // const deviceId = 'your_device_id';
      const url = `https://getuserlocation-47fBa-default-rtdb.firebaseio.com/data.json`;
      fetch(url, {
        method: 'PUT', // Use PUT to update the existing data
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(location),
      });
    }
  };

  const [speed, setSpeed] = useState(0);

  const fetchVehicleData = () => {
      fetch('/vehicleData.json')
          .then((response) => response.json())
          .then((data) => {
              setSpeed(data.yourVehicle.speed);
          })
          .catch((error) => console.error('Error fetching vehicle data', error));
  };

  setInterval(() => {
    fetchVehicleData()
  }, 1000);

  useEffect(() => {
    sendLocationToFirebase();
    fetchVehicleData();
  }, [location]);

  return (
    <>
      <Sidebar />
      <div className="flex flex-col lg:flex-row justify-center items-center">
{/*         <Map location={location}/> */}
        <Map />
        {/* 550 */}
        {windowSize[0] >= 550 ? (
          <SpeedoMeter targetPercentage={speed} />
        ) : (
          <SpeedoMeterMobile targetPercentage={speed} />
        )}
      </div>
    </>
  );
};

export default Home;
