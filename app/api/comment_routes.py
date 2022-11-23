from flask import Blueprint, render_template, url_for, redirect, request, jsonify
from ..models import User, Subreddit, Post, Comment
from ..forms.create_comment import CreateComment
from flask_login import current_user, login_user, logout_user, login_required
from ..forms.create_comment import CreateComment
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


