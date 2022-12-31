from flask import Blueprint, render_template, url_for, redirect, request, jsonify
from ..models import User, Subreddit, Post, Comment, db, CommentLike
from ..forms.create_commentlike import CreateCommentLike
from ..forms.create_comment import CreateComment
from flask_login import current_user, login_user, logout_user, login_required
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

comment_bp = Blueprint("comment_routes", __name__, url_prefix = "/api/comments")

# Get all comments
@comment_bp.route("/", methods = ['GET'])
def get_all_comments():
    all_comments = Comment.query.all()
    response = []

    if all_comments:
        for comment in all_comments:
            comment_obj = comment.to_dict()
            response.append(comment_obj)

        return{"Comments": response}, 200

    return {"Error": "404 Not Found"}, 404

#Create a comment based on userId and postID
@comment_bp.route("/<int:user_id>/<int:post_id>", methods = ['POST'])
def create_comment(user_id, post_id):

    create_comment_form = CreateComment()
    create_comment_form['csrf_token'].data = request.cookies['csrf_token']
    if create_comment_form.validate_on_submit():
        data = create_comment_form.data
        new_comment = Comment(
            comment = data["comment"],
            user_id = user_id,
            post_id = post_id
        )

        db.session.add(new_comment)
        db.session.commit()

        new_comment_obj = new_comment.to_dict()
        return new_comment_obj, 201

#Edit a comment based on commentId
@comment_bp.route("/<int:comment_id>", methods = ['PUT'])
def edit_comment(comment_id):

    edit_comment_form = CreateComment()
    edit_comment_form['csrf_token'].data = request.cookies['csrf_token']

    if edit_comment_form.validate_on_submit():
        data = edit_comment_form.data
        edited_comment = Comment.query.get(comment_id)

        edited_comment.comment = data["comment"]

        db.session.commit()
        edited_comment_obj = edited_comment.to_dict()

        return edited_comment_obj, 201
    
    return {"Error": "Validation Error"}, 401


#Delete a comment by commentId
@comment_bp.route("/<int:comment_id>", methods=["DELETE"])
def delete_comment(comment_id):

    comment = Comment.query.get(comment_id)

    if comment:
        db.session.delete(comment)
        db.session.commit()

        return {"message" : "Comment succesfully deleted"}, 200

    return {"Error": "404 Comment Not Found"}, 404

#Create like for a comment by commentId
@comment_bp.route("/<int:comment_id>/<int:sessionUserId>/likes/new", methods = ["POST"])
# @login_required
def create_like(comment_id, sessionUserId):

    create_like_form = CreateCommentLike()
    create_like_form['csrf_token'].data = request.cookies['csrf_token']
    if create_like_form.validate_on_submit():
        data = create_like_form.data
        like = CommentLike(
                user_id = data["user_id"],
                comment_id = data["comment_id"],
                like_status = data["like_status"]
                 )

        db.session.add(like)
        db.session.commit()
        return like.to_dict(), 201

    return {"Error": "Validation Error"}, 401