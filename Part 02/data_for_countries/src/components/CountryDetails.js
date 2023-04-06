import React from "react"

const CountryDetails = ({ country, getWeather, weather }) => {
  getWeather(country.capitalInfo.latlng)

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h3>languages</h3>
      <ul>
        {Object.keys(country.languages).map((key) => (
          <li key={key}>{country.languages[key]}</li>
        ))}
      </ul>
      <img src={country.flags.svg} alt="" style={{ height: "10rem" }} />
      <h2>Weather in {country.capital}</h2>
      {weather ? (
        <>
          <p>temperature {weather.temp} Celcius</p>
          <img
            src={` http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt=""
          />
          <p>wind {weather.wind} m/s</p>
        </>
      ) : null}
    </div>
  )
}

export default CountryDetails
