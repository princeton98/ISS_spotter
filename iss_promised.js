const request = require("request-promise-native");

const fetchMyIP = function() {
  return request("https://api.ipify.org/?format=json");
};

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`https://ipvigilante.com/json/${ip}`);
};

const fetchISSFlyOverTimes = function(body) {
  const latitude = JSON.parse(body).data.latitude;
  const longitude = JSON.parse(body).data.latitude;
  coords = {latitude, longitude};
  return request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`)
}
const nextISSTimesforMyLocation = function() {
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then((data) => {
    const {response} = JSON.parse(data);
    return response;
  });
};
module.exports = nextISSTimesforMyLocation;