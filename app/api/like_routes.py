from flask import Blueprint, render_template, url_for, redirect, request, jsonify
from ..models import Post, db, Comment, User
from ..forms.create_post import CreatePost
from flask_login import current_user, login_user, logout_user, login_required
from sqlalchemy.ext.declarative import declarative_base

Base=declarative_base()

like_bp = Blueprint("like_routes", __name__, url_prefix="/api/likes")

