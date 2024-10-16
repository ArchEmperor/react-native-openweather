import {ScrollView, Text, View} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";
import {useContext, useEffect, useState} from "react";
import {SettingsContext} from "@/app/(tabs)/_layout";
import CurrentWeather from "@/components/CurrentWeather";
import {OPEN_WEATHER_API_KEY} from "@/config"
import {ForecastWeather} from "@/components/ForecastWeather";

export default function MainPage() {

    // @ts-ignore
    const { city, lat, lng, isCelsius } = useContext(SettingsContext);
    const [cityValue, setCityValue] = city;
    const [latValue, setLatitudeValue] = lat;
    const [lngValue, setLongitudeValue] = lng;
    const [isCelsiusValue, setIsCelsiusValue] = isCelsius;
    const [currentWeather, setCurrentWeather] = useState({});
    const controller = new AbortController();
    const signal = controller.signal;
    const [forecastWeather, setForecastWeather] = useState({});
    const [isWeatherLoaded, setIsWeatherLoaded] = useState(false);
    const [isForecastLoaded, setIsForecastLoaded] = useState(false);
    //updates the current weather when lat long changes
    useEffect(() => {
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latValue}&lon=${lngValue}&units=${isCelsiusValue?'metric':'imperial'}&appid=${OPEN_WEATHER_API_KEY}`,
            { signal }
        )
            .then((res) => res.json())
            .then((data) => {
                setCurrentWeather(data);
                setIsWeatherLoaded(true);
                //console.log("data:", data);
            })
            .catch((err) => {
                console.log("error", err);
            });
        return () => controller.abort();
    }, [latValue, lngValue,isCelsiusValue]);
    //updates the forecast when lat long changes
    useEffect(() => {
        fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latValue}&lon=${lngValue}&units=${isCelsiusValue?'metric':'imperial'}&appid=${OPEN_WEATHER_API_KEY}`,
            { signal }
        )
            .then((res) => res.json())
            .then((data) => {
                setForecastWeather(data);
                setIsForecastLoaded(true);
                //console.log("data:", data);
            })
            .catch((err) => {
                console.log("error", err);
            });
        return () => controller.abort();
    }, [latValue, lngValue,isCelsiusValue]);

    return (
        <ScrollView>
            {isWeatherLoaded&&<CurrentWeather currentWeather={currentWeather}/>}
            {isForecastLoaded&&<ForecastWeather forecastWeather={forecastWeather}/>}
        </ScrollView>

    );
}
