from flask_sqlalchemy import SQLAlchemy
from datetime import datetime


db = SQLAlchemy()


# TODO: Create the models for the database
# 1. User, 2. Category, 3. Threads, 4. FavoriteThreads, 5. ThreadLikes, 6. ThreadComments, 7. Message

# 2. Category
class Category(db.Model):
    __tablename__ = 'category'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), unique=False, nullable=False)

    def __repr__(self):
        return f'<Category {self.title}>'

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            # do not serialize the password, its a security breach
        }
# 1. User
class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), unique=False, nullable=False)
    user_threads = db.relationship('Threads', backref='user', lazy=True)
    profile_picture = db.Column(db.String(120), unique=False, nullable=True)
    description = db.Column(db.String(120), unique=False, nullable=True)
    favorite_threads = db.relationship('Threads', secondary='favorite_threads', backref='user_favorite', lazy=True)
    admin = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return f'<User {self.user_name}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "user_name": self.user_name,
            "email": self.email,
            "profile_picture": self.profile_picture,
            "description": self.description,
            "admin": self.admin,
            # do not serialize the password, its a security breach
        }
    

    
# 3. Threads
class Threads(db.Model):
    __tablename__ = 'threads'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'))
    title = db.Column(db.String(120), unique=False, nullable=False)
    content = db.Column(db.String(120), unique=False, nullable=False)
    thread_comments = db.relationship('ThreadComments', backref='thread', lazy=True)
    date = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<Thread {self.title}>'

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "user_id": self.user_id,
            "user": self.user.serialize(),
            # do not serialize the password, its a security breach
        }
# 6. ThreadComments
class ThreadComments(db.Model):
    __tablename__ = 'thread_comments'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    thread_id = db.Column(db.Integer, db.ForeignKey('threads.id'))
    content = db.Column(db.String(120), unique=False, nullable=False)
    reply_to = db.Column(db.Integer, db.ForeignKey('thread_comments.id'), nullable=True)
    date = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<ThreadComments {self.content}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "thread_id": self.thread_id,
            "content": self.content,
            "reply_to": self.reply_to,
            "date": self.date,
            # do not serialize the password, its a security breach
        }
# 5. ThreadLikes
class ThreadLikes(db.Model):
    __tablename__ = 'thread_likes'
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    thread_id = db.Column(db.Integer, db.ForeignKey('threads.id'), primary_key=True)

    def __repr__(self):
        return f'<ThreadLikes {self.user_id} {self.thread_id}>'
    
    def serialize(self):
        return {
            "user_id": self.user_id,
            "thread_id": self.thread_id,
            # do not serialize the password, its a security breach
        }

# 4. FavoriteThreads
    
class FavoriteThreads(db.Model):
    __tablename__ = 'favorite_threads'
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    thread_id = db.Column(db.Integer, db.ForeignKey('threads.id'), primary_key=True)

    def __repr__(self):
        return f'<FavoriteThreads {self.user_id} {self.thread_id}>'
    
    def serialize(self):
        return {
            "user_id": self.user_id,
            "thread_id": self.thread_id,
            # do not serialize the password, its a security breach
        }
    

    



# 7. Message
class PrivateMessages(db.Model):
    __tablename__ = 'private_messages'
    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    receiver_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    content = db.Column(db.String(120), unique=False, nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<Message {self.content}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "sender_id": self.sender_id,
            "receiver_id": self.receiver_id,
            "content": self.content,
            "date": self.date,
            # do not serialize the password, its a security breach
        }   


    



