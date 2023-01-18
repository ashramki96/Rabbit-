import {
    csrfFetch
} from "./csrf"


//****************************** ACTION CREATORS *******************************

const GET_POSTS = 'posts/getAllPosts'
const CREATE_POST = 'posts/createPost'
const UPDATE_POST = 'posts/updatePost'
const DELETE_POST = 'posts/deletePost'

const getAllPosts = posts => ({
    type: GET_POSTS,
    payload: posts
})

const createPost = post => ({
    type: CREATE_POST,
    payload: post
})

const updatePost = post => ({
    type: UPDATE_POST,
    payload: post
})

const removePost = postId => ({
    type: DELETE_POST,
    payload: postId
})

//************************************ THUNKS **********************************

export const loadAllPosts = () => async dispatch => {
    const response = await csrfFetch('/api/posts/')
   
    if(response.ok){
        const postList = await response.json()
        
        dispatch(getAllPosts(postList))
    }
}

export const createNewPost = (payload, subredditId, user_id) => async dispatch => {
    const response = await csrfFetch(`/api/posts/${user_id}/${subredditId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)

    })

    if (response.ok) {
        let post = await response.json()
        dispatch(createPost(post))
        return post
    }
}

export const editPost = (payload, postId) => async dispatch => {

    const response = await csrfFetch(`/api/posts/${postId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const editedPost = await response.json();
        dispatch(updatePost(editedPost))
        return editedPost
    }
}

export const deletePost = (postId) => async dispatch => {
    const response = await csrfFetch(`/api/posts/${postId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if(response.ok){
        dispatch(removePost(postId))
        return response
    }
}

// ******************************* REDUCERS ************************************

const initialState = {}

const postReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case GET_POSTS:
            newState = {
                ...state
            }
            
            action.payload.Posts.forEach((post) => {
                newState[post.id] = post
            });
            return newState
            // ****************************************************************************
        case CREATE_POST:
            newState = {
                ...state
            }
            newState[action.payload.id] = action.payload
            return newState
            // *****************************************************************************
        case UPDATE_POST:
            newState = {
                ...state
            }
            newState[action.payload.id] = action.payload

            return newState;


            // *****************************************************************************
        case DELETE_POST:
            newState = {
                ...state
            }
            delete newState[action.payload]
            return newState
            // *****************************************************************************
        default:
            return state

    }
}

export default postReducer

