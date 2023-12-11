import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
     <View style={styles.header}>        
        <Text style={styles.headerText}>Home</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Préstamos"
          onPress={() => navigation.navigate('Categorias')}
          style={styles.button}
        />
        <View style={styles.separator} />
        <Button
          title="Reportes"
          onPress={() => navigation.navigate('Reportes')}
          style={styles.button}
        />
        <View style={styles.separator} />
        <Button
          title="Reportes Admin"
          onPress={() => navigation.navigate('ReportesAdmin')}
          style={styles.button}
        />
        <View style={styles.separator} />
        <Button
          title="Prestamos Admin"
          onPress={() => navigation.navigate('PrestamoAdmin')}
          style={styles.button}
        />
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
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    marginBottom: 10,
  },
  separator: {
    height: 10,
  },
});

export default HomeScreen;



