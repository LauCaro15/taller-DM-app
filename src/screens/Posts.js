import React, { useState, useEffect } from 'react';
import {Image, View, Platform, Modal, StyleSheet, TextInput, FlatList, Text } from 'react-native';
import axios from 'axios';
import React, { useEffect, useState} from 'react'
import { FlatList, Text, View, Image, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import ImagePickerExample from '../components/ImagePicker';
import TakePhoto from '../components/TakePhoto';
import * as ImagePicker from 'expo-image-picker';
import { Surface, Button } from '@react-native-material/core';

const Posts = () => {
    const [images, setImages] = useState([]); // Para almacenar las imágenes seleccionadas
    const [postList, setPostList] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newPost, setNewPost] = useState({
        title: '',
        subtitle: '',
        description: '',
        avatar: [], // Utiliza un arreglo para las imágenes
        active: false
    });

    const ip = "192.168.1.2";

    const handleCreatePost = () => {
        const formData = new FormData();
        formData.append("title", newPost.title);
        formData.append("subtitle", newPost.subtitle);
        formData.append("description", newPost.description);

    // Agrega las imágenes seleccionadas al formulario
        newPost.avatar.forEach((uri, index) => {
            formData.append("avatar", {
                uri: uri,
                type: "image/jpeg",
                name: "avatar.jpg",
            });
        });
        console.log("Post: ", formData);
        const url = `http://${ip}:3000/api/v1/posts/new-post`;
        
        fetch(url, {
            method: 'POST',
            body: formData,
          })
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then(data => {
              console.log("Data new post: ", data);
              setModalVisible(false);
            })
            .catch(error => {
              console.log(error);
            });

    }

    const handleDeletePost = (postId) => {
        console.log("Post ID: ", postId);
        const updatePosts = postList.filter((post) => post._id !== postId);
        setPostList(updatePosts);

        axios
            .delete(`http://${ip}:3000/api/v1/posts/${postId}`)
            .then(response => {
                console.log("Data delete post: ",response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleImageSelection = (selectedImages) => {
        if (selectedImages) {
          const avatarUris = selectedImages.map((image) => image.uri);
          setNewPost({ ...newPost, avatar: avatarUris });
          setImages(selectedImages);
        }
    };

    const listPosts = () => {
        const url = `http://${ip}:3000/api/v1/posts`;

        fetch(url)
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // console.log("Data posts: ", data);
            setPostList(data);
        })
        .catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        listPosts();
    }, [postList]);

  return (
    <View style={{flex:1, alignContent: 'center', justifyContent: 'space-between' }}>
        <View style={{flex:1}}>

            <FlatList
                data = {postList}
                columnWrapperStyle={{ flexWrap: 'wrap', flex: 1 , justifyContent: 'center'}}
                numColumns={25}
                style = {{ margin: 5 }}
                keyExtractor = {( item ) => item._id.toString()}
                renderItem = {({ item }) => (
                    <Surface elevation={4} style={styles.card}>
                        {item.avatar.map((avatarUri, index) => (
                            <Image
                                key={index} // Asegúrate de proporcionar una clave única para cada imagen
                                source={{ uri: `http://${ip}:3000/${avatarUri}` }}
                                style={{ width: 100, height: 100, borderRadius: 50, margin: 5 }}
                            />
                        ))}
                        <Text style={[styles.cardText, styles.cardTitle]}>{item.title}</Text>
                        <Text style={styles.cardText}>{item.subtitle}</Text>
                        <Text style={styles.cardText}>{item.description}</Text>
                        <Text style={styles.cardText}>{item.active ? "Activo" : "Inactivo"}</Text>
                        <Button
                            title="Delete"
                            style={styles.button}
                            onPress={() => handleDeletePost(item._id.toString())}
                        />
                    </Surface>
                )}
            >

            </FlatList>

        </View>
        <Button
            onPress={() => setModalVisible(true)}
            title="Add Post"
            style={styles.button}
        />

        <View>

            <Modal
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
                animationType='slide'
            >
                <View style={styles.modalContainer}>
                    <TextInput
                        placeholder="Title"
                        style={styles.input}
                        onChangeText={ (title_text) => {
                            console.log(title_text)
                            setNewPost({...newPost, title: title_text})
                        }}
                    />

                    <TextInput
                        placeholder="Subtitle"
                        style={styles.input}
                        onChangeText={ (subtitle_text) => {
                            console.log(subtitle_text)
                            setNewPost({...newPost, subtitle: subtitle_text})
                        }}
                    />

                    <TextInput
                        placeholder="Description"
                        style={styles.input}
                        onChangeText={ (description_text) => {
                            console.log(description_text)
                            setNewPost({...newPost, description: description_text})
                        }}
                    />

                    <ImagePickerExample onImageSelect={handleImageSelection}/>
                    <TakePhoto onImageSelect={handleImageSelection}/>

                    {/* {image && <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />} */}
                    {images && images.length > 0 && (
                        <FlatList
                            data={images}
                            horizontal
                            keyExtractor={(item) => item.uri}
                            renderItem={({ item }) => (
                                <Image
                                    source={{ uri: item.uri }}
                                    style={{ width: 100, height: 100, margin: 5 }}
                                />
                            )}
                        />
                    )}
                    <Button
                        title='Create'
                        onPress={handleCreatePost}
                        style={styles.button}
                    />
                </View>
            </Modal>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        width: 300,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
      },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    card: {
        backgroundColor: '#E6EAE8',
        justifyContent: "center",
        alignItems: "center",
        margin: 5,
        padding: 10,
        borderRadius: 5
      } ,
    cardText: {
        flex: 1,
        flexWrap: 'wrap' ,
        width: 350,
        textAlign: 'center',
        marginBottom: 5,
        fontSize: 15,
      } ,
    cardTitle: {
        fontWeight: 'bold',
        fontSize: 18,
      },
    button: {
        color : "#841584"
    }

})

export default Posts
