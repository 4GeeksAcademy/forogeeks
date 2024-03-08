import { IconBrandFacebook, IconBrandGithub, IconBrandGoogle, IconRecordMail, IconX } from "@tabler/icons-react";
import React from "react";
import { useState, useContext } from "react";
import { ModalRegister } from "./modalRegister.jsx";
import { Context } from "react";

import { Modal, Button } from "react-bootstrap";
import Icon from "../icons/icon.jsx";


export const ModalLogin = ({ showLogin, handleCloseLogin }) => {
    //Context
    //ModalRegister
    const [showRegister, setShowRegister] = useState(false);
    const handleCloseRegister = () => setShowRegister(false);
    const handleShowRegister = () => setShowRegister(true);
    //Sign Up
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    //handleSubmit
   
    function handleSubmit(e) {
        e.preventDefault()
        console.log(email, password)
    }



    return (
        <>
            <Modal className="Modal  col-sm" show={showLogin} onHide={handleCloseLogin}>
                <Modal.Header closeButton className="ModalHeader"> </Modal.Header>
                <Modal.Body className="ModalBody col-sm col-md ">
                    <div className="ContentBody   m-auto p-5   col-sm col-md   ">
                        <div className="ContentBody d-flex m-auto" col-sm col-md >
                            <h3 class>Sign Up</h3>
                        </div>
                        <div className="DivForm m-auto" col-sm col-md >
                            {/* Form*/}
                            <form  onSubmit={handleSubmit} className="Form m-auto" >

                                {/* Input Email ,SVG ICON LOGIN */}
                                <div className="group mt-2">
                                     <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-mail" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" />  <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" /> <path d="M3 7l9 6l9 -6" /> </svg>
                                    <input className="inputSignUpandRegister form-control " type="email" placeholder="user123@gmail.com" onChange={(e) => setEmail(e.target.value)} id="inputEmailLogin"  aria-describedby="emailHelp" />
                                 
                                </div>
                                 {/* Input ***** ,SVG ICON *****/}
                                <div className="group mt-4">
                                    <svg stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="icon"> <path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" stroke-linejoin="round" stroke-linecap="round"></path>  </svg>
                                    <input className="inputSignUpandRegister" type="password" placeholder="password"  onChange={(e) => setPassword(e.target.value)} id="inputPasswordLogin" />
                                </div>
                                 {/* Body forget login */}
                                <div className="forget  p-t-12 mt-5 ">
                                    <span className="txt1 col-1"> Did you forget your &nbsp; <a className="txt2 col-4" href="#"> Username and Password?</a> </span>
                                </div>
                                     {/* Content Register  with*/}
                                <div className="text-center p-t-136 mt-2 d-flex flex-column justify-content-between">
                                    <span>or continue with </span>
                                    <a className="txt2" href="#">
                                        <div className="IconsModalLogin d-flex justify-content-between p-3">
                                            <span className="IconGoogle" ><IconBrandGoogle className="Google m-auto" /></span> <span className="IconGithub"><IconBrandGithub /></span><span className="IconFacebook"><IconBrandFacebook /></span>
                                        </div>
                                    </a>
                                </div>
                                 {/* Content Register  */}
                                <div className="text-center p-t-136 mt-2.3">
                                    <span>Don`t have an account yet? </span>
                                    <a className="txt2" href="#" onClick={() => { handleShowRegister(); handleCloseLogin(); }} >
                                        Register for free
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modalFooter" bg-light>
                    <button   type="submit" className="ButtonModal m-auto" > <span className="m-auto">Sign up</span>  <div className="arrow-wrapper"> <div className="arrow"></div>   </div> </button>
                </Modal.Footer>
            </Modal>
            {/* Modal   */}
            <ModalRegister showRegister={showRegister} handleCloseRegister={handleCloseRegister} />
        </>


    )





}