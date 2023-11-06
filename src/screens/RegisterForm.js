import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import React, { useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet, TouchableOpacity, Modal, Linking, ScrollView } from 'react-native';
import Checkbox from 'expo-checkbox';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import PrivacyPolicies from './PrivacyPolicies';

const RegisterForm = () => {
  const [userName, setUserName] = useState('');
  const [lastName, setLastName] = useState('');
  // const [documentType, setDocumentType] = useState('Cédula de Cuidadania');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [policyAccepted, setPolicyAccepted] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  navigator = useNavigation();

  const handleSubmit = () => {
    if (!policyAccepted) {
      // Si el usuario no ha aceptado la política de privacidad, no permite el registro.
      alert('Debes aceptar la política de privacidad para registrarte');
      return;
    }
    const url = 'http://mantenimientoandino.co:3000/api/v1/auth/register';

    const data = {
      firstname: userName,
      lastname: lastName,
      email: email,
      current_password: password,
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

  const handleGoBack = () => {
    navigator.goBack();
  };

  const handleCheckboxChange = () => {
    setPolicyAccepted(!policyAccepted);
  };

  const goToLogin = () => {
    navigator.navigate('Login');
  }
  // Función para abrir la política de privacidad en el navegador
  const openPrivacyPolicy = () => {
    const privacyPolicyURL = 'https://www.privacypolicies.com/live/59dbbc7f-5156-4132-a52f-d97a4a7ce84b';
    Linking.openURL(privacyPolicyURL);
  };
  // Función para abrir el modal
  const openPrivacyPolicyModal = () => {
    setModalVisible(true);
  };

  // Función para cerrar el modal
  const closePrivacyPolicyModal = () => {
    setModalVisible(false);
  };

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
        {/* <Picker selectedValue = {""} onValueChange = {(itemSelected) => setDocumentType(itemSelected)}>
          <Picker.Item label = 'Cédula de Cuidadania' value = 'Cédula de Cuidadania' />
          <Picker.Item label = 'Cédula Extranjera' value = 'Cédula Extranjera' />
          <Picker.Item label = 'Tarjeta de Identidad' value = 'Tarjeta de Identidad' />
          <Picker.Item label = 'Pasaporte' value = 'Pasaporte' />
          <Picker.Item label = 'Otro' value = 'Otro' />
        </Picker> */}
        <TextInput style = {styles.input} placeholder = 'Correo Electónico' value = {email} onChangeText = {setEmail} keyboardType='email-address'></TextInput>
        <TextInput style = {styles.input} placeholder = 'Password' value = {password} onChangeText = {setPassword} secureTextEntry={true}></TextInput>
        {/* Agregar el CheckBox para la política de privacidad */}
        <View style={{margin: 10}}>
          <View style={styles.checkboxContainer}>
            <Checkbox value={policyAccepted} onValueChange={handleCheckboxChange} />
            <Text style={styles.checkboxLabel}>He leído y Acepto la política de privacidad</Text>
          </View>
          <TouchableOpacity
              style={{ alignItems: 'center', paddingTop: 10 }}
              onPress={openPrivacyPolicyModal}
            >
              <Text style={{ color: "blue" }}>Ver Política de Privacidad</Text>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            // transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', height: 70, backgroundColor: 'lightgray', justifyContent: "space-between" , padding: 20}}>
              <View style={{ flexDirection: 'row'}}>
                  <TouchableOpacity onPress={handleGoBack}>
                  <Icon name="arrowleft" size={24} color="black" />
                  </TouchableOpacity>
              </View>
            </View>

            <ScrollView contentContainerStyle={styles.contentContainer}>
              <PrivacyPolicies />
            </ScrollView>
          </Modal>
        </View>
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default RegisterForm;
