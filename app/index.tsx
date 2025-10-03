import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import {
  CityResult,
  fetchWeatherByCity,
  fetchWeatherByCoords,
  searchCities,
  WeatherData,
} from "./api/weather";

export default function ClimaScreen() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<CityResult[]>([]);

  // 🔹 Obtener clima por ubicación al iniciar
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permiso de ubicación denegado");
          setLoading(false);
          return;
        }

        const loc = await Location.getCurrentPositionAsync({});
        const data = await fetchWeatherByCoords(
          loc.coords.latitude,
          loc.coords.longitude
        );
        setWeather(data);
      } catch (err: any) {
        console.error(err);
        Alert.alert("Error", err.message || "No se pudo obtener tu ubicación");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // 🔹 Buscar ciudades cuando escribo
  useEffect(() => {
    const delay = setTimeout(async () => {
      if (city.length < 2) {
        setSuggestions([]);
        return;
      }
      try {
        const results = await searchCities(city);
        setSuggestions(results);
      } catch (err) {
        console.error("Error buscando ciudades:", err);
      }
    }, 400); // tipo debounce
    return () => clearTimeout(delay);
  }, [city]);

  const handleSearch = async (cityName: string) => {
    if (!cityName) return Alert.alert("Atención", "Ingresá una ciudad");
    setLoading(true);
    try {
      const data = await fetchWeatherByCity(cityName);
      setWeather(data);
      setSuggestions([]);
    } catch (err: any) {
      Alert.alert("Error", err.message || "No se pudo obtener el clima");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCity = (c: CityResult) => {
    setCity(c.name);
    handleSearch(c.name);
  };

  return (
    <View style={styles.container}>
      <SearchBar value={city} onChangeText={setCity} onSubmit={() => handleSearch(city)} />

      {suggestions.length > 0 && (
        <FlatList
          style={styles.suggestions}
          data={suggestions}
          keyExtractor={(item, index) => `${item.name}-${index}`}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.suggestionItem}
              onPress={() => handleSelectCity(item)}
            >
              <Text style={styles.suggestionText}>
                {item.name}{item.state ? `, ${item.state}` : ""}, {item.country}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}

      {loading && <ActivityIndicator size="large" style={{ marginTop: 24 }} />}
      {!loading && weather && <WeatherCard data={weather} />}
      {!loading && !weather && (
        <View style={styles.empty}>
          <Text style={styles.hint}>Buscá una ciudad para ver el clima</Text>
        </View>
      )}

      <View style={styles.footer}>
        <Text >
            App creada por {''}
            <Text style={styles.watermark} onPress={() =>
            Linking.openURL("https://rodrigocba96.github.io/Portfolio-Personal/")
      }>
              Rodrigo Cordoba
      </Text>
        </Text>
      </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f2f6fc" },
  empty: { flex: 1, justifyContent: "center", alignItems: "center" },
  hint: { color: "#666" },
  footer: { padding: 16, alignItems: "center", backgroundColor: "#eaeaea" },
  watermark2: { color: "#999", fontSize: 12 },

  suggestions: {
    backgroundColor: "#fff",
    borderRadius: 6,
    marginVertical: 4,
    maxHeight: 180,
    elevation: 3,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  suggestionText: { fontSize: 14, color: "#333" },

  watermark: {
  fontSize: 12,
  color: "#1e90ff", 
  opacity: 0.8,
  fontStyle: "italic",
  textDecorationLine: "underline",
},

});
