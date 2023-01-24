from flask_wtf import FlaskForm
from app.models import db, User
from wtforms import StringField, SelectField, SubmitField, SelectMultipleField,IntegerField, FloatField
from wtforms.validators import DataRequired, ValidationError
from flask_login import current_user, login_user, logout_user, login_required

class EditCommentLike(FlaskForm):
    user_id = StringField("user_id")
    comment_id = StringField("comment_id")
    like_status = IntegerField("like_status")