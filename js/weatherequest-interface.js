var apiKey = "e572e1a4c7b5d74308c11f537d1682e0";

$(document).ready(function(){
  $('#weatherLocation').submit(function(){
    city = "Portland";
  });
  $('#query').click(function(city){
    $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=' + apiKey, function (response) {
        console.log(response.main.temp);
    });
  });
});
