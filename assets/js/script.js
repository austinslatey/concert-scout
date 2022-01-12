// setting object a DOM object 

artistNameEl = document.querySelector("#name");
dateEl = document.querySelector("#date");
genreEl = document.querySelector("#genre");
mainEl = document.querySelector("#main");

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

  var mainContainer = document.createElement("div");
  mainContainer.classList = "mainContainer";
  for (i=0;i<10;i++){

  // var subcontainer = document.createElement("div");
  // subcontainer.classList = "subContainer";

  // name of artist and dom creation
  var nameItemEl = document.createElement("div");
  nameItemEl.classList = "name";
  var subcontainerName = document.createElement("div");
  subcontainerName.classList = "subContainer";
  nameItemEl.textContent = (eventsList[i].name);

  // date of event and DOM creation
  var dateItemEl = document.createElement("div");
  dateItemEl.classList = "date";
  dateItemEl.textContent = (eventsList[i].dates.start.localDate);
  var subcontainerDate = document.createElement("div");
  subcontainerDate.classList = "subContainer";

  // genre of artist and DOM creation
  var genreItemEl = document.createElement("div");
  genreItemEl.classList = "genre";
  genreItemEl.textContent = (eventsList[i].classifications[0].genre.name);
  var subcontainerGenre = document.createElement("div");
  subcontainerGenre.classList = "subContainer";

  // appending DOM elements to relavant subcontainers
  // subcontainer.append(nameItemEl, dateItemEl, genreItemEl);
  subcontainerName.appendChild(nameItemEl);
  subcontainerDate.appendChild(dateItemEl);
  subcontainerGenre.appendChild(genreItemEl);

  // mainContainer.appendChild(subcontainer);

  //appending sub containers to HTML divs

  artistNameEl.appendChild(subcontainerName);
  dateEl.appendChild(subcontainerDate);
  genreEl.appendChild(subcontainerGenre);
  }
}

submitButtonEl.addEventListener("click", buttonSubmit);