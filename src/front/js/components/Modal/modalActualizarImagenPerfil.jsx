import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const UpdateProfileImage = ({ show, onClose }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Cambiar imagen de perfil</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div></div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateProfileImage;