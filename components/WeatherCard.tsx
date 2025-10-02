import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { WeatherData } from "../app/api/weather";

interface Props {
  data: WeatherData;
}

export default function WeatherCard({ data }: Props) {
  const iconUrl = `https://openweathermap.org/img/wn/${data.icon}@4x.png`;

  return (
    <View style={styles.card}>
      <View style={styles.top}>
        <View>
          <Text style={styles.city}>
            {data.city}, {data.country}
          </Text>
          <Text style={styles.desc}>{data.description}</Text>
        </View>
        <Image source={{ uri: iconUrl }} style={styles.icon} />
      </View>

      <View style={styles.bottom}>
        <Text style={styles.temp}>{data.temp}°C</Text>
        <View style={styles.metrics}>
          <Text>Humedad: {data.humidity}%</Text>
          <Text>Viento: {data.wind} m/s</Text>
          <Text>Sensación: {data.feels_like}°C</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    elevation: 3,
  },
  top: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  city: { fontSize: 20, fontWeight: "700" },
  desc: { marginTop: 4, color: "#555", textTransform: "capitalize" },
  icon: { width: 100, height: 100 },
  bottom: { flexDirection: "row", alignItems: "center", marginTop: 12 },
  temp: { fontSize: 48, fontWeight: "700", marginRight: 16 },
  metrics: { justifyContent: "center" },
});
