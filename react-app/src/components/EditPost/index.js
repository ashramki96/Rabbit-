import React, { useEffect , useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import { loadAllComments} from '../../store/comment';
import { loadAllPosts, editPost } from '../../store/post';
import { createNewComment, deleteComment, editComment } from '../../store/comment';
import "./EditPost.css"
import { $CombinedState } from 'redux';

const EditPost = ({currPost}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    let {postId} = useParams();
    postId = parseInt(postId)

    const [showEditBox, setShowEditBox] = useState(false)
    const [text, setText] = useState("")
    const [validationErrors, setValidationErrors] = useState([])

    useEffect(() => {
        dispatch(loadAllComments())
        dispatch(loadAllPosts())

        const errors = []
        if(text.length < 150) errors.push("Text must be greater than 150 characters")
        if(text.length === 0) errors.push("Please enter text")
        setValidationErrors(errors)
    }, [dispatch, text])

    const editText = (e) => setText(e.target.value)

    const handleTextEdit = async(e) => {
        setShowEditBox(false)

        const textPayload = {
            text
        }

        console.log("text payload is", textPayload)
        console.log("post id is", postId)

        await dispatch(editPost(textPayload, postId))
        .then (() => dispatch(loadAllComments))
        .then (() => dispatch(loadAllPosts))
    }

    return (
        <>
            <div className="editButton" onClick={() => setShowEditBox(true)}>Edit</div>
            {showEditBox && (
                <div className="editForm">
                    <form onSubmit={handleTextEdit} onChange={editText} className="edit-post-form">
                        <textarea className = "editPostText"  maxlength = "5000">{currPost.text}</textarea>
                        <div className="wordLimitEditPost">
                        <div className = "minimum">150 Character minimum</div> {text.length}/5000
                </div>
                        <div className="submitCancelContainerPost">
                            <div className="edit-post-submit"><input className = "submitButtonEdit" type="submit" disabled = {validationErrors.length > 0} value="Submit"></input></div>
                            <button className = "cancelButtonEdit" onClick={() => setShowEditBox(false)}> Cancel </button>
                        </div>

                    </form>
                </div>

          
    )
}
        </>
    )
}

export default EditPost