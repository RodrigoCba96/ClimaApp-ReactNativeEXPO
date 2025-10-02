import React, { useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import { fetchWeatherByCity, WeatherData } from "./api/weather";

export default function ClimaScreen() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!city) return Alert.alert("Atención", "Ingresá una ciudad");
    setLoading(true);
    try {
      const data = await fetchWeatherByCity(city);
      setWeather(data);
    } catch (err: any) {
      Alert.alert("Error", err.message || "No se pudo obtener el clima");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <SearchBar value={city} onChangeText={setCity} onSubmit={handleSearch} />
      {loading && <ActivityIndicator size="large" style={{ marginTop: 24 }} />}
      {!loading && weather && <WeatherCard data={weather} />}
      {!loading && !weather && (
        <View style={styles.empty}>
          <Text style={styles.hint}>Buscá una ciudad para ver el clima</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f2f6fc" },
  empty: { flex: 1, justifyContent: "center", alignItems: "center" },
  hint: { color: "#666" },
});
