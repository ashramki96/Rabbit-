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
    </>
  );
}

export default App;
