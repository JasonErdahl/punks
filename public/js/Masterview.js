$(document).ready(function () {

  //Define and set up variables for the timetable js 
  var timetable = new Timetable();
  timetable.setScope(0, 23); //this will set the time frame to be 4:00am to 3:00am
  var TurbineSites = ['Turbine Site 1', 'Turbine Site 2', 'Turbine Site 3', 'Turbine Site 4', 'Turbine Site 5'];
  timetable.addLocations(TurbineSites);

  //Global variables
  var currentId;
  var dbcrewdata = [];
  var turbinesitesArray = [];
  var crewnameArray = [];
  var starttimeArray = [];
  var endtimeArray = [];
  var dateOnlyArray = [];
  var startDateAndTime = [];
  var endDateAndTime = [];
  var idArray = [];

  //Variables for input values for the modal
  var TurbineSite = $("#turbineSite");
  var CrewName = $("#crewName");
  var StartTime = $("#startTime");
  var EndTime = $("#endTime");

  //Get the crew plans and display it on the timetable
  getCrewPlans();

  //Helper Function to get all the crew plan data
  function getCrewPlans() {
    //Ajax call to get data from the api
    $.get("/api/crewPlan", function (result) {

      dbcrewdata = result;

      //Loop through the array break up data into array
      for (var i = 0; i < dbcrewdata.length; i++) {
        turbinesitesArray.push(dbcrewdata[i].turbineNumber);
        crewnameArray.push(dbcrewdata[i].crewName);
        starttimeArray.push(dbcrewdata[i].startTime);
        endtimeArray.push(dbcrewdata[i].endTime);
        dateOnlyArray.push(dbcrewdata[i].date);
        idArray.push(dbcrewdata[i].id);
      }

      //Add the events to timetable
      addEventToTimeTable(crewnameArray, turbinesitesArray, starttimeArray, endtimeArray, dateOnlyArray, idArray);

      var renderer = new Timetable.Renderer(timetable);
      renderer.draw('.timetable');
    });
  }

  //Helper Function to generate the events on the time table
  function addEventToTimeTable(crewArray, turbineArray, startTimeArray, endTimeArray, dateArray, idArray) {

    var totalRecord = crewArray.length;
    startDateAndTime = combineDateTime(dateArray, startTimeArray);
    endDateAndTime = combineDateTime(dateArray, endTimeArray);

    for (var i = 0; i < totalRecord; i++) {
      timetable.addEvent(crewArray[i], turbineArray[i], new Date(startDateAndTime[i]), new Date(endDateAndTime[i]), {
        onClick: function (event) {

          currentId = event.options.data.id;
          console.log(event);
          console.log("start:"+convert2(event.startDate));
          console.log("end:"+convert2(event.endDate));
          //Get the events info to populate the modal
          $("#crewNameModal").text(event.name);
          $("#turbineSiteModal").text(event.location);
          $("#startTimeModal").text(event.startDate);
          $("#endTimeModal").text(event.endDate);
          $('#crewName option[value="'+event.name+'"]').attr("selected", "selected");
          $('#turbineSite option[value="'+event.location+'"]').attr("selected", "selected");
          $('#startTime option[value="'+convert2(event.startDate)+'"]').attr("selected", "selected");
          $('#endTime option[value="'+convert2(event.endDate)+'"]').attr("selected", "selected");
          $("#crewPlanModal").modal();
        },
        class: crewArray[i].replace(/\s+/g, ''),
        data: {
          id: idArray[i]
        }
      });
    }
  }

  //Helper Function to combine date and time together so it can be passed into addEvent for timetable
  function combineDateTime(dateArray, timeArray) {

    var length = dateArray.length;
    var resultarray = [];

    for (var i = 0; i < length; i++) {
      resultarray[i] = dateArray[i] + " " + timeArray[i];
    }
    return resultarray;
  }

  //Helper Function to delete the crew plan
  function deleteCrewPlan() {

    $.ajax({
      method: "DELETE",
      url: "/api/crewPlan/" + currentId
    }).then(() => {
      location.reload();
      getCrewPlans();
    });
  }

  //Helper Function to update crew plan
  function updateCrewPlan(crewPlan) {

    $.ajax({
      method: "PUT",
      url: "/api/crewPlan/" + currentId,
      data: crewPlan
    }).then(() => {
      location.reload();
      getCrewPlans();
    });
  }

  function convert2(str) {
    var date = new Date(str),
        hours = (date.getHours()),
        minutes  = ("0" + date.getMinutes()).slice(-2);
    return [ hours, minutes ].join(":");
  }

  //Listening to delete button event in modal
  $("#deleteBtn").on("click", function (event) {

    event.preventDefault();
    deleteCrewPlan();
  });


  //Listening to save updates event in modal
  $("#saveBtn").on("click", function (event) {
    event.preventDefault();

    var updatedCrewPlan = {
      turbineNumber: TurbineSite.val(),
      crewName: CrewName.val(),
      startTime: StartTime.val(),
      endTime: EndTime.val(),
    };

    var startTemp = new Date("August 23, 2010 " + updatedCrewPlan.startTime);
    startTemp = startTemp.getTime();
    var endTemp = new Date("August 23, 2010 " + updatedCrewPlan.endTime);
    endTemp = endTemp.getTime();

    $('#ModalAlerts').empty();

    if (updatedCrewPlan.turbineNumber === null) {
        $('#ModalAlerts').text('Choose turbine site!');
        return;
    } else if (updatedCrewPlan.crewName === null) {
        $('#ModalAlerts').text('Choose crew name!');
        return;
    } else if (updatedCrewPlan.startTime === null) {
        $('#ModalAlerts').text('Choose start time!');
        return;
    } else if (updatedCrewPlan.endTime === null) {
        $('#ModalAlerts').text('Choose end time!');
        return;
    } else if (startTemp >= endTemp) {
        $('#ModalAlerts').text('ERROR: End time is earlier or the same as the start time!');
        return;
    }   

    updateCrewPlan(updatedCrewPlan)
  });

});