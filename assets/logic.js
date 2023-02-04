$(document).ready(function () {


    const apiKey = "ffb87895b4b344b0c03e31fa9f5d070e";

    $("#search-button").on("click", function (event) {
        event.preventDefault();

        const inputValue = $("#search-input").val();
        const geoLocationUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + inputValue + "&appid=" + apiKey;

        function fetchData() {
            return fetch(geoLocationUrl)
                .then(firstResponse => firstResponse.json())
                .then(firstData => {
                    return fetch("https://api.openweathermap.org/data/2.5/forecast/?lat=" + firstData[0].lat + "&lon=" + firstData[0].lon + "&cnt=20&appid=" + apiKey)
                        .then(secondResponse => secondResponse.json())
                        .then(secondData => {
                            return secondData;
                        });
                });
        }//end of fetchData Function

        fetchData().then(data => {
            let forecasts = data.list.slice(0, 5 * 8);  // get the next five days of forecasts, 8 forecasts per day
            console.log(forecasts);
            console.log(data);
            console.log(data.list[0].dt_txt)

        });

    }); //end of on click event





}); //end of ready Function

//---------------------------------- changed

// fetch(geoLocationUrl)
        //     .then(response => response.json())
        //     .then(data => {})
        //     .catch(error => console.error(error));