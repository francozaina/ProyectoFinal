import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome'; 

function CategoriasScreen() {
  const navigation = useNavigation();
  const [categorias, setCategorias] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const handleCategoriaPress = (categoria) => {
    navigation.navigate('Objetos', { categoriaId: categoria.Id });
  };

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get('http://localhost:3000/categoria');
        setCategorias(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategorias();
  }, []);

  const handleBack = () => {
    navigation.navigate('Home'); 
  };

  const renderCategoria = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryBox}
      onPress={() => handleCategoriaPress(item)}
    >
      <Text style={styles.category}>{item.Nombre}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Icon name="arrow-left" size={24} color="white" style={styles.backButtonIcon} /> {}
        </TouchableOpacity>
        <Text style={styles.headerText}> Listado de Categorías:</Text>
      </View>
      <FlatList
        data={categorias}
        keyExtractor={(item) => item.Id.toString()}
        renderItem={renderCategoria}
      />
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
});

export default CategoriasScreen;

