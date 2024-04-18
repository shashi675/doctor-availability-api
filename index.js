const express = require("express");
require('dotenv').config();
const { checkTodayAvailability, checkNextDateAvailability } = require("./availability");
const { isValidDateTime } = require("./dateTimeFormat");

const app = express();
const port = process.env.PORT || 3001;

// api endpoint

app.get("/api/doctor-availability", (req, res) => {
    let date = req.query.date;
    let time = req.query.time;
    
    if(!isValidDateTime(date, time)) {
        return res.status(400).json({
            message:"wrong date or time value, provide correct date and time",
            date: "YYYY-MM-DD",
            time: "hh:mm (24 hour format)"
        })
    }

    // check for today availability

    const todayAvailability = checkTodayAvailability(date, time);
    if(todayAvailability.isAvailable) {
        return res.status(200).json({"isAvailable": true});
    }
    if(todayAvailability.nextAvailableSlot.date != "") {
        return res.status(200).json({
            "isAvailable": false,
            "nextAvailableSlot": todayAvailability.nextAvailableSlot
        })
    }

    // get next day availability

    const nextDateAvailability = checkNextDateAvailability(date, time);
    res.status(200).json({
        "isAvailable": false,
        "nextAvailableSlot": nextDateAvailability
    })
})


app.listen(port, () => {
    console.log(`server running on port ${port}`);
});
