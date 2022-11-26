import React, { useEffect , useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import { loadAllComments} from '../../store/comment';
import { loadAllPosts } from '../../store/post';
import { createNewComment, deleteComment } from '../../store/comment';
import "./PostDetails.css"
import EditComment from '../EditComment';

const PostDetails = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    let {postId} = useParams();
    postId = parseInt(postId)

    
    const [comment, setComment] = useState("")

    useEffect(() => {
        dispatch(loadAllComments())
        dispatch(loadAllPosts())
    }, [dispatch])

   

    const allPosts = useSelector(state => Object.values(state.posts))
    const allComments = useSelector(state => Object.values(state.comments))
    let sessionUser = useSelector(state => state.session.user)

    if(!allPosts) return null
    if(!allComments) return null

    const post = allPosts.filter(post => post.id === postId)[0]
    const comments = allComments.filter(comment => comment.post_id === postId)
    console.log("current post", post)
    console.log("comments for post", comments)

    const createComment = (e) => setComment(e.target.value)

    const handleCommentSubmit = async (e) => {

        const commentPayload = {
            comment
        }

        const createdComment = await dispatch(createNewComment(commentPayload, sessionUser.id, postId))
            .then (() => dispatch(loadAllComments))
            .then (() => dispatch(loadAllPosts))
    }

    const handleCommentDelete = async (commentId) => {
       
        await dispatch(deleteComment(commentId))
            .then(() => dispatch(loadAllComments))
            .then(() => dispatch(loadAllPosts))
    }

    

    return(
    <div className = "outerPostContainer">
        
        <div>
            <div className="innerPostContainer">
                <h3>{post?.title}</h3>
                <div>{post?.text}</div>
                <h4>Comments:</h4>
                
                {sessionUser ? <form onSubmit={handleCommentSubmit} onChange = {createComment}className = "comment-form">
                    <textarea></textarea>
                    <div className = "comment-submit"><input type="submit" value="Submit"></input></div>
                </form> : null}

                {comments.slice(0).reverse().map(comment => {
                    return(
                        <div className = "innerCommentContainer">
                            <div><strong>{comment?.user.username}</strong></div>
                            {comment?.comment}
                            <br></br>
                           <div className = "deleteButton" onClick = {() => handleCommentDelete(comment?.id)}>Delete</div>
                           <div className = "editCommentComponent"><EditComment currComment = {comment}/></div>
                          
                        </div>
                    )
                })}

            </div>
        
    </div>
    </div>
    )
    
}

export default PostDetails