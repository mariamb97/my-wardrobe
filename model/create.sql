DROP TABLE if exists `categories`;

CREATE TABLE `categories` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` varchar(100) NOT NULL,
	PRIMARY KEY (`id`)
);

DROP TABLE if exists `items`;

CREATE TABLE `items` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`category_id` INT NOT NULL,
	`name` varchar(100) NOT NULL,
	`image` varchar(400) NOT NULL,
	`color` varchar(100) NOT NULL,
	`characteristic` varchar(100) NOT NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `items` ADD CONSTRAINT `items_fk0` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`);

INSERT INTO `categories` (name) VALUES ("coats"), ("jackets"), ("sweatshirts"), ("shirts"), ("t-shirts"), ("jeans"), ("trousers"), ("skirts"), ("shorts"), ("dresses"), ("hats"), ("scarves"), ("bags"), ("shoes")


