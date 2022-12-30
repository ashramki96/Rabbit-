import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import {createNewLike, deleteLike, loadAllLikes} from "../../store/like"
import {loadAllPosts} from "../../store/post"
import "./CreateLike.css"
import "./images/up-arrow.png"



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
    const allLikes = postLikeArray.filter(like => like && like.like_status === true)
    const allDislikes = postLikeArray.filter(like => like && like.like_status === false)
    const numberLikes = allLikes.length - allDislikes.length

    // console.log("this is likesarry By USER", likeByUser)
    // let objectLikeByUser = likeByUser[0]
    // console.log("this is objjectlikeByUser", objectLikeByUser)
    // console.log("this is the id I want to delete", objectLikeByUser?.id)


    const likeHandler = async () => {
        // e.preventDefault()

        const payload = {
            post_id,
            user_id,
            like_status: true
        }

        let like
        like = await dispatch(createNewLike(post_id, user_id, payload)).then(()=>dispatch(loadAllLikes())).then(()=>dispatch(loadAllPosts()))

       }

       const dislikeHandler = async () => {
        // e.preventDefault()

        const payload = {
            post_id,
            user_id,
            like_status: false
        }

        let like
        like = await dispatch(createNewLike(post_id, user_id, payload)).then(()=>dispatch(loadAllLikes())).then(()=>dispatch(loadAllPosts()))

       }

       const deleteLikeHandler = async () => {
        // e.preventDefault()

        const payload = likeByUser.id
        console.log("this is payload", payload)
        console.log(typeof(payload))

        let deletedlike
        deletedlike= await dispatch(deleteLike(payload)).then(()=>dispatch(loadAllLikes())).then(()=>dispatch(loadAllPosts()))
       }

    return(
        <>
                <div className="likes-container">
            
            {/* <div className="likes">Likes: {post.likes}</div> */}
        </div>

        {/* <div className="likecomment-description-container"> */}
            <div className="Like-container">
            {likeByUser ? <img className = "arrow" src = "https://i.ibb.co/R32gK4J/up-arrow.png" onClick={() => deleteLikeHandler()}/>: <img className = "arrow" src = "https://i.ibb.co/R32gK4J/up-arrow.png" onClick={() => likeHandler()}/>}
            <div className="likes">{numberLikes}</div>
            {likeByUser ? <img className = "arrow" src = "https://i.ibb.co/Vgm4081/down-arrow.png" onClick={() => deleteLikeHandler()}/>:  <img className = "arrow" src = "https://i.ibb.co/Vgm4081/down-arrow.png" onClick={() => dislikeHandler()}/>}
            </div>
        {/* </div> */}
        </>
    )

}

export default CreateLike