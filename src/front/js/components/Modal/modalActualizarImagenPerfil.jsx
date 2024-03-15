import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const UpdateProfileImage = ({ show, onClose, onUpload, handleFileInputChange }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');

    const handlePreview = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
        // Solo llamamos a handleFileInputChange si se proporciona un evento
        if (event && handleFileInputChange && typeof handleFileInputChange === 'function') {
            handleFileInputChange(event);
        }
    };
     
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <input className="form-control" type="file" onChange={handlePreview} />
                {previewUrl && (
                    <div className="mt-2 m-auto d-flex justify-content-center align-items-center" style={{ width: '200px', height: '200px', overflow: 'hidden' }}>
                        <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }} />
                    </div>
                )}
            </Modal.Body>
            <div className='d-flex justify-content-end pe-3 pb-3'>
                <Button variant="primary" className='text-white rounded-5' onClick={onUpload}>
                    Subir
                </Button>


            </div>

        </Modal>
    );
};

export default UpdateProfileImage;
