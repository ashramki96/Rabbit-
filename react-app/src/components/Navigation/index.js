// frontend/src/components/Navigation/index.js
import React, { useState, useEffect } from "react";

import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { Modal } from '../../context/Modal'
// import LoginFormModal from '../LoginFormModal';
// import SignupFormModal from '../SignupFormModal';
import SignupForm from '../SignupFormModal/SignupForm'
import LoginForm from '../LoginFormModal/LoginForm'
import ReactSwitch from "react-switch";
// import cb from './Images/cb.png'
// import cb2 from './Images/cb2.png'






function Navigation({ isLoaded, theme, toggleTheme}){
  const sessionUser = useSelector(state => state.session.user);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLogInModal, setShowLogInModal] = useState(false);



  let sessionLinks;
  if (sessionUser) {
    const sessionUserId = sessionUser.id



    sessionLinks = (
      <>
      <div className = "switch"><span className = "toggle">{theme === "light" ? "Light Mode" : "Dark Mode"}</span> <ReactSwitch onChange = {toggleTheme} checked = {theme === "light"}/></div>
      <div className= "profile-button">
      <ProfileButton user={sessionUser} setShowSignUpModal = {setShowSignUpModal} setShowLogInModal = {setShowLogInModal}/>
      </div>
      </>

    );
  } else {
    sessionLinks = (
      <>
      <div className= "logged-out-profile-container">
      <div className="sign-up-button"  onClick={() => setShowSignUpModal(true)}><div className = "sign-up-text" >Sign Up</div></div>
      <div className="log-in-button"  onClick={() => setShowLogInModal(true)}><div className = "log-in-text" >Log In</div></div>
      </div>
      {showSignUpModal && (
          <Modal onClose={() => setShowSignUpModal(false)}>
            <SignupForm />

          </Modal>
        
        )}
        {showLogInModal && (
          <Modal onClose={() => setShowLogInModal(false)}>
            <LoginForm />
          </Modal>
          
        )}
        
      </>
    );
  }

  return (
    <div className="navbar-main">
      <div className="navbar-inner-container">
    <div className= "Home-Container">
        <NavLink exact to="/"><i class="fa-2x fa-brands fa-reddit-alien"></i></NavLink>
    </div>

    <div className="Right-Side-Container">
      {isLoaded && sessionLinks}
    </div>
    </div>
    </div>

  );
}

export default Navigation;
