## Step 1: Create Database

```
$ sudo su postgres
$ psql
postgres=# create database gatco_example_app encoding='UTF-8';
CREATE DATABASE
postgres=# create user gatco_exuser with password '123456';
CREATE ROLE
postgres=# grant all privileges on database gatco_example_app to gatco_exuser;
GRANT
postgres=# 
# \q

```

## Step 2: Copy Skeleton Project

```
$ python3 -m venv gatco_example_application
$ cd gatco_example_application/
$ git clone https://github.com/gonrin/gatco_basic_application.git repo
$ cd repo
```

## Step 3: Configure Database Connection

File: application/config.py

```
SQLALCHEMY_DATABASE_URI = 'postgresql://gatco_exuser:123456@localhost:5432/gatco_example_app'

AUTH_PASSWORD_SALT = 'ruewhndjsa17heaw'
SECRET_KEY = 'e2q8dhaushdauwd7qye'
SESSION_COOKIE_SALT = 'dhuasud819wubadhysagd'

```

File: alembic.ini

```
sqlalchemy.url = postgresql://gatco_exuser:123456@localhost:5432/gatco_example_app

```

## Step 4: Install extensions.

```
$ source ../bin/activate
$ pip install -r requirements.txt
```

## Step 5: Run test web server

```
$ python manage.py run
[2019-12-08 19:33:10 +0700] [41926] [INFO] Goin' Fast @ http://0.0.0.0:8000
[2019-12-08 19:33:10 +0700] [41929] [INFO] Starting worker [41929]
[2019-12-08 19:33:10 +0700] [41930] [INFO] Starting worker [41930]
```

## Step 6: Design Database Model

File: application/models/model.py

```
roles_users = db.Table('roles_users',
                       db.Column('user_id', Integer, db.ForeignKey('user.id', ondelete='cascade'), primary_key=True),
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
```

## Step 7: Migrate Model to Database

```
$ $ pip install psycopg2-binary
$ rm -Rf alembic/versions/
$ mkdir alembic/versions/
--- migrate form models to database
$ alembic revision --autogenerate -m "init"

--- create manual migrate
$ alembic revision -m "create user table"
```