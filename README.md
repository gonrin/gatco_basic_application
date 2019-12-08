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
pass

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
$ cd repo
$ source ../bin/activate
$ pip install -r requirements.txt
```