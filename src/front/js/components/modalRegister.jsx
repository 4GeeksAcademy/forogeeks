
import { IconUser } from "@tabler/icons-react";
import React from "react";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export const ModalRegister = ({ showRegister, handleCloseRegister }) => {

    return (

        <Modal show={showRegister} onHide={handleCloseRegister}>
            <Modal.Header closeButton>
                <Modal.Title>Register</Modal.Title>
            </Modal.Header>
            <Modal.Body className="ModalBody m-auto">
                <div className="m-auto">


                    <form action>
                        <div class="form-group m-auto">
                            <div className=" d-flex">
                                <input type="textname" placeholder="First Name" className="txtName form-control" />
                                <input type="textname" placeholder="Last Name" className="txtName form-control" />
                            </div>
                            <div class="form-wrapper">
                                <input type="text" placeholder="Username" class="form-control" />
                               
                            </div>
                            <div class="form-wrapper">
                                <input type="text" placeholder="Email Address" class="form-control" />
                                
                            </div>
                            <div class="form-wrapper">
                              
                                <input type="text"  placeholder="Number"  class="form-control"   name="phone_number" id="phone_number" />
                            </div>

                            <div class="form-wrapper">
                                <input type="password" placeholder="Password" class="form-control" />
                                <i class="zmdi zmdi-lock"></i>
                            </div>
                            <div class="form-wrapper">
                                <input type="password" placeholder="Confirm Password" class="form-control" />
                                <i class="zmdi zmdi-lock"></i>
                            </div>
                            <button>Register
                                <i class="zmdi zmdi-arrow-right"></i>
                            </button>
                        </div>
                    </form>
                </div>


            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseRegister}>

                </Button>

            </Modal.Footer>
        </Modal>



    )





}