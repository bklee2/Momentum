const APPID = 'ad8f06e0d4b853d6bad26b776adfb233';


async function async_fetch(url) {
    let response = await fetch(url)
    if (response.ok) return await response.json()
    throw new Error(response.status)
}

async function async_fetch2(urls) {
    const jsonPromises = urls.map(async url => {
        const response = await fetch(url);
        return response.json();
    });    
}

// const weather = await getWeather(); // 호출 방법
async function getWeather(lat, lon) {
    const uri = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APPID}&units=metric`;
    const response = await fetch(uri).catch(error => null);
    const weather = await response.json().catch(error => null);
   
    // const weather = {
    //     lat: json.coord.lat,
    //     lon: json.coord.lon,
    //     feels_like: json.main.feels_like,
    //     humidity: json.main.humidity,
    //     pressure: json.main.pressure,
    //     temp: json.main.temp,
    //     temp_max: json.main.temp_max,
    //     temp_min: json.main.temp_min,
    //     name: json.name,
    //     country: json.sys.country,
    //     sunrise: json.sys.sunrise,
    //     sunset: json.sys.sunset,
    //     description: json.weather[0].description,
    //     icon: json.weather[0].icon,
    //     main: json.weather[0].main,
    //     winddeg: json.wind.deg,
    //     windspeed: json.wind.speed,
    // };
    return weather;
}

async function getCoords() {
    if (!navigator.geolocation) { // GPS를 지원하지 않으면
        return null;
    } 

    const getPosition = () => {
        return new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject));
    }
    const position = await getPosition().catch(error => null);
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    return { lat, lon };
}

async function paintWeatherText() {
    //location.
    // 위치 가져오기
    // 날씨 가져오기
    // 텍스트 적용
    const coords = await getCoords();
    if (coords) {
        const w = await getWeather(coords.lat, coords.lon);
        if(w)
        {
            console.dir(w);
            console.log(w.name);
            const text = ` @ ${w.name}, ${w.sys.country}`;
            w.weather[0].description;
            w.weather[0].icon;
            w.weather[0].main;
            w.weather[0].id;
            const weatherText = document.querySelector('.js-weather');
        }
    }
}

function init() {
    paintWeatherText();
}

init();