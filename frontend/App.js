// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import CategoriasScreen from './screens/CategoriasScreen';
import Objetos from './screens/Objetos';
import Reportes from './screens/Reportes';
import Login from './screens/Login.js';
import ReportesAdmin from './screens/ReportesAdmin.js';
import PrestamoAdmin from './screens/PrestamoAdmin';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Categorias" component={CategoriasScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Objetos" component={Objetos} options={{ headerShown: false }} />
        <Stack.Screen name="Reportes" component={Reportes} options={{ headerShown: false }} />
        <Stack.Screen name="ReportesAdmin" component={ReportesAdmin} options={{ headerShown: false }} />
        <Stack.Screen name="PrestamoAdmin" component={PrestamoAdmin} options={{ headerShown: false }} />        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
