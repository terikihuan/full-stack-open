import React from "react"
import CountryLine from "./CountryLine"
import CountryDetails from "./CountryDetails"

const CountryList = ({ countries, handleShow, getWeather, weather }) => {
  if (countries.length > 10) {
    return <div>To many matches, specify another filter</div>
  } else if (countries.length === 1) {
    const country = countries[0]
    return (
      <div>
        <CountryDetails
          country={country}
          getWeather={getWeather}
          weather={weather}
        />
      </div>
    )
  }
  return (
    <div>
      {countries.map((country) => (
        <CountryLine
          key={country.cca2}
          text={country.name.common}
          handleShow={handleShow}
        />
      ))}
    </div>
  )
}

export default CountryList
