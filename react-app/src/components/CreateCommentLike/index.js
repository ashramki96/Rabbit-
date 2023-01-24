import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import {editLike, createNewLike, deleteLike, loadAllLikes} from "../../store/commentlikes"
import {loadAllComments} from "../../store/comment"
import "./CreateCommentLike.css"




function CreateCommentLike({comment, sessionUser}){
    const dispatch = useDispatch()
    const [disabled, setDisabled] = useState(false)
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
    const likeByUser = commentLikeArray?.filter(like => like && like.user_id === sessionUser?.id && like.like_status === 1)[0] 
    const dislikeByUser = commentLikeArray?.filter(dislike => dislike && dislike.user_id === sessionUser?.id && dislike.like_status === -1)[0] 

    const allLikes = commentLikeArray?.filter(commentlike => commentlike && commentlike.like_status === 1)
    const allDislikes = commentLikeArray?.filter(commentlike => commentlike && commentlike.like_status === -1)
    let numberLikes = 0

    for (let i = 0; i < commentLikeArray?.length; i++){
        numberLikes = numberLikes + commentLikeArray[i].like_status
    }

    // console.log("this is likesarry By USER", likeByUser)
    // let objectLikeByUser = likeByUser[0]
    // console.log("this is objjectlikeByUser", objectLikeByUser)
    // console.log("this is the id I want to delete", objectLikeByUser?.id)


    const likeHandler = async () => {
        // e.preventDefault()

        setDisabled(true)

       

        const payload = {
            comment_id,
            user_id,
            like_status: 1
        }

        let like
        like = await dispatch(createNewLike(comment_id, user_id, payload)).then(()=>dispatch(loadAllLikes())).then(()=>dispatch(loadAllComments())).then(()=>setDisabled(false))

       }

       const dislikeHandler = async () => {
        // e.preventDefault()

        setDisabled(true)

      

        const payload = {
            comment_id,
            user_id,
            like_status: -1
        }

        let like
        like = await dispatch(createNewLike(comment_id, user_id, payload)).then(()=>dispatch(loadAllLikes())).then(()=>dispatch(loadAllComments())).then(()=>setDisabled(false))

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
            comment_id,
            user_id,
            like_status: 0
        }
       

        let editedlike
        editedlike= await dispatch(editLike(likeToDelete.id, payload)).then(()=>dispatch(loadAllLikes())).then(()=>dispatch(loadAllComments())).then(()=>setDisabled(false))
        
        //   setTimeout(() => {
        //     setDisabled(false)
        // }, 1000)
    }

    return(
        <>
                <div className="likes-container">
            
            {/* <div className="likes">Likes: {comment.likes}</div> */}
        </div>

        {/* <div className="likecomment-description-container"> */}
            <div className="Like-container">
            {likeByUser || dislikeByUser ? <button className = "likeButton" disabled = {disabled} onClick={() => editLikeHandler(likeByUser, dislikeByUser)}><i class="fa-solid fa-chevron-up"/></button>: <button className = "likeButton" disabled = {disabled} onClick={() => likeHandler()}><i id = "post-vote" class="fa-solid fa-chevron-up"/></button>}
            <div id = "comment-vote" className="likes">{numberLikes}</div>
            {dislikeByUser || likeByUser ? <button className = "likeButton" disabled = {disabled} onClick={() => editLikeHandler(likeByUser, dislikeByUser)}><i class="fa-solid fa-chevron-down" /></button>:  <button className = "likeButton" disabled = {disabled} onClick={() => dislikeHandler()}><i id = "post-vote" class="fa-solid fa-chevron-down"/></button>}
            </div>
        {/* </div> */}
        </>
    )

}

export default CreateCommentLike