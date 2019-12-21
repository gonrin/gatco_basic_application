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
    password = db.Column(String(255), nullable=False)
    salt = db.Column(String(255), nullable=False)

    # Permission Based Attributes.
    is_active = db.Column(Boolean, default=True)

    # Methods
    def __repr__(self):
        """ Show user object info. """
        return '<User: {}>'.format(self.id)

class QuocGia(CommonModel):
    __tablename__ = 'quocgia'
    id = db.Column(Integer, primary_key=True)
    ma = db.Column(String(255), unique=True)
    ten = db.Column(String(255), nullable=False)
    mota = db.Column(String(255), nullable=True)
    tinhthanh = db.relationship("TinhThanh", order_by="TinhThanh.id", cascade="all, delete-orphan")
    
class TinhThanh(CommonModel):
    __tablename__ = 'tinhthanh'
    id = db.Column(Integer, primary_key=True)
    ma = db.Column(String(255), unique=True)
    ten = db.Column(String(255), nullable=False)
    quocgia_id = db.Column(Integer, ForeignKey('quocgia.id'), nullable=False)
    quocgia = db.relationship('QuocGia')

class KhachHang(CommonModel):
    __tablename__ = 'khachhang'
    id = db.Column(Integer, primary_key=True)
    ma = db.Column(String(255), unique=True)
    ten = db.Column(String(255), nullable=False)
    quocgia_id = db.Column(Integer, ForeignKey('quocgia.id'), nullable=False)
    quocgia = db.relationship('QuocGia')
    sodienthoai = db.Column(String(255))
    email = db.Column(String(255))
    diachi = db.Column(String(255))

class HangHoa(CommonModel):
    __tablename__ = 'hanghoa'
    id = db.Column(Integer, primary_key=True)
    ma = db.Column(String(255), unique=True)
    ten = db.Column(String(255), nullable=False)
    gia = db.Column(Integer)
    ghichu = db.Column(String(255))

class HoaDon(CommonModel):
    __tablename__ = 'hoadon'
    id = db.Column(Integer, primary_key=True)
    ma = db.Column(String(255), unique=True)
    ghichu = db.Column(String(255))
    khachhang_id = db.Column(Integer, ForeignKey('khachhang.id'), nullable=False)
    tenkhachhang = db.Column(String(255))
    ngaymua = db.Column(DateTime)

    thanhtien = db.Column(DECIMAL)
    vat = db.Column(Integer, default=10)
    tongtien = db.Column(DECIMAL)

    chitiethoadon = db.relationship("ChiTietHoaDon", order_by="ChiTietHoaDon.id", cascade="all, delete-orphan", lazy='dynamic')

class ChiTietHoaDon(CommonModel):
    __tablename__ = 'chitiethoadon'
    id = db.Column(Integer, primary_key=True)
    hoadon_id = db.Column(Integer, ForeignKey('hoadon.id'), nullable=False)

    hanghoa_id = db.Column(Integer, ForeignKey('hanghoa.id'), nullable=False)
    mahanghoa = db.Column(String(255))
    tenhanghoa = db.Column(String(255))

    soluong = db.Column(Integer)
    dongia = db.Column(Integer)
    thanhtien = db.Column(Integer)
    