// setting object a DOM object 
venueNameEl = document.querySelector("#listOfEvents");
nameInputEl = document.querySelector("#userInput");
submitButtonEl = document.querySelector("#button");
// Inital Ticket Master API Pull
var buttonSubmit = function(event) {
    // prevent page from refreshing
    event.preventDefault();

  
    // get value from input element
    var venueName = nameInputEl.value.trim();
    var venueSplit = venueName.split(" ");
    var venueNoSpace = venueSplit.join("");
    console.log(venueName);
    console.log(venueSplit);
    console.log(venueNoSpace);

    if (venueName) {
      getVenueId(venueName);
  
    } else {
      alert("Please enter a Venue name");
    }
  };

// Grabs the Venues Id using its Name
  var getVenueId = function(name) {
    
    // format the github api url
    var apiUrl= "https://app.ticketmaster.com/discovery/v2/venues.json?keyword=" + name + "&apikey=" + configTicket.apiKey;
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
  for (i=0;i<10;i++){
  var listItemEl = document.createElement("div");
  listItemEl.textContent = eventsList[i].name + " " + eventsList[i].dates.start.localDate + " " + eventsList[i].classifications[0].genre.name;
  console.log(listItemEl);
  venueNameEl.appendChild(listItemEl);
  }
}

submitButtonEl.addEventListener("click", buttonSubmit);