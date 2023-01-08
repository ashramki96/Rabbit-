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
        {userPosts.length === 0 && userComments.length === 0 ? 
        <div>
        <h2 className = "nothing">Nothing to see here! Go engage on some posts or make your own!</h2>
        <img className = "blind" src = "https://a.thumbs.redditmedia.com/yEE6JW30dDWjn5fM-53uj_rt_HvKeHPzJromK93goN4.png" />
        </div>: null}
        {userPosts.length > 0 ? <h3 className = "yourContent">Your Posts are: </h3>: null}
        {userPosts.map(post => {
            return (
                <div>
                    <NavLink key={post.id} to={`/posts/${post.id}`}>
                        <div className="innerYourPostContainer">
                        <span className = "subredditName">r/{post?.subreddit.name}</span>
                            <h4>{post.title}</h4>
                            <div>{post.text}</div>
                        </div>
                    </NavLink>
                </div>
            )
        })}
        {userComments.length > 0 ? <h3 className = "yourContent">Your Comments are: </h3>: null}
            {userComments.map(comment => {
                return (
                    <div>
                        <NavLink key={comment.id} to={`/posts/${comment.post_id}`}>
                            <span className = "postTitle">{allPosts.filter(post => comment.post_id === post.id)[0]?.title} </span> 
                            <span className = "subredditNameComment"> r/{allPosts.filter(post => comment.post_id === post.id)[0]?.subreddit.name}</span>
                            <div className="innerYourPostContainer">
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