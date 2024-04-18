const availabilityTimings = require("./data");
const moment = require("moment");


const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

function checkTodayAvailability(date, time) {
    const dateInfo = new Date(date);
    const todaysDay = days[dateInfo.getDay()];
    const userTimeMoment = moment(time, "HH:mm");

    let isAvailable = false;
    const todayAvailabilityTime = availabilityTimings[todaysDay];

    let nextAvailableSlot = {
        "date": "",
        "time": ""
    }

    for(let i = 0; i < todayAvailabilityTime.length; i++) {
        const time = todayAvailabilityTime[i];
        const startTime = time.start;
        const endTime = time.end;
        const startTimeMoment = moment(startTime, "HH:mm");
        const endTimeMoment = moment(endTime, "HH:mm");

        if(userTimeMoment.isBetween(startTimeMoment, endTimeMoment, null, [])) {
            isAvailable = true;
            break;
        }

        if(userTimeMoment.isBefore(endTimeMoment)) {
            nextAvailableSlot.date = date;
            nextAvailableSlot.time = startTime;
            break;
        }
    }
    return {isAvailable, nextAvailableSlot}
}


function checkNextDateAvailability(date, time) {
    const dateInfo = new Date(date);
    const day = dateInfo.getDay();
    let dayCount = 1;
    const todayDateMoment = moment(date, "YYYY-MM-DD");
    const nextAvailableSlot = {
        "date": "",
        "time": ""
    }
    
    for(let i = (day + 1) % 7; i < 7; i = (i+1) % 7, dayCount++) {
        const dayName = days[i];
        if(availabilityTimings[dayName].length != 0) {
            nextAvailableSlot.date = todayDateMoment.add(dayCount, "days").format("YYYY-MM-DD");
            const nextDatetiming = availabilityTimings[dayName];
            nextAvailableSlot.time = nextDatetiming[0].start;
            break;
        }
    }
    return nextAvailableSlot;
}

module.exports = { checkTodayAvailability, checkNextDateAvailability };