const getuserlocation = () => {
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
}

export default getuserlocation