import {
    csrfFetch
} from "./csrf"
// *****************************************************************************
//****************************** ACTION CREATORS *******************************


///*************************************************************************** */
const GET_ALLLIKES = 'comments/getAllLikes'
const CREATE_LIKE = 'comments/createLike'
const DELETE_LIKE = 'comments/removeLike'
const UPDATE_LIKE = 'posts/editLike'

const getAllLikes = like => ({
    type: GET_ALLLIKES,
    payload: like
})

const editALike = like => ({
    type: UPDATE_LIKE,
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
    const response = await csrfFetch('/api/commentlikes/')
    if (response.ok) {
        const likesList = await response.json();
        dispatch(getAllLikes(likesList))
    }
}

//*************************************************************************** */



export const createNewLike = (comment_id,user_id,payload) => async dispatch => {
    const response = await csrfFetch(`/api/comments/${comment_id}/${user_id}/commentlikes/new`, {
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
    const response = await csrfFetch(`/api/commentlikes/${likeId}/`, {
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

//*************************************************************************** */

export const editLike = (likeId, payload) => async dispatch => {
    const response = await csrfFetch(`/api/commentlikes/${likeId}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }) 

    if(response.ok){
        const editedLike = await response.json();
        dispatch(editALike(editedLike))
        return editedLike
    }
}


// ******************************* REDUCERS ************************************

const initialState = {}

const commentlikesReducer = (state = initialState, action) => {

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
        
        case UPDATE_LIKE:
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


export default commentlikesReducer