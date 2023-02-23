import { useState, useEffect } from "react"
import Query from "./components/Query"
import countryService from "./services/countries"
import CountryList from "./components/CountryList"

function App() {
  const [searchterm, setSerchterm] = useState("")
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState(null)

  // Effects
  useEffect(() => {
    countryService
      .getAllCountries()
      .then((countriesData) => setCountries(countriesData))
  }, [])

  // Functions
  const handleSearch = (e) => {
    setSerchterm(e.target.value)
  }
  const handleShow = (name) => {
    setSerchterm(name)
  }
  const getWeather = (location) => {
    const [lat, lon] = location
    countryService.getCountryWeather(lat, lon).then((weatherData) => {
      setWeather({
        temp: weatherData.main.temp,
        wind: weatherData.wind.speed,
        icon: weatherData.weather[0].icon,
      })
    })
  }

  // Filter the country list based on the searchterm
  let filteredCountries = []
  if (searchterm !== "") {
    const regex = new RegExp(searchterm, "gi")
    filteredCountries = countries.filter((country) =>
      regex.test(country.name.common)
    )
  } else {
    filteredCountries = countries
  }

  return (
    <div className="App">
      <Query searchterm={searchterm} handleSearch={handleSearch} />
      <hr />
      <CountryList
        countries={filteredCountries}
        handleShow={handleShow}
        getWeather={getWeather}
        weather={weather}
      />
    </div>
  )
}

export default App
