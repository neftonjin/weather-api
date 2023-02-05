$(document).ready(function () {

    const apiKey = "c31e504839cbc7b7623cd443f986305d"
    // const apiKey = "ffb87895b4b344b0c03e31fa9f5d070e";  

    $("#search-button").on("click", function (event) {
        event.preventDefault();

        const inputValue = $("#search-input").val();
        const geoLocationUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + inputValue + "&appid=" + apiKey + "&limit=1";

        function fetchData() {
            return fetch(geoLocationUrl)
                .then(firstResponse => firstResponse.json())
                .then(firstData => {
                    return fetch("https://api.openweathermap.org/data/2.5/forecast/daily?lat=" + firstData[0].lat + "&lon=" + firstData[0].lon + "&cnt=5&appid=" + apiKey + "&units=metric")
                        .then(secondResponse => secondResponse.json())
                        .then(secondData => {
                            return secondData;
                        });
                });
        } //end of fetchData Function

        fetchData().then(data => {


            console.log(data);
            // console.log(data.list[0].dt)
            // console.log(data.list[0].dt_txt)
            const Day1 = moment().add(1, 'days').format("DD/MM/YYYY");
            const Day2 = moment().add(2, 'days').format("DD/MM/YYYY");
            const Day3 = moment().add(3, 'days').format("DD/MM/YYYY");
            const Day4 = moment().add(4, 'days').format("DD/MM/YYYY");
            const Day5 = moment().add(5, 'days').format("DD/MM/YYYY");
            data.list.forEach((element) => {
                let dataDate = moment.unix(element.dt);
                date = moment(dataDate).format("DD/MM/YYYY");
                now = moment().format("DD/MM/YYYY");

                // console.log("Api date " + date);
                // console.log("This is the current day " + now);
                switch (date) {
                    case now:
                        // if (date === now) {

                        //     // console.log("this is today ="+ date);
                        //     $("#date").text("(" + now + ")");
                        //     $("#icon").text(data.list[0].weather.icon);
                        //     $("#city_name").text(data.city.name);
                        //     $("#temp").text(Math.floor(data.list[0].temp.day) + '\u2103');
                        //     $("#wind").text(data.list[0].speed + "km/h");
                        //     $("#humidity").text(data.list[0].humidity + "%");
                        // }

                        data.list.forEach(
                            (element, i) => {
                                let li = "  <li id='day1' class='forecast'> Humidity : " + element.humidity + 
                                 "</li>     <li id='day2' class='forecast'>  "+ element.temp.day +
                                 "</li>     <li id='day3' class='forecast'> "+ element.speed+
                                 "</li>     <li id='day4' class='forecast'> "+ element.weather[0].icon+ " </li>" ;

                                $("#forecast_list").append(li);
                                console.log("The humidity is " + element.humidity);
                                console.log("The temperature is " + element.temp.day);
                                console.log("The speed is " + element.speed);
                                console.log("The humidity is " + element.humidity);
                                console.log("The icon is " + element.weather[0].icon);
                                console.log("----------------------------------------");
                                // console.log("this is today ="+ date);
                                // $("#date").text("(" + now + ")");
                                // $("#icon").text(data.list[0].weather.icon);
                                // $("#city_name").text(data.city.name);
                                // $("#temp").text(Math.floor(data.list[0].temp.day) + '\u2103');
                                // $("#wind").text(data.list[0].speed + "km/h");
                                // $("#humidity").text(data.list[0].humidity + "%");


                            }

                        )



                        break;
                    case Day1:
                        if (date === Day1) {

                            console.log("this first day =" + Day1);
                            $("#date1").text("(" + Day1 + ")");
                            $("#icon1").text(data.list[0].weather.icon);
                            $("#city_name1").text(data.city.name);
                            $("#temp1").text(Math.floor(data.list[0].temp.day) + '\u2103');
                            $("#wind1").text(data.list[0].speed + "km/h");
                            $("#humidity1").text(data.list[0].humidity + "%");
                        }
                        // console.log("this is 1");
                        break;
                        // case Day2:
                        //     if (date === Day2) {
                        //         console.log("this is today "+ date);
                        //         $("#date2").text("(" + now + ")");
                        //         $("#icon2").text(data.list[0].weather.icon);
                        //         $("#city_name2").text(data.city.name);
                        //         $("#temp2").text(Math.floor(data.list[0].main.temp) + '\u2103');
                        //         $("#wind2").text(data.list[i].wind.speed + "km/h");
                        //         $("#humidity2").text(data.list[0].main.humidity + "%");
                        //         console.log("this is 2 ");
                        //     }
                        //     break;
                        // case Day3:
                        //     if (date === Day3) {
                        //         console.log("this is today "+ date);
                        //         $("#date").text("(" + now + ")");
                        //         $("#icon").text(data.list[0].weather.icon);
                        //         $("#city_name").text(data.city.name);
                        //         $("#temp").text(Math.floor(data.list[0].main.temp) + '\u2103');
                        //         $("#wind").text(data.list[i].wind.speed + "km/h");
                        //         $("#humidity").text(data.list[0].main.humidity + "%");
                        //         console.log("this is 3 ");
                        //     }
                        //     console.log("this is 3");
                        //     break;
                        // case Day4:
                        //     if (date === Day4) {
                        //         console.log("this is today "+ date);
                        //         $("#date").text("(" + now + ")");
                        //         $("#icon").text(data.list[0].weather.icon);
                        //         $("#city_name").text(data.city.name);
                        //         $("#temp").text(Math.floor(data.list[0].main.temp) + '\u2103');
                        //         $("#wind").text(data.list[i].wind.speed + "km/h");
                        //         $("#humidity").text(data.list[0].main.humidity + "%");
                        //         console.log("this is 4 ");
                        //     }
                        //     console.log("this is 4");
                        //     break;
                        // case Day5:
                        //     if (date === Day5) {
                        //         console.log("this is today "+ date);
                        //         $("#date").text("(" + now + ")");
                        //         $("#icon").text(data.list[0].weather.icon);
                        //         $("#city_name").text(data.city.name);
                        //         $("#temp").text(Math.floor(data.list[0].main.temp) + '\u2103');
                        //         $("#wind").text(data.list[i].wind.speed + "km/h");
                        //         $("#humidity").text(data.list[0].main.humidity + "%");
                        //         console.log("this is 5 ");
                        //     }
                        //     console.log("this is 5");
                        //     break;
                        //     default:
                        //        break;
                }
            });
        });

    }); //end of on click event





}); //end of ready Function

//---------------------------------- changed