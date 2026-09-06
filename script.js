const apiKey = "YOUR_APIKEY";

const searchButton = document.querySelector(".search-box button");
const input = document.querySelector(".search-box input");
const cityName = document.querySelector(".city-name");
const temperature = document.querySelector(".temp");
const condition = document.querySelector(".condition");
const humidity = document.querySelector("#humidity");
const wind = document.querySelector("#wind");
const weatherIcon = document.querySelector("#weatherIcon");

searchButton.addEventListener("click", getWeather);

input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        getWeather();
    }
});

async function getWeather() {
    const city = input.value.trim();

    if (city === "") {
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            cityName.textContent = "City not found";
            temperature.textContent = "--";
            condition.textContent = "Please enter a valid city";
            humidity.textContent = "--";
            wind.textContent = "--";
            return;
        }

        cityName.textContent = `${data.name}, ${data.sys.country}`;
        temperature.textContent = Math.round(data.main.temp);
        condition.textContent = data.weather[0].description;


      const weather = data.weather[0].main;

if (weather === "Clear") {
    weatherIcon.innerHTML = `
        <svg width="90" height="90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="20"
                fill="#FFD93D"
                stroke="black"
                stroke-width="2"/>

            <g stroke="black" stroke-width="2">
                <line x1="50" y1="10" x2="50" y2="20"/>
                <line x1="50" y1="80" x2="50" y2="90"/>
                <line x1="10" y1="50" x2="20" y2="50"/>
                <line x1="80" y1="50" x2="90" y2="50"/>
            </g>
        </svg>
    `;
} else if (weather === "Clouds") {
    weatherIcon.innerHTML = `
        <svg width="90" height="90" viewBox="0 0 100 100">
            <path d="M20 60
                C20 50 29 44 38 47
                C42 38 56 37 61 47
                C71 46 78 53 78 62
                C78 70 72 75 64 75
                H30
                C23 75 18 69 20 60Z"
                fill="white"
                stroke="black"
                stroke-width="2"/>
        </svg>
    `;
} else if (weather === "Rain") {
    weatherIcon.innerHTML = `
        <svg width="90" height="90" viewBox="0 0 100 100">
            <path d="M20 55
                C20 45 29 39 38 42
                C42 33 56 32 61 42
                C71 41 78 48 78 57
                C78 65 72 70 64 70
                H30
                C23 70 18 64 20 55Z"
                fill="white"
                stroke="black"
                stroke-width="2"/>

            <g stroke="#4A90E2" stroke-width="3">
                <line x1="32" y1="73" x2="28" y2="85"/>
                <line x1="48" y1="73" x2="44" y2="85"/>
                <line x1="64" y1="73" x2="60" y2="85"/>
            </g>
        </svg>
    `;
} else if (weather === "Snow") {
    weatherIcon.innerHTML = `
        <svg width="90" height="90" viewBox="0 0 100 100">
            <path d="M20 55
                C20 45 29 39 38 42
                C42 33 56 32 61 42
                C71 41 78 48 78 57
                C78 65 72 70 64 70
                H30
                C23 70 18 64 20 55Z"
                fill="white"
                stroke="black"
                stroke-width="2"/>

            <g fill="black">
                <circle cx="32" cy="80" r="3"/>
                <circle cx="48" cy="80" r="3"/>
                <circle cx="64" cy="80" r="3"/>
            </g>
        </svg>
    `;
} else if (weather === "Thunderstorm") {
    weatherIcon.innerHTML = `
        <svg width="90" height="90" viewBox="0 0 100 100">
            <path d="M20 50
                C20 40 29 34 38 37
                C42 28 56 27 61 37
                C71 36 78 43 78 52
                C78 60 72 65 64 65
                H30
                C23 65 18 59 20 50Z"
                fill="white"
                stroke="black"
                stroke-width="2"/>

            <polygon points="48,62 38,80 48,80 43,93 60,72 50,72"
                fill="#FFD93D"
                stroke="black"
                stroke-width="1"/>
        </svg>
    `;
} else {
    weatherIcon.innerHTML = `
        <svg width="90" height="90" viewBox="0 0 100 100">
            <circle cx="40" cy="35" r="18"
                fill="#FFD93D"
                stroke="black"
                stroke-width="2"/>

            <path d="M25 65
                C25 55 34 49 43 52
                C47 43 61 42 66 52
                C76 51 82 58 82 67
                C82 75 76 80 68 80
                H35
                C28 80 23 74 25 65Z"
                fill="white"
                stroke="black"
                stroke-width="2"/>
        </svg>
    `;
}

        humidity.textContent = data.main.humidity;
        wind.textContent = Math.round(data.wind.speed * 3.6);

    } catch (error) {
        cityName.textContent = "Something went wrong";
        temperature.textContent = "--";
        condition.textContent = "Check your internet connection";
        humidity.textContent = "--";
        wind.textContent = "--";
    }
}
navigator.geolocation.getCurrentPosition(
    function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        getWeatherByLocation(latitude, longitude);
    },
    function () {
        input.value = "Pune";
        getWeather();
    }
);

async function getWeatherByLocation(latitude, longitude) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            return;
        }

        cityName.textContent = `${data.name}, ${data.sys.country}`;
        temperature.textContent = Math.round(data.main.temp);
        condition.textContent = data.weather[0].description;
        humidity.textContent = data.main.humidity;
        wind.textContent = Math.round(data.wind.speed * 3.6);

        // Your dynamic weather-icon code stays here
    } catch (error) {
        console.log(error);
    }
}