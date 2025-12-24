const express = require("express");
const router = express.Router();

// TEMP: return mock notifications
router.get("/", (req, res) => {
  res.json([
    {
      _id: "1",
      message: "New appointment booked",
      read: false,
    },
    {
      _id: "2",
      message: "Doctor accepted your appointment",
      read: false,
    },
  ]);
});

module.exports = router;
