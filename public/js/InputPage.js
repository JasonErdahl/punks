$(document).ready(function(){

    //Variables for input values
    var TurbineSite = $("#turbineSite");
    var CrewName = $("#crewName");
    var StartTime = $("#startTime");
    var EndTime = $("#endTime");
    var DateVal = $("#date");

    //Listen to submit button click event
    $("#submitBtn").on("click", insertCrewPlan);

    //Helper Function to post new data to the database
    function insertCrewPlan(event){
        event.preventDefault();

        var crewplan = {
            turbineNumber: TurbineSite.val().trim(),
            crewName: CrewName.val().trim(),
            startTime: StartTime.val().trim(),
            endTime: EndTime.val().trim(),
            date: DateVal.val().trim()
        }

        //Make ajax call to post to the database
        $.post("/api/crewPlan", crewplan);
        clearInputFields();
    }

    //Helper function to clear input fields after they submit
    function clearInputFields(){
        TurbineSite.val("");
        CrewName.val("");
        StartTime.val("");
        EndTime.val("");
        DateVal.val("");
    }
 
})