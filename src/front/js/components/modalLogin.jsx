import { IconBrandFacebook, IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import React from "react";
import { useState } from "react";
import { ModalRegister } from "./modalRegister.jsx";

import { Modal, Button } from "react-bootstrap";


export const ModalLogin = ({ showLogin, handleCloseLogin }) => {
    //Login
    const [showRegister, setShowRegister] = useState(false);
    const handleCloseRegister = () => setShowRegister(false);
	const handleShowRegister = () => setShowRegister(true);

    return (
        <>
        

        <Modal show={showLogin} onHide={handleCloseLogin}>
           
            <Modal.Body className="ModalBody m-auto">
            
               <h3 class>Login</h3> 
                <div className="m-auto">


                    <form className="login100-form validate-form m-auto">

                 
                        <div className="wrap-input100 validate-input m-auto" data-validate="Valid email is required: ex@abc.xyz">
                            <p className="text1 p-1">Email</p>
                            <input className="input100 m-auto " type="text" name="email" placeholder="username@gmail.com" />


                        </div>

                        <div className="wrap-input100 validate-input mt-5" data-validate="Password is required">
                            <p className="text1 ">Password</p>
                            <input className="input100" type="password" name="pass" placeholder="Password" />


                        </div>

                        <div className="  p-t-12 mt-2 ">
                            <span className="txt1">
                                Forgot.
                            </span>
                            <a className="txt2" href="#">
                                Username / Password?
                            </a>
                        </div>

                        <div className="container-login100-form-btn mt-5" >
                            <Button className="Buttonlogin text-white " onClick={handleCloseLogin}>
                                Sign In
                            </Button>
                        </div>

                        <div className="text-center p-t-136 mt-3 d-flex flex-column justify-content-between">
                            <span>or continue with </span>
                            <a className="txt2" href="#">
                                <div className="IconsModalLogin d-flex justify-content-between ">

                            <span className="IconGoogle" ><IconBrandGoogle className="Google m-auto" /></span>
                            <span><IconBrandGithub/></span>
                            <span><IconBrandFacebook/></span>
                            </div>

                            </a>
                        </div>

                        <div className="text-center p-t-136 mt-4">
                            <span>Don`t have an account yet? </span>
                            <a className="txt2" href="#" onClick={handleShowRegister}>
                                Register for free
                                <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
                            </a>
                        </div>
                    </form>
                </div>


            </Modal.Body>
          
        </Modal>
        <ModalRegister showRegister={showRegister} handleCloseRegister={handleCloseRegister} />
        </>


    )





}