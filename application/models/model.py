""" Module represents a User. """

from sqlalchemy import (
    Column, String, Integer,
    DateTime, Date, Boolean,
    ForeignKey
)

from sqlalchemy import (
    Column, String, Integer, DateTime, Date, Boolean, DECIMAL, ForeignKey, Text
)
from sqlalchemy.dialects.postgresql import UUID

from sqlalchemy.orm import relationship, backref

from application.database import db
from application.database.model import CommonModel, default_uuid


roles_users = db.Table('roles_users',
                       db.Column('user_id', Integer, db.ForeignKey('users.id', ondelete='cascade'), primary_key=True),
                       db.Column('role_id', Integer, db.ForeignKey('role.id', onupdate='cascade'), primary_key=True))


class Role(CommonModel):
    __tablename__ = 'role'
    id = db.Column(Integer, autoincrement=True, primary_key=True)
    role_name = db.Column(String(100), index=True, nullable=False, unique=True)
    display_name = db.Column(String(255), nullable=False)
    description = db.Column(String(255))

class User(CommonModel):
    __tablename__ = 'users'

    id = db.Column(Integer, autoincrement=True, primary_key=True)

    # Authentication Attributes.
    user_name = db.Column(String(255), nullable=False, index=True)
    full_name = db.Column(String(255), nullable=True)
    email = db.Column(String(255), nullable=False, index=True)
    
    # Permission Based Attributes.
    is_active = db.Column(Boolean, default=True)

    # Methods
    def __repr__(self):
        """ Show user object info. """
        return '<User: {}>'.format(self.id)