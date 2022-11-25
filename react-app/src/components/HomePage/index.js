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
    if(!allPosts) return null
    console.log("ALL POSTS IS", allPosts)

    return (
        <div>
        <h1>Welcome to Rabbit!</h1>
        <h2>Timeline</h2>
        <div className = "outerPostContainer">
        
                {allPosts.map(post => {
                    return (
                        <div>
                            <NavLink key={post.id} to={`/posts/${post.id}`}>
                                <div className="innerPostContainer">
                                    <h4>{post.title}</h4>
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