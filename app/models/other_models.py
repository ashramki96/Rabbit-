from .db import db, environment, SCHEMA, add_prefix_for_prod
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
        db.ForeignKey(add_prefix_for_prod("subreddits.id"))
    ),
    db.Column(
        "user_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("users.id"))
    )
)

class Subreddit(db.Model):
    __tablename__ = "subreddits"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA} 

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(100), nullable = False)
    about = db.Column(db.String(10000), nullable = False)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable = False)
    created_at = db.Column(db.DateTime, nullable=False, unique=False, index=False, default=datetime.now)

    posts = db.relationship("Post", back_populates = "subreddit", cascade = "all, delete-orphan")
    users = db.relationship("User", secondary=subreddits_users, back_populates = "subreddits")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'about': self.about,
            'owner_id': self.owner_id,
            'created_at': self.created_at
        }


class Post(db.Model):
    __tablename__ = "posts"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA} 

    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(2000), nullable = False)
    text = db.Column(db.String(2000), nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable = False)
    subreddit_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("subreddits.id")), nullable = False)
    created_at = db.Column(db.DateTime, nullable=False, unique=False, index=False, default=datetime.now)
    user = db.relationship("User", back_populates = "posts")
    comments = db.relationship("Comment", back_populates = "post", cascade = "all, delete-orphan")
    subreddit = db.relationship("Subreddit", back_populates = "posts")

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'text': self.text,
            'user_id': self.user_id,
            'subreddit_id': self.subreddit_id,
            'created_at': self.created_at,
            'user': self.user.to_dict() if self.user else None,
            'subreddit': self.subreddit.to_dict()
            # 'comments': len(self.commments) if self.comments else None
        }
    

class Comment(db.Model):
    __tablename__ = "comments"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA} 

    id = db.Column(db.Integer, primary_key = True)
    comment = db.Column(db.String(10000), nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable = False)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("posts.id")), nullable = False)
    created_at = db.Column(db.DateTime, nullable=False, unique=False, index=False, default=datetime.now)
    user = db.relationship("User", back_populates = "comments")
    post = db.relationship("Post", back_populates = "comments")

    def to_dict(self):
        return {
            'id': self.id,
            'comment': self.comment,
            'post_id': self.post_id,
            'user_id': self.user_id,
            'created_at': self.created_at,
            'user': self.user.to_dict() if self.user else None
        }



    
