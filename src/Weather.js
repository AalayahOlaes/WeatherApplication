import React, { useEffect, useState } from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
} from "mdb-react-ui-kit";
import WeatherCard from './WeatherCard'
import { FaSearch } from 'react-icons/fa'

function Weather() {
  const [zipcode, setZipcode] = useState('');
  const [weatherDatas, setWeatherDatas] = useState([]);


  useEffect(() => {
    const storedWeatherData = JSON.parse(localStorage.getItem('weatherDatas') || '[]');
    setWeatherDatas(storedWeatherData)
  }, []);

  const weatherApiKey = '28d5c062b7e276d3b015edd683ca8a42';
  const geocodeApiKey = '665b6e7c3b39ac9b3f708c0004fd77a5';

  const handleZipcodeChange = (e) => {
    setZipcode(e.target.value);
  }

  const getWeatherData = async () => {
    try {
      const response = await fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${zipcode}&appid=${geocodeApiKey}`)
      const geocodeData = await response.json();

      const weatherResponse = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${geocodeData.lat}&lon=${geocodeData.lon}&exclude={part}&appid=${weatherApiKey}`);
      const weatherData = await weatherResponse.json();
    
      const newWeatherData = [...weatherDatas, { geocodeData, weatherData }]
      setWeatherDatas(newWeatherData);

      console.log(weatherDatas)
      console.log(weatherData)

      localStorage.setItem('weatherDatas', JSON.stringify(newWeatherData));

    } catch (error) {
      console.log('Error: ', error);
    }
  };

  return (
    <section className="weather-section">
      <MDBContainer className='h-100'>
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol md="8" lg="6" xl="4">
            <div className="container">

            <h1 className='weather-header'>Weather Forecast</h1>
              <div className="search-container">
                <input
                  type="text"
                  className="search-box"
                  placeholder="Enter Zipcode"
                  value={zipcode}
                  onChange={handleZipcodeChange}
                />
                <button className="search-btn" onClick={getWeatherData}><FaSearch />
                </button>
              </div>
              
              <div className='weather-card-container'>
                {weatherDatas.map((data, index) => (
                <WeatherCard key={index} data={data} />
                ))}
              </div>
              
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}

export default Weather;