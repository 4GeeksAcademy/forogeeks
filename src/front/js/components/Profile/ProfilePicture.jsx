import React, { useContext } from 'react';
import { Context } from '../../store/appContext.js';

const ProfilePicture = ({ size }) => {
    const { store } = useContext(Context);

    // Determinar la clase CSS según el tamaño proporcionado
    //const imageSizeClass = size === 'small' ? 'h-50' : size === 'medium' ? 'h-75' : size === 'large' ? 'h-100' : '';

    return (
        <div>
            <img
                src={store.userInfo ? store.userInfo.profile_picture : null}
                className={`border rounded-circle`}
                style={{ height: size }}
                alt="Profile"
            />
        </div>
    );
};

export default ProfilePicture;
