$(document).ready(function () {


    weatherMessages = {
        displayWeatherInformed: "Be Informed!",
        displayWeatherTitle: "Current Weather in",
        displayWeatherConditions: "Conditions",
        displayWeatherHumidity: "Humidity",
        displayWeatherPressure: "Pressure",
        displayWeatherTemp: "Temp",
        displayWeatherMaxTemp: "Max Temp",
        displayWeatherMinTemp: "Min Temp",
        displayWeatherWindSpeed: "Wind Speed",
        displayWeatherWindGust: "Gust",
        displayWeatherWindDirection: "Wind Direction",
        createHtmlPhone: "Phone number",
        createHtmlRating: "Rating",
        onClickRestaurantsHeading: "Recommended Restaurants",
        onClickLodgingHeading: "Recommended Lodging",
        onClickAttractionsHeading: "Recommended Attractions",

    };

    //Variables for input values
    var TurbineSite = $("#turbineSite");
    var CrewName = $("#crewName");
    var StartTime = $("#startTime");
    var EndTime = $("#endTime");
    var DateVal = $("#date");

    //Listen to submit button click event
    $("#submitBtn").on("click", insertCrewPlan);

    //Helper Function to post new data to the database
    function insertCrewPlan(event) {
        event.preventDefault();
        
        $("#inputStatus").empty();

        var crewplan = {
            turbineNumber: TurbineSite.val(),
            crewName: CrewName.val(),
            startTime: StartTime.val(),
            endTime: EndTime.val(),
            date: DateVal.val()
        };

        var startTemp = new Date("August 23, 2010 " + crewplan.startTime);
        startTemp = startTemp.getTime();
        var endTemp = new Date("August 23, 2010 " + crewplan.endTime);
        endTemp = endTemp.getTime();

        if (crewplan.turbineNumber === null) {
            $("#inputStatus").text("Choose turbine site!");
            return;
        } else if (crewplan.crewName === null) {
            $("#inputStatus").text("Choose crew name!");
            return;
        } else if (crewplan.startTime === null) {
            $("#inputStatus").text("Choose start time!");
            return;
        } else if (crewplan.endTime === null) {
            $("#inputStatus").text("Choose end time!");
            return;
        } else if (startTemp >= endTemp) {
            $("#inputStatus").text("End time is earlier or the same as the start time!");
            return;
        } else if (crewplan.date === '') {
            $("#inputStatus").text("Choose todays date!");
            return;
        }

        $("#inputStatus").text("Submission was successful.");
        //Make ajax call to post to the database
        $.post("/api/crewPlan", crewplan);
        clearInputFields();
    }

    //Helper function to clear input fields after they submit
    function clearInputFields() {
        $('input#date').val('');
        $("select").each(function () {
            this.selectedIndex = 0;
        });
    }

    $("#date").datepicker({
        minDate: 0
    });

});


// ###########################
// ###   displayWeather    ###
// ###########################
function displayWeather(location) {
    var APIKey = "77b90275619067390073f6ad77f070b0";
    //location = location.trim().split(' ').join(','); // API requires comma seperated location.

    // Here we are building the URL we need to query the database
    //var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+location+"&appid=" + APIKey;
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?zip=" + location + ",us&appid=" + APIKey;
    var htmlElements = '';

    // We then created an AJAX call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // Log the queryURL
        console.log(queryURL);
        // Log the resulting object
        console.log(response);
        var currentWeatherLength = response.weather.length;
        var currentConditions = "";

        for (i = 0; i < currentWeatherLength; i++) {
            //currentConditions += response.weather[i].main+' ('+response.weather[i].description+'), ';
            currentConditions += response.weather[i].description + ', ';
        }
        //remove trailing comma from string
        currentConditions = currentConditions.substring(0, currentConditions.lastIndexOf(","));
        var currentCity = response.name;
        var currentHumidity = response.main.humidity + ' %';
        var currentPressure = response.main.pressure;
        var currentTempF = temperatureConverterF(response.main.temp) + ' F ';
        var currentTempC = temperatureConverterC(response.main.temp) + ' C ';
        var currentTempMaxF = temperatureConverterF(response.main.temp_max) + ' F ';
        var currentTempMaxC = temperatureConverterC(response.main.temp_max) + ' C ';
        var currentTempMinF = temperatureConverterF(response.main.temp_min) + ' F ';
        var currentTempMinC = temperatureConverterC(response.main.temp_min) + ' C ';
        var currentWindSpeed = (response.wind.speed * 2.24).toFixed(1) + ' MPH ';
        var currentWindGust = (response.wind.gust * 2.24).toFixed(1) + ' MPH ';
        var currentWindDeg = getCardinal(response.wind.deg);


        console.log("windgust:" + currentWindGust);
        // Transfer content to HTML
        htmlElements += '<div class="card border-info mb-3">';
        htmlElements += '   <div class="card-header" style="background-color:#17a2b8; color:white; font-weight:bold;text-align:center;">' + weatherMessages.displayWeatherInformed + '</div>';
        htmlElements += '   <div class="card-body card-body-wrapper">';
        htmlElements += '       <div class="card-heading" id="currentWeather">';
        htmlElements += '           <p class="card-title"><strong>' + weatherMessages.displayWeatherTitle + ' ' + currentCity + '</strong></p>';
        htmlElements += '       </div>';
        htmlElements += '       <div class="card-body" id="weatherWrapper">';
        htmlElements += '           <div class="displayGustWarning txtRed txtBold"><h3>Warning a gust &gt; 10mph has been reported</h3></div>';
        htmlElements += '           <div>' + weatherMessages.displayWeatherConditions + ': ' + currentConditions + '</div>';
        htmlElements += '           <div>' + weatherMessages.displayWeatherHumidity + ': ' + currentHumidity + '</div>';
        htmlElements += '           <div>' + weatherMessages.displayWeatherPressure + ': ' + currentPressure + '</div>';
        htmlElements += '           <div>' + weatherMessages.displayWeatherTemp + ': ' + currentTempF + '/ ' + currentTempC + '</div>';
        htmlElements += '           <div>' + weatherMessages.displayWeatherMaxTemp + ': ' + currentTempMaxF + '/ ' + currentTempMaxC + '</div>';
        htmlElements += '           <div>' + weatherMessages.displayWeatherMinTemp + ': ' + currentTempMinF + '/ ' + currentTempMinC + '</div>';
        htmlElements += '           <div>' + weatherMessages.displayWeatherWindSpeed + ': ' + currentWindSpeed + ' <span class="displayGust">(' + weatherMessages.displayWeatherWindGust + ': ' + currentWindGust + ')</span></div>';
        htmlElements += '           <div>' + weatherMessages.displayWeatherWindDirection + ': ' + currentWindDeg + '</div>';
        htmlElements += '       </div>';
        htmlElements += '   </div>';
        htmlElements += '</div>';

        $('#weatherWrapper').append(htmlElements);

        $(".displayGustWarning").css("display", "none");
        if ((currentWindGust >= 20) && (isInteger(currentWindGust))) {
            console.log("wind gust warning");
            $(".displayGustWarning").css("display", "block");
        } else if (isNaN(currentWindGust)) {
            console.log("wind gust missing");
            $(".displayGust").css("display", "none");
        }

    });

}

// ###########################
// ### Utility Functions   ###
// ###########################
function temperatureConverterF(valNum) {
    valNum = parseFloat(valNum);
    return (((valNum - 273.15) * 1.8) + 32).toFixed(1);
}

function temperatureConverterC(valNum) {
    valNum = parseFloat(valNum);
    return (valNum - 273.15).toFixed(1);
}

function getCardinal(num) {
    var val = Math.floor((num / 22.5) + 0.5);
    var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)];
}

displayWeather("55455");