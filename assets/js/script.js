// setting object a DOM object 

artistNameEl = document.querySelector("#name");
dateEl = document.querySelector("#date");
genreEl = document.querySelector("#genre");
mainEl = document.querySelector("#main");

nameInputEl = document.querySelector("#userInput");
submitButtonEl = document.querySelector("#button");

// vars for the counter for removing old searches and for checking if user already searched
var eventId = 0;
var eventsExist = 0;

// Inital Ticket Master API Pull from button click

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

  // saving locally
  venueNameLocalStorageObject = {name: venueName, id: 0};
  overwriteLocalVenue(venueNameLocalStorageObject);
  searchedVenues.push(venueNameLocalStorageObject);
  console.log(searchedVenues[0].id);
  saveLocalTicketMaster()
  
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
    // make a get request to url
    fetch(apiUrl)
      .then(function(response) {
        // request was successful
        if (response.ok) {
          response.json().then(function(data) {
          var venueID = data._embedded.venues[0].id;
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

  removeOldEvents();

  for (i=0;i<10;i++){

  // name of artist and dom creation
  var nameItemEl = document.createElement("div");
  nameItemEl.classList = "name";
  var subcontainerName = document.createElement("div");
  subcontainerName.classList = "subContainer";
  nameItemEl.textContent = (eventsList[i].name);
  subcontainerName.setAttribute("event-id", eventId);
  eventId++;
  

  // date of event and DOM creation
  var dateItemEl = document.createElement("div");
  dateItemEl.classList = "date";
  dateItemEl.textContent = (eventsList[i].dates.start.localDate);
  var subcontainerDate = document.createElement("div");
  subcontainerDate.classList = "subContainer";
  subcontainerDate.setAttribute("event-id", eventId);
  eventId++;

  // genre of artist and DOM creation
  var genreItemEl = document.createElement("div");
  genreItemEl.classList = "genre";
  genreItemEl.textContent = (eventsList[i].classifications[0].genre.name);
  var subcontainerGenre = document.createElement("div");
  subcontainerGenre.classList = "subContainer";
  subcontainerGenre.setAttribute("event-id", eventId);
  eventId++;

  // appending DOM elements to relavant subcontainers

  subcontainerName.appendChild(nameItemEl);
  subcontainerDate.appendChild(dateItemEl);
  subcontainerGenre.appendChild(genreItemEl);




  //appending sub containers to HTML divs
  console.log(subcontainerName);
  artistNameEl.appendChild(subcontainerName);
  dateEl.appendChild(subcontainerDate);
  genreEl.appendChild(subcontainerGenre);
  }
  eventId = 0;
  eventsExist++
}

// remove old venue events

var removeOldEvents = function(){
  if (eventsExist > 0){
    for (i=0;i<30;i++){
    var stringCount = i.toString();
    var selectedEvent = document.querySelector(".subContainer[event-id='"+ stringCount +"']");
    selectedEvent.remove();
    }
  }
}

// local storage functions

var saveLocalTicketMaster = function(){
  window.localStorage.setItem("searchedVenues", JSON.stringify(searchedVenues));
  }

var overwriteLocalVenue = function(venue){
  for (i=0;i<1;i++){
      //  searchedVenues[i].name = venue.name;
      searchedVenues = [];
      searchedVenues.push(venueNameLocalStorageObject);
  }
}

submitButtonEl.addEventListener("click", buttonSubmit);