import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>SEOUL</Text>
      </View>
      <View style={styles.weather}>
        <View style={styles.day}>
          <Text style={styles.temp}>27º</Text>
          <Text style={styles.desc}>Sunny</Text>
        </View>
      </View>
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
  weather: {
    flex: 3,
  },
  day: {
    flex: 1,
    alignItems: "center",
  },
  temp: {
    marginTop: 50,
    fontSize: 100,
    fontWeight: "600",
    color: "white",
  },
  desc: {
    marginTop: -10,
    fontSize: 60,
    fontWeight: "500",
    color: "white",
  },
});
