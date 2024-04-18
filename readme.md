## Doctor availability API
This API helps in finding the availability of a doctor on a given date and time.

## insatallation

 - clone the github repo using 
git clone https://github.com/shashi675/doctor-availability-api.git
 - In the terminal, type npm init.
 - make a .env file.
 - set content of .env file as
	 PORT=your port number (e.g. 3001)
 - In the terminal, type node index.js
 - server will start running on the given port (if not provided it will run on 3001 by default).

## usage

 - use the endpoint "/api/doctor-availability?date=yourDate&time=yourTime" on the running port number,
 - where yourDate = date in yyyy-mm-dd format
 - yourTime = time in hh:mm format
