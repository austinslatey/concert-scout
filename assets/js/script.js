// setting object a DOM object 
venueNameEl = document.querySelector("#placeholder"); // we'll need to change the #placeholder Id to the actual id of the button once the button has an ID

// Inital Ticket Master API Pull
var buttonSubmit = function(event) {
    // prevent page from refreshing
    event.preventDefault();
  
    // get value from input element
    var venuename = nameInputEl.value.trim();
  
    if (venuename) {
      getVenueId(venuename);
  
    } else {
      alert("Please enter a Venue name");
    }
  };

// Grabs the Venues Id using its Name
  var getVenueId = function(user) {
    // format the github api url
    var apiUrl= "https://app.ticketmaster.com/discovery/v2/venues.json?keyword=FirstAve&apikey=" + config.apikey;
    console.log(apiUrl);
    // make a get request to url
    fetch(apiUrl)
      .then(function(response) {
        // request was successful
        if (response.ok) {
          console.log(response);
          response.json().then(function(data) {
            console.log(data);
          });
        } else {
          alert("Error: " + response.statusText);
        }
      })
      .catch(function(error) {
        alert("Unable to connect to Ticketmaster");
      });
  };

  getVenueId();