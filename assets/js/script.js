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
var lengthOflastSearch = 0;
// Inital Ticket Master API Pull from button click

var buttonSubmit = function(event) {
  // prevent page from refreshing
  event.preventDefault();


  // get value from input element
  var venueName = nameInputEl.value.trim();

  // saving locally
  venueNameLocalStorageObject = {name: venueName, id: 0};
  overwriteLocalVenue(venueNameLocalStorageObject);
  searchedVenues.push(venueNameLocalStorageObject);
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

  removeOldEvents(eventsList);
  
  //function if there are more than 10 upcoming events 
  if (eventsList.length >= 10){
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

    artistNameEl.appendChild(subcontainerName);
    dateEl.appendChild(subcontainerDate);
    genreEl.appendChild(subcontainerGenre);
    }
  }

  // function if there are less then 10 upcoming events
  if (eventsList.length < 10){
    for (i=0;i<eventsList.length;i++){

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

    artistNameEl.appendChild(subcontainerName);
    dateEl.appendChild(subcontainerDate);
    genreEl.appendChild(subcontainerGenre);
    }
  }

  eventId = 0;
  eventsExist++
}

// remove old venue events

var removeOldEvents = function(eventsList){
  if (eventsExist > 0){
    var artistCount = 0;
    var dateCount = 0;
    var genreCount = 0;
    artistCount = artistNameEl.children.length;
    dateCount = dateEl.children.length;
    genreCount = genreEl.children.length;
    totalCount = artistCount + dateCount + genreCount -3;
    console.log(totalCount)
    for (i=0;i<totalCount;i++){
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

var loadLocalStorage = function(){
  var oldSearches = localStorage.getItem("searchedVenues");
  if (!oldSearches){
    searchedVenues = [];
    return false;
    }
  console.log(oldSearches)
}
loadLocalStorage();
var fetchData = function() {
  var typeId = nameInputEl.value;
  console.log(typeId);
  var urlApi = "http://cors-anywhere.herokuapp.com/" + "https://serpapi.com/search.json?engine=google_events&q=" + typeId + "&hl=en&gl=us&api_key=" + configReview.apiKey;
  document.getElementById("response").innerHTML = "";
  fetch(urlApi, {
    "method": "GET",
    
  }) 
    .then(function(response) {
      if (response.ok) {
        response.json()
        .then(function(data) {
         
          console.log(data);
          //attempt to log data
          var getTicketInfo = data.events_results;
          console.log(getTicketInfo);
          
          for ( var i = 0; i <data.events_results[i].ticket_info.length; i++){
          var getTicketInfoData = data.events_results[i].ticket_info[i].link;
          var getTicketInfoDataTitle = data.events_results[i].title;
          console.log(getTicketInfoData)
          console.log(getTicketInfoDataTitle)

          let output = `<h2>
                          Tickets! :D 
                        </h2>`;
          output += '<ul>'; 
          
            output += `
            <h2>
               ${getTicketInfoDataTitle}
            </h2>
            <li>
              <<a href= 
              ${getTicketInfoData}>
              Get your tickets here</a>>
              
            </li>
            `;

          output += '</ul>';
        
          document.getElementById("response").innerHTML += output;
          }   

        });
      } else {
        alert("error: " + response.statusText);
      }
    })
    .catch(function(error) {
      alert("Unable to connect to Google Map Reviews.");
    });
  }
  
  document.getElementById("button").addEventListener("click", fetchData);
  document.getElementById("button").addEventListener("click", buttonSubmit);
