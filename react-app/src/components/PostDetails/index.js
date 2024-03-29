import React, { useEffect , useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import { loadAllComments} from '../../store/comment';
import { deletePost, loadAllPosts } from '../../store/post';
import { createNewComment, deleteComment, clearAllComments} from '../../store/comment';
import "./PostDetails.css"
import EditComment from '../EditComment';
import EditPost from '../EditPost';
import CreateLike from '../CreateLike';
import CreateCommentLike from '../CreateCommentLike';

const PostDetails = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    let {postId} = useParams();
    postId = parseInt(postId)

    
    const [comment, setComment] = useState("")
    const [validationErrors, setValidationErrors] = useState([])



    useEffect(() => {
        dispatch(loadAllComments())
        dispatch(loadAllPosts())

        const errors = []
        if(comment.length === 0) errors.push("Please enter a comment")
        setValidationErrors(errors)
    }, [dispatch, comment])

   

    const allPosts = useSelector(state => Object.values(state.posts))
    const allComments = useSelector(state => Object.values(state.comments))
    let sessionUser = useSelector(state => state.session.user)

    if(!allPosts) return null
    if(!allComments) return null

    const post = allPosts.filter(post => post.id === postId)[0]
    const comments = allComments.filter(comment => comment.post_id === postId)
  

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

    const handlePostDelete = async () => {
        await dispatch(clearAllComments())
        await dispatch(deletePost(postId))
        .then(() => dispatch(loadAllComments))
        .then(() => dispatch(loadAllPosts))
        history.push("/")
    }
    

    return(
    <div className = "outerPostDetailsContainer">
        <div className = "createLikeContainer"><CreateLike post = {post} sessionUser = {sessionUser} /></div>
        <div>
            
            <div className="innerPostDetailsContainer">
            <span className = "subredditName">r/{post?.subreddit.name}</span> <span className = "postedBy">posted by u/{post?.user.username}</span>
            <div className = "deleteEditContainer">
                {sessionUser?.id === post?.user_id ? <div className = "deleteButton" onClick = {() => handlePostDelete(comment?.id)}>Delete</div> : null}
                {sessionUser?.id === post?.user_id ?<div className = "editCommentComponent"> <EditPost currPost = {post}/></div> : null}
                </div>
                <h3>{post?.title}</h3>
                <div>{post?.text}</div>
                {/* <CreateLike /> */}
                <h4>Comments:</h4>
                
                {sessionUser ? <form onSubmit={handleCommentSubmit} onChange = {createComment}className = "comment-form">
                    <textarea className = "createCommentBox" placeholder="What are your thoughts?" maxlength = "300" required></textarea>
                    <div className="wordLimitmain">
              {comment.length}/300
                </div>
                    <div className = "comment-submit"><input className = "submitButton" type="submit" value="Submit" disabled = {validationErrors.length > 0}></input></div>
                </form> : null}

                {comments.slice(0).reverse().map(comment => {
                    return(
                        <div className = "OuterCommentContainer">
                            <div><CreateCommentLike comment = {comment} sessionUser = {sessionUser} /></div>
                        <div className = "innerCommentContainer">
                            <div className = "commentpostedBy">{comment?.user.username}</div>
                            <span className = "commentComment"> {comment?.comment}</span>
                            <br></br>
                            <div className = "deleteEditContainer">
                           {sessionUser && sessionUser.id === comment.user_id ? <div className = "deleteButton" onClick = {() => handleCommentDelete(comment?.id)}>Delete</div> : null}
                           {sessionUser && sessionUser.id === comment.user_id ? <div className = "editCommentComponent"><EditComment currComment = {comment}/></div> : null}
                            </div>
                        </div>
                        </div>
                    )
                })}

            </div>
        
    </div>
    </div>
    )
    
}

export default PostDetails