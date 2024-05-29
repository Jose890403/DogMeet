from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    name = db.Column(db.String(250), unique=False, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False, default=True)

    def __repr__(self):
        return f'<User {self.email}>'
    

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            
            # do not serialize the password, its a security breach
        }
    
class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    img = db.Column(db.String)
    bodytext = db.Column(db.String(120), unique=False, nullable=False)
    id_user = db.Column(db.Integer, db.ForeignKey('user.id')) 
    user = db.relationship('User', backref='Post', lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "img": self.img,
            "bodytext": self.bodytext,
        }

class Comment (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_user = db.Column(db.Integer, db.ForeignKey('user.id'))
    id_post = db.Column(db.Integer, db.ForeignKey('post.id'))
    comment = db.Column(db.String)
    user = db.relationship('User', backref='Comment', lazy=True)
    post = db.relationship('Post', backref='Comment', lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "comment": self.comment,
            # do not serialize the password, its a security breach
        }


class Suggestion (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_user = db.Column(db.Integer, db.ForeignKey('user.id'))
    suggestion = db.Column(db.String)
    user = db.relationship('User', backref='Suggestion', lazy=True)
    def serialize(self):
        return {
            "id": self.id,
            "suggestion": self.suggestion,
            # do not serialize the password, its a security breach
        }

