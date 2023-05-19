
const apikey = "";

const city = document.getElementById("city");
const temp = document.getElementById("temperature");
const temp_min = document.getElementById("temp_min");
const temp_max = document.getElementById("temp_max");
const time = document.getElementById("time");
const weather = document.getElementById("weather");
const weather_desc = document.getElementById("weather-desc")
const wind = document.getElementById("wind");
const humidity = document.getElementById("humidity");
const errorContent = document.getElementById("error");
const err_msg = document.getElementById("err_msg");
const weatherPainel = document.getElementById("painel");
const button = document.getElementById("button");

async function getData(){
    const city = document.getElementById("search-city").value;

    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},&APPID=${apikey}&units=metric&lang=pt_br`);
    const data = await response.json();
    return data;
};

function showError(cod){
  switch(true){
    case cod === "404":
      err_msg.innerText = "Cidade não encontrada"
      break
    case cod === "400":
      err_msg.innerText = "Insira uma cidade"
      break
  }
  errorContent.classList.remove("hide");
  weatherPainel.classList.add("hide")
}

function hideError(){
  errorContent.classList.add("hide");
  weatherPainel.classList.remove("hide")
  console.log("escondido")
}

async function showWeather(){
  hideError();
  const data = await getData();
  
  if(data.cod === "404" || data.cod === "400"){
    showError(data.cod);
    console.log("vai mostrar")
    return;
  }

  city.innerText = data.name;
  temp.innerText = parseInt(data.main.temp);
  temp.innerHTML += "&deg;C";
  weather.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
  weather_desc.innerText = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);
  temp_min.innerText = parseInt(data.main.temp_min);
  temp_min.innerHTML += "&deg;C";
  temp_max.innerText = parseInt(data.main.temp_max);
  temp_max.innerHTML += "&deg;C";
  wind.innerText = data.wind.speed + " m/s";
  humidity.innerText = data.main.humidity + "%";

  backColor(data);
  
}

async function backColor(data){

  const weatherId = await data.weather[0].id;

  switch(true){
    case weatherId >=200 && weatherId<300:
      document.body.style.backgroundColor = "#591778";
      document.button.style.backColor = "#591778";
      break;
    case weatherId >= 300 && weatherId < 400:
      document.body.style.backgroundColor = "#15809D";
      button.style.backgroundColor = "#15809D";
      break;  
    case weatherId >= 500 && weatherId < 600:
      document.body.style.backgroundColor = "#2F4973";
      button.style.backgroundColor = "#2F4973";
      break;
    case weatherId >= 00 && weatherId < 700:
      document.body.style.backgroundColor = "#A3AEB1";
      button.style.backgroundColor = "#A3AEB1";
      break;
    case weatherId >= 700 && weatherId < 800:
      document.body.style.backgroundColor = "#677B7F";
      button.style.backgroundColor = "#677B7F";
      break;  
    case weatherId >= 801 && weatherId < 900:
      document.body.style.backgroundColor = "#295DBD";
      button.style.backgroundColor = "#295DBD";
      break;  
    default:
      document.body.style.backgroundColor = "#0BA3DA";
      button.style.backgroundColor = "#0BA3DA";
      break;
  }
}
