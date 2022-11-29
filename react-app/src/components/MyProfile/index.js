import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import { loadAllComments} from '../../store/comment';
import { loadAllPosts } from '../../store/post';
import './MyProfile.css'

const MyProfile = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    let sessionUser = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(loadAllComments())
        dispatch(loadAllPosts())
    }, [dispatch])

    const allPosts = useSelector(state => Object.values(state.posts))
    const allComments = useSelector(state => Object.values(state.comments))

    const userPosts = allPosts.filter(post => post.user_id === sessionUser?.id)
    const userComments = allComments.filter(comment => comment.user_id === sessionUser?.id)
    return (
        <div>
        <h1 className = "myProfile">u/{sessionUser?.username}'s  Profile </h1>
        <h3 className = "yourContent">Your Posts are: </h3>
        {userPosts.map(post => {
            return (
                <div>
                    <NavLink key={post.id} to={`/posts/${post.id}`}>
                        <div className="innerPostContainer">
                        <span className = "subredditName">r/{post?.subreddit.name}</span>
                            <h4>{post.title}</h4>
                            <div>{post.text}</div>
                        </div>
                    </NavLink>
                </div>
            )
        })}
        <h3 className = "yourContent">Your Comments are: </h3>
            {userComments.map(comment => {
                return (
                    <div>
                        <NavLink key={comment.id} to={`/posts/${comment.post_id}`}>
                            <span className = "postTitle">{allPosts.filter(post => comment.post_id === post.id)[0]?.title} </span> 
                            <span className = "subredditNameComment"> r/{allPosts.filter(post => comment.post_id === post.id)[0]?.subreddit.name}</span>
                            <div className="innerPostContainer">
                                <div>{comment.comment}</div>
                            </div>
                        </NavLink>
                    </div>
                )
        })}
        </div>
    )
}

export default MyProfile