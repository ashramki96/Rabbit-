from flask import Blueprint, render_template, url_for, redirect, request, jsonify
from ..models import Post, db, Like, Comment, CommentLike
from ..forms.create_post import CreatePost
from flask_login import current_user, login_user, logout_user, login_required
from sqlalchemy.ext.declarative import declarative_base

Base=declarative_base()

commentlike_bp = Blueprint("commentlike_routes", __name__, url_prefix="/api/commentlikes")


# Get all likes
@commentlike_bp.route("/", methods=["GET"])
def get_all_likes():
    all_likes = CommentLike.query.all()
    response = []
    if all_likes:
        for like in all_likes:
            like_obj = like.to_dict()
            response.append(like_obj)

        return{"Likes": response}, 200

    return {"Error":"404 Not Found"}, 404


# remove like
@commentlike_bp.route("/<int:like_id>/", methods=["DELETE"])
# @login_required
def remove_like(like_id):

    print("did this work 1 !!!!!!!!!!!!!!!!!")

    like = CommentLike.query.get(like_id)

    print("did this work 2 !!!!!!!!!!!!!!!!!")

    if like:
        db.session.delete(like)
        db.session.commit()

        return {"message" : "Like removed"}, 200

    return {"Error": "404 Like Not Found"}, 404