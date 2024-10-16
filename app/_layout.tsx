import {SplashScreen, Stack} from "expo-router";
import {useColorScheme} from "@/hooks/useColorScheme";
import {useEffect} from "react";
import {DarkTheme, DefaultTheme, ThemeProvider} from "@react-navigation/native";
import {loaded} from "expo-font/build/memory";
import 'react-native-get-random-values';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
            </Stack>
        </ThemeProvider>
    );
}
