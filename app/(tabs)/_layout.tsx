import { Tabs } from 'expo-router';
import React, {useState, createContext, useEffect} from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import AsyncStorage from "@react-native-async-storage/async-storage";
// @ts-ignore
export const SettingsContext = React.createContext();
//
export default function TabLayout() {
  const colorScheme = useColorScheme();
    const [city, setCity] = useState('Kyiv, Ukraine');
    const [lat, setLatitude] = useState(50.4503596);
    const [lng, setLongitude] = useState(30.5245025);
    const [isCelsius, setIsCelsius] = useState(true);

    useEffect(() => {
        const loadSettings = async () => {
            try {
                const savedSettings = await AsyncStorage.getItem('settings');
                if (savedSettings) {
                    console.log("Parsed settings"+savedSettings);
                    const parsedSettings = JSON.parse(savedSettings);
                    setCity(parsedSettings.city || city);
                    setLatitude(parsedSettings.lat || lat);
                    setLongitude(parsedSettings.lng || lng);
                    setIsCelsius(parsedSettings.isCelsius || isCelsius);
                }
            } catch (error) {
                console.error('Error loading settings', error);
            }
        };
        loadSettings();
    }, []);
    useEffect(() => {
        saveSettings();
    }, [city,isCelsius]);

    const saveSettings = async () => {
        try {
            await AsyncStorage.setItem('settings', JSON.stringify({ city, lat, lng, isCelsius }));
            const savedSettings = await AsyncStorage.getItem('settings');
            if (savedSettings) {
                console.log("Saved settings "+savedSettings);
            }

        } catch (error) {
            console.error('Error saving settings', error);
        }
    };
  return (
      <SettingsContext.Provider value={{
          city: [city, setCity],
          lat: [lat, setLatitude],
          lng: [lng, setLongitude],
          isCelsius: [isCelsius, setIsCelsius],
      }}>
          <Tabs
              screenOptions={{
                  tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                  headerShown: false,
              }}>
              <Tabs.Screen
                  name="index"
                  options={{
                      title: 'Home',
                      tabBarIcon: ({ color, focused }) => (
                          <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
                      ),
                  }}
              />
              <Tabs.Screen
                  name="settings"
                  options={{
                      title: 'Settings',
                      tabBarIcon: ({ color, focused }) => (
                          <TabBarIcon name={focused ? 'settings-sharp' : 'settings-outline'} color={color} />
                      ),
                  }}
              />
          </Tabs>
      </SettingsContext.Provider>

  );
}
