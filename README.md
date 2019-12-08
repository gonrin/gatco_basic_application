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

```