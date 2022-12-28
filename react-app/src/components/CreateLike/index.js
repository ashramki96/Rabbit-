import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import {createNewLike, deleteLike, loadAllLikes} from "../../store/like"
import {loadAllPosts} from "../../store/post"


function CreateLike({post, sessionUser}){
    const dispatch = useDispatch()
    let postLikes = post.likes
    // useEffect(() => {
    //     dispatch(loadAllPosts())
      
    // }, [dispatch])

    if (!sessionUser){
        return null
    }
    let post_id = post.id
    let user_id = sessionUser.id

    const postLikeArray= post.likes

    const likeByUser = postLikeArray.filter(like => like && like.user_id === sessionUser?.id)[0]

    // console.log("this is likesarry By USER", likeByUser)
    // let objectLikeByUser = likeByUser[0]
    // console.log("this is objjectlikeByUser", objectLikeByUser)
    // console.log("this is the id I want to delete", objectLikeByUser?.id)


    const likeHandler = async () => {
        // e.preventDefault()

        const payload = {
            post_id,
            user_id
        }

        let like
        like = await dispatch(createNewLike(post_id, user_id, payload)).then(()=>dispatch(loadAllLikes())).then(()=>dispatch(loadAllPosts()))

       }

       const deleteLikeHandler = async () => {
        // e.preventDefault()

        const payload = likeByUser.id
        console.log("this is payload", payload)

        let deletedlike
        deletedlike= await dispatch(deleteLike(payload)).then(()=>dispatch(loadAllLikes())).then(()=>dispatch(loadAllPosts()))
       }

    return(
        <>
                <div className="likes-container">
            <div className="likes">Likes: {postLikes.length}</div>
            {/* <div className="likes">Likes: {post.likes}</div> */}
        </div>

        <div className="likecomment-description-container">
            <div className="Like-container">
            {likeByUser ? <button className="fa-solid fa-thumbs-up" onClick={() => deleteLikeHandler()}> DISLIKE</button>: <button className="fa-regular fa-thumbs-up" onClick={() => likeHandler()}> LIKE</button>}
            <button className="fa-solid fa-thumbs-up" onClick={() => deleteLikeHandler()}> DISLIKE</button>
            </div>
        </div>
        </>
    )

}


export default CreateLike

