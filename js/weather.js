const APPID = 'ad8f06e0d4b853d6bad26b776adfb233';

// fetch 예시
async function async_fetch(url) {
    let response = await fetch(url)
    if (response.ok) return await response.json()
    throw new Error(response.status)
}

// fetch 예시
async function async_fetch2(urls) {
    const jsonPromises = urls.map(async url => {
        const response = await fetch(url);
        return response.json();
    });    
}

// const weather = await getWeather(); // 호출 방법
async function getWeather(lat, lon) {
    const uri = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APPID}&units=metric`;
    // const response = await fetch(uri).catch(error => null);
    // const weather = await response.json().catch(error => null);
    const weather = await fetch(uri)
        .then(response => response.json().catch(error => null))
        .catch(error => null);
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
    if(position)
    {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        return { lat, lon };
    }

    return null;
}

async function paintWeatherText() {
    const coords = await getCoords();
    if (coords) {
        const w = await getWeather(coords.lat, coords.lon);
        if(w)
        {
            // console.dir(w);
            const description = w.weather[0].description;
            // const main = w.weather[0].main;
            // const id = w.weather[0].id;
            const icon = w.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`
            const temp = w.main.temp;
            // const feels_like = w.main.feels_like;
            // const temp_max = w.main.temp_max;
            // const temp_min = w.main.temp_min;
            //-2˚/11˚
            //4도씨℃ 날씨 양식 예시
            const text = ` ${description} ${temp}℃ in ${w.name}, ${w.sys.country}`;
            const weatherIcon = document.querySelector('#js-weather-icon');
            weatherIcon.src = iconUrl;
            
            const weatherText = document.querySelector('#js-weather-text');
            weatherText.innerHTML = text;
        }
    }
}

function init() {
    paintWeatherText();
}

init();