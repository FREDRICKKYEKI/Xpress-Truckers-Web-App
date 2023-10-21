export function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition((position) => {
      return position;
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}
