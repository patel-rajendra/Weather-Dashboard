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