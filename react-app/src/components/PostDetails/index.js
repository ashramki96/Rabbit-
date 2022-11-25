import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import { loadAllComments} from '../../store/comment';
import { loadAllPosts } from '../../store/post';
import "./PostDetails.css"

const PostDetails = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    let {postId} = useParams();
    postId = parseInt(postId)

    useEffect(() => {
        dispatch(loadAllComments())
        dispatch(loadAllPosts())
    }, [dispatch])

    const allPosts = useSelector(state => Object.values(state.posts))
    const allComments = useSelector(state => Object.values(state.comments))
    if(!allPosts) return null
    if(!allComments) return null
    const post = allPosts.filter(post => post.id === postId)[0]
    const comments = allComments.filter(comment => comment.post_id === postId)
    console.log("current post", post)
    console.log("comments for post", comments)
    
    return(
    <div className = "outerPostContainer">
        
        <div>
            <div className="innerPostContainer">
                <h3>{post?.title}</h3>
                <div>{post?.text}</div>
                <h4>Comments:</h4>
                <form className = "comment-form">
                    <textarea></textarea>
                    <div className = "comment-submit"><input type="submit" value="Submit"></input></div>
                </form>
                {comments.map(comment => {
                    return(
                        <div className = "innerCommentContainer">
                            <div><strong>{comment?.user.username}</strong></div>
                            {comment?.comment}
                        </div>
                    )
                })}

            </div>
        
    </div>
    </div>
    )
    
}

export default PostDetails