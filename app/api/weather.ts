import axios from "axios";
import { OPENWEATHER_API_KEY } from "../../config";

export interface WeatherData {
  city: string;
  country: string;
  temp: number;
  feels_like: number;
  description: string;
  icon: string;
  humidity: number;
  wind: number;
}

export async function fetchWeatherByCity(city: string): Promise<WeatherData> {
  const API_KEY = OPENWEATHER_API_KEY;
  if (!API_KEY) throw new Error("Falta la API key");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&appid=${API_KEY}&units=metric&lang=es`;

  const res = await axios.get(url);
  const d = res.data;

  return {
    city: d.name,
    country: d.sys?.country,
    temp: Math.round(d.main.temp),
    feels_like: Math.round(d.main.feels_like),
    description: d.weather[0].description,
    icon: d.weather[0].icon,
    humidity: d.main.humidity,
    wind: d.wind.speed,
  };
}
