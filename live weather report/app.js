// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

const weatherApi = {
    key: "3285502a29eccd000fed669a9dbc6676",
    Baseurl: "https://api.openweathermap.org/data/2.5/weather"
}

const searchInputBox = document.getElementById('input-box');
// event listenener function on keypress

searchInputBox.addEventListener('keypress', (event) => {
    if (event.keyCode == 13) {
        console.log(searchInputBox.value);
        getWeatherReport(searchInputBox.value);
    }
});

//get weather report

function getWeatherReport(city) {
    fetch(`${weatherApi.Baseurl}?q=${city}&appid=${weatherApi.key}&units=metric`)
        .then(weather => {
            return weather.json();
        }).then(showWeatherReport);
}

// show weather report
function showWeatherReport(weather) {
    console.log(weather);

    let city = document.getElementById('city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;


    let temperature = document.getElementById('temp');
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;c`;


    let minmaxtemp = document.getElementById('min-max')
    minmaxtemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;c (min) & ${Math.ceil(weather.main.temp_max)}&deg;c (max) `;


    let weatherType = document.getElementById('weather');
    weatherType.innerHTML = `${weather.weather[0].main}`;


    let date = document.getElementById('date');
    let todaydate = new Date();
    date.innerText = dateManage(todaydate);

    if (weatherType.textContent == 'Clear') {
        document.body.style.backgroundImage = "url('images/clear.jpg')";

    } else if (weatherType.textContent == 'Clouds') {
        document.body.style.backgroundImage = "url('images/cloud.jpg')";

    } else if (weatherType.textContent == 'Rain') {
        document.body.style.backgroundImage = "url('images/rain.jpg')";

    } else if (weatherType.textContent == 'Snow') {
        document.body.style.backgroundImage = "url('images/snow.jpg')";

    } else if (weatherType.textContent == 'Thunderstorm') {
        document.body.style.backgroundImage = "url('images/thunderstorm.jpg')";

       
    } else if (weatherType.textContent == 'Haze') {
        document.body.style.backgroundImage = "url('images/haze.jpg')";

    }else if (weatherType.textContent == 'Dust') {
        document.body.style.backgroundImage = "url('images/Dust.jpg')";

    }
}


// date manage
function dateManage(dateArg) {
    let days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    let months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];

    return `${date} ${month} (${day}) ${year}`;
}

