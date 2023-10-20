import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3500/api/v1/users/login",
        {
          email: email,
          password: password,
        }
      );
      const accessToken = response.data.access;
      await AsyncStorage.setItem("accessToken", accessToken);
      Alert.alert(
        "Inicio de sesión exitoso",
        "¡Bienvenido! Por favor, inicia sesión para continuar."
      );
      navigation.navigate("MainMenu");
    } catch (error) {
      console.error("Error de inicio de sesión:", error);
      Alert.alert(
        "Error",
        "Nombre de usuario o contraseña incorrectos. Por favor, inténtalo de nuevo."
      );
    }
  };
  return (
    <View style={styles.container}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
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
