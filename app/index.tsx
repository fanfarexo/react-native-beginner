import * as Location from "expo-location";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Fontisto } from "@expo/vector-icons";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const API_KEY = `8fc7f6b2b1858b874afc384f5191ee8b`;

const icons: any = {
  Clear: "day-sunny",
  Clouds: "cloudy",
  Atmosphere: "cloudy-gusts",
  Rain: "rains",
  Drizzle: "rain",
  Thunderstorm: "lightning",
  Snow: "snow",
};

export default function Index() {
  const [ok, setOk] = useState(true);
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState<any[]>([]);

  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    setCity(String(location[0].city));
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );
    const json = await response.json();
    setDays(json.list);
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        {days.length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator size="large" color="white" />
          </View>
        ) : (
          days.map((day) => (
            <View key={day.dt} style={{ ...styles.day, paddingHorizontal: 20 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Text style={styles.temp}>{day.main.temp.toFixed(1)}º</Text>
                <Fontisto
                  name={icons[day.weather[0].main]}
                  size={70}
                  color="white"
                />
              </View>
              <Text style={styles.desc}>{day.weather[0].main}</Text>
              <Text style={styles.tinyText}>{day.weather[0].description}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tomato",
  },
  city: {
    flex: 1.2,
    alignItems: "center",
    justifyContent: "center",
  },
  cityName: {
    fontSize: 60,
    fontWeight: "600",
    color: "white",
  },
  weather: {},
  day: {
    width: SCREEN_WIDTH,
  },
  temp: {
    marginTop: 50,
    fontSize: 100,
    fontWeight: "600",
    color: "white",
  },
  desc: {
    marginTop: -10,
    fontSize: 30,
    fontWeight: "500",
    color: "white",
  },
  tinyText: {
    marginTop: -5,
    fontSize: 25,
    fontWeight: "500",
    color: "white",
  },
});
