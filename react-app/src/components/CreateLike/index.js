import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import {editLike, createNewLike, deleteLike, loadAllLikes} from "../../store/like"
import {loadAllPosts} from "../../store/post"
import "./CreateLike.css"
import "./images/up-arrow.png"



function CreateLike({post, sessionUser}){

    const [disabled, setDisabled] = useState(false)
    const dispatch = useDispatch()
    let postLikes = post?.likes
    // useEffect(() => {
    //     dispatch(loadAllPosts())
      
    // }, [dispatch])

    if (!sessionUser){
        return null
    }
    let post_id = post?.id
    let user_id = sessionUser.id


    const postLikeArray= post?.likes

    // const likeByUser = postLikeArray?.filter(like => like && like.user_id === sessionUser?.id)[0] 

    const likeByUser = postLikeArray?.filter(like => like && like.user_id === sessionUser?.id && like.like_status === 1)[0] 
    const dislikeByUser = postLikeArray?.filter(dislike => dislike && dislike.user_id === sessionUser?.id && dislike.like_status === -1)[0] 
    
    
    const allLikes = postLikeArray?.filter(like => like && like.like_status === 1)
    const allDislikes = postLikeArray?.filter(like => like && like.like_status === -1)
    let numberLikes = 0

    for (let i = 0; i< postLikeArray?.length; i++){
        numberLikes = numberLikes + postLikeArray[i].like_status
    }

    // console.log("this is likesarry By USER", likeByUser)
    // let objectLikeByUser = likeByUser[0]
    // console.log("this is objjectlikeByUser", objectLikeByUser)
    // console.log("this is the id I want to delete", objectLikeByUser?.id)


    const likeHandler = async () => {
        // e.preventDefault()

        setDisabled(true)


        // setTimeout(() => {
        //     setDisabled(false)
        // }, 1000)


        const payload = {
            post_id,
            user_id,
            like_status: 1
        }

        let like
        like = await dispatch(createNewLike(post_id, user_id, payload)).then(()=>dispatch(loadAllLikes())).then(()=>dispatch(loadAllPosts())).then(()=>setDisabled(false))

        // setTimeout(() => {
        //     setDisabled(false)
        // }, 1000)
       }

       const dislikeHandler = async () => {
        // e.preventDefault()

        setDisabled(true)


      

        

        const payload = {
            post_id,
            user_id,
            like_status: -1
        }

        let like
        like = await dispatch(createNewLike(post_id, user_id, payload)).then(()=>dispatch(loadAllLikes())).then(()=>dispatch(loadAllPosts())).then(()=>setDisabled(false))

        // setTimeout(() => {
        //     setDisabled(false)
        // }, 1000)
       }

       const editLikeHandler = async (likeByUser, dislikeByUser) => {
        // e.preventDefault()
        let likeToDelete
        if (likeByUser){
             likeToDelete = likeByUser
        }

        else likeToDelete = dislikeByUser
        

        setDisabled(true)


      

        const payload = {
            post_id,
            user_id,
            like_status: 0
        }
       

        let editedlike
        editedlike= await dispatch(editLike(likeToDelete.id, payload)).then(()=>dispatch(loadAllLikes())).then(()=>dispatch(loadAllPosts())).then(()=>setDisabled(false))
        
        //   setTimeout(() => {
        //     setDisabled(false)
        // }, 1000)
    }

    return(
        <>
                <div className="likes-container">
            
            {/* <div className="likes">Likes: {post.likes}</div> */}
        </div>

        {/* <div className="likecomment-description-container"> */}
            <div className="Like-container">
            {likeByUser || dislikeByUser ? <button className = "likeButton" disabled = {disabled} onClick={() => editLikeHandler(likeByUser, dislikeByUser)}><i class="fa-solid fa-chevron-up"/></button>: <button className = "likeButton" disabled = {disabled} onClick={() => likeHandler()}><i id = "post-vote" class="fa-solid fa-chevron-up"/></button>}
            <div className="vote">{numberLikes}</div>
            {dislikeByUser || likeByUser ? <button className = "likeButton" disabled = {disabled} onClick={() => editLikeHandler(likeByUser, dislikeByUser)}><i class="fa-solid fa-chevron-down" /></button>:  <button className = "likeButton" disabled = {disabled} onClick={() => dislikeHandler()}><i id = "post-vote" class="fa-solid fa-chevron-down"/></button>}
            </div>
        {/* </div> */}
        </>
    )

}

export default CreateLike