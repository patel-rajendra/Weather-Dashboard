//Open Weather Map API key
var apiKey = "ae73148c56c6f5580bee66b9c7ed810c";

// function to search current weather of searched city 
function searchCity(event){
   
    event.preventDefault();
    
    var cityInput = $("#searchcity").val();
    
    if(cityInput === "")
    {
        return;
    } 
   
    searchCurrentWeather(cityInput);
    
    populateSearchHistory(cityInput);
    
    $("#searchcity").val("");
}

// function to fetch current weather of city from current weather data api on openweathermap.
function searchCurrentWeather(city){

    // "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}"
    var searchQueryURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+ apiKey; 

    // Seach Current Weather
    fetch(searchQueryURL)
        .then(function (response) {
          return response.json();
        }).then(function(response){
        
        // Log the queryURL
        console.log("Search Query URL : "+searchQueryURL);

        // Convert the temp to fahrenheit
        var tempF = (response.main.temp - 273.15) * 1.80 + 32;

        // Convert Kelvin to celsius : 0K − 273.15 = -273.1°C   
        var tempC = (response.main.temp - 273.15);

        var currentDate = new Date().toLocaleDateString();
     
        var latitude = response.coord.lat;
        var longitude = response.coord.lon;
        
        //https://api.openweathermap.org/data/2.5/uvi?lat=37.75&lon=-122.37 : uv api url
        var uvQueryURL = "https://api.openweathermap.org/data/2.5/uvi?lat="+latitude+"&lon="+longitude+"&appid="+ apiKey;

        var cityId = response.id;
        
        // "https://api.openweathermap.org/data/2.5/forecast?id="+cityId+"&cnt=5&units=imperial&appid="+apiKey;
        var forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?id="+cityId+"&units=imperial&appid="+apiKey;
          
        $("#city-card").show();
        
        $("#temperature").text("Temperature : "+tempF.toFixed(2)+" °F/ "+tempC.toFixed(2)+"°C"); //SHIFT OPTION 8 for degree symbol
        $("#humidity").text("Humidity : "+response.main.humidity+" %");
        $("#windspeed").text("Wind Speed : "+response.wind.speed+" MPH");

        var imageIcon = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + response.weather[0].icon.toString() + ".png");

        $("#city-name").text(response.name + " ("+currentDate+") ").append(imageIcon);

        getUVIndex(uvQueryURL); 

        showForecast(forecastQueryURL);
        
    });   

}

// Starting Execute the script 
$(function(){
    $("#searchButton").on("click",searchCity);

    var history = JSON.parse(localStorage.getItem("history"));  
    
    // if search history exists in local storage
    if (history) {
        var lastSearchedCity = history[0];  //takes last searched city from localstorage
        searchCurrentWeather(lastSearchedCity); //loads last searched city's weather

        for(var i = 0 ; i < history.length; i++){
            
            var listitem = $("<li>").addClass("list-group-item previousCity").text(history[i]);  //populate search history in local storage to html page when page loads
            $("#historylist").append(listitem);    
            
        }
    } else {
        $("#city-card").hide();
        $("#5DayForecast").hide();
    }
});