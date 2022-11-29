import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("")
  const [errors, setErrors] = useState([]);

 

  if (sessionUser) return <Redirect to="/" />;


  const handleSubmit = (e) => {
    e.preventDefault();
    if(email.includes("@") !== true){
      return setErrors([`Please provide a valid email`])
    }
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password, firstName, lastName}))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <>
    <div className="Outer-modal-Container">
    <div className="Inner-modal-Container">
    <h2 className = "title">Sign up</h2>
    <form onSubmit={handleSubmit} className = "formContainer">
      <div className = 'errors'>
        {errors.map((error, idx) => <div>{error}</div>)}
        </div>
      
        {/* <input
        placeholder = "First Name"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      
      
        
        <input
        placeholder = "Last Name"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        /> */}
      
      
      <div>
        <input className="form-inputs"
        placeholder = "Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        </div>
      
      <div>
        <input className="form-inputs"
        placeholder = "Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        </div>
      
      <div>
        <input className="form-inputs"
        placeholder = "Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        </div>
      
      <div>
        <input className="form-inputs"
        placeholder = "Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        </div>
      
      <button className = "signupButton" type="submit">Sign Up</button>
    </form>
    </div>
    </div>
    </>
  );
}

export default SignupForm;