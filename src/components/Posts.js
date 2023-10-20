import { Button, Surface } from '@react-native-material/core';
import axios from 'axios';
import React, { useEffect, useState} from 'react'
import { FlatList, Text, View, Image, Modal, StyleSheet } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import ImagePickerExample from './ImagePicker';

const Posts = () => {
    const [postList, setPostList] = useState([]);
    const postList2 = [{
        _id: 1,
        title: 'Prueba estatica',
        subtitle: '1',
        description: '1',
        avatar: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        active: false
    },{
        _id: 1,
        title: 'Prueba estatica',
        subtitle: '1',
        description: '1',
        avatar: 'https://s1.ppllstatics.com/lasprovincias/www/multimedia/202112/12/media/cortadas/gatos-kb2-U160232243326NVC-1248x770@Las%20Provincias.jpg',
        active: false,
    }]

    const [modalVisible, setModalVisible] = useState(false);
    const [newPost, setNewPost] = useState({
        title: '',
        subtitle: '',
        description: '',
        avatar: '',
        active: false
    })

    const ip = "192.168.20.20";

    const handleCreatePost = () => {
        const formData = new FormData();
        formData.append("title", newPost.title);
        formData.append("subtitle", newPost.subtitle);
        formData.append("description", newPost.description);
        formData.append("avatar", {
            uri: newPost.avatar,
            type: "image/jpeg", // Modify the type based on your image type
            name: "avatar.jpg", // Modify the name based on your image name
        });
        console.log("Post: ", formData);
        axios
            .post(`http://${ip}:3000/api/v1/posts/new-post`, formData)
            .then(response => {
                console.log("Data new post: ",response.data)

                setModalVisible(false)
            })
            .catch((error) => {
                console.log(error)
            })

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

    const handleImageSelection = (selectedImage) => {
        setNewPost({...newPost, avatar: selectedImage.uri});
    };

    const listPosts = () => {
        axios
            .get(`http://${ip}:3000/api/v1/posts`)
            .then( (response) => {
                // console.log("Data posts: ", response.data)
                setPostList(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
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
                    <Surface elevation={4}
                        style={ [styles.card ]}
                    >
                        <Image source = {{ uri: `http://${ip}:3000/${item.avatar}` }} style={{ width: 100, height: 100, borderRadius: 50 }} />
                        <Text style={[ styles.cardText , styles.cardTitle ]}>{ item.title }</Text>
                        <Text style={[ styles.cardText ]}>{ item.subtitle }</Text>
                        <Text style={[ styles.cardText ]}>{ item.description }</Text>
                        <Text style={[ styles.cardText ]}>{ (item.active) ? "Activo" : "Inactivo" }</Text>
                        <Button title="Delete" style={styles.button} onPress={()=>handleDeletePost(item._id.toString())}/>
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
