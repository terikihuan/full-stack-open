import axios from "axios"

const baseUrl = "https://restcountries.com/v3.1"

const getAllCountries = () => {
  return axios.get(`${baseUrl}/all`).then((res) => res.data)
}

const getCountryWeather = (lat, lon) => {
  return axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
    )
    .then((res) => {
      return res.data
    })
}

const service = {
  getAllCountries,
  getCountryWeather,
}

export default service
