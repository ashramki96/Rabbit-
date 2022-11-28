from flask import Blueprint, render_template, url_for, redirect, request, jsonify
from ..models import User, Subreddit, Post, Comment
from ..forms.create_subreddit import CreateSubreddit
from flask_login import current_user, login_user, logout_user, login_required
from ..forms.create_subreddit import CreateSubreddit
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

subreddit_bp = Blueprint("subreddit_routes", __name__, url_prefix = "/api/subreddits")

# Get all subreddits
@subreddit_bp.route("/", methods = ['GET'])
def get_all_subreddits():
    all_subreddits = Subreddit.query.all()
    response = []
    print("allsubredditts is!!!!!!!!!!!!!!!!!!", all_subreddits)
    if all_subreddits:
        for subreddit in all_subreddits:
            subreddit_obj = subreddit.to_dict()
            print("subreddit obj is !!!!!!!!", subreddit_obj)
            response.append(subreddit_obj)

        return {"Subreddits": response}, 200

    return {"Error": "404 Not Found"}, 404