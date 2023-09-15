import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet} from 'react-native';

const RegisterForm = () => {
  const [userName, setUserName] = useState('');
  const [lastName, setLastName] = useState('');
  const [documentType, setDocumentType] = useState('Cédula de Cuidadania');
  const [documentNumber, setDocumentNumber] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    console.log("Información del Usuario", {userName, lastName, documentType, documentNumber, email});
  };

  return (
    <View style = {styles.container}>
      <Text style = {styles.header}>Formulario de Registro</Text>
      <TextInput style = {styles.input} placeholder = 'Nombre(s)' value = {userName} onChangeText = {setUserName}></TextInput>
      <TextInput style = {styles.input} placeholder = 'Apellidos' value = {lastName} onChangeText = {setLastName}></TextInput>
      <Picker selectedValue = {documentType} onValueChange = {(itemSelected) => setDocumentType(itemSelected)}>
        <Picker.Item label = 'Cédula de Cuidadania' value = 'Cédula de Cuidadania' />
        <Picker.Item label = 'Cédula Extranjera' value = 'Cédula Extranjera' />
        <Picker.Item label = 'Tarjeta de Identidad' value = 'Tarjeta de Identidad' />
        <Picker.Item label = 'Pasaporte' value = 'Pasaporte' />
        <Picker.Item label = 'Otro' value = 'Otro' />
      </Picker>
      <TextInput style = {styles.input} placeholder = 'Número de Documento' value = {documentNumber} onChangeText = {setDocumentNumber} keyboardType='numeric'></TextInput>
      <TextInput style = {styles.input} placeholder = 'Correo Electónico' value = {email} onChangeText = {setEmail} keyboardType='email-address'></TextInput>
      <Button title = 'Registrarse' onPress = {handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 10,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 3,
  },
});

export default RegisterForm;
