import React, { useState, useEffect } from "react";
import Icon from "./icons/icon.jsx";

const AsideFourGeeks = () => {
    const bgImage = "https://firebasestorage.googleapis.com/v0/b/forogeeks.appspot.com/o/profile-img%2Fforogeeks%2F4geeksacademy.png?alt=media&token=126dab83-e7eb-4b14-9a4c-4a9f6008efd4";
    const bgWhiteImage = "https://firebasestorage.googleapis.com/v0/b/forogeeks.appspot.com/o/profile-img%2Fforogeeks%2Fwhite-4geeksacademy.png?alt=media&token=ea50f669-b507-41fc-bd71-6d74255cf32b";


    const [imageHeight, setImageHeight] = useState(0);

	const redirectToWebsite = () => {
        window.location.href = "https://www.4geeksacademy.com";
    };

    useEffect(() => {
        const img = new Image();
        img.onload = () => {
            setImageHeight(img.height);
        };
        img.src = bgImage;
    }, [bgImage]);

    return (
        <div onClick={redirectToWebsite} className="shadow-sm rounded-3 p-3 mb-2 bg-white" style={{ backgroundImage: `url(${bgWhiteImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', height: `${imageHeight}px`, overflow: "hidden" }}>
            {/* Agrega aquí el contenido del componente */}
        </div>
    );
};

export default AsideFourGeeks;

