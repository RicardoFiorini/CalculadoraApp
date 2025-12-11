// Arquivo: App.js (Versão Científica)
// Author: Ricardo Fiorini Cuato
import React, { useState } from 'react';
import { View, Text, SafeAreaView, StatusBar } from 'react-native';

import styles from '../styles';
import Button from '../src/components/Button';

// --- FUNÇÃO HELPER (AJUDA) ---
// JavaScript não tem fatorial nativo, então criamos um
function factorial(n) {
  if (n < 0) return NaN; // Fatorial de negativo não existe
  if (n === 0) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

export default function CalculatorScreen() {
  // --- ESTADOS ---
  const [currentValue, setCurrentValue] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operator, setOperator] = useState(null);
  
  // NOVO ESTADO: Controla o modo científico
  const [isScientific, setIsScientific] = useState(false);

  // --- LÓGICA PRINCIPAL (handleTap) ---
  const handleTap = (type, value) => {
    switch (type) {
      // Casos 'number', 'dot', 'clear' continuam iguais...
      case 'number':
        setCurrentValue(currentValue === '0' ? String(value) : currentValue + value);
        break;
      case 'dot':
        if (!currentValue.includes('.')) {
          setCurrentValue(currentValue + '.');
        }
        break;
      case 'clear':
        setCurrentValue('0');
        setOperator(null);
        setPreviousValue(null);
        break;
        
      // Casos 'posneg' e 'percentage' continuam iguais...
      case 'posneg':
        setCurrentValue(String(parseFloat(currentValue) * -1));
        break;
      case 'percentage':
        setCurrentValue(String(parseFloat(currentValue) / 100));
        break;

      // ATUALIZADO: 'operator' agora inclui 'x^y'
      case 'operator':
        setOperator(value);
        setPreviousValue(currentValue);
        setCurrentValue('0');
        break;

      // ATUALIZADO: 'equal' agora calcula 'x^y'
      case 'equal':
        if (previousValue && operator) {
          const prev = parseFloat(previousValue);
          const curr = parseFloat(currentValue);
          let result = 0;

          if (operator === '+') result = prev + curr;
          else if (operator === '-') result = prev - curr;
          else if (operator === '*') result = prev * curr;
          else if (operator === '/') result = prev / curr;
          else if (operator === '^') result = Math.pow(prev, curr); // NOVO CÁLCULO

          setCurrentValue(String(result));
          setOperator(null);
          setPreviousValue(null);
        }
        break;

      // NOVO TIPO: 'scientific'
      case 'scientific':
        const current = parseFloat(currentValue);
        let result = 0;

        switch (value) {
          case 'sin':
            result = Math.sin(current);
            break;
          case 'cos':
            result = Math.cos(current);
            break;
          case 'tan':
            result = Math.tan(current);
            break;
          case 'log': // log base 10
            result = Math.log10(current);
            break;
          case 'ln': // log natural (base e)
            result = Math.log(current);
            break;
          case 'sqrt': // Raiz quadrada
            result = Math.sqrt(current);
            break;
          case 'x2': // x ao quadrado
            result = Math.pow(current, 2);
            break;
          case '!': // Fatorial
            result = factorial(current);
            break;
          case 'pi': // Constante PI
            result = Math.PI;
            break;
          case 'e': // Constante de Euler
            result = Math.E;
            break;
        }
        setCurrentValue(String(result));
        break;
    }
  };

  // --- RENDERIZAÇÃO (VISUAL) ---
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* O Visor: Muda de estilo (tamanho) se estiver no modo científico */}
      <View style={isScientific ? styles.displayContainerScientific : styles.displayContainer}>
        <Text style={styles.displayText}>{currentValue}</Text>
      </View>

      {/* Os Botões: Muda de estilo (tamanho) se estiver no modo científico */}
      <View style={isScientific ? styles.buttonsContainerScientific : styles.buttonsContainer}>
        
        {/* --- RENDERIZAÇÃO CONDICIONAL --- */}
        {/* Estas linhas só aparecem se isScientific for true */}
        {isScientific && (
          <>
            <View style={styles.row}>
              <Button text="sin" onPress={() => handleTap('scientific', 'sin')} style={styles.buttonScientific} textStyle={styles.buttonScientificText} />
              <Button text="cos" onPress={() => handleTap('scientific', 'cos')} style={styles.buttonScientific} textStyle={styles.buttonScientificText} />
              <Button text="tan" onPress={() => handleTap('scientific', 'tan')} style={styles.buttonScientific} textStyle={styles.buttonScientificText} />
              <Button text="log" onPress={() => handleTap('scientific', 'log')} style={styles.buttonScientific} textStyle={styles.buttonScientificText} />
            </View>
            <View style={styles.row}>
              <Button text="ln" onPress={() => handleTap('scientific', 'ln')} style={styles.buttonScientific} textStyle={styles.buttonScientificText} />
              <Button text="√" onPress={() => handleTap('scientific', 'sqrt')} style={styles.buttonScientific} textStyle={styles.buttonScientificText} />
              <Button text="x^y" onPress={() => handleTap('operator', '^')} style={styles.buttonScientific} textStyle={styles.buttonScientificText} />
              <Button text="x²" onPress={() => handleTap('scientific', 'x2')} style={styles.buttonScientific} textStyle={styles.buttonScientificText} />
            </View>
            <View style={styles.row}>
              <Button text="π" onPress={() => handleTap('scientific', 'pi')} style={styles.buttonScientific} textStyle={styles.buttonScientificText} />
              <Button text="e" onPress={() => handleTap('scientific', 'e')} style={styles.buttonScientific} textStyle={styles.buttonScientificText} />
              <Button text="!" onPress={() => handleTap('scientific', '!')} style={styles.buttonScientific} textStyle={styles.buttonScientificText} />
              <Button text="Sci" onPress={() => setIsScientific(false)} style={[styles.buttonScientific, styles.buttonOperator]} textStyle={styles.buttonScientificText} />
            </View>
          </>
        )}

        {/* --- BOTÕES PADRÃO --- */}
        {/* Esta linha é diferente: O botão "Sci" só aparece se NÃO for científico */}
        <View style={styles.row}>
          <Button text={currentValue === '0' ? 'AC' : 'C'} onPress={() => handleTap('clear')} style={styles.buttonSpecial} textStyle={styles.buttonSpecialText} />
          <Button text="+/-" onPress={() => handleTap('posneg')} style={styles.buttonSpecial} textStyle={styles.buttonSpecialText} />
          <Button text="%" onPress={() => handleTap('percentage')} style={styles.buttonSpecial} textStyle={styles.buttonSpecialText} />
          {!isScientific && ( // Só mostra "Sci" se não for científico
             <Button text="Sci" onPress={() => setIsScientific(true)} style={styles.buttonOperator} />
          )}
          {isScientific && ( // Mostra "÷" se FOR científico
             <Button text="÷" onPress={() => handleTap('operator', '/')} style={styles.buttonOperator} />
          )}
        </View>

        {/* O resto dos botões padrão */}
        <View style={styles.row}>
          <Button text="7" onPress={() => handleTap('number', 7)} />
          <Button text="8" onPress={() => handleTap('number', 8)} />
          <Button text="9" onPress={() => handleTap('number', 9)} />
          <Button text="×" onPress={() => handleTap('operator', '*')} style={styles.buttonOperator} />
        </View>

        <View style={styles.row}>
          <Button text="4" onPress={() => handleTap('number', 4)} />
          <Button text="5" onPress={() => handleTap('number', 5)} />
          <Button text="6" onPress={() => handleTap('number', 6)} />
          <Button text="-" onPress={() => handleTap('operator', '-')} style={styles.buttonOperator} />
        </View>

        <View style={styles.row}>
          <Button text="1" onPress={() => handleTap('number', 1)} />
          <Button text="2" onPress={() => handleTap('number', 2)} />
          <Button text="3" onPress={() => handleTap('number', 3)} />
          <Button text="+" onPress={() => handleTap('operator', '+')} style={styles.buttonOperator} />
        </View>

        <View style={styles.row}>
          <Button text="0" onPress={() => handleTap('number', 0)} style={styles.buttonZero} />
          <Button text="." onPress={() => handleTap('dot')} />
          <Button text="=" onPress={() => handleTap('equal')} style={styles.buttonOperator} />
        </View>
      </View>
    </SafeAreaView>
  );
}