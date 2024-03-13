import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext.js";

// FIREBASE
import { storage } from "../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

// IMPORTAR SCSS
import "../../scss/profile.scss";
import "bootstrap/dist/css/bootstrap.min.css";

// ICON
import { IconUpload, IconPencil, IconChartPie, IconUserCircle } from '@tabler/icons-react';
export const Profile = () => {
	const { store, actions } = useContext(Context);
	const [isMobile, setIsMobile] = useState(false);
	const [showPasswordModal, setShowPasswordModal] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [showEmail, setshowEmail] = useState(false);
	const [showPassword, setshowPassword] = useState(false);
	const [userThreads, setUserThreads] = useState([]);
	const [imageUpload, setImageUpload] = useState(null);
	const [userId, setUserId] = useState(null);
	const [imageUrl, setImageUrl] = useState(null);
	const [userProfileImage, setUserImageProfile] = useState(null);

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
		} catch (error) {
			console.error("Error uploading image:", error);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const user = await actions.getUserInfo();
				setUserId(user);
				console.log("User ID:", user);
	
				// Obtener la imagen de perfil del usuario
				const userProfileImg = await actions.getUserProfileImageById(5);
				setUserImageProfile(userProfileImg);
				console.log("User Profile Image:", userProfileImg);
	
				// setUserThreads([...userThreads]); // Esto deberías manejarlo si es necesario
	
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		};
	
		fetchData();
	
	}, []);

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


	return (
		<div className="container">
			<div className="row p-2">


				<div className="col-md-12 p-0">
					{/* 1 BANNER */}
					<div className="col-md-12 shadow-sm rounded-top-3 h-100 position-relative" style={{ background: 'rgb(0,41,167)', background: 'linear-gradient(90deg, rgba(0,41,167,1) 0%, rgba(0,123,255,1) 46%, rgba(0,161,255,1) 69%, rgba(0,212,255,1) 100%)' }}>
						{/* Imagen de perfil superpuesta */}
						<div className="position-absolute start-50 translate-middle-x" style={{ bottom: '-50px', zIndex: '1' }}>
							<img src={userProfileImage} alt="Profile" className="rounded-circle border border-primary border-4" style={{ width: '100px', height: '100px' }} />
							{/* ICONO SUBIR IMAGEN */}
							<button type="upload" className="btn btn-primary rounded-circle position-absolute top-50 translate-middle-x p-0 w-50 h-50 "><IconUpload size={20} color="white" /></button>
						</div>
					</div>
					{/* NECESARIO PARA CENTRAR LA IMAGEN Y HEIGHT DEL BANNER*/}
					<div className="mb-7"></div>
				</div>


				{/* 2 ABAJO DEL BANNER */}
				<div className="col-md-12 shadow-sm bg-white rounded-bottom-3">
					<div className="mt-5 pt-4 px-4">
						<div className="row d-flex align-items-center">
							{/* Bloque izquierdo con nombre de usuario y descripción */}
							<div className="col-md-6">

								{/* DESCRIPCION Y USUARIO */}
								<div className="d-flex flex-column align-items-center mb-3 gap-2">
									{/* USUARIO */}
									<div className="d-flex flex-row align-items-center gap-1">
										<h4 className="text-primary mb-0">@raul</h4>
										{/* Agrega un icono de usuario si es relevante */}
										<button type="button" className="btn bg-transparent p-0 pb-1"><IconPencil size={20} stroke={1.3} /></button>
									</div>

									{/* DESCRIPCION */}
									<div className="d-flex flex-row align-items-center gap-1">
										<p className="mb-0 text-center">Me encanta ForoGeeks!</p>
										<button type="button" className="btn bg-transparent p-0 pb-1"><IconPencil size={20} stroke={1.3} /></button>
									</div>

								</div>

							</div>

							{/* Bloque derecho con estadísticas sobre número de hilos creados */}
							<div className="col-md-6">
								<div className="d-flex justify-content-center align-items-center gap-5">
									<div>
										<IconChartPie size={90} stroke={1.5} color="#007bff" />
									</div>
									<div>
										<h5 className="text-primary">Estadísticas</h5>
										<p>Total de hilos: 20</p>
										<p>Hilos activos: 15</p>
										<p>Hilos cerrados: 5</p>
									</div>

								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="">
					<input
						type="file"
						onChange={handleFileInputChange}
					/>
				</div>
				<button onClick={upLoadImg}>Upload img</button>

			</div>
		</div>
	);
};


// IMPORTAR COMPONENTES
// import ProfileCardPc from "../components/Profile/ProfileCardPc.jsx";
// import ProfileConfigurationPc from "../components/Profile/ProfileConfigurationPc.jsx";
// import ProfileCardMobile from "../components/Profile/ProfileCardMobile.jsx";

// <div className="container mt-3">
// <div className="row">
//   {isMobile ? (
//     <ProfileCardMobile />
//   ) : (
//     <>
//       <ProfileCardPc
//         handleShowEmail={handleShowEmail}
//         handleShowPassword={handleShowPassword}
//       />
//       <ProfileConfigurationPc
//         showEmail={showEmail}
//         showPassword={showPassword}
//       />
//     </>
//   )}
// </div>
// </div>


// useEffect(() => {
// 	const handleResize = () => {
// 		setIsMobile(window.innerWidth <= 768);
// 	};
// 	window.addEventListener("resize", handleResize);

// 	return () => {
// 		window.removeEventListener("resize", handleResize);
// 	};
// }, []);