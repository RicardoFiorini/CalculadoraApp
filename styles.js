// Arquivo: styles.js (Versão 100% Flexível e Responsiva)
import { StyleSheet, Platform } from 'react-native';

// --- NOSSA PALETA DE CORES ---
const Cores = {
  fundo: '#1C1C1E', // Um cinza-escuro, não preto total
  fundoDisplay: '#1C1C1E',
  fundoBotao: '#505050', // Cinza-médio
  fundoBotaoLaranja: '#FF9500', // Laranja vibrante
  fundoBotaoCinzaClaro: '#D4D4D2',
  fundoBotaoCientifico: '#333333',
  textoPrimario: '#FFFFFF',
  textoSecundario: '#1C1C1E', // Para botões claros
  textoLabel: '#B0B0B0', // Para labels do conversor
  fundoInput: '#333333',
};
// ------------------------------

const styles = StyleSheet.create({
  // --- ESTILOS GLOBAIS ---
  container: {
    flex: 1,
    backgroundColor: Cores.fundo,
  },

  // --- ESTILOS DA CALCULADORA ---
  displayContainer: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: Cores.fundoDisplay,
    paddingHorizontal: 25,
    paddingBottom: 20,
  },
  displayText: {
    color: Cores.textoPrimario,
    fontSize: 80, 
    fontWeight: '300',
    adjustsFontSizeToFit: true, // Diminui a fonte se não couber
    numberOfLines: 1,
  },
  buttonsContainer: {
    flex: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    flex: 1, // <--- MUDANÇA 1: Cada fileira agora é flexível
  },
  button: {
    backgroundColor: Cores.fundoBotao,
    flex: 1,
    // height: 80, // <--- MUDANÇA 2: REMOVIDA
    borderRadius: 100, // Raio alto para garantir a forma de pílula/círculo
    justifyContent: 'center',
    alignItems: 'center',
    margin: 6,
  },
  buttonText: {
    color: Cores.textoPrimario,
    fontSize: 34,
    fontWeight: '500',
  },
  buttonZero: {
    flex: 2.15, 
    alignItems: 'flex-start',
    paddingLeft: 32,
  },
  buttonOperator: {
    backgroundColor: Cores.fundoBotaoLaranja,
  },
  buttonSpecial: {
    backgroundColor: Cores.fundoBotaoCinzaClaro,
  },
  buttonSpecialText: {
    color: Cores.textoSecundario,
    fontSize: 30,
    fontWeight: '500',
  },

  // --- ESTILOS MODO CIENTÍFICO ---
  buttonsContainerScientific: {
    flex: 7, 
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  displayContainerScientific: {
    flex: 1.5, 
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: Cores.fundoDisplay,
    paddingHorizontal: 25,
    paddingBottom: 15,
  },
  buttonScientific: {
    backgroundColor: Cores.fundoBotaoCientifico,
    // height: 60, // <--- MUDANÇA 3: REMOVIDA
    borderRadius: 100, // Raio alto
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
  },
  buttonScientificText: {
    color: Cores.textoPrimario,
    fontSize: 22,
    fontWeight: '500',
  },

  // --- ESTILOS DO CONVERSOR ---
  converterContainer: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
    justifyContent: 'flex-start',
  },
  converterTitle: {
    fontSize: 32,
    color: Cores.textoPrimario,
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: '600',
  },
  converterInput: {
    fontSize: 28,
    color: Cores.textoPrimario,
    backgroundColor: Cores.fundoInput,
    borderRadius: 12,
    padding: 15,
    textAlign: 'right',
    marginBottom: 25,
    fontWeight: '500',
  },
  converterLabel: {
    fontSize: 18,
    color: Cores.textoLabel,
    marginBottom: 10,
    marginLeft: 5,
  },
  pickerContainer: {
    backgroundColor: Cores.fundoInput,
    borderRadius: 12,
    marginBottom: 25,
    ...Platform.select({
      ios: {
        height: 180,
        justifyContent: 'center',
      },
      android: {}
    })
  },
  picker: {
    color: Cores.textoPrimario,
    ...Platform.select({
      ios: {
        height: 180, 
      },
      android: {
        height: 50,
      }
    })
  },
  pickerItem: {
    color: Cores.textoPrimario, 
    backgroundColor: Cores.fundoInput,
    fontSize: 18,
  },
  converterResultTitle: {
    fontSize: 22,
    color: Cores.textoLabel,
    textAlign: 'center',
    marginTop: 10,
  },
  converterResultText: {
    fontSize: 48,
    color: Cores.fundoBotaoLaranja, // Laranja!
    textAlign: 'center',
    fontWeight: '600',
  },

  // --- ESTILOS DO MENU DE CONVERSORES ---
  menuContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 32,
    color: Cores.textoPrimario,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 30,
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Cores.fundoInput,
    padding: 20,
    borderRadius: 12,
    marginHorizontal: 15,
    marginBottom: 15,
  },
  menuButtonText: {
    flex: 1,
    color: Cores.textoPrimario,
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 15,
  },
});

export default styles;