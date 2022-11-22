from .db import db, environment, SCHEMA
from .user import User
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime

Base = declarative_base()

subreddits_users = db.Table(
    "subreddits_users",
    db.Model.metadata,
    db.Column(
        "subreddit_id",
        db.Integer,
        db.ForeignKey("subreddits.id")
    ),
    db.Column(
        "user_id",
        db.Integer,
        db.ForeignKey("users.id")
    )
)

class Subreddit(db.Model):
    __tablename__ = "subreddits"

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(100), nullable = False)
    about = db.Column(db.String(10000), nullable = False)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = False)
    created_at = db.Column(db.DateTime, nullable=False, unique=False, index=False, default=datetime.now)

    posts = db.relationship("Post", back_populates = "subreddit", cascade = "all, delete-orphan")


class Post(db.Model):
    __tablename__ = "posts"

    # if environment == "production":
    #     __table_args__ = {'schema': SCHEMA} do i need this for all tables??

    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(2000), nullable = False)
    text = db.Column(db.String(2000), nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = False)
    subreddit_id = db.Column(db.Integer, db.ForeignKey("subreddits.id"), nullable = False)
    created_at = db.Column(db.DateTime, nullable=False, unique=False, index=False, default=datetime.now)

    comments = db.relationship("Comment", back_populates = "post", cascade = "all, delete-orphan")
    subreddit = db.relationship("Subreddit", back_populates = "posts")
    

class Comment(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key = True)
    comment = db.Column(db.String(10000), nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = False)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable = False)
    created_at = db.Column(db.DateTime, nullable=False, unique=False, index=False, default=datetime.now)

    post = db.relationship("Post", back_populates = "comments")



    