const express = require("express");
const Booking = require("../models/booking.js");
// const isLoggedIn = require("../middleware");
const { isLoggedIn } = require("../middleware");



const router = express.Router();

router.post("/book/:id", isLoggedIn, async (req, res) => {
  const { checkIn, checkOut, guests } = req.body;
  const listingId = req.params.id;

  const newBooking = new Booking({
    user: req.user._id,
    listing: listingId,
    checkIn,
    checkOut,
    guests
  });

  await newBooking.save();
  req.flash("success", "Booking confirmed!");
  res.redirect("/bookings");
});

router.get("/bookings", isLoggedIn, async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).populate("listing");
  res.render("bookings/index", { bookings });
});
module.exports = router;

