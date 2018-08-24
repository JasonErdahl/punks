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


});

