import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
/*import { UserService } from '../../Backend/src/services/userService';*/

const Login = () => {
  const [dni, setDni] = useState('');
  const [clave, setClave] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await UserService.GetUserLogin({ usuario: dni, clave });
      if (response) {
        navigation.navigate('HomeScreen');
      } else {
        alert('Credenciales incorrectas. Por favor, inténtelo de nuevo.');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <View>
      <Text>Login</Text>
      <TextInput
        placeholder="DNI"
        value={dni}
        onChangeText={(text) => setDni(text)}
      />
      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        value={clave}
        onChangeText={(text) => setClave(text)}
      />
      <Button title="Iniciar sesión" onPress={handleLogin} />
    </View>
  );
};

export default Login;
