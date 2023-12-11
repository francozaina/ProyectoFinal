import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

function Reportes() {
  const navigation = useNavigation();
  const [titulo, setTitulo] = useState('');
  const [numeroComputadora, setNumeroComputadora] = useState('');
  const [detalleReporte, setDetalleReporte] = useState('');
  const [envioExitoso, setEnvioExitoso] = useState(false);

  const handleCrearReporte = async () => {
    console.log('AgregarReporte');
    try {
      let objeto = {
        FK_Usuario: 1,
        FK_Computadora: numeroComputadora,
        ObjetoFallo: titulo,
        Descripcion: detalleReporte,
      };
      console.log(objeto);
      const response = await axios.post('http://localhost:3000/reporte', objeto);
      console.log(response);

      setEnvioExitoso(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Crear Reporte</Text>
      </View>

      {envioExitoso && (
        <View style={styles.successMessage}>
          <Text style={styles.successText}>Reporte enviado con éxito.</Text>
        </View>
      )}

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Título del Reporte"
          value={titulo}
          onChangeText={(text) => setTitulo(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Número de Computadora"
          value={numeroComputadora}
          onChangeText={(text) => setNumeroComputadora(text)}
          keyboardType="numeric"
        />
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="Detalle del Reporte"
          value={detalleReporte}
          onChangeText={(text) => setDetalleReporte(text)}
          multiline
          numberOfLines={4}
        />
        <TouchableOpacity style={styles.button} onPress={handleCrearReporte}>
          <Text style={styles.buttonText}>Crear Reporte</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    backgroundColor: '#007BFF',
    padding: 10,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 10,
  },
  successMessage: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
  },
  successText: {
    color: 'white',
    fontWeight: 'bold',
  },
  formContainer: {
    width: '100%',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  multilineInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Reportes;


