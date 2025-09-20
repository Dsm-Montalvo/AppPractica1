import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { globalStyles } from '../styles/globalStyles';
import api from '../api';

const NuevoRegistroScreen = ({ navigation }) => {
    const [nombre, setNombre] = useState('');
    const [fecha, setFecha] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [error, setError] = useState('');

    const validarFormulario = () => {
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0); // Ignorar la hora para la comparación

        // Validar nombre
        const nombreRegex = /^[a-zA-Z\s]+$/;
        if (!nombre.trim()) {
            setError('El nombre no puede estar vacío.');
            return false;
        }
        if (!nombreRegex.test(nombre.trim())) {
            setError('El nombre solo debe contener letras y espacios.');
            return false;
        }

        // Validar fecha
        const fechaSeleccionada = new Date(fecha);
        fechaSeleccionada.setHours(0, 0, 0, 0);

        if (fechaSeleccionada.getTime() >= hoy.getTime()) {
            setError('La fecha de nacimiento no puede ser hoy o una fecha futura.');
            return false;
        }
        const edad = hoy.getFullYear() - fechaSeleccionada.getFullYear();
        if (edad > 120) {
            setError('La edad no es válida (máximo 120 años).');
            return false;
        }

        setError('');
        return true;
    };

    const guardarRegistro = async () => {
        if (!validarFormulario()) return;

        try {
            await api.post('/', {
                nombreCompleto: nombre.trim(),
                fechaNacimiento: fecha.toISOString(),
            });
            Alert.alert('Éxito', 'Registro guardado correctamente.');
            navigation.navigate('Mostrar Registros');
        } catch (err) {
            Alert.alert('Error', 'No se pudo guardar el registro.');
            console.error(err);
        }
    };

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || fecha;
        setShowDatePicker(Platform.OS === 'ios');
        setFecha(currentDate);
    };

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>Nuevo Registro</Text>
            {error ? <Text style={globalStyles.errorText}>{error}</Text> : null}

            <TextInput
                style={globalStyles.input}
                placeholder="Nombre Completo"
                value={nombre}
                onChangeText={setNombre}
            />

            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={globalStyles.input}>
                <Text>{fecha.toLocaleDateString()}</Text>
            </TouchableOpacity>

            {showDatePicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={fecha}
                    mode="date"
                    display="default"
                    onChange={onDateChange}
                />
            )}

            <TouchableOpacity style={globalStyles.button} onPress={guardarRegistro}>
                <Text style={globalStyles.buttonText}>Guardar Registro</Text>
            </TouchableOpacity>
        </View>
    );
};

export default NuevoRegistroScreen;