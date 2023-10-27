import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import "../Styles/room.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ImageCarousel from "./Carousal";

import { storage } from "../firebase";
import { getDownloadURL, listAll, ref } from "firebase/storage";

import { Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { themeTyp } from "../Styles/Theme";

import { convertDateToFormat } from "../Utils/dateUtil";
import ipAddress from "../config";
import { Today } from "@mui/icons-material";

const PhotoCard = ({ type, adult, child, size, description }) => {
  const navigate = useNavigate();
  const [images, setImages] = React.useState([]);

  const [roomList, setRoomList] = React.useState([]);

  const imageListRef = ref(storage, `images/Hotel/RoomType/${type}/`);

  const [Form, setForm] = React.useState({
    date: [dayjs(), dayjs().add(1, "day")],
    adults: adult,
    children: child,
    promo: "",
  });

  useEffect(() => {
    listAll(imageListRef).then((res) => {
      res.items.forEach((itemRef) => {
        getDownloadURL(itemRef).then((url) => {
          setImages((images) => [...images, url]);
        });
      });
    });
  }, []);

  const uniqueImages = [...new Set(images)];
  console.log(uniqueImages);

  const handleBook = () => {
    const fcin = convertDateToFormat(Form.date[0]);
    const fcout = convertDateToFormat(Form.date[1]);

    const apiUrl = `${ipAddress}/room/booking/search-availability?checkIn=${fcin}&checkOut=${fcout}&adultCount=${Form.adults}&childrenCount=${Form.children}&promo=${Form.promo}`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setRoomList(data);
        console.log(data);
        const firstElement = data[0];
        const Roomdata = [firstElement];

        navigate("/book-room", {
          state: { Roomdata: Roomdata, form: Form },
        });
      });
  };

  return (
    <>
      <div className="container">
        <div className="photocontainer">
          <div className="photo-card">
            <div className="photo-background" enctype="multipart/form-data">
              <ImageCarousel images={uniqueImages} />
            </div>
            <div className="photo-details">
              <ThemeProvider theme={themeTyp}>
                <Typography variant="PhotoTopic">{type}</Typography>
                <Typography variant="body1">
                  <p>
                    with mountain views <br />
                    <br></br>
                    Max occupancy: {adult} adults and {child} child
                    <br />
                    Room size: {size} sqm
                    <br />
                    <br></br>
                    {description}
                  </p>
                </Typography>
              </ThemeProvider>

              <button className="btnbooking" onClick={handleBook}>
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PhotoCard;
