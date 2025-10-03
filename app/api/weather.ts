// app/api/weather.ts
import { OPENWEATHER_API_KEY } from "../../config";

export interface WeatherData {
  city: string;
  country?: string;
  temp: number;
  feels_like: number;
  description: string;
  icon: string;
  humidity: number;
  wind: number;
}

export interface CityResult {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

// busca clima por nombre de ciudad
export async function fetchWeatherByCity(city: string): Promise<WeatherData> {
  const API_KEY = OPENWEATHER_API_KEY;
  if (!API_KEY) throw new Error("Falta la API key");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&appid=${API_KEY}&units=metric&lang=es`;

  const res = await fetch(url);
  if (!res.ok) {
    let body: any = null;
    try { body = await res.json(); } catch (e) {}
    const msg = body?.message ? body.message : `HTTP ${res.status}`;
    throw new Error(msg);
  }

  const d = await res.json();

  return {
    city: d.name,
    country: d.sys?.country,
    temp: Math.round(d.main.temp),
    feels_like: Math.round(d.main.feels_like),
    description: d.weather?.[0]?.description ?? "",
    icon: d.weather?.[0]?.icon ?? "",
    humidity: d.main.humidity,
    wind: d.wind.speed,
  };
}

// BUSCA CLIMA POR COORDENADAS lat/lon
export async function fetchWeatherByCoords(lat: number, lon: number): Promise<WeatherData> {
  const API_KEY = OPENWEATHER_API_KEY;
  if (!API_KEY) throw new Error("Falta la API key");

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`;

  const res = await fetch(url);
  if (!res.ok) {
    let body: any = null;
    try { body = await res.json(); } catch (e) {}
    const msg = body?.message ? body.message : `HTTP ${res.status}`;
    throw new Error(msg);
  }

  const d = await res.json();

  return {
    city: d.name,
    country: d.sys?.country,
    temp: Math.round(d.main.temp),
    feels_like: Math.round(d.main.feels_like),
    description: d.weather?.[0]?.description ?? "",
    icon: d.weather?.[0]?.icon ?? "",
    humidity: d.main.humidity,
    wind: d.wind.speed,
  };
}

export async function searchCities(query: string): Promise<CityResult[]> {
  if (!query) return [];
  const API_KEY = OPENWEATHER_API_KEY;
  if (!API_KEY) throw new Error("Falta la API key");

  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
    query
  )}&limit=6&appid=${API_KEY}`;

  const res = await fetch(url);
  if (!res.ok) {
    let body: any = null;
    try { body = await res.json(); } catch (e) {}
    const msg = body?.message ? body.message : `HTTP ${res.status}`;
    throw new Error(msg);
  }

  const data = await res.json();
  return (data as any[]).map((c) => ({
    name: c.name,
    lat: c.lat,
    lon: c.lon,
    country: c.country,
    state: c.state,
  }));
}