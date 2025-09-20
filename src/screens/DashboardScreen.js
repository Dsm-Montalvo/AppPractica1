import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

const DashboardScreen = () => {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Bienvenido</Text>
      <Text style={styles.subtitle}>
        Esta es la pantalla principal de tu aplicación de registros.
        Usa el menú lateral para navegar entre las diferentes secciones.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
    subtitle: {
        fontSize: 18,
        textAlign: 'center',
        color: '#666',
    }
});

export default DashboardScreen;