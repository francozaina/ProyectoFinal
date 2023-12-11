import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

function PrestamoAdmin() {
  const navigation = useNavigation();
  const [prestamos, setPrestamos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPrestamos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/prestamo');
        console.log('fetchPrestamos response.data:');
        console.log(response.data);
        setPrestamos(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPrestamos();
  }, []);

  const handleBack = () => {
    navigation.navigate('Home');
  };

  const fetchPrestamosWithDelay = async () => {
  
    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
      const response = await axios.get('http://localhost:3000/prestamo');
      console.log('fetchPrestamos response.data:');
      console.log(response.data);
      setPrestamos(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMarcarComoPrestado = async (item) => {
    try {
      /*console.log('handleMarcarComoPrestado - id:');
      console.log("item",item);
      */
      await axios.put(`http://localhost:3000/prestamo/${item.Id}`, {
        Estado: 'Prestado', 'ObjetoId': item.FK_Objeto
      });

      setPrestamos((prevPrestamos) =>
        prevPrestamos.map((prestamo) =>
          prestamo.id === item.Id ? { ...prestamo, Estado: 'Prestado' } : prestamo
        )
      );

     
      fetchPrestamosWithDelay();
    } catch (error) {
      console.error('Error al marcar como Prestado:', error);
    }
  };

  const renderPrestamoItem = ({ item }) => (
    <View style={styles.categoryBox}>
      <Text style={styles.category}>{item.Nombre}</Text>

      {/* Botón para marcar como solucionado */}
      {item.Estado !== 'Aceptado' ? (
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleMarcarComoPrestado(item)}
        >
          <Text style={styles.buttonText}>Marcar como Prestado</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.solucionadoText}>Prestado</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Icon name="arrow-left" size={24} color="white" style={styles.backButtonIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}> Listado de Prestamos:</Text>
      </View>

      {isLoading ? (
        <Text>Cargando prestamos...</Text>
      ) : (
        <FlatList
          data={prestamos}
          keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}
          renderItem={renderPrestamoItem}
          style={{ width: '100%' }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: '#007BFF',
    padding: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
    flexDirection: 'row',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
  },
  backButtonIcon: {
    fontSize: 24,
    marginLeft: 10,
  },
  categoryBox: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  category: {
    fontSize: 18,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  solucionadoText: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PrestamoAdmin;