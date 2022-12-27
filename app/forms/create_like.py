from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, ValidationError



class CreateLike(FlaskForm):
    user_id = StringField("user_id")
    post_id = StringField("post_id")