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
  subcontainerName.classList = "has-background-info";
  nameItemEl.textContent = (eventsList[i].name);
  subcontainerName.setAttribute("event-id", eventId);
  eventId++;
  

  // date of event and DOM creation
  var dateItemEl = document.createElement("div");
  dateItemEl.classList = "date";
  dateItemEl.textContent = (eventsList[i].dates.start.localDate);
    
  var subcontainerDate = document.createElement("div");
  subcontainerDate.classList = "subContainer";
  subcontainerDate.classList = "has-background-info";
  subcontainerDate.setAttribute("event-id", eventId);
  console.log(subcontainerDate)
  eventId++;


  // genre of artist and DOM creation
  var genreItemEl = document.createElement("div");
  genreItemEl.classList = "genre";
  genreItemEl.textContent = (eventsList[i].classifications[0].genre.name);
  var subcontainerGenre = document.createElement("div");
  subcontainerGenre.classList = "subContainer";
  subcontainerGenre.classList = "has-background-info";
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
    var selectedEvent = document.querySelector(".has-background-info[event-id='"+ stringCount +"']");
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


var getDataResults = function() {
  var typeId = "Red Rocks Ampitheater";
  //var typeId = nameInputEl
  var urlApi = "http://cors-anywhere.herokuapp.com/" + "https://serpapi.com/search.json?engine=google_maps&q=" + typeId + "&api_key=" + configReview.apiKey;
  
  fetch(urlApi, {
    "method": "GET",
    
  }) 
    .then(function(response) {
      if (response.ok) {
        response.json().then(function(data) {
          //attempt to log data
          console.log(data);
          //data successful
          console.log("Find the Data Id");
          //grab data id in case to implement into maps reviews fetch 
          var searchId = data.local_results[0].data_id;
          console.log("Here is the data ID." + searchId);
          var grabId = searchId;
          globalThis.grabId;
          console.log(grabId);
          console.log(globalThis.grabId);
          
          
          // grab reviews id
          //var reviewResult = data.place_results.user_reviews.most_relevant[0].description; 
          //console.log("Here are the review results" + reviewResult);
          
        });
      } else {
        alert("error: " + response.statusText);
      }
    })
    .catch(function(error) {
      alert("Unable to connect to Google Map Reviews.");
    });
  }


  submitButtonEl.addEventListener("click", getDataResults);
  

  




 

  var grabId = function(grabId) {
    new XMLHttpRequest(); 
   
    var urlReviewsApi = ("GET", "http://cors-anywhere.herokuapp.com/" + "https://serpapi.com/search.json?engine=google_maps_reviews&data_id" + grabId + "&api_key=" + configReview.apiKey);
  
  fetch(urlReviewsApi) 
    .then(function(response) {
      if (response.ok) {
        response.json().then(function(data) {
          console.log(data);
          console.log(response);
        });
      } else {
        alert("error: " + response.statusText);
      }
    })
    .catch(function(error) {
      alert("Unable to connect to Google Map Reviews.");
    });
  
   grabId = function(id) {
     submitButtonEl.addEventListener("click", buttonSubmit);
    console.log(id);
   }
  }
  submitButtonEl.addEventListener("click", grabId)


  

  //   submitButtonEl.addEventListener("click", buttonSubmit);
