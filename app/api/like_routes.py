from flask import Blueprint, render_template, url_for, redirect, request, jsonify
from ..models import Post, db, Like
from ..forms.create_post import CreatePost
from ..forms.edit_like import EditLike
from flask_login import current_user, login_user, logout_user, login_required
from sqlalchemy.ext.declarative import declarative_base

Base=declarative_base()

like_bp = Blueprint("like_routes", __name__, url_prefix="/api/likes")


# Get all likes
@like_bp.route("/", methods=["GET"])
def get_all_likes():
    all_likes = Like.query.all()
    response = []
    if all_likes:
        for like in all_likes:
            like_obj = like.to_dict()
            response.append(like_obj)

        return{"Likes": response}, 200

    return {"Error":"404 Not Found"}, 404


# Edit a like
@like_bp.route("/<int:like_id>/", methods=["PUT"])
def edit_like(like_id):
    
    edit_like_form = EditLike()
    print("HIIIIIIIIIIIIIIIIIIIIIIII!!!!!!!!!!!!!")
    edit_like_form['csrf_token'].data = request.cookies['csrf_token']

    if edit_like_form.validate_on_submit():
        data = edit_like_form.data
        edited_like = Like.query.get(like_id)
        
        edited_like.like_status = data["like_status"]

        db.session.commit()
        edited_like = edited_like.to_dict()

        return edited_like, 201

    return {"Error": "Validation Error"}, 401

# remove like
@like_bp.route("/<int:like_id>/", methods=["DELETE"])
# @login_required
def remove_like(like_id):

    print("did this work 1 !!!!!!!!!!!!!!!!!")

    like = Like.query.get(like_id)

    print("did this work 2 !!!!!!!!!!!!!!!!!")

    if like:
        db.session.delete(like)
        db.session.commit()

        return {"message" : "Like removed"}, 200

    return {"Error": "404 Like Not Found"}, 404