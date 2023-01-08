import React, { useState, useEffect, createContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage"
import * as sessionActions from "./store/session";
import MyProfile from './components/MyProfile';
import PostDetails from './components/PostDetails';
import CreatePost from './components/CreatePost';
import ReactSwitch from "react-switch";

export const ThemeContext  = createContext(null);



function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [theme, setTheme] = useState("dark")

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"))
  }

  useEffect(() => {
    (async () => {
      await dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    })();
  }, [dispatch]);

  return (
    <ThemeContext.Provider value = {{theme, toggleTheme}}>
    <div className = "page-container" id = {theme}>
      <Navigation isLoaded={isLoaded} theme = {theme} toggleTheme = {toggleTheme} />
      <Switch>
        <Route path='/' exact={true} >
          <HomePage />
        </Route>
        <Route path='/myprofile' exact={true} >
          <MyProfile />
        </Route>
        <Route path='/posts/:postId' exact={true} >
          <PostDetails />
        </Route>
        <Route path = '/createpost' exact = {true}>
          <CreatePost/>
        </Route>

      </Switch>
      </div>
      <footer className="footer">
          <div className="footer-about">
          {/* <div className = "switch"><span className = "toggle">{theme === "light" ? "Light Mode" : "Dark Mode"}</span> <ReactSwitch onChange = {toggleTheme} checked = {theme === "light"}/></div> */}
            <strong>Rabbit, a clone of Reddit. By Ashwin Ramakrishnan</strong>
          </div>
          <div className="footer-links">
            <a id="github" className="links-github" href="https://github.com/ashramki96/Rabbit-">
              <i className="fa-brands fa-github fa-xl"></i>
            </a>
            <a id="linkedin" className="links-github" href="https://www.linkedin.com/in/ashwin-ramakrishnan-4910b9b1/">
              <i className="fa-brands fa-linkedin fa-xl"></i>
            </a>
          </div>
      </footer>
    </ThemeContext.Provider>
  );
}

export default App;
