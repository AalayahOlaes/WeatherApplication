import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBTypography,
} from "mdb-react-ui-kit";
import { CiCloudSun } from 'react-icons/ci'
import { FiSunrise, FiSunset } from 'react-icons/fi'
import { WiHumidity } from 'react-icons/wi'
import './WeatherCard.scss';

function WeatherCard({ data }) {
  const kelvinToFahrenheit = (kelvin) => Math.floor((kelvin - 273.15) * (9 / 5) + 32);

  return (
    <MDBCard className="weather-card">
      <MDBCardBody className="card-body-content">

        <div className="header">
          <MDBTypography className="city-name">
            {data.geocodeData.name}
          </MDBTypography>
        </div>

        <div className="main-content">
          
          <div className="extra-details">
            <div className="humidity-level">
              <WiHumidity />
              <span>{data.weatherData.current.humidity}% </span>
            </div>
            <div className="sunrise-time">
              <FiSunrise />
              <span>{new Date(data.weatherData.current.sunrise * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
            </div>
            <div className="sunset-time">
              <FiSunset />
              <span>{new Date(data.weatherData.current.sunset * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
            </div>
          
          </div>
          <MDBTypography className="temperature">
            {kelvinToFahrenheit(data.weatherData.current.temp)}°F
          </MDBTypography>
        </div>

        <div className="footer-content">
        <h2 className="weather-type">
            {data.weatherData.current.weather[0].main}
          </h2>
          </div>
      </MDBCardBody>
    </MDBCard>
  );
}

export default WeatherCard;
