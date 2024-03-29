import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import commentReducer from './comment';
import postReducer from './post';
import session from './session'
import subredditReducer from './subreddit';
import likesReducer from './like.js'
import commentlikesReducer from './commentlikes';

const rootReducer = combineReducers({
  session,
  posts: postReducer,
  comments: commentReducer,
  subreddits: subredditReducer,
  likes: likesReducer,
  commentlikes: commentlikesReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
