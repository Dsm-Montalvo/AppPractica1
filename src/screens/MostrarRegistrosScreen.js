import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { globalStyles } from '../styles/globalStyles';
import api from '../api';

const MostrarRegistrosScreen = ({ navigation }) => {
    const [registros, setRegistros] = useState([]);

    const fetchRegistros = async () => {
        try {
            const response = await api.get('/');
            setRegistros(response.data);
        } catch (error) {
            console.error("Error al cargar registros:", error);
            Alert.alert('Error', 'No se pudieron cargar los registros.');
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchRegistros();
        }, [])
    );

    const eliminarRegistro = async (id) => {
        try {
            await api.delete(`/${id}`);
            Alert.alert('Éxito', 'Registro eliminado correctamente.');
            fetchRegistros(); // Recargar la lista
        } catch (error) {
            console.error("Error al eliminar:", error);
            Alert.alert('Error', 'No se pudo eliminar el registro.');
        }
    };

    const confirmarEliminar = (id) => {
        Alert.alert(
            "Confirmar Eliminación",
            "¿Estás seguro de que quieres eliminar este registro?",
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Eliminar", onPress: () => eliminarRegistro(id), style: 'destructive' }
            ]
        );
    };

    const renderItem = ({ item }) => (
        <View style={globalStyles.card}>
            <Text style={globalStyles.cardTitle}>{item.nombreCompleto}</Text>
            <Text style={globalStyles.cardText}>ID: {item.id}</Text>
            <Text style={globalStyles.cardText}>
                Fecha Nacimiento: {new Date(item.fechaNacimiento).toLocaleDateString()}
            </Text>
            <Text style={globalStyles.cardText}>Edad: {item.edad} años</Text>
            <Text style={globalStyles.cardText}>
                Estado: {item.esMayorDeEdad ? 'Mayor de edad' : 'Menor de edad'}
            </Text>
            <View style={globalStyles.buttonContainer}>
                <TouchableOpacity 
                    style={globalStyles.editButton}
                    onPress={() => navigation.navigate('Editar Registro', { registro: item })}>
                    <Text style={globalStyles.buttonActionText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={globalStyles.deleteButton}
                    onPress={() => confirmarEliminar(item.id)}>
                    <Text style={globalStyles.buttonActionText}>Eliminar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>Registros Guardados</Text>
            <FlatList
                data={registros}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

export default MostrarRegistrosScreen;