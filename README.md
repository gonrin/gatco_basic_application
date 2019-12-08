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

## Step 7: Migrate Test Model to Database

```
$ pip install psycopg2-binary
$ rm -Rf alembic/versions/
$ mkdir alembic/versions/

--- migrate form models to database
$ alembic revision --autogenerate -m "init"
INFO  [alembic.runtime.migration] Context impl PostgresqlImpl.
INFO  [alembic.runtime.migration] Will assume transactional DDL.
  Generating /mnt/share/Documents/Projects/Python3/gonstack/gatco_basic_application/alembic/versions/56302fe4c0f7_init.py ...  done

$ alembic upgrade head

INFO  [alembic.runtime.migration] Context impl PostgresqlImpl.
INFO  [alembic.runtime.migration] Will assume transactional DDL.
INFO  [alembic.runtime.migration] Running upgrade  -> 56302fe4c0f7, init
```

## Step 8: Create User API

Create File application/controllers/user.py

```
from gatco.response import json, text
from application.server import app
from application.database import db
from application.extensions import auth

from application.models.model import User, Role

@app.route("/user_test")
async def user_test(request):
    return text("user_test api")
```

Edit application/controllers/__init__.py

```
def init_views(app):
    import application.controllers.user
```

Restart server and test webpage:

```
http://0.0.0.0:8090/user_test

Response in webpage: user_test api
```

## Step 9: Migrate User Model to Database:

```
$ alembic revision --autogenerate -m "add user model"
INFO  [alembic.runtime.migration] Context impl PostgresqlImpl.
INFO  [alembic.runtime.migration] Will assume transactional DDL.
INFO  [alembic.autogenerate.compare] Detected added table 'role'
INFO  [alembic.autogenerate.compare] Detected added index 'ix_role_role_name' on '['role_name']'
INFO  [alembic.autogenerate.compare] Detected added table 'users'
INFO  [alembic.autogenerate.compare] Detected added index 'ix_users_email' on '['email']'
INFO  [alembic.autogenerate.compare] Detected added index 'ix_users_user_name' on '['user_name']'
INFO  [alembic.autogenerate.compare] Detected added table 'roles_users'
  Generating /mnt/share/Documents/Projects/Python3/gonstack/gatco_basic_application/alembic/versions/99ecb5c82cdd_add_user_model.py
  ...  done


$ alembic upgrade head
INFO  [alembic.runtime.migration] Context impl PostgresqlImpl.
INFO  [alembic.runtime.migration] Will assume transactional DDL.
INFO  [alembic.runtime.migration] Running upgrade 56302fe4c0f7 -> 99ecb5c82cdd, add user model
```

Check in Postgresql database, check users, role, users_roles table

## Step 10: Create admin user:

File application/models/model.py

```
#User model
    password = db.Column(String(255), nullable=False)
    salt = db.Column(String(255), nullable=False)
```
Migrate to alembic

```
$ alembic revision --autogenerate -m "change user model"
INFO  [alembic.runtime.migration] Context impl PostgresqlImpl.
INFO  [alembic.runtime.migration] Will assume transactional DDL.
INFO  [alembic.ddl.postgresql] Detected sequence named 'role_id_seq' as owned by integer column 'role(id)', assuming SERIAL and omitting
INFO  [alembic.ddl.postgresql] Detected sequence named 'users_id_seq' as owned by integer column 'users(id)', assuming SERIAL and omitting
INFO  [alembic.autogenerate.compare] Detected added column 'users.password'
INFO  [alembic.autogenerate.compare] Detected added column 'users.salt'
  Generating
  /mnt/share/Documents/Projects/Python3/gonstack/gatco_basic_application/alembic/versions/cbccc8f688fc_change_user_model.py ...  done

$ alembic upgrade head
INFO  [alembic.runtime.migration] Context impl PostgresqlImpl.
INFO  [alembic.runtime.migration] Will assume transactional DDL.
INFO  [alembic.runtime.migration] Running upgrade 99ecb5c82cdd -> cbccc8f688fc, change user model
```