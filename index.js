if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition, handleError)
} else {
  console.log('Geolocation is not supported by this browser.')
}

const map = L.map('map').setView([51.505, -0.09], 13)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)

function showPosition(position) {
  const latitude = position.coords.latitude
  const longitude = position.coords.longitude
  map.setView([latitude, longitude], 13)
  L.marker([latitude, longitude]).addTo(map)

  const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Extract the country ,city and road information from the response
      const country = data.address.country
      const state = data.address.state
      const city =
        data.address.city || data.address.town || data.address.village
      const road = data.address.road

      // Update the values in the display box
      document.getElementById('country').textContent = country
      document.getElementById('state').textContent = state
      document.getElementById('city').textContent = city
      document.getElementById('road').textContent = road
    })
    .catch(error => {
      console.log('Error retrieving geocoding data:', error)
    })
}

function handleError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      console.log('User denied the request for Geolocation.')
      var message =
        'To use this feature, please enable geolocation access in your browser settings.'
      displayErrorMessage(message)
      break
    case error.POSITION_UNAVAILABLE:
      console.log('Location information is unavailable.')
      break
    case error.TIMEOUT:
      console.log('The request to get user location timed out.')
      break
    case error.UNKNOWN_ERROR:
      console.log('An unknown error occurred.')
      break
  }
}

function displayErrorMessage(message) {
  // Display the message to the user, e.g., in an alert, a modal, or on the page
  alert(message)
  // You can also provide a button or link to direct the user to the browser settings
  // where they can manually enable geolocation access
}
