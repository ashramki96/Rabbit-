from flask import Blueprint, render_template, url_for, redirect, request, jsonify
from ..models import User, Subreddit, Post, Comment, db
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

#Create a post
@post_bp.route("/<int:user_id>/<int:subreddit_id>", methods = ['POST'])
def create_post(user_id, subreddit_id):

    create_post_form = CreatePost()
    create_post_form['csrf_token'].data = request.cookies['csrf_token']
    if create_post_form.validate_on_submit():
        data = create_post_form.data
        new_post = Post(
            title = data["title"],
            text = data["text"],
            user_id = user_id,
            subreddit_id = subreddit_id
        )

        db.session.add(new_post)
        db.session.commit()

        new_post_obj = new_post.to_dict()
        return new_post_obj, 201

#Edit a post based on postId
@post_bp.route("/<int:post_id>", methods = ['PUT'])
def edit_post(post_id):

    edit_post_form = CreatePost()
    edit_post_form['csrf_token'].data = request.cookies['csrf_token']

    if edit_post_form.validate_on_submit():
        data = edit_post_form.data
        edited_post = Post.query.get(post_id)

        edited_post.title = data["title"]
        edited_post.text = data["text"]

        db.session.commit()
        edited_post_obj = edited_post.to_dict()

        return edited_post_obj, 201
    
    return {"Error": "Validation Error"}, 401


#Delete a post by postId
@post_bp.route("/<int:post_id>", methods=["DELETE"])
def delete_post(post_id):

    post = Post.query.get(post_id)

    if post:
        db.session.delete(post)
        db.session.commit()

        return {"message" : "Post succesfully deleted"}, 200

    return {"Error": "404 Post Not Found"}, 404