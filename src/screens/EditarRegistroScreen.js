import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { globalStyles } from '../styles/globalStyles';
import api from '../api';

const EditarRegistroScreen = ({ route, navigation }) => {
    const { registro } = route.params;

    const [nombre, setNombre] = useState('');
    const [fecha, setFecha] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (registro) {
            setNombre(registro.nombreCompleto);
            setFecha(new Date(registro.fechaNacimiento));
        }
    }, [registro]);

    // Reutilizamos la misma lógica de validación de NuevoRegistroScreen
    const validarFormulario = () => {
         const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        const nombreRegex = /^[a-zA-ZñÑ\s\-.]+$/;
        if (!nombre.trim() || !nombreRegex.test(nombre.trim())) {
            setError('Nombre inválido.');
            return false;
        }
        const fechaSeleccionada = new Date(fecha);
        fechaSeleccionada.setHours(0, 0, 0, 0);
        if (fechaSeleccionada.getTime() > hoy.getTime()) {
            setError('La fecha no puede ser futura.');
            return false;
        }
        if (hoy.getFullYear() - fechaSeleccionada.getFullYear() > 120) {
             setError('Edad no válida.');
            return false;
        }
        setError('');
        return true;
    };

    const actualizarRegistro = async () => {
        if (!validarFormulario()) return;
        try {
            await api.put(`/${registro.id}`, {
                nombreCompleto: nombre.trim(),
                fechaNacimiento: fecha.toISOString(),
            });
            Alert.alert('Éxito', 'Registro actualizado.');
            navigation.goBack();
        } catch (err) {
            Alert.alert('Error', 'No se pudo actualizar.');
        }
    };

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || fecha;
        setShowDatePicker(Platform.OS === 'ios');
        setFecha(currentDate);
    };

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>Editar Registro</Text>
            {error ? <Text style={globalStyles.errorText}>{error}</Text> : null}
            <TextInput
                style={globalStyles.input}
                value={nombre}
                onChangeText={setNombre}
            />
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={globalStyles.input}>
                <Text>{fecha.toLocaleDateString()}</Text>
            </TouchableOpacity>
            {showDatePicker && (
                <DateTimePicker value={fecha} mode="date" display="default" onChange={onDateChange}/>
            )}
            <TouchableOpacity style={globalStyles.button} onPress={actualizarRegistro}>
                <Text style={globalStyles.buttonText}>Actualizar</Text>
            </TouchableOpacity>
        </View>
    );
};

export default EditarRegistroScreen;