import Ionicons from '@expo/vector-icons/Ionicons';
import { PropsWithChildren, useState } from 'react';
import {StyleSheet, TouchableOpacity, useColorScheme, View, Text, ScrollView} from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import elements from "ajv/lib/vocabularies/jtd/elements";

export function Collapsible({ children, title }: PropsWithChildren & { title:any }) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? 'light';

  return (
    <View>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}>
        <Text>{title}</Text>
        <Ionicons
          name={isOpen ? 'chevron-down' : 'chevron-back-outline'}
          size={18}
          color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
        />

      </TouchableOpacity>
      {isOpen && <ScrollView style={styles.content}>{children}</ScrollView>}
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  content: {
    marginTop: 6,
    marginLeft: 0,
  },
});
