import {View, Text, StyleSheet, useColorScheme, Switch, Animated} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {PropsWithChildren, useContext, useEffect, useRef, useState} from "react";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import Ionicons from "@expo/vector-icons/Ionicons";
import {GOOGLE_API_KEY} from "@/config"

import {SettingsContext} from "@/app/(tabs)/_layout";


// @ts-ignore
export default function SettingsPage() {
    // @ts-ignore
    const { city, lat, lng, isCelsius } = useContext(SettingsContext);

    const [cityValue, setCityValue] = city;
    const [latValue, setLatitudeValue] = lat;
    const [lngValue, setLongitudeValue] = lng;
    const [isCelsiusValue, setIsCelsiusValue] = isCelsius;
    const ref = useRef();

    useEffect(() => {
        // @ts-ignore
        ref.current?.setAddressText(cityValue||'');
    }, []);
    const handleUnitToggle = () => setIsCelsiusValue((previousState: boolean) => !previousState);

    return (
        <ParallaxScrollView headerImage={<Ionicons size={310} name="settings-sharp" style={styles.headerImage} />} headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}>
            <ThemedText type="title">Settings</ThemedText>
            <ThemedView style={styles.selectLocation}>
                <ThemedText style={styles.label}>Select your location:</ThemedText>

                <GooglePlacesAutocomplete
                    // @ts-ignore
                    ref={ref}
                    placeholder="Search for a city"
                    onPress={(data, details = null) => {
                        const lat = details?.geometry.location.lat;
                        const lng = details?.geometry.location.lng;
                        setCityValue(data.description) ;
                        setLatitudeValue(details!.geometry.location.lat);
                        setLongitudeValue(details!.geometry.location.lng);
                        // console.log('Selected city:', cityValue);
                        // console.log('Coordinates: lat ',latValue,' lng ', lngValue);
                    }}
                    query={{
                        key: GOOGLE_API_KEY,
                        language: 'en',
                        types: '(cities)',
                    }}
                    styles={{
                        textInput: styles.input,
                    }}
                    fetchDetails={true}
                    disableScroll={true}
                />
            </ThemedView>
            {/* Перемикач одиниць температури */}
            <ThemedView style={styles.switchContainer}>
                <ThemedText style={styles.label}>
                    Temperature Unit: {isCelsiusValue ? '°C' : '°F'}
                </ThemedText>
                <Switch
                    value={isCelsiusValue}
                    onValueChange={handleUnitToggle}
                />
            </ThemedView>
        </ParallaxScrollView>
    );
}
const styles = StyleSheet.create({
    headerImage: {
        color: '#808080',
        bottom: -90,
        left: -35,
        position: 'absolute',
    },
    header: {
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 40,
    },
    selectLocation: {
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    input: {
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
        width: '100%',
    },
    listView: {
        position: 'absolute',
        top: 55,
        width: '100%',
        zIndex: 10,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
});
