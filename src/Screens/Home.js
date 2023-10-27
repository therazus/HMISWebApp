import React, { useState, useEffect } from "react";
import SearchBox from "../Components/SearchBox";
import Room from "../Components/Room";
import Offer from "../Components/Offer";
import Experiences from "../Components/Experiences";
import Restaurant from "../Components/Restaurant";
import ipaddress from "../config";
import Loading from "../Components/Loading";
import NavigationBar from "../Components/NavigationBar";
import Footer from "../Components/Footer";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [roomTypes, setRoomTypes] = useState([]);

  useEffect(() => {
    const apiUrl = ipaddress + "/roomType/get";
    fetch(apiUrl)
      .then((res) => res.json())
      .then((result) => {
        setRoomTypes(result);
        setLoading(false);
      });
  }, []);
  return loading ? (
    <Loading />
  ) : (
    <>
      <NavigationBar />
      <div id="Home">
        <SearchBox />
      </div>
      <div>
        <Experiences />
      </div>
      <div id="Offers">
        <Offer />
      </div>

      <div id="Rooms">
        {roomTypes.map((roomType) => (
          <Room
            type={roomType.type}
            adult={roomType.maxAdultOccupancy}
            child={roomType.maxChildOccupancy}
            size={roomType.roomSize}
            description={roomType.description}
          />
        ))}
      </div>
      <div id="Restaurant">
        <Restaurant />
      </div>
      <div id="footer">
        <Footer />
      </div>
    </>
  );
}
