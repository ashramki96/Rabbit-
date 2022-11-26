import React, { useEffect , useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import { loadAllComments} from '../../store/comment';
import { loadAllPosts } from '../../store/post';
import { createNewComment, deleteComment, editComment } from '../../store/comment';
import "./EditComment.css"
import { $CombinedState } from 'redux';


const EditComment = ({currComment}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    let {postId} = useParams();
    postId = parseInt(postId)

    console.log("edit comment component postid is", postId)
    console.log("curr comment is !!!! is", currComment)

    const [showEditBox, setShowEditBox] = useState(false)
    const [comment, setComment] = useState("")

    useEffect(() => {
        dispatch(loadAllComments())
        dispatch(loadAllPosts())
    }, [dispatch])

  

    const editSaidComment = (e) => setComment(e.target.value)

    const handleCommentEdit = async (e) => {

        setShowEditBox(false)
        console.log("hello from handleCommentEdit")
    
        const commentPayload = {
            comment
        }
      
        await dispatch(editComment(currComment.id, commentPayload))
        .then (() => dispatch(loadAllComments))
        .then (() => dispatch(loadAllPosts))
    }

    return(
        <>
        <div className = "editButton" onClick = {() => setShowEditBox(true)}>Edit</div>
        {showEditBox && (
            <div className = "editForm">
            <form onSubmit={handleCommentEdit} onChange = {editSaidComment} className = "edit-comment-form">
                
         <textarea>{currComment.comment}</textarea>
         
         <div className = "edit-comment-submit"><input type="submit" value="Submit"></input></div>
         <button onClick = {() => setShowEditBox(false)}> Cancel </button>
        
         </form>
         </div>
         
          
    )
}
        </>
    )

}

export default EditComment