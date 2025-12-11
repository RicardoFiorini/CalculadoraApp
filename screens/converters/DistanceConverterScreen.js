// Arquivo: screens/ConverterScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, SafeAreaView, StatusBar } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Importa o Picker
import styles from '../../styles'; // Importa nossos estilos

// Lógica de conversão
const conversionRates = {
  // Base: Metro (m)
  m: {
    km: 0.001,
    cm: 100,
    mm: 1000,
    mi: 0.000621371,
    ft: 3.28084,
    in: 39.3701,
  },
  km: { m: 1000 },
  cm: { m: 0.01 },
  mm: { m: 0.001 },
  mi: { m: 1609.34 },
  ft: { m: 0.3048 },
  in: { m: 0.0254 },
};

// Função para converter
function convert(value, fromUnit, toUnit) {
  if (fromUnit === toUnit) {
    return value;
  }
  
  // Primeiro, converte 'fromUnit' para a base (metros)
  let valueInMeters;
  if (fromUnit === 'm') {
    valueInMeters = value;
  } else {
    valueInMeters = value * conversionRates[fromUnit].m;
  }

  // Agora, converte de metros para 'toUnit'
  if (toUnit === 'm') {
    return valueInMeters;
  } else {
    return valueInMeters * conversionRates.m[toUnit];
  }
}

export default function DistanceConverterScreen() {
  const [inputValue, setInputValue] = useState('1');
  const [fromUnit, setFromUnit] = useState('m'); // Unidade "De"
  const [toUnit, setToUnit] = useState('km');   // Unidade "Para"
  const [resultValue, setResultValue] = useState('0.001');

  // Este 'useEffect' roda a função de conversão
  // toda vez que o valor ou as unidades mudarem.
  useEffect(() => {
    const val = parseFloat(inputValue);
    if (!isNaN(val)) {
      const result = convert(val, fromUnit, toUnit);
      setResultValue(result.toFixed(5)); // Arredonda para 5 casas decimais
    }
  }, [inputValue, fromUnit, toUnit]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.converterContainer}>
        <Text style={styles.converterTitle}>Conversor de Distância</Text>

        {/* Input */}
        <TextInput
          style={styles.converterInput}
          value={inputValue}
          onChangeText={setInputValue}
          keyboardType="numeric"
          placeholder="Valor"
          placeholderTextColor="#777"
        />

        {/* Picker "De" */}
        <Text style={styles.converterLabel}>De:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={fromUnit}
            onValueChange={(itemValue) => setFromUnit(itemValue)}
            itemStyle={styles.pickerItem}
          >
            <Picker.Item label="Metros (m)" value="m" />
            <Picker.Item label="Quilômetros (km)" value="km" />
            <Picker.Item label="Centímetros (cm)" value="cm" />
            <Picker.Item label="Milímetros (mm)" value="mm" />
            <Picker.Item label="Milhas (mi)" value="mi" />
            <Picker.Item label="Pés (ft)" value="ft" />
            <Picker.Item label="Polegadas (in)" value="in" />
          </Picker>
        </View>

        {/* Picker "Para" */}
        <Text style={styles.converterLabel}>Para:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={toUnit}
            onValueChange={(itemValue) => setToUnit(itemValue)}
            itemStyle={styles.pickerItem}
          >
            <Picker.Item label="Metros (m)" value="m" />
            <Picker.Item label="Quilômetros (km)" value="km" />
            <Picker.Item label="Centímetros (cm)" value="cm" />
            <Picker.Item label="Milímetros (mm)" value="mm" />
            <Picker.Item label="Milhas (mi)" value="mi" />
            <Picker.Item label="Pés (ft)" value="ft" />
            <Picker.Item label="Polegadas (in)" value="in" />
          </Picker>
        </View>

        {/* Resultado */}
        <Text style={styles.converterResultTitle}>Resultado:</Text>
        <Text style={styles.converterResultText}>{resultValue}</Text>
      </View>
    </SafeAreaView>
  );
}