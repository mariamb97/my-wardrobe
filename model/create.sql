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
	`color_id` INT NOT NULL,
	`season_id` INT NOT NULL,
	`image` varchar(400) NOT NULL,
	PRIMARY KEY (`id`),
	 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

DROP TABLE if exists `colors`;

CREATE TABLE `colors` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` varchar(100) NOT NULL,
	PRIMARY KEY (`id`)
);

DROP TABLE if exists `seasons`;

CREATE TABLE `seasons` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` varchar(100) NOT NULL,
	PRIMARY KEY (`id`)
);


ALTER TABLE `items` ADD CONSTRAINT `items_fk0` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`);

ALTER TABLE `items` ADD CONSTRAINT `items_fk1` FOREIGN KEY (`color_id`) REFERENCES `colors`(`id`);

ALTER TABLE `items` ADD CONSTRAINT `items_fk2` FOREIGN KEY (`season_id`) REFERENCES `seasons`(`id`);

INSERT INTO `categories` (name) VALUES ("coats"), ("jackets"), ("sweatshirts"), ("shirts"), ("t-shirts"), ("jeans"), ("trousers"), ("skirts"), ("shorts"), ("dresses"), ("hats"), ("scarves"), ("bags"), ("shoes");

INSERT INTO `colors` (name) VALUES ("red"), ("blue"), ("pink"), ("yellow"), ("brown"), ("purple"), ("black"), ("white"), ("green"), ("orange"), ("gray"), ("beige");

INSERT INTO `seasons` (name) VALUES ("spring"), ("summer"), ("fall"), ("winter");


