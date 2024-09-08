let city = document.cookie;
if(document.cookie=="")
{
	city="Delhi";
}

function defaultCall(place){
	const url = `https://weather-api138.p.rapidapi.com/weather?city_name=${place}`;
	async function apicall(){
	const options = {
		method: 'GET',
		headers: {
			'x-rapidapi-key': '7188c03851msh4b16f9e304fdae0p11d310jsn01023b63e3fc',
			'x-rapidapi-host': 'weather-api138.p.rapidapi.com'
		}
	};
	
	try {
		const response = await fetch(url, options);
		const result = await response.json();
		//console.log(result);
		return result;
	} catch (error) {
		console.error(error);
	}
	
	}
	apicall()
	  .then(res =>{
		console.log(res);
		console.log(res.main.temp);
		let weather_in = document.getElementById('weather-in');
		weather_in.innerText = `Weather in ${res.name}`;
		let temp = document.getElementById('temp');
	    temp.innerText = `Temperature: ${(res.main.temp-273).toPrecision(2)}C`; 
		let feels = document.getElementById('feels');
		feels.innerText = `Feels Like: ${(res.main.feels_like-273).toPrecision(2)}C`;
		let min_temp = document.getElementById('min-temp');
		min_temp.innerText = `Min Temperature: ${(res.main.temp_min-273).toPrecision(2)}C`;
		let max_temp = document.getElementById('max-temp');
		max_temp.innerText = `Max Temperature: ${(res.main.temp_max-273).toPrecision(2)}C`;
		let main = document.getElementById('main');
		main.innerText = `Weather: ${res.weather[0].main}`; 
		let humid = document.getElementById('humid');
		humid.innerText = `Humidity: ${res.main.humidity}%`;
		let pres = document.getElementById('pres');
		pres.innerText = `Pressure: ${res.main.pressure}mb`;
		let wind_speed =  document.getElementById('w-speed');
		wind_speed.innerText = `Wind Speed: ${res.wind.speed}Km/hr`;
		let visible = document.getElementById('visible');
		visible.innerText = `Visibility: ${(res.visibility/1000).toPrecision(2)}Km`;
		let w_dir = document.getElementById('w-dir');
		let direction = "Unavailable";
		let degree = res.wind.deg;
		if(degree<=22.5 || degree>=337.5)
		{
			direction ="North";
		}
		else if(degree>=22.5 && degree<=67.5)
		{
			direction = "North-East";
		}
		else if(degree>=67.5 && degree<=112.5)
		{
			direction ="East";
		}
		else if(degree>112.5 && degree<=157.5)
		{
			direction = "South-East";
		}
		else if(degree>=157.5 && degree<=202.5)
		{
			direction ="South";
		}
		else if(degree>=202.5 && degree<=247.5)
		{
			direction= "South-West";
		}
		else if(degree>247.5 && degree<=292.5)
		{
			direction= "West";
		}
		else{
			direction = "North-West";
		}
		w_dir.innerText = `Wind Direction: ${direction}`;
	  })
	  .catch(error => {
		window.alert("City not found");
		console.error('Error handling fetchData:', error);
	  });
	  

}
defaultCall(city);
const btn = document.getElementById('btn');
function callapiagain(){
	let text = document.getElementById('city').value;
	document.cookie=text;
	defaultCall(text);
}

btn.addEventListener('click',callapiagain);
// added comment