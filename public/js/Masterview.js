$(document).ready(function(){


//Define and set up variable for the timetable js 
var timetable = new Timetable();
timetable.setScope(4,3); //this will set the time frame to be 4:00am to 3:00am
var crewplans = []; 
var turbinesites = [];
var crewname = [];
var starttime = [];
var endtime = [];
var dateval = [];

//Function to get all the crew plan data
function crewPlans(){
  //Ajax call to get data from the api
  $.get("/api/crewPlan", function(data){
    crewplans = data;

    console.log("***crewplans is: " + crewplans);

  })
}

timetable.addLocations(['Rotterdam', 'Madrid', 'Los Angeles', 'London', 'New York', 'Jakarta', 'Tokyo']);

timetable.addEvent('Sightseeing', 'Rotterdam', new Date(2015,7,17,9,00), new Date(2015,7,17,11,30), { url: '#' });
timetable.addEvent('Zumba', 'Madrid', new Date(2015,7,17,12), new Date(2015,7,17,13), { url: '#' });
timetable.addEvent('Zumbu', 'Madrid', new Date(2015,7,17,13,30), new Date(2015,7,17,15), { url: '#' });
timetable.addEvent('Lasergaming', 'London', new Date(2015,7,17,17,45), new Date(2015,7,17,19,30), { class: 'vip-only', data: { maxPlayers: 14, gameType: 'Capture the flag' } });
timetable.addEvent('All-you-can-eat grill', 'New York', new Date(2015,7,17,21), new Date(2015,7,18,1,30), { url: '#' });
timetable.addEvent('Hackathon', 'Tokyo', new Date(2015,7,17,11,30), new Date(2015,7,17,20)); // options attribute is not used for this event
timetable.addEvent('Tokyo Hackathon Livestream', 'Los Angeles', new Date(2015,7,17,12,30), new Date(2015,7,17,16,15)); // options attribute is not used for this event
timetable.addEvent('Lunch', 'Jakarta', new Date(2015,7,17,9,30), new Date(2015,7,17,11,45), { onClick: function(event) {
  window.alert('You clicked on the ' + event.name + ' event in ' + event.location + '. This is an example of a click handler');
}});
timetable.addEvent('Cocktails', 'Rotterdam', new Date(2015,7,18,00,00), new Date(2015,7,18,02,00), { class: 'vip-only' });

var renderer = new Timetable.Renderer(timetable);
renderer.draw('.timetable');

});

