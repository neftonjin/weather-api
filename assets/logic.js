$(document).ready(function () {

    const apiKey = "c31e504839cbc7b7623cd443f986305d";
    let inputValue = ""; // value that the user is searching 
    let locationName = ""; // the value that will show when the user click on history button
    // array that will save all the searched locations
    //  const apiKey = "ffb87895b4b344b0c03e31fa9f5d070e";  
    let inputArray;
    renderHistoryButtons();

    //This function is clearing the history

    function clearHistory() {
        localStorage.clear();
    }
    //calling the clear history function
    $(".clearHistory").on("click", clearHistory);

    //This function stores the input values of the user in to the local storage
    function historyStorage(inputValue) {
        let dataAsString = localStorage.getItem("inputHistory");

        if (dataAsString === null) {
            inputArray = [];
        } else {
            inputArray = Array.from(new Set(JSON.parse(dataAsString)));
        }
        inputArray.push(inputValue);
        dataAsString = JSON.stringify(inputArray);
        localStorage.setItem("inputHistory", dataAsString);
    }

    //This function retrieve the values from local storage
    function retrieveHistory() {
        let historyData = localStorage.getItem("inputHistory");
        let history = JSON.parse(historyData);
        return history;
    }
    console.log("This is the history function result : " + retrieveHistory());
    //This function is returning the url of the api with the query name
    function urlBuilding(inputValue) {
        const geoLocationUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + inputValue + "&appid=" + apiKey + "&limit=1";
        return geoLocationUrl;
    }


    //This click event is the entry into the app 
    //After clicking the fetchData function is making two requests one for the geolocation and another one for the forecast with the geolocation value
    $("#search-button").on("click", function (event) {
        inputValue = $("#search-input").val().trim();
        if (inputValue === "" || inputValue === undefined || inputValue === null ){ alert("Search can`t be empty!!")}  else{
        event.preventDefault();

        

        fetchData().then(data => {
            let title = "5 Days Forecast";
            $("#subTitle").text(title);
            $("#forecast").empty();
            $("#today").empty();
            

            displayForecast(data);

            historyStorage(locationName);
            renderButtons();

        }); //end of fetch data 

    }//end of if statement

    }); //end of on click event

    // 


    //This function is making the requests
    function fetchData() {
        return fetch(urlBuilding(inputValue))
            .then(firstResponse => firstResponse.json())
            .then(firstData => {
                if (firstData[0].name) {
                    locationName = firstData[0].name;
                    return fetch("https://api.openweathermap.org/data/2.5/forecast/daily?lat=" + firstData[0].lat + "&lon=" + firstData[0].lon + "&cnt=6&appid=" + apiKey + "&units=metric")
                        .then(secondResponse => secondResponse.json())
                        .then(secondData => {
                            return secondData;
                        });
                } //if end
                else {
                    return;
                }
            });

    } //end of fetchData Function


    //This function is  appending the buttons to the html page
    function renderButtons() {

        let button = "<button class='search btn btn-info'  id='historyButton' data-name=" + inputValue + "  > " + inputValue + "</button>";
        $("#history").append(button);
    }
    // This function is appending the history buttons from the local storage to the html
    function renderHistoryButtons() {
        let history = retrieveHistory();
        if (history === null || history === undefined || "") {

            return;
        } else {
            history.forEach(function (element) {
                let button = "<button class='search btn btn-info'  id='historyButton' data-name=" + element + "  > " + element + "</button>";
                $("#history").append(button);
            });

        }


    }
    //Function for displaying the forecast on the html
    function displayForecast(data) {
        for (let i = 0; i < data.list.length; i++) {
            if (i === 0) {
               
                date = moment.unix(data.list[i].dt).format("DD/MM/YYYY");
                let li = "<ul id='current_date' class='day'> <li id='city_name' > " + locationName + " </li>   <li id='date' class='forecast date'> " + date + " </li>   <li id='icon' class='forecast '> <img class='icon' src='http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png' " +
                    " </li>  <li id='humidity' class='forecast'> Humidity : " + data.list[i].humidity +
                    "</li>     <li id=''temp  class='forecast temp'> Temp: " + data.list[i].temp.day +
                    "\u2103</li>     <li id='wind'  class='forecast speed'> Wind: " + data.list[i].speed +
                    "km/h</li>  </ul> ";
                $("#today").append(li);

            } else {
                date = moment.unix(data.list[i].dt).format("DD/MM/YYYY");
               
                let li = "<ul class='day'> <li class='forecast date'> " + date + " </li>   <li  class='forecast '> <img class='icon' src='http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png' " +
                    " </li>  <li class='forecast'> Humidity : " + data.list[i].humidity +
                    "</li>     <li  class='forecast temp'> Temp: " + data.list[i].temp.day +
                    "\u2103</li>     <li  class='forecast speed'> Wind: " + data.list[i].speed +
                    "km/h</li>  </ul> ";
                $("#forecast").append(li);



            } //else end 


        } //end of loop 

    } //end of display function



    //This function is fetching the data 



    
   


    //  }//end of if





   //Every time a button is clicked the ajax call is doing the same thing as the fetch api above is getting to requests one for geolocation and another one for the forecast
    //The difference is that this time instead of the input value it is passed the attribute name of the clicked button
    $("#history").on("click", function (event) {


        locationName = event.target.getAttribute('data-name');
        const geoLocationUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + locationName + "&appid=" + apiKey + "&limit=1";


        $.ajax({
            method: "GET",
            url: geoLocationUrl,
            success: function (response) {
                const apiLocation = "https://api.openweathermap.org/data/2.5/forecast/daily?lat=" + response[0].lat + "&lon=" + response[0].lon + "&cnt=6&appid=" + apiKey + "&units=metric";


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

    retrieveHistory();  // this call will populate the html with the buttons stored in local storage

}); //end of ready Function