const city = "Delhi";  // Initial city
const btn = document.getElementById('btn');

async function apicall(place) {
  const url = `https://weather-api138.p.rapidapi.com/weather?city_name=${place}`;
  const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '7188c03851msh4b16f9e304fdae0p11d310jsn01023b63e3fc',
        'x-rapidapi-host': 'weather-api138.p.rapidapi.com'
    }
};

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('City not found or network error!');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching weather data:', error);
    window.alert(error.message);
  }
}

function updateWeatherData(res) {
  const weather_in = document.getElementById('weather-in');
  weather_in.innerText = `Weather in ${res.name}`;

  const temp = document.getElementById('temp');
  temp.innerText = `Temperature: ${(res.main.temp - 273).toFixed(2)}C`;

  const feels = document.getElementById('feels');
  feels.innerText = `Feels Like: ${(res.main.feels_like - 273).toFixed(2)}C`;

  const min_temp = document.getElementById('min-temp');
  min_temp.innerText = `Min Temperature: ${(res.main.temp_min - 273).toFixed(2)}C`;

  const max_temp = document.getElementById('max-temp');
  max_temp.innerText = `Max Temperature: ${(res.main.temp_max - 273).toFixed(2)}C`;

  const main = document.getElementById('main');
  main.innerText = `Weather: ${res.weather[0].main}`;

  const humid = document.getElementById('humid');
  humid.innerText = `Humidity: ${res.main.humidity}%`;

  const pres = document.getElementById('pres');
  pres.innerText = `Pressure: ${res.main.pressure}mb`;

  const wind_speed = document.getElementById('w-speed');
  wind_speed.innerText = `Wind Speed: ${res.wind.speed}Km/hr`;

  const visible = document.getElementById('visible');
  visible.innerText = `Visibility: ${(res.visibility / 1000).toFixed(2)}Km`;

  const w_dir = document.getElementById('w-dir');
  let direction = "Unavailable";
  const degree = res.wind.deg;
  if (degree <= 22.5 || degree >= 337.5) direction = "North";
  else if (degree >= 22.5 && degree <= 67.5) direction = "North-East";
  else if (degree >= 67.5 && degree <= 112.5) direction = "East";
  else if (degree > 112.5 && degree <= 157.5) direction = "South-East";
  else if (degree >= 157.5 && degree <= 202.5) direction = "South";
  else if (degree >= 202.5 && degree <= 247.5) direction = "South-West";
  else if (degree > 247.5 && degree <= 292.5) direction = "West";
  else direction = "North-West";

  w_dir.innerText = `Wind Direction: ${direction}`;
}

async function defaultCall(place) {
  const res = await apicall(place);
  if (res) {
    updateWeatherData(res);
  }
}

function callapiagain() {
  let text = document.getElementById('city').value;
  defaultCall(text);
}

btn.addEventListener('click', callapiagain);

// Initial call for the default city
defaultCall(city);
