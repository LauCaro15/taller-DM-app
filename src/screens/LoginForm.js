import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const handleLogin = async () => {
    console.log("Email", email);
    console.log("Password", password);
    try {
      const response = await fetch(
        "http://192.168.1.2:3000/api/v1/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );
      // const accessToken = response.data.access;
      // await AsyncStorage.setItem("accessToken", accessToken);
      console.log(response);
      Alert.alert(
        "Inicio de sesión exitoso",
        "¡Bienvenido! Por favor, inicia sesión para continuar."
      );
      navigation.navigate("Posts");
    } catch (error) {
      console.error("Error de inicio de sesión:", error);
      Alert.alert(
        "Error",
        "Nombre de usuario o contraseña incorrectos. Por favor, inténtalo de nuevo."
      );
    }
  };
  const goToRegister = () => {
    navigation.navigate("Registro");
  }
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Iniciar Sesión</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={text => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
          value={password}
        />
        <Button title="Iniciar Sesión" onPress={handleLogin} />
      </View>
      <View>
        <Text style={styles.text}>¿No tienes una cuenta?</Text>
        <Button title="Registrarse" onPress={goToRegister} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,

  },
  input: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});

export default LoginForm;
