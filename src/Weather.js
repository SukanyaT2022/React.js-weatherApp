import sun from './asset/sunBGRemove.png';
import cloud from './asset/couldBG.png';
import rain from './asset/rain.png';
import thunder from './asset/thunderBG.png';
import './Weather.css';
import { useEffect, useState } from 'react';

const Weather = () => {
  //below state use to store data in api
  const [data, setData] = useState();
  const [search, setSearch] = useState();
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,rain&temperature_unit=fahrenheit`;
  useEffect(() => {
    // fetch(apiUrl)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setData(data.hourly.temperature_2m.slice(0,7));
    //     console.log(data)
    //   });
  }, []);

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
        console.log(data);
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

    {data && 
      <div className="bigBox">
        <div className="imageBox">
          <img src={sun} alt="sun" />
        </div>
        <div className="weatherBox">
          <h2>Today</h2>
          <h1>{data && data.name}</h1>
          <p>
            Temperature: {data && data.main.temp}
            <sup>o</sup>F
          </p>
          <p>
            Maximum: {data && data.main.temp_max}
            <sup>o</sup>F
          </p>
          <p>
            Minimum: {data && data.main.temp_min}
            <sup>o</sup>F
          </p>
          <p>Weather: {data && data.weather[0].description}</p>
        </div>
      </div>
      }
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
