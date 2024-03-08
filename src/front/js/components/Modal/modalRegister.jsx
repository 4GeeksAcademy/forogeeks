
import { IconUser } from "@tabler/icons-react";
import React from "react";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const ModalRegister = ({ showRegister, handleCloseRegister }) => {
    return (
        <Modal show={showRegister} onHide={handleCloseRegister}>
            <Modal.Header closeButton> </Modal.Header>
            <Modal.Body className="ModalBody m-auto">
                <div className="ContentBody  m-auto">
                    <form className="form">
                        <p className="ContentBody  title">Register </p>
                        <div className="ContentBody flex">
                            <label>
                                <input required="" placeholder="" type="text" className="inputSignUpandRegister w-50" />
                            </label>
                            <label>
                                <input required="" placeholder="" type="text" className="inputSignUpandRegister w-50" />
                                <span>Lastname</span>
                            </label>
                        </div>

                        <label>
                            <input required="" placeholder="" type="email" className="inputSignUpandRegister" />
                            <span>Email</span>
                        </label>

                        <label>
                            <input required="" placeholder="" type="password" className="inputSignUpandRegister" />
                            <span>Password</span>
                        </label>
                        <label>
                            <input required="" placeholder="" type="password" className="inputSignUpandRegister " />
                            <span>Confirm password</span>
                        </label>
                        <button className="submit">Submit</button>
                        <p className="signin">Already have an acount ? <a href="#">Signin</a> </p>
                    </form>
                </div>


            </Modal.Body>
            <Modal.Footer>

                <button classNameName="Signup m-auto">
                    <span classNameName="m-auto"></span>
                    <div className="arrow-wrapper">
                        <div className="arrow"></div>

                    </div>
                </button>


                <Button variant="secondary" onClick={handleCloseRegister}>

                </Button>

            </Modal.Footer>
        </Modal>







    )





}