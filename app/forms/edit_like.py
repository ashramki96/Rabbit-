from flask_wtf import FlaskForm
from app.models import db, User
from wtforms import StringField, SelectField, SubmitField, SelectMultipleField,IntegerField, FloatField
from wtforms.validators import DataRequired, ValidationError
from flask_login import current_user, login_user, logout_user, login_required

class EditLike(FlaskForm):
    user_id = StringField("user_id")
    post_id = StringField("post_id")
    like_status = IntegerField("like_status")