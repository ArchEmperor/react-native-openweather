import {useContext, useEffect, useState} from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import {SettingsContext} from "@/app/(tabs)/_layout";
import {ThemedView} from "@/components/ThemedView";

// @ts-ignore
const CurrentWeather = ({ currentWeather }) => {
    // @ts-ignore
    const { city,isCelsius } = useContext(SettingsContext);
    const [cityValue] = city;
    const [isCelsiusValue] = isCelsius;
    const degrees=isCelsiusValue?'°C':'°F';
    const speed=isCelsiusValue?'m/s':'mph';
    //console.log(currentWeather);
    return (
        <ThemedView style={styles.currentView}>
            <View style={styles.mainInfoContainer}>
                <Text style={styles.city}>
                    {(cityValue? cityValue:"NaN")}
                </Text>
                <View style={styles.currentTempView}>
                    {currentWeather && (
                        <Image
                            style={styles.weatherIcon}
                            source={{
                                uri: `http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`,
                            }}
                            resizeMode="contain"/>
                    )}
                    <Text style={styles.currentDegrees}>
                        {(currentWeather? currentWeather.main.temp:"NaN")}{degrees}
                    </Text>
                </View>
                <Text style={styles.description}>
                    {currentWeather? currentWeather.weather[0].description:"NaN"}
                </Text>
            </View><View style={styles.secondaryInfoContainer}>
            <View style={styles.row}>
                <View style={styles.detailsBox}>
                    <Text style={styles.label}>Feels</Text>
                    <Text style={styles.details}>
                        {currentWeather? (currentWeather.main.feels_like):"NaN"}{degrees}
                    </Text>
                </View>
                <View style={styles.detailsBox}>
                    <Text style={styles.label}>Low</Text>
                    <Text style={styles.details}>
                        {currentWeather? (currentWeather.main.temp_min):"NaN"}{degrees}
                    </Text>
                </View>
                <View style={styles.detailsBox}>
                    <Text style={styles.label}>High</Text>
                    <Text style={styles.details}>
                        {currentWeather ? (currentWeather.main.temp_max):"NaN"}{degrees}
                    </Text>
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.detailsBox}>
                    <Text style={styles.label}>Wind</Text>
                    <Text style={styles.details}>
                        {currentWeather? currentWeather.wind.speed:"NaN"}{speed}
                    </Text>
                </View>
                <View style={styles.detailsBox}>
                    <Text style={styles.label}>Humidity</Text>
                    <Text style={styles.details}>
                        {currentWeather? currentWeather.main.humidity:"NaN"}%
                    </Text>
                </View>
                <View style={styles.detailsBox}>
                    <Text style={styles.label}>Rain</Text>
                    <Text style={styles.details}>
                        {currentWeather&& currentWeather.rain
                            ? currentWeather.rain['1h']
                            : "0"}{" MM/h"}
                    </Text>
                </View>
            </View>
        </View>
        </ThemedView>
    );

};

const styles = StyleSheet.create({
    city: {
        marginTop: 10,
        fontSize: 15,
    },
    currentView: {
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "92%",
        marginTop: 40,
        margin:20,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "black",
    },
    currentTempView: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    mainInfoContainer: {
        display: "flex",
        alignItems: "center",
    },
    description: {
        fontSize: 15,
        textTransform: "capitalize",
    },
    secondaryInfoContainer: {
        borderRadius: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: 20,
        width: "95%",
        maxWidth: 478,
    },
    weatherIcon: {
        width: 50,
        height: 50,
    },
    currentDegrees: {
        fontSize: 60,
        marginTop: 10,
    },
    row: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        padding: 10,
        paddingHorizontal: 30,
    },
    detailsBox: {
        display: "flex",
    },
    label: {
        fontSize: 18,
    },
    details: {
        color: "black",
        fontSize: 15,
        textTransform: "capitalize",
    },
});

export default CurrentWeather;