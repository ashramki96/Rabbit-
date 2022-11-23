from flask import Blueprint, render_template, url_for, redirect, request, jsonify
from ..models import User, Subreddit, Post, Comment
from ..forms.create_post import CreatePost
from flask_login import current_user, login_user, logout_user, login_required
from ..forms.create_post import CreatePost
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

post_bp = Blueprint("post_routes", __name__, url_prefix = "/api/posts")

# Get all posts
@post_bp.route("/", methods = ['GET'])
def get_all_posts():
    all_posts = Post.query.all()
    response = []
    print("all posts is!!!!!!!!!!!!!!!!!!", all_posts)
    if all_posts:
        for post in all_posts:
            post_obj = post.to_dict()
            print("post obj is !!!!!!!!", post_obj)
            response.append(post_obj)

        return {"Posts": response}, 200

    return {"Error": "404 Not Found"}, 404