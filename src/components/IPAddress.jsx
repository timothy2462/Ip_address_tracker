import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import Stats from "./Stats";
import Map from "./Map";

const IPAddress = () => {
  const defaultIPAddress = "41.203.78.171"; // Default IP address
  const [IPAddress, setIPAddress] = useState(defaultIPAddress);
  const [location, setLocation] = useState("");
  const [timezone, setTimezone] = useState("");
  const [ISP, setISP] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: 27.5035,
    lng: 77.67215,
  });

  const apiKey = process.env.REACT_APP_API_KEY;

  const fetchLocation = (ipAddress = "") => {
    fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${
        ipAddress || defaultIPAddress
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setIPAddress(data.ip);
        setLocation(
          `${data.location.city}, ${data.location.country} ${data.location.postalCode}`
        );
        setTimezone(`UTC ${data.location.timezone}`);
        setISP(`${data.isp}`);
        setCoordinates({ lat: data.location.lat, lng: data.location.lng });
      })
      .catch((error) => {
        console.error("Error fetching location:", error);
      });
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  return (
    <div className="flex flex-col h-screen relative">
      <SearchBar
        defaultIPAddress={defaultIPAddress}
        setIPAddress={setIPAddress}
        fetchLocation={fetchLocation}
      />
      <Stats
        ipAddress={IPAddress}
        location={location}
        timezone={timezone}
        isp={ISP}
      />
      <Map coordinates={coordinates} />
    </div>
  );
};

export default IPAddress;
