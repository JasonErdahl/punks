$(document).ready(function(){


//Define and set up variables for the timetable js 
var timetable = new Timetable();
timetable.setScope(4,3); //this will set the time frame to be 4:00am to 3:00am
var TurbineSites = ['Turbine Site 1', 'Turbine Site 2', 'Turbine Site 3', 'Turbine Site 4', 'Turbine Site 5'];
timetable.addLocations(TurbineSites);

//Global variables
var dbcrewdata = [];
var turbinesitesArray = [];
var crewnameArray = [];
var starttimeArray = [];
var endtimeArray = [];
var dateOnlyArray = [];
var startDateAndTime = [];
var endDateAndTime = [];

//Get the crew plans and display it on the timetable
getCrewPlans();


//Function to get all the crew plan data
function getCrewPlans(){
  //Ajax call to get data from the api
  $.get("/api/crewPlan", function(result){

    dbcrewdata = result;
    
    //Loop through the array break up data into array
    for(var i = 0; i < dbcrewdata.length; i++){
      turbinesitesArray.push(dbcrewdata[i].turbineNumber);
      crewnameArray.push(dbcrewdata[i].crewName);
      starttimeArray.push(dbcrewdata[i].startTime);
      endtimeArray.push(dbcrewdata[i].endTime);
      dateOnlyArray.push(dbcrewdata[i].date);
    }

    //Add the events to timetable
    addEventToTimeTable(crewnameArray, turbinesitesArray, starttimeArray, endtimeArray, dateOnlyArray);
    
    var renderer = new Timetable.Renderer(timetable);
    renderer.draw('.timetable');
  })
}

//Function to generate the events on the time table
function addEventToTimeTable(crewArray, turbineArray, startTimeArray, endTimeArray, dateArray){

  var totalRecord = crewArray.length;
  startDateAndTime = combineDateTime(dateArray, startTimeArray);
  endDateAndTime = combineDateTime(dateArray, endTimeArray);

  for(var i = 0; i < totalRecord; i++){
    timetable.addEvent(crewArray[i], turbineArray[i], new Date(startDateAndTime[i]), new Date(endDateAndTime[i]), {class: crewArray[i].replace(/\s+/g, '')}, {url: "../InputPage.html"}); 
   }
}

//Function to combine date and time together so it can be passed into addEvent for timetable
function combineDateTime(dateArray, timeArray){
  
  var length = dateArray.length;
  var resultarray = [];

  for(var i = 0; i < length; i++){
     resultarray[i] = dateArray[i] + " " + timeArray[i];
  }
  return resultarray;
}



// timetable.addLocations(TurbineSites);

// timetable.addLocations(['Rotterdam', 'Madrid', 'Los Angeles', 'London', 'New York', 'Jakarta', 'Tokyo']);

// timetable.addEvent('Sightseeing', 'Rotterdam', new Date(2015,7,17,9,00), new Date(2015,7,17,11,30), { url: '#' });
// timetable.addEvent('Zumba', 'Madrid', new Date(2015,7,17,12), new Date(2015,7,17,13), { url: '#' });
// timetable.addEvent('Zumbu', 'Madrid', new Date(2015,7,17,13,30), new Date(2015,7,17,15), { url: '#' });
// timetable.addEvent('Lasergaming', 'London', new Date(2015,7,17,17,45), new Date(2015,7,17,19,30), { class: 'vip-only', data: { maxPlayers: 14, gameType: 'Capture the flag' } });
// timetable.addEvent('All-you-can-eat grill', 'New York', new Date(2015,7,17,21), new Date(2015,7,18,1,30), { url: '#' });
// timetable.addEvent('Hackathon', 'Tokyo', new Date(2015,7,17,11,30), new Date(2015,7,17,20)); // options attribute is not used for this event
// timetable.addEvent('Tokyo Hackathon Livestream', 'Los Angeles', new Date(2015,7,17,12,30), new Date(2015,7,17,16,15)); // options attribute is not used for this event
// timetable.addEvent('Lunch', 'Jakarta', new Date(2015,7,17,9,30), new Date(2015,7,17,11,45), { onClick: function(event) {
//   window.alert('You clicked on the ' + event.name + ' event in ' + event.location + '. This is an example of a click handler');
// }});
// timetable.addEvent('Cocktails', 'Rotterdam', new Date(2015,7,18,00,00), new Date(2015,7,18,02,00), { class: 'vip-only' });

// var renderer = new Timetable.Renderer(timetable);
// renderer.draw('.timetable');

});

