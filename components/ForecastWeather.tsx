import {format, interval} from 'date-fns';
import { enUS } from 'date-fns/locale';
import { useContext } from "react";
import {View, Text, Image, StyleSheet, ScrollView} from "react-native";
import { SettingsContext } from "@/app/(tabs)/_layout";
import { ThemedView } from "@/components/ThemedView";
import { Collapsible } from "@/components/Collapsible";
// @ts-ignore
export const ForecastWeather = ({ forecastWeather }) => {
    // @ts-ignore
    const { isCelsius } = useContext(SettingsContext);
    const [isCelsiusValue] = isCelsius;
    const degrees = isCelsiusValue ? '°C' : '°F';
    const speed = isCelsiusValue ? 'm/s' : 'mph';


    const lowestTemperature = (startIndex: number) => {
        let lowest = 500;
        for (let i = startIndex; i < startIndex + 8; i++) {
            if (forecastWeather.list[i].main.temp < lowest)
                lowest = forecastWeather.list[i].main.temp;
        }
        return lowest;
    }


    const highestTemperature = (startIndex: number) => {
        let highest = -500;
        for (let i = startIndex; i < startIndex + 8; i++) {
            if (forecastWeather.list[i].main.temp > highest)
                highest = forecastWeather.list[i].main.temp;
        }
        return highest;
    }

    const getTimeGapFromUnix = (timestamp: number, gap: number) => {
        const date = new Date(timestamp * 1000);
        let result = format(date, 'HH:mm');
        result += "-";
        date.setHours(date.getHours() + gap);
        result += format(date, 'HH:mm');
        return result;
    }


    return (
        <ThemedView>
            {Array.from({ length: 5 }).map((_, dayIndex) => (
                <View key={dayIndex} style={styles.container}>
                    <Collapsible
                        title={
                            <View style={styles.row}>
                                <Text style={styles.date}>
                                    {format(new Date(forecastWeather.list[dayIndex * 8].dt * 1000), 'EEEE, dd', { locale: enUS })}
                                </Text>
                                <Text style={styles.temperature}>
                                    {lowestTemperature(dayIndex * 8)} {"-"} {highestTemperature(dayIndex * 8)} {degrees}
                                </Text>
                            </View>
                    }>
                        {Array.from({ length: 8 }).map((_, intervalIndex) => {
                            const forecast = forecastWeather.list[dayIndex * 8 + intervalIndex];
                            return (
                                <View key={intervalIndex}>
                                    <View style={styles.rowpic}>
                                        <Text style={styles.timerange}>
                                            {getTimeGapFromUnix(forecast.dt, 3)}
                                        </Text>
                                        <Image
                                            style={styles.weatherIcon}
                                            source={{ uri: `http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png` }}
                                            resizeMode="contain"
                                        />
                                    </View>
                                    <View style={styles.row}>
                                        <View style={styles.detailsBox}>
                                            <Text style={styles.label}>Temperature</Text>
                                            <Text style={styles.details}>{forecast.main.temp}{degrees}</Text>
                                        </View>
                                        <View style={styles.detailsBox}>
                                            <Text style={styles.label}>Feels</Text>
                                            <Text style={styles.details}>{forecast.main.feels_like}{degrees}</Text>
                                        </View>
                                        <View style={styles.detailsBox}>
                                            <Text style={styles.label}>Humidity</Text>
                                            <Text style={styles.details}>{forecast.main.humidity}%</Text>
                                        </View>
                                    </View>
                                    <View style={styles.row}>
                                        <View style={styles.detailsBox}>
                                            <Text style={styles.label}>Wind</Text>
                                            <Text style={styles.details}>{forecast.wind.speed}{speed}</Text>
                                        </View>
                                        <View style={styles.detailsBox}>
                                            <Text style={styles.label}>Rain</Text>
                                            <Text style={styles.details}>{forecast.rain ? forecast.rain['3h'] : '0'} Mm</Text>
                                        </View>
                                    </View>
                                </View>
                            );
                        })}
                    </Collapsible>
                </View>
            ))}
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderRadius: 20,
        borderWidth:1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: 20,
        paddingVertical: 10,
        paddingHorizontal: 50,
        width: "92%",

    },
    row: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        paddingVertical: 7,
    },
    rowpic: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        paddingVertical: 10,
        paddingTop:20,
    },
    date: {
        paddingRight: 60,
        color: "black",
        fontSize: 15,
        textTransform: "capitalize",
    },
    temperature: {
        color: "black",
        fontSize: 15,
        textTransform: "capitalize",
    },
    label: {
        fontSize: 15,
    },
    detailsBox: {
        display: "flex",
    },
    details: {
        color: "black",
        fontSize: 12,
        textTransform: "capitalize",
    },
    timerange: {
        fontSize: 16,
        fontWeight: "bold",
    },
    weatherIcon: {
        width: 25,
        height: 25,
    },

});
