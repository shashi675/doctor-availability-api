
function isLeap(year) {
    return (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0));
}

// validate date and time
function isValidDateTime(date, time) {

    // check date
    let dateInfo = date.split("-");
    const year = Number(dateInfo[0]);
    const month = Number(dateInfo[1]);
    const day = Number(dateInfo[2]);

    const noOfDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if(month === NaN || month < 0 || month > 11) {
        return false;
    }
    if(isLeap(year) && month === 2) {
        if(day < 0 || day > 29)
            return false;
    }
    else if(day === NaN || day < 0 || day > noOfDaysInMonth[month - 1]) {
        return false;
    }
    // check format for date
    if(isNaN(new Date(date))) {
        return false;
    }


    // check time
    // regex for time
    let regex = new RegExp(/^([01]\d|2[0-3]):?([0-5]\d)$/);
    if (time == null) {
        return "false";
    }
    if (regex.test(time) == false) {
        return false;
    }

    // date and time are valid
    return true;
}


module.exports = { isValidDateTime };