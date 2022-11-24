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
// import cb from './Images/cb.png'
// import cb2 from './Images/cb2.png'




function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLogInModal, setShowLogInModal] = useState(false);



  let sessionLinks;
  if (sessionUser) {
    const sessionUserId = sessionUser.id



    sessionLinks = (
      <>
      <div className= "profile-button">
      <ProfileButton user={sessionUser}/>
      </div>
      </>

    );
  } else {
    sessionLinks = (
      <>
      <div className= "logged-out-profile-container">
      <div className="sign-up-text" style={{ zIndex: 3 }} onClick={() => setShowSignUpModal(true)}>Sign Up</div>
      <div className="log-in-text" style={{ zIndex: 3 }} onClick={() => setShowLogInModal(true)}>Log In</div>
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
        {/* <ProfileButton /> */}
      </>
    );
  }

  return (
    <div className="navbar-main">
      <div className="navbar-inner-container">
    <div className= "Home-Container">
        <NavLink exact to="/">Rabbit</NavLink>
    </div>

    <div className="Right-Side-Container">
      {isLoaded && sessionLinks}
    </div>
    </div>
    </div>

  );
}

export default Navigation;
