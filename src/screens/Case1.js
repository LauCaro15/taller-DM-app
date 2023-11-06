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
	SafeAreaView,
} from "react-native";
import ImagePickerExample from "../components/ImagePicker";
import TakePhoto from "../components/TakePhoto";
import * as ImagePicker from "expo-image-picker";
import { Surface, Button } from "@react-native-material/core";
import { Switch } from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MultiSelect from "react-native-multiple-select";


const Case1 = () => {
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
	const [selectedCategory, setSelectedCategory] = useState([]);

	
	const handleSwitchChange = () => {
		setIsActive(!isActive);
	};

	const handleCategoriesPost = (categories) => {
		setCategoriesPost(categories);
	};

	const ip = "192.168.20.20";

	const handleCreatePost = async () => {
		const formData = new FormData();
		formData.append("titulo", newPost.titulo);
		formData.append("subtitulo", newPost.subtitulo);
		formData.append("descripcion", newPost.descripcion);
		formData.append("categorias", newPost.categorias);
		const accessToken = await AsyncStorage.getItem("accessToken");

		formData.append("avatar", {
			uri: images[0].uri,
			type: "image/jpeg",
			name: "avatar.jpg",
		});
		
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

	const listCategories = () => {
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
				// console.log(categories);
			})
			.catch((error) => {
				console.error("Error al obtener la página:", error);
			});
	}

	useEffect(() => {
		listPosts();
	}, [postList]);


	useEffect(() => {
		listCategories();
	}, [categories]);

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
							
							<Image
								// Asegúrate de proporcionar una clave única para cada imagen
								source={{
									uri: `http://mantenimientoandino.co:3000/${item.avatar}`,
								}}
								style={{
									width: 100,
									height: 100,
									borderRadius: 50,
									margin: 5,
								}}
							/>
							
							<Text style={[styles.cardText, styles.cardTitle]}>
								{item.titulo}
							</Text>
							<Text style={styles.cardText}>{item.subtitulo}</Text>
							<Text style={styles.cardText}>
								{item.descripcion}
							</Text>
							
							{item.categorias.map((category) => (
								<Text style={styles.cardText} key={category._id}>
									{category}
								</Text>
							))}
						
							<Text style={styles.cardText}>
								{item.active ? "Activo" : "Inactivo"}
							</Text>
							{/* <Button
								title='Delete'
								style={styles.button}
								onPress={() =>
									handleDeletePost(item._id.toString())
								}
							/> */}
						</Surface>
					)}></FlatList>
			</View>
			<View style={{padding: 10, gap:10}}>
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
			</View>
			

			<SafeAreaView>
				
				<Modal
					visible={modalVisiblePost}
					onRequestClose={() => setModalVisiblePost(false)}
					animationType='slide'
					style={{padding: 20 }}
					>
					
					<View style={styles.modalContainer}>
						<View>
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
						
						{/* {console.log('categories:', categories)} */}
						{/* {console.log('selectedCategory:', selectedCategory)} */}
							{/* <Picker
								selectedValue={selectedCategory}
								onValueChange={(itemValue, itemIndex) => setSelectedCategory(itemValue)}
								>
								{categories.map((category) => (
									<Picker.Item
										key={category._id}
										label={category.nombre}
										value={category._id}
									/>
									
								))}
							</Picker> */}


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

						<MultiSelect
							items={categories.map((category) => ({
								id: category._id,
								name: category.nombre,
							}))}
							uniqueKey="id"
							onSelectedItemsChange={(selectedItems) => {
								console.log(selectedItems);
								setNewPost({
									...newPost,
									categorias: selectedItems,
								});
							}}
							selectedItems={newPost.categorias}
							selectText="Selecciona categorías"
							searchInputPlaceholderText="Buscar categorías..."
							tagRemoveIconColor="red"
							tagBorderColor="blue"
							tagTextColor="blue"
							selectedItemTextColor="blue"
							selectedItemIconColor="blue"
							itemTextColor="black"
							displayKey="name"
							searchInputStyle={{ color: 'black' }}
						/>
						
						</View>
						
						<View style={{flex : 1, flexWrap: "wrap", justifyContent: "middle"}}>	
							{/* {image && <Image source={{ url: image.url }} style={{ width: 200, height: 200 }} />} */}
							{images && images.length > 0 && (
								<FlatList
									data={images}
									horizontal
									keyExtractor={(item) => item.uri}
									renderItem={({ item }) => (
										<Image
											source={{ uri: item.uri }}
											style={{
												width: 150,
												height: 100,
												margin: 5,
											}}
										/>
									)}
								/>
							)}
							<ImagePickerExample
								onImageSelect={handleImageSelection}
								style={{ backgroundColor: "red" }}
							/>

							<TakePhoto onImageSelect={handleImageSelection} />
						</View>
						<Button
							title='Crear Publicación'
							onPress={handleCreatePost}
							style={styles.button}
						/>
					</View>
				</Modal>
			</SafeAreaView>

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
