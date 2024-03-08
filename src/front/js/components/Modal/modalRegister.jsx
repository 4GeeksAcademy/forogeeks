
import React from "react";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const ModalRegister = ({ showRegister, handleCloseRegister }) => {
    return (
        <Modal show={showRegister} onHide={handleCloseRegister}>
            <Modal.Header closeButton> </Modal.Header>
            <Modal.Body className="ModalBody m-auto">
                <div className="ContentBody  m-auto">
                    <form className="formRegister">
                        <p className="ContentBody titleR ">Register </p>
                        <div className="Inputs">
                            <div className="ContentName">
                                <input required="" placeholder="Manuel" type="text" className="inputSignUpandRegister w-50" />
                            </div>
                            <div className="ContentLastname">
                                <input required="" placeholder="Lastname" type="text" className="inputSignUpandRegister w-50" />

                            </div>
                            <div className="ContentEmail group ">
                                <input required="" placeholder="email" type="email" className="inputSignUpandRegister" />
                            </div>
                            <div className="ContentPassword group ">
                                <input required="" placeholder=" Password" type="password" className="inputSignUpandRegister" />
                            </div>
                            <div className=" group">
                                <input required="  " placeholder="Confirm password" type="password" className="inputSignUpandRegister " />
                            </div>
                            <button className="submit">Submit</button>
                            <p className="signin">Already have an acount ? <a href="#">Signin</a> </p>
                        </div>
                    </form>
                </div>


            </Modal.Body>
            <Modal.Footer>

            <button   type="submit" className="ButtonModal m-auto" > <span className="m-auto">Sign up</span>  <div className="arrow-wrapper"> <div className="arrow"></div>   </div> </button>
        

            </Modal.Footer>
        </Modal>







    )





}