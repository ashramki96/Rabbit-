import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import { loadAllComments} from '../../store/comment';
import { loadAllPosts } from '../../store/post';

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
        <h1>Welcome to Your Profile!</h1>
        <h2>Your Posts are: </h2>
        {userPosts.map(post => {
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
        <h2>Your Comments are: </h2>
            {userComments.map(comment => {
                return (
                    <div>
                        <NavLink key={comment.id} to={`/posts/${comment.post_id}`}>
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