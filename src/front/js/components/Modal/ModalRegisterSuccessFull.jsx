import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const SuccessModal = ({ show, onClose }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Registro Exitoso</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        ¡Se ha registrado sesión correctamente!
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SuccessModal;

