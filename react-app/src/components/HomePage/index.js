import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import { loadAllComments} from '../../store/comment';
import { loadAllPosts } from '../../store/post';
import "./HomePage.css"

const HomePage = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(loadAllComments())
        dispatch(loadAllPosts())
    }, [dispatch])

    const allPosts = useSelector(state => Object.values(state.posts))
    const sessionUser = useSelector(state => state.session.user)
    if(!allPosts) return null
    console.log("ALL POSTS IS", allPosts)

    return (
        <div>
        {/* <h2 className = "welcome">Welcome to Rabbit!</h2> */}
        {sessionUser ? <div className = "createPostContainer">
         <div className = "createPostButton" onClick = {() => history.push("/createpost")}>Create Post</div>
        </div> : null}
        <div className = "outerPostContainer"> 
        
                {allPosts.map(post => {
                    return (
                        <div>
                            <NavLink key={post.id} to={`/posts/${post.id}`}>
                                <div className="innerPostContainer">
                                    <span className = "subredditName">r/{post.subreddit.name}</span> <span className = "postedBy">Posted by u/{post.user.username}</span>
                                    <h3>{post.title}</h3>
                                    <div>{post.text}</div>
                                </div>
                            </NavLink>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default HomePage