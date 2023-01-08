from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, BooleanField
from wtforms.validators import DataRequired, ValidationError



class CreateCommentLike(FlaskForm):
    user_id = StringField("user_id")
    comment_id = StringField("comment_id")
    like_status = BooleanField("like_status")