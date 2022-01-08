// setting object a DOM object 
venueNameEl = document.querySelector("#listOfEvents");

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
  var getVenueId = function(venuename) {
    
    // format the github api url
    var apiUrl= "https://app.ticketmaster.com/discovery/v2/venues.json?keyword=" + FirstAvenue&apikey=" + configTicket.apiKey;
    console.log(apiUrl);
    // make a get request to url
    fetch(apiUrl)
      .then(function(response) {
        // request was successful
        if (response.ok) {
          response.json().then(function(data) {
          console.log(data);
          var venueID = data._embedded.venues[0].id;
          console.log(venueID)
          grabName(venueID)
          });
        } else {
          alert("Error: " + response.statusText);
        }
      })
      .catch(function(error) {
        alert("Unable to connect to Ticketmaster");
      });
  };

var grabName = function(id){
  
  var SearchByIdAPI= "https://app.ticketmaster.com/discovery/v2/events.json?size=10&venueId=" + id + "&apikey=" + configTicket.apiKey;
    console.log(SearchByIdAPI);
  
  fetch(SearchByIdAPI)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        response.json().then(function(data) {
        eventsList = data._embedded.events;
        console.log(eventsList)
        populateVenueList(eventsList);

        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function(error) {
      alert("Unable to connect to Ticketmaster");
    });  
}

var populateVenueList = function(eventsList){
  var listItemEl = document.createElement("div");
  listItemEl.textContent = eventsList[0].name + " " + eventsList[0].dates.start.localDate;
  console.log(listItemEl);
  venueNameEl.appendChild(listItemEl);
}

  getVenueId();