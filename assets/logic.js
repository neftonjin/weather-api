$(document).ready(function () {

const apiKey = "c31e504839cbc7b7623cd443f986305d"
// const apiKey = "ffb87895b4b344b0c03e31fa9f5d070e";  

$("#search-button").on("click", function (event) {
    event.preventDefault();
    const inputValue = $("#search-input").val().trim();
    const geoLocationUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + inputValue + "&appid=" + apiKey + "&limit=1";
    let locationName="";
    
    function fetchData() {
        return fetch(geoLocationUrl)
            .then(firstResponse => firstResponse.json())
            .then(firstData => {
                locationName=firstData[0].name;
                console.log("This is the first data name" +firstData[0].name);
                return fetch("https://api.openweathermap.org/data/2.5/forecast/daily?lat=" + firstData[0].lat + "&lon=" + firstData[0].lon + "&cnt=6&appid=" + apiKey + "&units=metric")
                    .then(secondResponse => secondResponse.json())
                    .then(secondData => {
                        return secondData;
                    }); 
            });
    } //end of fetchData Function

    function renderButtons() {

        $("#buttons-view").empty();

        let button = "<button class='search'  id='historyButton' data-name=" + inputValue + "  > " + inputValue + "</button>";
        $("#history").append(button);
    }

    fetchData().then(data => {
        let title = "5 Days Forecast";
        $("#subTitle").text(title);
        $("#forecast").empty();
        $("#today").empty();
        console.log("The name "+data.city.name );

        function displayForecast(data) {
            for (let i = 0; i < data.list.length; i++) {
                if (i === 0) {

                    date = moment.unix(data.list[i].dt).format("DD/MM/YYYY");
                    let li = "<ul id='current_date' class='day'> <li id='city_name' > " + locationName + " </li>   <li id='date' class='forecast date'> " + date + " </li>   <li id='icon' class='forecast '> <img class='icon' src='http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png' " +
                        " </li>  <li id='humidity' class='forecast'> Humidity : " + data.list[i].humidity +
                        "</li>     <li id=''temp  class='forecast temp'> Temp: " + data.list[i].temp.day +
                        "'\u2103'</li>     <li id='wind'  class='forecast speed'> Wind: " + data.list[i].speed +
                        "km/h</li>  </ul> ";
                    $("#today").append(li);

                } else {
                    date = moment.unix(data.list[i].dt).format("DD/MM/YYYY");

                    let li = "<ul class='day'> <li class='forecast date'> " + date + " </li>   <li  class='forecast '> <img class='icon' src='http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png' " +
                        " </li>  <li class='forecast'> Humidity : " + data.list[i].humidity +
                        "</li>     <li  class='forecast temp'> Temp: " + data.list[i].temp.day +
                        "'\u2103'</li>     <li  class='forecast speed'> Wind: " + data.list[i].speed +
                        "km/h</li>  </ul> ";
                    $("#forecast").append(li);



                } //else end 


            } //end of loop 
        } //end of display function
        displayForecast(data);
        renderButtons();

        $("#history").on("click", function (event) {
           

            let buttonClick = event.target.getAttribute('data-name');
            console.log(" this is the history input " + buttonClick);
            const geoLocationUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + buttonClick + "&appid=" + apiKey + "&limit=1";


            $.ajax({
                method: "GET",
                url: geoLocationUrl,
                success: function (response) {
                    const apiLocation = "https://api.openweathermap.org/data/2.5/forecast/daily?lat=" + response[0].lat + "&lon=" + response[0].lon + "&cnt=6&appid=" + apiKey + "&units=metric";
                    console.log(apiLocation);
                    console.log(response);
                    console.log("latitude is : " + response[0].lat + " and longitude " + response[0].lon);
                    console.log(response[0].name);

                   
                    
                    $.ajax({
                        method: "GET",
                        url: apiLocation,
                        success: function (response) {
                            let title = "5 Days Forecast";
                            $("#subTitle").text(title);
                            $("#forecast").empty();
                            $("#today").empty();
                            displayForecast(response);
                        }
                    });

                }

                


            });
        });



    }); //end of fetch data 



}); //end of on click event



 }); //end of ready Function

