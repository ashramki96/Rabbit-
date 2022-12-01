import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage"
import * as sessionActions from "./store/session";
import MyProfile from './components/MyProfile';
import PostDetails from './components/PostDetails';
import CreatePost from './components/CreatePost';



function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    })();
  }, [dispatch]);

  return (
    <>
    <div className = "page-container">
      <Navigation isLoaded={isLoaded} />
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
    </>
  );
}

export default App;
