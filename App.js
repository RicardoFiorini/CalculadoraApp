// Arquivo: App.js (Versão Final com Stack Navigator)
import 'react-native-gesture-handler'; // IMPORTANTE: Deve ser a primeira linha
import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'; // 1. Importar Stack
import { Ionicons } from '@expo/vector-icons';

// Importa nossas telas
import CalculatorScreen from './screens/CalculatorScreen';

// 2. Importar TODAS as telas do conversor
import ConverterMenuScreen from './screens/converters/ConverterMenuScreen';
import DistanceConverterScreen from './screens/converters/DistanceConverterScreen';
import TemperatureConverterScreen from './screens/converters/TemperatureConverterScreen';
import MassConverterScreen from './screens/converters/MassConverterScreen';
import DataConverterScreen from './screens/converters/DataConverterScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator(); // 3. Criar o Stack

// Tema escuro (sem mudanças)
const DarkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FF9500',
    background: '#1C1C1E',
    card: '#1C1C1E',
    text: '#FFFFFF',
    border: '#333',
  },
};

// 4. Criar o componente de Navegação do Stack
// Este componente gerencia a navegação DENTRO da aba Conversores
function ConverterStack() {
  return (
    <Stack.Navigator
      // Vamos esconder o Header (título) padrão do Stack,
      // pois nossas telas já têm títulos.
      screenOptions={{ headerShown: false }} 
    >
      {/* A primeira tela do Stack é o Menu */}
      <Stack.Screen name="ConverterMenu" component={ConverterMenuScreen} />

      {/* As outras telas são os conversores individuais */}
      <Stack.Screen name="DistanceConverter" component={DistanceConverterScreen} />
      <Stack.Screen name="TemperatureConverter" component={TemperatureConverterScreen} />
      <Stack.Screen name="MassConverter" component={MassConverterScreen} />
      <Stack.Screen name="DataConverter" component={DataConverterScreen} />
    </Stack.Navigator>
  );
}

// 5. O App principal (Tab Navigator)
export default function App() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Calculadora') {
              iconName = focused ? 'calculator' : 'calculator-outline';
            } else if (route.name === 'Conversores') {
              // Ícone da aba
              iconName = focused ? 'swap-horizontal' : 'swap-horizontal-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#FF9500',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
          tabBarStyle: { // Estilo da barra de abas
             backgroundColor: '#1C1C1E', // Fundo
             borderTopColor: '#333', // Linha de borda
          }
        })}
      >
        {/* A aba Calculadora continua igual */}
        <Tab.Screen name="Calculadora" component={CalculatorScreen} />

        {/* 6. A aba Conversores agora aponta para o STACK que criamos! */}
        <Tab.Screen name="Conversores" component={ConverterStack} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}