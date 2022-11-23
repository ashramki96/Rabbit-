from flask_wtf import FlaskForm
from app.models import db, User, Review, Coder
from wtforms import StringField, SelectField, SubmitField, SelectMultipleField,IntegerField, FloatField
from wtforms.validators import DataRequired, ValidationError
from flask_login import current_user, login_user, logout_user, login_required

class CreateSubreddit(FlaskForm):
    name = StringField("MMA", validators = [DataRequired()])
    about = StringField("About", validators = [DataRequired()])
