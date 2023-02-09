$(document).ready(function () {

    const apiKey = "c31e504839cbc7b7623cd443f986305d";
    let inputValue = "";
    //  const apiKey = "ffb87895b4b344b0c03e31fa9f5d070e";  
    function urlBuilding(inputValue) {
        const geoLocationUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + inputValue + "&appid=" + apiKey + "&limit=1";
        return geoLocationUrl;
    }

    let locationName = "";
    //This click event is the entry into the app 
    //After clicking the fetchData function is making two requests one for the geolocation and another one for the forecast with the geolocation value
    $("#search-button").on("click", function (event) {
        event.preventDefault();

        inputValue = $("#search-input").val().trim();



        fetchData().then(data => {
            let title = "5 Days Forecast";
            $("#subTitle").text(title);
            $("#forecast").empty();
            $("#today").empty();
            // console.log("The name " + data.city.name);

            displayForecast(data);
            renderButtons();

        }); //end of fetch data 
    }); //end of on click event

    // if (inputValue === "" || undefined || null ){ alert("Please enter a valid city name !!")}  else{


    //This function is making the requests
    function fetchData() {
        return fetch(urlBuilding(inputValue))
            .then(firstResponse => firstResponse.json())
            .then(firstData => {
                locationName = firstData[0].name;
                // console.log("This is the first data name :" + firstData[0].name);
                localStorage.setItem("name", firstData[0].name);
                // console.log("This is local varialble" + localStorage.getItem(name));
                return fetch("https://api.openweathermap.org/data/2.5/forecast/daily?lat=" + firstData[0].lat + "&lon=" + firstData[0].lon + "&cnt=6&appid=" + apiKey + "&units=metric")
                    .then(secondResponse => secondResponse.json())
                    .then(secondData => {
                        return secondData;
                    });
            });
    } //end of fetchData Function


    //This function is rendering is appending the buttons to the html page
    function renderButtons() {

        $("#buttons-view").empty();
        let button = "<button class='search'  id='historyButton' data-name=" + inputValue + "  > " + inputValue + "</button>";
        $("#history").append(button);
    }

    //Function for displaying the forecast on the html
    function displayForecast(data) {
        for (let i = 0; i < data.list.length; i++) {
            if (i === 0) {
                console.log("this is the location name :" + locationName);
                date = moment.unix(data.list[i].dt).format("DD/MM/YYYY");
                let li = "<ul id='current_date' class='day'> <li id='city_name' > " + locationName + " </li>   <li id='date' class='forecast date'> " + date + " </li>   <li id='icon' class='forecast '> <img class='icon' src='http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png' " +
                    " </li>  <li id='humidity' class='forecast'> Humidity : " + data.list[i].humidity +
                    "</li>     <li id=''temp  class='forecast temp'> Temp: " + data.list[i].temp.day +
                    "'\u2103'</li>     <li id='wind'  class='forecast speed'> Wind: " + data.list[i].speed +
                    "km/h</li>  </ul> ";
                $("#today").append(li);

            } else {
                date = moment.unix(data.list[i].dt).format("DD/MM/YYYY");
                //   console.log("this is not need to go onlly 5 times  ");
                let li = "<ul class='day'> <li class='forecast date'> " + date + " </li>   <li  class='forecast '> <img class='icon' src='http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png' " +
                    " </li>  <li class='forecast'> Humidity : " + data.list[i].humidity +
                    "</li>     <li  class='forecast temp'> Temp: " + data.list[i].temp.day +
                    "'\u2103'</li>     <li  class='forecast speed'> Wind: " + data.list[i].speed +
                    "km/h</li>  </ul> ";
                $("#forecast").append(li);



            } //else end 


        } //end of loop 

    } //end of display function



    //This function is fetching the data 



    //This click event is dealing with the history buttons
    //Every time a button is clicked the ajax call is doing the same thing as the fetch api above is getting to requests one for geolocation and another one for the forecast
    //The difference is that this time instead of the input value it is passed the attribute name of the clicked button


    // }//end of if






    $("#history").on("click", function (event) {


         locationName = event.target.getAttribute('data-name');
        console.log(" This is the history input  which needs to change " + locationName );
        const geoLocationUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + locationName + "&appid=" + apiKey + "&limit=1";


        $.ajax({
            method: "GET",
            url: geoLocationUrl,
            success: function (response) {
                const apiLocation = "https://api.openweathermap.org/data/2.5/forecast/daily?lat=" + response[0].lat + "&lon=" + response[0].lon + "&cnt=6&appid=" + apiKey + "&units=metric";
                // console.log(apiLocation);
                // console.log(response);
                // console.log("latitude is : " + response[0].lat + " and longitude " + response[0].lon);
                // console.log(response[0].name);

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


}); //end of ready Function