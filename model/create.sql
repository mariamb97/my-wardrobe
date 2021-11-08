DROP TABLE if exists `categories`;

CREATE TABLE `categories` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` varchar(100) NOT NULL,
	PRIMARY KEY (`id`)
);

DROP TABLE if exists `products`;

CREATE TABLE `products` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`category-id` INT NOT NULL,
	`name` varchar(100) NOT NULL,
	`image` varchar(400) NOT NULL,
	`color` varchar(100) NOT NULL,
	`characteristic` varchar(100) NOT NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `products` ADD CONSTRAINT `products_fk0` FOREIGN KEY (`category-id`) REFERENCES `categories`(`id`);