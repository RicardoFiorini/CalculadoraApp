// screens/converters/TemperatureConverterScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, SafeAreaView, StatusBar } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from '../../styles'; // Path corrigido

// Lógica de conversão de TEMPERATURA
function convertTemperature(value, fromUnit, toUnit) {
  if (fromUnit === toUnit) return value;

  let valueInCelsius;

  // 1. Converte tudo para Celsius (nossa base)
  switch (fromUnit) {
    case 'F': // Fahrenheit to Celsius
      valueInCelsius = (value - 32) * (5 / 9);
      break;
    case 'K': // Kelvin to Celsius
      valueInCelsius = value - 273.15;
      break;
    default: // Já é Celsius
      valueInCelsius = value;
  }

  // 2. Converte de Celsius para a unidade de destino
  switch (toUnit) {
    case 'F': // Celsius to Fahrenheit
      return (valueInCelsius * (9 / 5)) + 32;
    case 'K': // Celsius to Kelvin
      return valueInCelsius + 273.15;
    default: // Destino é Celsius
      return valueInCelsius;
  }
}

export default function TemperatureConverterScreen() {
  const [inputValue, setInputValue] = useState('0');
  const [fromUnit, setFromUnit] = useState('C');
  const [toUnit, setToUnit] = useState('F');
  const [resultValue, setResultValue] = useState('32');

  useEffect(() => {
    const val = parseFloat(inputValue);
    if (!isNaN(val)) {
      const result = convertTemperature(val, fromUnit, toUnit);
      setResultValue(result.toFixed(2)); // 2 casas decimais
    }
  }, [inputValue, fromUnit, toUnit]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.converterContainer}>
        <Text style={styles.converterTitle}>Conversor de Temperatura</Text>

        <TextInput
          style={styles.converterInput}
          value={inputValue}
          onChangeText={setInputValue}
          keyboardType="numeric"
          placeholder="Valor"
          placeholderTextColor="#777"
        />

        <Text style={styles.converterLabel}>De:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={fromUnit}
            onValueChange={(itemValue) => setFromUnit(itemValue)}
            itemStyle={styles.pickerItem}
          >
            <Picker.Item label="Celsius (°C)" value="C" />
            <Picker.Item label="Fahrenheit (°F)" value="F" />
            <Picker.Item label="Kelvin (K)" value="K" />
          </Picker>
        </View>

        <Text style={styles.converterLabel}>Para:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={toUnit}
            onValueChange={(itemValue) => setToUnit(itemValue)}
            itemStyle={styles.pickerItem}
          >
            <Picker.Item label="Celsius (°C)" value="C" />
            <Picker.Item label="Fahrenheit (°F)" value="F" />
            <Picker.Item label="Kelvin (K)" value="K" />
          </Picker>
        </View>

        <Text style={styles.converterResultTitle}>Resultado:</Text>
        <Text style={styles.converterResultText}>{resultValue}</Text>
      </View>
    </SafeAreaView>
  );
}