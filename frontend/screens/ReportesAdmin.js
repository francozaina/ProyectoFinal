import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

function ReportesAdmin() {
  const navigation = useNavigation();
  const [reportes, setReportes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReportes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/reporte');
        console.log('fetchReportes response.data:');
        console.log(response.data);
        setReportes(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReportes();
  }, []);

  const handleBack = () => {
    navigation.navigate('Home');
  };

  const fetchReportesWithDelay = async () => {
    // Simular un retraso de 2 segundos (2000 milisegundos)
    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
      const response = await axios.get('http://localhost:3000/reporte');
      console.log('fetchReportes response.data:');
      console.log(response.data);
      setReportes(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMarcarComoSolucionado = async (id) => {
    try {
      console.log('handleMarcarComoSolucionado - id:');
      console.log(id);
      await axios.put(`http://localhost:3000/reporte/${id}`, {
        Estado: 'Resuelto',
      });

      setReportes((prevReportes) =>
        prevReportes.map((reporte) =>
          reporte.id === id ? { ...reporte, Estado: 'Resuelto' } : reporte
        )
      );

      // Vuelve a cargar los reportes después de marcar como solucionado con un retraso
      fetchReportesWithDelay();
    } catch (error) {
      console.error('Error al marcar como solucionado:', error);
    }
  };

  const renderReporteItem = ({ item }) => (
    <View style={styles.categoryBox}>
      <Text style={styles.category}>{item.ObjetoFallo}</Text>
      <Text>{item.Descripcion}</Text>

      {/* Botón para marcar como solucionado */}
      {item.Estado !== 'Resuelto' ? (
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleMarcarComoSolucionado(item.Id)}
        >
          <Text style={styles.buttonText}>Marcar como Solucionado</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.solucionadoText}>Reporte Solucionado</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Icon name="arrow-left" size={24} color="white" style={styles.backButtonIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}> Listado de reportes:</Text>
      </View>

      {isLoading ? (
        <Text>Cargando reportes...</Text>
      ) : (
        <FlatList
          data={reportes}
          keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}
          renderItem={renderReporteItem}
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

export default ReportesAdmin;

