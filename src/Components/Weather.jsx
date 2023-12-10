import { useEffect, useState } from "react";


const Weather = () => {

  const [forecast, setForecast] = useState([]);
  let displayForecast = false;


  //const getsWeather = () => {

  useEffect(() => {

    const getWeather = async () => {
      try {
        const fetchResponse = await fetch("https://api.weather.gov/gridpoints/MFL/110,68/forecast");
        //to change location replace .../MFL/110,68/  with new location  see api for details
        const response = await fetchResponse.json();
        //console.log(response.properties.periods);
        setForecast(response.properties.periods);
        displayForecast = true;
      } catch (error) {
        console.log(error);
      };
    }//end getWeather
    getWeather();
  }, []);  // end useEffect
  //};// end getsWeather


  return (
    <>
      {forecast.length > 0 ? (
        <>
          <h2> {forecast[0].name}'s Weather in Fort Lauderdale</h2>
          <p> {forecast[0].shortForecast}</p>
          <p> Temp: {forecast[0].temperature}</p>
          {forecast[0].probabilityOfPrecipitation.value ? (<p> Chance of Rain: {forecast[0].probabilityOfPrecipitation.value} </p>) : (<p> Chance of Rain: None</p>)}
          <p> Winds: {forecast[0].windSpeed}</p>
          <p> Humidity: {forecast[0].relativeHumidity.value}</p>
          <h2> {forecast[1].name}'s Weather</h2>
          <p> Temp: {forecast[1].temperature}</p>
          {forecast[1].probabilityOfPrecipitation.value ? (<p> Chance of Rain: {forecast[1].probabilityOfPrecipitation.value} </p>) : (<p> Chance of Rain: None</p>)}
          <p> Winds: {forecast[1].windSpeed}</p>
        </>) : (<p> Weather is Unnavailable at this time</p>)
      }
    </>
  )
};

export default Weather