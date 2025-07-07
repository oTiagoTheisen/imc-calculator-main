import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function IndexScreen() {
  const [peso, setPeso] = useState<string>('');
  const [altura, setAltura] = useState<string>('');
  const [resultado, setResultado] = useState<number | null>(null);
  const [classificacao, setClassificacao] = useState<string | null>(null);
  const [erroPeso, setErroPeso] = useState<boolean>(false);
  const [erroAltura, setErroAltura] = useState<boolean>(false);

  const calcularIMC = () => {
    const pesoNum = parseFloat(peso.replace(',', '.'));
    const alturaCm = parseFloat(altura.replace(',', '.'));

    const pesoValido = !isNaN(pesoNum);
    const alturaValida = !isNaN(alturaCm) && alturaCm > 0;

    setErroPeso(!pesoValido);
    setErroAltura(!alturaValida);

    if (pesoValido && alturaValida) {
      const alturaMetros = alturaCm / 100; // conversão cm -> m
      const imc = pesoNum / (alturaMetros * alturaMetros);
      setResultado(imc);

      let classificacaoTexto = '';
      if (imc < 18.5) {
        classificacaoTexto = 'Abaixo do normal';
      } else if (imc >= 18.6 && imc <= 24.9) {
        classificacaoTexto = 'Normal';
      } else if (imc >= 25.0 && imc <= 29.9) {
        classificacaoTexto = 'Sobrepeso';
      } else if (imc >= 30.0 && imc <= 34.9) {
        classificacaoTexto = 'Obesidade grau I';
      } else if (imc >= 35.0 && imc <= 39.9) {
        classificacaoTexto = 'Obesidade grau II';
      } else if (imc >= 40.0) {
        classificacaoTexto = 'Obesidade grau III';
      }

      setClassificacao(classificacaoTexto);
    } else {
      setResultado(null);
      setClassificacao(null);
    }
  };

  const limparEntrada = (texto: string): string => {
    let limpo = texto.replace(/[^0-9.,]/g, '');
    const partes = limpo.split(/[,\.]/);
    if (partes.length > 2) {
      limpo = partes[0] + '.' + partes[1];
    }
    return limpo;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora de IMC</Text>

      {/* Peso */}
      <View style={styles.inputRow}>
        <Text style={styles.label}>Peso (kg):</Text>
        <TextInput
          style={[styles.input, erroPeso && styles.inputErro]}
          placeholder="Ex: 70"
          keyboardType="numeric"
          value={peso}
          onChangeText={(text) => {
            setPeso(text);
            if (erroPeso) setErroPeso(false);
          }}
        />
      </View>
      {erroPeso && <Text style={styles.textoErro}>Digite um peso válido</Text>}

      {/* Altura em cm */}
      <View style={styles.inputRow}>
        <Text style={styles.label}>Altura (cm):</Text>
        <TextInput
          style={[styles.input, erroAltura && styles.inputErro]}
          placeholder="Ex: 175"
          keyboardType="numeric"
          value={altura}
          onChangeText={(text) => {
            setAltura(text);
            if (erroAltura) setErroAltura(false);
          }}
        />
      </View>
      {erroAltura && <Text style={styles.textoErro}>Digite uma altura válida</Text>}

      <TouchableOpacity style={styles.button} onPress={calcularIMC}>
        <Text style={styles.buttonText}>Calcular IMC</Text>
      </TouchableOpacity>

      {resultado !== null && (
        <>
          <Text style={styles.resultado}>Seu IMC é: {resultado.toFixed(2)}</Text>
          <Text style={styles.classificacao}>Classificação: {classificacao}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginRight: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    width: 120,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultado: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  classificacao: {
    marginTop: 8,
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  inputErro: {
    borderColor: 'red',
  },
  textoErro: {
    color: 'red',
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
  },
});
