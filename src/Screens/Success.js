import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { themeTyp } from "../Styles/Theme";
import "../Styles/success.css";
import Upperdiv from "../Components/upperDiv";
import img1 from "../Images/success.jpg";
import NavigationBar from "../Components/NavigationBar";
import Footer from "../Components/Footer";

const BookingSuccessMessage = () => {
  const location = useLocation();
  const bookingIds = location.state ? location.state.bookingIds : null; // Set it to null

  const history = useNavigate();

  // Prevent users from going back to this page
  useEffect(() => {
    if (bookingIds == null) {
      history("/");
    }
  }, [history]);

  if (bookingIds != null) {
    return (
      <>
        <NavigationBar />
        <div className="nav-fill"></div>
        <div className="book-confirm">
          <img className="success-img" src={img1} />
          <ThemeProvider theme={themeTyp}>
            <Typography variant="h1" sx={{ color: "#030957" }}>
              Booking Successfully Placed!
            </Typography>
            <Typography variant="PhotoTopic1" sx={{ color: "#030957" }}>
              Your Booking ID: {bookingIds}
            </Typography>
            <Typography variant="PhotoTopic1" sx={{ color: "#030957" }}>
              Confirmation Email has been sent to your email address.
            </Typography>
          </ThemeProvider>
        </div>

        <div id="footer">
          <Footer />
        </div>
      </>
    );
  } else {
    return null;
  }
};

export default BookingSuccessMessage;
