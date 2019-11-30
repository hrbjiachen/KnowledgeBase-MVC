CREATE TABLE IF NOT EXISTS `user` (
  `user_id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `password` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `fname` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `lname` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `imgurl` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `country` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `account_type` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'NORMAL',
  `birthday` date DEFAULT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/* Test user */
INSERT INTO `user` (`user_id`, `password`, `email`, `fname`, `lname`, `imgurl`, `description`, `country`, `account_type`, `birthday`) VALUES (1, 'password', 'test1@test.com', 'John', 'Doe', 'https://randomuser.me/api/portraits/men/1.jpg', 'Hello, I am John Doe!', 'Canada', 'NORMAL', '1993-11-05');
INSERT INTO `user` (`user_id`, `password`, `email`, `fname`, `lname`, `imgurl`, `description`, `country`, `account_type`, `birthday`) VALUES (2, 'password', 'test2@test.com', 'John', 'Smith', 'https://randomuser.me/api/portraits/men/3.jpg', 'Hello, I am John Smith!', 'Canada', 'NORMAL', '1999-11-11');

/* Test post */
INSERT INTO `post` (`post_id`, `user_id`, `subject`, `detail`, `topic`, `date_created`, `date_updated`) VALUES
(1, 1, 'Post 1  From User 1', 'Nulla eu ligula velit. Pellentesque id arcu posuere, tristique tellus at, pellentesque eros. Cras et nunc non nibh viverra sodales. Duis suscipit purus risus, vitae venenatis dolor dignissim quis. ', 'nodejs', '2019-11-19 04:30:22', '2019-11-28 02:18:38'),
(2, 2, 'Post 2 From User 2', 'Consectetur adipiscing elit. Phasellus sit amet turpis nec nisi lacinia pulvinar. Phasellus lorem orci', 'sql', '2019-11-19 05:49:57', '2019-11-28 02:17:20'),
(3, 1, 'Post 3  From User 1', 'Consequat non dapibus nec, cursus id ex. Curabitur commodo convallis ipsum. Suspendisse vulputate mauris eu pulvinar iaculis. Donec ligula nisl, blandit ac mi quis, porta auctor massa. Integer nec pharetra ex. ', 'sql', '2019-11-19 05:50:10', '2019-11-28 02:18:40');


CREATE TABLE IF NOT EXISTS `post` (
  `post_id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` mediumint(8) unsigned NOT NULL,
  `subject` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `detail` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `topic` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`post_id`),
  KEY `user_id_FK` (`user_id`),
  CONSTRAINT `user_id_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `reply` (
  `reply_id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` mediumint(8) unsigned NOT NULL,
  `post_id` mediumint(8) unsigned NOT NULL,
  `detail` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`reply_id`),
  KEY `post_id_FK` (`post_id`),
  CONSTRAINT `post_id_FK` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `chat` (
  `chat_id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `user_id_1` mediumint(8) unsigned NOT NULL,
  `user_id_2` mediumint(8) unsigned NOT NULL,
  `subject` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`chat_id`),
  KEY `user_id_1_FK` (`user_id_1`),
  KEY `user_id_2_FK` (`user_id_2`),
  CONSTRAINT `user_id_1_FK` FOREIGN KEY (`user_id_1`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `user_id_2_FK` FOREIGN KEY (`user_id_2`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `message` (
  `message_id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `chat_id` mediumint(8) unsigned NOT NULL,
  `sender_id` mediumint(8) unsigned NOT NULL,
  `message_content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `time_sent` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`message_id`),
  KEY `chat_id_FK` (`chat_id`),
  KEY `sender_id_FK` (`sender_id`),
  CONSTRAINT `chat_id_FK` FOREIGN KEY (`chat_id`) REFERENCES `chat` (`chat_id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `sender_id_FK` FOREIGN KEY (`sender_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
