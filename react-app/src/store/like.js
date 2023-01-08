import {
    csrfFetch
} from "./csrf"
// *****************************************************************************
//****************************** ACTION CREATORS *******************************


///*************************************************************************** */
const GET_ALLLIKES = 'posts/getAllLikes'
const CREATE_LIKE = 'posts/createLike'
const DELETE_LIKE = 'posts/removeLike'


const getAllLikes = like => ({
    type: GET_ALLLIKES,
    payload: like
})



const createLike = like => ({
    type: CREATE_LIKE,
    payload: like
})


const removeLike = likeId => ({
    type: DELETE_LIKE,
    payload: likeId
})

// *****************************************************************************
//************************************ THUNKS **********************************



export const loadAllLikes = () => async dispatch => {
    const response = await csrfFetch('/api/likes/')
    if (response.ok) {
        const likesList = await response.json();
        dispatch(getAllLikes(likesList))
    }
}

//*************************************************************************** */



export const createNewLike = (post_id,user_id,payload) => async dispatch => {
    const response = await csrfFetch(`/api/posts/${post_id}/${user_id}/likes/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        let like = await response.json()
        dispatch(createLike(like))
        return like
    }
}

//*************************************************************************** */



export const deleteLike = (likeId) => async dispatch => {
    const response = await csrfFetch(`/api/likes/${likeId}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.ok) {
        dispatch(removeLike(likeId))
        return response
    }
}



// ******************************* REDUCERS ************************************

const initialState = {}

const likesReducer = (state = initialState, action) => {

    let newState;
    switch (action.type) {
        case GET_ALLLIKES:
            newState = {
                ...state
            }
            action.payload.Likes.forEach((like) => {
                newState[like.id] = like
            });
            return newState
 

        case CREATE_LIKE:
            newState = {
                ...state
            }
            newState[action.payload.id] = action.payload
            return newState
          
        case DELETE_LIKE:
            newState = {
                ...state
            }
            delete newState[action.payload]
            return newState
           

        default:
            return state

    }
}


export default likesReducer