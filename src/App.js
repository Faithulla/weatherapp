import React, { useState, useEffect } from "react";
import "./app.scss";
import { getWeatherData } from "./data/weatherapi";
import { ScaleLoader } from "react-spinners";
import Search from "./assets/search-solid.svg";

const App = () => {
  const [weatherdata, setWeatherData] = useState(null);
  const [city, setCity] = useState("Washington");
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const data = await getWeatherData(city);
      setWeatherData(data);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  console.log(weatherdata);
  const override = `
  display: block;
  margin: 0 auto;
  border-color: red;
  `;

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const date = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  
  const Hours =
    date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`;
  const Minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;

  const Time = `${Hours} : ${Minutes} - ${
    days[date.getDay()]
  }, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  let bgImage = "";

  if (
    weatherdata?.weather[0].main === "Rain" ||
    weatherdata?.weather[0].main === "Drizzle"
  ) {
    bgImage =
      "https://images.unsplash.com/photo-1433863448220-78aaa064ff47?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1331&q=80";
  } else if (weatherdata?.clouds.all > 50) {
    bgImage =
      "https://images.unsplash.com/photo-1495933925743-bb94d1d4ea4c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
  } else if (weatherdata?.clouds.all < 50) {
    bgImage =
      "https://images.unsplash.com/photo-1438129460879-8f5868d4a802?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80";
  } else {
    bgImage =
      "https://images.unsplash.com/photo-1438129460879-8f5868d4a802?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80";
  }
  return (
    <div className="App" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="search-form">
        <input
          type="text"
          onBlur={(e) => setCity(e.target.value)}
          placeholder="Enter your city name"
        />
        <div className="imgg">
          <img
            src={Search}
            width={20}
            height={20}
            alt=""
            onClick={() => getData()}
          />
        </div>
      </div>
      {loading ? (
        <div className="loader-container">
          <ScaleLoader
            css={override}
            size={200}
            color={"#fff"}
            loading={loading}
          />
        </div>
      ) : (
        <>
          {weatherdata !== null ? (
            <div className="main-container">
              <div className="day-card">
                <h4>Day</h4>
                <div className="weather-data">
                  <div className="temprature">
                    <h1>
                      {Math.round(weatherdata.main.temp_min - 274.85)}
                      &deg;C
                    </h1>
                  </div>

                  <div className="temprature-range">
                    <h6>
                      Max: {Math.round(weatherdata.main.temp_max - 274.85)}
                      &deg;C || Humidity: {weatherdata.main.humidity}%
                    </h6>
                  </div>
                  <div className="weather-icon">
                    <img
                      src={`https://openweathermap.org/img/wn/${weatherdata?.weather[0].icon}@2x.png`}
                      alt="imgicon"
                      width={150}
                    />
                    <h3>{weatherdata.weather[0].main}</h3>
                  </div>
                </div>
              </div>
              <div className="night-card" >
                <div className="left-side">
                  <h2>
                    {weatherdata.name} | {weatherdata.sys.country}
                  </h2>
                  <span>{Time}</span>
                  <div className="temperature">
                    <h1>{Math.round(weatherdata.main.temp - 272)}&deg;C</h1>
                  </div>
                </div>
                <div className="right-side">
                  <img
                  className="weather-icon"
                    src={`https://openweathermap.org/img/wn/${weatherdata?.weather[0].icon}@2x.png`}
                    alt="imgicon"
                    width={150}
                  />
                  <span>{weatherdata.weather[0].main}</span>
                </div>
              </div>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};
export default App;
