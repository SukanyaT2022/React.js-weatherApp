import sun from './asset/sunBGRemove.png';
import cloud from './asset/couldyBG.png';
import rain from './asset/rain.png';
import thunder from './asset/thunderBG.png';
import snow from './asset/snowBG.png';
import './Weather.css';
import { useEffect, useState } from 'react';

const Weather = () => {
  //below state use to store data in api
  const [data, setData] = useState();
  const [search, setSearch] = useState();
  // const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,rain&temperature_unit=fahrenheit`;
  // useEffect(() => {
    // fetch(apiUrl)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setData(data.hourly.temperature_2m.slice(0,7));
    //     console.log(data)
    //   });
  // }, []);

  const searchHandler = (e) => {
    setSearch(e.target.value);
  };
  const searchCity = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=82c0389cbf40503da8bbad129031d570`
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data );
      });
  };
  return (
    <div className="mainBox">
      <div className="search_wrapper">
        <input
          type="text"
          placeholder="Enter a city"
          className="inputBox"
          onChange={searchHandler}
        />
        <button className="search_btn" onClick={searchCity}>
          Search
        </button>
      </div>
      {/* <FontAwesomeIcon icon={faWrench} pulse /> */}

      {data  ? (
        <div className="bigBox">
          <div className="imageBox">
          <img 
              src={data.weather[0].main === 'Clouds'?
              cloud: data.weather[0].main === "Rain"? rain:
              data.weather[0].main === "Clear"?sun: snow } 
              alt="sun" 
              />
        </div>
        <div className="weatherBox">
          <h2>Today</h2>
          <h1>{data.name}</h1>
          <p>
            Temperature: {Math.trunc(data.main.temp-230)}
            <sup>o</sup>F
          </p>
          <p>
            Maximum: {Math.trunc(data.main.temp_max-230)}
            <sup>o</sup>F
          </p>
          <p>
            Minimum: {Math.trunc(data.main.temp_min-230)}
            <sup>o</sup>F
          </p>
          <p>Weather: {data.weather[0].description}</p>
        </div>
        </div>
      ) : (
        <h1 className="error"></h1>
      )}
      {/* small overlapbox */}
      {/* <div className="mainBoxOverlapBox">
        {data &&
          data.map((item) => (
            <div className="smallBox">
              <p>Monday</p>
              <img src={sun} />
              <p>
                {item}
                <sup>o</sup>C
              </p>
            </div>
          ))}
      </div> */}
    </div>
  );
};

export default Weather;

// Conditional rendiring in React
