// screens/converters/ConverterMenuScreen.js
import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles'; // Path corrigido

// Componente reutilizável para o botão do menu
const MenuButton = ({ title, icon, onPress }) => (
  <TouchableOpacity style={styles.menuButton} onPress={onPress}>
    <Ionicons name={icon} size={28} color="#FF9500" />
    <Text style={styles.menuButtonText}>{title}</Text>
    <Ionicons name="chevron-forward-outline" size={24} color="#555" />
  </TouchableOpacity>
);

export default function ConverterMenuScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Usamos ScrollView para o caso de termos muitos conversores no futuro */}
      <ScrollView style={styles.menuContainer}>
        <Text style={styles.menuTitle}>Conversores</Text>
        
        <MenuButton
          title="Distância"
          icon="move-outline"
          onPress={() => navigation.navigate('DistanceConverter')}
        />
        <MenuButton
          title="Temperatura"
          icon="thermometer-outline"
          onPress={() => navigation.navigate('TemperatureConverter')}
        />
         <MenuButton
          title="Massa (Peso)"
          icon="barbell-outline"
          onPress={() => navigation.navigate('MassConverter')}
        />
        <MenuButton
          title="Dados (Computador)"
          icon="hardware-chip-outline"
          onPress={() => navigation.navigate('DataConverter')}
        />
        {/* Adicione mais botões aqui no futuro (ex: Moeda, Velocidade, Tempo) */}

      </ScrollView>
    </SafeAreaView>
  );
}