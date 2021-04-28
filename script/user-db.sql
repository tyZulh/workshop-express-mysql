DROP DATABASE IF EXISTS `user-db`;

CREATE DATABASE `user-db`;

USE `user-db`;

CREATE TABLE `user` (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  firstname VARCHAR(125) NOT NULL,
  lastname VARCHAR(125) NOT NULL,
  admin BOOLEAN NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

INSERT INTO `user` (firstname, lastname, admin)
values ('George', 'Abitbol', true);