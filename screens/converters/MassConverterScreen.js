// screens/converters/MassConverterScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, SafeAreaView, StatusBar } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from '../../styles'; // Path corrigido

// Lógica de conversão (Base: Grama 'g')
const conversionRates = {
  g: { kg: 0.001, mg: 1000, lb: 0.00220462, oz: 0.035274 },
  kg: { g: 1000 },
  mg: { g: 0.001 },
  lb: { g: 453.592 },
  oz: { g: 28.3495 },
};

function convert(value, fromUnit, toUnit) {
  if (fromUnit === toUnit) return value;
  let valueInGrams = (fromUnit === 'g') ? value : value * conversionRates[fromUnit].g;
  return (toUnit === 'g') ? valueInGrams : valueInGrams * conversionRates.g[toUnit];
}

export default function MassConverterScreen() {
  const [inputValue, setInputValue] = useState('1');
  const [fromUnit, setFromUnit] = useState('kg');
  const [toUnit, setToUnit] = useState('lb');
  const [resultValue, setResultValue] = useState('2.20');

  useEffect(() => {
    const val = parseFloat(inputValue);
    if (!isNaN(val)) {
      const result = convert(val, fromUnit, toUnit);
      setResultValue(result.toFixed(2));
    }
  }, [inputValue, fromUnit, toUnit]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.converterContainer}>
        <Text style={styles.converterTitle}>Conversor de Massa</Text>

        <TextInput
          style={styles.converterInput}
          value={inputValue}
          onChangeText={setInputValue}
          keyboardType="numeric"
        />

        <Text style={styles.converterLabel}>De:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={fromUnit}
            onValueChange={(itemValue) => setFromUnit(itemValue)}
            itemStyle={styles.pickerItem}
          >
            <Picker.Item label="Quilogramas (kg)" value="kg" />
            <Picker.Item label="Gramas (g)" value="g" />
            <Picker.Item label="Miligramas (mg)" value="mg" />
            <Picker.Item label="Libras (lb)" value="lb" />
            <Picker.Item label="Onças (oz)" value="oz" />
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
            <Picker.Item label="Quilogramas (kg)" value="kg" />
            <Picker.Item label="Gramas (g)" value="g" />
            <Picker.Item label="Miligramas (mg)" value="mg" />
            <Picker.Item label="Libras (lb)" value="lb" />
            <Picker.Item label="Onças (oz)" value="oz" />
          </Picker>
        </View>

        <Text style={styles.converterResultTitle}>Resultado:</Text>
        <Text style={styles.converterResultText}>{resultValue}</Text>
      </View>
    </SafeAreaView>
  );
}