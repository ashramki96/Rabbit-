import {
    csrfFetch
} from "./csrf"


//****************************** ACTION CREATORS *******************************

const GET_COMMENTS = 'comments/getAllComments'
const CREATE_COMMENT = 'comments/createComment'
const UPDATE_COMMENT = 'comments/updateComment'
const DELETE_COMMENT = 'comments/deleteComment'

const getAllComments = comments => ({
    type: GET_COMMENTS,
    payload: comments
})

const createComment = comment => ({
    type: CREATE_COMMENT,
    payload: comment
})

const updateComment = comment => ({
    type: UPDATE_COMMENT,
    payload: comment
})

const removeComment = commentId => ({
    type: DELETE_COMMENT,
    payload: commentId
})

//************************************ THUNKS **********************************

export const loadAllComments = () => async dispatch => {
    const response = await csrfFetch('/api/comments/')
    if(response.ok){
        const commentList = await response.json()
        dispatch(getAllComments(commentList))
    }
}

export const createNewComment = (payload, userId, postId) => async dispatch => {

    const response = await csrfFetch(`/api/comments/${userId}/${postId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)

    })

    if (response.ok) {
        let comment = await response.json()
        dispatch(createComment(comment))
        return comment
    }
}

export const editComment = (commentId, payload) => async dispatch => {

    const response = await csrfFetch(`/api/comments/${commentId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const editedComment = await response.json();
        dispatch(updateComment(editedComment))
        return editedComment
    }
}

export const deleteComment = (commentId) => async dispatch => {
    const response = await csrfFetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if(response.ok){
        dispatch(removeComment(commentId))
        return response
    }
}

// ******************************* REDUCERS ************************************

const initialState = {}

const commentReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case GET_COMMENTS:
            newState = {
                ...state
            }
            action.payload.Comments.forEach((comment) => {
                newState[comment.id] = comment
            });
            return newState
            // ****************************************************************************
        case CREATE_COMMENT:
            newState = {
                ...state
            }
            newState[action.payload.id] = action.payload
            return newState
            // *****************************************************************************
        case UPDATE_COMMENT:
            newState = {
                ...state
            }
            newState[action.payload.id] = action.payload

            return newState;


            // *****************************************************************************
        case DELETE_COMMENT:
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

export default commentReducer

