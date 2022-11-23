import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import { loadAllComments} from '../../store/comment';
import { loadAllPosts } from '../../store/post';

const MyProfile = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(loadAllComments())
        dispatch(loadAllPosts())
    }, [dispatch])

    return (
        <h1>Welcome to Your Profile!</h1>
    )
}

export default MyProfile