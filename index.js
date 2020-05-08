const { nextISSTimesForMyLocation } = require("./iss");

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  printPassTimes(passTimes);
});
/*fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log("It worked! Return IP:", ip);
});
*/
/*fetchCoordsByIP(("24.212.214.194"), (error, data) => {
  if (error) {
    console.log("It didn't work!", error)
    return;
  }
  else {
    console.log("It worked! Return Longitude and Latitude", Coord);
  }
});
*/

/*fetchISSFlyOverTimes({ latitude: '49.27670', longitude: '-123.13000' }, (error, data) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  else {
    console.log("It worked! Returned data", data);
  }
}
)
*/

