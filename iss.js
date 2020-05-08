const request = require("request");

// get the IP
const fetchMyIP = function(callback) {

  request("https://api.ipify.org/?format=json", (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
    }
    let newBody = JSON.parse(body).ip;
    callback(error, newBody);


  });
};

const fetchCoordsByIP = function(ip, callback) {
  request("https://ipvigilante.com/" + ip, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching Coords. Response: ${body}`;
      callback(Error(msg), null);
    }
    let latitude = JSON.parse(body).data.latitude;
    let longitude = JSON.parse(body).data.longitude;
    let coord = { latitude, longitude };
    callback(error, coord);
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching data. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    let data = JSON.parse(body).response;
    callback(error, data);
  });

};

const nextISSTimesForMyLocation = function(callback) {
  // how to get passTimes
  // need IP
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, data) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(data, (error, data) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, data);
      });
    });
  });
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};