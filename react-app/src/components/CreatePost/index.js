import React, { useEffect , useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import { loadAllComments} from '../../store/comment';
import { loadAllPosts, createNewPost } from '../../store/post';
import { createNewComment, deleteComment } from '../../store/comment';
import { loadAllSubreddits } from '../../store/subreddit';

const CreatePost = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [subreddit, setSubreddit] = useState()
    const [validationErrors, setValidationErrors] = useState([])

    useEffect(() => {
        dispatch(loadAllComments())
        dispatch(loadAllPosts())
        dispatch(loadAllSubreddits())

        const errors = []
        if(title.length === 0) errors.push("Please enter a title")
        if(text.length === 0) errors.push("Please enter text")
        setValidationErrors(errors)
    }, [dispatch, title, text])

    const allSubreddits = useSelector(state => Object.values(state.subreddits))
    let sessionUser = useSelector(state => state.session.user)

    const createTitle = (e) => setTitle(e.target.value)
    const createText = (e) => setText(e.target.value)
    const createSubreddit = (e) => setSubreddit(e.target.value)

    const handlePostSubmit = async (e) => {
        e.preventDefault()
        console.log("is this hitting")
        const postPayload = {
            title,
            text
        }

        console.log("title", title)
        console.log("text", text)
        console.log("subredditid", subreddit)

        await dispatch(createNewPost(postPayload, subreddit, sessionUser.id))
        .then (() => dispatch(loadAllComments))
        .then (() => dispatch(loadAllPosts))
        .then(() => history.push("/"))
        
        

    }

    return (
        <>
            <h2>Create a post</h2>
            <form className="comment-form" onSubmit = {handlePostSubmit}>
                <div> Select the community:
                    <select className="selectfield" onChange={createSubreddit}>
                        <option value="" disabled selected hidden>Choose Community</option>
                        {allSubreddits.map((sub, i) => {return <option key={i} value={sub.id}>{sub.name}</option> })}
                    </select>
                </div>
                <input placeholder="title" required onChange={createTitle}></input>
                <textarea placeholder="What are your thoughts?" required onChange={createText}></textarea>
                <div className = "post-submit"><input type="submit" value="Submit" disabled = {validationErrors.length > 0}></input></div>
            </form>
        </>
    )
   
}

export default CreatePost