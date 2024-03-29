import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext.js";
import ModalProfile from "../components/Modal/ModalProfile.jsx";
import ModalProfileEmail from "../components/Modal/ModalProfileEmail.jsx";
import ModalProfileDescription from "../components/Modal/ModalProfileDescription.jsx";
import ModalProfileUsername from "../components/Modal/ModalProfileUsername.jsx";
import ProfileStats from "../components/Profile/ProfileStats.jsx";
// FIREBASE
import { storage } from "../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

// IMPORTAR SCSS
import "../../scss/profile.scss";
import "bootstrap/dist/css/bootstrap.min.css";

// MODAL
import UpdateProfileImage from "../components/Modal/modalActualizarImagenPerfil.jsx";

// ICON
import { IconUpload, IconPencil, IconChartPie, IconUserCircle } from '@tabler/icons-react';


export const Profile = () => {
	const { store, actions } = useContext(Context);
	const [imageUpload, setImageUpload] = useState(null);
	const [userId, setUserId] = useState(null);
	const [userProfileImage, setUserImageProfile] = useState(null);
	const [userName, setUserName] = useState(null);
	const [description, setDescription] = useState("");
	const [showUpdateProfileImageModal, setShowUpdateProfileImageModal] = useState(false);
	const [activeModal, setActiveModal] = useState(null);
	const [changesSaved, setChangesSaved] = useState(false);

	const handleCloseModal = () => {
		setActiveModal(null);
	};

	const handleOpenModal = (modalName) => {
		setActiveModal(modalName);
	};

	const handleFileInputChange = (event) => {
		const file = event.target.files[0];
		setImageUpload(file);
	};

	const upLoadImg = async () => {
		if (!imageUpload || !userId) return;

		try {
			const fileName = "profile_picture.jpg";
			const storageRef = ref(storage, `profile-img/${userId}/${fileName}`);
			// const storageRef = ref(storage, `profile-img/${userId}/${imageUpload.name}`);
			await uploadBytes(storageRef, imageUpload);
			console.log("Image uploaded successfully!");

			// Obtener la URL de descarga de la última imagen subida
			const lastUploadedImageUrl = await getLastUploadedImageUrl(userId);

			// Actualizar la imagen de perfil del usuario
			await actions.postProfilePictureByUserID(userId, lastUploadedImageUrl);
			console.log("Profile picture updated successfully!: ", lastUploadedImageUrl);
			window.location.reload();
		} catch (error) {
			console.error("Error uploading image:", error);
		}
	};

	// Función para obtener la URL de descarga de la última imagen subida
	const getLastUploadedImageUrl = async (userId) => {
		try {
			const folderRef = ref(storage, `profile-img/${userId}`);
			const listResult = await listAll(folderRef);

			// Obtener la lista de URLs de descarga de los archivos de la carpeta
			const downloadUrls = await Promise.all(listResult.items.map(async (itemRef) => {
				return getDownloadURL(itemRef);
			}));

			// Ordenar las URLs por fecha de modificación en orden descendente
			downloadUrls.sort((a, b) => {
				return a.updated - b.updated;
			});

			// Obtener la URL de la última imagen subida
			const lastUploadedImageUrl = downloadUrls[0];

			return lastUploadedImageUrl;
		} catch (error) {
			console.error("Error getting last uploaded image URL:", error);
			throw error;
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const user = await actions.getUserInfo();
				setUserId(user);
				console.log("User ID:", user);

				// Obtener la imagen de perfil del usuario
				const userProfileImg = await actions.getUserProfileImageById(user);
				const userName = await actions.getUserNameById(user);
				setUserImageProfile(userProfileImg);
				setUserName(userName);
				
				console.log("User Profile Image:", userProfileImg);

				// setUserThreads([...userThreads]); // Esto deberías manejarlo si es necesario

			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		};

		fetchData();

	}, []);
	useEffect(() => {
		const fetchDescription = async () => {
			try {
				const user = await actions.getUserInfo();
				setUserId(user);
	
				// Obtener la descripción del usuario y esperar a que se resuelva la promesa
				const description = await actions.getDescriptionById(user);
				console.log("User Description:", description);
				setDescription(description || "No hay descripción");

				// setDescription("No hay descripción");

				
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		};
	
		fetchDescription();
	}, []);
	
 

// Función para actualizar la información del usuario
const updateUserInfo = async () => {
	try {
		const user = await actions.getUserInfo();
		const userProfileImg = await actions.getUserProfileImageById(user);
		const userName = await actions.getUserNameById(user);
		const description = await actions.getDescriptionById(user);
		setUserImageProfile(userProfileImg);
		setUserName(userName);
		setDescription(description);
	} catch (error) {
		console.error("Error fetching user data:", error);
	}
  };
  
  useEffect(() => {
	// Llamar a la función para actualizar la información del usuario al cargar la página
	updateUserInfo();
  }, []);
  
  // useEffect para verificar si se guardaron los cambios y actualizar la información del usuario
  useEffect(() => {
	if (changesSaved) {
		updateUserInfo();
		setChangesSaved(false); // Restablecer el estado a false después de actualizar la información
	}
  }, [changesSaved]);

	return (
		<div className="container">
			<div className="row p-2">
				<div className="col-md-12 p-0">
					{/* 1 BANNER */}
					<div className="col-md-12 shadow-sm rounded-top-3 h-100 position-relative" style={{ background: 'rgb(0,41,167)', background: 'linear-gradient(90deg, rgba(0,41,167,1) 0%, rgba(0,123,255,1) 46%, rgba(0,161,255,1) 69%, rgba(0,212,255,1) 100%)' }}>
						{/* Imagen de perfil superpuesta */}
						<div className="position-absolute start-50 translate-middle-x" style={{ bottom: '-50px', zIndex: '1' }}>
							<img
								src={userProfileImage}
								alt="Profile"
								className="rounded-circle border border-primary border-4 bg-white"
								style={{
									width: '100px',
									height: '100px',
									objectFit: 'cover', // Para recortar la imagen de forma cuadrada
									borderRadius: '50%', // Para hacer que la imagen sea redonda
								}}
							/>
							{/* ICONO SUBIR IMAGEN */}
							<button
								onClick={() => setShowUpdateProfileImageModal(true)}
								className="btn btn-primary rounded-circle position-absolute top-50 translate-middle-x p-0 w-50 h-50"
							>
								<IconUpload size={20} color="white" />
							</button>
						</div>
					</div>
					{/* NECESARIO PARA CENTRAR LA IMAGEN Y HEIGHT DEL BANNER*/}
					<div className="mb-7"></div>
				</div>

				{/* TRES BLOQUES PRINCIPALES */}
				<div className="col-md-12 shadow-sm bg-white rounded-bottom-3 pb-4">
					<div className="mt-5 pt-4 px-4">

						<div className="row d-flex align-items-start justify-content-around">
							{/* Bloque izquierdo con nombre de usuario y descripción */}
							<div className="col-md-4">
								<div className="d-flex justify-content-start flex-column align-items-start mb-3 gap-2 w-100">
									<ul className="list-group rounded w-100">
										<li className="list-group-item bg-primary rounded-5 fw-bold text-white">Información de usuario</li>
										<li className="list-group-item border-0 p-1 px-2 ps-2">
											<div className="d-flex justify-content-between align-items-center">
												<span>Usuario: <span className="text-primary">{userName && "@" + userName}</span></span>
												<button type="button" onClick={() => handleOpenModal("username")} className="btn bg-transparent p-0 pb-1"><IconPencil size={20} stroke={1.3} /></button>
											</div>
										</li>
										<li className="list-group-item border-0 p-1 px-2 ps-2">
											<div className="d-flex justify-content-between align-items-center">
												<span>Descripción: <span className="text-primary">{description}</span></span>
												<button type="button" onClick={() => handleOpenModal("description")} className="btn bg-transparent p-0 pb-1"><IconPencil size={20} stroke={1.3} /></button>
											</div>
										</li>
									</ul>
								</div>
							</div>

							{/* Bloque para cambiar email y contraseña */}
							<div className="col-md-4">
								<div className="d-flex justify-content-start flex-column align-items-start mb-3 gap-2 w-100">
									<ul className="list-group rounded w-100">
										<li className="list-group-item bg-primary rounded-5 fw-bold text-white">Opciones de cuenta</li>
										<li className="list-group-item border-0 p-1 px-2 ps-2 d-flex justify-content-between align-items-center">
											<span>Cambiar email</span>
											<button type="button" onClick={() => handleOpenModal("email")} className="btn bg-transparent p-0 pb-1"><IconPencil size={20} stroke={1.3} /></button>
										</li>
										<li className="list-group-item border-0 p-1 px-2 ps-2 d-flex justify-content-between align-items-center">
											<span>Cambiar contraseña</span>
											<button type="button" onClick={() => handleOpenModal("password")} className="btn bg-transparent p-0 pb-1"><IconPencil size={20} stroke={1.3} /></button>
										</li>
									</ul>
								</div>
							</div>

							{/* Bloque derecho con estadísticas sobre número de hilos creados */}
							<div className="col-md-4">
								<ProfileStats />
							</div>
						</div>
					</div>
				</div>

				<div className="container">
					<div className="row d-flex justify-content-between">
						<div className="col-md-6">
							<div className="shadow-sm bg-white rounded-bottom-3 mt-2 p-0">

							</div>
						</div>
					</div>
				</div>
			</div>

			<UpdateProfileImage
				show={showUpdateProfileImageModal}
				onClose={() => setShowUpdateProfileImageModal(false)}
				onUpload={upLoadImg}
				handleFileInputChange={handleFileInputChange}
			/>

			{/* Modales */}
			{/* Modal para cambiar el nombre de usuario */}
			<ModalProfileUsername
				show={activeModal === "username"}
				handleClose={handleCloseModal}
				title="Nombre de usuario"
				inputType="username"
				username="InitialUsername"
				updateChangesSaved={setChangesSaved}
			/>
			{/* Modal para cambiar la descripción */}
			<ModalProfileDescription
				show={activeModal === "description"}
				handleClose={handleCloseModal}
				title="Descripción"
				inputType="description"
				username="InitialUsername"
				updateChangesSaved={setChangesSaved}
			/>
			{/* Modal para cambiar el correo electrónico */}
			<ModalProfileEmail
				show={activeModal === "email"}
				handleClose={handleCloseModal}
				title="Email"
				inputType="email"
				username="InitialUsername"
			/>
			{/* Modal para cambiar la contraseña */}
			<ModalProfile
				show={activeModal === "password"}
				handleClose={handleCloseModal}
				title="Contraseña"
				inputType="password"
				username="InitialUsername"
				updateChangesSaved={setChangesSaved}
			/>
		</div>

	);
};
