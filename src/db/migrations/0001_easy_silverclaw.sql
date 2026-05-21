CREATE TABLE `companies` (
	`id` varchar(191) NOT NULL,
	`owner_id` varchar(191) NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`website` varchar(255),
	`logo_url` varchar(500),
	`is_verified` boolean NOT NULL DEFAULT false,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `companies_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `companies` ADD CONSTRAINT `companies_owner_id_users_id_fk` FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;