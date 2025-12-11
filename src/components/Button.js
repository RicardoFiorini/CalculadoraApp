// Arquivo: components/Button.js
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from '../../styles'; // Importa nossos estilos!

// O componente agora é exportado
// Ele recebe "text" e "onPress" como antes
// Mas também recebe "style" e "textStyle" para podermos aplicar estilos especiais
const Button = ({ text, onPress, style, textStyle }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
    <Text style={[styles.buttonText, textStyle]}>{text}</Text>
  </TouchableOpacity>
);

export default Button; // Exporta o componente