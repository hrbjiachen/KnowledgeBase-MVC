# Comp4711 Term Project

## Run this project

1. npm install

2. create database with below sql scripts

3. create .env file as below

## SQL

```sh

CREATE DATABASE `knowledgebase`

CREATE TABLE IF NOT EXISTS `user` (
  `user_id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `password` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fname` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lname` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `imgurl` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(512) COLLATE utf8mb4_unicode_ci NOT NULL,
  `country` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `account_type` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'NORMAL',
  `birthday` date DEFAULT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


```

### Test User

```sh
INSERT INTO `user` (`user_id`, `password`, `email`, `fname`, `lname`, `imgurl`, `description`, `country`, `account_type`, `birthday`) VALUES (1, 'password', 'test1@test.com', 'John', 'Doe', 'https://randomuser.me/api/portraits/men/1.jpg', 'Hello, I am John Doe!', 'Canada', 'NORMAL', '1993-11-05');

```

## .env

```sh

PORT=80
NODE_ENV=development
SESS_SECRET=comp4711-jjia
SESS_NAME=sid
DB_PASSWORD=password
HOST=localhost
DB_USER=root
DB_NAME=knowledgebase

```

### **Note: You may change the DB setting based on your mySQL setup**
