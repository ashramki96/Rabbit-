import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import {createNewLike, deleteLike, loadAllLikes} from "../../store/commentlikes"
import {loadAllComments} from "../../store/comment"
import "./CreateCommentLike.css"




function CreateCommentLike({comment, sessionUser}){
    const dispatch = useDispatch()
    let commentLikes = comment?.commentlikes
    // useEffect(() => {
    //     dispatch(loadAllPosts())
      
    // }, [dispatch])

    if (!sessionUser){
        return null
    }
    
    let comment_id = comment?.id
    let user_id = sessionUser.id


    const commentLikeArray= comment?.commentlikes

    // const likeByUser = commentLikeArray?.filter(commentlike => commentlike && commentlike.user_id === sessionUser?.id)[0]
    const likeByUser = commentLikeArray?.filter(like => like && like.user_id === sessionUser?.id && like.like_status === true)[0] 
    const dislikeByUser = commentLikeArray?.filter(dislike => dislike && dislike.user_id === sessionUser?.id && dislike.like_status === false)[0] 

    const allLikes = commentLikeArray?.filter(commentlike => commentlike && commentlike.like_status === true)
    const allDislikes = commentLikeArray?.filter(commentlike => commentlike && commentlike.like_status === false)
    const numberLikes = allLikes?.length - allDislikes?.length

    // console.log("this is likesarry By USER", likeByUser)
    // let objectLikeByUser = likeByUser[0]
    // console.log("this is objjectlikeByUser", objectLikeByUser)
    // console.log("this is the id I want to delete", objectLikeByUser?.id)


    const likeHandler = async () => {
        // e.preventDefault()

        const payload = {
            comment_id,
            user_id,
            like_status: true
        }

        let like
        like = await dispatch(createNewLike(comment_id, user_id, payload)).then(()=>dispatch(loadAllLikes())).then(()=>dispatch(loadAllComments()))

       }

       const dislikeHandler = async () => {
        // e.preventDefault()

        const payload = {
            comment_id,
            user_id,
            like_status: false
        }

        let like
        like = await dispatch(createNewLike(comment_id, user_id, payload)).then(()=>dispatch(loadAllLikes())).then(()=>dispatch(loadAllComments()))

       }

       const deleteLikeHandler = async (likeToDelete) => {
        // e.preventDefault()

        const payload = likeToDelete.id
       

        let deletedlike
        deletedlike= await dispatch(deleteLike(payload)).then(()=>dispatch(loadAllLikes())).then(()=>dispatch(loadAllComments()))
       }

    return(
        <>
                <div className="likes-container">
            
            {/* <div className="likes">Likes: {comment.likes}</div> */}
        </div>

        {/* <div className="likecomment-description-container"> */}
            <div className="Like-container">
            {likeByUser ? <i id = "post-vote" class="fa-solid fa-chevron-up" onClick={() => deleteLikeHandler(likeByUser)}/>: <i id = "post-vote" class="fa-solid fa-chevron-up" onClick={() => likeHandler()}/>}
            <div id = "comment-vote" className="likes">{numberLikes}</div>
            {dislikeByUser ? <i id = "post-vote" class="fa-solid fa-chevron-down" onClick={() => deleteLikeHandler(dislikeByUser)} /> :  <i id = "post-vote" class="fa-solid fa-chevron-down" onClick={() => dislikeHandler()}/>}
            </div>
        {/* </div> */}
        </>
    )

}

export default CreateCommentLike