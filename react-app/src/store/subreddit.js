import {
    csrfFetch
} from "./csrf"

//****************************** ACTION CREATORS *******************************

const GET_SUBREDDITS = "subreddits/getAllSubreddits"

const getAllSubreddits = subreddits => ({
    type: GET_SUBREDDITS,
    payload: subreddits
})

//************************************ THUNKS **********************************

export const loadAllSubreddits = () => async dispatch => {
    const response = await csrfFetch('/api/subreddits/')
    console.log("RESPONSE IS", response)
    if(response.ok){
        const subredditList = await response.json()
        console.log("SUBREDDIT", subredditList)
        dispatch(getAllSubreddits(subredditList))
    }
}

// ******************************* REDUCERS ************************************

const initialState = {}

const subredditReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case GET_SUBREDDITS:
            newState = {
                ...state
            }
            action.payload.Subreddits.forEach((subreddit) => {
                newState[subreddit.id] = subreddit
            })
            return newState

            default:
                return state
    }
}

export default subredditReducer