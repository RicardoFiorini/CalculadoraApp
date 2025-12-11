// screens/converters/DataConverterScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, SafeAreaView, StatusBar } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from '../../styles'; // Path corrigido

// Lógica de conversão (Base: Bytes 'B')
const conversionRates = {
  B: { KB: 1 / 1024, MB: 1 / Math.pow(1024, 2), GB: 1 / Math.pow(1024, 3), TB: 1 / Math.pow(1024, 4), bit: 8 },
  KB: { B: 1024 },
  MB: { B: Math.pow(1024, 2) },
  GB: { B: Math.pow(1024, 3) },
  TB: { B: Math.pow(1024, 4) },
  bit: { B: 1 / 8 },
};

function convert(value, fromUnit, toUnit) {
  if (fromUnit === toUnit) return value;
  let valueInBytes = (fromUnit === 'B') ? value : value * conversionRates[fromUnit].B;
  return (toUnit === 'B') ? valueInBytes : valueInBytes * conversionRates.B[toUnit];
}

export default function DataConverterScreen() {
  const [inputValue, setInputValue] = useState('1024');
  const [fromUnit, setFromUnit] = useState('MB');
  const [toUnit, setToUnit] = useState('GB');
  const [resultValue, setResultValue] = useState('1');

  useEffect(() => {
    const val = parseFloat(inputValue);
    if (!isNaN(val)) {
      const result = convert(val, fromUnit, toUnit);
      setResultValue(result.toFixed(5));
    }
  }, [inputValue, fromUnit, toUnit]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.converterContainer}>
        <Text style={styles.converterTitle}>Conversor de Dados</Text>

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
            <Picker.Item label="Bytes (B)" value="B" />
            <Picker.Item label="Kilobytes (KB)" value="KB" />
            <Picker.Item label="Megabytes (MB)" value="MB" />
            <Picker.Item label="Gigabytes (GB)" value="GB" />
            <Picker.Item label="Terabytes (TB)" value="TB" />
            <Picker.Item label="Bits (bit)" value="bit" />
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
            <Picker.Item label="Bytes (B)" value="B" />
            <Picker.Item label="Kilobytes (KB)" value="KB" />
            <Picker.Item label="Megabytes (MB)" value="MB" />
            <Picker.Item label="Gigabytes (GB)" value="GB" />
            <Picker.Item label="Terabytes (TB)" value="TB" />
            <Picker.Item label="Bits (bit)" value="bit" />
          </Picker>
        </View>

        <Text style={styles.converterResultTitle}>Resultado:</Text>
        <Text style={styles.converterResultText}>{resultValue}</Text>
      </View>
    </SafeAreaView>
  );
}