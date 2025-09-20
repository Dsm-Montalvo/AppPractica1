import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import DashboardScreen from '../screens/DashboardScreen';
import NuevoRegistroScreen from '../screens/NuevoRegistroScreen';
import MostrarRegistrosScreen from '../screens/MostrarRegistrosScreen';
import EditarRegistroScreen from '../screens/EditarRegistroScreen';

const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Inicio"
        screenOptions={{
          drawerStyle: {
            backgroundColor: "#1e1e2d", // 🔹 aquí cambias el color de fondo
          },
          drawerActiveTintColor: "#fff",   // color del texto del item activo
          drawerInactiveTintColor: "#ccc", // color del texto del item inactivo
          headerStyle: {
            backgroundColor: "#1e1e2d", // Fondo del header
            },
          headerTintColor: "#ffffff", 
        }}
      >
        <Drawer.Screen name="Inicio" component={DashboardScreen} />
        <Drawer.Screen name="Nuevo Registro" component={NuevoRegistroScreen} />
        <Drawer.Screen name="Mostrar Registros" component={MostrarRegistrosScreen} />
        {/* La pantalla de edición no se muestra en el menú, se accede desde "Mostrar Registros" */}
        <Drawer.Screen 
          name="Editar Registro" 
          component={EditarRegistroScreen}
          options={{ drawerItemStyle: { height: 0 } }} // Oculta del drawer
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;