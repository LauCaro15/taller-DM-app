import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import React, { useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RegisterForm = () => {
  const [userName, setUserName] = useState('');
  const [lastName, setLastName] = useState('');
  // const [documentType, setDocumentType] = useState('Cédula de Cuidadania');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  navigator = useNavigation();

  const handleSubmit = () => {
    const url = 'http://192.168.20.20:3000/api/v1/users/register';

    const data = {
      name: userName,
      lastName: lastName,
      email: email,
      password: password,
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(responseData => {
        console.log(responseData);
        goToLogin();
      })
      .catch(error => {
        console.error('Error:', error);
      });


  };

  const goToLogin = () => {
    navigator.navigate('Login');
  }

  return (
    <View style = {styles.container}>
      <Text style = {styles.header}>Registro</Text>
      <View style = {styles.header}>
        <TextInput
          style = {styles.input}
          placeholder = 'Nombre(s)'
          value = {userName}
          onChangeText = {setUserName}>
        </TextInput>

        <TextInput style = {styles.input} placeholder = 'Apellidos' value = {lastName} onChangeText = {setLastName}></TextInput>
        {/* <Picker selectedValue = {documentType} onValueChange = {(itemSelected) => setDocumentType(itemSelected)}>
          <Picker.Item label = 'Cédula de Cuidadania' value = 'Cédula de Cuidadania' />
          <Picker.Item label = 'Cédula Extranjera' value = 'Cédula Extranjera' />
          <Picker.Item label = 'Tarjeta de Identidad' value = 'Tarjeta de Identidad' />
          <Picker.Item label = 'Pasaporte' value = 'Pasaporte' />
          <Picker.Item label = 'Otro' value = 'Otro' />
        </Picker> */}
        <TextInput style = {styles.input} placeholder = 'Correo Electónico' value = {email} onChangeText = {setEmail} keyboardType='email-address'></TextInput>
        <TextInput style = {styles.input} placeholder = 'Password' value = {password} onChangeText = {setPassword} secureTextEntry={true}></TextInput>
        <Button title = 'Registrarse' onPress = {handleSubmit} />
      </View>

      <View>
        <Text style={styles.text}>¿Ya tienes una cuenta?</Text>
        <Button title="Iniciar sesión" onPress={goToLogin} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    gap: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
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
