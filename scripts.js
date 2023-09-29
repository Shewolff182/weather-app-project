//variables
let searchBtnVariable = document.querySelector("#search-button");
//In your project, create a variable called userInput (or anything that makes sense to you), and save the input element into it
let userInput = document.querySelector("#input");
let userLocation = "London";
let cityElement = document.querySelector("#city");

let todayObj = {
    currentTemp: "",
    currentCity: "",
    currentState: "",
    currentCountry: "",
}

let threeDayForecast = [];

searchBtnVariable.addEventListener("click", function() {
    //in the first line of your function, create a variable called cityFromUser and set it equal to the value of userInput. 
    let cityFromUser = userInput.value;
    console.log(cityFromUser);
    
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=ad3cf70874184ceb9b9182403232609&q=${cityFromUser}&days=4`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        todayObj.currentTemp = data.current.temp_f;
        //1. loop over the array of three
        //  2. for each item, create a object that has the keys you need (average temp, precip, etc)
        //  3. push that object into threeDayForecast
        for (let i = 1; i < data.forecast.forecastday.length; i++) {
            let forecast = {
                date: data.forecast.forecastday[i].date,
                averageTemp: data.forecast.forecastday[i].avgtemp_f,
                hightTemp: data.forecast.forecastday[i].maxtemp_f,
                lowTemp: data.forecast.forecastday[i].mintemp_f,
                precipitation: data.forecast.forecastday[i].daily_chance_of_rain,
            };
            threeDayForecast.push(forecast);
        }
        console.log(threeDayForecast, "Three Day Forecast");
    })
    //add stuff to screen
    updateUI()
})

//show the data to the user
function updateUI() {
    cityElement.textContent = todayObj.currentCity;

}
