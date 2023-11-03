import React, { useState, useEffect } from "react";
import {
	Image,
	View,
	Platform,
	Modal,
	StyleSheet,
	TextInput,
	FlatList,
	Text,
} from "react-native";
import ImagePickerExample from "../components/ImagePicker";
import TakePhoto from "../components/TakePhoto";
import * as ImagePicker from "expo-image-picker";
import { Surface, Button } from "@react-native-material/core";
import { Switch } from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Case1 = () => {
	const accessToken = AsyncStorage.getItem("accessToken");
	const [images, setImages] = useState(""); // Para almacenar las imágenes seleccionadas
	const [postList, setPostList] = useState([]);

	const [modalVisiblePost, setModalVisiblePost] = useState(false);
	const [newPost, setNewPost] = useState({
		titulo: "",
		subtitulo: "",
		descripcion: "",
		avatar: "", // Utiliza un arreglo para las imágenes
		active: true,
		categorias: [],
	});
	const [modalVisibleCategory, setModalVisibleCategory] = useState(false);
	const [newCategory, setNewCategory] = useState({
		nombre: "",
		active: false,
	});
	const [isActive, setIsActive] = useState(undefined);

	const [categories, setCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState(
		"Categoría Seleccionada"
	);
	useEffect(() => {
		const url ="http://mantenimientoandino.co:3000/api/v1/admin/categories";
		fetch(url)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Error al obtener la página");
				}
				return response.json();
			})
			.then((data) => {

				setCategories(data);
				console.log(categories);
			})
			.catch((error) => {
				console.error("Error al obtener la página:", error);
			});
		console.log(categories);
	}, []);
	const handleSwitchChange = () => {
		setIsActive(!isActive);
	};

	const handleCategoriesPost = (categories) => {
		setCategoriesPost(categories);
	};

	let pickerItems = [];
	for (let i = 0; i < categories.length; i++) {
		pickerItems.push(
			<Picker.Item
				key={categories[i].id}
				label={categories[i].name}
				value={categories[i].id}
			/>
		);
	}

	const ip = "192.168.20.20";

	const handleCreatePost = async () => {
		const formData = new FormData();
		formData.append("titulo", newPost.titulo);
		formData.append("subtitulo", newPost.subtitulo);
		formData.append("descripcion", newPost.descripcion);
		formData.append("categorias", newPost.categorias);
		const accessToken = await AsyncStorage.getItem("accessToken");

		// Agrega las imágenes seleccionadas al formulario
		/* newPost.avatar.forEach((url, index) => {
			formData.append("avatar", {
				uri: uri,
				type: "image/jpeg",
				name: "avatar.jpg",
			});
		}); */
		console.log("Post: ", formData);
		const url = `http://mantenimientoandino.co:3000/api/v1/admin/posts/new-post`;
		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${accessToken}`,
			},
			body: formData,
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data) => {
				console.log("Data new post: ", data);
				setModalVisiblePost(false);
				setImages();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleCreateCategory = async () => {
		const newCategoryData = {
			nombre: newCategory.nombre,
			active: newCategory.active,
		};
		const accessToken = await AsyncStorage.getItem("accessToken");

		console.log("Category: ", newCategoryData);
		const url = `http://mantenimientoandino.co:3000/api/v1/admin/categories/new-category`;

		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`,
			},
			body: JSON.stringify(newCategoryData),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				console.log(response.json());
				return response.json();
			})
			.then((data) => {
				console.log("Data new category: ", data);
				setModalVisibleCategory(false);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	/* const handleDeletePost = (postId) => {
		console.log("Post ID: ", postId);
		const updatePosts = postList.filter((post) => post._id !== postId);
		setPostList(updatePosts);

		axios
			.delete(`http://${ip}:3000/api/v1/posts/${postId}`)
			.then((response) => {
				console.log("Data delete post: ", response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}; */

	const handleImageSelection = (selectedImages) => {
		if (selectedImages) {
			const avatarUris = selectedImages.map((image) => image.ur);
			setNewPost({ ...newPost, avatar: avatarUris });
			setImages(selectedImages);
		}
	};

	const listPosts = () => {
		const url = `http://mantenimientoandino.co:3000/api/v1/admin/posts`;

		fetch(url)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data) => {
				// console.log("Data posts: ", data);
				setPostList(data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		listPosts();
	}, [postList]);

	return (
		<View
			style={{
				flex: 1,
				alignContent: "center",
				justifyContent: "space-between",
			}}>
			<View style={{ flex: 1 }}>
				<FlatList
					data={postList}
					columnWrapperStyle={{
						flexWrap: "wrap",
						flex: 1,
						justifyContent: "center",
					}}
					numColumns={25}
					style={{ margin: 5 }}
					keyExtractor={(item) => item._id.toString()}
					renderItem={({ item }) => (
						<Surface elevation={4} style={styles.card}>
							{/* {item.avatar.map((avatarUri, index) => (
								<Image
									key={index} // Asegúrate de proporcionar una clave única para cada imagen
									source={{
										uri: `http://mantenimientoandino.co:3000/uploads/news/${avatarUri}`,
									}}
									style={{
										width: 100,
										height: 100,
										borderRadius: 50,
										margin: 5,
									}}
								/>
							))} */}
							<Text style={[styles.cardText, styles.cardTitle]}>
								{item.title}
							</Text>
							<Text style={styles.cardText}>{item.subtitle}</Text>
							<Text style={styles.cardText}>
								{item.description}
							</Text>
							<Text style={styles.cardText}>
								{item.active ? "Activo" : "Inactivo"}
							</Text>
							<Button
								title='Delete'
								style={styles.button}
								onPress={() =>
									handleDeletePost(item._id.toString())
								}
							/>
						</Surface>
					)}></FlatList>
			</View>
			<Button
				onPress={() => setModalVisiblePost(true)}
				title='Crear Post'
				style={styles.button}
			/>
			<Button
				onPress={() => setModalVisibleCategory(true)}
				title='Crear Categoría'
				style={styles.button}
			/>

			<View>
				<Modal
					visible={modalVisiblePost}
					onRequestClose={() => setModalVisiblePost(false)}
					animationType='slide'>
					<View style={styles.modalContainer}>
						<TextInput
							placeholder='Título'
							style={styles.input}
							onChangeText={(title_text) => {
								console.log(title_text);
								setNewPost({ ...newPost, titulo: title_text });
							}}
						/>

						<TextInput
							placeholder='Subtítulo'
							style={styles.input}
							onChangeText={(subtitle_text) => {
								console.log(subtitle_text);
								setNewPost({
									...newPost,
									subtitulo: subtitle_text,
								});
							}}
						/>

						<Picker
							selectedValue={selectedCategory}
							onValueChange={setSelectedCategory}>
							{pickerItems}
						</Picker>

						<TextInput
							placeholder='Descripción'
							style={styles.input}
							onChangeText={(description_text) => {
								console.log(description_text);
								setNewPost({
									...newPost,
									descripcion: description_text,
								});
							}}
						/>

						<ImagePickerExample
							onImageSelect={handleImageSelection}
						/>
						<TakePhoto onImageSelect={handleImageSelection} />

						{/* {image && <Image source={{ url: image.url }} style={{ width: 200, height: 200 }} />} */}
						{images && images.length > 0 && (
							<FlatList
								data={images}
								horizontal
								keyExtractor={(item) => item.url}
								renderItem={({ item }) => (
									<Image
										source={{ uri: item.url }}
										style={{
											width: 100,
											height: 100,
											margin: 5,
										}}
									/>
								)}
							/>
						)}
						<Button
							title='Crear Publicación'
							onPress={handleCreatePost}
							style={styles.button}
						/>
					</View>
				</Modal>
			</View>

			<View>
				<Modal
					visible={modalVisibleCategory}
					onRequestClose={() => setModalVisibleCategory(false)}
					animationType='slide'>
					<View style={styles.modalContainer}>
						<TextInput
							placeholder='Nombre'
							style={styles.input}
							onChangeText={(title_text) => {
								console.log(title_text);
								setNewCategory({
									...newCategory,
									nombre: title_text,
								});
							}}
						/>

						<View>
							<Switch
								value={isActive}
								onValueChange={() => {
									setNewCategory({
										...newCategory,
										active: !isActive,
									});
									setIsActive(!isActive);
								}}
								style={{
									transform: [
										{ scaleX: 1.5 },
										{ scaleY: 1.5 },
									],
									marginRight: 10,
								}}
								trackColor={{ true: "dodgerblue" }}
								thumbColor={isActive ? "dodgerblue" : undefined}
							/>
						</View>

						<Button
							title='Crear Categoría'
							onPress={handleCreateCategory}
							style={styles.button}
						/>
					</View>
				</Modal>
			</View>
		</View>
	);
};

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
		justifyContent: "center",
		alignItems: "center",
		alignContent: "center",
	},
	card: {
		backgroundColor: "#E6EAE8",
		justifyContent: "center",
		alignItems: "center",
		margin: 5,
		padding: 10,
		borderRadius: 5,
	},
	cardText: {
		flex: 1,
		flexWrap: "wrap",
		width: 350,
		textAlign: "center",
		marginBottom: 5,
		fontSize: 15,
	},
	cardTitle: {
		fontWeight: "bold",
		fontSize: 18,
	},
	button: {
		color: "#841584",
	},
});

export default Case1;
