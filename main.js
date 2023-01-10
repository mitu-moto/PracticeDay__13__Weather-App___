const API_key = "9f08cf6d9160dbd2e26d5be65c96027b"

const getCurrectWeatherData = async() => {
    const city = "pune";
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`)
    return response.json();

}

const getHourlyForecast = async ({name : city}) => {
  const responce = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_key}`)
  const data = await responce.json();
//   console.log(data);
return data.list.map(forecast => {
const{main:{temp, temp_max,temp_min}, dt, dt_txt, weather:[{description,icon }] } = forecast;
return {temp, temp_max, temp_min, dt, dt_txt, description, icon}
})
}

const formatTemperature = (temp) => `${temp?.toFixed(1)}°`
const createIconUrl = (icon) => `http://openweathermap.org/img/wn/${icon}02x.png`

const loadCurrForecast = ({ name, main: { temp, temp_max, temp_min }, weather: [{ description }] }) =>{
    const currentForcastElement = document.querySelector("#current-forecast");
    currentForcastElement.querySelector(".city").textContent = name;
    currentForcastElement.querySelector(".temp").textContent = formatTemperature(temp);
    currentForcastElement.querySelector(".description").textContent = description;
    currentForcastElement.querySelector(".min-max-temp").textContent = `H: ${formatTemperature(temp_max)} L:${formatTemperature(temp_min)}`;


    // <h1>City Name</h1>
    // <p class="temp">Temp</p>
    // <p class="description">Description</p>
    // <p class="min-max-temp">High Low</p>
}

const loadHourlyForecast = (hourlyForcast)=>{
    console.log(hourlyForcast);
    let dataFor12Hours = hourlyForcast.slice(1,14);
    const hourlyContainer = document.querySelector(".hourly-container");

}


document.addEventListener("DOMContentLoaded",async()=>{ 
   const currentWeather = await getCurrectWeatherData();
   loadCurrForecast(currentWeather)
   const hourlyForcast= await getHourlyForecast(currentWeather);
loadHourlyForecast(hourlyForcast);

    for(let {temp, icon, dt_txt} of dataFor12Hours){
        innerHTMLString +=`<article>
                        <h2 class="time">${dt_txt.split(" ")[1]}</h2>
                        <img class="icon" src="${createIconUrl(icon)}"/>
                        <p class="hourly-temp">${formatTemperature(temp)}</p>
                    </article>`
    }
    hourlyContainer.innerHTML = innerHTMLString;
})