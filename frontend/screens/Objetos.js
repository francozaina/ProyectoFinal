import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, Button, Alert } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { useRoute } from '@react-navigation/native';
import { Prestamo } from '../../Backend/src/models/Prestamo';

function Objetos() {
  const route = useRoute();
  const categoriaId = route.params?.categoriaId;

  const [categorias, setCategorias] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/objeto/${categoriaId}`);
        setCategorias(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error al obtener la lista de objetos:', error);
        Alert.alert('Error', 'No se pudo cargar la lista de objetos.');
      }
    };

    if (categoriaId) {
      fetchCategorias();
    }
  }, [categoriaId]);

  const handleBack = () => {
    navigation.navigate('CategoriasScreen');
  };

  const handleItemPress = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleConfirm = async () => {
    if (selectedItem) {
      try {
        const prestamo = new Prestamo();
        prestamo.Estado = 'Pendiente';
        prestamo.FechaSolicitud = new Date().toISOString();
        prestamo.Fk_Admin = 1;
        prestamo.Fk_Objeto = selectedItem.Id;
        prestamo.Fk_Usuario = 1;
  
        console.log('Préstamo a enviar:', prestamo);
  
        const response = await axios.post('http://localhost:3000/prestamo', prestamo);
        console.log('Préstamo creado:', response.data);
  
        setShowModal(false);
      } catch (error) {
        console.error('Error al crear el préstamo:', error.response.data);
        Alert.alert('Error', 'No se pudo crear el préstamo. Consulte la consola para obtener más detalles.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="white" style={styles.backButtonIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Objetos:</Text>
      </View>   
      
      <FlatList
        data={categorias}
        keyExtractor={(item) => item.Id.toString()}
        renderItem={({ item }) => (
          <View style={styles.objectContainer}>
            
          {item.Estado !== 'Prestado' ? (
            <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemPress(item)}>
            <Text style={styles.category}>{item.Nombre}</Text>
            <Button title="Solicitar Préstamo" onPress={() => handleItemPress(item)} />
          </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemPress(item)}>
            <Text style={styles.category}>{item.Nombre}</Text>
            <Button title="Objeto Prestado" />
          </TouchableOpacity>
          )}


            
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      
      <Modal visible={showModal} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Confirmar solicitud de préstamo para:</Text>
          <Text style={styles.modalSelectedItem}>{selectedItem ? selectedItem.Nombre : ''}</Text>
          <Button title="Confirmar" onPress={handleConfirm} />
          <Button title="Cancelar" onPress={() => setShowModal(false)} />
        </View>
      </Modal>
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
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  objectContainer: {
    backgroundColor: 'lightgray',
    borderRadius: 8,
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  category: {
    fontSize: 18,
  },
  separator: {
    height: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalSelectedItem: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default Objetos;







