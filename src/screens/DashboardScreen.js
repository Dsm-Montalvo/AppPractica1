import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

const DashboardScreen = () => {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Practica React</Text>
      <Text style={styles.subtitle}>
        Practica de registro con react native, mi backend realizado con node js
      </Text>
      <Image
        source={{ uri: "https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png" }}
        style={{ width: 150, height: 150, alignSelf: "center" }}
      />
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